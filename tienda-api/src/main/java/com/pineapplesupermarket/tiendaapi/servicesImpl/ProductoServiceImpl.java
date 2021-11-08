package com.pineapplesupermarket.tiendaapi.servicesImpl;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pineapplesupermarket.tiendaapi.dto.FilterProductoDTO;
import com.pineapplesupermarket.tiendaapi.exception.DuplicateEntryException;
import com.pineapplesupermarket.tiendaapi.exception.EntityNotFoundException;
import com.pineapplesupermarket.tiendaapi.models.Product;
import com.pineapplesupermarket.tiendaapi.models.ProductCategory;
import com.pineapplesupermarket.tiendaapi.repositories.CustomProductosRepository;
import com.pineapplesupermarket.tiendaapi.repositories.ProductCategoryRepository;
import com.pineapplesupermarket.tiendaapi.repositories.ProductRepository;
import com.pineapplesupermarket.tiendaapi.services.IProductoService;

@Service
public class ProductoServiceImpl implements IProductoService{

	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private ProductCategoryRepository productCategoryRepository;
	
	@Autowired
	private CustomProductosRepository customProductosRepository;
	
	private static final String ENTITY_NAME = "Product";
	
	@Override
	@Transactional
	public Product save(Product producto) throws DuplicateEntryException { 
		ProductCategory categoria = this.productCategoryRepository
				.findByCode(producto.getProductCategory().getCode()).orElse(new ProductCategory());
		Optional<Product> productoExistenteByCode = this.productRepository.findByCode(producto.getCode());
		Optional<Product> productoExistenteByNameAndCategory = this.productRepository.findByNameAndProductCategory(producto.getName(), categoria);

		if(productoExistenteByCode.isEmpty() && productoExistenteByNameAndCategory.isEmpty()) {
			
				producto.setCreationDate(new Date());
			
		} else {
			StringBuilder duplicateParameters = new StringBuilder();
			duplicateParameters.append(productoExistenteByCode.isPresent() ? "code" : "name, category");
			throw new DuplicateEntryException(ENTITY_NAME, duplicateParameters.toString(), 
					(productoExistenteByCode.isPresent() ? producto.getCode() : 
						producto.getName().concat(", ").concat(producto.getProductCategory().getCode())));
		
		}
		
		return productRepository.save(producto);
	}

	@Override
	@Transactional(readOnly=true)
	public Page<Product> getProductos(FilterProductoDTO filters) {
		Pageable pageRequest = PageRequest.of(filters.getPage(), 
				filters.getSize(), 
				Sort.by(Direction.ASC, "idProduct"));

		Page<Product> productosPage = null;
		
		productosPage = this.customProductosRepository.findAll(filters.getName(),
				filters.getCategoria(), filters.getFechaCreacion(), pageRequest);
		return productosPage;
	}

	@Override
	@Transactional()
	public Product update(long id, Product productoUpdate) throws DuplicateEntryException, EntityNotFoundException {
		ProductCategory categoria = this.productCategoryRepository
				.findByCode(productoUpdate.getProductCategory().getCode()).orElse(new ProductCategory());
		Optional<Product> productoExistenteByCode = this.productRepository.findByCode(productoUpdate.getCode());
		Optional<Product> productoExistenteByNameAndCategory = this.productRepository.findByNameAndProductCategory(productoUpdate.getName(), categoria);

		if(productoExistenteByCode.isEmpty() && productoExistenteByNameAndCategory.isEmpty()) {
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
				throw new EntityNotFoundException(ENTITY_NAME, "id", String.valueOf(id));
			}			
		} else {
			StringBuilder duplicateParameters = new StringBuilder();
			duplicateParameters.append(productoExistenteByCode.isPresent() ? "code" : "name, category");
			throw new DuplicateEntryException(ENTITY_NAME, duplicateParameters.toString(), 
					(productoExistenteByCode.isPresent() ? productoUpdate.getCode() : 
						productoUpdate.getName().concat(", ").concat(productoUpdate.getProductCategory().getCode())));
		}
	}

	@Override
	@Transactional(readOnly=true)
	public Product findOne(long id) throws EntityNotFoundException {
		Optional<Product> productoEncontrado = this.productRepository.findById(id);
		if(productoEncontrado.isPresent()) {
			return productoEncontrado.get();
		}else {
			throw new EntityNotFoundException(ENTITY_NAME, "id", String.valueOf(id));
		}
	}
	

	@Override
	@Transactional()
	public void delete(long id) throws EntityNotFoundException {
		Optional<Product> productoEncontrado = this.productRepository.findById(id);
		if(productoEncontrado.isPresent()) {
			this.productRepository.deleteById(id);
		}else {
			throw new EntityNotFoundException(ENTITY_NAME, "id", String.valueOf(id));
		}
	}

}
