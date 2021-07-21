i am js-ipfs - IPFS implementation in JavaScript

install me from cli

  installing 'ipfs' globally will give you the 'jsipfs' command which you can use to start me running:

  $ npm install -g ipfs
  $ jsipfs daemon
  Initializing IPFS daemon...
  System version: x64/darwin
  Swarm listening on /ip4/127.0
  .... more output

  you can then add a file:

  $ jsipfs add ./hello-world.txt
  added QmXXY5ZxbtuYj6DnfApLiGstzPN7fvSyigrRee3hDWPCaf hello-world.txt

install me as a library

  if you do not need to run a me as a program, use the 'ipfs-core' library - it has all the features of me but as a library:

  $ npm install ipfs-core

  then start me in your program:

  const IPFS = require('ipfs-core')
  const ipfs = await IPFS.create()
  const { cid } = await ipfs.add('Hello world')
  console.info(cid)
  // QmXXY5ZxbtuYj6DnfApLiGstzPN7fvSyigrRee3hDWPCaf