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

	// TODO: Fazer serviços:
	// login, logout, excluir conta 
	// CRUD serieEmPerfil e serieEmWatchlist #lascou
	// SerieService para getListaSerie e getSerieById do OMDBAPI
	// pois é, isso não é serviço da view, é serviço do controller
	// Tutorial: https://github.com/hightechcursos/springboot/tree/aula07

	final static Logger logger = Logger.getLogger(MainController.class);

	// teste rápido
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
