package com.easyblogs.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyblogs.model.Comment;
import com.easyblogs.model.User;
import com.easyblogs.repository.CommentRepository;

@Service
public class CommentService {

	@Autowired
	CommentRepository commentRepository;
	
	public List<Comment> getAllComments(Long postId) {
		ArrayList<Comment> comments = new ArrayList<>();
		//this.commentRepository.findByPostId(postId).forEach(comments::add);
        return comments;
	}

	public void addComments(Comment comment) {
		 this.commentRepository.save(comment);
		
	}

	public Optional<Comment> findByCommentId(Long commentId) {
		return this.commentRepository.findById(commentId);
	}
	
	
}
