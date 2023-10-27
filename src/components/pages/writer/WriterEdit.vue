<template>
    <layout-div>
         <h2 class="text-center mt-5 mb-3">Edit Writer</h2>
         <div class="card">
             <div class="card-header">
                 <router-link 
                     class="btn btn-outline-info float-right"
                     to="/writer/list">View All Writer
                 </router-link>
             </div>
             <div class="card-body">
                 <form>
                    <div class="form-group">
                      <label htmlFor="name">Name</label>
                      <input 
                          v-model="writer.name"
                          type="text"
                          class="form-control"
                          id="name"
                          name="name"/>
                  </div>
                    <div class="form-group">
                        <label htmlFor="slug">Slug</label>
                        <input 
                            v-model="writer.slug"
                            type="text"
                            class="form-control"
                            id="slug"
                            name="slug"/>
                    </div>
                    <div class="form-group">
                        <label htmlFor="status">Status</label>
                        <input 
                            v-model="writer.status"
                            type="text"
                            class="form-control"
                            id="status"
                            name="status"/>
                    </div>
                     <button 
                         @click="handleSave()"
                         :disabled="isSaving"
                         type="button"
                         class="btn btn-outline-primary mt-3">
                         Save Project
                     </button>
                 </form>
             </div>
         </div>
    </layout-div>
 </template>
  
 <script>
 import axios from 'axios';
 import LayoutDiv from '../../LayoutDiv.vue';
 import Swal from 'sweetalert2'
  
 export default {
   name: 'WriterEdit',
   components: {
     LayoutDiv,
   },
   data() {
     return {
      writer: {
          name: '',
          slug: '',
          status: '',
        },
       isSaving:false,
     };
   },
   created() {
     const id = this.$route.params.id;
     axios.get(`/api/writer/${id}`)
     .then(response => {
         let writerInfo = response.data.data
          this.writer.title = writerInfo.name
          this.writer.slug = writerInfo.slug
          this.writer.status = writerInfo.status
         return response
     })
     .catch(error => {
         Swal.fire({
             icon: 'error',
             title: 'An Error Occured!',
             showConfirmButton: false,
             timer: 1500
         })
         return error
     })
   },
   methods: {
     handleSave() {
         this.isSaving = true
         const id = this.$route.params.id;
         axios.post(`/api/writer/edit/${id}`, JSON.stringify(this.writer))
           .then(response => {
             Swal.fire({
                 icon: 'success',
                 title: 'Writer updated successfully!',
                 showConfirmButton: false,
                 timer: 1500
             })
             this.isSaving = false
              this.writer.name = ""
              this.writer.slug = ""
              this.writer.status = ""
             return response
           })
           .catch(error => {
             this.isSaving = false
             Swal.fire({
                 icon: 'error',
                 title: 'An Error Occured!',
                 showConfirmButton: false,
                 timer: 1500
             })
             return error
           });
     },
   },
 };
 </script>