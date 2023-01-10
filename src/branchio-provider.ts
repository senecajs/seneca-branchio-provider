/* Copyright © 2022 Seneca Project Contributors, MIT License. */


const Pkg = require('../package.json')
const branchio = require('branchio-sdk')

type BranchProviderOptions = {
  code: string,
  alias: string,
  stage: string,
  channel: string,
  feature: string,
  campaign: string,
  appId:string,
  tags: any,
  debug: boolean
}

const defaults: BranchProviderOptions = {
  code: '',
  appId:'',
  alias: '',
  stage: '',
  channel: '',
  feature: '',
  campaign: '',
  tags: [],
  debug: false
}

function BranchProvider(this: any, options: BranchProviderOptions) {
  const seneca: any = this

  const getLink = async()=>{

    const client = branchio({
      appId: options.appId
    })

    const { url } = await client.link({
      alias: options.alias,
      stage: options.stage,
      channel: options.channel,
      feature: options.feature,
      campaign: options.campaign,
      tags: options.tags,
      data: {
        'code': options.code
      }
    })

    return url
  }

}


Object.assign(BranchProvider, { defaults })

export default BranchProvider

if ('undefined' !== typeof (module)) {
  module.exports = BranchProvider
}
