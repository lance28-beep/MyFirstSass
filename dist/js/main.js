const menuBtn = document.querySelector(".menu-btn");
const hamburger = document.querySelector(".menu-btn__burger");
const nav = document.querySelector(".nav");
const menuNav = document.querySelector(".menu-nav");
const navItems = document.querySelectorAll(".menu-nav__item");

let showMenu = false;

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    hamburger.classList.add("open");
    nav.classList.add("open");
    menuNav.classList.add("open");
    navItems.forEach((item) => item.classList.add("open"));

    showMenu = true;
  } else {
    hamburger.classList.remove("open");
    nav.classList.remove("open");
    menuNav.classList.remove("open");
    navItems.forEach((item) => item.classList.remove("open"));

    showMenu = false;
  }
}

//typing effect
const typeWriter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

//type method
typeWriter.prototype.type = function () {
  //current index of words
  const current = this.wordIndex % this.words.length;
  //get full text of current word
  const fullTxt = this.words[current];
  //check if deleting
  if (this.isDeleting) {
    //remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    //add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  //insert tct intp element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  //initial typeSpeed
  let typeSpeed = 300;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  //if words is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    //make a pause at end
    typeSpeed = this.wait;
    //set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    //move to the next words
    this.wordIndex++;
    //pause before start typing
    typeSpeed = 500;
  }
  setTimeout(() => this.type(), typeSpeed);
};
//init on dom loadd
document.addEventListener("DOMContentLoaded", init);

//init app
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("add-wait");
  //init typewriter
  new typeWriter(txtElement, words, wait);
}
