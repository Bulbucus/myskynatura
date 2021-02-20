#!/bin/bash

ssh -i /c/Users/emanu/.ssh/id_ed25519 emanuelfarinha98@34.122.42.138 "cd myskynatura && git pull && sudo docker-compose down && sudo docker-compose up -d"
