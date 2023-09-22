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
                  <DefineClass v-for="(rule, index) in store.rules" :rule="rule" :index="index"/>
                </div>
              </div>
            </div>
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

const store = useConverterStore()
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
//const defaultCode = '@startuml\n' + 'class Dwelling {\n' + '  +Int Windows\n' + '+void Lock()\n' + '}\n' + '@enduml'
const code = ref(defaultCode)

function focus(node) {
  node.focus();
}
function parseCode(){
  const param = {
    code : code.value,
    endpoint: "/convert"
  }

  store.parse(param).then(() => {
    Swal.fire(store.toastOptions)
  }).catch(() => {
    Swal.fire(store.toastOptions)
  }).finally(()=> {
    store.toastOptions = {}
  })
}

function generateRule(){

}
</script>

<style scoped>
</style>