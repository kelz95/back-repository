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
		ProductCategory categoria = this.productCategoryRepository
				.findByCode(producto.getProductCategory().getCode()).orElse(new ProductCategory());
		Optional<Product> productoExistente = this.productRepository.findByNameAndProductCategory(producto.getName(), categoria);
		if(productoExistente.isEmpty()) {
			producto.setCreationDate(new Date());
		} else {
			throw new DuplicateEntryException("Product", "name, category", 
					producto.getName().concat(", ").concat(producto.getProductCategory().getCode()));
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
		ProductCategory categoria = this.productCategoryRepository
				.findByCode(productoUpdate.getProductCategory().getCode()).orElse(new ProductCategory());
		Optional<Product> productoExistente = this.productRepository.findByNameAndProductCategory(productoUpdate.getName(), categoria);
		if(productoExistente.isEmpty()) {
			Optional<Product> productoOptional = this.productRepository.findById(id);

			if(productoOptional.isPresent()) {
				Product productoSaved = productoOptional.get();
				
				productoSaved.setName(productoUpdate.getName());
				productoSaved.setDescription(productoUpdate.getDescription());
				productoSaved.setProductCategory(categoria);
				productoSaved.setPicture(productoUpdate.getPicture());
				productoSaved.setQuantity(productoUpdate.getQuantity());
				productoSaved.setUnitPrice(productoUpdate.getUnitPrice());
				productoSaved.setModificationDate(new Date());
				
				return productRepository.save(productoSaved);
			}else {
				throw new EntityNotFoundException("Product", "id", String.valueOf(id));
			}
			
		}else{
			throw new DuplicateEntryException("Product", "name, category", 
					productoUpdate.getName().concat(", ").concat(productoUpdate.getProductCategory().getCode()));
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
