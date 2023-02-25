package com.increff.employee.dto;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.increff.employee.controller.reportApiController;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.increff.employee.model.daySalesReportForm;
import com.increff.employee.model.reportData;
import com.increff.employee.model.reportForm;
import com.increff.employee.pojo.daySalesReportPojo;
import com.increff.employee.pojo.inventoryPojo;

import com.increff.employee.pojo.orderitemPojo;
import com.increff.employee.service.reportService;
import com.increff.employee.util.DataConversionUtil;


@Service
public class reportDto {

    private Logger logger = Logger.getLogger(reportApiController.class);
    @Autowired
    private reportService service;

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");


    public List<reportData> get( reportForm r) throws Exception {
        List<reportData> p=new ArrayList<>();
        List<daySalesReportPojo> d= service.get(r);
        for (daySalesReportPojo s:d) {
            p.add(DataConversionUtil.convert(s));
        }
        return p;
    }


    public List<daySalesReportForm> getsales( reportForm r) throws Exception {
        logger.info(r.getFrom());
        Map<String,orderitemPojo> o=service.getorder(r);
        Map<Integer,List<Object>> m=service.getsales(r,o);
        List<daySalesReportForm> report=new ArrayList<>();
        for (int b:m.keySet()) {
            report.add(DataConversionUtil.convert2(m.get(b)));
        }
        return report;
    }


    public List<daySalesReportForm> getinventory() throws Exception {
        Map<String,inventoryPojo> i=service.getinventory();
        Map<Integer,List<Object>> m=service.getinventoryReport(i);
        List<daySalesReportForm> report=new ArrayList<>();
        for (int b:m.keySet()) {
            report.add(DataConversionUtil.convert1(m.get(b)));
        }
        return report;
    }


}