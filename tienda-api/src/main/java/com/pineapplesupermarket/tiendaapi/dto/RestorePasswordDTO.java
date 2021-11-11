package com.pineapplesupermarket.tiendaapi.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
/**
 *Clase de restauración de contraseña
 *@author Raquel de la Rosa 
 *@version 1.0
 */

public class RestorePasswordDTO {
	
	@NotBlank
	@Size(min=8, max=200)
	private String username;
	
	@NotBlank
	@Size(min=8, max=200)
	private String password;

	public RestorePasswordDTO() {
		super();
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
}
