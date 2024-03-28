FROM debian:buster

RUN apt-get update && \
    apt-get install -y \
    build-essential && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

CMD ["bash"]
