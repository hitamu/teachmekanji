import http from 'http';

let selfCalling = () => {
	const options = {
		host: 'https://teachmekanji.herokuapp.com',
		port: 80
	};
	http.get(options, res => {
		console.log(res)
		res.on('data', chunk => {
			try {
	            // optional logging... disable after it's working
	            console.log("HEROKU RESPONSE: " + chunk);
	        } catch (err) {
	            console.log(err.message);
	        }
		}).on('error', function(err) {
        	console.log("Error: " + err.message);
    	});		
	});
};

let keepAlive = () => {
	const duration = 20 * 60 * 1000;
	setInterval(selfCalling, duration);
};

keepAlive();