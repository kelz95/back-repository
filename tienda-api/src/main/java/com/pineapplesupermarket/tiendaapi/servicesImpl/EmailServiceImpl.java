package com.pineapplesupermarket.tiendaapi.servicesImpl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.pineapplesupermarket.tiendaapi.services.IEmailService;

@Service
public class EmailServiceImpl implements IEmailService{
	
	@Value("${mail.base.url}")
	private String baseUrl;
	
	private static final String EMAIL_TEMPLATE_NAME = "email-template";
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired
	private TemplateEngine templateEngine;

	@Override
	public void sendRestorePasswordMail(String recipientName, String recipientEmail, String restoreCode) throws MessagingException {
		SimpleDateFormat formatDate = new SimpleDateFormat("EEEE d 'de' MMMM 'de' yyyy 'a las' HH:mm:ss",
				new Locale("ES", "MX"));
		Date today = new Date();
		
		final Context ctx = new Context();
		StringBuilder message = new StringBuilder();
		message.append("Recibimos una solicitud para restablecer su contraseña en Pineapple Supermarket App el ");
		message.append(formatDate.format(today));
		message.append(". Para poder restablecer su contraseña ingrese al siguiente enlace:");
		
		ctx.setVariable("nameUser", recipientName);
		ctx.setVariable("message", message);
		ctx.setVariable("actionUrl", baseUrl.concat("restore-password/").concat(restoreCode));
		
		ctx.setVariable("action", "Restablecer");
		ctx.setVariable("message2", "Si usted no realizó esta solicitud, favor de notificar al administrador.");
		
		SimpleMailMessage email = new SimpleMailMessage();
		
		email.setTo(recipientEmail);
		email.setSubject("Restaurar contraseña");
		final String htmlContent = this.templateEngine.process(EMAIL_TEMPLATE_NAME, ctx);
		email.setText(htmlContent);

	    this.javaMailSender.send(email);

	}

}
