var url = require("url"),
	fs = require("fs"),
	http = require("http"),
	server;

function getResources(req,res){

	var reqData, path;

	reqData = {
		url: url.parse(req.url,true),
		method: req.method,
		headers: req.headers
	};

	path = reqData.url.pathname;

	if(path.match(/.*\.(html|js|css|map|png|woff|json|jpg|ico)$/)){
		path = "." + path;
		if(path.match(/.*\.css$/))
			serveStaticFile(res,path,"text/css");
		if(path.match(/.*\.js$/))
			serveStaticFile(res,path,"application/javascript");
		if(path.match(/.*\.html$/))
			serveStaticFile(res,path,"text/html");
		if(path.match(/.*\.map$/))
			serveStaticFile(res,path,"application/javascript");
		if(path.match(/.*\.png$/))
			serveStaticFile(res,path,"image/png");
		if(path.match(/.*\.woff$/))
			serveStaticFile(res,path,"application/x-font-woff");
		if(path.match(/.*\.json$/))
			serveStaticFile(res,path,"application/json");
		if(path.match(/.*\.jpg$/))
			serveStaticFile(res,path,"image/jpg");
		if(path.match(/.*\.ico$/))
			serveStaticFile(res,path,"image/x-icon");
	}else{
		if(path.match(/^\/([a-zA-Z0-9]+)?$/))
			serveStaticFile(res,"index.html","text/html");
	}	
}

//Sets the properties for the response object. (content type, status, headers...)
function serveStaticFile(res, path, contentType, responseCode) {
	if(!responseCode) responseCode = 200;
	fs.readFile(path, function(err,data) {
		if(err) {
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.end('404 - File Not Found');
		} else {
			res.writeHead(responseCode,{ 'Content-Type': contentType });
			res.end(data);
		}
	});
}

server = http.createServer(getResources);
server.listen(8083, function() {
	console.log("Website running in port 8083.");	
});