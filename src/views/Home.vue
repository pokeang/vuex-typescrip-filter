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
import titanic from "@/assets/titanic.json";
import { User } from "../model/User";
import { Pagination } from "../model/Pagination";
import { SearchUser } from "../model/SearchUser";
import UserSearchForm from "@/components/parts/UserSearchForm.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { UserSearchForm }
})
export default class Home extends Vue {
  users: User[] = [];
  pagination: Pagination = {
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
  };
  paramSearch: SearchUser = {
    name: "",
    age: "",
    sex: ""
  };
  columns = [
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
  ];
  handlerPagination(current: number){
    this.pagination.current = current;
    this.searchUser(this.paramSearch);
  }
  searchUser(param: {}){
    if(titanic.length == 0){
      return;
    }
    let tempUsers: User[] = titanic;
    Object.assign(this.paramSearch, param);
    const isEmpty = Object.values(param).every(x => x === null || x === '');
    if(!isEmpty){
      tempUsers = titanic.filter((user: User) => {
        let isMatch = false;
        if(this.paramSearch.name){
          isMatch = user.name.toLowerCase().includes(this.paramSearch.name.toLowerCase());
        }
        if(this.paramSearch.age > 0){
          isMatch = this.paramSearch.name ? (isMatch && user.age == this.paramSearch.age) : user.age == this.paramSearch.age;
        }
        if(this.paramSearch.sex){
          isMatch = (this.paramSearch.name || this.paramSearch.age > 0) ? (isMatch && user.sex == this.paramSearch.sex) : user.sex == this.paramSearch.sex;
        }
        if(isMatch){
          return user;
        }
      });
    }
    this.pagination.total = tempUsers.length;
    this.users = tempUsers.splice((this.pagination.current - 1) * this.pagination.perPage,  this.pagination.perPage * this.pagination.current);
  }
}
</script>
