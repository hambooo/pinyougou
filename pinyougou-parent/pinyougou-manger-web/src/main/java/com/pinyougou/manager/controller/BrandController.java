package com.pinyougou.manager.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.pojo.TbBrand;
import com.pinyougou.pojo.entity.PageResult;
import com.pinyougou.pojo.entity.Result;
import com.pinyougou.sellergoods.service.BrandService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/brand")
public class BrandController {
    @Reference
    private BrandService brandService;

    @RequestMapping("/findAll.do")
    public List<TbBrand> findAll(){
        return brandService.findAll();
    }

    /**
     * 分页查询
     */
    @RequestMapping("/search.do")
    public PageResult search(@RequestBody TbBrand brand, int pageNum, int pageSize){
        return brandService.findPage(brand,pageNum, pageSize);
    }
    /**
     * 增加
     */
    @RequestMapping("/add.do")
    public Result add(@RequestBody TbBrand brand){
        try {
            brandService.add(brand);
            return new Result(true,"增添成功");
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false,"增添失败");
        }
    }

    /**
     * 根据id获取实体
     */
    @RequestMapping("findById.do")
    public TbBrand findById(long id){
        return brandService.findById(id);
    }

    /**
     * 跟新数据
     */
    @RequestMapping("/update.do")
    public Result update(@RequestBody TbBrand brand){
        try {
            brandService.update(brand);
            return new Result(true,"修改成功");
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false,"修改失败");
        }
    }
    /**
     * 批量删除
     */
    @RequestMapping("/delete.do")
    public Result delete(long[] ids){
        try {
            brandService.delete(ids);
            return new Result(true,"删除成功");
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false,"删除失败");
        }
    }

    @RequestMapping("/selectOptionList.do")
    public List<Map> selectOptionList(){
        System.out.println("brand-->"+brandService.selectOptionList());
        return brandService.selectOptionList();
    }
}
