package com.increff.employee.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

public abstract class AbstractDao {
	
	@PersistenceContext
	private EntityManager em;

	protected <T> T getSingle(TypedQuery<T> query) {
		return query.getResultList().stream().findFirst().orElse(null);
	}
	
	protected <T> TypedQuery<T> getQuery(String jpql, Class<T> clazz) {
		return em.createQuery(jpql, clazz);
	}
	
	protected  Query getQuery(String jpql) {
		return em.createQuery(jpql);
	}
	
	
	protected EntityManager em() {
		return em;
	}

}
