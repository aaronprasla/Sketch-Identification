function preload() {
	classifier = ml5.imageClassifier('DoodleNet')
}

function setup() {
	canvas = createCanvas(280, 280);
	canvas.position(495, 210);
	background('white');
	canvas.mouseReleased(classifyCanvas);
	synth = window.speechSynthesis;
}

function draw() {
	strokeWeight(13);
	stroke(0);

	if(mouseIsPressed){
		line(pmouseX, pmouseY, mouseX, mouseY);
	}
}

function clearCanvas() {
	background('white');
}

function classifyCanvas() {
	classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
	if(error){
		console.error(error);
	}

	console.log(results);

	res = results[0].label;
	res1 = res.replace('_', ' ');

	document.getElementById('label').innerHTML = 'Label: ' + res1;
	document.getElementById('confidence').innerHTML = 'Confidence: ' + Math.floor(results[0].confidence * 100) + '%';

	utterThis = new SpeechSynthesisUtterance(res1);
	synth.speak(utterThis);
}