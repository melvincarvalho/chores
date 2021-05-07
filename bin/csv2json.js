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
  if (!element) return
  const credit = element.split(' ')
  if (!credit.length) return

  const out = { amount: credit[0], timestamp: credit[1] }
  output.push(out)
  console.log(out)
})

console.log(output)

