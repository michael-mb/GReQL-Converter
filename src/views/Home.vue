<template>
  <div class="main-wrapper" id="main-wrapper">
    <Header/>
    <div class="page-wrapper">
      <div class="content container-fluid">

        <div class="page-header">
          <div class="row">
            <div class="col-sm-12">
              <h3 class="page-title">Startseite</h3>
              <ul class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
                <li class="breadcrumb-item active">Startseite</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="row">

          <HomeBox link="#" image="src/assets/img/custom/class.png" title="UML-Klassendiagramm"
                   description="Verwenden Sie den GReQL-Konverter auf einem Klassendiagramm."/>
          <HomeBox link="#" image="src/assets/img/custom/sequenz.png" title="UML-Sequenzdiagramm"
                   description="Verwenden Sie den GReQL-Konverter auf einem Sequenzdiagramm."/>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import HomeBox from "@/components/HomeBox.vue";

export default {
  name: 'Home',
  components: {HomeBox, Header},
  async created() {
  },
}
</script>
