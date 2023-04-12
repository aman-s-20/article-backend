# article-backend
An article web-app.


## 🚧 Technology Stack

- **Server Enviornment** - NodeJS
- **Framework** - ExpressJS
- **Database** - MongoDB
- **Cloud database service** - MongoDB Atlas
- **Deployment** - render

## ⬇️ Installation

- First, fork this repository 🍴 and follow the given instructions:

```
# clone the repository to your local machine
$ git clone `git clone https://github.com/<YOUR-GITHUB-USERNAME>/article-backend.git`

# navigate to the project's directory and install all the relevant dev-dependencies
$ cd article-backend && npm intsall

# Make a .env file and include the details MONGODB_URI=<mongodb_connection_uri> and JWT_SECRET=<jwt_secret_key> for JWT authentication

# Start application
$ node index.js

### For Job Seeker
1. signup
2. login
3. update profile.
4. create article.
5. get all article.

## 🔨 API Endpoints

`/api`
| REQUEST METHODS | ENDPOINTS | DESCRIPTION                 |
| :-------------- | :-------: | ------------------:         |
| POST            | /signup   | add new user to database    |
| POST            | /login    | User login                  |
| GET             | /articles | add new article to database |

`/api/users/:userId`
| REQUEST METHODS | ENDPOINTS | DESCRIPTION                 |
| :-------------- | :-------: | ------------------:         |
| POST            | /articles | add new article to database |
| PUT             | /         | update name or age of user  |

