package com.task_manager_server.task_manager_server;

import org.springframework.data.jpa.repository.JpaRepository;


public interface ListsRepository extends JpaRepository<TaskList, Long> {
    TaskList findByName(String name);
}