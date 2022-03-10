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
}

// GET THE 20 MOST RECENT POSTS FROM OFFSET
// ASSOCIATED WITH A CATEGORY
// BRINGING ITS REPLIES IF ANY
// ALSO CHECKING IF THE USER HAS READ THEM
exports.getTwentyPostsAndTheirRepliesFromCategory = async (req, res) => {
  const userID = getUserTokenInfos(req).userId;
  const { categoryId, offset } = req.params;
  let result;
  try {
    const twentyPosts = await pool.query(/*sql*/`

      SELECT p.id AS id,
      to_char(p.creation_date, 'MM.DD.yyyy') AS "date",
      u.nickname AS user,
      p.content AS "message",
      c.name AS from_category
      FROM users u
      JOIN posts p ON u.id = p.user_id
      JOIN categories c ON c.id = p.category_id
      WHERE p.parent_id IS NULL
      AND p.category_id = ${categoryId}
      ORDER BY p.creation_date desc
      LIMIT 20
      OFFSET ${offset};
    `);

    const twentyPostsIds = twentyPosts.rows.map(post => post.id);
    result = twentyPosts.rows;
    
    const repliesPromises = twentyPostsIds.map(async (post, i) => {
      const replies = await pool.query(/*sql*/`

        SELECT p.id AS id,
        to_char(p.creation_date, 'MM.DD.yyyy') AS "date",
        u.nickname AS user,
        p.content AS "message",
        c.name AS from_category,
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
}

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
}

// UPDATE A CATEGORY NAME AND DESCRIPTION
exports.updateCategoryNameAndDesc = async (req, res) => {
  const { categoryId } = req.params;
  const { name, description } = req.body;
  try {
    await pool.query(/*sql*/`
      UPDATE categories
      SET "name" = '${name}', "description" = '${description}'
      WHERE id = ${categoryId};
    `);
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
}

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
      fs.unlink('images/' + filename, () => true);
    }
    await pool.query(/*sql*/`
      UPDATE categories
      SET picture = '${picture}'
      WHERE id = ${categoryId};
    `);
    res.status(200).json({ message: 'Category picture updated successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
}