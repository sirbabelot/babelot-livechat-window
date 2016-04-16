docker rm -f chindow
docker rmi -f chindow-img
docker build -t chindow-img .
docker run --name chindow -p 9999:9999 chindow-img
