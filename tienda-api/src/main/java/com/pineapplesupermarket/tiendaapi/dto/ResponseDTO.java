package com.pineapplesupermarket.tiendaapi.dto;
/**
 *Clase de respuesta
 *@author Raquel de la Rosa 
 *@version 1.0
 */

public class ResponseDTO {

	private String codigo;
	private String mensaje;
	
	public ResponseDTO() {
		super();
	}

	public ResponseDTO(String codigo, String mensaje) {
		super();
		this.codigo = codigo;
		this.mensaje = mensaje;
	}
	
	public String getCodigo() {
		return codigo;
	}
	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}
	public String getMensaje() {
		return mensaje;
	}
	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}
	
}
