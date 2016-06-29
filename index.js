const menubar = require('menubar')
const mb = menubar()
const { ipcMain } = require('electron')
const Jira = require('./src/main/jiraWrapper')
// const keytar = require('keytar')

// const SERVICE = 'JiraMenubar'

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
          // if (!err) {
          //   storeCredentials(args)
          // }
          event.returnValue = !err
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
        mb.window.webContents.send('issues', data)
      }
    })
  })
})

// function storeCredentials (keys) {
//   keytar.addPassword(SERVICE, keys.userName, keys.password)
// }
