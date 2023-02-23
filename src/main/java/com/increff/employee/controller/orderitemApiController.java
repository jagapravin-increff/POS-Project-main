package com.increff.employee.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.increff.employee.model.booForm;
import com.increff.employee.model.orderitemForm;
import com.increff.employee.pojo.orderitemPojo;
import com.increff.employee.service.ApiException;
import com.increff.employee.service.orderitemService;
import com.increff.employee.util.DataConversionUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api
@RestController
public class orderitemApiController {
	private Logger logger = Logger.getLogger(orderitemApiController.class);

	@Autowired
	private orderitemService service;

	@ApiOperation(value = "Checks a orderItem")
	@RequestMapping(path = "/api/orderitem/supervisor/check", method = RequestMethod.POST)
	public booForm Add(@RequestBody orderitemForm form) throws ApiException {
        orderitemPojo o=DataConversionUtil.convert(form);
        List<Object> p=service.checkitems(o,0);
		logger.info(p);
        if ((int)p.get(0)==-1) {
        	return DataConversionUtil.convert(0,"",0);
        }
        else if ((int)p.get(0)==-2) {
        	return DataConversionUtil.convert(2,"",(int)p.get(1));
        }
        return DataConversionUtil.convert(1,(String)p.get(1),0);
	}

	
	

	@ApiOperation(value = "Gets an orderitem by ID")
	@RequestMapping(path = "/api/orderitem/{id}", method = RequestMethod.GET)
	public orderitemPojo Get(@PathVariable int id) throws ApiException {
		orderitemPojo p = service.getid(id);
		return p;
	}
	
	@ApiOperation(value = "Updates an orderitem")
	@RequestMapping(path = "/api/orderitem/supervisor/{id}", method = RequestMethod.PUT)
	public void Update(@PathVariable int id, @RequestBody orderitemForm f) throws ApiException {
        orderitemPojo o=DataConversionUtil.convert(f);    
		logger.info(o.getBarcode());
		 service.update(id, o,f.getOld_q());
	}
	
	@ApiOperation(value = "Gets an orderitem by ID")
	@RequestMapping(path = "/api/orderitem/supervisor/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable int id) throws ApiException {
		service.delete(id);
	}

}
