var config = {
    apiKey: "AIzaSyBLQ08BEiBlFHH-9_pVa7XIIaZ_7bRR5dg",
    authDomain: "trainproject-3b92a.firebaseapp.com",
    databaseURL: "https://trainproject-3b92a.firebaseio.com",
    projectId: "trainproject-3b92a",
    storageBucket: "",
    messagingSenderId: "213225532757"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var destination = "";
var firstTime = "";
var freq = 0;

$("#submit").on("click", function(){

    event.preventDefault();

    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = $("#start-input").val().trim();
    var freq = $("#freq-input").val().trim();

    var trainData = {
        name: name,
        destination: destination,
        firstTime: firstTime,
        freq: freq,
    };

    database.ref().push(trainData);
  

    $("#form-id").each(function(){
            this.reset();
    });

});

database.ref().on("child_added", function (childSnapshot) {


    var nameDiv = childSnapshot.val().name;
    var destinationDiv = childSnapshot.val().destination;
    var startDiv = childSnapshot.val().firstTime;
    var freqDiv = childSnapshot.val().freq;
    

    // Convert firstTime into format Moment.js can use
    var convertFirst = moment(startDiv, "hh:mm").subtract(1, "years");
    console.log(convertFirst);

        
    var diffTime = moment().diff(moment(convertFirst), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % freqDiv;
    console.log(tRemainder);

    var tMinutesTillTrain = freqDiv - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    var trainArrival = moment(nextTrain).format("hh:mm A");


    $("#employee-display > tbody").append("<tr><td>" + nameDiv + "</td><td>" + destinationDiv + "</td><td>"
  + freqDiv + "</td><td>" + trainArrival + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});