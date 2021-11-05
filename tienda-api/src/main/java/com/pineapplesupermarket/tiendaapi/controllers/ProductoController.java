package com.pineapplesupermarket.tiendaapi.controllers;

import java.security.Principal;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import com.pineapplesupermarket.tiendaapi.dto.ResponseDTO;
import com.pineapplesupermarket.tiendaapi.enums.ResponseCodeEnum;
import com.pineapplesupermarket.tiendaapi.exception.DuplicateEntryException;
import com.pineapplesupermarket.tiendaapi.exception.EntityNotFoundException;
import com.pineapplesupermarket.tiendaapi.models.Product;
import com.pineapplesupermarket.tiendaapi.services.IProductoService;

@RestController
@RequestMapping("/api/v1/producto")
public class ProductoController {

	private static final Logger logger = LoggerFactory.getLogger(ProductoController.class);
	
	@Autowired
	private IProductoService productoService;
	
	
	@GetMapping("/{id}")
	public ResponseEntity<ResponseDTO> findProduct(@PathVariable(value="id") long id){ //Principal principal
		String user = "usuario"; //crear servicio de usuario
		logger.info("Req:[Find product] by " + user);
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
				@RequestParam(defaultValue = "10") int size){
		String user = "usuario"; //crear servicio de usuario
		logger.info("Req:[List products] by " + user);
		
		Pageable pageRequest = PageRequest.of(page, size, Sort.by(Direction.DESC, "idProduct"));
		Page<Product> productos = productoService.findAll(pageRequest);
		
		logger.info(HttpStatus.OK.toString());
		return productos;
	}
	
	@PostMapping("")
	public ResponseEntity<ResponseDTO> create(@Valid @RequestBody Product producto,
			@RequestParam("picture") MultipartFile picture) { //
		logger.info(producto.getName());
		logger.info("cantidad: " + producto.getQuantity());
		String user = "usuario"; //crear servicio de usuario
		logger.info("Req:[Create product] by " + user);
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
		} catch(Exception e) {
			logger.info(HttpStatus.INTERNAL_SERVER_ERROR.toString());
	        return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_PROCESADO.getCodigo(), 
	        		ResponseCodeEnum.NO_PROCESADO.getMensaje()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<ResponseDTO> update(@Valid @RequestBody Product productoUpdate,
			@RequestParam("picture") MultipartFile picture,
			@PathVariable Long id){ //@RequestParam("picture") MultipartFile picture
		String user = "usuario"; //crear servicio de usuario
		logger.info("Req:[Update product] by " + user);
		
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
	public ResponseEntity<ResponseDTO> delete(@PathVariable(value="id") long id){
		String user = "usuario"; //crear servicio de usuario
		logger.info("Req:[Delete product] by " + user);
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
	
	
	
	
}
