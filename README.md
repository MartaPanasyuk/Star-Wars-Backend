# STAR WARS API

# Installation

- First. clone the project:  
  ` git clone git@github.com:MartaPanasyuk/Star-Wars-Backend.git`

- Navigate into the project folder:  
  `cd Star-Wars-Backend`

- Install all dependencies:  
  `npm i` or `npm install`

- Start the App:  
  `npm start`

- Open [localhost](http://localhost:4000) in your browser.

# Usage

## Endpoints

### 1. `/movie/<movie_title>`

Get the list of [movie characters](https://swapi.dev/documentation#people) by [movie title](https://swapi.dev/documentation#films) (mandatory) from SWAPI

Optional filter by `gender`  
Optinal sorting by `height` (ascending or descending) or by `age` (ascending or descending; characters whose age is not specified are always put to the end of list)

Example Request :

- http://localhost:4000/movie/hope
- http://localhost:4000/movie/hope/?gender=male
- http://localhost:4000/movie/hope/?height=ascending
  http://localhost:4000/movie/hope/?gender=male&age=descending

### 2. `/planets/?climate=<climate>`

Get the [planets](https://swapi.dev/documentation#planets) name filtered by `climate` (mandatory) with details on dark-haired [residents](https://swapi.dev/documentation#people) of each planet from SWAPI

Example request:

- http://localhost:4000/planets/?climate=arid

## Pagination

The pagination is done of the batches of 30.
