const menubar = require('menubar')
const mb = menubar()
const { ipcMain } = require('electron')
const Jira = require('./src/main/jiraWrapper')

let jiraClient = null

require('electron-debug')({showDevTools: true})

mb.on('ready', () => {
  console.log('app is ready')
  // IPC events
  ipcMain.on('jira-connect', (event, args) => {
    try {
      jiraClient = new Jira(args)

      // Return user info
      if (jiraClient) {
        jiraClient.getUserInfo(args, (err, data) => {
          if (err) {
            event.returnValue = false
          } else {
            event.returnValue = data
          }
        })
      } else {
        event.returnValue = false
      }
    } catch (e) {
      event.returnValue = false
    }
  })

  ipcMain.on('getIssues', (event, args) => {
    jiraClient.getIssues(args, (err, data) => {
      if (!err) {
        event.sender.send('issues', data)
      }
    })
  })
})
