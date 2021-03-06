# GATOMALO

Server for panamanian fiscal printers, written in NodeJS by [Roberto E. Zubieta][1].

*Software made in Panama*

## Summary
1. Install NodeJS (Minimum Version: 7.6.0. Recommended: 8+)
2. `sudo npm install yarn -g` To enable yarn.
3. `yarn install` to download all dependencies
4. Fill `private.json` with your ZOHO books credentials. Use
  `private.sample.json` as example.
5. `npm run` to start the server

## Details
- Tested on NodeJS 8.1.2 running on Ubuntu 16.04.2 LTS
- The server entry point is in `bin/server.js`
- Written in Koa v2

## Testing
Includes some minimal unit tests for double-checking the output strings. They
can be executed by running `npm test`

## Running through Docker
This server was designed to work directly inside a Docker container. No
`git pull` required.

1. [Install Docker][2]
2. Write `./private.env` with your Zoho Books credentials. Use
  `./private.env.sample` as example.
3. Execute the following command to start the service:
```bash
docker run -p 5000:5000 -v /srv/gatomalo/database:/srv/gatomalo/database \
  --env-file=private.env --device=/dev/ttyUSB0 --restart=always \
  -d zubietaroberto/gatomalo
```
Details about this command:
- _-p_ binds port to 5000 (Allows entry to the server on localhost:5000)
- _-v_ Saves the database file on `/srv/gatomalo/database` on the host machine.
Otherwise the `printed_invoice` will be reset whenever the host image changes.
- _--env-file_ adds the contents of private.env as environment variables to the
container
- _--device_ name of the USB port where the printer is installed. Must be the
same as the one in `./Puerto.txt`
- _--restart_ the service will always start with the host computer.
- _-d_ run as a daemon.
- _zubietaroberto/gatomalo_ the name of this image in *Docker Hub*

## Running through docker-compose
An even easier deployment experience.

1. [Install Docker][2]
2. [Install Docker-Compose][3]
3. `mkdir /srv/gatomalo2`
4. `mkdir /srv/gatomalo2/database`
5. `cd /srv/gatomalo2`
6. Write `/srv/gatomalo2/private.env` with your Zoho Books credentials. Use
  `./private.env.sample` as example.
7. Copy `./docker-compose.yml` into `/srv/gatomalo2/`
8. Start the service: `docker-compose up -d`

The `docker-compose` will install all the dependencies, mount the folder as a
volume, create the SQLite database and automatically restart the container when
the machine restarts.

[1]: https://github.com/zubietaroberto
[2]: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04
[3]: https://docs.docker.com/compose/install/
