package com.pineapplesupermarket.tiendaapi.servicesImpl;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pineapplesupermarket.tiendaapi.exception.DuplicateEntryException;
import com.pineapplesupermarket.tiendaapi.exception.EntityNotFoundException;
import com.pineapplesupermarket.tiendaapi.models.Product;
import com.pineapplesupermarket.tiendaapi.models.ProductCategory;
import com.pineapplesupermarket.tiendaapi.repositories.ProductCategoryRepository;
import com.pineapplesupermarket.tiendaapi.repositories.ProductRepository;
import com.pineapplesupermarket.tiendaapi.services.IProductoService;

@Service
public class ProductoServiceImpl implements IProductoService{

	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private ProductCategoryRepository productCategoryRepository;
	
	@Override
	@Transactional
	public Product save(Product producto) throws DuplicateEntryException { 
		Optional<Product> productoExistente = this.productRepository.findByName(producto.getName());
		if(productoExistente.isEmpty()) {
			producto.setCreationDate(new Date());
		} else {
			throw new DuplicateEntryException("Product", "name", producto.getName());
		}
		
		return productRepository.save(producto);
	}

	@Override
	@Transactional(readOnly=true)
	public Page<Product> findAll(Pageable pageable) {
		return productRepository.findAll(pageable);
	}

	@Override
	public Product update(long id, Product productoUpdate) throws DuplicateEntryException, EntityNotFoundException {
		Optional<Product> productoNameExistente = this.productRepository.findByName(productoUpdate.getName());
		if(productoNameExistente.isEmpty()) {
			Optional<Product> productoOptional = this.productRepository.findById(id);
			Optional<ProductCategory> categoriaOptional = this.productCategoryRepository
					.findByCode(productoUpdate.getProductCategory().getCode());
			if(categoriaOptional.isPresent()) {
				if(productoOptional.isPresent()) {
					Product productoSaved = productoOptional.get();
					ProductCategory productCategory = categoriaOptional.get();
					
					productoSaved.setName(productoUpdate.getName());
					productoSaved.setDescription(productoUpdate.getDescription());
					productoSaved.setProductCategory(productCategory);
					productoSaved.setPicture(productoUpdate.getPicture());
					productoSaved.setQuantity(productoUpdate.getQuantity());
					productoSaved.setUnitPrice(productoUpdate.getUnitPrice());
					productoSaved.setModificationDate(new Date());
					
					return productRepository.save(productoSaved);
				}else {
					throw new EntityNotFoundException("Product", "id", String.valueOf(id));
				}
			} else {
				throw new EntityNotFoundException("Product Category", "code", productoUpdate.getProductCategory().getCode());
			}
		}else{
			throw new DuplicateEntryException("Product", "name", productoUpdate.getName());
		}

	}

	@Override
	public Product findOne(long id) throws EntityNotFoundException {
		Optional<Product> productoEncontrado = this.productRepository.findById(id);
		if(productoEncontrado.isPresent()) {
			return productoEncontrado.get();
		}else {
			throw new EntityNotFoundException("Product", "id", String.valueOf(id));
		}
	}

	@Override
	public void delete(long id) throws EntityNotFoundException {
		Optional<Product> productoEncontrado = this.productRepository.findById(id);
		if(productoEncontrado.isPresent()) {
			this.productRepository.deleteById(id);
		}else {
			throw new EntityNotFoundException("Product", "id", String.valueOf(id));
		}
	}
	
}
