const fs = require('fs');

function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {
  const userInputArray = userInput.split(' ');
  const command = userInputArray[0];

  switch (command) {
    case 'echo':
      commandLibrary.echo(userInputArray.slice(1).join(' '));
      break;
    case 'cat':
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case 'head':
      commandLibrary.head(userInputArray.slice(1));
      break;
    case 'tail':
      commandLibrary.tail(userInputArray.slice(1));
      break;
    default:
      commandLibrary.error(userInputArray.slice(1));
      break;
  }
}

const commandLibrary = {
  echo(userInput) {
    done(userInput);
  },
  cat(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      done(data);
    });
  },
  head(fullPath) {
    const file = fullPath[0];
    fs.readFile(file, (err, data) => {
      if (err) throw err;
      done(data);
    });
  },
  tail(fullPath) {
    const files = fullPath[0];
    fs.readFile(files, (err, data) => {
      if (err) throw err;
      done(data);
    });
  },
  error(userInput) {
    done('not found');
  },
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
