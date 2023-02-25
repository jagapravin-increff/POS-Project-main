package com.increff.employee.controller;


import java.util.List;


import com.increff.employee.dto.reportDto;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.increff.employee.model.daySalesReportForm;
import com.increff.employee.model.reportData;
import com.increff.employee.model.reportForm;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api
@RestController
public class reportApiController {
	private Logger logger = Logger.getLogger(reportApiController.class);

	@Autowired
	private reportDto rdt;



	@ApiOperation(value = "Gets the Sales report")
	@RequestMapping(path = "/api/reports/daySalesReport", method = RequestMethod.POST)
	public List<reportData> get(@RequestBody reportForm r) throws Exception {
		return rdt.get(r);
	}
	
	@ApiOperation(value = "Gets the Sales report")
	@RequestMapping(path = "/api/reports/salesReport", method = RequestMethod.POST)
	public List<daySalesReportForm> getsales(@RequestBody reportForm r) throws Exception {
		 return rdt.getsales(r);
	}
	
	@ApiOperation(value = "Gets the Sales report")
	@RequestMapping(path = "/api/reports/inventoryReport", method = RequestMethod.GET)
	public List<daySalesReportForm> getinventory() throws Exception {
		 return rdt.getinventory();
	}

}