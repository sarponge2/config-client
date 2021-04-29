const request = require('request-promise')
const dotenv = require('dotenv')
const dp = require('dotenv-parse')
const {ConnectionStringParser} = require("connection-string-parser");
const {UrlBuilder} = require('http-url-builder');

module.exports = async function (connection, cb) {
    connection = connection || process.env.CONFIG_CONNECTION_URL
    try {
        const {username, password, endpoint, options, hosts: [host]} = new ConnectionStringParser({scheme: 'config'})
            .parse(connection);
        const https = !options || !options.hasOwnProperty('ssl') || options.ssl === 'true';
        const port = host.port || (https ? 443 : 80)
        const url = UrlBuilder.create(host.host, port, https).addPath(username).addPath(endpoint)
            .addPath(password + '.env').build()
        const resp = await request.get(url)
        dp.parse(dotenv.parse(resp), {overrideProcessEnv: true})
        cb && cb(undefined);
    } catch (e) {
        if (cb) return cb(e)
        throw e;
    }
}


