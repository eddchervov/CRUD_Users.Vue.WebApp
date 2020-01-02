
Vue.component('ed-paging', {
    props: [
        'totalCount',
        'reloadEntityTable'
    ],
    components: {
        'paginate': Vue.component('paginate', VuejsPaginate)
    },
    data: function () {

        return {
            skipCount: 0,
            totalPage: 0,
            pageSize: 15,
            currentPage: 1
        };
    },
    methods: {

        clickPaging: function (e) {

            this.currentPage = e;

            this.reloadData();
        },
        changePageSize: function (totalCount) {

            this.pageSize = totalCount;
            this.currentPage = 1;
        
            this.reloadData();
        },
        reloadData: function () {

            this.refreshValue();

            if (this.reloadEntityTable)
                this.reloadEntityTable(this.skipCount, this.pageSize);
        },
        refreshValue: function () {
            this.skipCount = (this.currentPage - 1) * this.pageSize;
            this.totalPage = Math.floor((this.totalCount + this.pageSize - 1) / this.pageSize);
        }
    },
    computed: {

        pagingMessage() {

            var from = (this.currentPage - 1) * this.pageSize === 0 ? 1 : (this.currentPage - 1) * this.pageSize;
            var to = (from + this.pageSize) >= this.totalCount ? this.totalCount : from + this.pageSize;

            return "Показаны с " + from + " по " + to + " из " + this.totalCount + " записей";
        }
    },
    watch: {

        totalCount: function () {

            this.refreshValue();
        }
    },
    template: `
<div>
<div class="row"
         v-if="totalCount > 0">
        <div class="col-12">

            <ul class="pagination float-right">
                <li class="pt-1 mr-3">Кол-во элементов на страницу </li>
                <li class="page-item"
                    v-bind:class="{ active: pageSize === 15 }"
                    v-on:click="changePageSize(15)">
                    <button class="page-link">
                        15
                    </button>
                </li>
                <li class="page-item"
                    v-bind:class="{ active: pageSize === 30 }"
                    v-on:click="changePageSize(30)">
                    <button class="page-link">
                        30
                    </button>
                </li>
                <li class="page-item"
                    v-bind:class="{ active: pageSize === 50 }"
                    v-on:click="changePageSize(50)">
                    <button class="page-link">
                        50
                    </button>
                </li>
            </ul>
        </div>
    </div>
<template v-if="totalPage > 1">
        <paginate v-model="currentPage"
                  :page-count="totalPage"
                  :page-range="5"
                  :margin-pages="1"
                  :click-handler="clickPaging"
                  :prev-text="'Предыдущая'"
                  :next-text="'Следующая'"
                  :container-class="'pagination'"
                  :page-link-class="'page-link'"
                  :page-class="'page-item'"
                  :prev-link-class="'page-link'"
                  :prev-class="'page-item'"
                  :next-link-class="'page-link'"
                  :next-class="'page-item'">
        </paginate>
</template>
<div class="row"
       v-if="totalCount > 0">
    <div class="col-6">
        <h7>{{pagingMessage}}</h7>
    </div>
</div>
</div>`
});