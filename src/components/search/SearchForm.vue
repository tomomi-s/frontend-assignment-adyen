<template>
	<div class="search-form-wrapper">
		<h2 class="header-name">Hi Jamie!</h2>
		<h3>We can help you to decide your next destination.</h3>
		<form>
			<div class="form-wrapper">
				<PlaceInput />
				<div>
					<label>When do you want to leave?</label>
					<datepicker 
						placeholder="Select Date" 
						class="datepicker"
						v-model="date"
						:disabledDates="disabledDates"
					></datepicker>
				</div>
				
			</div>
			<div class="search-btn-wrapper">
				<button @click.prevent="handleSubmit" class="btn search-btn">
					Search
				</button>
			</div>
		</form>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	import Datepicker from 'vuejs-datepicker';
	import PlaceInput from './PlaceInput';

	export default{
		name: 'SearchForm',
		components: { PlaceInput, Datepicker },
		data(){
			const today = new Date(new Date().setHours(0,0,0,0));
			return{
				date: new Date(today.setDate(today.getDate() + 1)),
				disabledDates: {
					to: new Date(Date.now() - 8640000)
				}
			}
		},
		methods:{
			...mapActions(['getPlaces', 'setPlace', 'searchFlightAndWeather']),
			handleSubmit(){
				this.searchFlightAndWeather(this.date)
			}
		}
	}
</script>

<style>
	.search-form-wrapper{
		padding: 0 2rem;
	}

	.header-name{
		color: #0abf53;
	}
	.form-wrapper{
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 1rem;
	}

	

	.datepicker input{
		padding: 5px 10px;
		font-size: 18px;
		width: 100%;
		height: 45px;
		border: none;
		box-shadow: 0 0 0 1px #D7D7D7;
	}

	.datepicker input:focus{
		box-shadow: 0 0 0 2px #525252;
		outline: none;
	}

	.search-btn-wrapper{
		display: flex;
		justify-content: flex-end;
	}

	.search-btn{
		margin-top: 10px;
		height: 45px;
		width: 200px;
		float: right;
	}

	@media(max-width: 600px){
		.search-form-wrapper{
			padding: 0 .5rem;
		}

		.form-wrapper{
			grid-template-columns: repeat(1, 1fr);
		}

		.vdp-datepicker .datepicker{
			position: initial;
		}

	}



</style>