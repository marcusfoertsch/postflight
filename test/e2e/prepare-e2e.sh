#!/usr/bin/env bash

npm run build
cd dist
npm pack --quiet
mv postflight-*.tgz ../test/e2e/postflight.tgz
cd ../test/e2e
tar -xzf postflight.tgz
mv package postflight