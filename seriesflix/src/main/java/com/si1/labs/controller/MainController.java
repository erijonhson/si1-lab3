package com.si1.labs.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class MainController {

	final static Logger logger = Logger.getLogger(MainController.class);

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String homepage() {
		if (logger.isInfoEnabled()) {
			logger.info("Request to /");
		}
		return "index";
	}

}