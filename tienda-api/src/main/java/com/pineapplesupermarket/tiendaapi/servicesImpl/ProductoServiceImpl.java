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
import org.springframework.web.multipart.MultipartFile;

import com.pineapplesupermarket.tiendaapi.dto.FilterProductoDTO;
import com.pineapplesupermarket.tiendaapi.exception.DuplicateEntryException;
import com.pineapplesupermarket.tiendaapi.exception.EntityNotFoundException;
import com.pineapplesupermarket.tiendaapi.exception.FailUploadedException;
import com.pineapplesupermarket.tiendaapi.models.Product;
import com.pineapplesupermarket.tiendaapi.models.ProductCategory;
import com.pineapplesupermarket.tiendaapi.repositories.CustomProductosRepository;
import com.pineapplesupermarket.tiendaapi.repositories.ProductCategoryRepository;
import com.pineapplesupermarket.tiendaapi.repositories.ProductRepository;
import com.pineapplesupermarket.tiendaapi.services.ICloudinaryService;
import com.pineapplesupermarket.tiendaapi.services.IProductoService;

@Service
public class ProductoServiceImpl implements IProductoService{

	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private ProductCategoryRepository productCategoryRepository;
	
	@Autowired
	private CustomProductosRepository customProductosRepository;
	
	@Autowired
	private ICloudinaryService cloudinaryService;
	
	private static final String ENTITY_NAME = "Product";
	
	@Override
	@Transactional
	public Product create(Product producto, MultipartFile picture) throws DuplicateEntryException, EntityNotFoundException, FailUploadedException { 
		ProductCategory categoria = this.productCategoryRepository
				.findByCode(producto.getProductCategory().getCode()).orElse(null);
		Optional<Product> productoExistenteByCode = this.productRepository.findByCode(producto.getCode());
		Optional<Product> productoExistenteByNameAndCategory = this.productRepository.findByNameAndProductCategory(producto.getName(), categoria);

		if(productoExistenteByCode.isEmpty() && productoExistenteByNameAndCategory.isEmpty()) {
			if(categoria != null) {
				String urlPicture = (picture != null) ? this.cloudinaryService.upload(picture) : null;

				producto.setProductCategory(categoria);
				producto.setCreationDate(new Date());
				producto.setPicture(urlPicture);
			}else {
				throw new EntityNotFoundException(ENTITY_NAME + " Category", "code", producto.getProductCategory().getCode());
			}
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
	public Product update(long id, Product productoEditado) throws DuplicateEntryException, EntityNotFoundException {
		Optional<Product> productoOptional = this.productRepository.findById(id);
		if(productoOptional.isPresent()) {
			Product productoSinEditar = productoOptional.get();
			if(!productoSinEditar.getCode().equals(productoEditado.getCode())) {
				Optional<Product> productoExistenteByCode = this.productRepository.findByCode(productoEditado.getCode());
				if(productoExistenteByCode.isEmpty()) {
					productoSinEditar.setCode(productoEditado.getCode());
				} else {
					throw new DuplicateEntryException(ENTITY_NAME, "code", productoEditado.getCode());
				}
			}
			
			if(!productoSinEditar.getName().equals(productoEditado.getName()) || 
					!productoSinEditar.getProductCategory().getCode().equals(productoEditado.getProductCategory().getCode()) ) {
				ProductCategory categoria = this.productCategoryRepository
						.findByCode(productoEditado.getProductCategory().getCode()).orElse(null);
				Optional<Product> productoExistenteByNameAndCategory = 
						this.productRepository.findByNameAndProductCategory(productoEditado.getName(), categoria);
				if(productoExistenteByNameAndCategory.isEmpty()) {
					productoSinEditar.setName(productoEditado.getName());
					productoSinEditar.setProductCategory(categoria);
				} else {
					throw new DuplicateEntryException(ENTITY_NAME, "name, category", 
								productoEditado.getName().concat(", ").concat(productoEditado.getProductCategory().getCode()));
				}
			}

			productoSinEditar.setDescription(productoEditado.getDescription());
			productoSinEditar.setQuantity(productoEditado.getQuantity());
			productoSinEditar.setUnitPrice(productoEditado.getUnitPrice());
			productoSinEditar.setModificationDate(new Date());
						
			return productRepository.save(productoSinEditar);
			
		}else {
			throw new EntityNotFoundException(ENTITY_NAME, "id", String.valueOf(id));
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

	@Override
	public void upload(long id, MultipartFile picture) throws FailUploadedException, EntityNotFoundException {
		Product product = this.productRepository.findById(id).orElse(null);
		if(product != null) {
			String urlPicture = this.cloudinaryService.upload(picture);
			product.setPicture(urlPicture);
			product.setModificationDate(new Date());
			this.productRepository.save(product);
		}else {
			throw new EntityNotFoundException(ENTITY_NAME, "id", String.valueOf(id));
		}
		
	}

}
