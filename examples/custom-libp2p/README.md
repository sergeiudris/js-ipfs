# Customizing your libp2p bundle

This example shows you how to make full use of the ipfs configuration to create a libp2p bundle function. As IPFS applications become more complex, their needs for a custom libp2p bundle also grow. Instead of fighting with configuration options, you can use your own libp2p bundle function to get exactly what you need.

## Before you start

First clone this repo, install dependencies in the project root and build the project.

```console
$ git clone https://github.com/ipfs/js-ipfs.git
$ cd js-ipfs
$ npm install
$ npm run build
```

## Running the example

Running this example should result in metrics being logged out to the console every few seconds.

```
> npm start
```