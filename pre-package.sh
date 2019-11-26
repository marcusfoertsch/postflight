#!/usr/bin/env bash

mkdir -p dist && babel src -d dist

cp package.json ./dist/package.json
cp LICENSE ./dist/LICENSE
cp readme.md ./dist/readme.md
