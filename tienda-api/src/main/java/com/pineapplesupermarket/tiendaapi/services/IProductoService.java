package com.pineapplesupermarket.tiendaapi.services;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import com.pineapplesupermarket.tiendaapi.dto.FilterProductoDTO;
import com.pineapplesupermarket.tiendaapi.exception.DuplicateEntryException;
import com.pineapplesupermarket.tiendaapi.exception.EntityNotFoundException;
import com.pineapplesupermarket.tiendaapi.exception.FailUploadedException;
import com.pineapplesupermarket.tiendaapi.models.Product;
/**
 *Servicio del producto
 *@author Raquel de la Rosa 
 *@version 1.0
 */
public interface IProductoService {

	public Product create(Product producto, MultipartFile picture) throws DuplicateEntryException, EntityNotFoundException, FailUploadedException;
	
	public Page<Product> getProductos(FilterProductoDTO filters);
	
	public Product update(long id, Product productoUpdate) throws DuplicateEntryException, EntityNotFoundException;

	public Product findOne(long id) throws EntityNotFoundException;
		
	public void delete(long id) throws EntityNotFoundException;
	
	public void upload(long id, MultipartFile picture) throws FailUploadedException, EntityNotFoundException;
	
}
