import Vuex from 'vuex';
import Vue from 'vue';
import search from './modules/search';


//Load Vuex
Vue.use(Vuex);

//Create store
export default new Vuex.Store({
	modules: {
		search
	}
})
