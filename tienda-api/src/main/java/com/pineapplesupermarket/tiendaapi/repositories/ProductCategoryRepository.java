package com.pineapplesupermarket.tiendaapi.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pineapplesupermarket.tiendaapi.models.ProductCategory;
/**
 *Repositorio de las categorías del producto
 *@author Raquel de la Rosa 
 *@version 1.0
 */
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long>{

	Optional<ProductCategory> findByCode(String code);
	
	Optional<ProductCategory> findByCodeAndIdProductCategoryNot(String code, long id);
}
