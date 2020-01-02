
Vue.component('cu-operation-user', {
    props: [
        'user',
        'currentFormOperation',
        'resetAddEditForm'
    ],
    data: function () {

        return {

            countFormError: 0,

            isValidLastName: true,
            errorTextLastName: '',

            isValidFirstName: true,
            errorTextFirstName: '',

            isValidMiddleName: true,
            errorTextMiddleName: ''
        };
    },
    methods: {
        createUser: function () {

            var vue = this;

            if (vue.validationUser()) {

                $.ajax({
                    url: createUserUrl,
                    contentType: "application/json; charset=utf-8",
                    method: "POST",
                    data: JSON.stringify({
                        LastName: vue.user.lastName,
                        FirstName: vue.user.firstName,
                        MiddleName: vue.user.middleName,
                        IsActive: vue.user.isActive
                    }),
                    beforeSend: function () {
                        edLoader.start();
                    },
                    success: function (data) {
                        vue.resetAddEditForm();
                        showModal("Добавлен новый пользователь Id=" + data.userId);
                    },
                    error: function (errorThrown) {
                        console.log(errorThrown);
                        showModal("Произошла ошибка добавления пользователя");
                    },
                    complete: function () {
                        edLoader.stop();
                    }
                });
            }
        },
        updateUser: function () {

            var vue = this;
            if (vue.validationUser()) {

                edLoader.start();
                $.ajax({
                    url: updateUserUrl,
                    contentType: "application/json; charset=utf-8",
                    method: "POST",
                    data: JSON.stringify({
                        Id: vue.user.id,
                        LastName: vue.user.lastName,
                        FirstName: vue.user.firstName,
                        MiddleName: vue.user.middleName,
                        IsActive: vue.user.isActive
                    }),
                    beforeSend: function () {
                        edLoader.start();
                    },
                    success: function () {
                        vue.resetAddEditForm();
                    },
                    error: function (errorThrown) {
                        console.log(errorThrown);
                        showModal("Произошла ошибка редактирования пользователя");
                    },
                    complete: function () {
                        edLoader.stop();
                    }
                });
            }
        },
        validationUser: function () {

            this.countFormError = 0;

            if (!this.user.lastName) {
                this.isValidLastName = false;
                this.countFormError += 1;
                this.errorTextLastName = this.fieldIsRequired('Фамилия');
            }
            else
                this.isValidLastName = true;

            if (!this.user.firstName) {
                this.isValidFirstName = false;
                this.countFormError += 1;
                this.errorTextFirstName = this.fieldIsRequired('Имя');
            }
            else
                this.isValidFirstName = true;

            if (this.countFormError === 0)
                return true;
            else
                return false;
        },

        fieldIsRequired: function (unit) {
            return "Поле " + unit + " обязательно для заполнения";
        }
    },
    created: function () {

        this.isValidLastName = true;
        this.errorTextLastName = '';

        this.isValidFirstName = true;
        this.errorTextFirstName = '';

        this.isValidMiddleName = true;
        this.errorTextMiddleName = '';
    },
    template: `
 <div>

            <div class="card">
                <div class="card-body">

                    <div class="row mb-3">
                        <label for="lastName-input" class="col-3 col-form-label text-right">
                            Фамилия
                            <span class="obligatory-field">*</span>
                        </label>
                        <div class="col-9">
                            <input type="text" id="lastName-input"
                                   class="form-control form-control-sm"
                                   :maxlength="consts.MAX_LENGTH_LAST_NAME"
                                   v-model.trim="user.lastName" />
                            <span class="text-danger"
                                  v-if="!isValidLastName">
                                <i class="fa fa-info-circle" aria-hidden="true"></i>
                                {{errorTextLastName}}
                            </span>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="firstName-input" class="col-3 col-form-label text-right">
                            Имя
                            <span class="obligatory-field">*</span>
                        </label>
                        <div class="col-9">
                            <input id="firstName-input" type="text"
                                   class="form-control form-control-sm"
                                   :maxlength="consts.MAX_LENGTH_FIRST_NAME"
                                   v-model.trim="user.firstName" />
                            <span class="text-danger"
                                  v-if="!isValidFirstName">
                                <i class="fa fa-info-circle" aria-hidden="true"></i>
                                {{errorTextFirstName}}
                            </span>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="middleName-input" class="col-3 col-form-label text-right">
                            Отчество
                        </label>
                        <div class="col-9">
                            <input type="text" id="middleName-input"
                                   class="form-control form-control-sm"
                                   :maxlength="consts.MAX_LENGTH_MIDDLE_NAME"
                                   v-model.trim="user.middleName" />
                        </div>
                    </div>
                    <div class="row mb-5">
                        <div class="col-12 float-right"
                            v-if="currentFormOperation === consts.EDITING_OPERATION">
                            <label class="switch ">
                                <input type="checkbox" class="success"
                                    v-model.trim="user.isActive">
                                    <span class="slider round"></span>
                            </label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">

                        </div>
                        <div class="col-9">
                            <button class="btn btn-ed py-1"
                                    v-on:click="resetAddEditForm()">
                                Отмена
                            </button>
                            <button class="btn btn-success py-1"
                                    v-if="currentFormOperation === consts.ADD_OPERATION"
                                    v-on:click="createUser()">
                                Добавить
                            </button>
                            <button class="btn btn-success py-1"
                                    v-if="currentFormOperation === consts.EDITING_OPERATION"
                                    v-on:click="updateUser()">
                                Редактировать
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
`
});