<template>
  <div class="container my-5">
    <user-search-form @search="searchUser"></user-search-form>
    <b-table :data="users" :columns="columns"></b-table>
    <b-pagination
      v-model="pagination.current"
      :total="pagination.total"
      :range-before="pagination.rangeBefore"
      :range-after="pagination.rangeAfter"
      :order="pagination.order"
      :size="pagination.size"
      :simple="pagination.isSimple"
      :rounded="pagination.isRounded"
      :per-page="pagination.perPage"
      :icon-prev="pagination.prevIcon"
      :icon-next="pagination.nextIcon"
      @change="handlerPagination"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page">
  </b-pagination>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import titanic from "@/assets/titanic.json";
import UserSearchForm from "@/components/parts/UserSearchForm.vue";

export default Vue.extend({
  components: { UserSearchForm },
  name: "Home",
  data() {
    return {
      users: [{}],
      tempUsers: titanic,
      pagination: {
        total: 0,
        current: 1,
        perPage: 20,
        rangeBefore: 3,
        rangeAfter: 1,
        order: "",
        size: "",
        isSimple: false,
        isRounded: false,
        prevIcon: "chevron-left",
        nextIcon: "chevron-right"
      },
      paramSearch: {
        name: "",
        age: null,
        sex: null
      },
      columns: [
        {
          field: "name",
          label: "Name"
        },
        {
          field: "sex",
          label: "Sex"
        },
        {
          field: "age",
          label: "Age"
        }
      ]
    };
  },
  methods: {
    handlerPagination (current: number) {
      this.pagination.current = current;
      this.searchUser(this.paramSearch);
    },
    searchUser (param: {}) {
      Object.assign(this.paramSearch, param);
      if (Object.values(param).length > 0) {
        this.tempUsers = [];
        titanic.filter((user, index) => {
          let isMatch = false;
          if (this.paramSearch.name) {
            isMatch = user.name.toLowerCase().includes(this.paramSearch.name.toLowerCase());
          }
          if (this.paramSearch.age) {
            isMatch = this.paramSearch.name ? (isMatch && user.age == this.paramSearch.age) : user.age == this.paramSearch.age;
          }
          if (this.paramSearch.sex) {
            isMatch = (this.paramSearch.name || this.paramSearch.age) ? (isMatch && user.sex == this.paramSearch.sex) : user.sex == this.paramSearch.sex;
          }
          if (isMatch) {
            this.tempUsers.push(user);
          }
          if(index + 1 === titanic.length) {
            this.pagination.total = this.tempUsers.length;
            if (this.pagination.total > this.pagination.perPage) {
              this.users = this.tempUsers.splice((this.pagination.current - 1) * this.pagination.perPage,  this.pagination.perPage * this.pagination.current);
            } else {
              this.users = this.tempUsers;
            }
          }
        });
      }
    }
  }
});
</script>
