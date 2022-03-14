const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../helpers/pool');
const fs = require('fs');
const getUserTokenInfos = require('../helpers/getUserTokenInfos');

const errorMessages = {
  EmailNotFound: 'Email not found',
  WrongPassword: 'Wrong Password'
}

// GET A COLLECTION OF EXISTING EMAILS AND NICKNAMES
// TO HYDRATE THE SIGNUP FORM
exports.listEmailsAndNicknames = async (req, res) => {
  try {
    const emailsAndNicknames = await pool.query(/*sql*/`
      SELECT email, nickname
      FROM users;
    `);
    const result = { emails: [], nicknames: [] };
    emailsAndNicknames.rows.forEach(row => {
      result.emails.push(row.email);
      result.nicknames.push(row.nickname);
    });
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error });
  }
}

// GET ALL THE USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await pool.query(/*sql*/`
      SELECT id, nickname, email, motto, picture
      FROM users;
    `);
    res.status(200).json({ users: users.rows });
  } catch (error) {
    res.status(500).json({ error });
  }
}

// GET ONE USER
exports.getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await pool.query(/*sql*/`
      SELECT id, nickname, email, motto, picture
      FROM users
      WHERE id = ${userId};
    `);
    res.status(200).json({ user: user.rows[0] });
  } catch (error) {
    res.status(500).json({ error });
  }
}

// GET USER INFOS FROM TOKEN
exports.getUserFromToken = async (req, res) => {
  const { token } = req.body;
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const { userId, userRole } = decodedToken;
  try {
    const user = await pool.query(/*sql*/`
      SELECT id, nickname, email, motto, picture
      FROM users
      WHERE id = ${userId};
    `);
    res.status(200).json({ 
      user_id: user.rows[0].id,
      user_nickname: user.rows[0].nickname,
      user_email: user.rows[0].email,
      user_motto: user.rows[0].motto,
      user_picture: user.rows[0].picture,
      user_role: userRole
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}

// SIGN UP A USER
exports.signup = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const { email, nickname, motto } = req.body;
    const password = hash;
    await pool.query(/*sql*/`
      INSERT INTO users (
        email,
        nickname,
        ${motto ? 'motto, ' : ''}
        password_hash
      )
      VALUES (
        '${email}',
        '${nickname}',
        ${motto ? `'${motto}', ` : ''}      
        '${password}'
      );
    `);
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN A USER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query(/*sql*/`
      SELECT u.id AS user_id,
        u.email AS user_email,
        u.nickname AS user_nickname,
        u.picture AS user_picture,
        u.password_hash AS user_password,
        u.motto AS user_motto,
        r."name" AS user_role
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.email = '${email}';
    `);
    if (!user.rows[0]) {
      return res.status(401).json({ error: errorMessages.EmailNotFound });
    }
    const isMatch = await bcrypt.compare(password, user.rows[0].user_password);
    if (!isMatch) {
      return res.status(401).json({ error: errorMessages.WrongPassword });
    }
    const token = jwt.sign({ userId: user.rows[0].user_id, userRole: user.rows[0].user_role }, process.env.JWT_SECRET);
    res.status(200).json({ 
      token,
      userId: user.rows[0].user_id,
      userRole: user.rows[0].user_role,
      userEmail: user.rows[0].user_email,
      userNickname: user.rows[0].user_nickname,
      userPicture: user.rows[0].user_picture,
      userMotto: user.rows[0].user_motto
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// UPDATE A USER'S MOTTO
exports.updateUserMotto = async (req, res) => {
  const { userId } = req.params;
  const { motto } = req.body;
  try {
    await pool.query(/*sql*/`
      UPDATE users
      SET motto = '${motto}'
      WHERE id = ${userId};
    `);
    res.status(200).json({ message: 'User\'s motto updated successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
}

// UPDATE A USER'S PICTURE
exports.updateUserPicture = async (req, res) => {
  const { userId } = req.params;
  const url = req.protocol + '://' + req.get('host');
  const picture = url + '/images/' + req.file.filename;
  try {
    const currentPicture = await pool.query(/*sql*/`
        SELECT picture
        FROM users
        WHERE id = ${userId};
    `);
    const thePicture = currentPicture.rows[0].picture;
    if (thePicture) {
      const filename = thePicture.split('/images/')[1];
      fs.unlink('back/images/' + filename, () => true);
    }
    await pool.query(/*sql*/`
      UPDATE users
      SET picture = '${picture}'
      WHERE id = ${userId};
    `);
    res.status(200).json({ message: 'User\'s picture updated successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
}

// ADMIN CAN UPADTE A USER'S ROLE
exports.updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { roleId } = req.body;
  try {
    await pool.query(/*sql*/`
      UPDATE users
      SET role_id = ${roleId}
      WHERE id = ${userId};
    `);
    res.status(200).json({ message: 'User\'s role updated successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
}

// ADMIN CAN DELETE A USER
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const currentPicture = await pool.query(/*sql*/`
      SELECT picture
      FROM users
      WHERE id = ${userId};
    `);
    const thePicture = currentPicture.rows[0].picture;
    if (thePicture) {
      const filename = thePicture.split('/images/')[1];
      fs.unlink('back/images/' + filename, () => true);
    }
    // we delete all of the read_posts
    const readPosts = await pool.query(/*sql*/`
      DELETE FROM read_posts
      WHERE post_id IN (
        SELECT id FROM posts
        WHERE user_id = ${userId}
        OR parent_id IN (
          SELECT id
          FROM posts
          WHERE user_id = ${userId}
        )
      )
    `);
    await Promise.all([readPosts]);
    // we delete all of the posts
    const posts = await pool.query(/*sql*/`
      DELETE FROM posts
      WHERE user_id = ${userId}
      OR parent_id IN (
        SELECT id
        FROM posts
        WHERE user_id = ${userId}
      );
    `);
    await Promise.all([posts]);
    // we delete the user
    await pool.query(/*sql*/`
      DELETE FROM users
      WHERE id = ${userId};
    `);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
}
