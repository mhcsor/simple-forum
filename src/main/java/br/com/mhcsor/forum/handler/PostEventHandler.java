package br.com.mhcsor.forum.handler;

import br.com.mhcsor.forum.domain.Post;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeDelete;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

import java.security.Principal;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Optional;

@RepositoryEventHandler
public class PostEventHandler {

    @HandleBeforeDelete
    public void beforeDelete(Post post) {

    }

    @HandleBeforeCreate
    public void beforeCreate(Post post) {
        post.setOwner(currentUser().get().getUsername());
        post.setLastModified(Timestamp.from(Instant.now()));
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
