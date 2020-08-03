<template>
	<div>
		<div 
			v-for="flight in flights"
			:key="flight.id"
			class="flight"
			
		>
			<div><h2>€ {{ flight.price }}</h2></div>
			<div>
				<div>{{ flight.dTime }} - {{ flight.aTime }} </div>
				<div>({{ flight.fly_duration}})</div>
			</div>
			<a class="btn" :href="flight.link" target="_blank">Check the detail</a>
		</div>
	</div>
</template>

<script>

export default {
	name: 'Flight',
	props:["flights"],
}
</script>

<style scoped>

	
</style>