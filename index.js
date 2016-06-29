const menubar = require('menubar')
const mb = menubar()
const { ipcMain } = require('electron')
const Jira = require('./src/main/jiraWrapper')

let jiraClient = null

require('electron-debug')({showDevTools: true})

mb.on('ready', () => {
  console.log('app is ready')
  // your app code here
  // IPC events
  ipcMain.on('jira-connect', (event, args) => {
    try {
      jiraClient = new Jira(args)

      // Return user info
      if (jiraClient) {
        jiraClient.getUserInfo(args, (err, data) => {
          event.returnValue = !err
        })
      } else {
        event.returnValue = false
      }
    } catch (e) {
      event.returnValue = false
    }
  })
})
