package com.pineapplesupermarket.tiendaapi.util;

import org.slf4j.Logger;

public class LoggerUtils {

	public static void logRequest(Logger logger, String request, String user) {
		StringBuilder message = new StringBuilder();
		message.append("Req:[").append(request).append("] by ").append(user);
		logger.info(message.toString());
	}
	
	public static void logResponse(Logger logger, String status, String response) {
		StringBuilder message = new StringBuilder();
		message.append("Res:[").append(status).append("] ").append(response);
		logger.info(message.toString());
	}
	
	public static void logResponse(Logger logger, String status) {
		StringBuilder message = new StringBuilder();
		message.append("Res:[").append(status).append("] ");
		logger.info(message.toString());
	}
	
	public static void logException(Logger logger, String status, String error) {
		StringBuilder message = new StringBuilder();
		message.append("Response Exception:[").append(status).append("] -> ").append(error);
		logger.error(message.toString());
	}
	
}
