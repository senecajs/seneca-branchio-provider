/* Copyright © 2022 Seneca Project Contributors, MIT License. */


const Pkg = require('../package.json')
const Branchio = require('branchio-sdk')

type BranchioProviderOptions = {
  debug: boolean
}


function BranchioProvider(this: any, options: BranchioProviderOptions) {
  const seneca: any = this

  const entityBuilder = this.export('provider/entityBuilder')

  seneca
    .message('sys:provider,provider:branchio,get:info', get_info)


  async function get_info(this: any, _msg: any) {
    return {
      ok: true,
      name: 'branchio',
      version: Pkg.version,
    }
  }


  entityBuilder(this, {
    provider: {
      name: 'branchio'
    },
    entity: {
    },
  })



  seneca.prepare(async function(this: any) {
    let res =
      await this.post('sys:provider,get:keymap,provider:branchio')

    if (!res.ok) {
      throw this.fail('keymap')
    }

    this.shared.sdk = Branchio({
      appId: res.keymap.appid.value
    })

  })


  return {
    exports: {
      sdk: () => this.shared.sdk
    }
  }
}


// Default options.
const defaults: BranchioProviderOptions = {
  // TODO: Enable debug logging
  debug: false
}


Object.assign(BranchioProvider, { defaults })

export default BranchioProvider

if ('undefined' !== typeof (module)) {
  module.exports = BranchioProvider
}
