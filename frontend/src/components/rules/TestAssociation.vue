<template>
  <div class="card mb-1">
    <div class="card-header">
      <h5 class="accordion-faq m-0 position-relative">
        <a class="custom-accordion-title text-reset d-block" @click="toggle">
          <span class="type"> TA </span> <span class="type_name">{{rule.rule_name}} : {{rule.rule_specific.class_A}}
          - {{rule.rule_specific.class_B }}  # {{index + 1}}
          <i :class="isOpen ?  'feather-chevron-up' : 'feather-chevron-down'"></i></span>
        </a>
        <a class="info-wrapper" data-bs-toggle="offcanvas" href="#offcanvas" role="button" aria-controls="offcanvas" @click="setDocumentation(rule)">
          <i class="feather-alert-circle"></i>
        </a>
      </h5>
    </div>

    <div class="collapse" :class="isOpen === true ? 'show' : ''">
      <div class="card-body">
        <h5 class="accordion-faq m-0 position-relative"> General Information</h5><br>
        <div class="form-group row">
          <label class="col-form-label col-md-3">Rule Type</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="rule.rule_type" readonly="readonly">
          </div>
        </div>

        <div class="form-group row">
          <label class="col-form-label col-md-3">Range</label>
          <div class="col-md-9">
            <select class="form-select" v-model="rule.existence">
              <option>presence</option>
              <option>absence</option>
            </select>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-form-label col-md-3">Class A</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="rule.rule_specific.class_A">
          </div>
        </div>

        <div class="form-group row">
          <label class="col-form-label col-md-3">Class B</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="rule.rule_specific.class_B">
          </div>
        </div>

        <div class="form-group row">
          <label class="col-form-label col-md-3">Points</label>
          <div class="col-md-9">
            <div class="input-group">
              <span class="input-group-text">{{rule.points}}</span>
              <input v-model="rule.points" type="range" min="0" max="20" class="form-control" required>
            </div>
          </div>
        </div>

        <hr>

        <h5 class="accordion-faq m-0 position-relative"> Actions </h5><br>
        <button @click="deleteRule($event, rule)" class="ml-1 btn btn-danger">
          <i class="fa fa-trash"></i> Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import Swal from "sweetalert2";
import useClassConverterStore from "@/stores/classConverter";

const store = useClassConverterStore()

const props = defineProps({
  rule: Object,
  index: Number
})
const isOpen = ref(false)

function toggle(){
  isOpen.value = !isOpen.value
}

function deleteRule(e, rule){
  e.preventDefault()
  store.deleteRule(rule)
  Swal.fire({
    title: 'Success!',
    text: 'This rule was successfully deleted!',
    icon: 'success',
    toast: true,
    position: 'top-right',
  })
}

function setDocumentation(rule){
  store.setOffCanvas(rule)
}
</script>

<style scoped>
</style>