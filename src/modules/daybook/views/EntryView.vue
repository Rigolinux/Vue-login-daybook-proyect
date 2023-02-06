<template>
  <div v-if="entry" 
     class="entry-tittle d-flex justify-content-between p-2">
    <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="fs-3 mx-1">{{ month }}</span>
        <span class="fs-4 mx-2 fw-light">{{ yearDay }}</span>
    </div>
    <div>
        <input type="file"
         @change="onSelectedImage"
         ref="imageSelector"
         v-show="false"
         accept="image/jpg, image/jpeg, image/png"
         >
        <button class="btn btn-danger mx-2"
        v-if="entry.id"
         @click="onDeleteEntry"
        >
            Borrar
            <i class="fa fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary mx-2"
         @click="onSelectImage"
        >
            Subir foto
            <i class="fa fa-upload"></i>
        </button>
    </div>
  </div>
  <hr>
  <div 
  v-if="entry"
   class="d-flex flex-column px-3 h-75">

    <textarea 
      
       class="form-control mb-3" rows="3" 
       placeholder="Que estas pensando?"
       v-model="entry.text"
       ></textarea>
  </div>
    <Fab icon ="fa-save"
    @on:click="saveEntry"
    />
    <img
    v-if="entry.picture && !localImage"
    alt="img"
     :src="entry.picture"
     class="img-thumbnail"
     >
     <img
     v-if="localImage"
      alt="img"
     :src="localImage"
     class="img-thumbnail"
     >
    </template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters,mapActions } from 'vuex';
import Swal from 'sweetalert2';
import getMonthYear from '../helpers/getDayMonthYear';
import uploadImage from '../helpers/uploadImage';
export default {
    name: 'EntryView',
    props:{
        id: {
            type: String,
            required: true
        }
    },
    components: {
        Fab: defineAsyncComponent(() => import('@/modules/daybook/components/Fab.vue'))
    },
    data(){
        return{
            entry:null,
            localImage: null,
            file: null
        }
    },
    created(){
        this.loadEntry()
    },
    watch:{
        id(){
            this.loadEntry()
        }
    },
    computed: {
        ...mapGetters('journal', ['getEntryById']),
        day(){
            const date = getMonthYear(this.entry.date)
            return date.day
        },
        month(){
            const date = getMonthYear(this.entry.date)
            return date.month
        },
        yearDay(){
            const date = getMonthYear(this.entry.date)
            return date.yearDay
        }
    },
    methods:{
        loadEntry(){
            this.localImage = null
            this.file = null
            let entry
            if (this.id === 'new'){
                entry = {
                    text: '',
                    picture: '',
                    date: new Date().getTime()
                }
                this.entry = entry
            }
            else{
            entry  = this.getEntryById(this.id)
            if(!entry) return this.$router.push({ name: 'no-entry' })
            this.entry = entry}
        },
        async saveEntry(){
            new Swal({
                title: 'Guardando',
                text: 'Espere por favor',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                }
            })
            Swal.showLoading();

            if(this.file){
                const url = await uploadImage(this.file)
                this.entry.picture = url
            }
            if(this.entry.id){
                await this.updateEntry(this.entry)
            }
            else{
                let id = await this.createEntry(this.entry)
                this.$router.push({name: 'entry',params: {id}})
                
            }
            this.file = null
            Swal.fire('Guardado','Entrada guardada con exito','success')
        },
        
        async onDeleteEntry(){

            const result = await Swal.fire({
                title: '¿Estas seguro?',
                text: "No podras revertir esto",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar',
                cancelButtonText: 'Cancelar'
              })
              if (result.value) {
            new Swal({
                title: 'Borrando',
                text: 'Espere por favor',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                }
            })
            await this.deleteEntry(this.entry.id)
            this.$router.push({name: 'no-entry'}) 
            Swal.fire('Borrado','Entrada borrada con exito','success') 
            }
        },
        ...mapActions('journal',['updateEntry','createEntry','deleteEntry']),
        onSelectedImage(e){
            const file = e.target.files[0]
            if(!file){
                this.localImage = null
                this.file = null
                return
            }

            this.file = file
            const reader = new FileReader()
            reader.onload = (e) => {
                this.localImage = e.target.result
            }
            reader.readAsDataURL(file)
        },
        onSelectImage(){
            this.$refs.imageSelector.click()

        }
    }
}
</script>

<style lang="scss" scoped>
textarea{
   font-size: 20px;
   border: none;
   height: 100%;
   
   &:focus{
         outline: none;
    }
}
img{
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);


}
</style>