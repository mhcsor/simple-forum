package br.com.mhcsor.forum.repository;

import br.com.mhcsor.forum.domain.Post;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface PostsRepository extends PagingAndSortingRepository<Post, Integer> {
}
