"use strict";
/* Copyright © 2022 Seneca Project Contributors, MIT License. */
Object.defineProperty(exports, "__esModule", { value: true });
const Pkg = require('../package.json');
const branchio = require('branchio-sdk');
const defaults = {
    code: '',
    appId: '',
    alias: '',
    stage: '',
    channel: '',
    feature: '',
    campaign: '',
    tags: [],
    debug: false
};
function BranchProvider(options) {
    const seneca = this;
    const getLink = async () => {
        const client = branchio({
            appId: options.appId
        });
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
        });
        return url;
    };
}
Object.assign(BranchProvider, { defaults });
exports.default = BranchProvider;
if ('undefined' !== typeof (module)) {
    module.exports = BranchProvider;
}
//# sourceMappingURL=branchio-provider.js.map