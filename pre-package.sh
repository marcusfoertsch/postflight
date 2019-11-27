#!/usr/bin/env bash

mkdir -p dist && babel src -d dist
sed 's#"main": "./dist/postflight.js"#"main": "./postflight.js"#' package.json > ./dist/package.json
cp LICENSE ./dist/LICENSE
cp readme.md ./dist/readme.md
