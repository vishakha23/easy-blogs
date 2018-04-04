package com.easyblogs.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "comment_closure")
public class CommentClosure {
	
	@Id
	@NotNull
	private int ancestor;
    
	@NotNull
    private int descendant;
    
	@NotNull
    private int path_length;
}
