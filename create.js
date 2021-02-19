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


function setup() {
  createCanvas(700, 700);
  // var canvas = document.getElementbyId("canvas");
  // canvas.parent('canvascontainer');
  capture = createCapture(VIDEO);
  capture.hide();

  pg = createGraphics(width, height);

  poseNet = ml5.poseNet(capture, modelLoaded);
  poseNet.on('pose', gotPoses);
  // background(255)

  //create radio buttons
  radio = createRadio();
  radio.option('Right Hand');
  radio.option('Left Hand');
  radio.option('Nose');
  radio.style('width', '100px');
  radio.position(50, 70);
  textAlign(CENTER);
  fill(255, 0, 0);
  
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
  translate(width, 0); // move to far corner
  scale(-1.0, 1.0); // flip x-axis backwards
  image(capture, 0, 0, width, width * capture.height / capture.width);
  image(pg, 0, 0, width, height);
  filter(GRAY);

  let val = radio.value();

  if (val == "Nose") {
    drawNose();
    // console.log('Nose selected');
  } else if (val == "Right Hand") {
    drawRightHand();
    // console.log('Right hand selected');
  } else if (val == "Left Hand") {
    drawLeftHand();
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

// //get html elements
  var submitBtn = document.getElementById("submit");
  var name = document.getElementById("name");
  var canvas = document.getElementsByTagName("canvas");

//   //create reference for firebase
//   var db = firebase.firestore();
//   var storageRef = firebase.storage().ref();

//   //add event listener for button
  submitBtn.addEventListener("click", e => {
    // var user = name.value;
    // db.collection("users")
    //   .add({
    //     name: user,
    //   })
    //   .then(function(docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    //   })
    //   .catch(function(error) {
    //     console.error("Error adding document: ", error);
    //   });
    // var full = user;
    saveImage(Shayan);
  });

  function saveImage(name) {
    canvas.toBlob(function(blob) {
      var image = new Image();
      image.src = blob;
      console.log('image', image)
      var metadata = {
        contentType: "image/png"
      };

//       storageRef
//         .child("images/" + name)
//         .put(blob, metadata)
//         .then(function(snapshot) {
//           console.log("Uploaded", snapshot.totalBytes, "bytes.");
//           window.location.href = "gallery.html";
//         })
//         .catch(function(error) {
//           // [START onfailure]
//           console.error("Upload failed:", error);
//         });
//     });
//   }
// ();


//   var submitBtn = document.getElementById("submit");
//   var name = document.getElementById("name");
//   var canvas = document.getElementsByTagName("canvas");


//   submitBtn.addEventListener("click", e => {
    
//     console.log("canvas",canvas.toDataURL("image/png"));
//     var image = canvas.toDataURL("image/png");
//     document.write('<img src="'+image+'"/>');

//   });
