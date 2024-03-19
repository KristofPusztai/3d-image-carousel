# 3D Image Carousel

This repo was inspired by Lun Dev Code's animated card slider design shown in [this youtube video](https://www.youtube.com/watch?v=Xh-wIMqohD0&ab_channel=LunDev) with some changes to reduce bandwidth usage. 

It is written in pure vanilla JavaScript and relies on CSS transformation animations, with the main change from Lun Dev Code's implementation being images loaded in dynamically (only the immediatley visible assets are loaded in to reduce bandwidth usage). Once the images are loaded in, they are arranged into a 3d "slideshow" style format as shown in the example gif below:

![example-gif](img/example.gif)

*example from [davids-wallpainting.com](https://davidbuzasi-wallpainting.com/en/)*

## Usage

example.html
```html
<div class="slideshow">
    <button class="left-button">&#8592;</button>
    <button class="right-button">&#8594;</button>
</div>
```

```css
.slideshow {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  opacity: 0;
}
.slide {
  height: auto;
  width: auto;
  max-height: 80%;
  max-width: 60%;
  position: absolute;
  transition: 0.5s;
}
.left-button,
.right-button {
  position: absolute;
  height: 50px;
  opacity: 60%;
  z-index: 1;
  border-radius: 10px;
  transition: ease-in-out;
  transition-duration: 0.3s;
}
.left-button {
  left: 20%;
}
.right-button {
  right: 20%;
}

.left-button:hover,
.right-button:hover {
  opacity: 1;
}
```

example.js
```javascript
let slideshow_class = ".slideshow" // classname of slideshow element
let images = ['path/to/img1', 'path/to/img2'] // array of pathes to each image
let starting_image_index = 1; // starting image index

// Initializing slideshow
let slides = new Slideshow(
  images,
  starting_image_index,
  slideshow_class,
  "alt-text"
);

// Left button handler to change slide to the left
document
  .querySelector(".left-button")
  .addEventListener(
    "click",
    slides.previous_slide.bind(slides)
  );

// Right button handler to change slide to the right
document
  .querySelector(".right-button")
  .addEventListener(
    "click",
    slides.next_slide.bind(slides)
  );
```