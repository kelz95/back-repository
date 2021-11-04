package com.pineapplesupermarket.tiendaapi.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.pineapplesupermarket.tiendaapi.exception.DuplicateEntryException;
import com.pineapplesupermarket.tiendaapi.exception.EntityNotFoundException;
import com.pineapplesupermarket.tiendaapi.models.Product;

public interface IProductoService {

	public Product save(Product producto) throws DuplicateEntryException;
	
	public Page<Product> findAll(Pageable pageable);
	
	public Product update(long id, Product productoUpdate) throws DuplicateEntryException, EntityNotFoundException;

	public Product findOne(long id) throws EntityNotFoundException;
	
	public void delete(long id) throws EntityNotFoundException;
}
