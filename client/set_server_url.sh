#!/bin/bash

# Get the IP address of the chat-server container
SERVER_IP=$(getent hosts chat-server | awk '{ print $1 ; exit }')

# Set REACT_APP_SERVER_URL environment variable
echo "REACT_APP_SERVER_URL=http://$SERVER_IP:5000" > .env
