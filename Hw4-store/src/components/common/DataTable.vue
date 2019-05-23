<template>
  <div>
    <table class="table  mt-4">
      <thead>
        <tr>
          <th>
            <label class="fontawesome-checkbox">
              <input type="checkbox" name="chk_all" v-model="isCheckAll" @change="checkAllEvent"/>
              <span></span>
            </label>
          </th>

          <th v-for="(item,key) in headers" :key="key" :width="item.width">{{item.name}}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="tableItem.length >0" v-for="(item) in tableItem" :key="item.id"
             @click="onRowClick(item)">
          <th>
            <label class="fontawesome-checkbox" @click.prevent="doNothing">
              <input type="checkbox" name="chk_all" :id="item.id" :value="item" v-model="checkedValues">
              <span></span>
            </label>
          </th>

          <slot :item="item">
            <td>{{item.category}}</td>
            <td>{{item.title}}</td>
            <td>{{item.originPrice}} | separator</td>
            <td>{{item.price}}</td>
            <td>{{item.isEnabled}}</td>
            <td>
              <a class="btn btn-sm btn-outline-primary" href="#">編輯</a>
            </td>
          </slot>
        </tr>
      </tbody>
    </table>


    <!--no-data slot-->
    <slot name="no-data" v-if="tableItem.length<=0">
      <div class="text-center mt-5">
        <div>
          <i class="fas fa-box-open fa-4x" style="color:rgba(108,117,125,0.31);"></i>
        </div>
        <p class="text-center mt-3" style="color:rgba(108,117,125,0.38);">{{$t("common.NoData")}}</p>
      </div>
    </slot>


    <!--pagination-->
    <nav v-if="tableItem.length >0" aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{'disabled':!pagination.hasPre}">
          <a class="page-link" href="#" aria-label="Previous"
             @click.prevent="pageTurning(pagination.currentPage-1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <li class="page-item" v-for="index in pagination.totalPages" :key="index"
            :class="{'active':index === pagination.currentPage}">
          <a class="page-link" href="#" @click.prevent="pageTurning(index)">{{index}}</a>
        </li>

        <li class="page-item" :class="{'disabled':!pagination.hasNext}">
          <a class="page-link" href="#" aria-label="Next"
             @click.prevent="pageTurning(pagination.currentPage+1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    name: "DataTable",
    data: () => ({
      isCheckAll: false,
      checkedValues: [],
    }),
    props: {
      headers: {
        type: Array,
        required: true
      },
      tableItem: {
        type: Array,
        required: true
      },
      pagination: {
        currentPage: 1,
        totalPages: 1,
        hasNext: false,
        hasPre: false,
      },
    },
    methods: {
      checkAllEvent() {
        if (this.isCheckAll) {
          this.tableItem.forEach((item) => {
            if (this.checkedValues.indexOf(item) < 0) {
              this.checkedValues.push(item);
            }
          });
        } else {
          this.checkedValues = [];
        }
      },
      pageTurning(index) {
        this.$emit("pageTurning", this.pagination.currentPage, index);
        this.isCheckAll = false;
        this.checkedValues = [];
      },
      onRowClick(item) {
        let index = this.checkedValues.indexOf(item);

        if (index < 0) {
          this.checkedValues.push(item);
        } else {
          this.checkedValues.splice(index, 1)
        }
      },
      doNothing() {
      }
    },
    watch: {
      checkedValues() {
        this.isCheckAll = this.checkedValues.length === this.tableItem.length;
      },
      tableItem() {
        this.checkedValues = [];
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/all.scss";

  .fontawesome-checkbox input[type="checkbox"] {
    display: none;
  }

  .fontawesome-checkbox span:before {;
    font-family: "Font Awesome 5 Pro", "Font Awesome 5 Free";
    font-weight: 400;
    font-style: normal;
    color: $gray-600;
    width: 1em;
    height: 1em;;
    content: "\f0c8";
  }

  .fontawesome-checkbox input[type="checkbox"]:checked ~ span:before {
    font-weight: 900;
    content: '\f14a';
  }
</style>
