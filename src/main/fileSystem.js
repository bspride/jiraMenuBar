const fs = require('fs')
const os = require('os')
const initialConfig = require('./default/config')
// Constant strings
const FOLDER = 'Jira Menu'
const CONFIG_FILE = 'jiraMenu.config'

class FileSystem {
  constructor () {
    this.appDataPath = `C:/Users/${this.getOsUser()}/AppData/Local/${FOLDER}`
  }

  /**
   * Get the username for the given OS
   */
  getOsUser () {
    let info = os.userInfo()
    return info.username
  }

  /**
   * Setup the app
   */
  setup (callback) {
    let self = this

    try {
      fs.readdir(self.appDataPath, (err, files) => {
        if (err) {
          // Directory not created yet
          console.log(err)
          self.createConfigFile(null, (err) => {
            if (err) throw err
            else {
              // Recall this same method to redo a check
              self.setup(callback)
            }
          })
        } else {
          let path = self.appDataPath + '/'

          for (let file of files) {
            // Config file located
            if (file === CONFIG_FILE) {
              self.readConfigFile(path + file, callback)
            }
          }
        }
      })
    } catch (e) {
      console.error(e)
      callback(e)
    }
  }

  /**
   * Read in the configuration settings
   */
  readConfigFile (file, callback) {
    fs.readFile(file, (err, data) => {
      let config = null

      if (err) {
        console.error(err)
        callback(err)
      } else {
        config = JSON.parse(data)
        callback(config)
      }
    })
  }

  /**
   * Create Configuration file settings
   */
  createConfigFile (settings, callback) {
    let self = this
    let configFile = self.appDataPath + `/${CONFIG_FILE}`

    try {
      fs.mkdir(self.appDataPath, () => {
        if (settings) {
          fs.writeFile(configFile, JSON.stringify(settings), (err) => {
            if (err) throw err
            else callback()
          })
        } else {
          fs.writeFile(configFile, JSON.stringify(initialConfig), (err) => {
            if (err) throw err
            else callback()
          })
        }
      })
    } catch (e) {
      throw e
    }
  }
}

module.exports = FileSystem
