package com.task_manager_server.task_manager_server;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Map;

@Component
public class AuthHandler {
    // Handler function compatible with RouterFunctions: takes ServerRequest and returns ServerResponse
    public ServerResponse authStatus(ServerRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        

        if (authentication != null && authentication.isAuthenticated() && !(authentication instanceof org.springframework.security.authentication.AnonymousAuthenticationToken)) {
            return ServerResponse.ok().body(Map.of(
                    "loggedIn", true,
                    "username", authentication.getName()
            ));
        } else {
            return ServerResponse.ok().body(Map.of("loggedIn", false));
        }
    }
}
