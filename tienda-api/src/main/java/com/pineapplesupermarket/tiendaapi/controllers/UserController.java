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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pineapplesupermarket.tiendaapi.dto.ResponseDTO;
import com.pineapplesupermarket.tiendaapi.enums.ResponseCodeEnum;
import com.pineapplesupermarket.tiendaapi.exception.DuplicateEntryException;
import com.pineapplesupermarket.tiendaapi.exception.EntityNotFoundException;
import com.pineapplesupermarket.tiendaapi.models.User;
import com.pineapplesupermarket.tiendaapi.services.IUserService;
import com.pineapplesupermarket.tiendaapi.util.LoggerUtils;
import com.pineapplesupermarket.tiendaapi.util.PasswordUtils;

//@CrossOrigin(origins= {"http://localhost:4200"})
@RestController
@RequestMapping("/api/v1/users")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private IUserService userService;
	
	@GetMapping("")
	public Page<User> findAll(@RequestParam(defaultValue="0") int page,
			@RequestParam(defaultValue = "10") int size, Principal principal){
		String username = userService.getPrincipalUsername(principal);
		LoggerUtils.logRequest(logger, "List users", username);
		
		Pageable pageRequest = PageRequest.of(page, 
				size, 
				Sort.by(Direction.ASC, "idUser"));
		
		LoggerUtils.logResponse(logger, HttpStatus.OK.toString());
		return userService.findAll(pageRequest);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getUser(@PathVariable Long id, Principal principal) {
		String username = userService.getPrincipalUsername(principal);
		LoggerUtils.logRequest(logger, "Get user", username);

		try {
			User user = this.userService.findById(id);
			LoggerUtils.logResponse(logger, HttpStatus.OK.toString());
			return new ResponseEntity<>(user, HttpStatus.OK);
		} catch (EntityNotFoundException e) {
			LoggerUtils.logException(logger, HttpStatus.BAD_REQUEST.toString(), e.getMessage());
			return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_ENCONTRADO.getCodigo(), 
		        		ResponseCodeEnum.NO_ENCONTRADO.getMensaje()), HttpStatus.NOT_FOUND);
		}catch (Exception e) {
			LoggerUtils.logException(logger, HttpStatus.BAD_REQUEST.toString(), e.getMessage());
			return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_PROCESADO.getCodigo(), 
		        		ResponseCodeEnum.NO_PROCESADO.getMensaje()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("")
	public  ResponseEntity<?> create(@Valid @RequestBody User user, Principal principal) {
		String username = userService.getPrincipalUsername(principal);
		LoggerUtils.logRequest(logger, "Create user", username);

		try {
			//Password policies
			if(!PasswordUtils.isValid(user.getPassword())) {
				String message = "El password no cumple con los requisitos de seguridad";
				LoggerUtils.logException(logger, HttpStatus.BAD_REQUEST.toString(), message);
				return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_PROCESADO.getCodigo(), 
						message), HttpStatus.BAD_REQUEST);
			}
			
			User userCreated = this.userService.save(user);
			LoggerUtils.logResponse(logger, HttpStatus.OK.toString(), "User id: " + userCreated.getIdUser());
			return new ResponseEntity<>(userCreated, HttpStatus.CREATED);
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
	public ResponseEntity<?> update(@Valid @RequestBody User user, @PathVariable Long id, Principal principal) {
		String username = userService.getPrincipalUsername(principal);
		LoggerUtils.logRequest(logger, "Update user", username);

		try {
			
			//Password policies
			if(!PasswordUtils.isValid(user.getPassword())) {
				String message = "El password no cumple con los requisitos de seguridad";
				LoggerUtils.logException(logger, HttpStatus.BAD_REQUEST.toString(), message);
				return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_PROCESADO.getCodigo(), 
						message), HttpStatus.BAD_REQUEST);
			}
			
			User updatedUser = userService.update(id, user);
			LoggerUtils.logResponse(logger, HttpStatus.CREATED.toString(), "User id: " + updatedUser.getIdUser());

			return new ResponseEntity<>(updatedUser, HttpStatus.CREATED);
		} catch(EntityNotFoundException e) {
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
	public ResponseEntity<?> delete(@PathVariable Long id, Principal principal) {
		String username = userService.getPrincipalUsername(principal);
		LoggerUtils.logRequest(logger, "Delete user", username);

		try {
			userService.delete(id);
			LoggerUtils.logResponse(logger, HttpStatus.NO_CONTENT.toString(), "User id: " + id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
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
