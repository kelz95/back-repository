package com.pineapplesupermarket.tiendaapi.exception;
/**
 *Clase de la excepción  FailUploadedException e
 *@author Raquel de la Rosa 
 *@version 1.0
 */
public class FailUploadedException extends Exception{
	
	private static final long serialVersionUID = 1L;

	public FailUploadedException(String message, Throwable ex) {
		super(message, ex);
	}
}
