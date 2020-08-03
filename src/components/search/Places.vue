<template>
	<div class="places-wrapper">
		<div 
			v-for="place in allPlaces" 
			:key="place.name"
			@click="handleClick(place)"
			class="place"
		>
			{{ place.city.name }}, {{ place.name }}
		</div>
	</div>
	
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	export default{
		name: 'Places',
		data(){
			return{
				place: '',
			}
		},
		methods:{
			...mapActions(['setPlace']),
			handleClick(place){
				const selected_place = {
					name: place.city.name,
					code: place.city.code
				}

				this.$emit('select-place', `${place.city.name}, ${place.name}` )
				this.setPlace(selected_place)
			}
		},
		computed: mapGetters(['allPlaces']),
	}
</script>
	
<style scoped>
	.places-wrapper{
		margin-top: 2px;
		box-shadow: -1px 0 0 0 #D7D7D7, 1px 0 0 0 #D7D7D7;
		position: absolute;
		width: 100%;
		background-color: #ffffff;
	}

	.place{
		height: 45px;
		display: flex;
		align-items: center;
		padding: 0 15px;
		border-bottom: 1px solid #D7D7D7;
		cursor: pointer;
	}

	.place:hover{
		background-color: #D7D7D7;
	}
</style>