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
import { UserDTO } from "../model/DTO/UserDTO";
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
  userSearchParam: UserDTO = {
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
    this.searchUser(this.userSearchParam);
  }
  searchUser(userSearchParam: UserDTO){
    if(titanic.length == 0){
      return;
    }
    let tempUsers: User[] = titanic;
    this.userSearchParam = userSearchParam;
    const isEmpty = Object.values(userSearchParam).every(x => x === null || x === '');
    if(!isEmpty){
      tempUsers = titanic.filter((user: User) => {
        let isMatch = false;
        if(this.userSearchParam.name){
          isMatch = user.name.toLowerCase().includes(this.userSearchParam.name.toLowerCase());
        }
        if(this.userSearchParam.age > 0){
          isMatch = this.userSearchParam.name ? (isMatch && user.age == this.userSearchParam.age) : user.age == this.userSearchParam.age;
        }
        if(this.userSearchParam.sex){
          isMatch = (this.userSearchParam.name || this.userSearchParam.age > 0) ? (isMatch && user.sex == this.userSearchParam.sex) : user.sex == this.userSearchParam.sex;
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
