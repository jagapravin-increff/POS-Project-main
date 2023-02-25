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

import com.increff.employee.dto.BrandDto;
import com.increff.employee.model.brandData;
import com.increff.employee.model.brandForm;
import com.increff.employee.service.ApiException;
import com.increff.employee.service.brandService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api
@RestController
public class BrandApiController {

	@Autowired
	private BrandDto bdt;
	private Logger logger = Logger.getLogger(BrandApiController.class);

	@ApiOperation(value = "Adds an product")
	@RequestMapping(path = "/api/brand/supervisor", method = RequestMethod.POST)
	public void add(@RequestBody brandForm form) throws ApiException {

		bdt.add(form);
	}
	
	@ApiOperation(value = "Adds an product")
	@RequestMapping(path = "/api/brand", method = RequestMethod.POST)
	public List<brandData> get(@RequestBody brandForm form) throws ApiException {
		return bdt.get(form);
	}


	@ApiOperation(value = "Gets an brand by ID")
	@RequestMapping(path = "/api/brand/{id}", method = RequestMethod.GET)
	public brandData get(@PathVariable int id) throws ApiException {
		return bdt.get(id);
	}
	

	
	@ApiOperation(value = "Gets list of all brands")
	@RequestMapping(path = "/api/brand", method = RequestMethod.GET)
	public List<brandData> getAll() {
		return bdt.getAll();
	}

	@ApiOperation(value = "Updates an brand")
	@RequestMapping(path = "/api/brand/supervisor/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable int id, @RequestBody brandForm f) throws ApiException {
		bdt.update(id,f);
	}
	

}

