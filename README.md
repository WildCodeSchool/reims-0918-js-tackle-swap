# Tackle Swap

## Projet Wild Code School

### Team :

- Gautier
- Mathieu
- Leuthsouline
- Corentin

[Docs Route API](/docs/api.md)

## Installation

Clone the project with the following command

```
git clone git@github.com:WildCodeSchool/reims-0918-js-tackle-swap.git
```

### BACK

---

#### Modules:

First go to the back file and use the following command to install packages.

```
npm install
```

#### Databases:

Open .env.dev file and replace the following fields with your database informations.

```
  DB_HOST=yourlocalhost
  DB_USER=yourroot
  DB_PASS=yourpassword
  DB_DATABASE=yourdatabasename
```

Then rename this file as .env only

#### Migrations:

Use the following command to create the structure of the database.

```
npm run migrate up
```

You can undo migrations with this command

```
npm run migrate down
```

### FRONT

---

#### Modules:

Now go to the front file and use the following command to install packages.

```
npm install
```

#### Environment variable:

The .env reference the listenning adress of the server

### USE THE APP

Use can now use the app, go to the front file and use the following command

```
npm start
```

If you want to get all database's informations, go to the back file use this command

```
node index.js
```
