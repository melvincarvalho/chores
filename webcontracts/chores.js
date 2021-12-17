#!/usr/bin/env node

import fs from 'fs'

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const infile = __dirname + '/../webcredits/webcredits.json'

var credits = JSON.parse(fs.readFileSync(infile))


const points = parseInt(process.argv[2]) || 5
const secondsSinceEpoch = Math.round(Date.now() / 1000)

if (points) {
  var credit = { amount: points, timestamp: secondsSinceEpoch }
  credits.push(credit)
}

console.log(credit)

fs.writeFileSync(infile, JSON.stringify(credits, null, 1))
