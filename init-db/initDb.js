const pgtools = require('pgtools');
const Pool = require('pg').Pool;
const fs = require('fs');

/* 
TO EDIT IN THE DUMP FILE
  CREATE SCHEMA IF NOT EXISTS public;
  CREATE EXTENSION citext WITH SCHEMA public;
*/

const sql = fs.readFileSync(__dirname + '/dump-howl.sql').toString();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  // database: process.env.DB_DATABASE,
  database: 'howl-test',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

function createDb() {
  return new Promise((resolve, reject) => {
    resolve(
      pgtools.createdb({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
      }, /*process.env.DB_DATABASE*/ 'howl-test', (err, res) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Database Howl-Test successfully created');
      })
    );
  });
}

async function setupDb() {
  try {
    await pool.query(sql);
    console.log('data successfully created');
    pool.end();
  } catch (err) {
    console.log('error: ' + err.message);
  }
}

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('creating db: ' + err.message);
    createDb().then(() => setupDb());
  } else {
    console.log('database howl-test successfully loaded');
    pool.end();
  }
});