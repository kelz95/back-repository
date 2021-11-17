package com.pineapplesupermarket.tiendaapi.servicesImpl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.pineapplesupermarket.tiendaapi.services.IEmailService;
/**
 *Implementación del servicio de correo
 *@author Raquel de la Rosa 
 *@version 1.0
 */
@Service
public class EmailServiceImpl implements IEmailService{
	
	@Value("${mail.base.url}")
	private String baseUrl;
	
	private static final String EMAIL_TEMPLATE_NAME = "email-template";
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired
	private TemplateEngine templateEngine;

	/**Método para mandar correo de restauración de contraseña
	 *@param recipientName
	 *@param recipientEmail
	 *@param restoreCode
	 */
	@Override
	public void sendRestorePasswordMail(String recipientName, String recipientEmail, String restoreCode) throws MessagingException {
		SimpleDateFormat formatDate = new SimpleDateFormat("EEEE d 'de' MMMM 'de' yyyy 'a las' HH:mm:ss",
				new Locale("ES", "MX"));
		Date today = new Date();
		
		final Context ctx = new Context();
		StringBuilder message = new StringBuilder();
		message.append("Recibimos una solicitud para restablecer su contraseña en Pineapple Supermarket App el ");
		message.append(formatDate.format(today));
		message.append(". Para poder restablecer su contraseña de clic en el botón o bien, ingrese al enlace:");
		
		ctx.setVariable("nameUser", recipientName);
		ctx.setVariable("message", message);
		ctx.setVariable("actionUrl", baseUrl.concat("restore-password/").concat(restoreCode));
		
		ctx.setVariable("action", "Restablecer");
		ctx.setVariable("message2", "Si usted no realizó esta solicitud, favor de notificar al administrador.");
		
		final String htmlContent = this.templateEngine.process(EMAIL_TEMPLATE_NAME, ctx);
        MimeMessage mimeMessage = this.javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
      
        helper.setSubject("Restablecer contraseña");
        helper.setText(htmlContent, true);
        helper.setTo(recipientEmail);
        
        this.javaMailSender.send(mimeMessage);

	}

}
