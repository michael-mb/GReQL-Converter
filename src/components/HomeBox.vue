<template>
  <div class="col-md-6 col-xl-4 col-sm-12 d-flex">
    <div class="blog grid-blog flex-fill">
      <div class="blog-image">
        <router-link :to="link"><img class="img-fluid" :src="image" alt="Post Image"></router-link>
      </div>
      <div class="blog-content">
        <h3 class="blog-title"><router-link :to="link">
          {{title}} </router-link></h3>
        <p>{{description}}</p>
      </div>
      <div class="row">
        <div class="edit-options">
          <router-link :to="link" class="btn btn-primary btn-blog mb-1"><i class="feather-repeat"></i> Starten</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  link: String,
  image: String,
  title: String,
  description: String
})
</script>

<style scoped>
</style>