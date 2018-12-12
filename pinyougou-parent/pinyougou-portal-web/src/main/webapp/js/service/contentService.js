app.service("contentService",function ($http) {
    this.findByCategoryId=function (categoryId) {
        //记住：一定要写return
        return $http.get("content/findByCategoryId.do?categoryId="+categoryId);
    }

})