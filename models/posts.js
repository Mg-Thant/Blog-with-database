const db = require("../utils/database");

module.exports = class Post{
    constructor(title, description, image_url) {
        this.title = title;
        this.description = description;
        this.image_url = image_url;
    }

    setPost() {
        return db.execute("INSERT INTO posts_table (title, description, image_url) VALUES (?, ?, ?)", [
            this.title, this.description, this.image_url
        ])
    }

    static getAllPost() {
        return db.execute("SELECT * FROM posts_table");
    }

    static getSinglePost(id) {
        return db.execute("SELECT * FROM posts_table WHERE posts_table.id = ?", [id]);
        // SELECT * FROM posts_table WHERE posts_table.id = 1
    }


}