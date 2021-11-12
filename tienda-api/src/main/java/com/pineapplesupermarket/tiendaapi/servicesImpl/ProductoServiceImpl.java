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
/**
 *Implementación del servicio de los productos
 *@author Raquel de la Rosa 
 *@version 1.0
 */
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
	
	/** Método para crear productos
	 *@param  Product
	 *@param MultipartFile
	 *@return Product
	 *@exception EntityNotFoundException, DuplicateEntryException
	 */
	@Override
	@Transactional
	public Product create(Product producto, MultipartFile picture) throws DuplicateEntryException, EntityNotFoundException, FailUploadedException { 
		ProductCategory categoria = this.productCategoryRepository
				.findByCode(producto.getProductCategory().getCode()).orElse(null);
		if(categoria != null) {
			Optional<Product> productoExistenteByCode = this.productRepository.findByCode(producto.getCode());
			Optional<Product> productoExistenteByNameAndCategory = this.productRepository.findByNameAndProductCategory(producto.getName(), categoria);
			if(productoExistenteByCode.isEmpty() && productoExistenteByNameAndCategory.isEmpty()) {
					String urlPicture = (!picture.isEmpty()) ? this.cloudinaryService.upload(picture) : null;
					producto.setCode(producto.getCode());
					producto.setProductCategory(categoria);
					producto.setCreationDate(new Date());
					producto.setPicture(urlPicture);
			} else {
				StringBuilder duplicateParameters = new StringBuilder();
				duplicateParameters.append(productoExistenteByCode.isPresent() ? "code" : "name, category");
				throw new DuplicateEntryException(ENTITY_NAME, duplicateParameters.toString(), 
						(productoExistenteByCode.isPresent() ? producto.getCode() : 
							producto.getName().concat(", ").concat(producto.getProductCategory().getCode())));
			}
		}else {
			throw new EntityNotFoundException(ENTITY_NAME + " Category", "code", producto.getProductCategory().getCode());
		}
		return productRepository.save(producto);
	}

	/**Método para listar productos
	 *@param FilterProductoDTO
	 *@return Page<Product>
	 */
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

	/**Método para actualizar productos
	 *@param id
	 *@param productoEditado
	 *@return Product
	 *@exception EntityNotFoundException, DuplicateEntryException
	 */
	@Override
	@Transactional()
	public Product update(long id, Product productoEditado) throws DuplicateEntryException, EntityNotFoundException {
		Product producto = this.productRepository.findById(id).orElse(null);
		ProductCategory categoria = this.productCategoryRepository
				.findByCode(productoEditado.getProductCategory().getCode()).orElse(null);

		if(producto != null && categoria != null) {
			Optional<Product> productoExistenteByCode = 
					this.productRepository.findByCodeAndIdProductNot(
							productoEditado.getCode(), id);
			if(productoExistenteByCode.isEmpty()) {
				producto.setCode(productoEditado.getCode());
			} else {
				throw new DuplicateEntryException(ENTITY_NAME, "code", 
						productoEditado.getCode());
			}
			
			Optional<Product> productoExistenteByNameAndCategory = 
					this.productRepository.findByNameAndProductCategoryAndIdProductNot(
							productoEditado.getName(), categoria, id);
			if(productoExistenteByNameAndCategory.isEmpty()) {
				producto.setName(productoEditado.getName());
				producto.setProductCategory(categoria);
			} else {
				throw new DuplicateEntryException(ENTITY_NAME, "name, category", 
							productoEditado.getName().concat(", ")
							.concat(productoEditado.getProductCategory().getCode()));
			}

			producto.setCode(productoEditado.getCode());
			producto.setDescription(productoEditado.getDescription());
			producto.setQuantity(productoEditado.getQuantity());
			producto.setUnitPrice(productoEditado.getUnitPrice());
			producto.setModificationDate(new Date());
						
			return productRepository.save(producto);
			
		}else {
			String param = (producto == null) ? "id" : "code";
			String param2 = (producto == null) ? String.valueOf(id) : 
				productoEditado.getProductCategory().getCode();
			throw new EntityNotFoundException(ENTITY_NAME.concat(" Category"), param, param2);
		}			
	}

	/**Método para encontrar un producto
	 *@param id
	 *@return Product
	 *@exception EntityNotFoundException
	 */
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
	
	/**Método para eliminar un producto
	 *@param id
	 *@exception EntityNotFoundException
	 */
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
	/**Método para subir una imagen
	 *@param id
	 *@param  MultipartFile
	 *@exception FailUploadedException, EntityNotFoundException 
	 */
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
