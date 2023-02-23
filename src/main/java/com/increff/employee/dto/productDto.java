// package com.increff.employee.dto;
// import java.util.ArrayList;
// import java.util.List;


// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import org.springframework.web.bind.annotation.PathVariable;

// import com.increff.employee.model.inventoryForm;
// import com.increff.employee.model.productData;
// import com.increff.employee.model.productForm;
// import com.increff.employee.pojo.brandPojo;
// import com.increff.employee.pojo.inventoryPojo;
// import com.increff.employee.pojo.productPojo;
// import com.increff.employee.service.ApiException;
// import com.increff.employee.service.InventoryService;
// import com.increff.employee.service.productService;

// @Service
// public class productDto
// {   
// 	@Autowired
// 	private productService service;
	

	
// 	public void add(productForm form) throws ApiException
// 	{
// 		int id=form.getId();
// 		productPojo p = convert(form);
// 		service.add(p,id);
// 	}

// 	public void delete( int product_id) {
// 		service.delete(product_id);
// 	}
	
// 	public productData get(int id) throws ApiException
// 	{
// 		productPojo p = service.get(id);
// 		return convert(p);
// 	}
	
// 	public List<productPojo> getAll() throws Exception {
// 		return service.getAll();
// 	}
	
// 	public List<productData> getAll(String brand) throws Exception {
// 		List<productPojo> list = service.get(brand);
// 		List<productData> list2 = new ArrayList<productData>();
// 		for (productPojo p : list) {
			
// 			list2.add(convert(p));
// 		}
// 		return list2;
// 	}
	
// 	public void update(int id,productForm f) throws ApiException
// 	{
// 		productPojo p = convert(f);
// 		service.update(id, p);
// 	}

// 	private static productData convert(productPojo p) {
// 		productData d = new productData();
// 		d.setBrand_category(p.getBrand_category());
// 		d.setName(p.getName());
// 		d.setBarcode(p.getBarcode());
// 		d.setMrp(p.getMrp());
// 		d.setProduct_id(p.getProduct_id());
// 		return d;
// 	}

// 	private productPojo convert(productForm f) throws ApiException {
// 		productPojo p=new productPojo();
// 		p.setName(f.getName());
// 		p.setBarcode(f.getBarcode());
// 		p.setMrp(f.getMrp());
// 		p.setBrand_category((f.getBrand_category()));
// 		return p;
// 	}
	

// }
