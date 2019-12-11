#!/usr/bin/env bash
# run this script at root of repository

rm -rf dist
mkdir -p dist && babel src -d dist
# transform main property
sed 's#"main": "./dist/postflight.js"#"main": "./postflight.js"#' package.json > ./dist/package.json
cp LICENSE ./dist/LICENSE
cp readme.md ./dist/readme.md
