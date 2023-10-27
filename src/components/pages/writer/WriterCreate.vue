<template>
    <layout-div>
      <h2 class="text-center mt-5 mb-3">Create New Writer</h2>
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
                      Save
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
    name: 'WriterCreate',
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
    methods: {
      handleSave() {
          this.isSaving = true
          axios.post('/api/writer/add', JSON.stringify(this.writer))
            .then(response => {
              Swal.fire({
                  icon: 'success',
                  title: 'Writer Berhasil Ditambahkan',
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