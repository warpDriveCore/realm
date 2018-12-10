cd /var/www/realm/
git pull
rm -rf node_modules
yarn
npm run build
pm2 restart realm