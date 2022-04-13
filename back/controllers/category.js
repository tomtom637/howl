const pool = require('../helpers/pool');
const fs = require('fs');
const getUserTokenInfos = require('../helpers/getUserTokenInfos');

// GET ALL CATEGORIES
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await pool.query(/*sql*/`
      SELECT id, "name", "description", picture
      FROM categories;
    `);
    res.status(200).json({ categories: categories.rows });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// GET THE 5 MOST RECENT POSTS FROM OFFSET
// ASSOCIATED WITH A CATEGORY
// BRINGING ITS REPLIES IF ANY
// ALSO CHECKING IF THE USER HAS READ THEM
exports.getFivePostsAndTheirRepliesFromCategory = async (req, res) => {
  const userID = getUserTokenInfos(req).userId;
  const { categoryId, offset } = req.params;
  let result;
  try {
    const fivePosts = await pool.query(/*sql*/`

      SELECT
      p.id AS id,
      to_char(p.creation_date, 'MM.DD.yyyy') AS "date",
      u.id AS user_id,
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
      WHERE p.parent_id IS NULL
      AND p.category_id = ${categoryId}
      ORDER BY p.creation_date desc
      LIMIT 5
      OFFSET ${offset};
    `);

    const fivePostsIds = fivePosts.rows.map(post => post.id);
    result = fivePosts.rows;

    const repliesPromises = fivePostsIds.map(async (post, i) => {
      const replies = await pool.query(/*sql*/`

        SELECT
        p.id AS id,
        to_char(p.creation_date, 'MM.DD.yyyy') AS "date",
        u.id AS user_id,
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
        LEFT JOIN read_posts rp ON rp.post_id = p.id AND rp.user_id = ${userID}
        WHERE p.parent_id = ${post}
        ORDER BY p.creation_date ASC;
      `);

      result[i].replies = replies.rows;
    });
    await Promise.all(repliesPromises);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// REGISTER A NEW CATEGORY
exports.addCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const category = await pool.query(/*sql*/`
      INSERT INTO categories ("name", "description")
      VALUES ('${name}', '${description}');
    `);
    res.status(200).json({ message: 'Category added successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// UPDATE A CATEGORY NAME
exports.updateCategoryName = async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;
  const cleanedName = name.replace(/'/g, "''");
  if (cleanedName) {
    try {
      await pool.query(/*sql*/`
        UPDATE categories
        SET "name" = '${cleanedName}'
        WHERE id = ${categoryId};
      `);
      res.status(200).json({ message: 'Category name updated successfully' });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
};

// UPDATE A CATEGORY DESCRIPTION
exports.updateCategoryDescription = async (req, res) => {
  const { categoryId } = req.params;
  const { description } = req.body;
  const cleanedDescription = description.replace(/'/g, "''");
  if (cleanedDescription) {
    try {
      await pool.query(/*sql*/`
        UPDATE categories
        SET "description" = '${cleanedDescription}'
        WHERE id = ${categoryId};
      `);
      res.status(200).json({ message: 'Category description updated successfully' });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
};

// UPDATE A CATEGORY'S PICTURE
exports.updateCategoryPicture = async (req, res) => {
  const { categoryId } = req.params;
  const url = req.protocol + '://' + req.get('host');
  const picture = url + '/images/' + req.file.filename;
  try {
    const currentPicture = await pool.query(/*sql*/`
        SELECT picture
        FROM categories
        WHERE id = ${categoryId};
    `);
    const thePicture = currentPicture.rows[0].picture;
    if (thePicture) {
      const filename = thePicture.split('/images/')[1];
      fs.unlink('back/images/' + filename, () => true);
    }
    await pool.query(/*sql*/`
      UPDATE categories
      SET picture = '${picture}'
      WHERE id = ${categoryId};
    `);
    res.status(200).json({
      message: 'Category picture updated successfully',
      url: picture
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// DELETE A CATEGORY, ALL ITS ASSOCIATED POSTS
// AND READ_POSTS RECORDS ASSOCIATED WITH THEM
exports.deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await pool.query(/*sql*/`
      SELECT picture
      FROM categories
      WHERE id = ${categoryId};
    `);
    const thePicture = category.rows[0].picture;
    if (thePicture) {
      const filename = thePicture.split('/images/')[1];
      fs.unlink('back/images/' + filename, () => true);
    }
    // we first delete from read_posts the records associated with the posts
    const readPostsPromise = await pool.query(/*sql*/`
      DELETE FROM read_posts
      WHERE post_id IN (
        SELECT id FROM posts
        WHERE category_id = ${categoryId}
      );
    `);
    for (p of [readPostsPromise]) { await p; }
    // then we delete the posts
    const postsPromise = await pool.query(/*sql*/`
      DELETE FROM posts
      WHERE category_id = ${categoryId};
    `);
    for (p of [postsPromise]) { await p; }
    // then we delete the category
    await pool.query(/*sql*/`
      DELETE FROM categories
      WHERE id = ${categoryId};
    `);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
};