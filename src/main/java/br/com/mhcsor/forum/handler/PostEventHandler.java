package br.com.mhcsor.forum.handler;

import br.com.mhcsor.forum.domain.Post;
import org.springframework.data.rest.core.annotation.HandleBeforeDelete;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;

@RepositoryEventHandler
public class PostEventHandler {

    @HandleBeforeDelete
    public void beforeDelete(Post post) {

    }

    @HandleBeforeSave
    public void beforeSave(Post post) {

    }

}
