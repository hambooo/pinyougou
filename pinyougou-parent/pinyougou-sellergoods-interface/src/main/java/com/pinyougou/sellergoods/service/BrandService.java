package com.pinyougou.sellergoods.service;


import com.pinyougou.pojo.TbBrand;
import com.pinyougou.pojo.entity.PageResult;
import com.pinyougou.pojo.entity.Result;

import java.util.List;
import java.util.Map;

public interface BrandService {
    /**
     * 查询所有
     * @return
     */
    public List<TbBrand> findAll();
    /**
     * 分页查询
     * 条件查询
     */
    public PageResult findPage(TbBrand brand,int pageNum, int pageSize);
    /**
     * 增加保存
     */
    public void add(TbBrand brand);
    /**
     * 根据ID 获取实体
     */
    public TbBrand findById(long id);
    /**
     * 修改
     */
    public void update(TbBrand brand);

    /**
     * 删除
     */
    public void delete(long[] ids);

    /**
     * 返回下拉列表
     * @return
     */
    public List<Map> selectOptionList();

}
