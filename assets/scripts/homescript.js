const text = document.getElementById("text").innerHTML;
let i = 0;
let speed = 50;

// Typewriter text home
function typeWriter() {
  if (i <= text.length) {
    document.getElementById("text").innerHTML = text.slice(0, i + 1);
    i++;
    setTimeout(typeWriter, speed);
  }
}
typeWriter();