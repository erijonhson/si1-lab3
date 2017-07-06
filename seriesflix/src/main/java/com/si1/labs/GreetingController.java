package com.si1.labs;

import java.util.concurrent.atomic.AtomicLong;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class GreetingController {

	final static Logger logger = Logger.getLogger(GreetingController.class);
    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @RequestMapping("/hello")
    public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {
    	if(logger.isInfoEnabled()){
			logger.info("Requisição /hello" + name);
		}
        return new Greeting(counter.incrementAndGet(),
                            String.format(template, name));
    }
    
    @RequestMapping(value="/",method = RequestMethod.GET)
    public String homepage(){
    	if(logger.isInfoEnabled()){
			logger.info("Requisição /");
		}
        return "index";
    }
}
