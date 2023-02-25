package com.increff.employee.dto;

import java.util.ArrayList;
import java.util.List;

import com.increff.employee.controller.inventoryApiController;
import com.increff.employee.pojo.productPojo;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.increff.employee.model.inventoryForm;
import com.increff.employee.pojo.inventoryPojo;
import com.increff.employee.service.ApiException;
import com.increff.employee.service.InventoryService;
import com.increff.employee.service.productService;

@Service
public class inventoryDto {
    private Logger logger = Logger.getLogger(inventoryApiController.class);
    @Autowired
    private InventoryService service;
    @Autowired
    private productService pservice;

    public void add( inventoryForm form) throws ApiException {
        inventoryPojo p = convert(form);
        service.add(p);
    }

    public inventoryForm get( int id) throws ApiException {
        inventoryPojo p = service.get(id);
        return convert(p);
    }

    public List<productPojo> getid() throws Exception {
        List<productPojo> list = pservice.getAll();
        return list;
    }

    public List<inventoryForm> getAll() throws Exception {
        List<inventoryPojo> list = service.getAll();
        List<inventoryForm> list2 = new ArrayList<inventoryForm>();
        for (inventoryPojo p : list) {
            list2.add(convert(p));
        }
        return list2;
    }

    public void update( int id, inventoryForm f) throws ApiException {
        inventoryPojo p = convert(f);
        logger.info(p.getQuantity());
        logger.info(id);
        service.update(id, p);
    }

    private static inventoryForm convert(inventoryPojo p) {
        inventoryForm d = new inventoryForm();
        d.setQuantity(p.getQuantity());
        d.setId(p.getId());
        d.setBarcode(p.getBarcode());
        d.setName(p.getName());
        return d;
    }

    private  inventoryPojo convert(inventoryForm f) throws ApiException {
        inventoryPojo pr = new inventoryPojo();
        logger.info(f.getQuantity());
        if(f.getQuantity()%1!=0)
        {
            throw new ApiException("Quantity cannot have decimal values");
        }
        pr.setQuantity((int)f.getQuantity());
        pr.setBarcode(f.getBarcode());
        logger.info(pr.getBarcode());
        return pr;
    }


}