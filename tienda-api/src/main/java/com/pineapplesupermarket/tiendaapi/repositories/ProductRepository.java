package com.pineapplesupermarket.tiendaapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pineapplesupermarket.tiendaapi.models.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

}
