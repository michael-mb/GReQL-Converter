<template>
  <div class="card mb-1">
    <div class="card-header">
      <h5 class="accordion-faq m-0 position-relative">
        <a class="custom-accordion-title text-reset d-block" @click="toogle">
          <span class="type"> CT </span> <span class="type_name">{{rule.rule_name}} - {{rule.rule_specific.class_name}}  # {{index + 1}}
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
            <label class="col-form-label col-md-3">Class name</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="rule.rule_specific.class_name">
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
          <label class="col-form-label col-md-3">{{globalUtils.capitalize(countType)}}</label>
          <div class="col-md-9">
            <div class="input-group">
              <span class="input-group-text">{{rule.rule_specific[countType]}}</span>
              <input v-model="rule.rule_specific[countType]" type="range" min="0" max="20" class="form-control" required>
            </div>
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

        <div class="form-group row">
          <label class="col-form-label col-md-12">Feedback</label>
          <div class="col-md-12">
            <textarea rows="5" cols="5" class="form-control" v-model="rule.feedback">
            </textarea>
          </div>
        </div>

        <hr>

        <h5 class="accordion-faq m-0 position-relative"> Actions </h5><br>

        <div>
          <button @click="deleteRule($event, rule)" class="ml-1 btn btn-danger">
            <i class="fa fa-trash"></i> Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import rulesDefinitions from "@/lib/rulesDefinitions";
import Swal from "sweetalert2";
import useConverterStore from "@/stores/converter";
import globalUtils from "@/helpers/globalUtils";

const store = useConverterStore()
const props = defineProps({
  rule: Object,
  index: Number
})
const countType = props.rule.rule_type === rulesDefinitions.RULE_TYPE_JSON.count_attributes_rule.rule_type ?
    'attributes' : 'methods'
const isOpen = ref(false)

function toogle(){
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
.card-body {
  transition: 1s;
}
.collapse{
  transition: 1s;
}
.info-wrapper {
  display: block;
  position: absolute;
  right: 0;
  top: -3px;
  font-size: 25px;
  color: #6b36de;
  cursor: pointer;
}

.type_name {
  margin-left: 50px;
}
.type {
  display: block;
  position: absolute;
  top: -6px;
  left: -6px;
  color: #6b36de;
  padding: 5px;
  text-align: center;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 18px;
  border: 1px solid #6b36de;
}

/***** Chrome, Safari, Opera, and Edge Chromium *****/
input[type="range"]::-webkit-slider-runnable-track {
  background: #e9ecef;
  border-radius: 20px;
}

/******** Firefox ********/
input[type="range"]::-moz-range-track {
  background: #e9ecef;
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: none;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background: #7638ff;
}

.form-check-inline {
  margin-top: 6px;
}

.add_item {
  font-size: 20px;
  color: #7638ff;
  cursor: pointer;
  transition: 0.2s;
}

.add_item:hover{
  font-size: 22px;
  color: #4f00ff;
}

.form-group{
  position: relative;
}
.add_arg{
  font-size: 20px;
  color: #7638ff;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 3px;
  transition: 0.2s;
}

.add_arg:hover{
  font-size: 22px;
  color: #4f00ff;
}

.arg_input {
  width: 50%;
}

.ml-1 {
  margin-left: 5px;
}
</style>