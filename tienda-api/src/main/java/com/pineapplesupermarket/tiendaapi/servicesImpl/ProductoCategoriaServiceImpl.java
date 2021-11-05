package com.pineapplesupermarket.tiendaapi.servicesImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pineapplesupermarket.tiendaapi.models.ProductCategory;
import com.pineapplesupermarket.tiendaapi.repositories.ProductCategoryRepository;
import com.pineapplesupermarket.tiendaapi.services.IProductoCategoriaService;

@Service
public class ProductoCategoriaServiceImpl implements IProductoCategoriaService{

	@Autowired
	ProductCategoryRepository productCategoryRepository;
	
	@Override
	public List<ProductCategory> listAll() {
		return productCategoryRepository.findAll();
	}

}
