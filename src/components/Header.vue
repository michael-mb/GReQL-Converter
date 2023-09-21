<template>
  <div class="header header-one">
    <div class="header-left header-left-one">
      <router-link to="/" class="remove-link-attr"><p style="font-size: 22px;" class="wom-title"><i class="feather-repeat fs-30"></i> GReQL - Converter</p></router-link>
    </div>
    <a href="javascript:void(0);" id="toggle_btn">
      <i class="fas fa-bars"></i>
    </a>
    <a class="mobile_btn" id="mobile_btn">
      <i class="fas fa-bars"></i>
    </a>
  </div>
  <div class="sidebar" id="sidebar">
    <div class="sidebar-inner slimscroll"  >
      <div id="sidebar-menu" class="sidebar-menu">
        <ul>
          <li>
            <RouterLink :class="{ 'active': $route.name === 'home' }" to="/"><i class="feather-home"></i> <span>Home</span></RouterLink>
          </li>
          <li>
            <RouterLink :class="{ 'active': $route.name === 'class' }" to="/class"><i class="feather-file"></i> <span>Class Converter</span></RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
.header-left {
  width: 260px !important;
}

.remove-link-attr{
  color: #455560;
}

@media only screen and (max-width: 991px) {
  .wom-title {
    margin-left: 20px;
  }
  .header-left {
    width: 280px !important;
  }
}

.sidebar-overlay {
  background-color: unset;
}
</style>
<script setup>
</script>