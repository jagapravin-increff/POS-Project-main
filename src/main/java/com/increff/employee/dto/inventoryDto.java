// package com.increff.employee.dto;

// import java.util.ArrayList;
// import java.util.List;


// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;


// import com.increff.employee.model.inventoryData;
// import com.increff.employee.model.inventoryForm;
// import com.increff.employee.model.productData;

// import com.increff.employee.pojo.inventoryPojo;
// import com.increff.employee.pojo.productPojo;
// import com.increff.employee.service.ApiException;
// import com.increff.employee.service.InventoryService;


// @Service
// public class inventoryDto
// {   
// 	@Autowired
// 	private InventoryService service;
	

	
// 	public void add(inventoryForm form) throws ApiException
// 	{
// 		inventoryPojo p = convert(form);
// 		service.add(p);
// 	}

	
// 	public inventoryData get(int id) throws ApiException
// 	{
// 		inventoryPojo p = service.get(id);
// 		return convert(p);
// 	}
	


	
// 	public List<inventoryData> getAll() throws Exception {
// 		List<inventoryPojo> list = service.getAll();
// 		List<inventoryData> list2 = new ArrayList<inventoryData>();
// 		for (inventoryPojo p : list) {
			
// 			list2.add(convert(p));
// 		}
// 		return list2;
// 	}
	
// 	public void update(int id,inventoryForm f) throws ApiException
// 	{
// 		inventoryPojo p = convert(f);
// 		service.update(id, p);
// 	}

// 	private static inventoryData convert(inventoryPojo p) {
// 		inventoryData d = new inventoryData();
// 		d.setBrand(p.getBrand());
// 		d.setItem(p.getItem());
// 		d.setQuantity(p.getQuantity());
// 		d.setId(p.getId());
// 		return d;
// 	}

// 	private static inventoryPojo convert(inventoryForm f) {
// 		inventoryPojo p = new inventoryPojo();
// 		p.setBrand(f.getBrand());
// 		p.setItem(f.getItem());
// 		p.setQuantity(f.getQuantity());
// 		return p;
// 	}
	
	


// }

	
	