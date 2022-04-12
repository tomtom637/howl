# Howl, an Openclassrooms Project

This is the last project in the **Openclassrooms** web developer path.

## Installation

This project uses a **Postgresql** database and a **node express** server that will serve the api and a built **react app**.

A postgresql client and nodejs need to be installed.

Then we need to install the required packages to have our server running.

From the root directory (only) we need to execute this command

```
npm i
```

the next step is to initialize the database using the following command from the root directory:

```
node init-db/initDb
```

It will generate a database called Howl with user postgres and password howl on port 5432.

The .env file is supplied in the repository to make things easier.

That's about it, all that remains to do is start the web server:

```
npm run startback
```

and visit the following URL in our favourite web browser:

[localhost:3000](http://localhost:3000)

*The used web browser being our favourite is optional :)*

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