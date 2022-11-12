//puts current day month and year at top of page 
var today = dayjs();
var dayWeek = today.format('[Today is] dddd, MMMM D YYYY');
$('#currentDay').text(dayWeek);
// puts dayjs values into var time and current hour
var time = dayjs();
var currenthour = time.format('h');
console.log("currenthour", currenthour);
//updates time and current hour variable every second
function updatetime() {
  time = dayjs();
  currenthour = time.format('h');
}
setInterval(updatetime, 1000);
//grabs elements from HTML and sets them to these Var's
var buttonEL = $("button");
var timeblockEL = $(".time-block");
console.log("timeblock", timeblockEL);

//sets all classes to future. so they will all be green
function settofuture() {
  for (i = 0; i < timeblockEL.length; i++) {
    j = timeblockEL[i];
    j.className = "row time-block future"
  }
}
// sets all classes to past. so they will all be gray
function settopast() {
  for (i = 0; i < timeblockEL.length; i++) {
    j = timeblockEL[i];
    j.className = "row time-block past"
  }
}
// turns time into 24hr format to better compare past present future times
hour24 = time.format("H");
//runs this function to either set everything to future or past depending on hour24 time format "H" otherwise runs settheclass function
dothisfirst();
function dothisfirst() {
  if (hour24 > 17) {
    settopast();
    console.log("settopast");
  }
  if (hour24 < 9) {
    settofuture();
    console.log("settofuture");
  }
  if (hour24 >= 9 && hour24 <= 17) {
    settheclass();
    console.log("settheclass");
  }
}
function settheclass() {
  for (i = 0; i < timeblockEL.length; i++) {
    j = timeblockEL[i];
    x = j.innerText;
    x = parseInt(x);

    j.className = "row time-block past"
    if (currenthour == x) {
      j.className = "row time-block present"
      return;
    }
  }
}


//stores user inpt into local storage. grabs the input and timeblock the input was in for naming.
buttonEL.on("click", function () {
  var userEntry = $(this).siblings("textarea").val()
  var timeblk = $(this).parent().attr("id")
  console.log(userEntry, timeblk)
  localStorage.setItem(timeblk, userEntry)

})
//runs this at start to display saved local storage items to the page
init();
function init() {
  for (let i = 9; i < 18; i++) {
    let blk;
    if (i > 12) {
      blk = "hour-" + (i - 12)
    } else {
      blk = "hour-" + i
    }
    var storedItem = localStorage.getItem(blk)
    $("#" + blk).children("textarea").val(storedItem)
    //console.log(storedItem, blk)
  }
}
