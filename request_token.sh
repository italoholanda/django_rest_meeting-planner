

curl -X POST -d "grant_type=password&username=$USER_NAME&password=$USER_PASSWORD" -u "$CLIENT_ID:$CLIENT_SECRET" http://localhost:8000/o/token/