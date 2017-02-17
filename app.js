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

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err)
         console.log(err)
        else
          res.render("index", {blogs: blogs});
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Start Server!"); 
});