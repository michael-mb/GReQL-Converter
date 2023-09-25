<template>
  <div class="card mb-1">
    <div class="card-header">
      <h5 class="accordion-faq m-0 position-relative">
        <a class="custom-accordion-title text-reset d-block" @click="toogle">
          <span class="type"> ED </span> <span class="type_name">{{rule.rule_name}} - {{rule.rule_specific.enum_class_name}}  # {{index + 1}}
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
            <label class="col-form-label col-md-3">Enum name</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="rule.rule_specific.enum_class_name">
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
          <h5 class="accordion-faq m-0 position-relative">Attributes</h5><br>

          <div v-for="(attribute, attribute_index) in attributes">
            <h6>{{attribute.name}} # {{attribute_index}}</h6>
            <div class="form-group row">
              <label class="col-lg-3 col-form-label">Name</label>
              <div class="col-lg-9">
                <input type="text" class="form-control" v-model="attribute.name">
              </div>
            </div>

            <div class="form-group row">
              <label class="col-form-label col-md-3">Points</label>
              <div class="col-md-9">
                <div class="input-group">
                  <span class="input-group-text">{{attribute.points}}</span>
                  <input v-model="attribute.points" type="range" min="0" max="20" class="form-control" required>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-form-label col-md-12">Attribute Feedback</label>
              <div class="col-md-12">
              <textarea rows="5" cols="5" class="form-control" v-model="attribute.feedback">
              </textarea>
              </div>
            </div>

          </div>

          <div class="add_item" title="add attribute" @click="addAttribute(rule)">
            <i class="fa fa-plus-circle"></i>
          </div>

          <hr>

          <h5 class="accordion-faq m-0 position-relative"> Actions </h5><br>

          <div>
            <button @click="save($event, rule)" class="btn btn-primary">
              <i class="fa fa-save"></i> Save</button>

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

const store = useConverterStore()

const props = defineProps({
  rule: Object,
  index: Number
})
const isOpen = ref(false)

const attributes = ref(JSON.parse(JSON.stringify(props.rule.rule_specific.attributes)))

function toogle(){
  isOpen.value = !isOpen.value
}

function addAttribute(){
  attributes.value.push(JSON.parse(JSON.stringify(rulesDefinitions.ENUM_ATTRIBUTE_TYPE)))
}

function save(e, rule){
  e.preventDefault()
  rule.rule_specific.attributes = attributes

  Swal.fire({
    title: 'Success!',
    text: 'This rule was successfully updated!',
    icon: 'success',
    toast: true,
    position: 'top-right',
  })
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