const port = 8080;
const api = "api";
const host = "localhost";
const rutaSave="save"
onmessage = evento =>{
	fetch(`http://${host}:${port}/${api}/${rutaSave}/${evento.data}`,{
			   method: "PUT",
			}).then(res=>
					postMessage(res.status)
				);
	
}