<template>
	<div class="weathers">
		<div 
			v-for="weather in weathers"
			:key="weather.date"
			class="weather"
			
		>
			<div>{{ weather.date }}</div>
			<img :src="`http://openweathermap.org/img/wn/${weather.weather.icon}@2x.png`" alt="">
			<div>{{ weather.weather.main }}</div>
			<div>{{ Math.round(weather.temp.max) }} °C / {{ Math.round(weather.temp.min) }} °C</div>	
		</div>
	</div>
</template>

<script>

export default {
	name: 'Weathers',
	props:["weathers"],
}
</script>

<style scoped>
	.weathers{
		display: flex;
		justify-content: center;
		margin-bottom: 30px;
		width: 100%;
		overflow: scroll;
	}

	.weather{
		text-align: center;
		padding: 0 15px;
	}

	.weather img{
		width: 100%;
	}


	@media(max-width: 600px){
		.weathers{
			justify-content: flex-start;
		}
	}
	
</style>