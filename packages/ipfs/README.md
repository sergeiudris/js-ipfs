# ipfs

`ipfs` is the core API, a CLI and a HTTP server that functions as a HTTP to IPFS bridge and an RPC endpoint.

If you want to integrate IPFS into your application without including a CLI or HTTP server, see the [ipfs-core](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-core) module.

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