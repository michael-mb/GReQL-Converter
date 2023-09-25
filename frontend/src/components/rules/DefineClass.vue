<template>
  <div class="card mb-1">
    <div class="card-header">
      <h5 class="accordion-faq m-0 position-relative">
        <a class="custom-accordion-title text-reset d-block" @click="toogle">
          <span class="type"> CD </span> <span class="type_name">{{rule.rule_name}} : {{rule.rule_specific.class_name}}  # {{index + 1}}
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
            <label class="col-lg-3 col-form-label">Is Interface</label>
            <div class="col-lg-9">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" :name="'interface_' + index" id="interface_yes" :value="true" v-model="rule.rule_specific.interface">
                <label class="form-check-label" for="interface_yes">
                  Yes
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" :name="'interface_' + index" id="interface_no" :value="false" v-model="rule.rule_specific.interface">
                <label class="form-check-label" for="interface_no">
                  No
                </label>
              </div>
            </div>
          </div>

          <div class="form-group row" v-if="!rule.rule_specific.interface">
            <label class="col-lg-3 col-form-label">Is Abstract</label>
            <div class="col-lg-9">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" :name="'abstract_' + index" id="abstract_yes" :value="true" v-model="rule.rule_specific.abstract">
                <label class="form-check-label" for="abstract_yes">
                  Yes
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" :name="'abstract_' + index" id="abstract_no" :value="false" v-model="rule.rule_specific.abstract">
                <label class="form-check-label" for="abstract_no">
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
              <label class="col-lg-3 col-form-label">Type</label>
              <div class="col-lg-9">
                <input type="text" class="form-control" v-model="attribute.type">
              </div>
            </div>

            <div class="form-group row">
              <label class="col-lg-3 col-form-label">Visibility</label>
              <div class="col-lg-9">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" :name="'attribute_visibility_'+index + '_' + attribute_index" id="attribute_visibility_public" value="public" v-model="attribute.visibility">
                  <label class="form-check-label" for="attribute_visibility_public">
                    Public
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" :name="'attribute_visibility_'+index + '_' + attribute_index" id="attribute_visibility_private" value="private" v-model="attribute.visibility">
                  <label class="form-check-label" for="attribute_visibility_private">
                    Private
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" :name="'attribute_visibility_'+index + '_' + attribute_index" id="attribute_visibility_protected" value="protected" v-model="attribute.visibility">
                  <label class="form-check-label" for="attribute_visibility_protected">
                    Protected
                  </label>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-lg-3 col-form-label">Static</label>
              <div class="col-lg-9">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" :name="'attribute_static_'+index + '_' + attribute_index" id="attribute_static_true" :value="true" v-model="attribute.is_static">
                  <label class="form-check-label" for="attribute_static_true">
                    Yes
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" :name="'attribute_static_'+index + '_' + attribute_index" id="attribute_static_false" :value="false" v-model="attribute.is_static">
                  <label class="form-check-label" for="attribute_static_false">
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

          </div>
          <div class="add_item" title="add attribute" @click="addAttribute(rule)">
            <i class="fa fa-plus-circle"></i>
          </div>

          <hr>

          <h5 class="accordion-faq m-0 position-relative"> Methods</h5><br>

          <div v-for="(method, method_index) in methods">
            <h6>{{method.name}} # {{method_index}}</h6>
            <div class="form-group row">
              <label class="col-lg-3 col-form-label">Name</label>
              <div class="col-lg-9">
                <input type="text" class="form-control" v-model="method.name">
              </div>
            </div>

            <div class="form-group row">
              <label class="col-lg-3 col-form-label">Return Type</label>
              <div class="col-lg-9">
                <input type="text" class="form-control" v-model="method.return_type">
              </div>
            </div>

            <div class="form-group row">
              <label class="col-lg-3 col-form-label">Visibility </label>
              <div class="col-lg-9">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" :name="'method_visibility_'+index+ '_' + method_index" id="method_visibility_public" :value="'public'" v-model="method.visibility">
                  <label class="form-check-label" for="method_visibility_public">
                    Public
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" :name="'method_visibility_'+index+ '_' + method_index" id="method_visibility_private" :value="'private'" v-model="method.visibility">
                  <label class="form-check-label" for="method_visibility_private">
                    Private
                  </label>
                </div>

                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" :name="'method_visibility_'+index+ '_' + method_index" id="method_visibility_protected" :value="'protected'" v-model="method.visibility">
                  <label class="form-check-label" for="method_visibility_protected">
                    Protected
                  </label>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-lg-3 col-form-label">Static</label>
              <div class="col-lg-9">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" :name="'method_static_'+index+ '_' + method_index" id="method_static_true" :value="true" v-model="method.is_static">
                  <label class="form-check-label" for="method_static_true">
                    Yes
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" :name="'method_static_'+index+ '_' + method_index" id="method_static_false" :value="false" v-model="method.is_static">
                  <label class="form-check-label" for="method_static_false">
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
                         @keydown.enter="addArgument(method)">
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
                  <input v-model="method.points" type="range" min="0" max="20" class="form-control" required>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-form-label col-md-12">Method Feedback</label>
              <div class="col-md-12">
              <textarea rows="5" cols="5" class="form-control" v-model="method.feedback">
              </textarea>
              </div>
            </div>

          </div>
          <div class="add_item" title="add method" @click="addMethod(rule)">
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


const methods = ref(JSON.parse(JSON.stringify(props.rule.rule_specific.methods)))
const attributes = ref(JSON.parse(JSON.stringify(props.rule.rule_specific.attributes)))

const onAddArgMode = ref({})
const editedArg = ref("")

function toogle(){
  isOpen.value = !isOpen.value
}

function addMethod(){
  methods.value.push(JSON.parse(JSON.stringify(rulesDefinitions.METHODS_TYPE)))
}

function addArgument(method){
  method.arguments = method.arguments + ", " + editedArg.value
  editedArg.value = ""
  onAddArgMode.value = {}
}

function addAttribute(){
  attributes.value.push(JSON.parse(JSON.stringify(rulesDefinitions.ATTRIBUTE_TYPE)))
}

function save(e, rule){
  e.preventDefault()
  rule.rule_specific.methods = methods
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