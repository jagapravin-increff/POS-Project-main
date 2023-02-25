package com.increff.employee.dto;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import com.increff.employee.controller.orderApiController;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.increff.employee.model.booForm;
import com.increff.employee.model.orderForm;
import com.increff.employee.model.orderitemForm;
import com.increff.employee.pojo.orderPojo;
import com.increff.employee.pojo.orderitemPojo;
import com.increff.employee.service.ApiException;
import com.increff.employee.service.orderitemService;
import com.increff.employee.util.DataConversionUtil;



@Service
public class orderDto {
    private Logger logger = Logger.getLogger(orderApiController.class);

    @Autowired
    private orderitemService service;

    private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");


    public void add( List<orderitemForm> form) throws ApiException {
        List <orderitemPojo> item=new ArrayList<orderitemPojo>();
        for(orderitemForm f:form) {
            item.add(DataConversionUtil.convert(f));
        }
        List<Integer> res=service.AddItems(item);
        
    }


    public booForm AddToExistingOrder( int id, orderitemForm form) throws ApiException {
        int q=service.AddSingleItem(DataConversionUtil.convert(form),id);
        return DataConversionUtil.convert(q);
    }


    public List<orderForm> getAll() throws Exception {
        List<orderForm> list2 = new ArrayList<orderForm>();
        for (orderPojo p : service.getAll()) {
            list2.add(DataConversionUtil.convert(p));
        }
        return list2;
    }

    public List<orderitemPojo> get( int id) throws ApiException {
        return service.get(id);
    }
}