package com.pineapplesupermarket.tiendaapi.services;

import org.springframework.data.domain.Page;

import com.pineapplesupermarket.tiendaapi.dto.FilterProductoDTO;
import com.pineapplesupermarket.tiendaapi.exception.DuplicateEntryException;
import com.pineapplesupermarket.tiendaapi.exception.EntityNotFoundException;
import com.pineapplesupermarket.tiendaapi.models.Product;

public interface IProductoService {

	public Product save(Product producto) throws DuplicateEntryException, EntityNotFoundException;
	
	public Page<Product> getProductos(FilterProductoDTO filters);
	
	public Product update(long id, Product productoUpdate) throws DuplicateEntryException, EntityNotFoundException;

	public Product findOne(long id) throws EntityNotFoundException;
		
	public void delete(long id) throws EntityNotFoundException;
	
}
