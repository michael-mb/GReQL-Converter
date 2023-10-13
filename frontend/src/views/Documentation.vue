<!--suppress ES6UnusedImports -->
<template>
  <div class="main-wrapper" id="main-wrapper">
    <Header/>
    <div class="page-wrapper">
      <div class="content container-fluid">

        <div class="page-header">
          <div class="row">
            <div class="col-sm-12">
              <h3 class="page-title">Documentation</h3>
              <ul class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/">Dashboard</router-link></li>
                <li class="breadcrumb-item active">Documentation</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="card bg-white">
              <div class="card-header">
                <h3 class="card-title"><i data-v-45da5cae="" class="feather-repeat fs-30"></i> GReQL Converter</h3>
                <br>
                <p class="card-text">
                  This page explains the subtleties to be taken into account when using PlantText for the GReQL Converter.
                  We recommend that you first read <a href="https://plantuml.com/class-diagram" target="_blank">
                  the official PlantUML documentation</a> before reading this one.
                </p>
              </div>
              <div class="card-body">
                <h4>Attribute Declaration</h4>
                <br>
                <p>There are several ways of declaring attributes with PlantText. But the most suitable
                  method for the GReQL converter is the following: </p>

                <code-editor  font-size="14px" v-model="attributeDef" theme="github" :line-nums="true" :languages="[['js', 'JS']]" :header="false"
                              width="100%"/>

                <br>
                <h4>Method Declaration</h4>
                <br>
                <p>There are several ways of declaring methods and parameters with PlantText. But the most suitable
                  method for the GReQL converter is the following: </p>

                <code-editor  font-size="14px" v-model="methodDef" theme="github" :line-nums="true" :languages="[['js', 'JS']]" :header="false"
                              width="100%"/>

                <br>
                <h4>Enum Declaration</h4>
                <br>
                <p>To declare Enums on the GReQL Converter, you need to do exactly that: </p>
                <code-editor  font-size="14px" v-model="enumDef" theme="github" :line-nums="true" :languages="[['js', 'JS']]" :header="false"
                              width="100%"/>

                <br>
                <h4>Interface and Abstract Class Declaration</h4>
                <br>
                <p>To declare Interface and Abstract Class on the GReQL Converter, you need to do exactly that: </p>
                <code-editor  font-size="14px" v-model="interAbstract" theme="github" :line-nums="true" :languages="[['js', 'JS']]" :header="false"
                              width="100%"/>

                <br>
                <h4>Requires manual intervention</h4>
                <br>
                <p>However, there are a few PlantText features that are not yet supported by the parser:</p>
                <ul>
                  <li>- Static variables, classes and methods</li>
                  <li>- Attributes that are arrays: "+ int[] number".</li>
                  <li>- Methods that return arrays: "+ int[] update()".</li>
                </ul>
                <br>
                <p>To overcome this problem, you can simply make the change manually in the rules editor.</p>
                <br>
                <p>For other types of modeling, please refer to
                  <a href="https://plantuml.com/class-diagram" target="_blank">the official PlantUML documentation.</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import CodeEditor from "simple-code-editor";
import {ref} from "vue";

const attributeDef = ref("class ClassA {\n" +
    "  - windows : int\n" +
    "  + time : Date\n" +
    "  # name : String\n" +
    "}")
const methodDef = ref("class ClassA {\n" +
    "   +void lock(int age, bool state)\n" +
    "}")
const enumDef = ref("enum TimeUnit <<enum>> {\n" +
    "  DAYS\n" +
    "  HOURS\n" +
    "  MINUTES\n" +
    "}")

const interAbstract = ref("interface Observer <<interface>> {\n" +
    "    + void update()\n" +
    "}\n" +
    "\n" +
    "class MyTopic {\n" +
    "    - number: int\n" +
    "    + void notifyObservers()\n" +
    "}\n" +
    "\n" +
    "abstract class User {\n" +
    "    - username: string\n" +
    "    - alive: boolean \n" +
    "    + void update()\n" +
    "}")
</script>

<style scoped>

</style>