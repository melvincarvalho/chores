#!/usr/bin/env node

const fs = require('fs')

const file = './webcredits/webcredits.csv'

var csv = fs.readFileSync(file)
if (csv) {
  csv = csv.toString()
}

const credits = csv.split('\n')
var output = []

credits.forEach(element => {
  const credit = element.split(' ')
  const out = { 'amount': credit[0], 'timestamp': credit[1] }
  console.log(out)
})

