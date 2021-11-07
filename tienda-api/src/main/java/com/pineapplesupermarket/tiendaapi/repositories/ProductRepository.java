package com.pineapplesupermarket.tiendaapi.repositories;

import java.util.Optional;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.pineapplesupermarket.tiendaapi.models.Product;
import com.pineapplesupermarket.tiendaapi.models.ProductCategory;

public interface ProductRepository extends PagingAndSortingRepository<Product, Long>{

	Optional<Product> findByNameAndProductCategory(String name, ProductCategory productCategory);

	Optional<Product> findByCode(String code);

}
