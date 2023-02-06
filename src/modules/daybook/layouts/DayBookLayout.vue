<template>
  <navbar />
  <div  v-if="isLoading"
        class="row justify-content-md-center">
        <div class="col-3 alert-info text-center mt-5">
            Espere por favor...
            <h3 class="mt-2">
                <i class="fa fa-spin fa-sync"></i>
            </h3>
        </div>
    </div>
    

  <template v-else>
    <div class="d-flex">
      <div class="col-4">
          <EntryList />
      </div>
      <div class="col">
          <router-view />
      </div>
    </div>
  </template>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapActions,mapState } from 'vuex';

export default {
    components:{
        Navbar: defineAsyncComponent(() => import('@/modules/daybook/components/Navbar.vue')),
        EntryList : defineAsyncComponent(() => import('@/modules/daybook/components/EntryList.vue'))
    },
    methods:{
        ...mapActions('journal',['loadEntry'])
    },
    created(){
      this.loadEntry();
    },
    computed:{
        ...mapState('journal',['isLoading'])
    }
}
</script>

<style>

</style>
