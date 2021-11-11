package com.pineapplesupermarket.tiendaapi.exception;

import org.springframework.util.StringUtils;
/**
 *Clase de la excepción  DuplicateEntryException e
 *@author Raquel de la Rosa 
 *@version 1.0
 */
public class DuplicateEntryException extends Exception {


	private static final long serialVersionUID = -4840492636235626233L;

	
	public DuplicateEntryException(String entity, String atributte, String value) {
		super(DuplicateEntryException.generateMessage(entity, atributte, value));
	}


	/** Método para generar el mensaje de la excepción
	 * @param entity
	 * @param atributte
	 * @param value
	 * @return String
	 */
	private static String generateMessage(String entity, String atributte, String value) {
		return StringUtils.capitalize(entity).concat(" duplicate entry for atributte: ")
				.concat(atributte).concat(" = ").concat(value);
	}
}
