#!/bin/bash
shopt -s extglob

(cd client && sencha app build -pro) &&
(cd dashboard && sencha app build -pro) &&
(ssh pollr.nl 'mkdir -p /var/www/pollr/server') &&
(scp -r build/production/Pollr/* pollr.nl:/var/www/pollr/) &&
(scp -r build/production/PollrDashboard pollr.nl:/var/www/pollr/dashboard) &&
(scp -r server/!(node_modules) pollr.nl:/var/www/pollr/server) &&
(ssh pollr.nl 'killall nodemon || killall node || echo "Not running"') &&
(ssh pollr.nl 'source /home/niels/.nvm/nvm.sh && cd /var/www/pollr/server && npm install') &&
(ssh pollr.nl 'source /home/niels/.nvm/nvm.sh && cd /var/www/pollr/server && NODE_ENV=production nohup nodemon')
