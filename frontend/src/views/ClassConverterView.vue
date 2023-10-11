<!--suppress ES6UnusedImports -->
<template>
  <div class="main-wrapper" id="main-wrapper">
    <Header/>
    <div class="page-wrapper">
      <div class="content container-fluid">

        <div class="page-header">
          <div class="row">
            <div class="col-sm-12">
              <h3 class="page-title">Class Converter</h3>
              <ul class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/">Dashboard</router-link></li>
                <li class="breadcrumb-item active">Class Converter</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-5 col-sm-12 d-flex">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title"><i class="feather-terminal"></i> Code Editor</h4>

              </div>
              <div class="card-body">
                <div class="form-group row">
                  <label class="col-form-label col-md-4 default_label">Code Sample</label>
                  <div class="col-md-8">
                    <select class="form-select" v-model="defaultCode" @change="updateDefaultCode">
                      <option v-for="(item, key) in default_test_code" :value="item"
                      :selected="defaultCode === item">{{ key }}</option>
                    </select>
                  </div>
                </div>

                <code-editor  font-size="14px" v-model="code" theme="github" :line-nums="true" :languages="[['js', 'JS']]" :header="false"
                              width="100%" :autofocus="true"></code-editor>

                <a class="btn btn-primary btn-blog mb-2 mt-5" @click="parseCode">
                  <i v-if="!store.isSpinning" class="feather-play-circle"></i>
                  <span v-if="store.isSpinning" class="spinner-border spinner-border-sm me-2"></span>
                  Parse Code
                </a>

              </div>
            </div>
          </div>

          <div class="col-md-7 col-sm-12 d-flex">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title"><i class="feather-list"></i> Derived Rules</h4>
              </div>
              <div class="card-body">
                <div class="accordion custom-accordion" id="custom-accordion-one">
                  <template v-for="(rule, index) in store.rules" >
                    <DefineClass v-if="rule.rule_type === rulesDefinitions.RULE_TYPE.defined_class" :rule="rule" :index="index" />
                    <DefineEnum v-if="rule.rule_type === rulesDefinitions.RULE_TYPE.defined_enum" :rule="rule" :index="index" />
                    <Generalization v-if="rule.rule_type === rulesDefinitions.RULE_TYPE.generalization" :rule="rule" :index="index"/>
                    <SimpleAssociation v-if="rule.rule_type === rulesDefinitions.RULE_TYPE.simple_association" :rule="rule" :index="index"/>
                    <Aggregation v-if="rule.rule_type === rulesDefinitions.RULE_TYPE.aggregation" :rule="rule" :index="index"/>
                    <Composition v-if="rule.rule_type === rulesDefinitions.RULE_TYPE.composition" :rule="rule" :index="index"/>
                    <AssociationClass v-if="rule.rule_type === rulesDefinitions.RULE_TYPE.association_class" :rule="rule" :index="index"/>
                    <TestAssociation v-if="rule.rule_type === rulesDefinitions.RULE_TYPE.test_association" :rule="rule" :index="index" />
                    <NominationConsistency v-if="rule.rule_type === rulesDefinitions.RULE_TYPE.nomination_consistency" :rule="rule" :index="index" />
                    <Count v-if="rule.rule_type === rulesDefinitions.RULE_TYPE.count_methods || rule.rule_type === rulesDefinitions.RULE_TYPE.count_attributes" :rule="rule" :index="index"/>
                  </template>

                </div>

                <div class="dropdown dropdown-action" v-if="store.rules.length > 0 ">
                  <a  class="mt-3 action-icon dropdown-toggl btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="feather-plus-circle"></i> Add Rule
                  </a>
                  <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" @click="addRule(rulesDefinitions.RULE_TYPE.defined_class)" > <i class="feather-file-plus me-2"></i> Class definition</a>
                    <a class="dropdown-item" @click="addRule(rulesDefinitions.RULE_TYPE.defined_enum)" > <i class="feather-file-plus me-2"></i> Enum definition</a>
                    <a class="dropdown-item" @click="addRule(rulesDefinitions.RULE_TYPE.generalization)" > <i class="feather-file-plus me-2"></i> Generalization</a>
                    <a class="dropdown-item" @click="addRule(rulesDefinitions.RULE_TYPE.aggregation)" > <i class="feather-file-plus me-2"></i> Aggregation</a>
                    <a class="dropdown-item" @click="addRule(rulesDefinitions.RULE_TYPE.composition)" > <i class="feather-file-plus me-2"></i> Composition</a>
                    <a class="dropdown-item" @click="addRule(rulesDefinitions.RULE_TYPE.simple_association)" > <i class="feather-file-plus me-2"></i> Simple Association</a>
                    <a class="dropdown-item" @click="addRule(rulesDefinitions.RULE_TYPE.association_class)" > <i class="feather-file-plus me-2"></i> Association Class</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" @click="addRule(rulesDefinitions.RULE_TYPE.test_association)" > <i class="feather-file-plus me-2"></i> Test Association</a>
                    <a class="dropdown-item" @click="addRule(rulesDefinitions.RULE_TYPE.count_methods)" > <i class="feather-file-plus me-2"></i> Count Methods</a>
                    <a class="dropdown-item" @click="addRule(rulesDefinitions.RULE_TYPE.nomination_consistency)" > <i class="feather-file-plus me-2"></i> Nomination Consistency</a>
                  </div>
                  <a class="ml-2 mt-3 btn btn-primary" @click="generateGReQLRules">
                    <i class="feather-repeat"></i> Generate GReQL Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-12 col-sm-12 d-flex" v-if="!globalUtils.isStringEmpty(GReQLCode)">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title"><i class="feather-code"></i> GReQL Code</h4>
            </div>
            <div class="card-body" ref="greQL_container">
              <code-editor   font-size="14px" v-model="GReQLCode" theme="github" @textarea="focus" :line-nums="true" :languages="[['xml', 'xml']]" :header="true"
                            width="100%" :autofocus="true"></code-editor>
            </div>
          </div>
        </div>

        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
          <div class="offcanvas-header">
            <h3 class="offcanvas-title" id="offcanvasLabel">{{store.getOffCanvas.title}}</h3>
            <button type="button" class="btn-close text-reset mt-1" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="blog-image">
            <img v-if="store.getOffCanvas.image !== ''" class="img-fluid" :src="store.getOffCanvas.image" alt="Post Image">
          </div>
          <div class="offcanvas-body">
            <span class="off-icon"><i class="feather-alert-octagon"></i></span>
            <span class="off-text">{{store.getOffCanvas.info}}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import hljs from 'highlight.js';
import CodeEditor from 'simple-code-editor';
import Header from "@/components/Header.vue";
import {ref} from "vue";
import useClassConverterStore from "@/stores/classConverter"
import Swal from "sweetalert2";
import DefineClass from "@/components/rules/DefineClass.vue";
import rulesDefinitions from "@/lib/rulesDefinitions";
import {API_ENDPOINTS} from "@/config/config";
import Count from "@/components/rules/Count.vue";
import DefineEnum from "@/components/rules/DefineEnum.vue";
import default_test_code from "@/helpers/default_test_code";
import Generalization from "@/components/rules/Generalization.vue";
import Aggregation from "@/components/rules/Aggregation.vue";
import Composition from "@/components/rules/Composition.vue";
import SimpleAssociation from "@/components/rules/SimpleAssociation.vue";
import TestAssociation from "@/components/rules/TestAssociation.vue";
import AssociationClass from "@/components/rules/AssociationClass.vue";
import GReQLRulesgenerator from "@/lib/GReQLRulesgenerator";
import globalUtils from "@/helpers/globalUtils";
import xmlFormat from 'xml-formatter';
import NominationConsistency from "@/components/rules/NominationConsistency.vue";

const store = useClassConverterStore()

const defaultCode = ref(default_test_code.easy_test_improved)
const code = ref(defaultCode.value.code)
const GReQLCode = ref("")

function updateDefaultCode (){
  code.value = defaultCode.value.code
}

function parseCode(){
  const param = {
    code : code.value,
    endpoint: API_ENDPOINTS.CONVERT
  }
  GReQLCode.value = ""

  store.parse(param).then(() => {
    Swal.fire(store.toastOptions)
  }).catch(() => {
    Swal.fire(store.toastOptions)
  }).finally(()=> {
    store.toastOptions = {}
  })
}

function addRule(type){
  let rule;
  switch (type) {
    case rulesDefinitions.RULE_TYPE.defined_class:
      rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.defined_class_rule));
      break;
    case rulesDefinitions.RULE_TYPE.count_methods:
      rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.count_methods_rule));
      break;
    case rulesDefinitions.RULE_TYPE.defined_enum:
      rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.defined_enum_rule));
      break;
    case rulesDefinitions.RULE_TYPE.generalization:
      rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.generalization_rule));
      break;
    case rulesDefinitions.RULE_TYPE.aggregation:
      rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.aggregation_rule));
      break;
    case rulesDefinitions.RULE_TYPE.composition:
      rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.composition_rule));
      break;
    case rulesDefinitions.RULE_TYPE.simple_association:
      rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.simple_association_rule));
      break;
    case rulesDefinitions.RULE_TYPE.test_association:
      rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.test_association_rule));
      break;
    case rulesDefinitions.RULE_TYPE.association_class:
      rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.association_class_rule));
      break;
    case rulesDefinitions.RULE_TYPE.nomination_consistency:
      rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.nomination_consistency));
      break;
    default:
      alert("to implement")
      break;
  }

  store.addRule(rule);
}

function focus(node) {
  node.focus();
}
function generateGReQLRules(){
  GReQLCode.value = xmlFormat(GReQLRulesgenerator.generateGReQLRules(store.getRules))
  store.setGReQLGeneratedCode(GReQLCode.value)
  scrollDown()
}

function scrollDown() {
  window.scrollBy({
    top: window.innerHeight,
    behavior: 'smooth',
  });
}
</script>

<style scoped>
.blog-image img {
  width: unset !important;
}

.off-icon {
  font-size: 40px;
  color: #6b36de;
  position: absolute;
  top: -6px;
}

.off-text {
  margin-left: 50px;
  font-size: 19px;
}
.offcanvas-body {
  position: relative;
  margin-top: 20px;
}

.offcanvas-start {
  width: 700px;
}

.default_label {
  font-size: 20px;
}

.ml-2 {
  margin-left: 15px;
}
</style>