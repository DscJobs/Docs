---
title: Random
---

Provides a Random Review for the Provided User ID

---

## Base URL
<Route method="GET" path="https://api.dscjobs.org" />

---

<Route method="GET" path="/v2/random/:userID" />

### Review Schema

#### Structure
| Field     | Type        | Description                                                                                         |
| --------- | ----------- | --------------------------------------------------------------------------------------------------- |
| _id       | `String`    | The Review ID.                                                                                      |
| cv        | `Snowflake` | Discord ID for the Provided User.                                                                   |
| userID    | `Snowflake` | Discord ID for the Author of the Review.                                                            |
| content   | `String`    | The Message Content of the User Review.                                                             |
| likes     | `Array`     | Array of Users's who have Liked the Review.                                                         |
| reports   | `Array`     | Array of User's who have Reported the Review.                                                       |
| pending   | `Boolean`   | If the Review is Pending Moderator Approval (true or false).                                        |
| flagged   | `Boolean`   | If the Review has been flagged for Moderator Review (true or false).                                |
| allowed   | `Boolean`   | If the Review has been approved by a Website Moderator (true or false).                             |
| rate      | `Number`    | Total Rating for this Review based on it's amount of Likes.                                         |
| date      | `Number`    | The Date that the Review was Posted in Milliseconds.                                                |

#### Example Structure
```json
{
      "_id": "61e9be5ddabff20016689f5b",
      "userID": "896951964234043413",
      "cv": "510065483693817867",
      "content": "Toxic Dev is a hard working and dedicated individual! There is no half done work, and he only puts forth his best. If you're looking for someone who will treat your project like their own and is professional you have found it with Toxic. ",
      "likes": [
        "510065483693817867",
        "251736315001831425"
      ],
      "reports": [
        
      ],
      "pending": false,
      "flagged": false,
      "allowed": true,
      "rate": 5,
      "date": 1642708573345,
      "__v": 2
}
```

### Responses

#### HTTP 400
```json
{
    message: "Malformed Request. Please check the Provided Params and try again!",
    error: true,
    fatal: false,
    status: 400
}
```

#### HTTP 404
```json
{
    message: "Hmm, Seems like that User doesn't have any Reviews available!",
    error: true,
    fatal: false,
    status: 404
}
```