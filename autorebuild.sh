#!/bin/bash

git pull && 
sudo docker-compose down &&
sudo docker-compuse up -d

