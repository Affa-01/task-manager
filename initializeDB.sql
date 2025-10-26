CREATE TABLE lists (
    list_id SERIAL PRIMARY KEY,
    list_name VARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE todos (
    todo_id SERIAL PRIMARY KEY,
    entry_string VARCHAR(50) NOT NULL,
    list_id INT NOT NULL,
    pos INT NOT NULL,
    UNIQUE (todo_id, pos),
    FOREIGN KEY (list_id) REFERENCES lists(list_id)
);
