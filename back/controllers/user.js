const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../helpers/pool');
const fs = require('fs');

const errorMessages = {
  EmailNotFound: 'Email not found',
  WrongPassword: 'Wrong Password'
}

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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query(/*sql*/`
      SELECT u.id AS user_id,
        u.email AS user_email,
        u.password_hash AS user_password,
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
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

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
      fs.unlink('images/' + filename, () => true);
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
      fs.unlink('images/' + filename, () => true);
    }
    await pool.query(/*sql*/`
      DELETE FROM users
      WHERE id = ${userId};
    `);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
}