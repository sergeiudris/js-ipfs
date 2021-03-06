# ipfs-core <!-- omit in toc -->

> The IPFS Core API

`ipfs-core` is the implementation of the IPFS Core API. It contains all you need to integrate IPFS into your application.

If you want to run IPFS as a standalone daemon process, see the [ipfs](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs) module.


## Getting Started

The `ipfs-core` package contains all the features of `ipfs` but in a lighter package without the CLI or HTTP servers:

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

## Next Steps

* Look into the [examples](/examples) to learn how to spawn an IPFS node in Node.js and in the Browser
* Read the [Core API docs](https://github.com/ipfs/js-ipfs/tree/master/docs/core-api) to see what you can do with an IPFS node
* Visit https://dweb-primer.ipfs.io to learn about IPFS and the concepts that underpin it
* Head over to https://proto.school to take interactive tutorials that cover core IPFS APIs
* Check out https://docs.ipfs.io for tips, how-tos and more
* See https://blog.ipfs.io for news and more
* Need help? Please ask 'How do I?' questions on https://discuss.ipfs.io

### Browser CDN

You can load IPFS right in your browser by adding the following to your page using the super fast [jsdelivr](https://www.jsdelivr.com) CDN:

```html
<!-- loading the minified version using jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/ipfs-core/dist/index.min.js"></script>

<!-- loading the human-readable (not minified) version jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/ipfs-core/dist/index.min.js"></script>
```

Inserting one of the above lines will make an `IpfsCore` object available in the global namespace:

```html
<script>
async function main () {
const node = await window.IpfsCore.create()
// Ready to use!
// See https://github.com/ipfs/js-ipfs#core-api
}
main()
</script>
```