#!/bin/bash
git pull
rm -rf node_modules
yarn
npm run build