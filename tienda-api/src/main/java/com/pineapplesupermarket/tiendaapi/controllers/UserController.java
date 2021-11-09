package com.pineapplesupermarket.tiendaapi.controllers;

import java.security.Principal;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pineapplesupermarket.tiendaapi.dto.ResponseDTO;
import com.pineapplesupermarket.tiendaapi.enums.ResponseCodeEnum;
import com.pineapplesupermarket.tiendaapi.exception.DuplicateEntryException;
import com.pineapplesupermarket.tiendaapi.exception.EntityNotFoundException;
import com.pineapplesupermarket.tiendaapi.models.User;
import com.pineapplesupermarket.tiendaapi.services.IUserService;

@CrossOrigin(origins= {"http://localhost:4200"})
@RestController
@RequestMapping("/api/v1/user")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private IUserService userService;
	
	@GetMapping("")
	public List<User> findAll(Principal principal){
		String username = userService.getPrincipalUsername(principal);
		logger.info("Req:[List users] by " + username);
		return userService.findAll();
		
	}
	
	@GetMapping("/{id}")
	public User getUser(@PathVariable Long id, Principal principal) {
		String username = userService.getPrincipalUsername(principal);
		logger.info("Req:[Get user] by " + username);
		return userService.findById(id);
	}
	
	@PostMapping("")
	public  ResponseEntity<?> create(@RequestBody User user, Principal principal) {
		String username = userService.getPrincipalUsername(principal);
		logger.info("Req:[Create user] by " + username);
		try {
			User userCreated = this.userService.save(user);
			return new ResponseEntity<>(userCreated, HttpStatus.CREATED);
		} catch (DuplicateEntryException e) {
			 logger.info(HttpStatus.BAD_REQUEST.toString().concat(": ").concat(e.getMessage()));
			 return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.DUPLICADO.getCodigo(), 
		        		ResponseCodeEnum.DUPLICADO.getMensaje(), e.getMessage()), HttpStatus.BAD_REQUEST);
		}catch(Exception e) {
			logger.info(HttpStatus.INTERNAL_SERVER_ERROR.toString());
	        return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_PROCESADO.getCodigo(), 
	        		ResponseCodeEnum.NO_PROCESADO.getMensaje()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> update(@RequestBody User user, @PathVariable Long id, Principal principal) {
		String username = userService.getPrincipalUsername(principal);
		logger.info("Req:[Update user] by " + username);	

		try {
			User updatedUser = userService.update(id, user);
			return new ResponseEntity<>(updatedUser, HttpStatus.CREATED);
		} catch(EntityNotFoundException en) {
			 logger.info(HttpStatus.NOT_FOUND.toString().concat(": ").concat(en.getMessage()));
			 return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_ENCONTRADO.getCodigo(), 
		        		ResponseCodeEnum.NO_ENCONTRADO.getMensaje(), en.getMessage()), HttpStatus.NOT_FOUND);
		}catch (DuplicateEntryException de) {
			logger.info(HttpStatus.BAD_REQUEST.toString().concat(": ").concat(de.getMessage()));
			 return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.DUPLICADO.getCodigo(), 
		        		ResponseCodeEnum.DUPLICADO.getMensaje(), de.getMessage()), HttpStatus.BAD_REQUEST);
		}catch(Exception e) {
			logger.info(HttpStatus.INTERNAL_SERVER_ERROR.toString());
	        return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_PROCESADO.getCodigo(), 
	        		ResponseCodeEnum.NO_PROCESADO.getMensaje()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ResponseDTO> delete(@PathVariable Long id, Principal principal) {
		String username = userService.getPrincipalUsername(principal);
		logger.info("Req:[Delete user] by " + username);
		try {
			userService.delete(id);
			return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.PROCESADO.getCodigo(), 
	        		ResponseCodeEnum.PROCESADO.getMensaje()), HttpStatus.NO_CONTENT);
		} catch (EntityNotFoundException en) {
			 logger.info(HttpStatus.NOT_FOUND.toString().concat(": ").concat(en.getMessage()));
			 return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_ENCONTRADO.getCodigo(), 
		        		ResponseCodeEnum.NO_ENCONTRADO.getMensaje(), en.getMessage()), HttpStatus.NOT_FOUND);
		}catch(Exception e) {
			logger.info(HttpStatus.INTERNAL_SERVER_ERROR.toString());
	        return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_PROCESADO.getCodigo(), 
	        		ResponseCodeEnum.NO_PROCESADO.getMensaje()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
