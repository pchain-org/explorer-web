#!/bin/bash
git pull origin dev
sudo yarn install
sudo yarn build:test
cp -r ./script/ecosystem.config.js.testnet ecosystem.config.js
pm2 start ecosystem.config.js
pm2 list
echo "testnet init done"
