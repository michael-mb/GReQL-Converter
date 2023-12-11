<template>
  <div class="card mb-1">
    <div class="card-header" :class="!rule.active ? 'disabled' : ''">
      <h5 class="accordion-faq m-0 position-relative">
        <a class="custom-accordion-title text-reset d-block" @click="toggle">
          <span class="type"> SA </span> <span class="type_name">{{rule.rule_type}}
          <i :class="isOpen ?  'feather-chevron-up' : 'feather-chevron-down'"></i></span>
        </a>
      </h5>
    </div>

    <div class="collapse " :class="isOpen === true ? 'show' : ''">
      <div class="card-body" :class="!rule.active ? 'disabled' : ''">
          <div class="form-group row">
            <label class="col-form-label col-md-3">Name</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="rule.name">
            </div>
          </div>

          <div class="form-group row">
            <label class="col-lg-3 col-form-label">Name - Exact match</label>
            <div class="col-lg-9">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" :name="'match_' + index" :id="'match_yes_' + index" :value="true" v-model="rule.exact_match">
                <label class="form-check-label" :for="'match_yes_' + index">
                  Yes
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" :name="'match_' + index" :id="'match_no_' + index" :value="false" v-model="rule.exact_match">
                <label class="form-check-label" :for="'match_no_' + index">
                  No
                </label>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-lg-3 col-form-label">Class Name</label>
            <div class="col-lg-9">
              <input type="text" class="form-control"  v-model="rule.class">
            </div>
          </div>

          <div class="form-group row">
            <label class="col-lg-3 col-form-label">Type</label>
            <div class="col-lg-9">
              <input type="text" class="form-control"  v-model="rule.type">
            </div>
          </div>

          <div class="form-group row">
            <label class="col-lg-3 col-form-label">Visibility</label>
            <div class="col-lg-9">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" :name="'attribute_visibility_'+index" :id="'attribute_visibility_public_'+index"
                        value="public" v-model="rule.visibility">
                <label class="form-check-label" :for="'attribute_visibility_public_'+index">
                  Public
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" :name="'attribute_visibility_'+index" :id="'attribute_visibility_private_'+index"
                       value="private" v-model="rule.visibility">
                <label class="form-check-label" :for="'attribute_visibility_private_'+index">
                  Private
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input"  type="radio" :name="'attribute_visibility_'+index" :id="'attribute_visibility_protected_'+index"
                       value="protected" v-model="rule.visibility">
                <label class="form-check-label" :id="'attribute_visibility_protected_'+index">
                  Protected
                </label>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-lg-3 col-form-label">Static</label>
            <div class="col-lg-9">
              <div class="form-check form-check-inline">
                <input class="form-check-input"  type="radio" :name="'attribute_static_'+index" :id="'attribute_static_true_'+index"  :value="true" v-model="rule.is_static">
                <label class="form-check-label" :for="'attribute_static_true_'+index">
                  Yes
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input"  type="radio" :name="'attribute_static_'+index" :id="'attribute_static_false_'+index"  :value="false" v-model="rule.is_static">
                <label class="form-check-label" :for="'attribute_static_false_'+index">
                  No
                </label>
              </div>
            </div>
          </div>

          <div class="form-group">
            <button v-if="rule.active" @click="rule.active = false" class="ml-1 btn btn-secondary">
              <i class="fa fa-toggle-off"></i> Disable</button>
            <button v-else @click="rule.active = true" class="ml-1 btn btn-success">
              <i class="fa fa-toggle-on"></i> Activate</button>
          </div>


      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import useClassConverterStore from "@/stores/classConverter";

const store = useClassConverterStore()

const props = defineProps({
  rule: Object,
  index: String
})
const isOpen = ref(true)
function toggle(){
  isOpen.value = !isOpen.value
}

</script>

<style scoped>
.disabled{
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
}
</style>