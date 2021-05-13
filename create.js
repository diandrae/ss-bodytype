let capture;
let poseNet;
let newPose = {};

let pg;

let pNoseX;
let pNoseY;

let partSelected;

let radio;

let timer = 10

let video;

radioFlag = false;

var alphabetLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

var isDrawing = true;

//following Lisa Jamhoury's Keypoint Smoothing https://javascript.plainenglish.io/simple-smoothing-for-posenet-keypoints-cd1bc57f5872
// this sketch uses es6 modules, so window.setup is needed
// see https://bl.ocks.org/GoSubRoutine/da4939559d8b786df13f5694ea2edd30
function setup() {
  createCanvas(640,480);
  pg = createGraphics(width,height);

  radio = createRadio();
  radio.option('Right Hand');
  radio.option('Left Hand');
  radio.option('Nose');

  video = createCapture(VIDEO);
 video.size(width, height);
 video.hide();

 player1 = new Player();

 // flip posenet data to mirror user
 const options = {
   flipHorizontal: true,
 };
 poseNet = ml5.poseNet(video, options, modelReady);
  poseNet.on('pose', (results) => getPose(results));
};


    poseNet = ml5.poseNet(capture, modelLoaded);
    poseNet.on('pose', gotPoses);
};

window.draw = function () {
  background(255);

  if (updatePose === true) {
    player1.update(newPose);
    updatePose = false;
  }

  // wait for pose data to draw
  if (typeof player1.pose === 'undefined') {
    console.log('waiting for player1 pose!');
    return;
  }

   if(isDrawing) {
  push();
  translate(width, 0); // move to far corner
  scale(-1.0, 1.0); // flip x-axis backwards
  image(video, 0, 0, width, height-30);
    pop();
   } else {
    background(255);
  }
  push();
   image(pg, 0, 0, width, height);
    pop();


  if (frameCount % 60 == 0 && timer > 0 && radioFlag) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer --;
  }
  if (timer == 9) {
     textSize(40);
    text('GET READY IN 3', width/4, height/2);
  }
  if (timer == 8) {
     textSize(40);
    text('GET READY IN 2', width/4, height/2);
  }
  if (timer == 7) {
     textSize(40);
    text('GET READY IN 1', width/4, height/2);
  }
   if (timer == 6) {
      textSize(30);
    text('YOU HAVE 5 SECONDS TO DRAW', width/6, height/2);
  }
  if (timer <= 6 ) {
 textSize(30);
  text(timer,width/2,height);
  }
if (timer == 0 ) {
   stopDrawing();
    loop();

  }

let val = radio.value();

 if (val == "Nose") {
   radioFlag=true;
   setTimeout(drawNose,7000);
 } else if (val == "Right Hand") {
   radioFlag=true;
    setTimeout(drawRightHand,7000);
 } else if (val == "Left Hand") {
   radioFlag=true;
    setTimeout(drawLeftHand,7000);
 }

  if( frameCount >= timeLimit ){
   noLoop();
   push();
   strokeWeight(0);
   pop();
 }

};

function drawNose() {
  player1.draw(0);
}

function drawRightHand() {
  player1.draw(10);
}

function drawLeftHand() {
  player1.draw(9);
}

// When posenet model is ready, let us know!
function modelReady() {
  console.log('Model Loaded');
}

// Get pose from posenet
function getPose(poses) {
  if (typeof poses[0] !== 'undefined') {
    newPose = poses[0];
    updatePose = true;
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
    var letter = document.getElementById("letter");
    console.log(name.value)
    button.onclick = function(){
      const ref = firebase.storage().ref()
      .child(letter.value + name.value + "-" + new Date())
      .then(function(snapshot){
        button.remove();
        alert("Image Uploaded")

        snapshot.ref.getDownloadURL().then(function(downloadURL) {

          var record = {
            downloadUrl,
            letter
          };
          firestore.collection('images').add(record);
          // console.log('File available at', downloadURL);
          // create a record in firestore
        });

      });
  };
});

  function madlibs(alphabetLetters) {
    var alphabetLetter = alphabetLetters[Math.floor(Math.random() * alphabetLetters.length)];
    return "Move to create your own version of the letter" + " " + alphabetLetter ;
  }

  function generator(){
    var heading = document.getElementById('alphabetHeading');
    heading.innerHTML = madlibs(alphabetLetters)
  }
