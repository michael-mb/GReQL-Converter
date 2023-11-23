<template>
  <div class="card mb-1">
    <div class="card-header" :class="!rule.active ? 'disabled' : ''">
      <h5 class="accordion-faq m-0 position-relative">
        <a class="custom-accordion-title text-reset d-block" @click="toggle">
          <span class="type"> CR </span> <span class="type_name">{{rule.rule_name}} : # {{index + 1}}
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

        <hr v-if="rule.rules.length > 0">
        <template v-for="(subRule, subIndex) in rule.rules">
          <SubDefineClass v-if="subRule.rule_type === rulesDefinitions.COMBINED_RULE_DEFINITION.DEFINE_CLASS" :index="`${index}_${subIndex}`" :rule="subRule"/>
          <SubAttribute v-if="subRule.rule_type === rulesDefinitions.COMBINED_RULE_DEFINITION.ATTRIBUTE" :index="`${index}_${subIndex}`" :rule="subRule"/>
          <SubMethod v-if="subRule.rule_type === rulesDefinitions.COMBINED_RULE_DEFINITION.METHOD" :index="`${index}_${subIndex}`" :rule="subRule"/>
          <SubGeneralization v-if="subRule.rule_type === rulesDefinitions.COMBINED_RULE_DEFINITION.GENERALIZATION" :index="`${index}_${subIndex}`" :rule="subRule"/>
          <SubAggregation v-if="subRule.rule_type === rulesDefinitions.COMBINED_RULE_DEFINITION.AGGREGATION" :index="`${index}_${subIndex}`" :rule="subRule"/>
          <SubComposition v-if="subRule.rule_type === rulesDefinitions.COMBINED_RULE_DEFINITION.COMPOSITION" :index="`${index}_${subIndex}`" :rule="subRule"/>
          <SubSimpleAssociation v-if="subRule.rule_type === rulesDefinitions.COMBINED_RULE_DEFINITION.SIMPLE_ASSOCIATION" :index="`${index}_${subIndex}`" :rule="subRule"/>
          <SubAssociationClass v-if="subRule.rule_type === rulesDefinitions.COMBINED_RULE_DEFINITION.ASSOCIATION_CLASS" :index="`${index}_${subIndex}`" :rule="subRule"/>
          <SubTestAssociation v-if="subRule.rule_type === rulesDefinitions.COMBINED_RULE_DEFINITION.TEST_ASSOCIATION" :index="`${index}_${subIndex}`" :rule="subRule"/>
          <br><br>
        </template>
        <hr>
        <h5 class="accordion-faq m-0 position-relative"> Actions </h5><br>
        <button v-if="rule.active" @click="disableRule($event, rule)" class="ml-1 btn btn-secondary">
          <i class="fa fa-toggle-off"></i> Disable</button>
        <button v-else @click="activateRule($event, rule)" class="ml-1 btn btn-success">
          <i class="fa fa-toggle-on"></i> Activate</button>

          <a class="ml-1 action-icon dropdown-toggl btn btn-primary" data-bs-toggle="dropdown"
             aria-expanded="false">
            <i class="feather-plus-circle"></i> Add Combined Rule
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <a class="dropdown-item" @click="addSubRule(rulesDefinitions.COMBINED_RULE_ELEM.DEFINE_CLASS)"> <i
                class="feather-file-plus me-2"></i> Class definition</a>
            <a class="dropdown-item" @click="addSubRule(rulesDefinitions.COMBINED_RULE_ELEM.ATTRIBUTE)"> <i
                class="feather-file-plus me-2"></i> Attribute</a>
            <a class="dropdown-item" @click="addSubRule(rulesDefinitions.COMBINED_RULE_ELEM.METHOD)"> <i
                class="feather-file-plus me-2"></i> Method</a>
            <a class="dropdown-item" @click="addSubRule(rulesDefinitions.COMBINED_RULE_ELEM.GENERALIZATION)"> <i
                class="feather-file-plus me-2"></i> Generalization</a>
            <a class="dropdown-item" @click="addSubRule(rulesDefinitions.COMBINED_RULE_ELEM.AGGREGATION)"> <i
                class="feather-file-plus me-2"></i> Aggregation</a>
            <a class="dropdown-item" @click="addSubRule(rulesDefinitions.COMBINED_RULE_ELEM.COMPOSITION)"> <i
                class="feather-file-plus me-2"></i> Composition</a>
            <a class="dropdown-item" @click="addSubRule(rulesDefinitions.COMBINED_RULE_ELEM.SIMPLE_ASSOCIATION)"> <i
                class="feather-file-plus me-2"></i> Simple Association</a>
            <a class="dropdown-item" @click="addSubRule(rulesDefinitions.COMBINED_RULE_ELEM.TEST_ASSOCIATION)"> <i
                class="feather-file-plus me-2"></i> Test Association</a>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import rulesDefinitions from "@/lib/rulesDefinitions";
import useClassConverterStore from "@/stores/classConverter";
import SubDefineClass from "@/components/subRules/SubDefineClass.vue";
import SubAttribute from "@/components/subRules/SubAttribute.vue";
import SubMethod from "@/components/subRules/SubMethod.vue";
import SubGeneralization from "@/components/subRules/SubGeneralization.vue";
import SubAggregation from "@/components/subRules/SubAggregation.vue";
import SubComposition from "@/components/subRules/SubComposition.vue";
import SubSimpleAssociation from "@/components/subRules/SubSimpleAssociation.vue";
import SubAssociationClass from "@/components/subRules/SubAssociationClass.vue";
import SubTestAssociation from "@/components/subRules/SubTestAssociation.vue";

const store = useClassConverterStore()

const props = defineProps({
  ruleProps: Object,
  index: Number
})

const rule = ref(props.ruleProps)

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

function addSubRule(subRule){
  rule.value.rules.push(JSON.parse(JSON.stringify(subRule)))
}
</script>

<style scoped>
</style>