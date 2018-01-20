package br.com.mhcsor.forum.controller;

import org.springframework.stereotype.Controller;

@Controller
public class ForumHomeController {

    public String index() {
        return "index";
    }

}
