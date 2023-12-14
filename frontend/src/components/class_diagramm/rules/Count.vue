<template>
  <div class="card mb-1">
    <div class="card-header" :class="!rule.active ? 'disabled' : ''">
      <h5 class="accordion-faq m-0 position-relative">
        <a class="custom-accordion-title text-reset d-block" @click="toggle">
          <span class="type"> CT </span> <span class="type_name">{{rule.rule_name}}   # {{index + 1}}
          <i :class="isOpen ?  'feather-chevron-up' : 'feather-chevron-down'"></i></span>
        </a>
        <a class="info-wrapper" style="margin-right: 35px" data-bs-toggle="offcanvas" href="#offcanvas"
           @click="setTemporaryCode(rule)" role="button" aria-controls="offcanvas">
          <i class="fa fa-eye"></i>
        </a>
        <a class="info-wrapper" data-bs-toggle="offcanvas" href="#offcanvas" role="button" aria-controls="offcanvas" @click="setDocumentation(rule)">
          <i class="feather-alert-circle"></i>
        </a>
      </h5>
    </div>

    <div class="collapse" :class="isOpen === true ? 'show' : ''">
      <div class="card-body" :class="!rule.active ? 'disabled' : ''">
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

        <hr>

        <h5 class="accordion-faq m-0 position-relative"> Actions </h5><br>

        <div>
          <button v-if="rule.active" @click="disableRule($event, rule)" class="ml-1 btn btn-secondary">
            <i class="fa fa-toggle-off"></i> Disable</button>
          <button v-else @click="activateRule($event, rule)" class="ml-1 btn btn-success">
            <i class="fa fa-toggle-on"></i> Activate</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import rulesDefinitions from "@/lib/classRulesDefinition";
import useClassConverterStore from "@/stores/classConverter";
import globalUtils from "@/helpers/globalUtils";

const store = useClassConverterStore()
const props = defineProps({
  rule: Object,
  index: Number
})
const countType = props.rule.rule_type === rulesDefinitions.RULE_TYPE_JSON.count_attributes_rule.rule_type ?
    'attributes' : 'methods'
const isOpen = ref(false)

function toggle(){
  isOpen.value = !isOpen.value
}
function disableRule(e, rule){
  e.preventDefault()
  store.disableRule(rule)
}

function activateRule(e, rule){
  e.preventDefault()
  store.activateRule(rule)
}

function setDocumentation(rule){
  store.setOffCanvas(rule, undefined)
}

function setTemporaryCode(rule){
  store.setOffCanvas(
      {
        rule_name: rule.rule_name,
        info_image: "",
        info_text: ""
      }, rule
  )
}
</script>

<style scoped>
</style>