package com.task_manager_server.task_manager_server;

import jakarta.persistence.*;

@Entity
@Table(name = "lists")
public class TaskList {
    @Id @GeneratedValue(strategy = GenerationType.AUTO) 
    private long list_id;

    @Column(name="list_name", length=50, nullable = false, unique = true)
    private String name;

    protected TaskList() {}

    public TaskList(String name) {
        this.name = name;
    }

    public Long getId() {
        return list_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
