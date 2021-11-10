package com.pineapplesupermarket.tiendaapi.services;

import java.util.List;

import com.pineapplesupermarket.tiendaapi.models.ProductCategory;
/**
 *Servicio de las categorías del producto
 *@author Raquel de la Rosa 
 *@version 1.0
 */
public interface IProductoCategoriaService {

	public List<ProductCategory> listAll();
}
