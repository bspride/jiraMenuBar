const menubar = require('menubar')
const mb = menubar()
const { ipcMain } = require('electron')
const Jira = require('./src/main/jiraWrapper')
const Auth = require('./src/main/auth')

require('electron-debug')({showDevTools: true})

let jiraClient = null

mb.on('ready', () => {
  console.log('app is ready')
  // IPC events
  ipcMain.on('jira-connect', (event, args) => {
    try {
      jiraClient = new Jira(args)
      if (jiraClient) {
        Auth.auth(jiraClient, args, (data) => {
          event.returnValue = data
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

  ipcMain.on('getIssue', (event, args) => {
    jiraClient.getIssue(args, (err, data) => {
      if (!err) {
        console.log('sending issue')
        event.sender.send('issue', data)
      }
    })
  })

  ipcMain.on('isAuthed', (event) => {
    Auth.getAuth((success) => {
      if (!jiraClient && success) jiraClient = new Jira(success)
      event.returnValue = success
    })
  })

  ipcMain.on('unAuth', (event) => {
    Auth.unAuth((success) => {
      event.returnValue = success
    })
  })
})
