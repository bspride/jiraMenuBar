const storage = require('electron-json-storage')
const keytar = require('keytar')

class Auth {
  static test (jiraClient, info, cb) {
    return jiraClient.getUserInfo(info, cb)
  }

  static auth (jiraClient, info, cb) {
    return Auth.test(jiraClient, info, (err, res) => {
      // Save settings to disk
      if (!err) {
        storage.set('authSettings', {
          host: info.host,
          userName: info.userName,
          avatarUrl: res.avatarUrls['16x16'],
          protocol: info.protocol
        })
        keytar.addPassword('JiraMB', info.userName, info.password)
        return cb(res)
      }
    })
  }

  static getAuth (cb) {
    storage.get('authSettings', (err, settings) => {
      if (!Object.keys(settings).length || err) return cb(false)
      const pass = keytar.getPassword('JiraMB', settings.userName)
      if (!pass) return cb(false)

      return cb({
        host: settings.host,
        userName: settings.userName,
        password: pass,
        protocol: settings.protocol,
        avatarUrl: settings.avatarUrl
      })
    })
  }
}

module.exports = Auth
