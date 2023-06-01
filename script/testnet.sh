#!/bin/bash
git pull origin dev
sudo yarn install
sudo yarn build:test
pm2 restart ExplorerWebTestnet
echo "testnet update done"
