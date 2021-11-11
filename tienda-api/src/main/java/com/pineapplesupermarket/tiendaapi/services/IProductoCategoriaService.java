package com.pineapplesupermarket.tiendaapi.services;

import java.util.List;

import com.pineapplesupermarket.tiendaapi.exception.DuplicateEntryException;
import com.pineapplesupermarket.tiendaapi.exception.EntityNotFoundException;
import com.pineapplesupermarket.tiendaapi.models.ProductCategory;
/**
 *Servicio de las categorías del producto
 *@author Raquel de la Rosa 
 *@version 1.0
 */
public interface IProductoCategoriaService {

	public List<ProductCategory> listAll();
	
	public ProductCategory findOne(long id) throws EntityNotFoundException;
	
	public ProductCategory create(ProductCategory productoCategoria) throws DuplicateEntryException;
	
	public ProductCategory update(ProductCategory productoCategoriaNuevo, long id) throws EntityNotFoundException, DuplicateEntryException;
	
	public void delete(long id) throws EntityNotFoundException;
}
