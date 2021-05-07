#!/usr/bin/env node

const fs = require('fs')

const file = './webcredits/webcredits.csv'

const csv = fs.readFileSync(file)

console.log(csv)
