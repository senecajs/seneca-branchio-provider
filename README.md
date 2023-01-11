![Seneca Branchio-Provider](http://senecajs.org/files/assets/seneca-logo.png)

> _Seneca Branchio-Provider_ is a plugin for [Seneca](http://senecajs.org)


Provides access to the Branchio API using the Seneca *provider*
convention. Branchio API entities are represented as Seneca entities so
that they can be accessed using the Seneca entity API and messages.

See [seneca-entity](senecajs/seneca-entity) and the [Seneca Data
Entities
Tutorial](https://senecajs.org/docs/tutorials/understanding-data-entities.html) for more details on the Seneca entity API.

NOTE: underlying third party SDK needs to be replaced as out of date and has a security issue.

[![npm version](https://img.shields.io/npm/v/@seneca/branchio-provider.svg)](https://npmjs.com/package/@seneca/branchio-provider)
[![build](https://github.com/senecajs/seneca-branchio-provider/actions/workflows/build.yml/badge.svg)](https://github.com/senecajs/seneca-branchio-provider/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/senecajs/seneca-branchio-provider/badge.svg?branch=main)](https://coveralls.io/github/senecajs/seneca-branchio-provider?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/senecajs/seneca-branchio-provider/badge.svg)](https://snyk.io/test/github/senecajs/seneca-branchio-provider)
[![DeepScan grade](https://deepscan.io/api/teams/5016/projects/19462/branches/505954/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5016&pid=19462&bid=505954)
[![Maintainability](https://api.codeclimate.com/v1/badges/f76e83896b731bb5d609/maintainability)](https://codeclimate.com/github/senecajs/seneca-branchio-provider/maintainability)


| ![Voxgig](https://www.voxgig.com/res/img/vgt01r.png) | This open source module is sponsored and supported by [Voxgig](https://www.voxgig.com). |
|---|---|


## Quick Example


```js

// Setup - get the key value (<SECRET>) separately from a vault or
// environment variable.
Seneca()
  // Get API keys using the seneca-env plugin
  .use('env', {
    var: {
      $BRANCHIO_APIKEY: String,
      $BRANCHIO_USERTOKEN: String,
    }
  })
  .use('provider', {
    provider: {
      branchio: {
        keys: {
          apikey: { value: '$BRANCHIO_APIKEY' },
          usertoken: { value: '$BRANCHIO_USERTOKEN' },
        }
      }
    }
  })
  .use('branchio-provider')

let board = await seneca.entity('provider/branchio/board')
  .load$('<branchio-board-id>')

Console.log('BOARD', board)

board.desc = 'New description'
board = await board.save$()

Console.log('UPDATED BOARD', board)

```

## Install

```sh
$ npm install @seneca/branchio-provider @seneca/env
```



<!--START:options-->


## Options

* `debug` : boolean <i><small>false</small></i>


Set plugin options when loading with:
```js


seneca.use('BranchioProvider', { name: value, ... })


```


<small>Note: <code>foo.bar</code> in the list above means 
<code>{ foo: { bar: ... } }</code></small> 



<!--END:options-->

<!--START:action-list-->


## Action Patterns

* [role:entity,base:branchio,cmd:load,name:repo,zone:provider](#-roleentitybasebranchiocmdloadnamerepozoneprovider-)
* [role:entity,base:branchio,cmd:save,name:repo,zone:provider](#-roleentitybasebranchiocmdsavenamerepozoneprovider-)
* [sys:provider,get:info,provider:branchio](#-sysprovidergetinfoproviderbranchio-)


<!--END:action-list-->

<!--START:action-desc-->


## Action Descriptions

### &laquo; `role:entity,base:branchio,cmd:load,name:repo,zone:provider` &raquo;

Load Branchio repository data into an entity.



----------
### &laquo; `role:entity,base:branchio,cmd:save,name:repo,zone:provider` &raquo;

Update Branchio repository data from an entity.



----------
### &laquo; `sys:provider,get:info,provider:branchio` &raquo;

Get information about the provider.



----------


<!--END:action-desc-->
