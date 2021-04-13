## Simple Wiki API
 udemy course for rest api from angela yu 2021 complete web development bootcamp
 
 ## requirements 
 node.js,
 mongoDB
 
 ## installation
 ```node.js
 git clone https://github.com/Leonardpepa/Very-Simple-REST-API.git
 npm install
 mongod in terminal
 node app.js
 ```
 ## article Schema 
 ```JavaScript
 const articleSchema = {
    title: String,
    content: String,
}
 ```
 
 ## usage
 ```JavaScript
 app.get("articles")
 app.post("articles")
 app.delete("articles")
 
app.get("/articles/:articleTitle")
app.put("/articles/:articleTitle")
app.patch("/articles/:articleTitle")
app.delete("/articles/:articleTitle")
 ```
 
 
