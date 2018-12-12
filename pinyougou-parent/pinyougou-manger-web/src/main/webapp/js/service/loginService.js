app.service('loginService',function($http) {
    this.loginName=function () {
        // alert("2222")
        return $http.get('../login/name.do');
        // alert("333")
    }
})
/*
app.service('loginService',function ($http) {
    alert("222")
    this.loginName=function () {
        return $http.get('../login/name.do');

    }
})

*/
/*
app.service('indexService',function($http){

    this.username=function(){
        return $http.get('../login/username.do');
    }
});
*/
