#!/usr/bin/env bash

TS="$(date '+%s')"
for asset in "js" "css"; do
    perl -pi -e 's/uysio.'$asset'.*?">/uysio.'$asset'?'$TS'">/g' docs/index.html
done
