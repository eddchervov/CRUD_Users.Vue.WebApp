
var userGridApp = new Vue({
    el: '#user-app',
    data: {

        // paging
        totalCount: 0,

        // form events
        isEmptyTable: true,
        isUserActive: true,

        // form lists
        users: [],

        // form fields
        currentFormOperation: Vue.prototype.consts.STANDARD_OPERATION,
        selectedUserIndex: -1,
        selectUser: {}
    },
    methods: {

        getUsers: function (skip = 0, take = 15) {

            var vue = this;
            $.ajax({
                url: getUsersUrl,
                contentType: "application/json; charset=utf-8",
                method: "POST",
                data: JSON.stringify({
                    isActive: vue.isUserActive,
                    skipCount: skip,
                    takeCount: take
                }),
                beforeSend: function () {
                    edLoader.start();
                },
                success: function (data) {
                    vue.totalCount = data.totalCount;
                    vue.users = data.users;
                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                    showModal("Произошла ошибка получения списка пользователей");
                },
                complete: function () {
                    edLoader.stop();
                }
            });
        },

        changeIsActiveBtn: function () {
            this.isUserActive = !this.isUserActive;
            this.resetAddEditForm();
        },
        editUserOpenForm: function (index) {
            this.selectUser.id = this.users[index].id;
            this.selectUser.lastName = this.users[index].lastName;
            this.selectUser.firstName = this.users[index].firstName;
            this.selectUser.middleName = this.users[index].middleName;
            this.selectUser.isActive = this.users[index].isActive;

            this.transitionOperation(Vue.prototype.consts.EDITING_OPERATION);
        },
        viewUserLogOperation() {
            this.selectUser = this.users[this.selectedUserIndex];
            this.transitionOperation(Vue.prototype.consts.VIEW_USER_LOG_OPERATION);
        },
        cancelViewUserLogOperation() {
            this.transitionOperation(Vue.prototype.consts.STANDARD_OPERATION);
            this.selectUser = {};
        },
        resetAddEditForm: function () {
            this.getUsers();
            this.transitionOperation(Vue.prototype.consts.STANDARD_OPERATION);
            this.selectUser = {};
        },
        endLoadingForm: function () {
            $("#load-box").addClass("d-none");
            $("#user-app").removeClass("d-none");
        },
        transitionOperation: function (operation) {
            if (operation !== undefined)
                this.currentFormOperation = operation;
        },
        getUserIndex: function (index) {
            this.selectedUserIndex = index;
        },
        
        // custom pagination method
        reloadEntityTable: function (skip, take) {

            this.selectedUserIndex = -1;
            this.getUsers(skip, take);
        }
    },
    watch: {

        users: function () {

            if (this.users.length > 0) {
                this.isEmptyTable = false;
            }
            else {
                this.isEmptyTable = true;
            }
        }
    },
    created: function () {

        this.endLoadingForm();
        this.getUsers();
    }
});