import { computed } from "vue";
import { useStore } from "vuex"

const useAuth = () => {
   const store = useStore();
    
    const createUser = async (user) => {
        //console.log(user);
        const  resp = await store.dispatch('auth/createUser', user);
        return resp;
    }
    const LoginUser = async (user) => {
        const  resp = await store.dispatch('auth/SignInUser', user);
        return resp;
    }

    const checkAuth = async () => {
        const  resp = await store.dispatch('auth/checkAuth');
        return resp;
    }

    return {
        checkAuth,
        createUser,
        LoginUser,
        authStatus: computed(()=> store.getters['auth/getCurrentstate']),
        username: computed(()=> store.getters['auth/getUsername']),
        logout: async () => {store.commit('auth/logout')
        store.commit('journal/clearEntries')
    },
        //store,
    }
}

export default useAuth