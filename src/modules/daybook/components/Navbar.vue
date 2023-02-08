
<template>
    <nav class="navbar bg-primary">
        <a class="navbar-brand text-white">
            <img src="@/assets/logo.png" alt="logo" height="24" class="d-inline-block align-top mx-2">
            {{ username  }}
        </a>
        <div class="d-flex">
            <button @click="onlogout" class="btn btn-outline-info mx-2">
                <i class="fas fa-sign-out-alt"></i>
                <span>Logout</span>
            </button>
        </div>
    </nav>
</template>

<script>

import  useAuth  from "@/modules/auth/composables/useAuth";
import { useRouter } from "vue-router";

export default {
    setup(){
        const router = useRouter();
        const {logout,username } = useAuth();
        
        return {
            onlogout: ()=> {
                logout()
                router.push({name: 'login'})    
            },
            username
        }
    }
    
}

</script>
