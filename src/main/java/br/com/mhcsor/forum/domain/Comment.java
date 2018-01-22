package br.com.mhcsor.forum.domain;

import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.Collection;

@Entity
public class Comment {

    @Id
    @GeneratedValue
    private Integer id;

    @ManyToOne
    private Comment parent;

    @OneToMany(mappedBy = "parent")
    private Collection<Comment> children;

    private Timestamp lastModified;

    private String owner;

    @NotNull
    @NotBlank
    private String text;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Comment getParent() {
        return parent;
    }

    public void setParent(Comment parent) {
        this.parent = parent;
    }

    public Collection<Comment> getChildren() {
        return children;
    }

    public void setChildren(Collection<Comment> children) {
        this.children = children;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Timestamp getLastModified() {
        return lastModified;
    }

    public void setLastModified(Timestamp lastModified) {
        this.lastModified = lastModified;
    }
}
