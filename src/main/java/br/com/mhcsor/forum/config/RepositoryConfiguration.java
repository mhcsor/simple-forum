package br.com.mhcsor.forum.config;

import br.com.mhcsor.forum.domain.Comment;
import br.com.mhcsor.forum.domain.Post;
import br.com.mhcsor.forum.handler.CommentEventHandler;
import br.com.mhcsor.forum.handler.PostEventHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

@Configuration
public class RepositoryConfiguration extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Post.class);
        config.exposeIdsFor(Comment.class);
    }

    @Bean
    PostEventHandler postEventHandler() {
        return new PostEventHandler();
    }

    @Bean
    CommentEventHandler commentEventHandler() {
        return new CommentEventHandler();
    }


}
