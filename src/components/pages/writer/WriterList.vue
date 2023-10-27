<template>
    <layout-div>
          <div class="container">
              <h2 class="text-center mt-5 mb-3">Writer</h2>
              <div class="card">
                  <div class="card-header">
                      <router-link to="/writer/create"
                          class="btn btn-outline-primary"
                          >Add Writer
                      </router-link>
                  </div>
                  <div class="card-body">
               
                      <table class="table table-bordered">
                          <thead>
                              <tr>
                                  <th>Name</th>
                                  <th>Slug</th>
                                  <th>Status</th>
                                  <th width="240px">Action</th>
                              </tr>
                          </thead>
                          <tbody>
                               
                              <tr v-for="writer in writers" :key="writer.id">
                                  <td>{{writer.name}}</td>
                                  <td>{{writer.slug}}</td>
                                  <td>{{writer.status}}</td>
                                  <td>
                                      <router-link :to="`/writer/edit/${writer.id}`" class="btn btn-outline-success mx-1">Edit</router-link>
                                      <button 
                                          @click="handleDelete(writer.id)"
                                          className="btn btn-outline-danger mx-1">
                                          Delete
                                      </button>
                                  </td>
                              </tr>
                                   
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </layout-div>
  </template>
   
  <script>
  import axios from 'axios';
  import LayoutDiv from '../../LayoutDiv.vue';
  import Swal from 'sweetalert2'
   
  export default {
    name: 'WriterList',
    components: {
      LayoutDiv,
    },
    data() {
      return {
        posts: [],
        writers:[]
      };
    },
    created() {
      this.fetchWriterList();
    },
    methods: {
        fetchWriterList() {
        axios.get('/api/writer')
          .then(response => {
              this.writers = response.data.data;
              return response
          })
          .catch(error => {
            return error
          });
      },
      handleDelete(id){
          Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
              if (result.isConfirmed) {
                  axios.get(`/api/artikel/delete/${id}`)
                  .then( response => {
                      Swal.fire({
                          icon: 'success',
                          title: 'Writer deleted successfully!',
                          showConfirmButton: false,
                          timer: 1500
                      })
                      this.fetchWriterList();
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
                  });
              }
            })
      }
    },
  };
  </script>