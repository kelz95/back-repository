package com.pineapplesupermarket.tiendaapi.exception;

import org.springframework.util.StringUtils;
/**
 *Clase de la excepción  EntityNotFoundException e
 *@author Raquel de la Rosa 
 *@version 1.0
 */
public class EntityNotFoundException extends Exception {

	
	/**
	 * 
	 */
	private static final long serialVersionUID = -1902358159062609135L;


	public EntityNotFoundException(String entity, String atributte, String value) {
		super(EntityNotFoundException.generateMessage(entity, atributte, value));
	}


	/** Método para generar el mensaje de la excepción
	 * @param entity
	 * @param atributte
	 * @param value
	 * @return String
	 */
	private static String generateMessage(String entity, String atributte, String value) {
		return StringUtils.capitalize(entity).concat(" was not found for atributte: ")
				.concat(atributte).concat(" = ").concat(value);
	}
}
