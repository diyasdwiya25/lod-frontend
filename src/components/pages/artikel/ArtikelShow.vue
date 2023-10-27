<template>
    <layout-div>
         <div class="card">
             <div class="card-body">
                 <p>{{artikel.title}}</p>
                 <p>{{artikel.published_at}}</p>
                 <b className="text-muted">Penulis:</b>
                 <p>{{artikel.writer}}</p>
                 <b className="text-muted">Kategory:</b>
                 <p>{{artikel.category}}</p>
                 <p>{{artikel.content}}</p>
             </div>
         </div>
    </layout-div>
 </template>
  
 <script>
 import axios from 'axios';
 import LayoutDiv from '../../LayoutDiv.vue';
 import Swal from 'sweetalert2'
  
 export default {
   name: 'ArtikelShow',
   components: {
     LayoutDiv,
   },
   data() {
     return {
        artikel: {
        title: '',
        slug: '',
        writer: '',
        content: '',
        category: '',
        published_at: '',
        status: '',
      },
       isSaving:false,
     };
   },
   created() {
     const slug = this.$route.params.slug;
     axios.get(`/api/artikel/read/${slug}`)
     .then(response => {
        let artikelInfo = response.data.data
        this.artikel.title = artikelInfo.title
        this.artikel.slug = artikelInfo.slug
        this.artikel.writer = artikelInfo.writer
        this.artikel.content = artikelInfo.content
        this.artikel.category = artikelInfo.category
        this.artikel.published_at = artikelInfo.published_at
        this.artikel.status = artikelInfo.status
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
      
   },
 };
 </script>