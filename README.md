# js-ipfs 

### Install from cli

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

### Install as a library

If you do not need to run a command line daemon, use the `ipfs-core` package - it has all the features of `ipfs` but in a lighter package:

```console
$ npm install ipfs-core
```

Then start a node in your app:

```javascript
const IPFS = require('ipfs-core')

const ipfs = await IPFS.create()
const { cid } = await ipfs.add('Hello world')
console.info(cid)
// QmXXY5ZxbtuYj6DnfApLiGstzPN7fvSyigrRee3hDWPCaf
```