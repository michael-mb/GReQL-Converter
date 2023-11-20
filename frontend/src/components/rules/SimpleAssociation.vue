<template>
  <div class="card mb-1">
    <div class="card-header" :class="!rule.active ? 'disabled' : ''">
      <h5 class="accordion-faq m-0 position-relative">
        <a class="custom-accordion-title text-reset d-block" @click="toggle">
          <span class="type"> SA </span> <span class="type_name">{{rule.rule_name}} : {{rule.rule_specific.class_A}}
          - {{rule.rule_specific.class_B }}  # {{index + 1}}
          <i :class="isOpen ?  'feather-chevron-up' : 'feather-chevron-down'"></i></span>
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
          <label class="col-form-label col-md-3">Class A</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="rule.rule_specific.class_A">
          </div>
        </div>

        <div class="form-group row">
          <label class="col-form-label col-md-3">A Multiplicity</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="rule.rule_specific.A_multiplicity">
          </div>
        </div>

        <div class="form-group row">
          <label class="col-form-label col-md-3">Class B</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="rule.rule_specific.class_B">
          </div>
        </div>

        <div class="form-group row">
          <label class="col-form-label col-md-3">B Multiplicity</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="rule.rule_specific.B_multiplicity">
          </div>
        </div>

        <div class="form-group row">
          <label class="col-lg-3 col-form-label">Name - Exact match</label>
          <div class="col-lg-9">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" :name="'match_' + index" :id="'match_yes_' + index" :value="true" v-model="rule.rule_specific.exact_match">
              <label class="form-check-label" :for="'match_yes_' + index">
                Yes
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" :name="'match_' + index" :id="'match_no_' + index" :value="false" v-model="rule.rule_specific.exact_match">
              <label class="form-check-label" :for="'match_no_' + index">
                No
              </label>
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
        <button v-if="rule.active" @click="disableRule($event, rule)" class="ml-1 btn btn-secondary">
          <i class="fa fa-toggle-off"></i> Disable</button>
        <button v-else @click="activateRule($event, rule)" class="ml-1 btn btn-success">
          <i class="fa fa-toggle-on"></i> Activate</button>
        <button class="ml-1 btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvas" role="button" aria-controls="offcanvas" @click="setTemporaryCode(rule)">
          <i class="fa fa-eye"></i> Rule viewer</button>
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