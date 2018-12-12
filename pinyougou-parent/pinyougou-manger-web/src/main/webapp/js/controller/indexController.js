app.controller('indexController',function ($scope, loginService) {
    $scope.showUsername=function () {
        // alert('111')
        loginService.loginName().success(function (response) {
            $scope.username=response.loginName;
            // alert(response)

        })
    }
})