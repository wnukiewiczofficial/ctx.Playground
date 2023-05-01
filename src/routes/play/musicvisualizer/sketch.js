/*
AUDIO VISUALIZER

This is a program that is interactive and responsive to the background sound, music.

Import your own music to the program by selecting the input file html element.
Once the audio file is imported then you can play the music and set a volume for it.

Enjoy the audio visualizer!

-There is an example music attached to the project, so you can use it as well.
*/

var shape; // Variable that will contain a main shape

// Shape function with constructor
function Shape() {
  this.col = color(255, 255, 255); // Color of the shape
  this.size = 100; // Size of the shape
  this.psize = 100; // Previous size of the shape
  this.opacity = 255; // Alpha, opacity of the shape
  this.state = 1; // State that represents different shape patterns
  this.draw = () => {
    // Function that displays shape on the screen

    // If there is a small sound difference
    if (this.size > this.psize * 1.2) {
      let tintDiff = map(this.size - this.psize, 0, 80, 0, 255); // Mapping the shape sizes difference to shape opacity variable
      this.opacity = tintDiff; // Changing the opacity with calculated tint
      this.col = color(
        p5.random(0, 256),
        p5.random(0, 256),
        p5.random(0, 256),
        this.opacity
      ); // Changing the color to p5.random one
    }
    // If there is a medium sound difference
    if (this.size > this.psize * 1.3) this.state = p5.floor(p5.random(1, 6)); // Changing the state to the p5.random one
    p5.stroke(this.col); // Making outline in the shape color
    p5.strokeWeight(5); // Changing the outline size
    nop5.fill(); // Removing the p5.fill

    // Draw outlined shape in the previous size
    switch (this.state) {
      case 1:
        p5.circle(p5.width / 2, p5.height / 2, this.psize);
        break; // p5.circle
      case 2:
        p5.rect(p5.width / 2, p5.height / 2, this.psize);
        break; // Square
      case 3:
        p5.rect(p5.width / 2, p5.height / 2, this.psize, this.psize / 2);
        break; // Horizontal rectangle
      case 4:
        p5.rect(p5.width / 2, p5.height / 2, this.psize / 2, this.psize);
        break; // Vertical rectangle
      case 5:
        triangle(
          p5.width / 2 - this.psize / 2,
          p5.height / 2 + this.psize / 2,
          p5.width / 2,
          p5.height / 2 - this.psize / 2,
          p5.width / 2 + this.psize / 2,
          p5.height / 2 + this.psize / 2
        );
        break; // Triangle
    }

    p5.noStroke(); // Removing outline
    p5.fill(this.col); // p5.filling the shape with given color

    // Draw p5.filled shape in the current size
    switch (this.state) {
      case 1:
        p5.circle(p5.width / 2, p5.height / 2, this.size);
        break; // p5.circle
      case 2:
        p5.rect(p5.width / 2, p5.height / 2, this.size);
        break; // Square
      case 3:
        p5.rect(p5.width / 2, p5.height / 2, this.size, this.size / 2);
        break; // Horizontal rectangle
      case 4:
        p5.rect(p5.width / 2, p5.height / 2, this.size / 2, this.size);
        break; // Vertical rectangle
      case 5:
        triangle(
          p5.width / 2 - this.size / 2,
          p5.height / 2 + this.size / 2,
          p5.width / 2,
          p5.height / 2 - this.size / 2,
          p5.width / 2 + this.size / 2,
          p5.height / 2 + this.size / 2
        );
        break; // Triangle
    }
  };
}

// Function that draws colorful wave responsive to sound
function Wave() {
  let wave = fft.waveform(); // Creating new fft
  nop5.fill(); // Removing p5.fill

  // Starting to draw a shape, so the wave is infinite and without any free space
  beginShape();
  p5.strokeWeight(2); // Changing wave thickness
  p5.stroke(color(p5.random(0, 256), p5.random(0, 256), p5.random(0, 256))); // p5.randomize color in every point in the wave

  //Draw the wave along the x axis on the screen
  for (let i = 0; i < p5.width; i++) {
    let idx = p5.floor(map(i, 0, p5.width, 0, wave.length - 1));

    let x = i; // Vertex for every x position available in the canvas
    let y = wave[idx] * 100 + p5.height / 2; // Vertex y postion depending on sound level

    vertex(x, y); // Draw wave point
  }
  endShape();
}

// Function that draws "Bars"
function Bars() {
  // Creating barsp5.widths depending on amplitude level
  let bar1 = p5.floor(map(amp.getLevel(), 0, 0.05, 0, 50)); // Thep5.width is spreading low
  let bar2 = p5.floor(map(amp.getLevel(), 0, 0.05, 0, 100)); // thep5.width is spreading medium
  let bar3 = p5.floor(map(amp.getLevel(), 0, 0.05, 0, 150)); // Thep5.width is spreading high

  p5.noStroke(); // Removing outline
  p5.fill(shape.col); // p5.filling the bar with main shape color

  // Drawing bars
  p5.rect(p5.width / 2, p5.height * 0.2 + 20, bar1, 2);
  p5.rect(p5.width / 2, p5.height * 0.2 + 10, bar2, 2);
  p5.rect(p5.width / 2, p5.height * 0.2, bar3, 2);

  p5.rect(p5.width / 2, p5.height * 0.8 - 20, bar1, 2);
  p5.rect(p5.width / 2, p5.height * 0.8 - 10, bar2, 2);
  p5.rect(p5.width / 2, p5.height * 0.8, bar3, 2);
}

// Creating sound variables
var music; // Contains music imported by the user
var fft; // Contains p5.FFT element
var amp; // Contains p5.Amplitude element

// HTML DOM
var playButton; // Button
var fileInput; // File input (for the music)
var volumeSlider; // Volume slider

var frame_counter = 0; // Counts frames that help with changing previous size of the shape

// P5JS SETUP
function setup(p5, canvasParentRef) {
  p5.createCanvas(windowWidth, windowHeight); // Creating canvas in the whole client window

  // Button
  playButton = createButton("Play"); // Creating button with play text
  playButton.position(p5.width / 2 - 100, 50); // Positioning button
  playButton.mousePressed(handleMusicStatus); // Adding functionality to the button

  // File Input
  fileInput = createFileInput(checkTheFile); // Creating html file input with callback function
  fileInput.position(p5.width / 2 - 50, 50); // Positioning input

  // Silder
  volumeSlider = createSlider(0, 100, 80, 10); // Creating volume slider
  volumeSlider.position(p5.width / 2 - 100, 70); // Positioning slider

  shape = new Shape(); // Creating new shape and saving it in the shape variable

  //Modyfing the sound, creating new elements
  music = new p5.SoundFile();
  fft = new p5.FFT();
  amp = new p5.Amplitude();

  rectMode(p5.CENTER); // Setting up mode for any rect in the program, rect is centered
}

// Callback function for the button
function handleMusicStatus() {
  // If file is imported
  if (music) {
    // If the music is not playing
    if (!music.isPlaying()) {
      music.loop(); // Play the music and loop it
      playButton.html("Stop"); // Change the label of the button
      fft = new p5.FFT(); // Restart fft element
      amp = new p5.Amplitude(); // Restart amp element
    } else {
      // If playing
      music.pause(); // Pause the music
      playButton.html("Play"); // Change the label of the button
    }
  }
}

// Callback function for the succesful music import
function checkTheFile(file) {
  // If the imported file is an audio file
  if (file.type === "audio") {
    music.pause(); // Pause the music on start to prevent any bugs
    music = p5.loadSound(file.data); // Save the imported music to the p5 variable so it can be interactive with audio visualizer
  }
}

// Function that draws the title of the program
function Title() {
  p5.textSize(40); // Text size
  textAlign(p5.CENTER); // Text align
  p5.fill(255); // White p5.fill
  p5.stroke(255); // White outline
  p5.strokeWeight(1); // Normal thickness of the outline
  p5.text("Audio Visualizer", p5.width / 2, p5.textAscent()); // Drawing text, the title
}

// P5JS DRAW
function draw() {
  shape.size = p5.floor(map(amp.getLevel(), 0, 0.1, 60, 180)); // Changing the shape size depending on the amplitude level on the frame start

  p5.background(60); // p5.filling the background with gray color
  Title(); // Drawing the title

  if (music) music.setVolume(map(volumeSlider.value(), 0, 100, 0, 1)); // If the music is imported then make the volume slider ready to change the volume

  if (music.isPlaying()) Wave(); // If the music is playing then show the wave
  Bars(); // Drawing bars

  shape.draw(); // Drawing the main shape

  frame_counter++; // Always count frames

  // If the frame is even
  if (frame_counter % 2 == 0) {
    frame_counter = 0; // Reset the frame counter
    shape.psize = shape.size; // Set the previous size
  }
}
