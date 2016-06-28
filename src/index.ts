import 'reflect-metadata'
import { Component } from '@angular/core'
import { bootstrap } from '@angular/platform-browser-dynamic'

@Component({
  selector: 'app-root',
  template: '<h1>My First Menu Bar</h1>'
})
class JiraApp {

}
document.addEventListener('DOMContentLoaded', () => {
  bootstrap(JiraApp, [])
})
