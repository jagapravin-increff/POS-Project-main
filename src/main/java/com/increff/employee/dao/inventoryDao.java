package com.increff.employee.dao;

import java.util.List;

import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;

import com.increff.employee.pojo.inventoryPojo;
import com.increff.employee.pojo.productPojo;
import com.increff.employee.service.ApiException;

	@Repository
	public class inventoryDao extends AbstractDao {

		private Logger logger = Logger.getLogger(inventoryDao.class);

		private static String update_inv = "update inventoryPojo pc set pc.quantity=:quantity where pc.barcode=:barcode";
		private static String get_inv = "select pc from inventoryPojo pc where pc.barcode=:barcode";
		private static String select_id = "select pc from inventoryPojo pc where id=:id";
		private static String select_all = "select pc from inventoryPojo pc";
        private static String update="update inventoryPojo pc set pc.quantity=:quantity where pc.id=:id";
		private static String delete="delete inventoryPojo pc where pc.id=:id";
		private static String find_barcode="select p from productPojo p where p.barcode=:barcode";
		private static String select_all_id="select pc from productPojo pc where pc.product_id not in (select i.id from inventoryPojo i)";
		@Transactional
		public void insert(inventoryPojo p) throws ApiException {
				em().persist(p);	
		}


		public inventoryPojo select(int id) {
			TypedQuery<inventoryPojo> query = getQuery(select_id, inventoryPojo.class);
			query.setParameter("id", id);
			return getSingle(query);
		}



		public List<inventoryPojo> selectAll() throws ApiException{
            TypedQuery<inventoryPojo> query = getQuery(select_all, inventoryPojo.class);
			List<inventoryPojo> p= query.getResultList();
			return p;
		}
		
		public List<productPojo> selectid() throws ApiException{
		   List<productPojo> p= em().createQuery(select_all_id).getResultList();
			return p;
		}
		
		public productPojo findBarcode(String barcode) throws ApiException{
			TypedQuery<productPojo> query = getQuery(find_barcode, productPojo.class);
			query.setParameter("barcode", barcode);
			return getSingle(query);
			   
		}


		public int upd(int quantity,String barcode) {
			Query query=getQuery(update_inv);
			query.setParameter("quantity",quantity);
			query.setParameter("barcode", barcode);
			query.executeUpdate();
			return 1;
		}
		
		public inventoryPojo getbar(String barcode) {
			 TypedQuery<inventoryPojo> query=getQuery(get_inv,inventoryPojo.class);
			query.setParameter("barcode", barcode);
			return query.getSingleResult();
		}
		
		public void update(inventoryPojo p) throws ApiException{
		}

		public void delete(int id)
		{
			Query query=getQuery(delete);
			query.setParameter("id", id);
		}


	}


