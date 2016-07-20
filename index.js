const menubar = require('menubar')
const mb = menubar()
const { ipcMain } = require('electron')
const Jira = require('./src/main/jiraWrapper')
const Auth = require('./src/main/auth')

require('electron-debug')({showDevTools: true})

// Time
const minutes = 5
const refreshTime = minutes * 60000

let jiraClient = null

function refreshIssues (issueArgs) {
  if (jiraClient) {
    jiraClient.getIssues(issueArgs, (err, data) => {
      if (!err) {
        // Send Update to renderer view
        mb.window.webContents.send('issues', data)
      }
    })
  }
}

mb.on('ready', () => {
  // let timeout = null
  // let authArgs = null

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
        // Create timer to refresh data
        setInterval(refreshIssues, refreshTime, args)
      }
    })
  })

  ipcMain.on('getIssue', (event, args) => {
    jiraClient.getIssue(args, (err, data) => {
      if (!err) {
        event.sender.send('issue', data)
      }
    })
  })

  ipcMain.on('getComments', (event, args) => {
    jiraClient.getComments(args, (err, data) => {
      if (!err) {
        event.sender.send('comments', data)
      }
    })
  })

  ipcMain.on('addComment', (event, args) => {
    jiraClient.addComment(args, (err, data) => {
      if (err) {
        event.returnValue = false
      } else {
        event.returnValue = true
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
