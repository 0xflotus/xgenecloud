
# Authentication

## Example and output - signup


### Request

Path

```
**POST** /api/v1/auth/signup
```

Body 

```
{
    "email": "test@example.com",
    "password": "password"
}
```

Header

```
Content-Type:application/json
```


#### Response

Body 

```
{
  "id": 4,
  "email": "test@example.com",
  "email_verified": 0,
  "provider": "local",
  "roles": {
    "user": true
  }
}
```





## Example and output - signin


### Request

Path

```
**POST** /api/v1/auth/signin
```

Body 

```
{
    "email": "test@example.com",
    "password": "password"
}
```

Header

```
Content-Type:application/json
```


#### Response

Body 

```
{
  "id": 4,
  "email": "test@example.com",
  "email_verified": 0,
  "provider": "local",
  "roles": {
    "user": true
  }
}
```






# Authentication - graphql

### Graphiql UI endpoint

```
/graphql
```

## Example and output - signup


### Mutation Request Data

```
mutation {
  SignUp(data: {email: "test@example.com", password: "password"}) {
    id
    email
  }
}
```

### Response

```
{
  "data": {
    "SignUp": {
      "id": 5,
      "email": "test@example.com"
    }
  }
}
```



## Example and output - signin



### Mutation Request Data

```
mutation {
  SignIn(data: {email: "test@example.com", password: "password"}) {
    id
    email
  }
}
```

### Response

```
{
  "data": {
    "SignIn": {
      "id": 5,
      "email": "test@example.com"
    }
  }
}
```


