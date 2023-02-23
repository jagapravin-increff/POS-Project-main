package com.increff.employee.service;

import java.util.List;
import java.lang.reflect.Field; 
import javax.transaction.Transactional;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.increff.employee.dao.inventoryDao;
import com.increff.employee.dao.productDao;
import com.increff.employee.pojo.inventoryPojo;
import com.increff.employee.pojo.productPojo;

@Service
public class InventoryService {

	@Autowired
	private inventoryDao dao;

	@Autowired
	private productDao pdao;
	private Logger logger = Logger.getLogger(inventoryDao.class);

	@Transactional(rollbackOn = ApiException.class)
	public void add(inventoryPojo p) throws ApiException {
		
		productPojo pr=ProductCheck(p.getBarcode());
		inventoryPojo i=InvCheck(pr.getProduct_id());


		if(i==null)
		{   QuantityCheck(p);
			p.setId(pr.getProduct_id());
			
			dao.insert(p);
		}

		else{
			if(i.getQuantity()<Math.abs(p.getQuantity()) && p.getQuantity()<0)
			{
				throw new ApiException("Quantity cannot be reduced below zero");
			}

			else if(i.getQuantity()==Math.abs(p.getQuantity()) && p.getQuantity()<0)
			{
                dao.delete(i.getId());
				return;
			}
			i.setQuantity(i.getQuantity()+p.getQuantity());
			logger.info(i.getQuantity());
			dao.update(i);
		}
		
	}


	@Transactional(rollbackOn = ApiException.class)
	public inventoryPojo get(int id) throws ApiException {
	    inventoryPojo i= getCheck(id);
        productPojo o=pdao.select(id);
        i.setBarcode(o.getBarcode());
		i.setName(o.getName());
		return i;
	}

	@Transactional
	public List<inventoryPojo> getAll() throws Exception {
	    List<inventoryPojo> i=dao.selectAll();
		for(inventoryPojo d:i){
          productPojo p=pdao.select(d.getId());
		  d.setName(p.getName());
		  d.setBarcode(p.getBarcode());
		}
		return i;
	}
	
	public List<productPojo> getid() throws Exception {
		return dao.selectid();
	}

	@Transactional(rollbackOn  = ApiException.class)
	public void update(int id, inventoryPojo p) throws ApiException {
		inventoryPojo i=getCheck(id);
		i.setQuantity(p.getQuantity());
		logger.info(i.getId()+""+i.getBarcode()+i.getName()+i.getQuantity());
		dao.update(i);
	}

	@Transactional
	public inventoryPojo getCheck(int id) throws ApiException {
		inventoryPojo p = dao.select(id);
		if (p == null) {
			throw new ApiException("inventory with given ID does not exit, id: " + id);
		}
		productPojo p1=pdao.select(p.getId());
        p.setBarcode(p1.getBarcode());
		p.setName(p1.getName());
		return p;
	}
	@Transactional
	public void QuantityCheck(inventoryPojo i) throws ApiException {
		if (i.getQuantity()<=0){
			throw new ApiException("Quantity should not be zero or negative");
		}
	}

	@Transactional
	public productPojo ProductCheck(String barcode) throws ApiException {
		productPojo pr=dao.findBarcode(barcode);
		  if (pr==null) {
				throw new ApiException("Product with given Product Barcode does not exist, Barcode: "+ barcode);
			}
			return pr;
		}	
	@Transactional
	public inventoryPojo InvCheck(int id) throws ApiException {
		inventoryPojo ip=dao.select(id);
	    return ip;
	}
}
