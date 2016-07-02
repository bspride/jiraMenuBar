const menubar = require('menubar')
const mb = menubar()
const { ipcMain } = require('electron')
const Jira = require('./src/main/jiraWrapper')
const storage = require('electron-json-storage')
const keytar = require('keytar')

require('electron-debug')({showDevTools: true})

let jiraClient = null

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
            // Persist to disk
            storage.set('authSettings', {
              host: args.host,
              userName: args.userName,
              avatar: data.avatarUrls['16x16']
            })
            // Save credentials in keychain
            keytar.addPassword('JiraMB', args.userName, args.password)
            // Return to caller
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
