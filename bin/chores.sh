#!/usr/bin/env bash

PARENT_DIR="$(dirname "$0")/.."
DATA_DIR="$PARENT_DIR/webcredits"

WEBCREDITS_FILE="$DATA_DIR/webcredits.csv"

POINTS=${1:-0}

if [ "$POINTS" != 0 ] ; then
  echo "$POINTS $(date +%s) $2" >> "$WEBCREDITS_FILE"
fi

tail -20 "$WEBCREDITS_FILE"
