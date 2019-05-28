# Update Procfile from web: node server/server.js -> web: node server.js
rm Procfile
touch Procfile
echo 'web: node server.js' > Procfile