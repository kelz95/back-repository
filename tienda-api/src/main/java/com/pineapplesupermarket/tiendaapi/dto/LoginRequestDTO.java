package com.pineapplesupermarket.tiendaapi.dto;

import javax.validation.constraints.NotBlank;
/**
 *Clase del Login Request
 *@author Raquel de la Rosa 
 *@version 1.0
 */

public class LoginRequestDTO {
	
	@NotBlank
	private String username;

	@NotBlank
    private String password;

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
