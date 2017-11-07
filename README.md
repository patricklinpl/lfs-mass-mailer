# Mass Mailer

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Quick Overview 

```sh
git clone
npm install
```
### React-Dev

```sh
npm run start-react
```

### Local Dev & Production

```sh
npm run build-react
npm run start
```

## Setup SMTP server

### Create .env

Create `.env` file and specify the following:

```
ACCOUNT_USER=
ACCOUNT_PASS=
ACCOUNT_EMAIL=
ACCOUNT_NAME=
EMAIL_HOST=
EMAIL_PORT=
EMAIL_SECURE=
```

Property	|	Type	|	Description
:-----------------------|:--------------|:--------------------------------
ACCOUNT_USER	|	string	|	account login username 
ACCOUNT_PASS | string  | account login password 
ACCOUNT_EMAIL	|	string	|	account email
ACCOUNT_NAME | string | user's full name
EMAIL_HOST	|	string	|	host server 
EMAIL_PORT | number | port number
EMAIL_SECURE	|	bool |	specify false. if `EMAIL_PORT` = `465`, specify true
