package com.easyblogs.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyblogs.model.Comment;
import com.easyblogs.model.Post;
import com.easyblogs.repository.CommentRepository;
import com.easyblogs.repository.PostRepository;



@Service
public class PostService {
	@Autowired
	PostRepository postRepository;
	
	@Autowired
	CommentRepository commentRepository;

	public List<Post> getAllPosts() {
		ArrayList<Post> posts = new ArrayList<>();
		this.postRepository.findAll().forEach(posts::add);
        return posts;
	}

	public Post addPost(Post post) {
		 return this.postRepository.save(post);
	}
	
	public List<Comment> getAllComments(Long postId)
	{
		ArrayList<Comment> comments = new ArrayList<>();
		//this.commentRepository.findByPostId(postId).forEach(comments::add);
        return comments;
	}

	public Optional<Post> findByPostId(Long postId) {
		return this.postRepository.findById(postId);
	}

	public void addComment(Comment comment) {
		this.commentRepository.save(comment);
	}

}
