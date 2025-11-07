package com.task_manager_server.task_manager_server;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.function.ServerResponse;
import static org.springframework.web.servlet.function.RouterFunctions.route;

import static org.springframework.web.servlet.function.RequestPredicates.accept;
import static org.springframework.http.MediaType.APPLICATION_JSON;

import org.springframework.web.servlet.function.RouterFunction;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
	
	ListsHandler listsHandler;
	TasksHandler tasksHandler;
	AuthHandler authHandler;

	public WebConfig(ListsHandler listsHandler, TasksHandler tasksHandler,
			AuthHandler authHandler) {
        this.listsHandler = listsHandler;
        this.tasksHandler = tasksHandler;
		this.authHandler = authHandler;
    }

	@Bean
	public RouterFunction<?> routerFunctionTasks() {
		RouterFunction<ServerResponse> route = route() 
			.GET("/tasks/list/{id}", accept(APPLICATION_JSON), tasksHandler::getTasksInList)
			.POST("/tasks", tasksHandler::createTask)
			.DELETE("/tasks/{id}", tasksHandler::deleteTask)
			.build();
		return route;
	}

	@Bean
	public RouterFunction<ServerResponse> routerFunctionLists() {
		RouterFunction<ServerResponse> route = route() 
			.GET("/lists", accept(APPLICATION_JSON), listsHandler::getLists)
			.POST("/lists", listsHandler::createList)
			.DELETE("/lists/{id}", listsHandler::deleteList)
			.build();
		return route;
	}

	@Bean
	public RouterFunction<ServerResponse> routerFunctionAuth() {
		RouterFunction<ServerResponse> route = route() 
			.GET("/auth/status", authHandler::authStatus)
			.build();
		return route;
	}
}