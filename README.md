# Socii

A Social-Networking Application, built with React and ExpressJS. Database is managed with Prisma and MySQL.

This is a group project for INT3306 22 class - Web Application Development.

## Team Members

| Name                   | Student ID |
| --------------         | ---------- |
| Nguyen Kien Thai Duong | 20020043   |
| Hoang Viet Hai         | 20020049   |
| Mai Tuan Nghia         | 20020262   |
| Ngo Tuan Minh          | 20020059   |

# Functionality

## Installation

First, clone the repositories to this folder structure:

[socii-be](https://github.com/haimeo1201/socii-be) <br>
├── *(repo's file)* <br>
[socii-fe](https://github.com/duongdaydungso/socii-fe) <br>
├── build <br>
├── *(repo's file)* <br>

Then, adjust the `REACT_APP_BACKEND_URL` environment variable in `socii-fe/.env` to the backend's host's URL (default is [localhost:8080](http://localhost:8080)) and `FRONTEND_URL` in `socii-be/.env` to the frontend's host's URL (default is [localhost:3000](http://localhost:3000)).

In production, both of these URL should be the domain name of the deployment server.

Next, install the dependencies for both the backend and the frontend:

```bash
cd socii-be
npm i
cd ../socii-fe
npm i
```

Next, compile a production build of the frontend:

```bash
cd socii-fe
npm run build
```

Then, initialize the database with Prisma:

```bash
cd socii-be
npm run initdb
```

Finally, start the server from backend:

```bash
cd socii-be
npm run dev
```

Website should be available at [localhost:8080](http://localhost:8080).
