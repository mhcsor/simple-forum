package br.com.mhcsor.forum.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.sql.Timestamp;

@Projection(name = "forumPostsSummary", types = Post.class)
public interface ForumPostsSummaryProjection {

    String getId();

    String getOwner();

    String getTopic();

    @JsonFormat(pattern = "dd MMM yyyy HH:mm:ss")
    Timestamp getLastModified();

    @Value("#{target.getComments().size() - 1}")
    Integer getReplies();

    @JsonFormat(pattern = "dd MMM yyyy HH:mm:ss")
    @Value("#{target.getComments().isEmpty() ? null : target.getComments().get(target.getComments().size() - 1).getLastModified()}")
    Timestamp getLatestPost();

    @Value("#{target.getComments().isEmpty() ? null : target.getComments().get(target.getComments().size() - 1).getOwner()}")
    String getLatestPostBy();

    @Value("#{target.getComments().isEmpty() ? null : target.getComments().get(target.getComments().size() - 1).getId()}")
    String getLatestPostId();
}
