package br.com.mhcsor.forum.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ForumHomeController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

}
