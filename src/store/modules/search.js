import axios from 'axios';
import moment from 'moment';

const state = {
	places: null,
	selected_place: null,
	selected_date: null,
	results: null,
	loading: false
};

const getters = {
	allPlaces: (state) => state.places,
	allResults: (state) => state.results,
	Loading: (state) => state.loading
};

const actions = {
	//Get place information for autocomplete input
	async getPlaces({commit}, term){
		try{
			const res = await axios.get(`https://api.skypicker.com/locations?term=${term}&locale=en-US&location_types=airport&limit=10&active_only=true&sort=name`)
			const places = res.data.locations;
			commit('setPlaces', places)
		}catch(err){
			console.log(err)
		}
	},
	//Set a code and name of the selected place
	async setPlace({commit}, selected_place){
		commit('setPlace', selected_place)
		commit('setPlaces', [])
	},
	//Search flights and weather 
	async searchFlightAndWeather({commit}, date){
		//initial behavior setting after clicking the search button 
		commit('setLoading', true);
		commit('setResults', null)
		try{
			const formated_date = moment(date).format('DD/MM/yyyy');
			commit('setDate', {formated_date, date})
			//Search and score three destinations
			Promise.all([
				searchInfoAndScore('AMS', 'Amsterdam', '52.3667', '4.8945'),
				searchInfoAndScore('MAD', 'Madrid', '40.4168', '3.7038'),
				searchInfoAndScore('BUD', 'Budapest','47.4979', '19.0402')
			]).then((results)=>{
				console.log(results)
				//Check if all results have total score more than 0.(means there is something to show) 
				if(results.filter(result=> result.total_score).length > 0){
					//Sort the results array based on the total score
					const sorted_results = results.sort((a,b) => {
						if(b.total_score !== a.total_score){
							return b.total_score - a.total_score;
						}
						//if the total is same, sort by the cheapest flight price
						else{
							return a.cheapest_flight_price - b.cheapest_flight_price;
						}
						
					});
					commit('setResults', sorted_results)
				}else{
					commit('setResults', [])
				}
				//Stop loading icon after the results are set
				commit('setLoading', false);
			})
		}catch(err){
			console.log(err)
		}
	},
};

const mutations = {
	setPlaces: (state, places) => state.places = places,
	setPlace: (state, selected_place) => state.selected_place = selected_place,
	setDate: (state, dates) => state.selected_date = dates,
	setResults: (state, results) => state.results = results,
	setLoading: (state, loading) => state.loading = loading
};


// Function to search flights and weather with a departure location and destination 
const searchInfoAndScore = async (city, destination, lat, lon) => {
	const searchFlight = async() => {
		//Get flights
		const res_flights = await axios
			.get(`https://api.skypicker.com/flights?
				fly_from=${state.selected_place.code}
				&fly_to=${city}
				&date_from=${state.selected_date.formated_date}
				&date_to=${state.selected_date.formated_date}
				&v=3
				&partner=picky
				&vehicle_type=aircraft
				&max_fly_duration=25
				&flight_type=oneway
				&adults=1
				&max_stopovers=2
				&limit=3`)
		//Sort out the flight array with necessary information
		const summarized_flights = 
			await res_flights.data.data.map((flight)=> { 
				return{
					id: flight.id, 
					cityTo: flight.cityTo, 
					cityFrom: flight.cityFrom, 
					price: flight.price, 
					link: flight.deep_link, 
					fly_duration: flight.fly_duration, 
					dTime: moment.unix(flight.dTime).format('HH:mm'), 
					aTime: moment.unix(flight.aTime).format('HH:mm'), 
				}
			})
		//Score the cheapest flight with the price
		const scoring_flight = async () => {
			let score;
			const cheapest = summarized_flights[0].price
			if(cheapest < 100){
				score = 10
			}else if(cheapest < 200){
				score = 9
			}else if(cheapest < 300){
				score = 8
			}else if(cheapest < 400){
				score = 7
			}else if(cheapest < 500){
				score = 6
			}else if(cheapest < 600){
				score = 5
			}else if(cheapest < 700){
				score = 4
			}else if(cheapest < 800){
				score = 3
			}else if(cheapest < 900){
				score = 2
			}else{
				score = 1
			}
			return score / 2;
			
		}

		let flight_score = 0;
		if(summarized_flights.length > 0){
			flight_score = await scoring_flight();
		}
		return { summarized_flights, flight_score }
	}

	const searchWeather = async() => {
		//Get weather of the destination
		const res_weather = await axios
			.get(`https://api.openweathermap.org/data/2.5/onecall?
				lat=${lat}
				&lon=${lon}
				&exclude=hourly,minutely
				&units=metric
				&appid=${process.env.VUE_APP_OPENWEATHER_API}`);

		//Sort out the weather array with necessary information. 
		//Filter to show only the weather which after the selected date
		const date_timestamp = new Date(state.selected_date.date).getTime() / 1000;
		const summarized_weathers = 
			await res_weather.data.daily
					.filter(daily_weather=> daily_weather.dt > date_timestamp)
					.map((daily_weather)=>{
						return{
							date: moment.unix(daily_weather.dt).format('DD/MM'),
							weather: daily_weather.weather[0], 
							temp: daily_weather.temp
						}
					})			
		//Score the weather with weather id
		const scoring_weahter = async () => {
			const total_score = await summarized_weathers
				.map((daily_weather)=>{
					const weather = daily_weather.weather.id
					let score;
					//Clear
					if(weather === 800){
						score = 5
					//Cloud
					}else if(weather > 800){
						score = 3
					//Others(Bad weather)
					}else{
						score = 1
					}
					return score;
				})
				.reduce((acc, current)=> acc + current, 0)
			//Calculate the average score for one day weather with a number of the days
			const average = total_score / summarized_weathers.length;
			return average		
		}

		let weather_score = 0;
		if(summarized_weathers.length > 0){
			weather_score = await scoring_weahter()
		}

		return { summarized_weathers, weather_score }
	}

	return Promise.all([searchFlight(), searchWeather()])
		.then((results)=>{
			//If there is no flight
			if(!results[0].flight_score){
				return {
					destination,
					total_score: results[1].weather_score,
					weathers: results[1].summarized_weathers,
					message: 'No flights found'
				}
			}else{
				const total_score = results[0].flight_score + results[1].weather_score;
				return {
					destination,
					total_score,
					flight_score: results[0].flight_score,
					weather_score: results[1].weather_score,
					flights: results[0].summarized_flights,
					weathers: results[1].summarized_weathers,
					cheapest_flight_price: results[0].summarized_flights[0].price
				}
			}			
		})
}

export default{
	state,
	getters,
	actions,
	mutations
}