package com.CyberSecurity.Kriptografi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class GreetingController {

	@RequestMapping("/")
	public String greeting(Model model) {
		String name = "Nama saya aal";
		model.addAttribute("name", name);
		return "index";
	}

	@GetMapping("/encrpyt")
	public String encrpyt(Model model){
		return "encrypt";
	}
	
	@GetMapping("/decrypt")
	public String decrypt(Model model){
		return "decrypt";
	}

}