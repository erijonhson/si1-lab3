package com.si1.labs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import com.si1.labs.controller.TokenFilter;

@SpringBootApplication
public class SeriesflixApplication {

	@Bean
	public FilterRegistrationBean filtroJwt() { 
		FilterRegistrationBean frb = new FilterRegistrationBean();
		frb.setFilter(new TokenFilter());
		frb.addUrlPatterns("/serieService/*");
		frb.addUrlPatterns("/usuario/deletar");
		return frb;
	}

	public static void main(String[] args) {
		SpringApplication.run(SeriesflixApplication.class, args);
	}
}
