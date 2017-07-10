package com.si1.labs.model;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

@Entity
public class Usuario implements Serializable {

	private static final long serialVersionUID = 6071081610410311305L;

	@Id
	@GeneratedValue
	private Integer id;
	private String nome;
	private String email;
	private String senha;
	private String apelido;

	// https://docs.jboss.org/hibernate/orm/3.6/reference/pt-BR/html/collections.html#collections-foreignkeys
	private Set<Serie> series;
	private Set<Serie> watchlist;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getApelido() {
		return apelido;
	}

	public void setApelido(String apelido) {
		this.apelido = apelido;
	}

	@ManyToMany(
		// targetEntity = org.hibernate.test.metadata.manytomany.Serie.class, 
		cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinTable(
		name = "USUARIO_SERIES", 
		joinColumns = @JoinColumn(name = "USUARIO_ID"), 
		inverseJoinColumns = @JoinColumn(name = "SERIE_ID"))
		// aqui tem que existir as notas do usuário para determinada série
	public Set<Serie> getSeries() {
		return series;
	}

	public void setSeries(Set<Serie> series) {
		this.series = series;
	}

	@ManyToMany(
		// targetEntity = org.hibernate.test.metadata.manytomany.Serie.class, 
		cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinTable(
		name = "USUARIO_WATCHLIST", 
		joinColumns = @JoinColumn(name = "USUARIO_ID"), 
		inverseJoinColumns = @JoinColumn(name = "SERIE_ID"))
	// aqui tem que existir as notas do usuário para determinada série
	public Set<Serie> getWatchlist() {
		return watchlist;
	}

	public void setWatchlist(Set<Serie> watchlist) {
		this.watchlist = watchlist;
	}

}
