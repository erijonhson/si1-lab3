package com.si1.labs.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "serie")
public class Serie implements Serializable {

	private static final long serialVersionUID = -8649556478766359360L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_serie")
	private Long id;

	@Column(name = "imdbID", nullable = false)
	private String imdbID;

	@Column(name = "my_rating")
	private double myRating;

	@Column(name = "last_watched_episode")
	private String lastWatchedEpisode;

	@Column(name = "my_season")
	private String mySeason;
	
	@Column(name = "tipo_serie", nullable = false)
	private TipoSerie tipoSerie;

	@ManyToOne
	@JoinColumn(name = "usuario_id", nullable = false)
	@JsonBackReference
	private Usuario usuario;

	public Serie() {
		usuario = null;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getImdbID() {
		return imdbID;
	}

	public void setImdbID(String imdbID) {
		this.imdbID = imdbID;
	}

	public double getMyRating() {
		return myRating;
	}

	public void setMyRating(double myRating) {
		this.myRating = myRating;
	}

	public String getLastWatchedEpisode() {
		return lastWatchedEpisode;
	}

	public void setLastWatchedEpisode(String lastWatchedEpisode) {
		this.lastWatchedEpisode = lastWatchedEpisode;
	}

	public String getMySeason() {
		return mySeason;
	}

	public void setMySeason(String mySeason) {
		this.mySeason = mySeason;
	}

	public TipoSerie getTipoSerie() {
		return tipoSerie;
	}

	public void setTipoSerie(TipoSerie tipoSerie) {
		this.tipoSerie = tipoSerie;
	}
	
	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((imdbID == null) ? 0 : imdbID.hashCode());
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
		Serie other = (Serie) obj;
		if (imdbID == null) {
			if (other.imdbID != null)
				return false;
		} else if (!imdbID.equals(other.imdbID))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return this.imdbID;
	}
}
