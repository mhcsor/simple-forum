package br.com.mhcsor.forum.config;

import br.com.mhcsor.forum.handler.CommentEventHandler;
import br.com.mhcsor.forum.handler.PostEventHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RepositoryConfiguration {

    @Bean
    PostEventHandler postEventHandler() {
        return new PostEventHandler();
    }

    @Bean
    CommentEventHandler commentEventHandler() {
        return new CommentEventHandler();
    }


}
