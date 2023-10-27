<template>
  <layout-div>
    <h2 class="text-center mt-5 mb-3">Edit Artikel</h2>
    <div class="card">
      <div class="card-header">
        <router-link class="btn btn-outline-info float-right" to="/artikel/list">View All Article
        </router-link>
      </div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label htmlFor="title">Title</label>
            <input v-model="artikel.title" type="text" class="form-control" id="title" name="title" />
          </div>
          <div class="form-group">
            <label htmlFor="slug">Slug</label>
            <input v-model="artikel.slug" type="text" class="form-control" id="slug" name="slug" />
          </div>
          <div class="form-group">
            <label htmlFor="writer">Writer</label>
            <select class="form-control" v-model="artikel.writer">
              <!-- inline object literal -->
              <option v-for="writer in writers" :value="writer.id" :key="writer.id">{{ writer.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label htmlFor="content">Content</label>
            <textarea v-model="artikel.content" class="form-control" id="content" rows="3" name="content"></textarea>
          </div>
          <div class="form-group">
            <label htmlFor="category">Category</label>
            <select class="form-control" v-model="artikel.category">
              <!-- inline object literal -->
              <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label htmlFor="publishedAt">Published At</label>
            <input v-model="artikel.published_at" type="datetime-local" class="form-control" id="publishedAt"
              name="publishedAt" />
          </div>
          <div class="form-group">
            <label htmlFor="category">Status</label>
            <select class="form-control" v-model="artikel.status">
              <!-- inline object literal -->
              <option v-for="status in statuses" :value="status.id" :key="status.id">{{ status.name }}</option>
            </select>
          </div>
          <button @click="handleSave()" :disabled="isSaving" type="button" class="btn btn-outline-primary mt-3">
            Save
          </button>
        </form>
      </div>
    </div>
  </layout-div>
</template>
  
<script>
import { ref } from 'vue'
import axios from 'axios';
import LayoutDiv from '../../LayoutDiv.vue';
import Swal from 'sweetalert2'
import dayjs from 'dayjs'

export default {
  name: 'ArtikelEdit',
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
      isSaving: false,
      writers: ref([]),
      categories: ref([]),
      statuses: ref([
        {id : 1, name : "Aktif"},
        {id : 2, name : "Tidak Aktif"}
    ])};
  },
  created() {
    this.getWriter();
    this.getCategory();
    const id = this.$route.params.id;
    axios.get(`/api/artikel/${id}`)
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
    handleSave() {
      this.isSaving = true
      this.artikel.published_at = dayjs(this.artikel.published_at).format('YYYY-MM-DD HH:mm:ss')
      const id = this.$route.params.id;
      axios.post(`/api/artikel/edit/${id}`, JSON.stringify(this.artikel))
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Artikel updated successfully!',
            showConfirmButton: false,
            timer: 1500
          })
          this.isSaving = false
          this.artikel.title = ""
          this.artikel.slug = ""
          this.artikel.writer = ""
          this.artikel.content = ""
          this.artikel.category = ""
          this.artikel.published_at = ""
          this.artikel.status = ""
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
    async getWriter() {
      axios.get('/api/writer')
        .then(response => {
          this.writers = response.data.data
          return response
        })
        .catch(error => {
          this.writers = []
          return error
        });
    },
    async getCategory() {
      axios.get('/api/category')
        .then(response => {
          this.categories = response.data.data
          return response
        })
        .catch(error => {
          this.categories = []
          return error
        });
    }
  },
};
</script>