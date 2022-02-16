// compile code will go here

const path = require('path')
const fs = require('fs')
const solc = require('solc')

// create path to Inbox.sol-file
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');

// read in code, without executing the code as javascript
const source = fs.readFileSync(inboxPath, 'utf-8');

// use solc to compile source-code in Inbox.sol and state the number of contracts, that we want to compile (1)
module.exports = solc.compile(source, 1).contracts[':Inbox'];



