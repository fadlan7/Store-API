


# Assignment TokoBelanja API

  

## Setup

 

-  **Install all dependencies:**

<The  request  typ>

	npm install  

-  **Create Database:**

<The  request  typ>

	npx sequelize db:create

**before creating the database make sure to check the database configuration here: [Database configuration](https://github.com/fadlan7/final-project3/blob/main/config/config.js)*

-  **Migrate all table to database:**

<The  request  typ>

	npm run db-migrate

-  **Add a user with admin role to a database:**

<The  request  typ>

	npm run db-seed


-  **Start nodemon:**

<The  request  type>

	npm run dev

**The application is run at `http://localhost:8000`*


-  **Start for production:**

<The  request  type>

	npm run start


-  **Railway deploy link:** [Railway link](https://final-project3-production.up.railway.app/)


  

## Register

  

-  **URL:**

<The  request  type>

	/users/register
	
-  **Method:**

<The  request  type>

	POST

-  **Success response:**

Code: 201

![response register success](https://github.com/fadlan7/final-project2/blob/main/postmanResult/regist.png)

-  **Error response:**

<The  request  type>

	code: 400
	Content: { "message": "Sequelize validation error or sequelize unique constraint error" }
	
	Code: 500
	Content: { "message": "Internal Server Error" }

  

## Login

  

-  **URL:**

<The  request  type>

	/users/login

-  **Method:**

<The  request  type>

	POST

-  **Success response:**

Code: 200

![response login success](https://github.com/fadlan7/final-project2/blob/main/postmanResult/login.png)

-  **Error response:**

<The  request  type>

	code: 400
	Content: { "message": "Sequelize validation error or sequelize unique constraint error" }
		
	Code: 401
	Content: { "message": "User with email .... not found!" }

	Code: 401
	Content: { "message": "Wrong password!" }

	Code: 500

	Content: { "message" : "Internal Server Error" }

  

## Users

### Edit one user


**_Need login before edit user for get the token_**

-  **URL:**

<The  request  type>

	/users/:id

-  **Method:**

<The  request  type>

	PUT

-  **Success response:**

Code: 200

![response edit user success](https://github.com/fadlan7/final-project2/blob/main/postmanResult/edit-user.png)

-  **Error response:**

<The  request  type>
	
	code: 400
	Content: { "message": "Sequelize validation error or sequelize unique constraint error" }
	
	code: 401
	Content: { "message": "jwt must be provided" }

	Code: 403
	Content: { "message": "User with email ... does not have permission to access user with id ..." }

	Code: 404
	Content: { "message": "User with id=... not found" }

	Code: 500
	Content: { "message" : "Internal Server Error" }

  

### Delete one user

  

**_Need login before  delete user for get the token_**

  

-  **URL:**

<The  request  type>

	/users/:id

-  **Method:**

<The  request  type>

	DELETE

-  **Success response:**

Code: 200

![response delete user success](https://github.com/fadlan7/final-project2/blob/main/postmanResult/delete-user.png)

-  **Error response:**

<The  request  type>

	code: 401
	Content: { "message": "jwt must be provided" }

	Code: 403
	Content: { "message": "User with email ... does not have permission to access user with id ..." }

	Code: 404
	Content: { "message": "User with id=... not found" }

	Code: 500
	Content: { "message" : "Internal Server Error" }


### User balance top up


**_Need login before top up a user balance for get the token_**

-  **URL:**

<The  request  type>

	/users/topup

-  **Method:**

<The  request  type>

	PATCH

-  **Success response:**

Code: 200

![response edit user success](https://github.com/fadlan7/final-project2/blob/main/postmanResult/edit-user.png)

-  **Error response:**

<The  request  type>
	
	code: 400
	Content: { "message": "Sequelize validation error or sequelize unique constraint error" }
	
	code: 401
	Content: { "message": "jwt must be provided" }

	Code: 500
	Content: { "message" : "Internal Server Error" }


## Categories

### Create one category


**_Need login before create a category for get the token_**

-  **URL:**

<The  request  type>

	/categories

-  **Method:**

<The  request  type>

	POST

-  **Success response:**

Code: 201

![response edit user success](https://github.com/fadlan7/final-project2/blob/main/postmanResult/edit-user.png)

-  **Error response:**

<The  request  type>
	
	code: 400
	Content: { "message": "Sequelize validation error or sequelize unique constraint error" }
	
	code: 401
	Content: { "message": "jwt must be provided" }

	Code: 403
	Content: { "message": "User with email ... does not have permission to access category" }

	Code: 404
	Content: { "message": "User with id ... not found" }

	Code: 500
	Content: { "message" : "Internal Server Error" }

  

### Get all categories

  

**_Need login before  get all categories  for get the token_**

  

-  **URL:**

<The  request  type>

	/categories

-  **Method:**

<The  request  type>

	GET

-  **Success response:**

Code: 200

![response delete user success](https://github.com/fadlan7/final-project2/blob/main/postmanResult/delete-user.png)

-  **Error response:**

<The  request  type>

	code: 401
	Content: { "message": "jwt must be provided" }

	Code: 403
	Content: { "message": "User with email ... does not have permission to access category" }

	Code: 404
	Content: { "message": "User with id ... not found" }

	Code: 500
	Content: { "message" : "Internal Server Error" }


### Edit one category


**_Need login before edit a categoryfor get the token_**

-  **URL:**

<The  request  type>

	/categories/:categoryId

-  **Method:**

<The  request  type>

	PATCH

-  **Success response:**

Code: 200

![response edit user success](https://github.com/fadlan7/final-project2/blob/main/postmanResult/edit-user.png)

-  **Error response:**

<The  request  type>
	
	code: 400
	Content: { "message": "Sequelize validation error or sequelize unique constraint error" }
	
	code: 401
	Content: { "message": "jwt must be provided" }
	
	Code: 403
	Content: { "message": "User with email ... does not have permission to access category" }

	Code: 404
	Content: { "message": "Category with id ... not found" }

	Code: 500
	Content: { "message" : "Internal Server Error" }

  
### Delete one category


**_Need login before delete a category for get the token_**

-  **URL:**

<The  request  type>

	/categories/:categoryId

-  **Method:**

<The  request  type>

	DELETE

-  **Success response:**

Code: 200

![response edit user success](https://github.com/fadlan7/final-project2/blob/main/postmanResult/edit-user.png)

-  **Error response:**

<The  request  type>
	
	code: 401
	Content: { "message": "jwt must be provided" }

	Code: 403
	Content: { "message": "User with email ... does not have permission to access category" }

	Code: 404
	Content: { "message": "Category with id ... not found" }

	Code: 500
	Content: { "message" : "Internal Server Error" }


## Products

### Create one product


**_Need login before create a product for get the token_**

-  **URL:**

<The  request  type>

	/products

-  **Method:**

<The  request  type>

	POST

-  **Success response:**

Code: 201

![response edit user success](https://github.com/fadlan7/final-project2/blob/main/postmanResult/edit-user.png)

-  **Error response:**

<The  request  type>
	
	code: 400
	Content: { "message": "Sequelize validation error or sequelize unique constraint error" }
	
	code: 401
	Content: { "message": "jwt must be provided" }

	Code: 403
	Content: { "message": "User with email ... does not have permission to access product" }

	Code: 500
	Content: { "message" : "Internal Server Error" }

  

### Get all products

  

**_Need login before  get all products  for get the token_**

  

-  **URL:**

<The  request  type>

	/products

-  **Method:**

<The  request  type>

	GET

-  **Success response:**

Code: 200

![response delete user success](https://github.com/fadlan7/final-project2/blob/main/postmanResult/delete-user.png)

-  **Error response:**

<The  request  type>

	code: 401
	Content: { "message": "jwt must be provided" }

	Code: 404
	Content: { "message": "User with email... not found" }

	Code: 500
	Content: { "message" : "Internal Server Error" }


### Edit one product


**_Need login before edit a product for get the token_**

-  **URL:**

<The  request  type>

	/products/:productId

-  **Method:**

<The  request  type>

	PUT

-  **Success response:**

Code: 200

![response edit user success](https://github.com/fadlan7/final-project2/blob/main/postmanResult/edit-user.png)

-  **Error response:**

<The  request  type>
	
	code: 400
	Content: { "message": "Sequelize validation error or sequelize unique constraint error" }
	
	code: 401
	Content: { "message": "jwt must be provided" }
	
	Code: 403
	Content: { "message": "User with email ... does not have permission to access product" }

	Code: 404
	Content: { "message": "Product with id ... not found" }

	Code: 500
	Content: { "message" : "Internal Server Error" }

  
### Delete one product


**_Need login before delete a product for get the token_**

-  **URL:**

<The  request  type>

	/products/:productId

-  **Method:**

<The  request  type>

	DELETE

-  **Success response:**

Code: 200

![response edit user success](https://github.com/fadlan7/final-project2/blob/main/postmanResult/edit-user.png)

-  **Error response:**

<The  request  type>
	
	code: 401
	Content: { "message": "jwt must be provided" }

	Code: 403
	Content: { "message": "User with email ... does not have permission to access product" }

	Code: 404
	Content: { "message": "Product with id ... not found" }

	Code: 500
	Content: { "message" : "Internal Server Error" }


### Edit the categoryId in a selected product

**_Need login before edit a product for get the token_**

-  **URL:**

<The  request  type>

	/products/:productId

-  **Method:**

<The  request  type>

	PATCH
	
-  **Success response:**

Code: 200

![response edit user success](https://github.com/fadlan7/final-project2/blob/main/postmanResult/edit-user.png)

-  **Error response:**

<The  request  type>
	
	code: 400
	Content: { "message": "Sequelize validation error or sequelize unique constraint error" }
	
	code: 401
	Content: { "message": "jwt must be provided" }
	
	Code: 403
	Content: { "message": "User with email ... does not have permission to access product" }

	Code: 404
	Content: { "message": "Product with id ... not found" }

	Code: 404
	Content: { "message": "Category with id ... not found" }

	Code: 500
	Content: { "message" : "Internal Server Error" }
