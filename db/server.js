// bringing in dependencies 
let express = require("express");
let path = require("path");
// defining server variables
const app = express();
const PORT = process.env.PORT || 8080;
// bininging in middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
// start the server listining on PORT
app.listen(PORT,function(){
    console.log("Server launched on PORT:" + PORT);
});