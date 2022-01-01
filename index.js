const express = require('express'),{createHash} = require("crypto"), fs = require("fs");
const app = express();
app.use(express.urlencoded());
app.get('/', (req, res) => res.sendfile("index.html"));

app.listen(3000, () => {
  console.log('server started');
});
app.get("/signup",(req,res) => res.sendfile("signup.html"));
app.post("/signup",(req,res) => {
	const code = createHash("sha256").update(req.body.secretcode).digest("hex");
	fs.writeFileSync("parentcode.txt",code);
	res.send("success");
});
app.post("/parent",(req,res) => {
	const code = createHash("sha256").update(req.body.secretcode).digest("hex");
	if(code==fs.readFileSync("parentcode.txt")){
		res.sendfile("parent.html")
	}else{
		res.redirect("/");
	}
});