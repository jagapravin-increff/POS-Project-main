package com.increff.employee.dto;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.increff.employee.model.brandData;
import com.increff.employee.model.brandForm;
import com.increff.employee.pojo.brandPojo;
import com.increff.employee.service.ApiException;
import com.increff.employee.service.brandService;

@Service
public class BrandDto
{
    @Autowired
    private brandService service;

    public void add(brandForm form) throws ApiException
    {
        brandPojo p = convert(form);
        service.add(p);
    }


    public List<brandData> get(brandForm form) throws ApiException
    {
        brandPojo p = convert(form);
        List<brandPojo> list =service.getbrand(p);
        List<brandData> list2 = new ArrayList<brandData>();
        for (brandPojo b : list) {
            list2.add(convert(b));
        }
        return list2;
    }

    public brandData get(int id) throws ApiException
    { brandPojo p = service.get(id);
        return convert(p);
    }

    public List<brandData> getAll() {
        List<brandPojo> list = service.getAll();
        List<brandData> list2 = new ArrayList<brandData>();
        for (brandPojo p : list) {
            list2.add(convert(p));
        }
        return list2;
    }

    public void update(int id,brandForm f) throws ApiException
    {
        brandPojo p = convert(f);
        service.update(id, p);
    }

    private static brandData convert(brandPojo p) {
        brandData d = new brandData();
        d.setBrand(p.getBrand());
        d.setCategory(p.getCategory());
        d.setId(p.getId());
        return d;
    }

    private static brandPojo convert(brandForm f) {
        brandPojo p = new brandPojo();
        p.setBrand(f.getBrand());
        p.setCategory(f.getCategory());
        return p;
    }
}