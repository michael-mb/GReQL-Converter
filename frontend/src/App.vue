<template>
  <RouterView />
</template>

<script setup>
</script>

<style>

/** RULES STYLE DEFINITION START **/
.card-body {
  transition: 1s;
}
.collapse{
  transition: 1s;
}
.info-wrapper {
  display: block;
  position: absolute;
  right: 0;
  top: -3px;
  font-size: 25px;
  color: #6b36de;
  cursor: pointer;
}

.type_name {
  margin-left: 50px;
}
.type {
  display: block;
  position: absolute;
  top: -6px;
  left: -6px;
  color: #6b36de;
  padding: 5px;
  text-align: center;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 18px;
  border: 1px solid #6b36de;
}

/***** Chrome, Safari, Opera, and Edge Chromium *****/
input[type="range"]::-webkit-slider-runnable-track {
  background: #e9ecef;
  border-radius: 20px;
}

/******** Firefox ********/
input[type="range"]::-moz-range-track {
  background: #e9ecef;
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: none;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background: #7638ff;
}

.form-check-inline {
  margin-top: 6px;
}

.add_item {
  font-size: 20px;
  color: #7638ff;
  cursor: pointer;
  transition: 0.2s;
}

.add_item:hover{
  font-size: 22px;
  color: #4f00ff;
}

.form-group{
  position: relative;
}
.add_arg{
  font-size: 20px;
  color: #7638ff;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 3px;
  transition: 0.2s;
}

.add_arg:hover{
  font-size: 22px;
  color: #4f00ff;
}

.arg_input {
  width: 50%;
}

.ml-1 {
  margin-left: 5px;
}

/** RULES STYLE DEFINITION END **/

</style>
