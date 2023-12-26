<!-- markdownlint-disable MD013 -->

# ForumT

## Introduction

ForumT is a group-focused web-based social network application. It's depended on user to create groups according to whatever topics they want to make, then create posts for that group. Other user then can follow the group to update the newest post of that group on the homepage.

The system is currently running at [this](https:forumt.hero3s.site) address. But because the server is hosted in Render free-trial instance, after a long time of inactive,
it'll need approximately 1 - 1.5 minutes to get back working.

## Prerequisites

The sources code is divided in 2 parts: `client` (React with Vite) and `server` (ExpressJS).
Because of that, you'll need [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install packages, run code in the development enviroment, or build the project.

You also will need to setup some enviroment variables. The `.env.example` file lists all the enviroment variables. Copy that and put into a new `.env` file in the same folder as the example file, change some value and you're good to go!

## Installation and usage

### To run the server source code in the development enviroment

```bash
cd server
yarn
yarn dev
```

### To run the client source code in the development enviroment

```bash
cd yarn
yarn
yarn dev
```
