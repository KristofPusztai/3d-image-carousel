// Slideshow class
class Slideshow {
  #element_class;
  #items;
  #rendered_items = [];
  #alt_text;
  #current;

  constructor(items, start, element_class, alt_text) {
    this.#element_class = element_class;
    this.#items = items;
    this.#current = start;
    this.#alt_text = alt_text;

    this.loadshow();
  }

  #render() {
    // Dynamic image load in
    let new_image;
    let slide_element = document.querySelector(this.#element_class);

    let next = this.#current + 1;
    if (next > this.#items.length - 1) {
      next = 0;
    }
    let prev = this.#current - 1;
    if (prev < 0) {
      prev = this.#items.length - 1;
    }

    if (this.#rendered_items[prev] == undefined) {
      new_image = document.createElement("img");
      new_image.className = "slide";
      new_image.alt = this.#alt_text;
      new_image.src = this.#items[prev];
      this.#rendered_items[prev] = new_image;
      slide_element.appendChild(new_image);
    }
    if (this.#rendered_items[this.#current] == undefined) {
      new_image = document.createElement("img");
      new_image.className = "slide";
      new_image.alt = this.#alt_text;
      new_image.src = this.#items[this.#current];
      this.#rendered_items[this.#current] = new_image;
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

  loadshow() {
    this.#render();

    let width = window.innerWidth;

    let next = this.#current + 1;
    if (next > this.#items.length - 1) {
      next = 0;
    }

    let prev = this.#current - 1;
    if (prev < 0) {
      prev = this.#items.length - 1;
    }

    for (let index = 0; index < this.#rendered_items.length; index++) {
      if (this.#rendered_items[index] != undefined) {
        this.#rendered_items[index].style.display = "none";
      }
    }

    this.#rendered_items[prev].style.transform = `translateX(${
      -width / 4
    }px) scale(0.4) perspective(30px) rotateY(1deg)`;
    this.#rendered_items[prev].style.opacity = 0.6;
    this.#rendered_items[prev].style.filter = "blur(2px)";
    this.#rendered_items[prev].style.display = "block";
    this.#rendered_items[prev].style.zIndex = -1;
    this.#rendered_items[prev].style.cursor = "auto";
    this.#rendered_items[prev].onclick = null;

    this.#rendered_items[this.#current].style.transform =
      "scale(1) rotateY(0deg)";
    this.#rendered_items[this.#current].style.opacity = 1;
    this.#rendered_items[this.#current].style.filter = "blur(0px)";
    this.#rendered_items[this.#current].style.display = "block";
    this.#rendered_items[this.#current].style.zIndex = 0;
    this.#rendered_items[this.#current].onclick = function () {
      window.open(this.#rendered_items[this.#current].src, "_blank");
    }.bind(this);
    this.#rendered_items[this.#current].style.cursor = "pointer";

    this.#rendered_items[next].style.transform = `translateX(${
      width / 4
    }px) scale(0.4) perspective(30px) rotateY(-1deg)`;
    this.#rendered_items[next].style.opacity = 0.6;
    this.#rendered_items[next].style.filter = "blur(2px)";
    this.#rendered_items[next].style.display = "block";
    this.#rendered_items[next].style.zIndex = -1;
    this.#rendered_items[next].style.cursor = "auto";
    this.#rendered_items[next].onclick = null;
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
