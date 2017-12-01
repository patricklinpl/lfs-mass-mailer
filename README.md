# Mass Mailer

[![Build Status](https://travis-ci.org/UBC-LFS/lfs-mass-mailer.svg?branch=master)](https://travis-ci.org/UBC-LFS/lfs-mass-mailer)
[![Known Vulnerabilities](https://snyk.io/test/github/UBC-LFS/lfs-mass-mailer/badge.svg)](https://snyk.io/test/github/UBC-LFS/lfs-mass-mailer)
[![dependencies Status](https://david-dm.org/UBC-LFS/lfs-mass-mailer/status.svg)](https://david-dm.org/UBC-LFS/lfs-mass-mailer)

[![codecov](https://codecov.io/gh/UBC-LFS/lfs-mass-mailer/branch/master/graph/badge.svg)](https://codecov.io/gh/UBC-LFS/lfs-mass-mailer)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](http://facebook.github.io/jest/)
[![Cypress.io tests](https://img.shields.io/badge/cypress.io-tests-green.svg?style=flat-square)](https://cypress.io)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Quick Overview 

```sh
git clone
npm install
```

### Local Dev

```sh
Frontend:
npm run start-react

Fullstack:
npm run build-react && npm start

Electron: (Electron Branch)
npm run build-react && npm run build && npm run start-electron
```

### Production

```sh
Fullstack (Minified):
npm run build-react && build

Electron: (Electron Branch)
npm run build-react && npm run build && npm run package-mac
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
