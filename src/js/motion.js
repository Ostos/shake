var start,
	delay = 3000;

function deviceMotionHandler(e) {
	
	if(!start) {
		start = Date.now();
	}
	
	if((Date.now() > start + delay) && 
	((Math.abs(e.acceleration.x) + Math.abs(e.acceleration.y) +Math.abs(e.acceleration.z)) > 10)){			
		var lis = document.getElementsByClassName("motion");
		
		// acceleration is expressed in m/s^2
		lis[0].innerHTML = e.acceleration.x;
		lis[1].innerHTML = e.acceleration.y;
		lis[2].innerHTML = e.acceleration.z;
		lis[3].innerHTML = e.accelerationIncludingGravity.x;
		lis[4].innerHTML = e.accelerationIncludingGravity.y;
		lis[5].innerHTML = e.accelerationIncludingGravity.z;
		// rotation rate expressed in deg/s
		lis[6].innerHTML = e.rotationRate.alpha;
		lis[7].innerHTML = e.rotationRate.beta;
		lis[8].innerHTML = e.rotationRate.gamma;
		lis[9].innerHTML = e.interval;
		lis[10].innerHTML = Math.abs(e.acceleration.x);
		lis[11].innerHTML = Math.abs(e.acceleration.y);
		lis[12].innerHTML = Math.abs(e.acceleration.z);
		lis[13].innerHTML = Math.abs(e.acceleration.x) + Math.abs(e.acceleration.y) +Math.abs(e.acceleration.z);
		start = null;	
	}
}

if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', deviceMotionHandler);
} 