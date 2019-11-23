#!/usr/bin/env bash

npm pack
mv postflight-*.tgz test/e2e/postflight.tgz
cd test/e2e
tar -xvzf postflight.tgz
mv package postflight