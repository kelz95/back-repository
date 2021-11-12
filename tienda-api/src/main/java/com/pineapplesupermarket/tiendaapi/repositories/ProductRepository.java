package com.pineapplesupermarket.tiendaapi.repositories;

import java.util.Optional;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.pineapplesupermarket.tiendaapi.models.Product;
import com.pineapplesupermarket.tiendaapi.models.ProductCategory;
/**
 *Repositorio del producto
 *@author Raquel de la Rosa 
 *@version 1.0
 */
public interface ProductRepository extends PagingAndSortingRepository<Product, Long>{

	Optional<Product> findByNameAndProductCategory(String name, ProductCategory productCategory);

	Optional<Product> findByNameAndProductCategoryAndIdProductNot(
			String name, ProductCategory productCategory, long id);
	
	Optional<Product> findByCode(String code);
	
	Optional<Product> findByCodeAndIdProductNot(String code, long id);	

}
