# ipfs-message-port-server <!-- omit in toc -->

> A library for providing IPFS node over [message channel][]. This library enables
applications running in the different JS context to use [IPFS API](https://github.com/ipfs/js-ipfs/tree/master/docs/core-api) (subset) via `ipfs-message-port-client`.


## Install

```bash
$ npm install --save ipfs-message-port-server
```

## Usage

This library can wrap a JS IPFS node and expose it over the [message channel][].
It assumes `ipfs-message-port-client` on the other end, however it is not
strictly necessary anything complying with the wire protocol will do.

It provides following API subset:

- [`ipfs.dag`](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/DAG.md)
- [`ipfs.block`](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/BLOCK.md)
- [`ipfs.add`](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfsadddata-options)
- [`ipfs.cat`](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfscatipfspath-options)
- [`ipfs.files.stat`](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfsfilesstatpath-options)

The server is designed to run in a [SharedWorker][] (although it is possible to
run it in the other JS contexts). The example below illustrates running a js-ipfs
node in a [SharedWorker][] and exposing it to all connected ports

```js
const IPFS = require('ipfs')
const { IPFSService, Server } = require('ipfs-message-port-server')

const main = async () => {
  const connections = []
  // queue connections that occur while node was starting.
  self.onconnect = ({ports}) => connections.push(...ports)

  const ipfs = await IPFS.create()
  const service = new IPFSService(ipfs)
  const server = new Server(service)

  // connect new ports and queued ports with the server.
  self.onconnect = ({ports}) => server.connect(ports[0])
  for (const port of connections.splice(0)) {
    server.connect(port)
  }
}

main()
```


### Notes on Performance

Since the data sent over the [message channel][] is copied via
the [structured cloning algorithm][] it may lead to suboptimal
results (especially with large binary data). In order to avoid unnecessary
copying the server will transfer all passed [Transferable][]s which will be emptied
on the server side. This should not be a problem in general as IPFS node itself
does not retain references to returned values, but is something to keep in mind
when doing something custom.


[message channel]:https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel
[SharedWorker]:https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker
[`MessagePort`]:https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
[structured cloning algorithm]:https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[Transferable]:https://developer.mozilla.org/en-US/docs/Web/API/Transferable
[Blob]:https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
[File]:https://developer.mozilla.org/en-US/docs/Web/API/File