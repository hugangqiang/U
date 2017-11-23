import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {
    userinfo: {},
    totalData: [],
};
const mutations = {
    SAVE_USER(state, info) {
    	state.userinfo = info;
  	},
  	SAVE_TOTAl(state,data){
  		state.totalData = data;
  	}
}


const getters = {
    
}

const actions = {
    
}
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})