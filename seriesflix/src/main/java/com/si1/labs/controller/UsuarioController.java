package com.si1.labs.controller;

import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.si1.labs.model.Usuario;

@RestController
public class UsuarioController {

	final static Logger logger = Logger.getLogger(MainController.class);
	
	@RequestMapping(method=RequestMethod.GET, value="/usuario")
	public ResponseEntity<Usuario> buscar() {
		
		if (logger.isInfoEnabled()) {
			logger.info("Request to /usuario");
		}
		
		Usuario usuario = new Usuario();
		usuario.setNome("José");
		return new ResponseEntity<Usuario>(usuario, HttpStatus.OK);
	}
	
}
