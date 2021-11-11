package com.pineapplesupermarket.tiendaapi.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
/**
 *Clase que se usa para convertir Json a Objetos
 *@author Raquel de la Rosa 
 *@version 1.0
 */
public class JsonUtils {
	
	/**Método para convertir de Json a Objetos
	 * @param <T>
	 * @param jsonString
	 * @param var
	 * @return
	 * @throws JsonMappingException
	 * @throws JsonProcessingException
	 */
	public static <T> T convertFromJsonToObject(String jsonString, Class<T> var) 
			throws JsonMappingException, JsonProcessingException{
		ObjectMapper objectMapper = new ObjectMapper();
		return objectMapper.readValue(jsonString, var);	
	}

}
