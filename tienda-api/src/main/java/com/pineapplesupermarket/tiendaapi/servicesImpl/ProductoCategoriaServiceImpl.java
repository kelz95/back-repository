package com.pineapplesupermarket.tiendaapi.servicesImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pineapplesupermarket.tiendaapi.models.ProductCategory;
import com.pineapplesupermarket.tiendaapi.repositories.ProductCategoryRepository;
import com.pineapplesupermarket.tiendaapi.services.IProductoCategoriaService;
/**
 *Implementación del servicio de categoría de productos
 *@author Raquel de la Rosa 
 *@version 1.0
 */
@Service
public class ProductoCategoriaServiceImpl implements IProductoCategoriaService{

	@Autowired
	ProductCategoryRepository productCategoryRepository;
	
	/**
	 *Método para encontrar las categorías de los productos
	 *@return  List<ProductCategory>
	 */
	@Override
	public List<ProductCategory> listAll() {
		return productCategoryRepository.findAll();
	}

}
