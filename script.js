const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const browser_width = window.innerWidth;
const browser_height = window.innerHeight;

// Make the Canvas White
ctx.fillStyle = "white";
ctx.fillRect(0, 0, browser_width, browser_height);
