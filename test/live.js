

const Seneca = require('seneca')


Seneca({ legacy: false })
  .test()
  .use('promisify')
  .use('entity')
  .use('env', {
    // debug: true,
    file: [__dirname + '/local-env.js;?'],
    var: {
      BRANCHIO_APPID: String,
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
  .use('../',{
  })
  .ready(async function() {
    const seneca = this

    console.log(await seneca.post('sys:provider,provider:branchio,get:info'))    
  })

