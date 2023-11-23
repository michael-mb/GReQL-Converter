<template>
  <div class="card mb-1">
    <div class="card-header" :class="!rule.active ? 'disabled' : ''">
      <h5 class="accordion-faq m-0 position-relative">
        <a class="custom-accordion-title text-reset d-block" @click="toggle">
          <span class="type"> SC </span> <span class="type_name">{{rule.rule_type}} : {{rule.class_C}}}
          <i :class="isOpen ?  'feather-chevron-up' : 'feather-chevron-down'"></i></span>
        </a>
      </h5>
    </div>

    <div class="collapse " :class="isOpen === true ? 'show' : ''">
      <div class="card-body" :class="!rule.active ? 'disabled' : ''">
          <div class="form-group row">
            <label class="col-form-label col-md-3">Class A</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="rule.class_A">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-form-label col-md-3">Class B</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="rule.class_B">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-form-label col-md-3">Class C</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="rule.class_C">
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