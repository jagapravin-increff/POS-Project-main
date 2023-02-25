package com.increff.employee.controller;

import java.time.format.DateTimeFormatter;
import java.util.List;
import com.increff.employee.dto.orderDto;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.increff.employee.model.booForm;
import com.increff.employee.model.orderForm;
import com.increff.employee.model.orderitemForm;
import com.increff.employee.pojo.orderitemPojo;
import com.increff.employee.service.ApiException;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api
@RestController
public class orderApiController {
	private Logger logger = Logger.getLogger(orderApiController.class);

	@Autowired
	private orderDto odt;
   
	private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
	
	@ApiOperation(value = "Creating a order")
	@RequestMapping(path = "/api/order/supervisor", method = RequestMethod.POST)
	public void add(@RequestBody List<orderitemForm> form) throws ApiException {
		 odt.add(form);
	}
	
	@ApiOperation(value = "Creating a order")
	@RequestMapping(path = "/api/order/supervisor/{id}", method = RequestMethod.POST)
	public booForm AddToExistingOrder(@PathVariable int id,@RequestBody orderitemForm form) throws ApiException {
			return odt.AddToExistingOrder(id,form);
	}

	@ApiOperation(value = "Gets list of all orders")
	@RequestMapping(path = "/api/order", method = RequestMethod.GET)
	public List<orderForm> getAll() throws Exception {
		return odt.getAll();
	}
	
	

	@ApiOperation(value = "Gets all order items of an order")
	@RequestMapping(path = "/api/order/{id}", method = RequestMethod.GET)
	public List<orderitemPojo> get(@PathVariable int id) throws ApiException {
		return odt.get(id);
	}
	

	

	
}