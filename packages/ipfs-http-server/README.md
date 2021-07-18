# ipfs-http-server <!-- omit in toc -->

> The implementation of the IPFS RPC-over-HTTP API

## Install

You probably don't need to install this module directly, use it by installing the `ipfs` module:

```console
$ npm install -g ipfs
// npm install output
$ jsipfs daemon
$ curl -X POST http://localhost:5002/api/v0/id | npx json
{
"ID": "QmdY8wcMj...",
"PublicKey": "CAASpgI...",
...
```