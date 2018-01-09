import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {
    userinfo: {},
    fileList: [],
};
const mutations = {
    SAVE_USER(state, info) {
    	state.userinfo = info;
  	},
  	SAVE_File(state,data){
  		state.fileList = data;
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