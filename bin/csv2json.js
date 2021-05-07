#!/usr/bin/env node

const fs = require('fs')

const infile = './webcredits/webcredits.csv'
const outfile = './webcredits/webcredits.json'

var csv = fs.readFileSync(infile)
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

  if (out.amount === '') return

  output.push(out)
  console.log(out)
})

console.log(output)
fs.writeFileSync(outfile, JSON.stringify(output, null, 2))
