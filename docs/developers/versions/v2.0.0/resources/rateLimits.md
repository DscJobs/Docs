---
shortTitle: Rate Limits
title: Rate Limits
---

Most of our API Endpoints are subject to some sort of Rate Limit Policy.

## Rate Limit Structure

### Global Rate Limit

| Route                   | Request Type    | Max Requests    | Throttle     |
| ----------------------- | --------------- | --------------- | ------------ |
| `*`                     | GET             | 3000/15 Mins    | 15 Min Block |

### User-Specific Rate Limit

| Route                   | Request Type | Max Requests | Throttle     |
| ----------------------- | ------------ | ------------ | ------------ |
| `/v2/user/:userID`      | GET          | 100/15 Mins  | 15 Min Block |

### Review-Specific Rate Limit

| Route                   | Request Type | Max Requests | Throttle     |
| ----------------------- | ------------ | ------------ | ------------ |
| `/v2/rev/all/:userID`   | GET          | 100/15 Mins  | 15 Min Block |

---


## Rate Limit Response Structure

| Field     | Type        | Description                                                                                         |
| --------- | ----------- | --------------------------------------------------------------------------------------------------- |
| code      | `Number`    | The Response's HTTP Status Code.                                                                    |
| error     | `String`    | Title of The Rate Limit Response.                                                                   |
| message   | `String`    | Error Message for the Rate Limit Response.                                                          |
| date      | `Date`      | Date of the Rate Limit (will Reset if Request is repeated).                                         |
| expiresIn | `Number`    | Amount of time until the Rate Limit Expires (in MS - Milliseconds).                                 |

### Example Rate Limit Response
```json
{
    code: 420,
    error: "Enhance your Calm!",
    message: `Woah. Slow down chief! Maximum 100 requests per 15 Minutes`,
    date: 1649262027499,
    expiresIn: 900000,
}
```

---

## Rate Limit Header Structure

| Field                  | Type        | Description                                                                                         |
| ---------------------- | ----------- | --------------------------------------------------------------------------------------------------- |
| x-ratelimit-limit      | `String`    | Maximum number of Requests that can be sent.                                                        |
| x-ratelimit-remaining  | `String`    | Number of Requests Remaining until Rate Limited.                                                    |
| x-ratelimit-reset      | `Boolean`   | Reset the Rate Limit after it Expires (true or false).                                              |
| retry-afer             | `String`    | Amount of Time untill the Rate Limit Expires (in MS - Milliseconds).                                |

---

## Exceeding a Rate Limit
If you exceed the set rate limit for the API you will receive a HTTP 420 (Shown above) and be blocked from sending requests to the API for up to 15 Minutes.

```json
{
  "retry-after": 900000 // 15 Minutes in MS
}
```