<h1> The Stonks </h1>
<h3> The stonks is an investment practice site that was inspired by popular investing site RobinHood</h3>
<br>
</br>

<h1> Helpful Docs </h1>
<ol>
 <li><a href='https://github.com/MatthewSatt/Stonks_Project_w19/wiki/Feature-List'>Feature List</a> </li>
 <li><a href='https://github.com/MatthewSatt/Stonks_Project_w19/wiki/Database-Schema'>DB Schema</a></li>
 <li><a href='https://github.com/MatthewSatt/Stonks_Project_w19/wiki/Feature-List'>User Stories</a></li>
</ol>

<div>

<br>
</br>
<h1> Getting Started </h1>

1. Clone this repo

    * ```https://github.com/MatthewSatt/Stonks_Project_w19.git```

2. Install Backend dependencies inside the python-project-starter directory

    * ```pipenv install```

3. Install Frontend dependencies inside the react-app directory

    * ```npm install```


4. Create a .env file base on the .env.example given in the root directory BEWARE the API keys needed are from Finnhub-python and Rapid-API

5. Setup your username and database based on what you setup in your .env inside POSTGRES and in your own API keys

6. Migrate and Seed models into the DB

    * ```pipenv run flask db upgrade```
    * ```pipenv run flask seed all```

7. You can start the front end from the react-app directory by:

    * ```npm start```
8. You can start the backend from the python-project-starter by:

    * ```pipenv run flask run```

8. You can use the Demo user to log in or create an account of your own.


<h1> Live </h1>

## Features

Logged in users can:

 - Add/Edit/Delete Thier Watchlists
 - Add/ Watchlists
 - View the Detail of all stocks within the site

Logged out users can:
- View the Splash page

##  1. Watch List - Full CRUD
  * get/view created list
  * create list
  * update created list names and elements
  * delete created list or elements

## 2. Portfolio - Full CRUD
  * get/view portfolio
  * add/buy stocks in portfolio
  * delete/sell stocks in portfolio
  * update the company name with an alias name (ie: "Tesla - TSLA" ---> "Elon - TSLA")

##  3. Account Profile
  * get/view profile page

## 4. Specific Stock Detail
  * get/view stock details

## 5. Search Stocks
  * get specific stock details by searching by company name or ticker




<h1>Technologies Used </h1>
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" height=40/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" height=50/>
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"  height=40/>
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg"  height=40/>
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/>
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/>
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/>
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=40/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height=40/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original-wordmark.svg" height=40/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg" height=40/>


</div>
