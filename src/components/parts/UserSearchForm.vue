<template>
  <div class="user-search-form">
    <section>
      <div class="input-search">
        <b-field label="Name" horizontal>
          <b-input v-model="name"></b-input>
        </b-field>
        <b-field label="Age" horizontal>
          <b-input v-model="age"></b-input>
        </b-field>
        <b-field label="Sex" horizontal>
          <b-input v-model="sex"></b-input>
        </b-field>
      </div>
      <div class="float-right">
        <b-button @click="search">Search</b-button>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      name: null,
      age: null,
      sex: null
    };
  },
  methods: {
    search() {
      const param = {
        name: this.name,
        age: this.age,
        sex: this.sex
      };
      this.$emit("search", param);
    }
  }
});
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
