package com.pineapplesupermarket.tiendaapi.controllers;

import java.security.Principal;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.pineapplesupermarket.tiendaapi.dto.ResponseDTO;
import com.pineapplesupermarket.tiendaapi.enums.ResponseCodeEnum;
import com.pineapplesupermarket.tiendaapi.exception.DuplicateEntryException;
import com.pineapplesupermarket.tiendaapi.exception.EntityNotFoundException;
import com.pineapplesupermarket.tiendaapi.models.ProductCategory;
import com.pineapplesupermarket.tiendaapi.services.IProductoCategoriaService;
import com.pineapplesupermarket.tiendaapi.services.IUserService;
import com.pineapplesupermarket.tiendaapi.util.LoggerUtils;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
/**
 *Controlador de la categoría del producto
 *@author Raquel de la Rosa 
 *@version 1.0
 */
@RestController
@RequestMapping("/api/v1/categories")
@PreAuthorize("hasRole('ROLE_ADMIN')")
@Api(value = "Product Category Controller")
public class ProductoCategoriaController {
	
	private static final Logger logger = LoggerFactory.getLogger(ProductoCategoriaController.class);

	@Autowired
	private IProductoCategoriaService categoriaService;
	
	@Autowired
	private IUserService userService;
	
	/**End point que obtiene una lista de categorías
	 * @param principal
	 * @return ResponseEntity<List<ProductCategory>>
	 */
	@GetMapping("")
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "List of categories")
	public ResponseEntity<List<ProductCategory>> listAllProduct(Principal principal){
		String username = userService.getPrincipalUsername(principal);
		LoggerUtils.logRequest(logger, "List categories", username);
		List<ProductCategory> listCategorias = this.categoriaService.listAll();

		LoggerUtils.logResponse(logger, HttpStatus.OK.toString());
		return new ResponseEntity<>(listCategorias, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	@ApiOperation(response = ProductCategory.class, value = "Find a product category by id")
	public ResponseEntity<?> findOne(@PathVariable Long id, Principal principal){
		String username = userService.getPrincipalUsername(principal);
		LoggerUtils.logRequest(logger, "Find product category", username);
		
		try {
			ProductCategory productoCategoria = this.categoriaService.findOne(id);
			
			LoggerUtils.logResponse(logger, HttpStatus.OK.toString());
			return new ResponseEntity<>(productoCategoria, HttpStatus.OK);
		} catch (EntityNotFoundException e) {
			LoggerUtils.logException(logger, HttpStatus.NOT_FOUND.toString(), e.getMessage());
			return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_ENCONTRADO.getCodigo(), 
		        		ResponseCodeEnum.NO_ENCONTRADO.getMensaje()), HttpStatus.NOT_FOUND);
			
		}catch(Exception e) {
			LoggerUtils.logException(logger, HttpStatus.INTERNAL_SERVER_ERROR.toString(), e.getMessage());
	        return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_PROCESADO.getCodigo(), 
	        		ResponseCodeEnum.NO_PROCESADO.getMensaje()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@PostMapping("")
	@ApiOperation(response = ProductCategory.class, value = "Create a product category")
	public ResponseEntity<?> create(@Valid @RequestBody ProductCategory productoCategoria, 
			Principal principal){
		String username = userService.getPrincipalUsername(principal);
		LoggerUtils.logRequest(logger, "Create product category", username);
		
		try {
			ProductCategory productoCategoriaCreated = this.categoriaService.create(productoCategoria);
			
			LoggerUtils.logResponse(logger, HttpStatus.OK.toString(), "Product Id: "
			+ productoCategoriaCreated.getIdProductCategory());
			return new ResponseEntity<>(productoCategoriaCreated, HttpStatus.OK);
		} catch (DuplicateEntryException e) {
			LoggerUtils.logException(logger, HttpStatus.BAD_REQUEST.toString(), e.getMessage());
			 return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.DUPLICADO.getCodigo(), 
		        		ResponseCodeEnum.DUPLICADO.getMensaje()), HttpStatus.BAD_REQUEST);
	
		}catch(Exception e) {
			LoggerUtils.logException(logger, HttpStatus.INTERNAL_SERVER_ERROR.toString(), e.getMessage());
	        return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_PROCESADO.getCodigo(), 
	        		ResponseCodeEnum.NO_PROCESADO.getMensaje()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@PutMapping("/{id}")
	@ApiOperation(response = ProductCategory.class, value = "Update a product category")
	public ResponseEntity<?> update(@Valid @RequestBody ProductCategory productoCategoriaNew,
			@PathVariable Long id, Principal principal){
		String username = userService.getPrincipalUsername(principal);
		LoggerUtils.logRequest(logger, "Find product category", username);

		try {
			ProductCategory productoCategoriaUpdated = this.categoriaService.update(
					productoCategoriaNew, id);
			LoggerUtils.logResponse(logger, HttpStatus.OK.toString(), "Product Id: "
			+ productoCategoriaUpdated.getIdProductCategory());
			return new ResponseEntity<>(productoCategoriaUpdated, HttpStatus.OK);
		} catch (EntityNotFoundException e) {
			LoggerUtils.logException(logger, HttpStatus.NOT_FOUND.toString(), e.getMessage());
			return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_ENCONTRADO.getCodigo(), 
		        		ResponseCodeEnum.NO_ENCONTRADO.getMensaje()), HttpStatus.NOT_FOUND);
			
		}catch (DuplicateEntryException e) {
			LoggerUtils.logException(logger, HttpStatus.BAD_REQUEST.toString(), e.getMessage());
			 return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.DUPLICADO.getCodigo(), 
		        		ResponseCodeEnum.DUPLICADO.getMensaje()), HttpStatus.BAD_REQUEST);
	
		}catch(Exception e) {
			LoggerUtils.logException(logger, HttpStatus.INTERNAL_SERVER_ERROR.toString(), e.getMessage());
	        return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_PROCESADO.getCodigo(), 
	        		ResponseCodeEnum.NO_PROCESADO.getMensaje()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@DeleteMapping("/{id}")
	@ApiOperation(value = "Delete a product category")
	public ResponseEntity<ResponseDTO> delete(@PathVariable Long id, Principal principal){
		String username = userService.getPrincipalUsername(principal);
		LoggerUtils.logRequest(logger, "Delete product category", username);
		try {
			this.categoriaService.delete(id);
			LoggerUtils.logResponse(logger, HttpStatus.OK.toString(), "Product Id: "+ id);
			return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.PROCESADO.getCodigo(), 
	        		ResponseCodeEnum.PROCESADO.getMensaje()), HttpStatus.NO_CONTENT);
		} catch (EntityNotFoundException e) {
			LoggerUtils.logException(logger, HttpStatus.NOT_FOUND.toString(), e.getMessage());
			return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_ENCONTRADO.getCodigo(), 
		        		ResponseCodeEnum.NO_ENCONTRADO.getMensaje()), HttpStatus.NOT_FOUND);
			
		}catch(Exception e) {
			LoggerUtils.logException(logger, HttpStatus.INTERNAL_SERVER_ERROR.toString(), e.getMessage());
	        return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_PROCESADO.getCodigo(), 
	        		ResponseCodeEnum.NO_PROCESADO.getMensaje()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
}
