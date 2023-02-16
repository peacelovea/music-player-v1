import Vue from 'vue'
import Vuex from "vuex";

import playerOptions from "./player";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        playerOptions
    }
})

