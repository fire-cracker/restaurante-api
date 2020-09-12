# Restauranté Api

[![Build Status](https://travis-ci.org/fire-cracker/restaurante-api.svg?branch=master)](https://travis-ci.org/fire-cracker/restaurante-api)[![Coverage Status](https://coveralls.io/repos/github/fire-cracker/restaurante-api/badge.svg?branch=master)](https://coveralls.io/github/fire-cracker/restaurante-api?branch=master))


## Table of Contents

* [Project Overview](#Project-Overview)
* [Features](#Features)
* [Built with](#built-with)
* [APP Link](#APP-link)
* [API End Points](#API-End-Points)
* [Installation](#Installation)
* [Test](#Test)
* [Contributing](#contributing)
* [License](#License)

## Project Overview
**NodeJs Project** is the backend of build of a restaurant app which allows users to check available menu and book a reservation successfully. It was built from scratch using `mysql` , `sequelize` , `JavaScript`, `typescript` and `Node.js`

## Features

- Users can register/login using website custom forms, or through facebook,
- Users can get all menus
- Users can see menu details by selecting a specific menu
- Users can create reservations
- Users can view the details of a reservation
- Users can view all reservations


## Built with
- `sql`
- `mysql`
- `sequelize`
- `JavaScript`
- `Typescript`
- `Node.js`
- `Express framework`


## APP Link
[Link](https://restaurante-api-gateway.herokuapp.com/) to app on heroku.



## API End Points
<table>
	<tr>
		<th>HTTPS</th>
		<th>ENDPOINT</th>
		<th>DESCRIPTION</th>
	</tr>
	<tr>
		<td>POST</td>
		<td>/auth/signup</td> 
		<td>User Registration</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/auth/login</td> 
		<td>User Login</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/reservations</td> 
		<td>Create Reservation</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/reservations/</td> 
		<td>Fetch all Reservations</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/reservations/:id</td> 
		<td>Fetch a Reservation</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/products/inDepartment/:department</td> 
		<td>Fetch products based on Department</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/menus</td> 
		<td>Fetch all Menus</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/menus/:id</td> 
		<td>Fetch a Menu</td>
	</tr>
</table>  


## Installation
- $ git clone `https://github.com/oyedejipeace/restaurante-api.git`
- $ cd restaurante-api
- $ yarn install , to install dependencies
- Create .env file using the .env.sample file as a guide
- $ yarn start:dev, to start the server
Once the server starts-up, you can query the api at `http://localhost:8080/` using the end points stated above.

## Test
- $ yarn test

## Contributing
>  Feel free to 🍴 fork this repository

>  👯 Clone this repository to your local machine using `https://github.com/oyedejipeace/restaurante-api.git`

> Make Contributions

> 🔃 Create a new pull request using `https://github.com/oyedejipeace/restaurante-api/compare`

## License
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

- **[MIT license](https://oyedejipeace.github.io/restaurante-apia/LICENSE.md)**
- Copyright 2018 © <a href="https://github.com/oyedejipeace/restaurante-api" target="_blank">Restauranté-api</a>

