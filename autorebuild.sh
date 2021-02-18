#!/bin/bash

ssh -i .ssh/id_ed25519 emanuelfarinha98@34.122.42.138 &&
git pull && 
sudo docker-compose down &&
sudo docker-compose up -d

