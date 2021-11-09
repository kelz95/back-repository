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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pineapplesupermarket.tiendaapi.dto.JwtResponseDTO;
import com.pineapplesupermarket.tiendaapi.dto.LoginRequestDTO;
import com.pineapplesupermarket.tiendaapi.dto.ResponseDTO;
import com.pineapplesupermarket.tiendaapi.enums.ResponseCodeEnum;
import com.pineapplesupermarket.tiendaapi.security.JwtProvider;
import com.pineapplesupermarket.tiendaapi.security.UserPrincipal;
import com.pineapplesupermarket.tiendaapi.services.IUserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
	
	@Autowired
    AuthenticationManager authenticationManager;
	
	@Autowired
	IUserService userService;
	
	@Autowired
    JwtProvider jwtProvider;
	
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequestDTO loginRequest,
			BindingResult bindingResult){
		logger.info("Req:[Login] by " + loginRequest.getUsername());
		
		if(bindingResult.hasErrors()) {
			logger.info("Campos vacios");
			return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_PROCESADO.getCodigo(), 
	        		ResponseCodeEnum.NO_PROCESADO.getMensaje(), "Campos vacios"), HttpStatus.BAD_REQUEST);
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
	
	        return new ResponseEntity<>(jwtResponse, HttpStatus.OK);
		}catch(BadCredentialsException bce) {
			logger.info("BAD CREDENTIALS: " + bce.getMessage());
			return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_AUTORIZADO.getCodigo(), 
					bce.getMessage()), HttpStatus.UNAUTHORIZED);
		}

	}
	
	@PostMapping("/restore-password")
	public  ResponseEntity<?> restorePassword(@RequestBody String user) {
		
		logger.info("Req:[Restore password] by " + user);
//		try {
			
			if(user != null) {
				
			}
			return null;
//			User userCreated = this.userService.save(user);
//			return new ResponseEntity<>(userCreated, HttpStatus.CREATED);
//		} catch (DuplicateEntryException e) {
//			 logger.info(HttpStatus.BAD_REQUEST.toString().concat(": ").concat(e.getMessage()));
//			 return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.DUPLICADO.getCodigo(), 
//		        		ResponseCodeEnum.DUPLICADO.getMensaje(), e.getMessage()), HttpStatus.BAD_REQUEST);
//		}catch(Exception e) {
//			logger.info(HttpStatus.INTERNAL_SERVER_ERROR.toString());
//	        return new ResponseEntity<>(new ResponseDTO(ResponseCodeEnum.NO_PROCESADO.getCodigo(), 
//	        		ResponseCodeEnum.NO_PROCESADO.getMensaje()), HttpStatus.INTERNAL_SERVER_ERROR);
//		}
	}
}
