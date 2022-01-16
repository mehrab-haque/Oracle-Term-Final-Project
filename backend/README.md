# Node+Express+JWT Token+Oracle user authentication and multi type user support

### Step 1 : Prepare database:
2 Tables are required for this demo:

```
CREATE TABLE users (
    id NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ,
    name varchar(100) not null,
    type NUMBER not null,
    login varchar(100) not null,
    pass varchar(1024) not null,
    PRIMARY KEY(id)
 );

CREATE TABLE items (
    id NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ,
    name varchar(100) not null
);
```
**In the users table, type=1 refers to an admin user and non-admin user otherwise**

### Step 2 : Codebase Setup:
After cloning this repo, run
```
npm install
```
In the project folder root location, create a file named **.env** and paste below environment variables:
```
DB_USER=database_user_name
DB_PASS=database_password
DB_CONNECT_STRING=localhost:1521
jwt_secret=any_secret_key_to_sign_jwt_token
```
Now, run
```
node dev
```

The system will be up and running at port 8080 if not declared otherwise.

### What is demonstrated in the codebase ?
There are 5 routes for authentication, those are:
1. **Login** : Any person can log in.
2. **Register** : Any person can register.
3. **Change Password** : Authenticated user (admin/non-admin) can his/her own password.
4. **List of users** : Only admin users can see list of users.
5. **Delete user** : Only admin users can delete other users.

There are 4 routes for accessing **items** entity, those are:

| Route Name     | Access 
| ----------- | ----------- 
| List      | Anyone       
| Create   | Admin        
| Update      | User       
| Delete   | Admin

Authorization token responded while logging in should be added in header as authorization in the following form:
```
authorization : bearer <token>
```
Token validity is set as 1 day in this example.

Detailed API doc can be found here : https://docs.google.com/spreadsheets/d/1-L3_8BLwWiJdrE-QclphWVAPtGPTLN2JkCREyM9wxZs/edit?usp=sharing 

