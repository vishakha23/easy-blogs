package com.easyblogs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.easyblogs.model.Comment;
import com.easyblogs.model.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

	
}