#!/usr/bin/env node

import { execSync as $ } from 'child_process'
import WebSocket from 'ws'

var TIME = 300000

var wsdeploy = true

function loop() {
  console.log('deploying', process.cwd())
  var out = $('./bin/deploy.sh')
  console.log('out', out)
}

function getLastCommit() {
  var lastCommit = $('./bin/gitmark.sh').toString()
  console.log(lastCommit)
  lastCommit = lastCommit?.replace(' ', ':')
  return lastCommit
}

loop()
setInterval(loop, TIME)

if (wsdeploy) {
  try {
    const ws = new WebSocket('ws://gitmark.me:4444')

    ws.on('open', function open() {
      console.log('opened')

      var lastCommit = getLastCommit()

      ws.send('sub ' + lastCommit + ':0')
    })

    ws.on('message', function incoming(message) {
      console.log('received: %s', message)
      // todo if pub run loop
      var tuple = message.split(' ')
      if (tuple[0] === 'pub') {
        $('git pull origin gh-pages')
        lastCommit = getLastCommit()
      }
    })
  } catch (e) {
    console.error(e)
  }
}
