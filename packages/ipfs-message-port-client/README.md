# ipfs-message-port-client <!-- omit in toc -->

> A client library for the IPFS API over [message channel][]. This client library provides (subset) of [IPFS API](https://github.com/ipfs/js-ipfs/tree/master/docs/core-api) enabling applications to work with js-ipfs running in the different JS e.g. [SharedWorker][].

## Install

```bash
$ npm install --save ipfs-message-port-client
```

## Usage

This client library works with IPFS node over the [message channel][] and assumes that IPFS node is provided via `ipfs-message-port-server` on the other end.

It provides following API subset:

- [`ipfs.dag`](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/DAG.md)
- [`ipfs.block`](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/BLOCK.md)
- [`ipfs.add`](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfsadddata-options)
- [`ipfs.addAll`](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfsaddallsource-options)
- [`ipfs.cat`](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfscatipfspath-options)
- [`ipfs.files.stat`](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfsfilesstatpath-options)

A client can be instantiated from the [`MessagePort`][] instance. The primary
goal of this library is to allow sharing a node across browsing contexts (tabs,
iframes) and therefore most likely `ipfs-message-port-server` will be in a
separate JS bundle and loaded in the [SharedWorker][].


```js
const IPFSClient = require('ipfs-message-port-client')
// URL to the script containing ipfs-message-port-server.
const IPFS_SERVER_URL = '/bundle/ipfs-worker.js'

const main = async () => {
  const worker = new SharedWorker(IPFS_SERVER_URL)
  const ipfs = IPFSClient.from(worker.port)
  const data = ipfs.cat('/ipfs/QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n')

  for await (const chunk of data) {
    console.log(chunk)
  }
}
```

It is also possible to instantiate a detached client, which can be attached to
the server later on. This is useful when a server port is received via a message
from another JS context (e.g. iframe)

> Note: Client will queue all API calls and only execute them once it is
> attached (unless they time out or are aborted in the meantime).

```js
const IPFSClient = require('ipfs-message-port-client')


const ipfs = IPFSClient.detached()

const main = async () => {
  const data = ipfs.cat('/ipfs/QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n')

  for await (const chunk of data) {
    console.log(chunk)
  }
}

window.onload = main
window.onmessage = ({ports}) => {
  IPFSClient.attach(ports[0])
}
```

### Notes on Performance

Since client works with IPFS node over [message channel][] all the data passed
is copied via [structured cloning algorithm][], which may lead to suboptimal
results (especially with large binary data). In order to avoid unnecessary
copying all API options have being extended with optional `transfer` property
that can be supplied [Transferable][]s which will be used to move corresponding
values instead of copying.

> **Note:** Transferring data will empty it on the sender side which can lead to
> errors if that data is used again later. To avoid these errors transfer option
> was added so user can explicitily give up reference when it is safe to do so.

```js
/**
 * @param {Uint8Array} data - Large data chunk
 */
const example = async (data) => {
  // Passing `data.buffer` will cause underlying `ArrayBuffer` to be
  // transferred emptying `data` in JS context.
  ipfs.add(data, { transfer: [data.buffer] })
}
```

It is however recommended to prefer web native [Blob][] / [File][] intances as
most web APIs provide them as option & can be send across without copying
underlying memory.

```js
const example = async (url) => {
  const request = await fetch(url)
  const blob = await request.blob()
  ipfs.add(blob)
}
```

[message channel]:https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel
[SharedWorker]:https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker
[`MessagePort`]:https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
[structured cloning algorithm]:https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[Transferable]:https://developer.mozilla.org/en-US/docs/Web/API/Transferable
[Blob]:https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
[File]:https://developer.mozilla.org/en-US/docs/Web/API/File
