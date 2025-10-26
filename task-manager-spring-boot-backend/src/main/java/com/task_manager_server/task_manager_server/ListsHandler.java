package com.task_manager_server.task_manager_server;

import org.springframework.stereotype.Component;
import java.util.List;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;

@Component
public class ListsHandler {
    ListsRepository listsRepository;

    public ListsHandler(ListsRepository listsRepository){
        this.listsRepository = listsRepository;
    }

    public ServerResponse getLists(ServerRequest request) {
        List<TaskList> lists = listsRepository.findAll();
        return ServerResponse.ok().body(lists);
    }

    public ServerResponse createList(ServerRequest request) throws Exception {
        ListNameDto dto = request.body(ListNameDto.class);
        TaskList entity = new TaskList(dto.getListName());
        return ServerResponse.ok().body(listsRepository.save(entity));
    }

    public ServerResponse deleteList(ServerRequest request) throws Exception {
        Long id = Long.valueOf(request.pathVariable("id"));
        listsRepository.deleteById(id);
        return ServerResponse.ok().build();
    }


    public static class ListNameDto {
        private String listName;

        public String getListName() { return listName; }
        public void setListName(String listName) { this.listName = listName; }
    }
}