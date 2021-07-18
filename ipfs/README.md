# js-ipfs

> **Upgrading from <=0.40?** See the [release notes](https://github.com/ipfs/js-ipfs/issues/2656) for the list of API changes and the [migration guide](https://github.com/ipfs/js-ipfs/tree/master/docs/docs/MIGRATION-TO-ASYNC-AWAIT.md).

`ipfs` is the core API, a CLI and a HTTP server that functions as a HTTP to IPFS bridge and an RPC endpoint.

If you want to integrate IPFS into your application without including a CLI or HTTP server, see the [ipfs-core](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-core) module.

## Table of Contents <!-- omit in toc -->

- [Getting Started](#getting-started)
  - [Install](#install)
  - [Next Steps](#next-steps)

## Getting Started

We've come a long way, but this project is still in Alpha, lots of development is happening, APIs might change, beware of 🐉..

### Install

Installing `ipfs` globally will give you the `jsipfs` command which you can use to start a daemon running:

```console
$ npm install -g ipfs
$ jsipfs daemon
Initializing IPFS daemon...
js-ipfs version: x.x.x
System version: x64/darwin
Node.js version: x.x.x
Swarm listening on /ip4/127.0
.... more output
```

You can then add a file:

```console
$ jsipfs add ./hello-world.txt
added QmXXY5ZxbtuYj6DnfApLiGstzPN7fvSyigrRee3hDWPCaf hello-world.txt
```

### Next Steps

* Read the [docs](https://github.com/ipfs/js-ipfs/tree/master/docs)
* Look into the [examples](https://github.com/ipfs/js-ipfs/tree/master/examples) to learn how to spawn an IPFS node in Node.js and in the Browser
* Consult the [Core API docs](https://github.com/ipfs/js-ipfs/tree/master/docs/core-api) to see what you can do with an IPFS node
* Visit https://dweb-primer.ipfs.io to learn about IPFS and the concepts that underpin it
* Head over to https://proto.school to take interactive tutorials that cover core IPFS APIs
* Check out https://docs.ipfs.io for tips, how-tos and more
* See https://blog.ipfs.io for news and more
* Need help? Please ask 'How do I?' questions on https://discuss.ipfs.io