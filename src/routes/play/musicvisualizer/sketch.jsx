import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";
import { useEffect } from "react";
/*
AUDIO VISUALIZER

This is a program that is interactive and responsive to the background sound, music.

Import your own music to the program by selecting the input file html element.
Once the audio file is imported then you can play the music and set a volume for it.

Enjoy the audio visualizer!

-There is an example music attached to the project, so you can use it as well.
*/

export default function MusicVisualizer() {
  let p5 = null;
  let shape = null; // Variable that will contain a main shape
  // Creating sound variables
  let music = null; // Contains music imported by the user
  let fft = null; // Contains p5.FFT element
  let amp = null; // Contains p5.Amplitude element

  // HTML DOM
  let controlDiv; // Container
  let playButton; // Button
  let fileInput; // File input (for the music)
  let volumeSlider; // Volume slider

  let frame_counter = 0; // Counts frames that help with changing previous size of the shape

  const setup = (_p5, canvasParentRef) => {
    p5 = _p5;
    p5.createCanvas(
      canvasParentRef.parentElement.clientWidth,
      canvasParentRef.parentElement.clientHeight
    ).parent(canvasParentRef);

    // Button
    controlDiv = p5.createDiv();
    controlDiv.addClass(
      "absolute w-full md:w-3/4 lg:w-1/2 text-white bottom-10 left-1/2 -translate-x-1/2 place-self-center grid grid-cols-2 gap-y-2 place-items-center"
    );
    controlDiv.parent(canvasParentRef);

    playButton = p5.createButton("Play"); // Creating button with play text
    playButton.mousePressed(handleMusicStatus); // Adding functionality to the button
    playButton.addClass(
      "text-black text-sm font-bold bg-white px-4 py-1 rounded-lg border-2 border-gray-500"
    );
    playButton.parent(controlDiv);

    // File Input
    fileInput = p5.createFileInput(checkTheFile); // Creating html file input with callback function
    fileInput.parent(controlDiv);

    // Silder
    volumeSlider = p5.createSlider(0, 100, 80, 10); // Creating volume slider
    volumeSlider.addClass("col-span-2");
    volumeSlider.parent(controlDiv);

    shape = new Shape(); // Creating new shape and saving it in the shape variable

    //Modyfing the sound, creating new elements
    // music = new window.p5.SoundFile();
    fft = new window.p5.FFT();
    amp = new window.p5.Amplitude();

    p5.rectMode(p5.CENTER); // Setting up mode for any rect in the program, rect is centered
  };

  useEffect(() => {
    return () => {
      p5.remove();
    };
  }, []);

  const draw = () => {
    shape.size = p5.floor(p5.map(amp.getLevel(), 0, 0.1, 60, 180)); // Changing the shape size depending on the amplitude level on the frame start

    p5.background(60); // p5.filling the background with gray color
    Title(); // Drawing the title
    if (music) music.setVolume(p5.map(volumeSlider.value(), 0, 100, 0, 1)); // If the music is imported then make the volume slider ready to change the volume

    if (music?.isPlaying() && fft) Wave(); // If the music is playing then show the wave
    if (amp) Bars(); // Drawing bars

    shape.draw(); // Drawing the main shape

    frame_counter++; // Always count frames

    // If the frame is even
    if (frame_counter % 2 == 0) {
      frame_counter = 0; // Reset the frame counter
      shape.psize = shape.size; // Set the previous size
    }
  };

  // Shape function with constructor
  class Shape {
    constructor() {
      this.col = p5.color(255, 255, 255); // Color of the shape
      this.size = 100; // Size of the shape
      this.psize = 100; // Previous size of the shape
      this.opacity = 255; // Alpha, opacity of the shape
      this.state = 1; // State that represents different shape patterns
    }
    draw() {
      // Function that displays shape on the screen
      // If there is a small sound difference
      if (this.size > this.psize * 1.2) {
        let tintDiff = p5.map(this.size - this.psize, 0, 80, 0, 255); // Mapping the shape sizes difference to shape opacity variable
        this.opacity = tintDiff; // Changing the opacity with calculated tint
        this.col = p5.color(
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
      p5.noFill(); // Removing the p5.fill

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
          p5.triangle(
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
          p5.triangle(
            p5.width / 2 - this.size / 2,
            p5.height / 2 + this.size / 2,
            p5.width / 2,
            p5.height / 2 - this.size / 2,
            p5.width / 2 + this.size / 2,
            p5.height / 2 + this.size / 2
          );
          break; // Triangle
      }
    }
  }

  // Function that draws colorful wave responsive to sound
  function Wave() {
    let wave = fft.waveform(); // Creating new fft
    p5.noFill(); // Removing p5.fill

    // Starting to draw a shape, so the wave is infinite and without any free space
    p5.beginShape();
    p5.strokeWeight(2); // Changing wave thickness
    p5.stroke(
      p5.color(p5.random(0, 256), p5.random(0, 256), p5.random(0, 256))
    ); // p5.randomize color in every point in the wave

    //Draw the wave along the x axis on the screen
    for (let i = 0; i < p5.width; i++) {
      let idx = p5.floor(p5.map(i, 0, p5.width, 0, wave.length - 1));

      let x = i; // Vertex for every x position available in the canvas
      let y = wave[idx] * 100 + p5.height / 2; // Vertex y postion depending on sound level

      p5.vertex(x, y); // Draw wave point
    }
    p5.endShape();
  }

  // Function that draws "Bars"
  function Bars() {
    // Creating barsp5.widths depending on amplitude level
    let bar1 = p5.floor(p5.map(amp.getLevel(), 0, 0.05, 0, 50)); // Thep5.width is spreading low
    let bar2 = p5.floor(p5.map(amp.getLevel(), 0, 0.05, 0, 100)); // thep5.width is spreading medium
    let bar3 = p5.floor(p5.map(amp.getLevel(), 0, 0.05, 0, 150)); // Thep5.width is spreading high

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

  // Callback function for the button
  function handleMusicStatus() {
    // If file is imported
    if (music) {
      // If the music is not playing
      if (!music.isPlaying()) {
        music.loop(); // Play the music and loop it
        playButton.html("Stop"); // Change the label of the button
        fft = new window.p5.FFT(); // Restart fft element
        amp = new window.p5.Amplitude(); // Restart amp element
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
    if (file?.type === "audio") {
      if (music) music.pause(); // Pause the music on start to prevent any bugs
      music = p5.loadSound(file.data); // Save the imported music to the p5 variable so it can be interactive with audio visualizer
    }
  }

  // Function that draws the title of the program
  function Title() {
    p5.textSize(40); // Text size
    p5.textAlign(p5.CENTER); // Text align
    p5.fill(255); // White p5.fill
    p5.stroke(255); // White outline
    p5.strokeWeight(1); // Normal thickness of the outline
    p5.text("Audio Visualizer", p5.width / 2, p5.textAscent()); // Drawing text, the title
  }

  return <Sketch setup={setup} draw={draw} />;
}
