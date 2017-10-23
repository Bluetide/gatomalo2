FROM node:8.7

# Create app repository
RUN mkdir -p /srv/gatomalo
WORKDIR /srv/gatomalo

# Bundle App Source
RUN git clone https://github.com/Bluetide/gatomalo2.git .

# Install Dependencies
RUN yarn install

# Start
EXPOSE 5000
ENV NODE_ENV production
CMD ["npm", "start"]
