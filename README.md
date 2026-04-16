# Todo App API

A simple Express and MongoDB backend for user authentication and personal todo management.

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- bcrypt for password hashing

## Project Structure

```text
todo-app/
|-- assets/
|   |-- api-workflow.png
|   `-- system-design.png
|-- Middleware/
|   `-- authMiddleware.js
|-- routes/
|   `-- user.js
|-- db.js
|-- index.js
|-- package.json
`-- README.md
```

## Database Schema

### User

- `email`: String, unique
- `password`: String
- `username`: String

### Todo

- `title`: String
- `status`: Boolean
- `userId`: ObjectId

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3345
MONGODB_URI=your_mongodb_connection_string
JWT_USER_PASSWORD=your_jwt_secret_key
```

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

The API runs on `http://localhost:3345`.

## Authentication

Protected routes require this header:

```http
Authorization: Bearer <jwt_token>
```

## API Endpoints

Base URL: `/api/v1`

| Method | Endpoint    | Description                          | Auth Required |
| ------ | ----------- | ------------------------------------ | ------------- |
| POST   | `/signup`   | Register a new user                  | No            |
| POST   | `/signin`   | Sign in and receive a JWT            | No            |
| POST   | `/todo`     | Create a todo                        | Yes           |
| GET    | `/todos`    | Get all todos for the logged-in user | Yes           |
| PATCH  | `/todo/:id` | Update a todo by id                  | Yes           |
| DELETE | `/todo/:id` | Delete a todo by id                  | Yes           |

## Request Examples

### Sign Up

```http
POST /api/v1/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "123456",
  "username": "sunny"
}
```

Response:

```json
{
  "message": "signup successfull"
}
```

### Sign In

```http
POST /api/v1/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "123456"
}
```

Response:

```json
{
  "token": "your_jwt_token",
  "message": "signin successfull"
}
```

### Create Todo

```http
POST /api/v1/todo
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Go to gym",
  "status": false
}
```

Response:

```json
{
  "message": "todo added successfully"
}
```

### Get Todos

```http
GET /api/v1/todos
Authorization: Bearer <token>
```

Response:

```json
{
  "todos": [
    {
      "_id": "todo_id",
      "title": "Go to gym",
      "status": false,
      "userId": "user_id",
      "__v": 0
    }
  ]
}
```

### Update Todo

```http
PATCH /api/v1/todo/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Go to gym in the evening",
  "status": true
}
```

Response:

```json
{
  "message": "todo updated successfully"
}
```

### Delete Todo

```http
DELETE /api/v1/todo/:id
Authorization: Bearer <token>
```

Response:

```json
{
  "message": "todo deleted successfully"
}
```

## Notes

- Todos are scoped to the authenticated user.
- If a todo id does not belong to the logged-in user, update and delete return `404`.
- Duplicate signup attempts return a message indicating the email already exists.

## Diagrams

![System Design](assets/system-design.png)

![API Workflow](assets/api-workflow.png)
