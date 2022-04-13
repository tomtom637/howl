const pgtools = require('pgtools');
const Pool = require('pg').Pool;
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

function execShellCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
      resolve();
    });
  });
}

function makeUser() {
  return new Promise((resolve, reject) => {
    resolve(
      execShellCommand(`sudo -u postgres createuser -s -i -d -r -l -w howl`)
        .then(() => execShellCommand(`sudo -u postgres psql -c "ALTER ROLE howl WITH PASSWORD 'howl';"`))
        .then(() => execShellCommand(`sudo -u postgres psql -c "ALTER user howl createdb;"`))
        .then(() => execShellCommand(`sudo -u postgres psql -c "ALTER user howl superuser;"`))
    );
  });
}

const sql = fs.readFileSync(path.join(__dirname, '/dump-howl.sql')).toString();

const pool = new Pool({
  user: 'howl',
  host: 'localhost',
  database: 'howl',
  password: 'howl',
  port: 5432
});

function dropIfExists() {
  return new Promise((resolve, reject) => {
    resolve(
      pgtools.dropdb({
        user: 'howl',
        host: 'localhost',
        password: 'howl',
        port: 5432
      }, 'howl', (err, res) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Database Howl successfully deleted');
      })
    );
  });
}

function createDb() {
  return new Promise((resolve, reject) => {
    resolve(
      pgtools.createdb({
        user: 'howl',
        host: 'localhost',
        password: 'howl',
        port: 5432
      }, 'howl', (err, res) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Database Howl successfully created');
      })
    );
  });
}

async function setupDb() {
  try {
    await pool.query(sql);
    console.log('data successfully created');
  } catch (err) {
    console.log('error: ' + err.message);
  }
}

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('the database doesn\'t exist, creating now');
    makeUser()
      .then(() => createDb())
      .then(() => setupDb())
      .then(() => console.log('database howl successfully loaded'))
      .then(() => pool.end());
  } else {
    console.log('the database already exists, trying to delete it now');
    dropIfExists()
      .then(() => createDb())
      .then(() => setupDb())
      .then(() => console.log('database howl successfully loaded'))
      .then(() => pool.end())
      .catch(err => console.log(err))
  }
});