package com.task_manager_server.task_manager_server;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface TasksRepository extends JpaRepository<Task, Long> {
  List<Task> findByListId(Long projectId);
}