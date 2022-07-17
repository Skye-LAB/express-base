# Express Base

This is just an express app template, nothing special just auth.

To start the app, first run `pnpm install`, then run `pnpm run dev`.

# Endpoint

The root endpoint is `http://localhost:8000`.

There is only *user* endpoint.

| Usage    | Endpoint           | Method | Field |
| :---:    | :------:           | :----: | :---: |
| Create   | `/api/users/`      | POST   | `{ username, email, password }` |
| Login    | `/api/users/login` | POST   | `{ email, password }` |
| Find One | `/api/users/:id`   | GET    | `{ header: Auth-Token, params: id }` |
| Find All | `/api/users/`      | GET    | `{ header: Auth-Token` |