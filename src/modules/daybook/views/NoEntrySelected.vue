<template>
    <div class="d-flex justify-content-center">
        <h1 class="align-self-lg-center">No hay elementos seleccionados</h1>
        <Fab 
            @on:click="createNewEntry"
        />
    </div>
</template>
<script>
import { defineAsyncComponent } from 'vue';

export default({
    name: 'NoEntrySelected',
    components: {
        Fab: defineAsyncComponent(() => import('@/modules/daybook/components/Fab.vue')),
    },
    methods:{
        createNewEntry(){
            this.$router.push({name: 'entry',params: {id: 'new'}});
        }
    }
})
</script>

<style lang="scss" scoped>
div{
    height: 100vh;
}
</style>