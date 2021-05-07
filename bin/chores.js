#!/usr/bin/env node

const fs = require('fs')
const infile = __dirname + '/../webcredits/webcredits.json'

var credits = require(infile)

const points = parseInt(process.argv[2])
const secondsSinceEpoch = Math.round(Date.now() / 1000)

if (points) {
  var credit = {amount: points, timestamp: secondsSinceEpoch}
  credits.push(credit)
}

console.log(credit)

fs.writeFileSync(infile, JSON.stringify(credits, null, 1))
