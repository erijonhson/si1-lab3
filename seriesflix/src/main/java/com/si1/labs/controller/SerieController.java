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
import com.si1.labs.service.SerieService;

@RestController
@RequestMapping(value = "/serieService")
public class SerieController {
	
	@Autowired
	SerieService serieService;
	
	final static Logger logger = Logger.getLogger(SerieController.class);

	@RequestMapping(
			method = RequestMethod.POST, 
			value = "/adiciona", 
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Serie> adiciona(@RequestBody Serie serie) {
		
		if (logger.isInfoEnabled()) {
			logger.info("Request to /serie/adiciona");
		}
		
		HttpStatus status;
		try {
			serie = serieService.adicionar(serie);
			status = HttpStatus.CREATED;
		} catch (Throwable t) {
			status = HttpStatus.NOT_MODIFIED;
		}
		
		return new ResponseEntity<>(serie, status);
	}
	
	@RequestMapping(
			method = RequestMethod.POST, 
			value = "/remove", 
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Serie> remove(@RequestBody Serie serie) {
		
		if (logger.isInfoEnabled()) {
			logger.info("Request to /serie/remove");
		}
		
		HttpStatus status;
		try {
			serieService.deletar(serie);
			status = HttpStatus.OK;
		} catch (Throwable t) {
			status = HttpStatus.NOT_MODIFIED;
		}
		
		return new ResponseEntity<>(status);
	}
	
	@RequestMapping(
			method = RequestMethod.GET, 
			value = "/buscarSeries/{usuarioId}", 
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Serie>> buscarSeries(@PathVariable Long usuarioId) {
		
		if (logger.isInfoEnabled()) {
			logger.info("Request to /serie/buscarSeries");
		}
		
		HttpStatus status;
		Collection<Serie> series = null;
		try {
			series = serieService.buscarSeriesDeUsuario(usuarioId);
			status = HttpStatus.OK;
		} catch (Throwable t) {
			status = HttpStatus.NOT_ACCEPTABLE;
		}
		
		return new ResponseEntity<>(series, status);
	}
	
}
