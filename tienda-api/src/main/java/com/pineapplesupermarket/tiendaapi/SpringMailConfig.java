package com.pineapplesupermarket.tiendaapi;

import java.io.IOException;
import java.util.Collections;
import java.util.Properties;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.thymeleaf.templateresolver.ITemplateResolver;

@Configuration
public class SpringMailConfig{

	private static final String EMAIL_TEMPLATE_ENCODING = "UTF-8";
   
    private Environment environment;

//    @Bean
//    public JavaMailSender mailSender() throws IOException {
//
//        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
//
//        // Basic mail sender configuration, based on emailconfig.properties
////        mailSender.setHost(this.environment.getProperty("spring.mail.host"));
////        mailSender.setPort(Integer.parseInt(this.environment.getProperty("spring.mail.port")));
////        mailSender.setProtocol(this.environment.getProperty("spring.mail.protocol"));
////        mailSender.setUsername(this.environment.getProperty("spring.mail.username"));
////        mailSender.setPassword(this.environment.getProperty("spring.mail.password"));
//        
//        mailSender.setHost("smtp.gmail.com");
//        mailSender.setPort(587);
//        mailSender.setProtocol("smtp");
//        mailSender.setUsername("pineapple.supermarket@gmail.com");
//        mailSender.setPassword("PineappleSuper!2021");
//
//        // JavaMail-specific mail sender configuration, based on javamail.properties
//        Properties javaMailProperties = mailSender.getJavaMailProperties();
//        javaMailProperties.put("mail.transport.protocol", this.environment.getProperty("spring.mail.protocol"));
//        javaMailProperties.put("mail.smtp.auth", this.environment.getProperty("spring.mail.properties.mail.smtp.auth"));
//        javaMailProperties.put("mail.smtp.starttls.enable",  this.environment.getProperty("spring.mail.properties.mail.smtp.starttls.enable"));
//        javaMailProperties.put("mail.debug", false);
//        
//        return mailSender;
//
//    }
    
    @Primary
    @Bean
    public TemplateEngine emailTemplateEngine() {
        final SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        // Resolver for HTML emails (except the editable one)
        templateEngine.addTemplateResolver(htmlTemplateResolver());       
        
        return templateEngine;
    }
    
    private ITemplateResolver htmlTemplateResolver() {
        final ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setOrder(Integer.valueOf(2));
        templateResolver.setResolvablePatterns(Collections.singleton("*"));
        templateResolver.setPrefix("/templates/mail/");
        templateResolver.setSuffix(".html");
        templateResolver.setTemplateMode(TemplateMode.HTML);
        templateResolver.setCharacterEncoding(EMAIL_TEMPLATE_ENCODING);
        templateResolver.setCacheable(false);
        return templateResolver;
    }
}
