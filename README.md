# Howl, an Openclassrooms Project

This is the last project in the **Openclassrooms** web developer path.

## Installation

This project uses a **Postgresql** database and a **node express** server that will serve the api and a built **react app**.

There are two ways of having this project running:
1. manually
2. using Docker

### 1. Manually:

Installing the project manually requires to have installed the postgresql database as well as Nodejs.

A new database named Howl then needs to be created. The database dump file present in /init-db/dump-howl.sql needs to be fed to it to create our tables and recover our data.

Depending on the database configuration, user, password etc... the .env file present in the root folder needs to be updated to take the correct informations into account.

Finally, those two commands will need to be executed at the root folder:

```
npm i
```
and
```
npm run startback
```

We can then visit [localhost:3000](http://localhost:3000) to see the project running

### 2. Using Docker

This time, we do not need to have postgresql nor Nodejs installed, for they are already present in the Docker container.

At the root directory, we execute this command.

```
docker-compose up
```

We can then visit [localhost:3000](http://localhost:3000) to see the project running.

Additionally, we can take a look at the database going to [localhost:8080](http://localhost:8080).

To connect to Adminer:

```
system:   postgresSQL
Server:   db
Username: postgres
Password: howl
Database: howl
```

If we ever wanted to use our own SQL client, we could do that using the same values with host **localhost**.

## Usage

In this project, users can create accounts, post original messages or replies, edit or delete their own messages and add animated gifs using [the Tenor gif Api](https://tenor.com/).

However, we might want to try this application as an admin, as it will allow the deletion of any post as well as the access to a users page, to get some stats on the users as well as permiting their *"soft deletion"*.

An admin can also edit the categories.

On the login page, let's enter the following credentials

```
email:    admin@admin.com
password: admin
```

We are all set! Happy reviewing ☕️ 🚀 🌈