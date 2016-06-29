const menubar = require('menubar')
const mb = menubar()
const {ipcMain} = require('electron')
const Jira = require('./src/main/jiraWrapper')

let jira

require('electron-debug')({showDevTools: true})

mb.on('ready', () => {
  console.log('app is ready')
  // your app code here
  // IPC events
  ipcMain.on('jira-connect', (event, args) => {
    try {
      jira = new Jira(args)

      // Return user info
      if (jira) {
        jira.getUserInfo(args, (err, data) => {
          event.returnValue = err || data
        })
      } else {
        event.returnValue = 'Something went wrong, failed connection.'
      }
    } catch (e) {
      event.returnValue = 'Failed to connect to Jira.'
    }
  })
})
