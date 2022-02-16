// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3') // Web3 is a constructor function => upper case
const web3 = new Web3(ganache.provider()); // creates instance of web3
const {interface, bytecode} = require('../compile')


let accounts 
let inbox
const INITIAL_MESSAGE = 'Hi there'
const UPDATE_MESSAGE ='Buy there'

beforeEach( async () => {
    // get list of all accounts
    accounts = await web3.eth.getAccounts()
    // use one of those accounts to deploy contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: [INITIAL_MESSAGE]})
    .send({from: accounts[0], gas: '1000000'})
    
})

describe('Inbox', () => {
    it('deploys contract', ()=>{
        assert.ok(inbox.options.address)
    });
    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_MESSAGE )
    });
    it('updates message', async () => {
        await inbox.methods.setMessage(UPDATE_MESSAGE).send({from: accounts[0]});
        const updatedMessage = await inbox.methods.message().call();
        assert.equal(updatedMessage, UPDATE_MESSAGE);
    })
})






