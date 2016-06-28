const menubar = require('menubar')
const mb = menubar()
const {ipcMain} = require('electron')
const Jira = require('./src/main/jiraWrapper')

let jira

require('electron-debug')({showDevTools: true})

mb.on('ready', function ready () {
  console.log('app is ready')
  // your app code here
})

// IPC events
ipcMain.on('jira-connect', (event, args) => {
  try {
    jira = new Jira(args)

    // Return some success message for now
    if (jira) {
      event.sender.send('jira-connect-reply', 'success')
    } else {
      event.sender.send('jira-connect-reply', 'Something went wrong, failed connection.')
    }
  } catch (e) {
    event.sender.send('jira-connect-reply', 'Failed to connect to Jira.')
  }
})

