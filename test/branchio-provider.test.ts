/* Copyright © 2022 Seneca Project Contributors, MIT License. */

import * as Fs from 'fs'



const Seneca = require('seneca')
const SenecaMsgTest = require('seneca-msg-test')

import BranchioProvider from '../src/branchio-provider'
import BranchioProviderDoc from '../src/BranchioProvider-doc'

const BasicMessages = require('./basic.messages.js')


// Only run some tests locally (not on Github Actions).
let Config = undefined
if (Fs.existsSync(__dirname + '/local-config.js')) {
  Config = require('./local-config')
}


describe('branch-provider', () => {

  test('happy', async () => {
    expect(BranchioProvider).toBeDefined()
    expect(BranchioProviderDoc).toBeDefined()

    const seneca = await makeSeneca()

    expect(await seneca.post('sys:provider,provider:branchio,get:info'))
      .toMatchObject({
        ok: true,
        name: 'branchio',
      })

    let sdk = seneca.export('BranchioProvider/sdk')()
    expect(sdk).toBeDefined()


    let code = seneca.util.Nid()

    let linkinfo = await sdk.link({
      alias: '',
      stage: '',
      channel: '',
      feature: '',
      campaign: '',
      tags: '',
      data: {
        code
      }
    })

    // console.log(linkinfo)

    expect(typeof linkinfo.url).toEqual('string')
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
        BRANCHIO_APPID: String,
        $BRANCHIO_KEY: String,
        $BRANCHIO_SECRET: String,
      }
    })
    .use('provider', {
      provider: {
        branchio: {
          keys: {
            appid: { value: '$BRANCHIO_APPID' },
          }
        }

      }
    })
    .use(BranchioProvider)

  return seneca.ready()
}
