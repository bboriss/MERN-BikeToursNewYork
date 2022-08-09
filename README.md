# MERN-BikeToursNewYork

## Table of contents
* [General info](#general-info)
* [Prerequisites](#prerequisites)
* [Setup](#setup)

## General info
This project is a simple Bike Tours Displayer. It fetches data from MongoDB Atlas Sample Training Collection (sample_training.trips).
It requires basic authentication and authorization. If user wants to see tour details and map with instructions, first has to login.
Before logging in, registration should be done through the service like POSTMAN, Talend API Tester or some other service that represents api.

Users can search tours by name or by key word. That requires index in the MongoDB since there are 10 000 tours in the database.
Index is set on "start station name" field and should be like :
{
  "mappings": {
    "dynamic": true,
    "fields": {
      "start station name": {
        "type": "string"
      }
    }
  }
}


## Prerequisites
* MongoBD
* Mongoose
* Node
* React
* npm
	
## Technologies
Project is created with:
* Bootstrap 5
* React v17.0.2
* Node v16.13.2

## SETUP

## Server-side usage(PORT: 8800)
To run this project, install it locally using npm:

```
$ cd ../api
$ npm install
$ npm run dev
```
	
## Client-side usage(PORT: 3000)
To run this project, install it locally using npm:

```
$ cd ../frontend
$ npm install
$ npm start
```
