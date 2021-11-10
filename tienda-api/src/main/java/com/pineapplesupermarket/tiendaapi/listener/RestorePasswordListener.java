package com.pineapplesupermarket.tiendaapi.listener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.pineapplesupermarket.tiendaapi.events.OnRestorePasswordEvent;
import com.pineapplesupermarket.tiendaapi.models.RestoreCode;
import com.pineapplesupermarket.tiendaapi.services.IEmailService;

@Component
public class RestorePasswordListener implements ApplicationListener<OnRestorePasswordEvent>{

	private static final Logger logger = LoggerFactory.getLogger(RestorePasswordListener.class);
	
	@Autowired
	private IEmailService emailService;
	
	
	@Override
	public void onApplicationEvent(OnRestorePasswordEvent event) {
		this.restorePassword(event);		
	}
	
	private void restorePassword(OnRestorePasswordEvent event) {
		RestoreCode restoreCode = event.getRestoreCode();
		String code = restoreCode.getCode();
		String username = restoreCode.getUser().getUsername();
		
		logger.info("Restore Password Event: username: [" + username
				+ "] code: [" + code + "]");
		try {
			this.emailService.sendRestorePasswordMail(
					username, 
					code, 
					restoreCode.getUser().getEmail());
		}catch(Exception e) {
			logger.error("Fail to send restore password email", e.getMessage());
		}
		
	}

}
