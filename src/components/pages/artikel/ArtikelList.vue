<template>
    <layout-div>
          <div class="container">
              <h2 class="text-center mt-5 mb-3">Artikel</h2>
              <div class="card">
                  <div class="card-header">
                      <router-link to="/artikel/create"
                          class="btn btn-outline-primary"
                          >Add Artikel
                      </router-link>
                  </div>
                  <div class="card-body">
               
                      <table class="table table-bordered">
                          <thead>
                              <tr>
                                  <th>Title</th>
                                  <th>Slug</th>
                                  <th>Writer</th>
                                  <th>Content</th>
                                  <th>Category</th>
                                  <th>Published At</th>
                                  <th>Status</th>
                                  <th width="240px">Action</th>
                              </tr>
                          </thead>
                          <tbody>
                               
                              <tr v-for="project in projects" :key="project.id">
                                  <td>{{project.title}}</td>
                                  <td>{{project.slug}}</td>
                                  <td>{{project.writer}}</td>
                                  <td>{{project.content}}</td>
                                  <td>{{project.category}}</td>
                                  <td>{{project.published_at}}</td>
                                  <td>{{project.status}}</td>
                                  <td>
                                      <router-link :to="`/artikel/read/${project.slug}`" class="btn btn-outline-info mx-1">Show</router-link>
                                      <router-link :to="`/artikel/edit/${project.id}`" class="btn btn-outline-success mx-1">Edit</router-link>
                                      <button 
                                          @click="handleDelete(project.id)"
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
    name: 'ArtikelList',
    components: {
      LayoutDiv,
    },
    data() {
      return {
        posts: [],
        projects:[]
      };
    },
    created() {
      this.fetchArtikelList();
    },
    methods: {
        fetchArtikelList() {
        axios.get('/api/artikel')
          .then(response => {
              this.projects = response.data.data;
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
                          title: 'Artikel deleted successfully!',
                          showConfirmButton: false,
                          timer: 1500
                      })
                      this.fetchArtikelList();
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