package com.increff.employee.dto;
import java.util.ArrayList;
import java.util.List;
import com.increff.employee.model.productData;
import com.increff.employee.model.productForm;
import com.increff.employee.pojo.productPojo;
import com.increff.employee.service.ApiException;
import com.increff.employee.service.brandService;
import com.increff.employee.service.productService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;

@Service
public class productDto {

    @Autowired
    private productService service;
    @Autowired
    private brandService bin;

    public void add( productForm form) throws ApiException {
        productPojo p = convert(form);
        service.add(p);
    }

    public productData get( int id) throws ApiException {
        productPojo p = service.get(id);
        return convert(p);
    }

    public List<productData> getAll() throws Exception {
        List<productPojo> list=service.getAll();
        List<productData> list2 = new ArrayList<productData>();
        for (productPojo p : list) {
            list2.add(convert(p));
        }
        return list2;
    }

    public void update( int id,  productForm f) throws ApiException {
        productPojo p = convert(f);
        service.update(id, p);
    }


    private static productData convert(productPojo p) {
        productData d = new productData();
        d.setBrand_Category_id(p.getBrand_Category_id());
        d.setName(p.getName());
        d.setBarcode(p.getBarcode());
        d.setMrp(p.getMrp());
        d.setProduct_id(p.getProduct_id());
        return d;
    }

    private productPojo convert(productForm f) throws ApiException {
        productPojo p=new productPojo();
        p.setName(f.getName());
        p.setBarcode(f.getBarcode());
        p.setMrp(f.getMrp());
        p.setBrand_Category_id(bin.insertcheck(f.getBrand(), f.getCategory()).getId());

        return p;
    }

}

