package com.yashasini.VideoResume.VideoResumeApp;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
	@Override
	public void addCorsMappings(CorsRegistry registry) {
	    System.out.println("Adding CORS mappings...");
	    registry.addMapping("/**")
	            .allowedOrigins("http://127.0.0.1:5500")
	            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
	            .allowedHeaders("*")
	            .exposedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Methods", "Access-Control-Allow-Headers", "Access-Control-Max-Age", "Access-Control-Request-Headers", "Access-Control-Request-Method")
	            .allowCredentials(true)
	            .maxAge(3600);
	}
}