package com.pineapplesupermarket.tiendaapi.util;

import org.slf4j.Logger;
/**
 *Clase que se usa para usar el Loogger
 *@author Raquel de la Rosa 
 *@version 1.0
 */
public class LoggerUtils {

	/**Método para  construir el mensaje de peticiones
	 * @param logger
	 * @param request
	 * @param user
	 */
	public static void logRequest(Logger logger, String request, String user) {
		StringBuilder message = new StringBuilder();
		message.append("Req:[").append(request).append("] by ").append(user);
		logger.info(message.toString());
	}
	
	/**Método para construir los mensajes de salida en el log
	 * @param logger
	 * @param status
	 * @param response
	 */
	public static void logResponse(Logger logger, String status, String response) {
		StringBuilder message = new StringBuilder();
		message.append("Res:[").append(status).append("] ").append(response);
		logger.info(message.toString());
	}
	
	/**Método para construir los mensajes de salida en el log
	 * @param logger
	 * @param status
	 */
	public static void logResponse(Logger logger, String status) {
		StringBuilder message = new StringBuilder();
		message.append("Res:[").append(status).append("] ");
		logger.info(message.toString());
	}
	
	/**Método para construir las excepciones
	 * @param logger
	 * @param status
	 * @param error
	 */
	public static void logException(Logger logger, String status, String error) {
		StringBuilder message = new StringBuilder();
		message.append("Response Exception:[").append(status).append("] -> ").append(error);
		logger.error(message.toString());
	}
	
}
