var express     = require("express"),
    methodOverride = require("method-override"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    app         = express();

// Setup initial    
mongoose.connect("mongodb://localhost/blog_site");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

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

// Edit Route
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog}); 
        }
    });
});

//Update Route
app.put("/blogs/:id", function(req, res){
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
      if(err){
          res.redirect("/blogs");
      } else {
          res.redirect("/blogs/" + req.params.id);
      }
   });
});

//Delete Route
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    })
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Start Server!"); 
});