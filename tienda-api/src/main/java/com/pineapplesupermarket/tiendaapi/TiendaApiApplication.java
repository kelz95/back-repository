package com.pineapplesupermarket.tiendaapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class TiendaApiApplication extends SpringBootServletInitializer{
	
	//Para servlet externo
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(TiendaApiApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(TiendaApiApplication.class, args);
	}

}
