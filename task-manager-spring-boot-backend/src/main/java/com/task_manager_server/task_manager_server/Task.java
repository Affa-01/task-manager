package com.task_manager_server.task_manager_server;

import jakarta.persistence.*;

@Entity
@Table(name = "todos")
public class Task {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long todo_id;

    @Column(name="entry_string", length=50, nullable = false, unique = true)
    private String entryString;

    @Column(name="list_id", nullable = false)
    private long listId;

    @Column(name="pos", nullable = false)
    private int pos;

    protected Task() {}

    public long getId() {
        return todo_id;
    }

    public String getEntryString() {
        return entryString;
    }

    public int getPos() {
        return pos;
    }

    public void setPos(int pos) {
        this.pos = pos;
    }

    public long getListId() {
        return listId;
    }

    public void setListId(long listId) {
        this.listId = listId;
    }

    public void setEntryString(String entryString) {
        this.entryString = entryString;
    }

    public void setId(long id) {
        this.todo_id = id;
    }

    public Task(String entryString, long listId){
        if (entryString == null) {
            throw new IllegalArgumentException("entryString cannot be null");
        }
        this.entryString = entryString;
        this.listId = listId;
        this.pos = entryString.hashCode();
    }
}
