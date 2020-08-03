<template>
	<div class="place-wrapper">
		<label>Where are you?</label>
		<div class="input-wrapper" :class="{'input-wrapper-onfocus': active }">
			<input 
				class="search-input"
				type="text" 
				placeholder="Type the name of an airport"
				v-model="place"
				@change="()=>place=place"
				@keyup="handleKeyUp"
				@focus="()=> active=true"
				@blur="handleBlur"
			/>
			<div class="button-wrapper" v-show="place">
				<button @click.prevent="removePlace">
					<i class="fas fa-times"></i>
				</button>
			</div>
		</div>
		<Places @select-place="selectPlace"/>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	import Places from './Places'
	export default{
		name: 'PlaceInput',
		components: { Places },
		data(){
			return{
				place: '',
				active: false
			}
		},
		methods:{
			...mapActions(['getPlaces', 'setPlace']),
			handleBlur(){
				if(!this.place){
					this.active = false;
				}
			},
			handleKeyUp(){
				if(this.place.length > 2){
					this.getPlaces(this.place)
				}else{
					this.setPlace(null);
				}
			},
			removePlace(){
				this.place = '';
				this.active = false;
				this.setPlace(null);
			},
			selectPlace(selected_place){
				this.place = selected_place;
				this.active = false;
			}
		}
	}
</script>

<style scoped>
	.place-wrapper{
		position: relative;
	}
	.input-wrapper{
		width: 100%;
		height: 45px;
		display: flex;
		box-shadow: 0 0 0 1px #D7D7D7;
	}

	.input-wrapper-onfocus{
		width: 100%;
		height: 45px;
		display: flex;
		box-shadow: 0 0 0 2px #525252;
		outline: none;
	}

	.search-input{
		width: 100%;
		margin: 5px 0;
		border: none;
		padding: 5px 10px;
		font-size: 18px;
		outline: none;
	}

	.button-wrapper{
		display: flex;
		padding-right: 10px;
	}

	.button-wrapper button{
		background-color: transparent;
		border: none;
		cursor: pointer;
	}

	.button-wrapper button i{
		font-size: 17px;
		color: #525252;
	}

	.button-wrapper button .fa-times{
		font-size: 20px;
	}
</style>