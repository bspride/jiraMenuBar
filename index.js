var menubar = require('menubar')
require('electron-debug')({showDevTools: true})

var mb = menubar()

mb.on('ready', function ready () {
  console.log('app is ready')
  // your app code here
})
