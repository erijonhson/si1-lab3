package com.si1.labs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.si1.labs.model.Usuario;
import com.si1.labs.repository.UsuarioRepository;

@Service
public class UsuarioService {
	
	@Autowired
	UsuarioRepository usuarioRepository;
	
	public void cadastrar(Usuario usuario) {
		usuarioRepository.save(usuario);
	}
	
	public void atualizar(Usuario usuario) {
		usuarioRepository.save(usuario);
	}
	
	public void login() {
		// TODO Auto-generated method stub
	}
	
	public void deletar(Usuario usuario) {
		usuarioRepository.delete(new Integer(usuario.getId()));
	}
}
