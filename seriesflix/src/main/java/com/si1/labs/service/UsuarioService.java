package com.si1.labs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.si1.labs.model.Usuario;
import com.si1.labs.repository.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	UsuarioRepository usuarioRepository;

	public Usuario cadastrar(Usuario usuario) {
		return usuarioRepository.save(usuario);
	}

	public Usuario atualizar(Usuario usuario) {
		return usuarioRepository.save(usuario);
	}

	public Usuario buscar(Long id) {
		return usuarioRepository.findById(id);
	}

	public void deletar(Usuario usuario) {
		usuarioRepository.delete(usuario.getId());
	}

	public Usuario login(Usuario usuario) {
		Usuario usuarioBD = usuarioRepository.findByEmail(usuario.getEmail());
		if (usuario != null && usuarioBD != null && 
			usuario.getSenha().equals(usuarioBD.getSenha())) {
			return usuarioBD;
		} else {
			throw new RuntimeException("Usuário não encontrado");
		}
	}

}
