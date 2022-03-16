const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../helpers/pool');
const fs = require('fs');
const getUserTokenInfos = require('../helpers/getUserTokenInfos');

const errorMessages = {
  EmailNotFound: 'Email not found',
  WrongPassword: 'Wrong Password',
  EmailAlreadyExists: 'Email already exists',
  NicknameAlreadyExists: 'Nickname already exists'
};

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
};

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
};

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
};

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
      id: user.rows[0].id,
      nickname: user.rows[0].nickname,
      email: user.rows[0].email,
      motto: user.rows[0].motto,
      picture: user.rows[0].picture,
      role: userRole
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// SIGN UP A USER
exports.signup = async (req, res) => {
  try {
    const { email, nickname } = req.body;
    const emailsAndNicknames = await pool.query(/*sql*/`
      SELECT email, nickname
      FROM users;
    `);

    const errors = [];
    emailsAndNicknames.rows.forEach(row => {
      if (row.email === email) {
        errors.push({ type: 'email', errorMessage: errorMessages.EmailAlreadyExists });
      }
      if (row.nickname.toLowerCase() === nickname.toLowerCase()) {
        errors.push({ type: 'nickname', errorMessage: errorMessages.NicknameAlreadyExists });
      }
    });
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    const password = hash;
    await pool.query(/*sql*/`
      INSERT INTO users (
        email,
        nickname,
        password_hash
      )
      VALUES (
        '${email}',
        '${nickname.toLowerCase()}',     
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
  const errors = [];
  let match = false;
  try {
    const { email, password } = req.body;
    const user = await pool.query(/*sql*/`
      SELECT u.id AS id,
        u.email AS email,
        u.nickname AS nickname,
        u.picture AS picture,
        u.password_hash AS "password",
        u.motto AS motto,
        r."name" AS "role"
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.email = '${email}';
    `);
    if (!user.rows[0]) {
      errors.push({ type: 'email', errorMessage: errorMessages.EmailNotFound });
    }
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      errors.push({ type: 'password', errorMessage: errorMessages.WrongPassword });
      return res.status(400).json({ errors });
    }
    const token = jwt.sign({ userId: user.rows[0].id, userRole: user.rows[0].role }, process.env.JWT_SECRET);
    res.status(200).json({
      token,
      id: user.rows[0].id,
      nickname: user.rows[0].nickname,
      email: user.rows[0].email,
      motto: user.rows[0].motto,
      picture: user.rows[0].picture,
      role: user.rows[0].role
    });
  } catch(error) {
    if(errors.length > 0) {
      return res.status(401).json({ errors });
    }
    res.status(500).json({ error });
  }
};

// UPDATE A USER'S MOTTO
exports.updateUserMotto = async (req, res) => {
  const { userId } = req.params;
  const { motto } = req.body;

  const cleanedMotto = motto.replace(/'/g, "''");
  try {
    await pool.query(/*sql*/`
      UPDATE users
      SET motto = '${cleanedMotto}'
      WHERE id = ${userId};
    `);
    res.status(200).json({ message: 'User\'s motto updated successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

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
    res.status(200).json({
      message: 'User\'s picture updated successfully',
      url: picture
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

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
};

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
};
