

var CzechBox = function(element) {
  this.input = element;
  this.checked = element.checked;

  if(this.checked) {
    this.setState(CzechBox.states.CHECKED, CzechBox.states.UP);
  } else {
    this.setState(CzechBox.states.UNCHECKED, CzechBox.states.UP);
  }

  this.render();
};

CzechBox.states = {
  UNCHECKED: 0x1,
  CHECKED: 0x2,
  UP: 0x4,
  DOWN: 0x8
};

CzechBox.prototype.state = CzechBox.states.UNCHECKED;

CzechBox.prototype.setState = function() {
  var args = arguments;

  this.state = 0x0;

  for(var i=0;i<args.length;i++) {
    this.state = args[i] | this.state;
  }

  this.input.checked = (this.state & CzechBox.states.CHECKED);

};

CzechBox.prototype.getState = function() {
  return this.state;
};

CzechBox.prototype.render = function() {

  var input = this.input,
      html = "<span class='czechbox'></span>",
      box;

  input.style.display = "none";

  box = $(html);

  this.setStyle(box);

  box.mousedown($.proxy(this.mousedown, this));
  box.mouseup($.proxy(this.mouseup, this));
  box.mouseout($.proxy(this.mouseout, this));

  $(input).after(box);

};

CzechBox.prototype.setStyle = function(box) {

  var state = this.getState(),
      CB = CzechBox;

  if(state & CB.states.UP) {
    box.removeClass("down");
  }

  if(state & CB.states.DOWN) {
    box.addClass("down");
  }

  if(state & CB.states.CHECKED) {
    box.addClass("checked");
  }

  if(state & CB.states.UNCHECKED) {
    box.removeClass("checked");
  }

};

CzechBox.prototype.mousedown = function(event) {
  event.preventDefault();
  var box = $(event.target);

  if(this.state & CzechBox.states.CHECKED) {
    this.setState(CzechBox.states.CHECKED, CzechBox.states.DOWN);
  } else {
    this.setState(CzechBox.states.UNCHECKED, CzechBox.states.DOWN);
  }

  this.setStyle(box);

};

CzechBox.prototype.mouseup = function(event) {
  event.preventDefault();
  var box = $(event.target);

  if(this.state & CzechBox.states.CHECKED) {
    this.setState(CzechBox.states.UNCHECKED, CzechBox.states.UP);
  } else {
    this.setState(CzechBox.states.CHECKED, CzechBox.states.UP);
  }

  this.setStyle(box);

};

CzechBox.prototype.mouseout = function(event) {
  event.preventDefault();
  var box = $(event.target);

  if(this.state & CzechBox.states.CHECKED) {
    this.setState(CzechBox.states.CHECKED, CzechBox.states.UP);
  } else {
    this.setState(CzechBox.states.UNCHECKED, CzechBox.states.UP);
  }

  this.setStyle(box);

};