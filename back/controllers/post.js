const pool = require('../helpers/pool');
const getUserTokenInfos = require('../helpers/getUserTokenInfos');

// GET A POST
exports.getPost = async (req, res) => {
  const { userId } = getUserTokenInfos(req);
  const { postId } = req.params;
  let result;
  try {
    const post = await pool.query(/*sql*/`
      SELECT
      p.id AS id,
      to_char(p.creation_date, 'MM.DD.yyyy') AS "date",
      u.nickname AS user,
      u.picture AS picture,
      u.motto AS motto,
      u.deleted AS deleted,
      p.content AS "message",
      p.gif_address AS gif_address,
      p.parent_id AS parent_id,
      c.name AS from_category,
      c.id AS category_id,
      c.picture AS category_picture
      FROM users u
      JOIN posts p ON u.id = p.user_id
      JOIN categories c ON c.id = p.category_id
      WHERE p.id = ${postId};
    `);

    result = post.rows[0];

    const repliesPromise = await pool.query(/*sql*/`
      SELECT
      p.id AS id,
      to_char(p.creation_date, 'MM.DD.yyyy') AS "date",
      u.nickname AS user,
      u.picture AS picture,
      u.motto AS motto,
      u.deleted AS deleted,
      p.content AS "message",
      p.gif_address AS gif_address,
      p.parent_id AS parent_id,
      c.name AS from_category,
      c.picture AS category_picture,
      rp.user_id AS "read"        
      FROM users u
      JOIN posts p ON u.id = p.user_id
      JOIN categories c ON c.id = p.category_id
      LEFT JOIN read_posts rp ON rp.post_id = p.id AND rp.user_id = ${userId}
      WHERE p.parent_id = ${postId}
      ORDER BY p.creation_date ASC;
    `);
    result.replies = repliesPromise.rows;
    await Promise.all([repliesPromise]);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error });
  }
}

// ADD TO READ-POSTS WHEN A POST IS READ
exports.addToReadPosts = async (req, res) => {
  const { userId } = getUserTokenInfos(req);
  const { postId } = req.params;
  try {
    await pool.query(/*sql*/`
      INSERT INTO read_posts (
        user_id,
        post_id
      )
      VALUES (
        ${userId},
        ${postId}
      );
    `);
    res.status(201).json({ message: 'Post added to read posts successfully!' });
  } catch (error) {
    res.status(400).json({ error });
  }
}

// ADD A POST
exports.addPost = async (req, res) => {
  const { userId } = getUserTokenInfos(req);
  const { categoryId, content, gifAddress, parentId } = req.body.post;

  const cleanedContent = content.replace(/'/g, "''");
  try {
    const postId = await pool.query(/*sql*/`
      INSERT INTO posts (
        user_id,
        category_id
        ${content ? ', content' : ''}
        ${gifAddress ? ', gif_address' : ''}
        ${parentId ? ', parent_id' : ''}
      )
      VALUES (
        ${userId},
        ${categoryId}
        ${content ? `, '${cleanedContent}'` : ''}
        ${gifAddress ? `, '${gifAddress}'` : ''}
        ${parentId ? `, '${parentId}'` : ''}
      )
      RETURNING id;
    `);
    res.status(201).json({ message: 'Post added successfully!', postId: postId.rows[0].id });
  } catch (error) {
    res.status(400).json({ error });
  }
}

// ADD A REPLY
exports.addReply = async (req, res) => {
  const { userId } = getUserTokenInfos(req);
  const { categoryId, content, gifAddress } = req.body.post;
  const { parentId } = req.params;
  try {
    await pool.query(/*sql*/`
      INSERT INTO posts (
        user_id,
        category_id,
        parent_id,
        content
        ${gifAddress ? ', gif_address' : ''}
      )
      VALUES (
        ${userId},
        ${categoryId},
        ${parentId},
        '${content}'
        ${gifAddress ? `, '${gifAddress}'` : ''}
      );
    `);
    res.status(201).json({ message: 'Post added successfully!' });
  } catch (error) {
    res.status(400).json({ error });
  }
}

// DELETE A REPLY OR A POST WITH ITS REPLIES
// ALSO DELETE ANY REFERENCE TO THE POST IN THE READ-POSTS TABLE
exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  // if the user is neither the author nor an admin, he can't delete the post
  const { userId, userRole } = getUserTokenInfos(req);
  try {
    const author = await pool.query(/*sql*/`
      SELECT p.id, p.user_id
      FROM posts p
      WHERE p.id = ${postId};
    `);
    if (author.rows[0]?.user_id !== userId && userRole !== 'admin') {
      res.status(401).json({ message: 'You are not authorized to delete this post!' });
    }
    // otherwise, delete the reply or post with its replies
    const replies = await pool.query(/*sql*/`
      SELECT p.id AS id
      FROM posts p
      WHERE p.parent_id = ${postId};
    `);
    const repliesIds = replies.rows.map(reply => reply.id);
    // first delete the reference(s) to the post(s) in the read-posts table
    const readPostsPromises = [...repliesIds, postId].map(async postToDelete => {
      await pool.query(/*sql*/`
        DELETE FROM read_posts
        WHERE post_id = ${postToDelete};
      `);  
    });
    await Promise.all(readPostsPromises);
    // then delete the post(s)
    [...repliesIds, postId].map(async postToDelete => {
      await pool.query(/*sql*/`
        DELETE FROM posts
        WHERE id = ${postToDelete};
      `);
    });
    res.status(200).json({ message: 'Post(s) deleted successfully!' });
  } catch (error) {
    res.status(400).json({ error });
  }
}

// UPDATE A POST
exports.updatePost = async (req, res) => {
  const { postId } = req.params;
  const { content, gifAddress } = req.body.post;
  const cleanedContent = content.replace(/'/g, "''");
  // if the user is neither the author nor an admin, he can't update the post
  const { userId, userRole } = getUserTokenInfos(req);
  try {
    const author = await pool.query(/*sql*/`
      SELECT p.id, p.user_id
      FROM posts p
      WHERE p.id = ${postId};
    `);
    if (author.rows[0].user_id !== userId && userRole !== 'admin') {
      res.status(401).json({ message: 'You are not authorized to update this post!' });
    }
    // otherwise, update the post
    await pool.query(/*sql*/`
      UPDATE posts
      SET
        content = '${cleanedContent}'
        ${gifAddress ? ', gif_address = ' + `'${gifAddress}'` : ''}
      WHERE id = ${postId};
    `);
    res.status(200).json({ message: 'Post updated successfully!' });
  } catch (error) {
    res.status(400).json({ error });
  }
}
