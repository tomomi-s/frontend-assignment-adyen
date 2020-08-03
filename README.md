# Jamie's Travel

With this app, we help Jamie to decide her next destination, either Amsterdam, Madrid or Budapest.
She would like to go somewhere with good weather or cheap flights(or both).

This app evaluates the different destinations by calculating the score based on the weather and ticket price. 

You can check the app here: [Jamie's Travel](https://jamies-travel.herokuapp.com/) (Please turn off Ad Blocker to let the app work without any errors)

## Built With
* [Vuejs](https://vuejs.org/) - Framework
* [Vuex](https://vuex.vuejs.org/) - State management
* [OpenWeather](https://openweathermap.org/api) - Weather API
* [Kiwi](https://docs.kiwi.com/) - Flight API
* [vuejs-datepicker](https://github.com/charliekassel/vuejs-datepicker) - Date Picker


## Improvement
* Error handling
* Show the clue or explanation why the selected destination is the best.
* Show a note that weather can be shown only for 7 days from the minimum selectable date.
* Giving more information about flight details(Air carrier, stopovers).
* Give Jamie options to choose what is her prior requirement to search(weather/price).
* Brush up the algorithm for scoring by considering the possible conditions.
* Fix overlapping of the datepicker input over the place options on mobile.
* Testing

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
