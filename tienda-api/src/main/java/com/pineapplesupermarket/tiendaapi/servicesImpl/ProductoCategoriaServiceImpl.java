package com.pineapplesupermarket.tiendaapi.servicesImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pineapplesupermarket.tiendaapi.exception.DuplicateEntryException;
import com.pineapplesupermarket.tiendaapi.exception.EntityNotFoundException;
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
	
	private static final String ENTITY_NAME = "Product Category";

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

	@Override
	public ProductCategory findOne(long id) throws EntityNotFoundException{
		 Optional<ProductCategory> productCategory = this.productCategoryRepository.findById(id);
		 if(productCategory.isPresent()) {
			 return productCategory.get();
		 }else {
			 throw new EntityNotFoundException(ENTITY_NAME, "id", String.valueOf(id));
		 }
	}

	@Override
	public ProductCategory create(ProductCategory productoCategoria) throws DuplicateEntryException {
		Optional<ProductCategory> productoCategoryExistente = this.productCategoryRepository
				.findByCode(productoCategoria.getCode());
		if(productoCategoryExistente.isPresent()) {
			throw new DuplicateEntryException(ENTITY_NAME, "code", productoCategoria.getCode());
		}
		
		return this.productCategoryRepository.save(productoCategoria);
	}

	@Override
	public ProductCategory update(ProductCategory productoCategoriaNuevo, long id)
			throws EntityNotFoundException, DuplicateEntryException {	
		ProductCategory productoCategoryOld = this.productCategoryRepository.findById(id).orElse(null);
		String codeNuevo = productoCategoriaNuevo.getCode();
		if(productoCategoryOld != null) {
			if(this.productCategoryRepository
					.findByCodeAndIdProductCategoryNot(codeNuevo, id)
					.isEmpty()) {
				productoCategoryOld.setCode(codeNuevo);	
				productoCategoryOld.setDescription(productoCategoriaNuevo.getDescription());

			}else {
				throw new DuplicateEntryException(ENTITY_NAME, "code", codeNuevo);
			}

		}else {
			throw new EntityNotFoundException(ENTITY_NAME, "id", String.valueOf(id));
		}
		
		return this.productCategoryRepository.save(productoCategoryOld);
	}

	@Override
	public void delete(long id) throws EntityNotFoundException {
		if(this.productCategoryRepository.findById(id).isEmpty()) {
			throw new EntityNotFoundException(ENTITY_NAME, "id", String.valueOf(id));
		}
		this.productCategoryRepository.deleteById(id);
	}

}
