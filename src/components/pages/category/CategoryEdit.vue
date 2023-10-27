<template>
    <layout-div>
         <h2 class="text-center mt-5 mb-3">Edit Category</h2>
         <div class="card">
             <div class="card-header">
                 <router-link 
                     class="btn btn-outline-info float-right"
                     to="/category/list">View All Category
                 </router-link>
             </div>
             <div class="card-body">
                 <form>
                    <div class="form-group">
                      <label htmlFor="name">Name</label>
                      <input 
                          v-model="category.name"
                          type="text"
                          class="form-control"
                          id="name"
                          name="name"/>
                  </div>
                    <div class="form-group">
                        <label htmlFor="description">Description</label>
                        <input 
                            v-model="category.description"
                            type="text"
                            class="form-control"
                            id="description"
                            name="description"/>
                    </div>
                    <div class="form-group">
                        <label htmlFor="status">Status</label>
                        <input 
                            v-model="category.status"
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
   name: 'categoryEdit',
   components: {
     LayoutDiv,
   },
   data() {
     return {
      category: {
          name: '',
          description: '',
          status: '',
        },
       isSaving:false,
     };
   },
   created() {
     const id = this.$route.params.id;
     axios.get(`/api/category/${id}`)
     .then(response => {
         let categoryInfo = response.data.data
          this.category.name = categoryInfo.name
          this.category.description = categoryInfo.description
          this.category.status = categoryInfo.status
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
         axios.post(`/api/category/edit/${id}`, JSON.stringify(this.category))
           .then(response => {
             Swal.fire({
                 icon: 'success',
                 title: 'category updated successfully!',
                 showConfirmButton: false,
                 timer: 1500
             })
             this.isSaving = false
              this.category.name = ""
              this.category.description = ""
              this.category.status = ""
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