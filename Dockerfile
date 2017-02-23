FROM node:7.6-alpine

# Create app repository
RUN mkdir -p /srv/gatomalo
WORKDIR /srv/gatomalo

# Bundle App Source
COPY . /srv/gatomalo

# Install Dependencies
RUN npm install

# Start
EXPOSE 5000
CMD ["npm", "start"]
