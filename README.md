
# The Blog

Blog app. Read posts and discuss them.

## Introduction

This is a blog frontend application where users can read and interact with posts. It consumes a blog API that i created too. \
This project was created as a part of The Odin Project Nodejs course curriculum's, and i was able to learn a lot about React and frontend development techniques. \
<br/>
<img width="400" alt="Showcase of the posts page on the blog page" src="https://github.com/user-attachments/assets/42dadb3c-ad56-46b9-9db1-64f6189b1b64">
<br/>
<img width="400" alt="Showcase of the comment system on the blog page" src="https://github.com/user-attachments/assets/7f6ae34d-5c79-42aa-9996-9813ed1ddea2">

## Tech Stack

[![Thecnologies used (React, CSS, Vite, Figma)](https://skillicons.dev/icons?i=react,css,vite,figma)](https://skillicons.dev)

## Features

- Read posts
- Update your profile
- Comment on posts

## Run Locally

#### Pre-requisites
The live API only accept incoming requests from the live frontends, so to run this and fetch data correctly, you'll need your own local version of the API. You can read more about the API and how to set it locally [here](https://github.com/GabyAM/blog-api)

#### How to run
Clone the project

```
git clone https://github.com/GabyAM/blog-api
```

Once in the folder, install dependencies

```
npm install
```
Open the "constants.js" file inside src and replace the API URL 
```
export const API_URL = 'http://localhost:3000'; 
//or whatever port you are using for the API
```

Run the app in dev mode

```
  npm run dev
```

## Related

You can check the repos of the other blog parts: \
[API](https://github.com/GabyAM/blog-api) \
[Dashboard](https://github.com/GabyAM/blog-admin-dashboard)
