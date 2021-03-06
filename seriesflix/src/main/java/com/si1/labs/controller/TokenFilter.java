package com.si1.labs.controller;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.filter.GenericFilterBean;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;

public class TokenFilter extends GenericFilterBean {

	public static String key = "hightechcursos";
	private static int tokenPosition = "Bearer ".length();

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest req = (HttpServletRequest) request;

		String header = req.getHeader("Authorization");

		if (header == null || !header.startsWith("Bearer ")) {
			throw new ServletException("Token inexiste ou inválido");
		}

		// Extraindo somente a string do Token sem o Bearer
		String token = header.substring(tokenPosition); 

		// verificar se o token é valido
		try {
			Jwts.parser().setSigningKey(TokenFilter.key).parseClaimsJws(token).getBody();
		} catch (SignatureException e) {
			throw new ServletException("Token Inválido");
		}

		chain.doFilter(request, response);
	}
}