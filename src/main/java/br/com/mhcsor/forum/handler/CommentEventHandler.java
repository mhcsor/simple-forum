package br.com.mhcsor.forum.handler;

import br.com.mhcsor.forum.domain.Comment;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeDelete;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Optional;

@RepositoryEventHandler
public class CommentEventHandler {

    @HandleBeforeDelete
    public void beforeDelete(Comment comment) {

    }

    @HandleBeforeCreate
    public void beforeCreate(Comment comment) {
        comment.setOwner(currentUser().get().getUsername());
        comment.setLastModified(Timestamp.from(Instant.now()));
    }

    public static Optional<User> currentUser() {

        Authentication auth = SecurityContextHolder
                .getContext().getAuthentication();

        if (auth != null) {

            Object principal = auth.getPrincipal();

            if (principal instanceof User) // User is your user type that implements UserDetails
                return Optional.of((User) principal);
        }

        return Optional.empty();
    }

}
