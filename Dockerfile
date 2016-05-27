# Dockerfile
# The FROM directive sets the Base Image for subsequent instructions
FROM debian:jessie

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Set environment variables
ENV appDir /opt/node-app/current

# Run update and install deps
RUN apt-get update

# Install needed deps and clean up after
RUN apt-get install -y -q --no-install-recommends \
    apt-transport-https \
    build-essential \
    ca-certificates \
    curl \
    g++ \
    gcc \
    git \
    make \
    nginx \
    sudo \
    wget \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get -y autoclean

# NVM Environment setup
ENV NVM_DIR /use/local/nvm
ENV NODE_VERSION 5.1.0

# Install nvm with node and npm
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# Set up our PATH
ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Set the working directory
RUN mkdir -p /opt/node-app/current
WORKDIR ${appDir}

# Add our package.json and install *before* adding our application files
ADD package.json ./
RUN npm install

# Install pm2 *globally* so we can run our application
RUN npm install pm2 -g

# Add application files
ADD . /opt/node-app/current

# EXPOSE the port
EXPOSE 9999

CMD ["pm2","start", "pm2process.json", "--no-daemon"]
# the --no-daemon is a minor workaround to prevent the docker container from thinking pm2 has stopped running and ending itself

# Refer Commands
# docker build -t kashishgupta1990/hapiapitest .
# docker run --name "hapiapi" -p 9999:9999 kashishgupta1990/hapiapitest (Test-1)
# docker run -d --name "hapiapi" -p 9999:9999  kashishgupta1990/hapiapitest (Test-2)
# docker exec -it hapiapi /bin/bash