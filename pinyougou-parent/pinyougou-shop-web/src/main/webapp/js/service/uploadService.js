//文件上传服务层
/*app.service("uploadService",function($http){
    this.uploadFile=function(){

        var formData=new FormData();
        formData.append("file",file.files[0]);
        return $http({
            method:'POST',
            url:"../upload.do",
            data: formData,
            //两搭配使用，文件上传
            headers: {'Content-Type':undefined},//如果不指定类型，默认为JSON格式
            transformRequest: angular.identity  //对表单进行二进制序列化
        });
    }
});*/
app.service("uploadService",function($http){
    this.uploadFile=function(){
        var formData=new FormData();
        formData.append("file",file.files[0]);
        return $http({
            method:'POST',
            url:"../upload.do",
            data: formData,
            headers: {'Content-Type':undefined},
            transformRequest: angular.identity
        });
    }
});