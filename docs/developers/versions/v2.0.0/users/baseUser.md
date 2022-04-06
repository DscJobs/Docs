---
shortTitle: Base User
title: Base User
---

A "User" represent's a Discord Account that is used to Access or Login to our Website.
But is not necessarily associated with Discord or its End User Data!

- A Snowflake represent's a Discord Client or User ID

---

## Base URL
<Route method="GET" path="https://api.dscjobs.org" />

---

## User Schema

<Route method="GET" path="/v2/user/:userID" />

### Structure
| Field     | Type        | Description                                                                                         |
| --------- | ----------- | --------------------------------------------------------------------------------------------------- |
| userID    | `Snowflake` | Discord User ID for the Provided User.                                                              |
| status    | `Object`    | Object of Status Checks (premium, staff etc).                                                       |
| premium   | `Object`    | Object of Premium Based Information.                                                                |

### Example Structure
```js:title=HTTP-200
{
  "userID": "510065483693817867",
  "status": {
    "staff": true,
    "banned": false,
    "premium": true
  },
  "premium": {
    "lifetime": true,
    "duration": 1636326070560
  }
}
```

---

### Responses


### HTTP 404
```json
{
    message: "Unable to find that User in our System! Please check the User ID and try again!",
    error: true,
    fatal: false,
    status: 404
}

```

### HTTP 400
```json
{
    message: "Malformed Request. Please check the Provided Params and try again!",
    error: true,
    fatal: false,
    status: 400
}
```

### HTTP 200
```json
{
    message: "Unable to find that User in our System! Please check the User ID and try again!",
    error: true,
    fatal: false,
    status: 404
}
```
