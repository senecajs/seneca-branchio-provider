/* Copyright © 2022 Seneca Project Contributors, MIT License. */

import * as Fs from 'fs'



const Seneca = require('seneca')
const SenecaMsgTest = require('seneca-msg-test')

import BranchProvider from '../src/branch-provider'
const BasicMessages = require('./basic.messages.js')


// Only run some tests locally (not on Github Actions).
let Config = undefined
if (Fs.existsSync(__dirname + '/local-config.js')) {
  Config = require('./local-config')
}


describe('branch-provider', () => {

  test('happy', async () => {
    expect(BranchProvider).toBeDefined()

  })


  test('messages', async () => {
    const seneca = await makeSeneca()
    await (SenecaMsgTest(seneca, BasicMessages)())
  })

})


async function makeSeneca() {
  const seneca = Seneca({ legacy: false })
    .test()
    .use('promisify')
    .use('entity')
    .use('env', {
      // debug: true,
      file: [__dirname + '/local-env.js;?'],
      var: {
        $APP_ID: String
      }
    })
    .use('provider', {
      provider: {

      }
    })
    .use(TangocardProvider)

  return seneca.ready()
}
