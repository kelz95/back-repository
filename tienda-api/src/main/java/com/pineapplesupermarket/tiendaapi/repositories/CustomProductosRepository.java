package com.pineapplesupermarket.tiendaapi.repositories;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.pineapplesupermarket.tiendaapi.models.Product;
/**
 *Repositorio del producto
 *@author Raquel de la Rosa 
 *@version 1.0
 */
@Repository
public class CustomProductosRepository {

	@Autowired
	private EntityManager entityManager;
		
	/** Metódo para buscar los productos con filtros
	 * @param name
	 * @param categoria
	 * @param fechaCreacion
	 * @param pageable
	 * @return transaccionesPage
	 */
	public Page<Product> findAll(String name, String categoria, Date fechaCreacion, Pageable pageable){
		
		StringBuilder dataQuery = new StringBuilder();
		dataQuery.append("SELECT * FROM ps_product p ");
		
		StringBuilder filtersQuery = new StringBuilder();
				
		List<String> filters = new ArrayList<>();
		
		if(name != null) {
			String filter = " p.name like \'%" + name + "%\'";
			filters.add(filter);
		}
		
		if(categoria != null) {
			filtersQuery.append("INNER JOIN ps_product_category pc on pc.id_product_category = p.id_product_category ");
			
			String filter = " pc.code = :categoria";
			filters.add(filter);
		}
		
		if(fechaCreacion != null) {
			String filter = " p.creation_date >= :fechaCreacion";
			filters.add(filter);
			
			String filter2 = " p.creation_date <= :fechaFin";
			filters.add(filter2);
		}
		
		if(!filters.isEmpty()) {
			filtersQuery.append("WHERE");
			filtersQuery.append(filters.stream().collect(Collectors.joining(" and "))).append(" ");
		}
		
		StringBuilder countQuery = new StringBuilder();
		countQuery.append("SELECT COUNT(*) FROM ps_product p ");
		countQuery.append(filtersQuery);
		
		StringBuilder query = new StringBuilder(dataQuery);
		query.append(filtersQuery);
		
		//paginacion
		Query queryNative = this.entityManager.createNativeQuery(query.toString(), Product.class);
		queryNative.setFirstResult((pageable.getPageNumber()) * pageable.getPageSize());
		queryNative.setMaxResults(pageable.getPageSize());
		
		Query countQueryNative = entityManager.createNativeQuery(countQuery.toString());
		
		//setear parametros de query
		
		if(categoria != null) {
			queryNative.setParameter("categoria", categoria);
			countQueryNative.setParameter("categoria", categoria);
		}
		
		if(fechaCreacion != null) {
			Calendar cal = Calendar.getInstance();
			Date fechaFin = fechaCreacion;
			cal.setTime(fechaCreacion);
			cal.set(Calendar.HOUR_OF_DAY, 0);
			cal.set(Calendar.MINUTE, 0);
			cal.set(Calendar.SECOND, 0);
			fechaCreacion = cal.getTime();
			cal.setTime(fechaFin);
			cal.set(Calendar.HOUR_OF_DAY, 23);
			cal.set(Calendar.MINUTE, 59);
			cal.set(Calendar.SECOND, 59);
			fechaFin = cal.getTime();
			
			queryNative.setParameter("fechaCreacion", fechaCreacion);
			countQueryNative.setParameter("fechaCreacion", fechaCreacion);
			
			queryNative.setParameter("fechaFin", fechaFin);
			countQueryNative.setParameter("fechaFin", fechaFin);
			
		}
		
		@SuppressWarnings("unchecked")
		List<Product> productos = queryNative.getResultList();
		BigInteger count = (BigInteger) countQueryNative.getSingleResult();
		
		//para convertir a page
		Page<Product> transaccionesPage = new PageImpl<Product>(productos, pageable, count.longValue());
		
		return transaccionesPage;
	}
}
