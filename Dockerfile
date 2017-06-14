FROM node:8.1-alpine

# Create app repository
RUN mkdir -p /srv/gatomalo
WORKDIR /srv/gatomalo

# Bundle App Source
COPY . /srv/gatomalo

# Install Dependencies
RUN yarn install

# Start
EXPOSE 5000
ENV NODE_ENV production
CMD ["npm", "start"]
