package com.pineapplesupermarket.tiendaapi.services;

import javax.mail.MessagingException;
/**
 *Servicio del Email
 *@author Raquel de la Rosa 
 *@version 1.0
 */
public interface IEmailService {

	public void sendRestorePasswordMail(String recipientName, String recipientEmail, String restoreCode) throws MessagingException;
}
