package com.pineapplesupermarket.tiendaapi.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUtils {
	
	public static <T> T convertFromJsonToObject(String jsonString, Class<T> var) 
			throws JsonMappingException, JsonProcessingException{
		ObjectMapper objectMapper = new ObjectMapper();
		return objectMapper.readValue(jsonString, var);	
	}

}
