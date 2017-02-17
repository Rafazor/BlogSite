var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    app         = express();

// Setup initial    
mongoose.connect("mongodb://localhost/blog_site");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE/MODEL Config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//   title: "Test Blog",
//   image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS6vlRTlRQ77xYzsW47pQIXytxOz3ZHK42erxY9t8t76qJEb5FxAw",
//   body: "Minge Tampita dsdasdasda adsaaaaaaaaa"
// });

//REST Routes
app.get("/", function(req, res) {
    res.redirect("/blogs");
});

// index Route
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err)
         console.log(err)
        else
          res.render("index", {blogs: blogs});
    });
});

// new Route
app.get("/blogs/new", function(req, res) {
        res.render("new");
});

// Create Route
app.post("/blogs", function(req, res){
    //create blog
    Blog.create(req.body.blog, function(err, newBlog){
       if(err){
        res.render("new");  
       } else {
        res.redirect("/blogs");        
        }
    });
});

// Show Route
app.get("/blogs/:id", function(req, res) {
   Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       } else {
           res.render("show", {blog: foundBlog});
       }
   })
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Start Server!"); 
});