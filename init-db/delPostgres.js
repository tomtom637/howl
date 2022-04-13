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

function deleteDb() {
  return new Promise((resolve, reject) => {
    resolve(
      execShellCommand(`sudo apt --purge remove postgresql`)
        .then(() => execShellCommand(`sudo apt purge postgresql*`))
        .then(() => execShellCommand(`sudo apt --purge remove postgresql postgresql-doc postgresql-common`))
    );
  });
}

deleteDb();