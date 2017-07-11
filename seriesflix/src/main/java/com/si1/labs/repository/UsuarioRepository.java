package com.si1.labs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.si1.labs.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	public Usuario findById(Long id);
	
	public Usuario findByEmail(String email);

}
