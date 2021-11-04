package com.pineapplesupermarket.tiendaapi.exception;

import org.springframework.util.StringUtils;

public class DuplicateEntryException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4840492636235626233L;

	
	public DuplicateEntryException(String entity, String atributte, String value) {
		super(DuplicateEntryException.generateMessage(entity, atributte, value));
	}


	private static String generateMessage(String entity, String atributte, String value) {
		return StringUtils.capitalize(entity).concat(" duplicate entry for atributte: ")
				.concat(atributte).concat(" = ").concat(value);
	}
}
