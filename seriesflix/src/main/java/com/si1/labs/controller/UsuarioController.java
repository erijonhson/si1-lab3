package com.si1.labs.controller;

import java.util.Collection;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.si1.labs.model.Serie;
import com.si1.labs.model.Usuario;
import com.si1.labs.service.UsuarioService;

@RestController
@RequestMapping(value = "/usuario")
public class UsuarioController {

	// TODO: Fazer serviços:
	// login, logout, excluir conta 
	// CRUD serieEmPerfil e serieEmWatchlist #lascou
	// Tutorial: https://github.com/hightechcursos/springboot/tree/aula07
	// https://github.com/ericbreno/how-to-spring-boot
	
	@Autowired
	UsuarioService usuarioService;
	
	Usuario usuarioSession;

	final static Logger logger = Logger.getLogger(MainController.class);
	
	@RequestMapping(
			method = RequestMethod.POST, 
			value = "/adicionaSerie", 
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> adicionaSerie(@RequestBody Serie serie) {
		
		if (logger.isInfoEnabled()) {
			logger.info("Request to /adicionaSerie");
		}
		
		if (!isUsuarioLogado()) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
		boolean ok = usuarioSession.adicionaSerie(serie);
		if (ok) {
			usuarioSession = usuarioService.atualizar(usuarioSession);
		}
		HttpStatus status = ok ? HttpStatus.CREATED : HttpStatus.NOT_ACCEPTABLE;
		
		return new ResponseEntity<>(usuarioSession, status);
	}
	
	@RequestMapping(
			method = RequestMethod.POST, 
			value = "/removeSerie", 
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> removeSerie(@RequestBody Serie serie) {
		
		if (logger.isInfoEnabled()) {
			logger.info("Request to /removeSerie");
		}
		
		if (!isUsuarioLogado()) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
		boolean ok = usuarioSession.removeSerie(serie);
		HttpStatus status = ok ? HttpStatus.OK : HttpStatus.NOT_ACCEPTABLE;
		
		return new ResponseEntity<>(usuarioSession, status);
	}
	
	@RequestMapping(
			method = RequestMethod.GET, 
			value = "/buscarSeries/{id}", 
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Serie>> buscarSeries(@PathVariable Long id) {
		
		if (logger.isInfoEnabled()) {
			logger.info("Request to /buscarSeries");
		}
		
		if (!isUsuarioLogado()) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
		Usuario usuario = usuarioService.buscar(id);
		HttpStatus status = usuario != null ? HttpStatus.OK : HttpStatus.NOT_FOUND;
		
		return new ResponseEntity<>(usuario.getSeries(), status);
	}
	
	@RequestMapping(
			method = RequestMethod.POST, 
			value = "/login", 
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> login(@RequestBody Usuario usuario) {
		
		if (logger.isInfoEnabled()) {
			logger.info("Request to /login");
		}
		
		usuarioSession = usuarioService.login(usuario);
		
		HttpStatus status = isUsuarioLogado() ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;
		return new ResponseEntity<>(usuarioSession, status);
	}
	
	@RequestMapping(
			method = RequestMethod.POST, 
			value = "/logout", 
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> logout(@RequestBody Usuario usuario) {
		
		if (logger.isInfoEnabled()) {
			logger.info("Request to /logout");
		}
		
		if (!isUsuarioLogado()) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
		usuarioService.atualizar(usuario);
		usuarioSession = null;
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@RequestMapping(
			method = RequestMethod.POST, 
			value = "/cadastrar", 
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> cadastraUsuario(@RequestBody Usuario usuario) {
		
		if (logger.isInfoEnabled()) {
			logger.info("Request to /cadastrar");
		}
		
		if (isUsuarioLogado()) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
		Usuario usuarioCadastrado = usuarioService.cadastrar(usuario);
		
		return new ResponseEntity<>(usuarioCadastrado, HttpStatus.CREATED);
	}
	
	@RequestMapping(
			method = RequestMethod.POST, 
			value = "/deletar", 
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> deletaUsuario(@RequestBody Usuario usuario) {
		
		if (logger.isInfoEnabled()) {
			logger.info("Request to /deletar");
		}
		
		if (!isUsuarioLogado()) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
		usuarioService.deletar(usuario);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	private boolean isUsuarioLogado() {
		return usuarioSession != null;
	}
	
}
