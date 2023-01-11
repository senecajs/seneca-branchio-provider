"use strict";
/* Copyright © 2022 Seneca Project Contributors, MIT License. */
Object.defineProperty(exports, "__esModule", { value: true });
const Pkg = require('../package.json');
const Branchio = require('branchio-sdk');
function BranchioProvider(options) {
    const seneca = this;
    const entityBuilder = this.export('provider/entityBuilder');
    seneca
        .message('sys:provider,provider:branchio,get:info', get_info);
    async function get_info(_msg) {
        return {
            ok: true,
            name: 'branchio',
            version: Pkg.version,
        };
    }
    entityBuilder(this, {
        provider: {
            name: 'branchio'
        },
        entity: {},
    });
    seneca.prepare(async function () {
        let res = await this.post('sys:provider,get:keymap,provider:branchio');
        if (!res.ok) {
            throw this.fail('keymap');
        }
        this.shared.sdk = Branchio({
            appId: res.keymap.appid.value
        });
    });
    return {
        exports: {
            sdk: () => this.shared.sdk
        }
    };
}
// Default options.
const defaults = {
    // TODO: Enable debug logging
    debug: false
};
Object.assign(BranchioProvider, { defaults });
exports.default = BranchioProvider;
if ('undefined' !== typeof (module)) {
    module.exports = BranchioProvider;
}
//# sourceMappingURL=branchio-provider.js.map