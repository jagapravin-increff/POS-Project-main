package com.increff.employee.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.increff.employee.dto.productDto;
import com.increff.employee.model.productData;
import com.increff.employee.model.productForm;

import com.increff.employee.service.ApiException;
import com.increff.employee.service.brandService;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api
@RestController
public class productApiController {

	@Autowired
	private productDto pdt;


	
	private Logger logger = Logger.getLogger(productApiController.class);

	@ApiOperation(value = "Adds an product")
	@RequestMapping(path = "/api/product/supervisor", method = RequestMethod.POST)
	public void add(@RequestBody productForm form) throws ApiException {
		pdt.add(form);
	}

	

	@ApiOperation(value = "Gets an brand by ID")
	@RequestMapping(path = "/api/product/{id}", method = RequestMethod.GET)
	public productData get(@PathVariable int id) throws ApiException {
		return pdt.get(id);
	}

	@ApiOperation(value = "Gets list of all brands")
	@RequestMapping(path = "/api/product", method = RequestMethod.GET)
	public List<productData> getAll() throws Exception {
		 return pdt.getAll();
	}

	@ApiOperation(value = "Updates an brand")
	@RequestMapping(path = "/api/product/supervisor/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable int id, @RequestBody productForm f) throws ApiException {
		pdt.update(id,f);
	}

	
}
