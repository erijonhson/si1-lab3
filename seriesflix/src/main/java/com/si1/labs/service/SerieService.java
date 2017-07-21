package com.si1.labs.service;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.si1.labs.model.Serie;
import com.si1.labs.repository.SerieRepository;

@Service
public class SerieService {

	@Autowired
	SerieRepository serieRepository;

	public Serie adicionar(Serie serie) {
		return serieRepository.save(serie);
	}

	public Serie atualizar(Serie serie) {
		return serieRepository.save(serie);
	}

	public Serie buscar(Serie serie) {
		return serieRepository.findById(serie.getId());
	}

	public Set<Serie> buscarSeriesDeUsuario(Long usuarioId) {
		return serieRepository.findByUsuarioId(usuarioId);
	}
	
	public void deletar(Serie serie) {
		serieRepository.delete(serie.getId());
	}

}
