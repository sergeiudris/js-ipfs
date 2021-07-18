# interface-ipfs-core <!-- omit in toc -->

> A test suite and interface you can use to implement an IPFS core interface.


## Background

The primary goal of this module is to define and ensure that IPFS core implementations and their respective HTTP client libraries offer the same interface, so that developers can quickly change between a local and a remote node without having to change their applications.

It offers a suite of tests that can be run in order to check if the interface is implemented as described.

## Core API

In order to be considered "valid", an IPFS implementation must expose the Core API as described in [/docs/core-api](https://github.com/ipfs/js-ipfs/tree/master/docs/core-api). You can also use this loose spec as documentation for consuming the core APIs.

## Install

In JavaScript land:

```console
$ npm install interface-ipfs-core
```

If you want to run these tests against a go-ipfs daemon, checkout [ipfs-http-client](https://github.com/ipfs/js-ipfs-http-client) and run test tests:

```console
$ git clone https://github.com/ipfs/js-ipfs-http-client
$ npm install
$ npm test
```

## Usage

Install `interface-ipfs-core` as one of the dependencies of your project and as a test file. Then, using `mocha` (for Node.js) or a test runner with compatible API, do:

```js
const tests = require('interface-ipfs-core')
const nodes = []

// Create common setup and teardown
const createCommon = () => ({
  // Do some setup common to all tests
  setup: async () => {
    // Use ipfsd-ctl or other to spawn an IPFS node for testing
    const node = await spawnNode()
    nodes.push(node)

    return node.api
  },
  // Dispose of nodes created by the IPFS factory and any other teardown
  teardown: () => {
    return Promise.all(nodes.map(n => n.stop()))
  }
})

tests.block(createCommon)
tests.config(createCommon)
tests.dag(createCommon)
// ...etc. (see src/index.js)
```

## Running tests

```js
// run all the tests for the repo subsystem
tests.repo(createCommon)
```

### Running tests by command

```js
tests.repo.version(createCommon)
```

### Running only some tests

```js
tests.repo.gc(createCommon, { only: true }) // pass an options object to run only these tests

// OR, at the subsystem level

// runs only ALL the repo.gc tests
tests.repo(createCommon, { only: ['gc'] })
// runs only ALL the object.patch.addLink tests
tests.object(createCommon, { only: ['patch.addLink'] })
```

### Running only specific tests

```js
tests.repo.gc(createCommon, { only: ['should do a thing'] }) // only run these named test(s)

// OR, at the subsystem level
tests.repo(createCommon, { only: ['should do a thing'] })
```

## Skipping tests

```js
tests.repo.gc(createCommon, { skip: true }) // pass an options object to skip these tests

// skips ALL the repo.gc tests
tests.repo(createCommon, { skip: ['gc'] })
// skips ALL the object.patch.addLink tests
tests.object(createCommon, { skip: ['patch.addLink'] })
```

### Skipping specific tests

```js
tests.repo.gc(createCommon, { skip: ['should do a thing'] }) // named test(s) to skip

// OR, at the subsystem level
tests.repo(createCommon, { skip: ['should do a thing'] })

// Optionally specify a reason
tests.repo(createCommon, {
  skip: [{
    name: 'should do a thing',
    reason: 'Thing is not implemented yet'
  }]
})
```