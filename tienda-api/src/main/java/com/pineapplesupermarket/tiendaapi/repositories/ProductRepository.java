package com.pineapplesupermarket.tiendaapi.repositories;

import java.util.Optional;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.pineapplesupermarket.tiendaapi.models.Product;

public interface ProductRepository extends PagingAndSortingRepository<Product, Long>{

	Optional<Product> findByName(String name);
}
