const fs = require('fs');

function hasConfig() {
  if (fs.existsSync(`${process.env.HOME}/.doneapp`)) {
    return true;
  }

  return false;
}

module.exports = { hasConfig };
