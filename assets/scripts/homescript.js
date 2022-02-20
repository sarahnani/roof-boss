// Typewriter text home

var i = 0;

var tag = document.getElementById("p1");
var html = document.getElementById("p1").innerHTML;

var tag = document.getElementById("p2");
var html = document.getElementById("p2").innerHTML;

var attr = tag.setAttribute("data", html);
var txt = tag.getAttribute("data");
var txt2 = tag.getAttribute("data");

var speed1 = 80;
var speed2 = 500;


function typeWriter() {
  if (i <= txt.length) {
    document.getElementById("p1").innerHTML = txt.slice(0, i + 1);
    i++;
    setTimeout(typeWriter, speed1);
    
  }
}
// function typeWriter2() {
//   if (b <= txt.length) {
//     document.getElementById("p2").innerHTML = txt2.slice(0, b + 1);
//     b++;
//     setTimeout(typeWriter, speed2);
//   }
// }

typeWriter();