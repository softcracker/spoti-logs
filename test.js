// Implementation for main App

const fs = require('fs');
const util = require('util');
const log_stdout = process.stdout;

console.log = function(d) {
  log_stdout.write(util.format(d) + '\n');
  const content = util.format(d) + '\n'

  fs.appendFile('test.txt', content, (err) => {
    if (err) throw err
  })
}

console.log('test')

