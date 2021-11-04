package com.pineapplesupermarket.tiendaapi.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pineapplesupermarket.tiendaapi.models.ProductCategory;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Integer>{

	Optional<ProductCategory> findByCode(String code);
}
