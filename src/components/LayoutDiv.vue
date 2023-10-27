<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/writer/list">Writer
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/category/list">Category
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/artikel/list">Artikel
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <slot></slot>
  </div>
</template>
   
<script>
export default {
  name: 'LayoutDiv',
};
</script>
  