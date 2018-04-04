package com.easyblogs.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.easyblogs.model.Comment;
import com.easyblogs.model.Post;

import com.easyblogs.services.PostService;

@RestController
public class PostController {

    @Autowired
    PostService postService;

    // Get All posts
    
    @RequestMapping("/posts")
    public List<Post> getAllPosts() {
		return postService.getAllPosts();
    }

    // add a new post
	@RequestMapping(method = RequestMethod.POST,value = "/posts")
    public Post addPosts(@RequestBody Post post) {
		return postService.addPost(post);
    }
	
    // Get a Single post
	@RequestMapping("/posts/{id}")
    public Optional<Post> getPostById(@PathVariable(value = "id") Long postId) {
		Optional<Post> test = postService.findByPostId(postId);
        return postService.findByPostId(postId);
    }
	
	// add a new comment
	@RequestMapping(method = RequestMethod.POST,value = "/posts/comments")
    public void addComment(@RequestBody Comment comment) {
		postService.addComment(comment);
    }

    // Update a post

    // Delete a blog
}
