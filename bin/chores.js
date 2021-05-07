#!/usr/bin/env node

const infile = '../webcredits/webcredits.json'

const json = require(infile)

const points = process.argv[2]
const secondsSinceEpoch = Math.round(Date.now() / 1000)

if (points) {
  var credit = {amount: points, timestamp: secondsSinceEpoch}
}

console.log(credit)