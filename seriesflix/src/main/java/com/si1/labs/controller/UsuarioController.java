package com.si1.labs.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.si1.labs.model.Usuario;
import com.si1.labs.service.UsuarioService;

@RestController
@RequestMapping(value = "/usuario")
public class UsuarioController {
	
	@Autowired
	UsuarioService usuarioService;
	
	final static Logger logger = Logger.getLogger(UsuarioController.class);
		
	@RequestMapping(
			method = RequestMethod.POST, 
			value = "/login", 
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> login(@RequestBody Usuario usuario) {
		
		if (logger.isInfoEnabled()) {
			logger.info("Request to /usuario/login");
		}
		
		HttpStatus status;
		try {
			usuario = usuarioService.login(usuario);
			status = HttpStatus.ACCEPTED;
		} catch (Throwable t) {
			usuario = null;
			status = HttpStatus.NOT_ACCEPTABLE;
		}

		return new ResponseEntity<>(usuario, status);
	}
	
	@RequestMapping(
			method = RequestMethod.POST, 
			value = "/logout", 
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> logout(@RequestBody Usuario usuario) {
		
		if (logger.isInfoEnabled()) {
			logger.info("Request to /usuario/logout");
		}
		
		HttpStatus status;
		try {
			status = HttpStatus.ACCEPTED;
			// TODO: em breve, quando aprender OAuth ou afins
		} catch (Throwable t) {
			status = HttpStatus.NOT_ACCEPTABLE;
		}
				
		return new ResponseEntity<>(status);
	}
	
	@RequestMapping(
			method = RequestMethod.POST, 
			value = "/cadastrar", 
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> cadastrar(@RequestBody Usuario usuario) {
		
		if (logger.isInfoEnabled()) {
			logger.info("Request to /usuario/cadastrar");
		}
		
		HttpStatus status;
		Usuario usuarioCadastrado = null;
		try {
			usuarioCadastrado = usuarioService.cadastrar(usuario);
			status = HttpStatus.CREATED;
		} catch (Throwable t) {
			status = HttpStatus.NOT_ACCEPTABLE;
		}
		
		return new ResponseEntity<>(usuarioCadastrado, status);
	}
	
	@RequestMapping(
			method = RequestMethod.POST, 
			value = "/deletar", 
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> deletar(@RequestBody Usuario usuario) {
		
		if (logger.isInfoEnabled()) {
			logger.info("Request to /usuario/deletar");
		}
		
		HttpStatus status;
		try {
			usuarioService.deletar(usuario);
			status = HttpStatus.CREATED;
		} catch (Throwable t) {
			status = HttpStatus.NOT_MODIFIED;
		}
		
		return new ResponseEntity<>(status);
	}
	
}
