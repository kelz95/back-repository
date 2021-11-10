package com.pineapplesupermarket.tiendaapi.controllers;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pineapplesupermarket.tiendaapi.dto.JwtResponseDTO;
import com.pineapplesupermarket.tiendaapi.dto.LoginRequestDTO;
import com.pineapplesupermarket.tiendaapi.dto.ResponseDTO;
import com.pineapplesupermarket.tiendaapi.dto.RestorePasswordDTO;
import com.pineapplesupermarket.tiendaapi.enums.ResponseCodeEnum;
import com.pineapplesupermarket.tiendaapi.exception.EntityNotFoundException;
import com.pineapplesupermarket.tiendaapi.security.JwtProvider;
import com.pineapplesupermarket.tiendaapi.security.UserPrincipal;
import com.pineapplesupermarket.tiendaapi.services.IUserService;
import com.pineapplesupermarket.tiendaapi.util.LoggerUtils;
import com.pineapplesupermarket.tiendaapi.util.PasswordUtils;
/**
 *Controlador de autenticación
 *@author Raquel de la Rosa 
 *@version 1.0
 */
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
	
	@Autowired
    private AuthenticationManager authenticationManager;
	
	@Autowired
	private IUserService userService;

	@Autowired
	private JwtProvider jwtProvider;
	
	/**
	 * @param loginRequest
	 * @param bindingResult
	 * @return ResponseEntity<?>
	 * @exception BadCredentialsException, Exception
	 */
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequestDTO loginRequest,
			BindingResult bindingResult){
		LoggerUtils.logRequest(logger, "Login", loginRequest.getUsername());

		if(bindingResult.hasErrors()) {
			LoggerUtils.logResponse(logger, HttpStatus.BAD_REQUEST.toString(), "Campos vacios");
			return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_PROCESADO.getCodigo(), 
	        		ResponseCodeEnum.NO_PROCESADO.getMensaje().concat(". Campos vacios")), HttpStatus.BAD_REQUEST);
		}
		try {
			Authentication authentication = authenticationManager.authenticate(
	                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
	                        loginRequest.getPassword()));
	
	        SecurityContextHolder.getContext().setAuthentication(authentication);
	
	        String jwt = jwtProvider.generateJwtToken(authentication);
	
	        UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();
	        List<String> roles = userDetails.getAuthorities().stream()
	                .map(GrantedAuthority::getAuthority)
	                .collect(Collectors.toList());
	        
	        JwtResponseDTO jwtResponse = new JwtResponseDTO(jwt, userDetails.getId(), userDetails.getUsername(),
	                roles); 
			LoggerUtils.logResponse(logger, HttpStatus.OK.toString());
	        return new ResponseEntity<>(jwtResponse, HttpStatus.OK);
		}catch(BadCredentialsException e) {
			LoggerUtils.logException(logger, HttpStatus.UNAUTHORIZED.toString(), e.getMessage());
			return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_AUTORIZADO.getCodigo(), 
					e.getMessage()), HttpStatus.UNAUTHORIZED);
		}catch(Exception e) {
			LoggerUtils.logException(logger, HttpStatus.INTERNAL_SERVER_ERROR.toString(), e.getMessage());
	        return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_PROCESADO.getCodigo(), 
	        		ResponseCodeEnum.NO_PROCESADO.getMensaje()), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	/**
	 * @param parametro
	 * @return  ResponseEntity<?> 
	 * @exception EntityNotFoundException, Exception
	 */
	@PostMapping("/restore-password")
	public  ResponseEntity<?> restorePassword(@RequestBody String parametro) {
		
		if(parametro == null) {
			LoggerUtils.logRequest(logger, "Create code restore password", "null");

			return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_PROCESADO.getCodigo(), 
					ResponseCodeEnum.NO_PROCESADO.getMensaje().concat(". Usuario vacio")), 
					HttpStatus.BAD_REQUEST);			
		}
		LoggerUtils.logRequest(logger, "Create code restore password", "null");

		try {
			ResponseDTO response = this.userService.sendRestoreCode(parametro);
			LoggerUtils.logResponse(logger, HttpStatus.CREATED.toString(), "Created code");
			return new ResponseEntity<>(response, HttpStatus.CREATED);
			
		} catch (EntityNotFoundException e) {
			LoggerUtils.logException(logger, HttpStatus.NOT_FOUND.toString(), e.getMessage());
			return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_ENCONTRADO.getCodigo(), 
		        		ResponseCodeEnum.NO_ENCONTRADO.getMensaje()), 
					 HttpStatus.NOT_FOUND);
		}catch(Exception e) {
			LoggerUtils.logException(logger, HttpStatus.INTERNAL_SERVER_ERROR.toString(), e.getMessage());
	        return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_PROCESADO.getCodigo(), 
	        		ResponseCodeEnum.NO_PROCESADO.getMensaje()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	/**
	 * @param userDTO
	 * @param code
	 * @return  ResponseEntity<?> 
	 * @exception EntityNotFoundException, Exception
	 */
	@PutMapping("/restore-password/{code}")
	public  ResponseEntity<?> restorePassword(
			@Valid @RequestBody RestorePasswordDTO userDTO,
			@PathVariable String code) {
		LoggerUtils.logRequest(logger, "Use code restore password", userDTO.getUsername());

		try {
			//Password policies
			if(!PasswordUtils.isValid(userDTO.getPassword())) {
				String message = "El password no cumple con los requisitos de seguridad";
				LoggerUtils.logException(logger, HttpStatus.BAD_REQUEST.toString(), message);
				return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_PROCESADO.getCodigo(), 
						message), HttpStatus.BAD_REQUEST);
			}
			
			ResponseDTO response = this.userService.restorePasswordUser(userDTO.getUsername(), userDTO.getPassword(), code);
			LoggerUtils.logResponse(logger, HttpStatus.CREATED.toString());
			return new ResponseEntity<>(response, HttpStatus.CREATED);
		} catch(EntityNotFoundException e) {
			LoggerUtils.logException(logger, HttpStatus.NOT_FOUND.toString(), e.getMessage());
			return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_ENCONTRADO.getCodigo(), 
		        		ResponseCodeEnum.NO_ENCONTRADO.getMensaje()), HttpStatus.NOT_FOUND);
		} catch(Exception e) {
			LoggerUtils.logException(logger, HttpStatus.INTERNAL_SERVER_ERROR.toString(), e.getMessage());
	        return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_PROCESADO.getCodigo(), 
	        		ResponseCodeEnum.NO_PROCESADO.getMensaje()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
