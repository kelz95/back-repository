package com.pineapplesupermarket.tiendaapi.exception;

public class FailUploadedException extends Exception{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public FailUploadedException(String message, Throwable ex) {
		super(message, ex);
	}
}
