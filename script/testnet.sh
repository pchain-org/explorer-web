#!/bin/bash
git pull origin dev
sudo yarn install
sudo yarn build:test
pm2 restart ExplorerWebTestnet
pm2 list
echo "testnet update done"
