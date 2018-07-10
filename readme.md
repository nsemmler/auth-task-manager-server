# Galvanize Task Tracker

This repository is designed to demonstrate how to implement authentication and authorization on the backend of a Node and Express application. You will build the client for this application to build a fully featured Full Stack project with authentication and authorization.

## Installation

1. Fork and/or Clone this repository

1. `npm install`

1. `mv .env.sample .env`

1. `createdb galvanize_task_tracker_dev && createdb galvanize_task_tracker_test`

1. `npm test`

All the tests should pass for the project.

## Project Description

You will be adding the frontend to this project so that it is a fully working application. You must:

- [ ] Have a Login page that allows an existing user to login
- [ ] Provide error handling for login if any of the information is missing
- [ ] Have a Register page that allows a new user to register
- [ ] Provide error handling for register if any of the information is missing
- [ ] When a user successfully registers, they will then be automatically logged in
- [ ] When a user successfully registers, they are prompted to create their first list
- [ ] When a user returns to the page and still has a valid token, they are logged in
- [ ] When a user logs in, they are presented with a page that shows all their lists
- [ ] When a user logs in, they are presented with the tasks from one of their lists
- [ ] Users can navigate between lists
- [ ] Users can create new lists
- [ ] Provide error handling for creating new lists if the title is missing
- [ ] Users can create new tasks
- [ ] Provide error handling for creating new tasks if the title is missing
- [ ] Users can complete tasks
- [ ] Users can delete tasks
- [ ] Users are not able to access information for another user's lists

For an example of some of the features, you can watch [this video](https://youtu.be/22v7oG7ivn0).
