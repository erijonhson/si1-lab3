package com.si1.labs.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.si1.labs.model.Serie;

public interface SerieRepository extends JpaRepository<Serie, Long> {

	public Serie findById(Long id);

	public Set<Serie> findByUsuarioId(Long usuarioId);

}
