//控制层
app.controller('goodsController', function ($scope, $controller, goodsService,uploadService, typeTemplateService, itemCatService) {

    $controller('baseController', {$scope: $scope});//继承

    $scope.entity={goodsDesc:{itemImages:[],specificationItems:[]}}

    //读取列表数据绑定到表单中  
    $scope.findAll = function () {
        goodsService.findAll().success(
            function (response) {
                $scope.list = response;
            }
        );
    }

    //分页
    $scope.findPage = function (page, rows) {
        goodsService.findPage(page, rows).success(
            function (response) {
                $scope.list = response.rows;
                $scope.paginationConf.totalItems = response.total;//更新总记录数
            }
        );
    }


    //查询实体
    $scope.findOne = function (id) {
        goodsService.findOne(id).success(
            function (response) {
                $scope.entity = response;
            }
        );
    }

    //添加
    $scope.add = function () {
        // alert("111")
        // alert($scope.entity)

        $scope.entity.goodsDesc.introduction = editor.html();//提取 kindeditor 编辑器的内容
        goodsService.add($scope.entity).success(
            function (response) {
                if (response.success) {
                    //重新查询
                    alert("保存成功")
                    $scope.entity = {}//清空内容
                    editor.html('');//富文本不是angular里面的，需要单独清空内容
                } else {
                    alert(response.message);
                }
            }
        );
    }


    //批量删除
    $scope.dele = function () {
        //获取选中的复选框
        goodsService.dele($scope.selectIds).success(
            function (response) {
                if (response.success) {
                    $scope.reloadList();//刷新列表
                    $scope.selectIds = [];
                }
            }
        );
    }

    $scope.searchEntity = {};//定义搜索对象
    $scope.status=['未审核','审核通过','审核未通过','关闭'];//商品状态
    $scope.itemCatList=[];//商品分类列表

    //搜索
    $scope.search = function (page, rows) {
        goodsService.search(page, rows, $scope.searchEntity).success(
            function (response) {
                $scope.list = response.rows;
                $scope.paginationConf.totalItems = response.total;//更新总记录数
            }
        );
    }
    //加载商品分类列表
    $scope.findItemCatList=function(){
        itemCatService.findAll().success(
            function(response){
                for(var i=0;i<response.length;i++){
                    //根据分类 ID 得到分类名称，所以我们将返回的分页结果以数组形式再次封装,巧妙利用数组
                    $scope.itemCatList[response[i].id]=response[i].name;
                }
            }
        );
    }

    /**
     * 上传图片
     */
    $scope.uploadFile=function(){

        uploadService.uploadFile().success(function(response) {
            if(response.success){//如果上传成功，取出 url
                $scope.image_entity.url=response.message;//设置文件地址
            }else{
                alert(response.message);
            }
        }).error(function() {
            alert("上传发生错误");
        });
    };

    //定义页面实体结构添加图片列表
    $scope.entity={goods:{},goodsDesc:{itemImages:[],specificationItems:[]}};
    $scope.add_image_entity=function(){
        $scope.entity.goodsDesc.itemImages.push($scope.image_entity);
    }
    //列表中移除图片
    $scope.remove_image_entity=function(index){
        $scope.entity.goodsDesc.itemImages.splice(index,1);
    }






//读取一级分类
    $scope.selectItemCat1List = function () {
        // alert("111")
        itemCatService.findByParentId(0).success(function (response) {
            $scope.itemCat1List = response;
        })
    }

//读取二级分类
    $scope.$watch('entity.goods.category1Id', function (newValue, oldValue) {
        //根据选择的值，查询二级分类
        itemCatService.findByParentId(newValue).success(
            function (response) {
                $scope.itemCat2List = response;
            }
        );
    });
//读取三级分类
    $scope.$watch('entity.goods.category2Id', function (newValue, oldValue) {
        //根据选择的值，读取三级分类
        itemCatService.findByParentId(newValue).success(
            function (response) {
                $scope.itemCat3List = response;
            }
        );
    });

    //监控第三级分类，读取模板id
    $scope.$watch('entity.goods.category3Id', function (newValue, oldValue) {
        //根据选择的值，读取模板id
        itemCatService.findOne(newValue).success(
            function (response) {
                $scope.entity.goods.typeTemplateId = response.typeId;
            }
        );
    });

    //监控模板id，更新品牌
    $scope.$watch('entity.goods.typeTemplateId', function (newValue, oldValue) {
        //根据选择的值，更新品牌
        typeTemplateService.findOne(newValue).success(
            function (response) {
                //定义并赋值类型模板
                $scope.typeTemplate = response;
                //字符串转换为json
                $scope.typeTemplate.brandIds = JSON.parse($scope.typeTemplate.brandIds);
                //监控模板id，更新扩展属性
                $scope.entity.goods.customAttributeItems = JSON.parse($scope.typeTemplate.customAttributeItems)
                // console.log($scope.typeTemplate.customAttributeItems);
                // 注意TypeError: Cannot set property 'customAttributeItems' of undefined,

            }
        );
        typeTemplateService.findSpecList(newValue).success(
            function (response) {
                //定义并赋值规格列表
                // [{"options":[{"id":118,"optionName":"16G","orders":1,"specId":32},{...}],"id":32,"text":"机身内存"},...]
                $scope.specList = response;
                // console.log($scope.specList)
            }
        )
    });

    //更新选中
    $scope.updateSpecAttribute=function ($event,name, value) {
        // alert($scope.entity.goodsDesc.specificationItems)
        // console.log($scope.entity.goodsDesc.specificationItems)

        //$scope.entity.goodsDesc.specificationItems:[{"attributeName":"网络制式","attributeValue":["移动3G","移动4G"]},{"attributeName":"屏幕尺寸","attributeValue":["6寸","5寸"]}]
        var object=$scope.searchObjectByKey($scope.entity.goodsDesc.specificationItems,'attributeName',name)
        if(object!=null){
            if($event.target.checked){
                object.attributeValue.push(value);
            }else {
                //取消勾选，移除选项
                object.attributeValue.splice(object.attributeValue.indexOf(value),1);
                if(object.attributeValue.length == 0){
                    $scope.entity.goodsDesc.specificationItems.splice(
                        $scope.entity.goodsDesc.specificationItems.indexOf(object),1);
                }
            }
        }else{
            $scope.entity.goodsDesc.specificationItems.push({"attributeName":name,"attributeValue":[value]})
        }

    }

    //创建SKU列表
    $scope.creatItemList=function () {
        $scope.entity.itemList=[{spec:{},price:0,num:99999,status:'0',isDefault:'0' } ];
        var items =  $scope.entity.goodsDesc.specificationItems;
        for(var i =0; i<items.length; i++){
            $scope.entity.itemList=addColumn($scope.entity.itemList,items[i].attributeName,items[i].attributeValue )
        }
    }

    addColumn=function (list, columnName, columnValue) {
        var newList = [];
        for(var i = 0; i< list.length; i++){
            var oldRow = list[i];
            for(var j = 0; j < columnValue.length; j++){
                var newRow=JSON.parse(JSON.stringify(oldRow));
                newRow.spec[columnName]=columnValue[j];
                newList.push(newRow);
            }
        }
        return newList;
    }


});
