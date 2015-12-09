(function() {
	var start,
	delay = 3000,
	state = 1,
	isFinished = false,
	body = document.getElementsByTagName("body")[0];
	
	function changeState() {
		if(state < 5){
			body.classList.remove("state-" + state);
			state++;
			body.classList.add('state-' + state);
		} else {
			isFinished = true;
		}
	}

	function deviceMotionHandler(e) {
		
		if(isFinished === false) {
			if(!start)
				start = Date.now();
		
			if((Date.now() > start + delay) && ((Math.abs(e.acceleration.x) + Math.abs(e.acceleration.y) +Math.abs(e.acceleration.z)) > 10)){			
				changeState();
				start = null;	
			}
		}

	}
	
	if (window.DeviceMotionEvent)
		window.addEventListener('devicemotion', deviceMotionHandler);
	
})();