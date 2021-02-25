let capture;
let poseNet;
let pose;
let pg;

let pNoseX;
let pNoseY;

let pRightWristX;
let pRightWristY;

let pLeftWristX;
let pLeftWristY;

let radio;

var canvas;

let cameraImage;

let timer = 5


function setup() {
  createCanvas(700, 700);
  capture = createCapture(VIDEO);
  capture.hide();

  pg = createGraphics(width, height);

  poseNet = ml5.poseNet(capture, modelLoaded);
  poseNet.on('pose', gotPoses);

  radio = createRadio();
  radio.option('Right Hand');
  radio.option('Left Hand');
  radio.option('Nose');
  radio.style('width', '100px');
  radio.position(50, 70);
  textAlign(CENTER);
  fill(255, 0, 0);
  background(255);

}

function gotPoses(poses) {

  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
  }
}

function modelLoaded() {
  console.log('poseNet.ready');
}

function draw() {
  //create timer
  pg.textAlign(CENTER, CENTER);
  pg.textSize(100);
  pg.text(timer, 600,600);

  translate(width, 0); // move to far corner
  scale(-1.0, 1.0); // flip x-axis backwards
  cameraImage = image(capture, 0, 0, width, width * capture.height / capture.width);
  image(pg, 0, 0, width, height);
  filter(GRAY);

  if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer --;
  }
  if (timer == 0) {
   stopDrawing();
  }


  let val = radio.value();

  if (val == "Nose") {
  setTimeout(drawNose,4000);
    // console.log('Nose selected');
  } else if (val == "Right Hand") {
    setTimeout(drawRightHand,4000);
    // console.log('Right hand selected');
  } else if (val == "Left Hand") {
  setTimeout(drawLeftHand,4000);
    // console.log('Left hand selected');
  }
}

function drawNose() {
  if (pose) {

    pg.stroke(255, 255, 255);
    pg.strokeWeight(40);
    pg.line(pose.nose.x, pose.nose.y, pNoseX, pNoseY);

    pNoseX = pose.nose.x;
    pNoseY = pose.nose.y;

  }
}

function drawRightHand() {
  if (pose) {

    pg.stroke(255, 255, 255);
    pg.strokeWeight(20);
    pg.line(pose.rightWrist.x, pose.rightWrist.y, pRightWristX, pRightWristY);

    pRightWristX = pose.rightWrist.x;
    pRightWristY = pose.rightWrist.y;

  }
}

function drawLeftHand() {
  if (pose) {

    pg.stroke(255, 255, 255);
    pg.strokeWeight(20);
    pg.line(pose.leftWrist.x, pose.leftWrist.y, pLeftWristX, pLeftWristY);

    pLeftWristX = pose.leftWrist.x;
    pLeftWristY = pose.leftWrist.y;

  }
}


  var submitBtn = document.getElementById("submit");
  var canvas = document.getElementsByTagName("canvas");


  submitBtn.addEventListener("click", e => {


    var image = new Image()
    image.id= 'pic'
    image.src= canvas.toDataURL('image/png')

    console.log(image.src)


    var button = document.createElement('button')
    button.textContent='Upload Image'
    document.getElementById("submitForm").appendChild(button)
    var name = document.getElementById("name");
    console.log(name.value)
    button.onclick = function(){
      const ref = firebase.storage().ref()
      ref.child(name.value +'-' + new Date()).putString(image.src,'data_url')
      .then(function(snapshot){
        button.remove();
        alert("Image Uploaded")

      })
    }

  });
