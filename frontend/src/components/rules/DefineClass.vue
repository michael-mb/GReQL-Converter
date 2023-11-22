<template>
  <div class="card mb-1">
    <div class="card-header" :class="!rule.active ? 'disabled' : ''">
      <h5 class="accordion-faq m-0 position-relative">
        <a class="custom-accordion-title text-reset d-block" @click="toggle">
          <span class="type"> CD </span> <span class="type_name">{{rule.rule_name}} : {{rule.rule_specific.class_name}}  # {{index + 1}}
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

    <div class="collapse " :class="isOpen === true ? 'show' : ''">
      <div class="card-body" :class="!rule.active ? 'disabled' : ''">
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
            <label class="col-lg-3 col-form-label">Is Interface</label>
            <div class="col-lg-9">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" :name="'interface_' + index" :id="'interface_yes_' + index" :value="true" v-model="rule.rule_specific.interface">
                <label class="form-check-label" :for="'interface_yes_' + index">
                  Yes
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" :name="'interface_' + index" :id="'interface_no_' + index" :value="false" v-model="rule.rule_specific.interface">
                <label class="form-check-label" :for="'interface_no_' + index">
                  No
                </label>
              </div>
            </div>
          </div>

          <div class="form-group row" v-if="!rule.rule_specific.interface">
            <label class="col-lg-3 col-form-label">Is Abstract</label>
            <div class="col-lg-9">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" :name="'abstract_' + index" :id="'abstract_yes_' + index"  :value="true" v-model="rule.rule_specific.abstract">
                <label class="form-check-label" :for="'abstract_yes_' + index">
                  Yes
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" :name="'abstract_' + index" :id="'abstract_no_' + index" :value="false" v-model="rule.rule_specific.abstract">
                <label class="form-check-label" :for="'abstract_no_' + index">
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
                <input type="text" class="form-control" @change="save($event, rule)" v-model="attribute.name">
              </div>
            </div>

            <div class="form-group row">
              <label class="col-lg-3 col-form-label">Name - Exact match</label>
              <div class="col-lg-9">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" @change="save($event, rule)" type="radio" :name="'match_attr_' + index+ '_' + attribute_index" :id="'match_attr_yes_' + index+ '_' + attribute_index" :value="true" v-model="attribute.exact_match">
                  <label class="form-check-label" :for="'match_attr_yes_' + index+ '_' + attribute_index">
                    Yes
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" @change="save($event, rule)" type="radio" :name="'match_attr_' + index+ '_' + attribute_index" :id="'match_attr_no_' + index+ '_' + attribute_index" :value="false" v-model="attribute.exact_match">
                  <label class="form-check-label" :for="'match_attr_no_' + index+ '_' + attribute_index">
                    No
                  </label>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-lg-3 col-form-label">Type</label>
              <div class="col-lg-9">
                <input type="text" class="form-control" @change="save($event, rule)" v-model="attribute.type">
              </div>
            </div>

            <div class="form-group row">
              <label class="col-lg-3 col-form-label">Visibility</label>
              <div class="col-lg-9">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" @change="save($event, rule)" type="radio" :name="'attribute_visibility_'+index + '_' + attribute_index" :id="'attribute_visibility_public_'+index + '_' + attribute_index" value="public" v-model="attribute.visibility">
                  <label class="form-check-label" :for="'attribute_visibility_public_'+index + '_' + attribute_index">
                    Public
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" @change="save($event, rule)" type="radio" :name="'attribute_visibility_'+index + '_' + attribute_index" :id="'attribute_visibility_private_'+index + '_' + attribute_index" value="private" v-model="attribute.visibility">
                  <label class="form-check-label" :for="'attribute_visibility_private_'+index + '_' + attribute_index">
                    Private
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" @change="save($event, rule)" type="radio" :name="'attribute_visibility_'+index + '_' + attribute_index" :id="'attribute_visibility_protected_'+index + '_' + attribute_index" value="protected" v-model="attribute.visibility">
                  <label class="form-check-label" :id="'attribute_visibility_protected_'+index + '_' + attribute_index">
                    Protected
                  </label>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-lg-3 col-form-label">Static</label>
              <div class="col-lg-9">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" @change="save($event, rule)" type="radio" :name="'attribute_static_'+index + '_' + attribute_index" :id="'attribute_static_true_'+index + '_' + attribute_index"  :value="true" v-model="attribute.is_static">
                  <label class="form-check-label" :for="'attribute_static_true_'+index + '_' + attribute_index">
                    Yes
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" @change="save($event, rule)" type="radio" :name="'attribute_static_'+index + '_' + attribute_index" :id="'attribute_static_false_'+index + '_' + attribute_index"  :value="false" v-model="attribute.is_static">
                  <label class="form-check-label" :for="'attribute_static_false_'+index + '_' + attribute_index">
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
                  <input v-model="attribute.points" @change="save($event, rule)" type="range" min="0" max="20" class="form-control" required>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-form-label col-md-12">Attribute Feedback</label>
              <div class="col-md-12">
              <textarea rows="5" cols="5" class="form-control" @change="save($event, rule)" v-model="attribute.feedback">
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
          <div class="add_item" title="add attribute" @click="addAttribute($event, rule)">
            <i class="fa fa-plus-circle"></i>
          </div>

          <hr>

          <h5 class="accordion-faq m-0 position-relative"> Methods</h5><br>

          <div v-for="(method, method_index) in methods" :class="!method.active ? 'disabled' : ''">
            <h6>{{method.name}} # {{method_index}}</h6>
            <div class="form-group row">
              <label class="col-lg-3 col-form-label">Name</label>
              <div class="col-lg-9">
                <input type="text" class="form-control" @change="save($event, rule)" v-model="method.name">
              </div>
            </div>

            <div class="form-group row">
              <label class="col-lg-3 col-form-label">Name - Exact match</label>
              <div class="col-lg-9">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" @change="save($event, rule)" type="radio" :name="'match_meth_' + index+ '_' + method_index " :id="'match_meth_yes_' + index+ '_' + method_index" :value="true" v-model="method.exact_match">
                  <label class="form-check-label" :for="'match_meth_yes_' + index+ '_' + method_index">
                    Yes
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" @change="save($event, rule)" type="radio" :name="'match_meth_' + index+ '_' + method_index" :id="'match_meth_no_' + index+ '_' + method_index" :value="false" v-model="method.exact_match">
                  <label class="form-check-label" :for="'match_meth_no_' + index+ '_' + method_index">
                    No
                  </label>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-3 col-form-label">Return Type</label>
              <div class="col-lg-9">
                <input type="text" class="form-control"  @change="save($event, rule)" v-model="method.return_type">
              </div>
            </div>

            <div class="form-group row">
              <label class="col-lg-3 col-form-label">Visibility </label>
              <div class="col-lg-9">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" @change="save($event, rule)" type="radio" :name="'method_visibility_'+index+ '_' + method_index" :id="'method_visibility_public_'+index+ '_' + method_index"  :value="'public'" v-model="method.visibility">
                  <label class="form-check-label" :for="'method_visibility_public_'+index+ '_' + method_index">
                    Public
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" @change="save($event, rule)" type="radio" :name="'method_visibility_'+index+ '_' + method_index" :id="'method_visibility_private_'+index+ '_' + method_index" :value="'private'" v-model="method.visibility">
                  <label class="form-check-label" :for="'method_visibility_private_'+index+ '_' + method_index">
                    Private
                  </label>
                </div>

                <div class="form-check form-check-inline">
                  <input class="form-check-input" @change="save($event, rule)" type="radio" :name="'method_visibility_'+index+ '_' + method_index" :id="'method_visibility_protected_'+index+ '_' + method_index" :value="'protected'" v-model="method.visibility">
                  <label class="form-check-label" :for="'method_visibility_protected_'+index+ '_' + method_index">
                    Protected
                  </label>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-lg-3 col-form-label">Static</label>
              <div class="col-lg-9">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" @change="save($event, rule)" type="radio" :name="'method_static_'+index+ '_' + method_index" :id="'method_static_true_'+index+ '_' + method_index" :value="true" v-model="method.is_static">
                  <label class="form-check-label" :for="'method_static_true_'+index+ '_' + method_index">
                    Yes
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" @change="save($event, rule)" type="radio" :name="'method_static_'+index+ '_' + method_index" :id="'method_static_false_'+index+ '_' + method_index" :value="false" v-model="method.is_static">
                  <label class="form-check-label" :for="'method_static_false_'+index+ '_' + method_index">
                    No
                  </label>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-lg-3 col-form-label">Arguments</label>
              <div class="col-lg-9">
                <div class="form-check-inline">
                  {{method.arguments}}
                </div>
                <div>
                  <input v-if="onAddArgMode === method" type="text" class="form-control arg_input" v-model="editedArg"
                         @keydown.enter="addArgument(method, $event, rule)">
                </div>
                <div class="add_arg" title="add argument" @click="onAddArgMode = method">
                  <i class="fa fa-plus"></i>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-form-label col-md-3">Points</label>
              <div class="col-md-9">
                <div class="input-group">
                  <span class="input-group-text">{{method.points}}</span>
                  <input  @change="save($event, rule)" v-model="method.points" type="range" min="0" max="20" class="form-control" required>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-form-label col-md-12">Method Feedback</label>
              <div class="col-md-12">
              <textarea  @change="save($event, rule)" rows="5" cols="5" class="form-control" v-model="method.feedback">
              </textarea>
              </div>
            </div>

            <div class="form-group">
              <button v-if="method.active" @click="updateSubElemStatus($event, rule,  method, false)" class="ml-1 btn btn-secondary">
                <i class="fa fa-toggle-off"></i> Disable Method</button>
              <button v-else @click="updateSubElemStatus($event, rule, method, true)" class="ml-1 btn btn-success">
                <i class="fa fa-toggle-on"></i> Activate Method</button>
            </div>

          </div>
          <div class="add_item" title="add method" @click="addMethod(rule)">
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


const methods = ref(JSON.parse(JSON.stringify(props.rule.rule_specific.methods)))
const attributes = ref(JSON.parse(JSON.stringify(props.rule.rule_specific.attributes)))

const onAddArgMode = ref({})
const editedArg = ref("")

function toggle(){
  isOpen.value = !isOpen.value
}

function addMethod(){
  methods.value.push(JSON.parse(JSON.stringify(rulesDefinitions.METHODS_TYPE)))
}

function addArgument(method, event, rule){
  method.arguments = method.arguments + ", " + editedArg.value
  editedArg.value = ""
  onAddArgMode.value = {}

  this.save(event, rule)
}

function addAttribute(event, rule){
  attributes.value.push(JSON.parse(JSON.stringify(rulesDefinitions.ATTRIBUTE_TYPE)))
  this.save(event, rule)
}

function save(e, rule){
  e.preventDefault()
  rule.rule_specific.methods = methods
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
  margin-bottom: 15px;
  border-radius: 5px;
}
</style>