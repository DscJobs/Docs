---
title: dscjobs.py
---

On 11.01.2022, the first programmatic Implementation of the API was released: 

[DscJobs.py](https://github.com/ZeroTwo36/dscjobs.py/) by ZeroTwo36 is an async Python Implementation of the API.

# Using DscJobs.py  
## Installation  

By this point, the Library is not available on PyPI, but can be installed using any of these methods:

#### Via PiP
This is propably the easiest way you can do it:  
* If you're on MacOS or Linux, paste this command:
  ```sh
  pip3 install git+https://github.com/ZeroTwo36/dscjobs.py.git
  ```
* Or, for Windows
  ```cmd
  pip install git+https://github.com/ZeroTwo36/dscjobs.py.git
  ```

#### Via GIT
Git is a little more complicated but still no Problem:

* Linux/MacOS:
```sh
git clone https://github.com/ZeroTwo36/dscjobs.py.git
cd dscjobs.py
python3 setup.py install
```
* Windows:
```cmd
git clone https://github.com/ZeroTwo36/dscjobs.py.git
cd dscjobs.py
py setup.py install
```

#### Via WGet
If both of the above Methods fail, feel free to use the more complicated but failsafe method:
On Linux/MacOS:
```sh
wget https://dl.zerotwo36.repl.co/pack/dscjobs.py.txz
cd dscjobs.py
python3 setup.py install
```
On Windows:

```cmd
powershell
wget https://dl.zerotwo36.repl.co/pack/dscjobs.py.txz
::Use a Zip Tool (Like 7zip) to unpack the archive
cd dscjobs.py
py setup.py install
```

## Getting started
Okay, you installed dscjobs! Now it's time to get to coding:

**API V1**:
The API Consists of 2 Main Functions and 2 Classes:
* Class: User : This class stores the data from the /user Endpoint. However, do not directly implement it in your code, as it is uncomfortable to use. 
* Class: Review : This class stores the data from the /rev Endpoint. However, just as for User, do not directly implement it in your code, as it is uncomfortable to use.
* Function: fetchUser : Asynchronous Function that fetches Data from /user and stores it in an instance of User()
* Function: fetchReview : Asynchronous Function that fetches Data from /rev and stores it in an instance of Review()

Example Usage:
```py
from dscjobs import fetchUser, fetchReview
from asyncio import run

async def main():
  userid = input("ID: ")
  user = fetchUser(userid)
  print(user.staff)
  review = fetchReview(userid)
  reviewer = review.user
  print(reviewer.id)
  print(review.rate+" "+review.content)
 
run(main())
```

A Detailed look into the Classes:
* **User**
*   `id` (int) The ID of the User
*   `banned` (bool|int) Has the user been banned?
*   `staff` (bool|int) Is he member of staff?
*   `premium` (bool|int) Is it a premium user?
*   `lifetime` (bool|int) Lifetime subscriber?
*   `created_at` (int) The Unix-Timestamp of the creation of the CV
*   
* **Review**
*   `user` (User) The User that submitted the Review
*   `content` (str) Content of the Review
*   `likes` (int) Review Likes
*   `dislikes` (int) Review DisLikes
*   `reports` (int) Reports
*   `replies` (int) Reply Count
*   `date` (int) The Unix-Timestamp of the creation of the Review
*   `rate` (int) The Rating

**API V1.01**:
The API Consists now of 3 Classes! ::
* Class: ClientSession : Handles Async Coroutines and API Interactions, makes Code really more comfortable to use ;)
* Class: User : This class stores the data from the /user Endpoint. However, do not directly implement it in your code, as it is uncomfortable to use. 
* Class: Review : This class stores the data from the /rev Endpoint. However, just as for User, do not directly implement it in your code, as it is uncomfortable to use.
* Function: fetchUser : Asynchronous Function that fetches Data from /user and stores it in an instance of User()
* Function: fetchReview : Asynchronous Function that fetches Data from /rev and stores it in an instance of Review()

Example Usage:
```py
from dscjobs import fetchUser, fetchReview, ClientSession

client = ClientSession()

@client.once
async def main():
  userid = input("ID: ")
  user = fetchUser(userid)
  print(user.staff)
  review = fetchReview(userid)
  reviewer = review.user
  print(reviewer.id)
  print(review.rate+" "+review.content)
 
client.run()
```

Closer look at the ClientSession Class:
* **ClientSession**
*   `once` (decorator function) The Coroutine to execute on run()
*   `_runner` (Coroutine) Executed by run(). No need to use it yourself.
*   `config` (dict): Configuration.
*   `endpoint_for` (Function) Convert a Review/User back to it's Original Endpoint
*   `run` (Function) Run the @once'd function and quit

