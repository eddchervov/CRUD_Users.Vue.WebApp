
Vue.component('view-user-log', {
    props: [
        'userId',
        'cancelViewUserLogOperation'
    ],
    data: function () {

        return {
            userLogs: []
        };
    },
    methods: {

        getUserLogs: function () {

            var vue = this;

            $.ajax({
                url: getUserLogsUrl,
                contentType: "application/json; charset=utf-8",
                method: "POST",
                data: JSON.stringify({
                    UserId: vue.userId
                }),
                beforeSend: function () {
                    edLoader.start();
                },
                success: function (data) {
                    vue.userLogs = data.userLogModels;
                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                    showModal("Произошла ошибка получения списка историй изменений");
                },
                complete: function () {
                    edLoader.stop();
                }
            });
        }
    },
    created() {
        this.getUserLogs();
    },
    template: `
<div>

            <div class="card">
                <div class="card-body">


                            <table class="table table-sm table-striped table-bordered"
                                v-if="userLogs.length > 0">
                                <thead>
                                    <tr class="text-center">
                                        <th class="align-middle">№</th>
                                        <th class="align-middle">Дата изменения</th>
                                        <th class="align-middle">Фамилия</th>
                                        <th class="align-middle">Имя</th>
                                        <th class="align-middle">Отчество</th>
                                        <th class="align-middle">Вкл.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="t-word-wrap text-center"
                                        v-for="(userLog, index) in userLogs">
                                        <td class="align-middle">{{index + 1}}) </td>
                                        <td class="align-middle">{{moment(userLog.created).format("DD.MM.YYYY HH:mm")}}</td>
                                        <td class="align-middle">{{userLog.lastName}}</td>
                                        <td class="align-middle">{{userLog.firstName}}</td>
                                        <td class="align-middle">{{userLog.middleName}}</td>
                                        <td class="align-middle">{{userLog.isActive === true ? 'Да' : userLog.isActive === false ? 'Нет' : ''}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="text-center mb-3"
                                v-if="userLogs.length === 0">
                                <h5>Нет записей</h5>
                             </div>

                    <div class="row">
                        <div class="col-12 text-center">
                            <button class="btn btn-ed"
                                    v-on:click="cancelViewUserLogOperation">
                                Назад
                            </button>
                        </div>
                    </div>
                </div>
            </div>
</div>
`
});