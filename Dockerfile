FROM node:8.1

# Create app repository
RUN mkdir -p /srv/gatomalo
WORKDIR /srv/gatomalo

# Bundle App Source
RUN apt-get install git -y
RUN git clone https://github.com/Bluetide/gatomalo2.git .

# Install Dependencies
RUN yarn install

# Start
EXPOSE 5000
ENV NODE_ENV production
CMD ["npm", "start"]
