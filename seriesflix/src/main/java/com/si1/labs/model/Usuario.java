package com.si1.labs.model;

import java.io.Serializable;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "usuario")
public class Usuario implements Serializable {

	private static final long serialVersionUID = 6071081610410311305L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="id_usuario")
	private Long id;
	
	@Column(name="nome", nullable = false)
	private String nome;
	
	@Column(name="email", unique=true)
	private String email;
	
	@Column(name="senha", nullable = false)
	private String senha;
	
	@Column(name="apelido", nullable = false)
	private String apelido;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "usuario")
	@JsonManagedReference
	private Set<Serie> series;

	public Usuario() {
		this.series = new HashSet<Serie>();
	}
	
	public boolean adicionaSerie(Serie serie) {
        boolean ok = this.series.add(serie);
        if (ok) {
        	serie.setUsuario(this); // mantém a consistência no BD
        }
        return ok;
    }
	
	public boolean removeSerie(Serie serie) {
		boolean ok = this.series.remove(serie);
        if (ok) {
        	serie.setUsuario(null); // mantém a consistência no BD
        }
        return ok;
    }
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
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

	public Set<Serie> getSeries() {
		Set<Serie> listSeguro = Collections.unmodifiableSet(this.series);
		return listSeguro;
	}

	public void setSeries(Set<Serie> series) {
		this.series = series;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Usuario other = (Usuario) obj;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		return true;
	}
	
	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("Usuario: " + this.nome);
		sb.append(" Series: ");
		Iterator<Serie> it = this.series.iterator();
		while (it.hasNext()) {
			Serie s = (Serie) it.next();
			sb.append(s.toString() + " ");
		}
		return sb.toString();
	}

}
