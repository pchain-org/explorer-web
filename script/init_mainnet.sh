#!/bin/bash
git pull origin dev
sudo yarn install
sudo yarn build:main
cp -n ./script/ecosystem.config.js.mainnet ecosystem.config.js
pm2 start ecosystem.config.js
echo "mainnet init done"
