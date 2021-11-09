package com.pineapplesupermarket.tiendaapi.controllers;

import java.security.Principal;
import java.util.Date;

//import java.security.Principal;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pineapplesupermarket.tiendaapi.dto.FilterProductoDTO;
import com.pineapplesupermarket.tiendaapi.dto.ResponseDTO;
import com.pineapplesupermarket.tiendaapi.enums.ResponseCodeEnum;
import com.pineapplesupermarket.tiendaapi.exception.DuplicateEntryException;
import com.pineapplesupermarket.tiendaapi.exception.EntityNotFoundException;
import com.pineapplesupermarket.tiendaapi.models.Product;
import com.pineapplesupermarket.tiendaapi.services.IProductoService;
import com.pineapplesupermarket.tiendaapi.services.IUserService;
import com.pineapplesupermarket.tiendaapi.util.ExportarInventario;

@RestController
@RequestMapping("/api/v1/producto")
public class ProductoController {

	private static final Logger logger = LoggerFactory.getLogger(ProductoController.class);
	
	@Autowired
	private IProductoService productoService;
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private ExportarInventario exportarInventario;
	
	@GetMapping("/{id}")
	public ResponseEntity<ResponseDTO> getProduct(@PathVariable(value="id") long id, Principal principal){
		String username = userService.getPrincipalUsername(principal);
		logger.info("Req:[Consult product] by " + username);
		try {
			Product producto = productoService.findOne(id);
			
			logger.info(HttpStatus.OK.toString());
		     return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.PROCESADO.getCodigo(), 
		        		ResponseCodeEnum.PROCESADO.getMensaje(), producto), HttpStatus.OK);
		}catch(EntityNotFoundException en) {
			 logger.info(HttpStatus.NOT_FOUND.toString().concat(": ").concat(en.getMessage()));
			 return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_ENCONTRADO.getCodigo(), 
		        		ResponseCodeEnum.NO_ENCONTRADO.getMensaje(), en.getMessage()), HttpStatus.NOT_FOUND);
			
		} catch(Exception e) {
			logger.info(HttpStatus.INTERNAL_SERVER_ERROR.toString());
	        return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_PROCESADO.getCodigo(), 
	        		ResponseCodeEnum.NO_PROCESADO.getMensaje()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("")
	@ResponseStatus(HttpStatus.OK)
	public Page<Product> listAllProduct(@RequestParam(defaultValue="0") int page,
				@RequestParam(defaultValue = "10") int size,
				@RequestParam(required = false) String name, 
				@RequestParam(required = false) String categoria,
				@RequestParam(required = false) 
				@DateTimeFormat(pattern = "yyyy-MM-dd") Date fechaCreacion, Principal principal){
		String username = userService.getPrincipalUsername(principal);
		logger.info("Req:[Search products] by " + username);
		
		FilterProductoDTO filters = new FilterProductoDTO();
		filters.setName(name);
		filters.setCategoria(categoria);
		filters.setFechaCreacion(fechaCreacion);
		filters.setPage(page);
		filters.setSize(size);

		Page<Product> productos = productoService.getProductos(filters);
		
		logger.info(HttpStatus.OK.toString());
		return productos;
	}
	
	@PostMapping("")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<ResponseDTO> create(@Valid @RequestBody Product producto,
			@RequestParam("picture") MultipartFile picture, Principal principal) { //
		String username = userService.getPrincipalUsername(principal);
		logger.info("Req:[Create product] by " + username);
		try {
			producto.setPicture(picture.isEmpty() ? picture.getBytes() : null);
	        Product _product = productoService.save(producto);
	        logger.info(HttpStatus.CREATED.toString());
	        return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.PROCESADO.getCodigo(), 
	        		ResponseCodeEnum.PROCESADO.getMensaje(), _product), HttpStatus.CREATED);
		} catch(DuplicateEntryException dee) {
			 logger.info(HttpStatus.BAD_REQUEST.toString().concat(": ").concat(dee.getMessage()));
			 return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.DUPLICADO.getCodigo(), 
		        		ResponseCodeEnum.DUPLICADO.getMensaje(), dee.getMessage()), HttpStatus.BAD_REQUEST);
		}catch(EntityNotFoundException en) {
			 logger.info(HttpStatus.NOT_FOUND.toString().concat(": ").concat(en.getMessage()));
			 return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_ENCONTRADO.getCodigo(), 
		        		ResponseCodeEnum.NO_ENCONTRADO.getMensaje(), en.getMessage()), HttpStatus.NOT_FOUND);
			
		} catch(Exception e) {
			logger.info(HttpStatus.INTERNAL_SERVER_ERROR.toString());
	        return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_PROCESADO.getCodigo(), 
	        		ResponseCodeEnum.NO_PROCESADO.getMensaje()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<ResponseDTO> update(@Valid @RequestBody Product productoUpdate,
			@RequestParam("picture") MultipartFile picture,
			@PathVariable Long id, Principal principal){ //@RequestParam("picture") MultipartFile picture
		String username = userService.getPrincipalUsername(principal);
		logger.info("Req:[Update product] by " + username);
		
		try {
			productoUpdate.setPicture(picture.isEmpty() ? picture.getBytes() : null);
			Product productoSaved = this.productoService.update(id, productoUpdate);
			 logger.info(HttpStatus.CREATED.toString());
		        return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.PROCESADO.getCodigo(), 
		        		ResponseCodeEnum.PROCESADO.getMensaje(), productoSaved), HttpStatus.CREATED);
		}catch(EntityNotFoundException en) {
			 logger.info(HttpStatus.NOT_FOUND.toString().concat(": ").concat(en.getMessage()));
			 return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_ENCONTRADO.getCodigo(), 
		        		ResponseCodeEnum.NO_ENCONTRADO.getMensaje(), en.getMessage()), HttpStatus.NOT_FOUND);
			
		} catch(DuplicateEntryException dee) {
			 logger.info(HttpStatus.BAD_REQUEST.toString().concat(": ").concat(dee.getMessage()));
			 return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.DUPLICADO.getCodigo(), 
		        		ResponseCodeEnum.DUPLICADO.getMensaje(), dee.getMessage()), HttpStatus.BAD_REQUEST);
		} catch(Exception e) {
			logger.info(HttpStatus.INTERNAL_SERVER_ERROR.toString());
	        return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_PROCESADO.getCodigo(), 
	        		ResponseCodeEnum.NO_PROCESADO.getMensaje()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<ResponseDTO> delete(@PathVariable(value="id") long id, Principal principal){
		String username = userService.getPrincipalUsername(principal);
		logger.info("Req:[Delete product] by " + username);
		try {
			this.productoService.delete(id);
			
			logger.info(HttpStatus.OK.toString());
		        return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.PROCESADO.getCodigo(), 
		        		ResponseCodeEnum.PROCESADO.getMensaje()), HttpStatus.OK);
		}catch(EntityNotFoundException en) {
			 logger.info(HttpStatus.NOT_FOUND.toString().concat(": ").concat(en.getMessage()));
			 return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_ENCONTRADO.getCodigo(), 
		        		ResponseCodeEnum.NO_ENCONTRADO.getMensaje(), en.getMessage()), HttpStatus.NOT_FOUND);
			
		} catch(Exception e) {
			logger.info(HttpStatus.INTERNAL_SERVER_ERROR.toString());
	        return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_PROCESADO.getCodigo(), 
	        		ResponseCodeEnum.NO_PROCESADO.getMensaje()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}	
	
	@GetMapping("/exportar")
	public ExportarInventario exportar(Principal principal){
		String username = userService.getPrincipalUsername(principal);

		logger.info("Req:[Export products] by " + username);
		return exportarInventario;
	}
	
}
