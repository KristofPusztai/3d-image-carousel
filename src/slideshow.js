class Slideshow {
  #element_class;
  #items;
  #rendered_items = [];
  #alt_text;
  #current;
  #num_load;
  #num_render;

  constructor(
    items,
    start,
    element_class,
    alt_text,
    num_load = 3,
    num_render = 1
  ) {
    this.#element_class = element_class;
    this.#items = items;
    this.#current = start;
    this.#alt_text = alt_text;

    console.assert(
      num_load >= num_render * 2 + 1,
      "num_load parameter needs to be greater than num_render in order to render minimum images on screen"
    );
    this.#num_load = num_load;
    this.#num_render = num_render;

    this.loadshow();
  }

  #render() {
    // Dynamic image load in
    let new_image;
    let slide_element = document.querySelector(this.#element_class);

    // Renders in frame image first
    if (this.#rendered_items[this.#current] == undefined) {
      new_image = document.createElement("img");
      new_image.className = "slide";
      new_image.alt = this.#alt_text;
      new_image.src = this.#items[this.#current];
      this.#rendered_items[this.#current] = new_image;
      slide_element.appendChild(new_image);
    }

    // Renders in side images
    for (let index = 1; index <= this.#num_load; index++) {
      let next = this.#current + index;
      if (next > this.#items.length - 1) {
        // Going around to beginning of list
        next -= this.#items.length;
      }
      let prev = this.#current - index;
      if (prev < 0) {
        // Going around to end of list
        prev += this.#items.length;
      }

      if (this.#rendered_items[prev] == undefined) {
        new_image = document.createElement("img");
        new_image.className = "slide";
        new_image.alt = this.#alt_text;
        new_image.src = this.#items[prev];
        this.#rendered_items[prev] = new_image;
        slide_element.appendChild(new_image);
      }

      if (this.#rendered_items[next] == undefined) {
        new_image = document.createElement("img");
        new_image.className = "slide";
        new_image.alt = this.#alt_text;
        new_image.src = this.#items[next];
        this.#rendered_items[next] = new_image;
        slide_element.appendChild(new_image);
      }
    }
  }

  loadshow() {
    // First checks & creates image elements
    this.#render();

    let width = window.innerWidth;

    // Hides all image elements
    for (let index = 0; index < this.#rendered_items.length; index++) {
      if (this.#rendered_items[index] != undefined) {
        this.#rendered_items[index].style.display = "none";
      }
    }

    // Applies transformations and makes visible
    for (let index = -this.#num_render; index <= this.#num_render; index++) {
      let current = this.#current + index;
      if (current > this.#items.length - 1) {
        current -= this.#items.length;
      } else if (current < 0) {
        current += this.#items.length;
      }

      if (index == 0) {
        // Main focus frame
        this.#rendered_items[current].style.transform =
          "scale(1) rotateY(0deg)";
        this.#rendered_items[current].style.opacity = 1;
        this.#rendered_items[current].style.filter = "blur(0px)";
        this.#rendered_items[current].style.display = "block";
        this.#rendered_items[current].style.zIndex = 0;
        this.#rendered_items[current].onclick = function () {
          window.open(this.#rendered_items[current].src, "_blank");
        }.bind(this);
        this.#rendered_items[current].style.cursor = "pointer";
      } else {
        // Side frames
        this.#rendered_items[current].style.transform = `translateX(${
          (Math.sign(index) * width) / (4 / (1 / Math.abs(index)))
        }px) scale(${0.4 / Math.abs(index)}) perspective(30px) rotateY(${
          -1 * Math.sign(index)
        }deg)`;
        this.#rendered_items[current].style.opacity = 0.6 / Math.abs(index);
        this.#rendered_items[current].style.filter = "blur(2px)";
        this.#rendered_items[current].style.display = "block";
        this.#rendered_items[current].style.zIndex = -1;
        this.#rendered_items[current].style.cursor = "auto";
        this.#rendered_items[current].onclick = null;
      }
    }
  }

  previous_slide() {
    if (--this.#current < 0) {
      this.#current = this.#items.length - 1;
    }
    this.loadshow();
  }

  next_slide() {
    if (++this.#current > this.#items.length - 1) {
      this.#current = 0;
    }
    this.loadshow();
  }
}
