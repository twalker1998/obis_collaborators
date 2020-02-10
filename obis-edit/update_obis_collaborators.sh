#!/bin/bash

cd /var/www/html/obis_collaborators
sudo rm -rf *
cd /home/twalker/staging/obis_collaborators
sudo cp -r * /var/www/html/obis_collaborators
rm -rf *
