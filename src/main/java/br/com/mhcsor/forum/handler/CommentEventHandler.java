package br.com.mhcsor.forum.handler;

import br.com.mhcsor.forum.domain.Comment;
import br.com.mhcsor.forum.domain.Post;
import org.springframework.data.rest.core.annotation.HandleBeforeDelete;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;

@RepositoryEventHandler
public class CommentEventHandler {

    @HandleBeforeDelete
    public void beforeDelete(Comment comment) {

    }

    @HandleBeforeSave
    public void beforeSave(Comment comment) {

    }

}
