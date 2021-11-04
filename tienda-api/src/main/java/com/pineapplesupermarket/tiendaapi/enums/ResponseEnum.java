package com.pineapplesupermarket.tiendaapi.enums;

public enum ResponseEnum {
	PROCESADO("00", "Procesado correctamente"),
	NO_ENCONTRADO("01", "No registrado en el catalogo"),
	DUPLICADO("02", "Ya registrado previamente"),
	NO_PROCESADO("03", "Error al procesar");

	private String codigo;
	private String mensaje;
	
	private ResponseEnum(String codigo, String mensaje) {
		this.codigo = codigo;
		this.mensaje = mensaje;
	}

	public String getCodigo() {
		return codigo;
	}

	public String getMensaje() {
		return mensaje;
	}

}
