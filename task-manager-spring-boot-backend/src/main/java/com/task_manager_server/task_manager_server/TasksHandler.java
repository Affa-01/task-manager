package com.task_manager_server.task_manager_server;

import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;


import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class TasksHandler {
    TasksRepository tasksRepository;

    public TasksHandler(TasksRepository tasksRepository){
        this.tasksRepository = tasksRepository;
    }

    public ServerResponse getTasksInList(ServerRequest request) throws Exception {
        String id = request.pathVariable("id");
        List<Task> tasks = tasksRepository.findByListId(Long.parseLong(id));
        return ServerResponse.ok().body(tasks);
    }

    public ServerResponse createTask(ServerRequest request) throws Exception {
        TaskCreationDto dto = request.body(TaskCreationDto.class);
        if (dto == null || dto.entryString == null || dto.entryString.trim().isEmpty()) {
            return ServerResponse.badRequest().body("Task entry string cannot be null or empty");
        }
        Task entity = new Task(dto.entryString.trim(), dto.listId);
        return ServerResponse.ok().body(tasksRepository.save(entity));
    }

    public ServerResponse deleteTask(ServerRequest request) throws Exception {
        String id = request.pathVariable("id");
        tasksRepository.deleteById(Long.parseLong(id));
        return ServerResponse.ok().build();
    }

    public static class TaskCreationDto{
        public String entryString;
        public long listId;
    }
}