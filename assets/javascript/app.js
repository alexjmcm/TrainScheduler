 var config = {
    apiKey: "AIzaSyCUuZNtIdAs7C04WGvBJZutv37q0Ndbu5M",
    authDomain: "my-1st-project-92eeb.firebaseapp.com",
    databaseURL: "https://my-1st-project-92eeb.firebaseio.com",
    projectId: "my-1st-project-92eeb",
    storageBucket: "my-1st-project-92eeb.appspot.com",
    messagingSenderId: "1010657051420"
  };
  firebase.initializeApp(config);
    // Create a variable to reference the database
    var database = firebase.database();
var name = "";
var role = "";
var start = "";
var destination = "";
var tMinutesTillTrain = "";
var rate = 0;
var monthsWorked = 0;
var minutesAway = 0;

database.ref().on("child_added", function(childSnapshot) {
    $("#trainData").append("<tr><td>" + childSnapshot.val().name + 
    "</td><td>" + childSnapshot.val().destination + 
    "</td><td>" + childSnapshot.val().frequency + 
    "</td><td>" + childSnapshot.val().nextTrainHour +
     "</td><td>" + childSnapshot.val().tMinutesTillTrain);
 
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
$("#submit-train").on("click", function(event) {
    event.preventDefault();
    name = $("#TrainName").val().trim();
    destination = $("#destination").val().trim();
    trainTime = $("#trainStart").val().trim();
    frequency = $("#trainFrequency").val().trim();
    
    console.log(name);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);
    var firstTime = trainTime;
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainHour = moment(nextTrain).format("hh:mm");
    console.log(tRemainder);
    console.log(tMinutesTillTrain);
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

database.ref().push({
        name: name,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
        tMinutesTillTrain: tMinutesTillTrain,
        nextTrainHour: nextTrainHour        
    });   
});



  // Assume the following situations.

    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

    // Assumptions
    // var tFrequency = 3;

    // // Time is 3:30 AM
    // var firstTime = "03:30";

    // // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // // Current Time
    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // // Difference between the times
    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
    // var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // // Minute Until Train
    // var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // // Next Train
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // var firstTime = "03:30";
    // var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // var currentTime = moment();
    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // var tRemainder = diffTime % tFrequency;
    // var tMinutesTillTrain = tFrequency - tRemainder;