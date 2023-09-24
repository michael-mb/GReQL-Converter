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
                <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
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
                <code-editor  font-size="14px" v-model="code" theme="github" :line-nums="true" :languages="[['js', 'JS']]" :header="false"
                              width="100%" @textarea="focus"></code-editor>

                <a class="btn btn-primary btn-blog mb-2 mt-5" @click="parseCode">
                  <i v-if="!store.isSpinning" class="feather-play-circle"></i>
                  <span v-if="store.isSpinning" class="spinner-border spinner-border-sm me-2"></span>
                  Code parsen
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
                    <Count v-if="rule.rule_type === rulesDefinitions.RULE_TYPE.count_methods || rule.rule_type === rulesDefinitions.RULE_TYPE.count_attributes" :rule="rule" :index="index"/>
                  </template>

                </div>

                <div class="dropdown dropdown-action" v-if="store.rules.length > 0 ">
                  <a  class="mt-3 action-icon dropdown-toggl btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="feather-plus-circle"></i> Add Rule
                  </a>

                  <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" @click="addRule(rulesDefinitions.RULE_TYPE.defined_class)" > <i class="feather-file-plus me-2"></i> Class definition</a>
                    <a class="dropdown-item" @click="addRule(rulesDefinitions.RULE_TYPE.count_methods)" > <i class="feather-file-plus me-2"></i> Count Methods</a>
                    <a class="dropdown-item" @click="addRule(rulesDefinitions.RULE_TYPE.count_attributes)"> <i class="feather-file-plus me-2"></i> Count Attributes</a>
                  </div>
                </div>
              </div>
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
import useConverterStore from "@/stores/converter"
import Swal from "sweetalert2";
import DefineClass from "@/components/rules/DefineClass.vue";
import rulesDefinitions from "@/lib/rulesDefinitions";
import {API_ENDPOINTS} from "@/config/config";
import Count from "@/components/rules/Count.vue";

const store = useConverterStore()
/*
const defaultCode = '@startuml\n' +
    'skin rose\n' +
    'title Observer\n' +
    'interface Subject <<interface>> {\n' +
    '    + registerObserver(observer: Observer)\n' +
    '    + removeObserver(observer: Observer)\n' +
    '    + notifyObservers()\n' +
    '}\n' +
    '\n' +
    'interface Observer <<interface>> {\n' +
    '    + update()\n' +
    '}\n' +
    '\n' +
    'class MyTopic {\n' +
    '    - observers: Observer[]\n' +
    '    - number: int\n' +
    '    + registerObserver(observer: Observer)\n' +
    '    + removeObserver(observer: Observer)\n' +
    '    + notifyObservers()\n' +
    '}\n' +
    '\n' +
    'abstract class User {\n' +
    '    - username: string\n' +
    '    - alive: boolean \n' +
    '    + update()\n' +
    '}\n' +
    '@enduml'

 */
const defaultCode = '@startuml\n' + 'class Dwelling {\n' + '  +Int Windows\n' + '+void Lock()\n' + '}\n' + '@enduml'
const code = ref(defaultCode)

function focus(node) {
  node.focus();
}
function parseCode(){
  const param = {
    code : code.value,
    endpoint: API_ENDPOINTS.CONVERT
  }

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
    case rulesDefinitions.RULE_TYPE.count_attributes:
      rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.count_attributes_rule));
      break;
    default:
      alert("to implement")
      break;
  }

  store.addRule(rule);
}
</script>

<style scoped>
.blog-image img {
  max-width: 350px;
  max-height: 350px;
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

</style>