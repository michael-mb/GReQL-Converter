<template>
  <div class="card mb-1">
    <div class="card-header" :class="!rule.active ? 'disabled' : ''">
      <h5 class="accordion-faq m-0 position-relative">
        <a class="custom-accordion-title text-reset d-block" @click="toggle">
          <span class="type"> ED </span> <span class="type_name">{{rule.rule_name}} : {{rule.rule_specific.enum_class_name}}  # {{index + 1}}
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
            <label class="col-form-label col-md-3">Enum name</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="rule.rule_specific.enum_class_name">
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

        <div class="form-group">
          <button v-if="rule.active" @click="disableRule($event, rule)" class="ml-1 btn btn-secondary">
            <i class="fa fa-toggle-off"></i> Disable</button>
          <button v-else @click="activateRule($event, rule)" class="ml-1 btn btn-success">
            <i class="fa fa-toggle-on"></i> Activate</button>
        </div>

          <hr>
          <h5 class="accordion-faq m-0 position-relative">Attributes</h5><br>

          <div v-for="(attribute, attribute_index) in attributes" :class="!attribute.active ? 'disabled' : ''">
            <h6>{{attribute.name}} # {{attribute_index}}</h6>
            <div class="form-group row">
              <label class="col-lg-3 col-form-label">Name</label>
              <div class="col-lg-9">
                <input type="text" class="form-control" v-model="attribute.name">
              </div>
            </div>

            <div class="form-group row">
              <label class="col-lg-3 col-form-label">Name - Exact match</label>
              <div class="col-lg-9">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" @change="save($event, rule)" type="radio" :name="'match_attr' + index + '_' + attribute_index" :id="'match_attr_yes_' + index+ '_' + attribute_index" :value="true" v-model="attribute.exact_match">
                  <label class="form-check-label" :for="'match_attr_yes_' + index+ '_' + attribute_index">
                    Yes
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" @change="save($event, rule)" type="radio" :name="'match_attr_' + index + '_' + attribute_index" :id="'match_attr_no_' + index+ '_' + attribute_index" :value="false" v-model="attribute.exact_match">
                  <label class="form-check-label" :for="'match_attr_no_' + index+ '_' + attribute_index">
                    No
                  </label>
                </div>
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

            <div class="form-group">
              <button v-if="attribute.active" @click="updateSubElemStatus($event, rule,  attribute, false)" class="ml-1 btn btn-secondary">
                <i class="fa fa-toggle-off"></i> Disable Attribute</button>
              <button v-else @click="updateSubElemStatus($event, rule,  attribute, true)" class="ml-1 btn btn-success">
                <i class="fa fa-toggle-on"></i> Activate Attribute</button>
            </div>

          </div>

          <div class="add_item" title="add attribute" @click="addAttribute(rule)">
            <i class="fa fa-plus-circle"></i>
          </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import rulesDefinitions from "@/lib/rulesDefinitions";
import Swal from "sweetalert2";
import useClassConverterStore from "@/stores/classConverter";

const store = useClassConverterStore()

const props = defineProps({
  rule: Object,
  index: Number
})
const isOpen = ref(false)

const attributes = ref(JSON.parse(JSON.stringify(props.rule.rule_specific.attributes)))

function toggle(){
  isOpen.value = !isOpen.value
}

function addAttribute(){
  attributes.value.push(JSON.parse(JSON.stringify(rulesDefinitions.ENUM_ATTRIBUTE_TYPE)))
}

function save(e, rule){
  e.preventDefault()
  rule.rule_specific.attributes = attributes
}

function disableRule(e, rule){
  e.preventDefault()
  store.disableRule(rule)
}

function activateRule(e, rule){
  e.preventDefault()
  store.activateRule(rule)
}

function updateSubElemStatus(e, rule,  elem, value){
  e.preventDefault()
  elem.active = value
  save(e, rule)
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
.disabled{
  padding: 15px;
  margin-bottom: 5px;
  border-radius: 5px;
}
</style>