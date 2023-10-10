<!--suppress ES6UnusedImports -->
<template>
  <div class="main-wrapper" id="main-wrapper">
    <Header/>
    <div class="page-wrapper">
      <div class="content container-fluid">

        <div class="page-header">
          <div class="row">
            <div class="col-sm-12">
              <h3 class="page-title">Documentation</h3>
              <ul class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/">Dashboard</router-link></li>
                <li class="breadcrumb-item active">Documentation</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";


</script>

<style scoped>

</style>