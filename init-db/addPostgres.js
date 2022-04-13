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

function addDb() {
  return new Promise((resolve, reject) => {
    resolve(
      execShellCommand(`sudo apt install postgresql`)
    );
  });
}

addDb();