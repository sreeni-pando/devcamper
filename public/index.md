
# Udemy- Nodejs



## Indices

* [Authentication](#authentication)

  * [Forgot password](#1-forgot-password)
  * [Reset password](#2-reset-password)
  * [login User](#3-login-user)
  * [register user](#4-register-user)
  * [user info](#5-user-info)

* [Bootcamps](#bootcamps)

  * [Delete Bootcamp](#1-delete-bootcamp)
  * [Get all bootcamps](#2-get-all-bootcamps)
  * [Get specific Bootcamp](#3-get-specific-bootcamp)
  * [create Bootcamp](#4-create-bootcamp)
  * [photo upload](#5-photo-upload)
  * [update single Bootcamp](#6-update-single-bootcamp)

* [Courses](#courses)

  * [Create  Course](#1-create--course)
  * [Delete Course](#2-delete-course)
  * [Get  Course by ID](#3-get--course-by-id)
  * [Get Course](#4-get-course)
  * [Get Courses for bootcamp](#5-get-courses-for-bootcamp)
  * [update course](#6-update-course)


--------


## Authentication



### 1. Forgot password



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/forgotpassword
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-type | application/json |  |



***Body:***

```js        
{
    "email": "dansm777@gmail.com"
}
```



### 2. Reset password



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/resetpassword/dcd97f2f37d4760de8d9ed2b40c0185a9b259de6caef04b490007f1a3add176c
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-type | application/json |  |



***Body:***

```js        
{
    "password": "12345"
}
```



### 3. login User



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/login
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-type | application/json |  |



***Body:***

```js        
{
    "email":"sreeni08.g@gmail.com",
    "password":"123456"
}
```



### 4. register user



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/register
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-type | application/json |  |



***Body:***

```js        
{
    "name":"sreenivaasan",
    "role":"user",
    "email":"sreeni08.g12@gmail.com",
    "password":"123456"
}
```



### 5. user info



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/me
```



## Bootcamps



### 1. Delete Bootcamp



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/bootcamps/5f68c7d46ed55f09914eba46
```



### 2. Get all bootcamps



***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{URL}}/api/bootcamps
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-type | application/json |  |



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| select | name |  |
| limit | 5 |  |



### 3. Get specific Bootcamp



***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{URL}}/api/bootcamps/5f3bf1d5260a060aec5821a6
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | 213qwwe1d11d2d1 |  |



### 4. create Bootcamp



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/bootcamps
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-type | application/json |  |



***Body:***

```js        
{
"name": "test course ownership",
		"description": "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in front end and full stack web development",
		"website": "https://devcentral.com",
		"phone": "(444) 444-4444",
		"email": "enroll@devcentral.com",
		"address": "45 Upper College Rd Kingston RI 02881",
		"careers": [
			"Mobile Development",
			"Web Development",
			"Data Science",
			"Business"
		],
		"housing": false,
		"jobAssistance": true,
		"jobGuarantee": true,
		"acceptGi": true
}
```



### 5. photo upload



***Endpoint:***

```bash
Method: PUT
Type: FORMDATA
URL: {{URL}}/api/bootcamps/5f3bf1d5260a060aec5821a6/photo
```



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| file |  |  |



### 6. update single Bootcamp



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/bootcamps/5f38c232a6361708e7386438
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-type | application/json |  |



***Body:***

```js        
{
    "housing":false
}
```



## Courses



### 1. Create  Course



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/courses/5f795779e7393006676a1ea8/create
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-type | application/json |  |



***Body:***

```js        
{
    "title": "JS Development course123",
    "description": "Get started building mobile applications for JS using Swift and other tools",
    "weeks": 8,
    "tuition": 8000,
    "minimumSkill": "intermediate",
    "scholarhipsAvailable": false
}
```



### 2. Delete Course



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/courses/5f4bafed26b54407b1c6d998
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-type | application/json |  |



### 3. Get  Course by ID



***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{URL}}/api/courses/5f412c92d4f9dc07bb7accaa
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-type | application/json |  |



### 4. Get Course



***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{URL}}/api/courses
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-type | application/json |  |



### 5. Get Courses for bootcamp



***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{URL}}/api/bootcamps/5f3bf1d5260a060aec5821a6/courses
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-type | application/json |  |



### 6. update course



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/courses/5f7957ace7393006676a1ea9
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-type | application/json |  |



***Body:***

```js        
{
    "title": "IOS Development + Web Development123",
    "description": "Get started building mobile applications for IOS using Swift and other tools",
    "weeks": "8",
    "tuition": 3121,
    "minimumSkill": "intermediate"
}
```



---
[Back to top](#udemy--nodejs)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2020-11-29 15:47:42 by [docgen](https://github.com/thedevsaddam/docgen)
