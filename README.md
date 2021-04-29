
@zicenter/config-client
=======================================

### Zicenter Config Client Library

* * *

Client library for zicenter client servers. It takes in both promise and callback style programming paradigms

*   Accepts a connection string in the format `config://{application}:{environment}@{server-host}[:{port}]/{version}[?ssl=false]`
*   SSL is by default on (*https*) and can optionally be turned off (*http*)
*   Automatically inject resulting properties into the application config or environment vars or application settings
*   Returns a promise yet also accepts a callback

### Download & Installation

```shell
$ npm i @zicenter/config-client
```

### Code Demos

- 1) Passing the connection string in-code (not advised)
```ecmascript 6
const config = require('@zicenter/config-client')

config('config://myapp@prod/my-server.com:7102/v1.0').then(() => {
    console.log(process.env)
    // process.env should contain new env vars merged with already existing
});
```

- 2) Reading the connection string from the environment(recommended)

```ecmascript 6
const config = require('@zicenter/config-client')

// config expects an environment variable [CONFIG_CONNECTION_URL] to be set alredy
config().then(() => {
    console.log(process.env)
    // process.env should contain new env vars merged with already existing
});
```


### Authors or Acknowledgments

*   Emmanuel Oppong-Sarpong

### License

This project is licensed under the ISC License
