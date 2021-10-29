<template>
  <div class="user-search-form">
    <section>
      <div class="input-search">
        <b-field label="Name" horizontal>
          <b-input v-model="param.name"></b-input>
        </b-field>
        <b-field label="Age" horizontal>
          <b-input v-model="param.age"></b-input>
        </b-field>
        <b-field label="Sex" horizontal>
          <b-input v-model="param.sex"></b-input>
        </b-field>
      </div>
      <div class="float-right">
        <b-button @click="search">Search</b-button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
// import Vue from "vue";
import { Component, Vue, Prop } from "vue-property-decorator";
import { SearchUser } from "@/model/SearchUser";
@Component
export default class UserSearchForm extends Vue {
  param: SearchUser = {
    name: '',
    age: '',
    sex: ''
  }
  search() {
    this.$emit("search", this.param);
  }
};
</script>

<style scoped>
.user-search-form {
  background-color: yellow;
  padding: 30px;
}
.input-search {
  width: 90%;
}
.float-right {
  float: right;
  margin-top: -38px;
}
</style>
