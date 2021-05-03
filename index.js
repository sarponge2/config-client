const request = require('request-promise')
const dotenv = require('dotenv')
const dp = require('dotenv-parse')
const {ConnectionStringParser} = require("connection-string-parser");
const {UrlBuilder} = require('http-url-builder');
const fs = require('fs');
const path = require('path');

/**
 *
 * @param {string} connection
 * @param {string} [fallback]
 * @param {string} override
 * @return {Promise<void>}
 */
async function config(connection, fallback, override= "") {
    connection = connection || process.env.CONFIG_CONNECTION_URL
    if (override.split(/\s*,\s*/).includes(process.env.NODE_ENV)) {
        dotenv.config({path: fallback});
        return ;
    }
    try {
        const {username, password, endpoint, options, hosts: [host]} = new ConnectionStringParser({scheme: 'config'})
            .parse(connection);
        const https = !options || !options.hasOwnProperty('ssl') || options.ssl === 'true';
        const port = host.port || (https ? 443 : 80)
        const url = UrlBuilder.create(host.host, port, https).addPath(username).addPath(endpoint)
            .addPath(password + '.env').build()
        const resp = await request.get(url)
        dp.parse(dotenv.parse(resp), {overrideProcessEnv: true})
    } catch (e) {
        fallback && dotenv.config({path: fallback});
    }
}

module.exports = config;
