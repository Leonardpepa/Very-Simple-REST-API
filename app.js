const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true});

const articleSchema = {
    title: String,
    content: String,
}

const Article = mongoose.model("Article", articleSchema);

// requests targeting all articles
app.route("/articles")
  .get((req,res) => {
        Article.find({}, (err, foundArticles) => {
        if(err){
            res.send("an error has occured");
        }
        else{
            res.send(foundArticles);
        }
        });
    })
  .post((req,res) => {
        const article = new Article({
            title:req.body.title,
            content: req.body.content,
        });
        article.save(err => {
            if(err){
                res.send(err);
            }
            else{
                res.send("successfuly added a new item");
            }
        });
    })
    .delete((req,res) => {
        Article.deleteMany((err) => {
            if(err){
                res.send("an error has occured with deleting all articles");
            }
            else{
                res.send("successfully deleted all articles")
            }
        });
    });


//requests targeting a specific article

app.route("/articles/:articleTitle")
.get((req,res) => {
    Article.findOne({title: req.params.articleTitle}, (err, foundArticle) => {
        if(foundArticle){
            res.send(foundArticle);
        }
        else{
            res.send("no articles matching that articles title");
        }
    });
})
.put((req,res) => {
    Article.update(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        {overwrite: true},
         (err) => {
            if(err){
                res.send("an error has occured with chaning the article");
            }
            else{
                res.send("the article has changed");
            }
         });
})
.patch((req, res) => {
    Article.updateOne(
        {title: req.params.articleTitle},
        {$set: req.body},
        (err) => {
            if(err){
                res.send("an error has occured with the patch");
            }
            else{
                res.send("successfully updated the article");
            }
        }
    );
})
.delete((req, res) => {
    Article.deleteOne(
        {title: req.params.articleTitle},
        (err) => {
            if(err){
                res.send("an error has occured deleting the spesific article");
            }
            else{
                res.send("successfully deleted the article");    
            }
        }
    );
});


app.listen(3000, () => {
    console.log("server started on port 3000");
});