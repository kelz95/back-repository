package com.pineapplesupermarket.tiendaapi.services;

import javax.mail.MessagingException;

public interface IEmailService {

	public void sendRestorePasswordMail(String recipientName, String recipientEmail, String restoreCode) throws MessagingException;
}
