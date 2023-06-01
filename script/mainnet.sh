#!/bin/bash
git pull origin dev
sudo yarn install
sudo yarn build:main
pm2 restart ExplorerWebMainnet
pm2 list
echo "mainnet update done"
