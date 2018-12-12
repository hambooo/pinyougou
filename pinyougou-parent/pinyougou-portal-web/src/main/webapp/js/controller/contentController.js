app.controller("contentController",function ($scope,contentService) {
    //定义广告集合
    $scope.contentList = [];

    $scope.findByCategoryId=function (categoryId) {
        contentService.findByCategoryId(categoryId).success(
            function (response) {
                $scope.contentList[categoryId]=response;
            }
        )
        // console.log(categoryId)
       /* contentService.findByCategoryId(categoryId).success(
            function (response) {
                alert("111")

                //注意：categoryId参数不要忘记
                $scope.contentList[categoryId] = response;
                alert( $scope.contentList[1][1].pic)
            }
        )*/
    }

})