#!/bin/bash

function execute_this {
    "$@"
    local status=$?
    if (( status != 0 )); then
        echo "Error while building the app"
        echo "FAILED"
        exit 1
    fi
    return $status
}

clear
execute_this docker build back -t app-backend
execute_this docker build front -t app-frontend
clear
execute_this docker run -d -p 8000:8000 --net=host --rm app-backend
execute_this docker run -d -p 3000:3000 --net=host --rm app-frontend
clear

echo "
Success!
--------
website: http://127.0.0.1:3000
server:  http://127.0.0.1:8000
"