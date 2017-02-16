var express     = require("express"),
    bodyParser  = require("body-parser"),
    moongoose    = require("moongoose"),
    app         = express();

// Setup initial    
moongoose.connect("mongodb://localhost/blog_site");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));





app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Start Server!"); 
});