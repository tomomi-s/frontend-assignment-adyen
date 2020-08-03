<template>
	<div class="">
		<div v-if="Loading" class="loading">
			<i class="fas fa-spinner fa-2x fa-spin"></i>
            <div>Loading....</div>
		</div>
		<div v-if="!Loading && allResults && allResults.length > 0">
			<div class="best-destination">
				<div>
					<span>Your best destination is </span>
					<h1>{{allResults[0].destination}}</h1>
					<span>{{ checkFlights }}</span>
				</div>
			</div>
			<div 
				v-for="(result, index) in allResults"
				:key="result.destination"
				class="container result"
			>
				<h2>{{index + 1}}. {{ result.destination }}</h2>

				<Weather v-if="result.weathers.length > 0" :weathers="result.weathers"/>

				<Flight v-if="result.flights && result.flights.length > 0" :flights="result.flights"/>

				<div v-else class="flight">
					<h2 class="no-result-msg">{{ result.message }}</h2>
				</div>

			</div>
		</div>
		<div v-else-if="allResults && allResults.length === 0" class="best-destination">
			<h2 class="no-result-msg">No flights found for all cities.</h2>
		</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Weather from './Weather';
import Flight from './Flight';

export default {
	name: 'Results',
	components: {
		Weather, Flight
	},
	computed: {...mapGetters(['allResults', 'Loading']),
			checkFlights(){
				if(this.allResults.filter(result=> result.flights).length === 0){
					return "But no flights found. Please search with a different date or airport again."
				}else{
					return null
				}
			}
		}
}
</script>

<style>
	.loading{
		margin-top: 30px;
		text-align: center;
		color: #0abf53;
	}
	.best-destination{
		text-align: center;
		background-color: #0abf53;
		margin-top: 30px;
		padding: 20px 0;
	}

	.best-destination span{
		color: #ffffff;
	}

	.result{
		margin-bottom: 50px;
		padding: 0 2rem;
	}

	.no-result-msg{
		text-align: center;
	}

	.flight{
		display: flex;
		justify-content: space-around;
		align-items: center;
		text-align: center;
		background: #F3F6F9;
		border-radius: 5px;
		margin-bottom: 10px;
	}


	
</style>