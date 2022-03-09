const pgtools = require('pgtools');
const { dbinfo } = require('./dbinfo');
const Pool = require('pg').Pool;

const pool = new Pool({
  user: dbinfo.user,
  host: dbinfo.host,
  database: dbinfo.database,
  password: dbinfo.password,
  port: dbinfo.port
});

function createDb() {
  return new Promise((resolve, reject) => {
    resolve(
      pgtools.createdb({
        user: dbinfo.user,
        host: dbinfo.host,
        password: dbinfo.password,
        port: dbinfo.port
      }, dbinfo.database, (err, res) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Database Dragonball successfully created');
      })
    );
  });
}

async function setupDb() {
  const characters = [
    {name: 'Son Goku', race: 'sayan', hair: 'black'},
    {name: 'Bulma', race: 'earthling', hair: 'blue'},
    {name: 'Son Gohan', race: 'sayan', hair: 'black'},
    {name: 'Krilin', race: 'earthling', hair: 'bald'},
    {name: 'Android 18', race: 'android', hair: 'blond'},
    {name: 'Picolo', race: 'namekian', hair: 'bald'},
    {name: 'Trunks', race: 'sayan', hair: 'blue'},
    {name: 'King Kai', race: 'god', hair: 'bald'},
    {name: 'Beerus', race: 'god of destruction', hair: 'bald'},
    {name: 'Wiz', race: 'angel', hair: 'silver'}
  ];
  function returnCharactersQueryValues() {
    let query = '';
    characters.forEach((c, i) => {
      query += `('${c.name}', (SELECT r.id FROM race r WHERE r.name = '${c.race}'), (SELECT h.id FROM hair h WHERE h.name = '${c.hair}'))`;
      if(i === characters.length - 1) {
        query += ';';
      } else {
        query += ',';
      }
    });
    return query;
  }

  try {
    await pool.query(
      /*sql*/`
        CREATE TABLE race(
          id INT GENERATED ALWAYS AS IDENTITY,
          name VARCHAR(150) NOT NULL,
          PRIMARY KEY(id)
        );

        CREATE TABLE hair(
          id INT GENERATED ALWAYS AS IDENTITY,
          name VARCHAR(150) NOT NULL,
          PRIMARY KEY(id)
        );

        CREATE TABLE character(
          id INT GENERATED ALWAYS AS IDENTITY,
          name VARCHAR(150) NOT NULL,
          race INT NOT NULL,
          hair INT NOT NULL,
          PRIMARY KEY(id),
          FOREIGN KEY(race) REFERENCES race(id),
          FOREIGN KEY(hair) REFERENCES hair(id)
        );

        INSERT INTO race(name)
        VALUES
        ('earthling'),('sayan'),('namekian'),('android'),('god'),('god of destruction'),('angel');

        INSERT INTO hair(name)
        VALUES
        ('black'),('blond'),('blue'),('bald'),('silver'),('red');

        INSERT INTO character(name, race, hair)
        VALUES
        ${returnCharactersQueryValues()}
      `
    );
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
    console.log('database dragonBall successfully loaded');
    pool.end();
  }
});