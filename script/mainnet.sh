#!/bin/bash
git pull origin dev
sudo yarn install
sudo yarn build:main
pm2 restart ExplorerWebMainnet
echo "mainnet update done"
