package com.pineapplesupermarket.tiendaapi.exception;

public class BadRequestException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public BadRequestException(String message, Throwable ex) {
		super(message, ex);
	}
}
