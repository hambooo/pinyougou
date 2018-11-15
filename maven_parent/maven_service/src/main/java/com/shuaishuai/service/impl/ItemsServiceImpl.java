package com.shuaishuai.service.impl;

import com.shuaishuai.dao.ItemsDao;
import com.shuaishuai.domain.Items;
import com.shuaishuai.service.ItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemsServiceImpl implements ItemsService {

    @Autowired
    private ItemsDao itemsDao;

    public Items findById(Integer id) {
        return itemsDao.findById(id);
    }
}
