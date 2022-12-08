


# Assignment TokoBelanja API

  

## Setup

 

-  **Install all dependencies:**

<The  request  typ>

	npm install  

-  **Create Database:**

<The  request  typ>

	npx sequelize db:create

**before creating the database make sure to check the database configuration here: [Database configuration](https://github.com/fadlan7/Store-API/blob/main/config/config.js)*

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

-  **Request:**

	*body: 

<The  request  type>

	{
		"full_name": "string",
		"password": "string",
		"gender": "string",
		"email": "string",
	}

-  **Success response:**

Code: 201

![response register success]()

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

-  **Request:**
	*body:

<The  request  type>

	{
		"password": "string",
		"email": "string",
	}

-  **Success response:**

Code: 200

![response login success]()

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

-  **Request:**
	*header: token (string)
	*params: userId (integer)
	*body:

<The  request  type>

	{
		"full_name": "string",
		"email": "string",
	}

-  **Success response:**

Code: 200

![response edit user success]()

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

-  **Request:**
	*header: token (string)
	*params: userId (integer)

-  **Success response:**

Code: 200

![response delete user success]()

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

-  **Request:**
	*header: token (string)
	*body:

<The  request  type>

	{
		"balance": "integer",
	}

-  **Success response:**

Code: 200

![response edit user success]()

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

-  **Request:**
	*header: token (string)
	*body:

<The  request  type>

	{
		"type": "string",
	}


-  **Success response:**

Code: 201

![response edit user success]()

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

-  **Request:**
	*header: token (string)

-  **Success response:**

Code: 200

![response delete user success]()

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

-  **Request:**
	*headers: token (string)
	*params: categoryId (integer)
	*body:

<The  request  type>

	{
		"type": "string",
	}


-  **Success response:**

Code: 200

![response edit user success]()

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

-  **Request:**
	*headers: token (string)
	*params: categoryId (integer)

-  **Success response:**

Code: 200

![response edit user success]()

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

-  **Request:**
	*headers: token (string)
	*body:

<The  request  type>

	{
		"title": "string",
		"price": "integer",
		"stock": "integer",
		"CategoryId": "integer",
	}

-  **Success response:**

Code: 201

![response edit user success]()

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

-  **Request:**
	*headers: token (string)

-  **Success response:**

Code: 200

![response delete user success]()

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

-  **Request:**
	*headers: token (string)
	*params: productId (integer)
	*body:

<The  request  type>

	{
		"price": "integer",
		"stock": "integer",
		"title": "string",
	}

-  **Success response:**

Code: 200

![response edit user success]()

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

 **Request:**
	*headers: token (string)
	*params: productId (integer)

-  **Success response:**

Code: 200

![response edit user success]()

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

-  **Request:**
	*headers: token (string)
	*params: productId (integer)
	*body:

<The  request  type>

	{
		"CategoryId": "integer",
	}
	
-  **Success response:**

Code: 200

![response edit user success]()

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


## TransactionHistories

### Create one transaction


**_Need login before create a transaction for get the token_**

-  **URL:**

	<The  request  type>

		/transactions

-  **Method:**

	<The  request  type>

		POST

-  **Request:**
	*headers: token(string)
	*body: 

	<The  request  type>

		{
			"productId": "integer",
			"quantity": "integer"
		}

-  **Success response:**

	Code: 201

	![response delete user success]()


-  **Error response:**

	<The  request  type>
		
		code: 400
		Content: { "message": "Sequelize validation error or sequelize unique constraint error" }
		
		code: 401
		Content: { "message": "jwt must be provided" }

		Code: 404
		Content: { "message": "Product with id ... not found" }

		Code: 404
		Content: { "message": "Product stock not available" }

		Code: 404
		Content: { "message": "Balance anda tidak mencukupi untuk membayar total harga produk sebesar Rp.... Anda hanya memiliki balance sebesar Rp..." }

		Code: 500
		Content: { "message" : "Internal Server Error" }

  

### Get transaction user

  

**_Need login before  get transaction user for get the token_**

  

-  **URL:**

	<The  request  type>

		/transactions/user

-  **Method:**

	<The  request  type>

		GET

- **Request:**
*headers: token(string)

-  **Success response:**

	Code: 200

	![response delete user success]()

-  **Error response:**

	<The  request  type>

		code: 401
		Content: { "message": "jwt must be provided" }

		Code: 404
		Content: { "message": "User with email... not found" }

		Code: 500
		Content: { "message" : "Internal Server Error" }


### Get transaction admin

  

**_Need login before  get transaction admin for get the token_**

  

-  **URL:**

	<The  request  type>

		/transactions/admin

-  **Method:**

	<The  request  type>

		GET

- **Request:**
*headers: token(string)

-  **Success response:**

	Code: 200

	![response delete user success]()
-  **Error response:**

	<The  request  type>

		code: 401
		Content: { "message": "jwt must be provided" }

	Code: 403
		Content: { "message": "User with email ... does not have permission to access this pages" }
		
		Code: 404
		Content: { "message": "User with email... not found" }

		Code: 500
		Content: { "message" : "Internal Server Error" }


### Get transaction user by Id

  

**_Need login before  get transaction user for get the token_**

  

-  **URL:**

	<The  request  type>

		/transactions/:transactionId

-  **Method:**

	<The  request  type>

		GET

- **Request:**
*headers: token(string)
*params: transactionId(integer)

-  **Success response:**

	Code: 200

	![response delete user success]()

-  **Error response:**

	<The  request  type>

		code: 401
		Content: { "message": "jwt must be provided" }

		Code: 403
		Content: { "message": "User with email ... does not have permission to access transaction with id ..." }
		
		Code: 404
		Content: { "message": "Transaction with id... not found" }

		Code: 500
		Content: { "message" : "Internal Server Error" }