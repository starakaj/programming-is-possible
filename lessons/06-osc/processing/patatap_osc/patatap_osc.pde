import netP5.*;
import oscP5.*;

// Create a global variable to store our oscP5 server 
OscP5 oscP5;

// The list of rectangles that we want to draw
ArrayList<float []> rectangles = new ArrayList<float []>();

void setup() {
  size(1080, 720);
  
  // Make an oscP5 server that listens on port 9001
  oscP5 = new OscP5(this, 9001);
  
  // this binds the address /createRectangle to the function createRectangle
  oscP5.plug(this, "createRectangle", "/createRectangle");
}

synchronized void createRectangle(float x, float y, float w, float h) {
  float[] newRectangle = {x, y, w, h};
  rectangles.add(newRectangle);
}

synchronized void draw() {
  
  background(51);
  
  for (float[] rectangle : rectangles) {
    
    strokeWeight(2);
    stroke(0);
    
    // Just for fun, we can highlight any rectangles that intersect the mouse
    if (mouseX > rectangle[0]
      && mouseX < rectangle[0] + rectangle[2]
      && mouseY > rectangle[1]
      && mouseY < rectangle[1] + rectangle[3])
     {
       fill(245, 66, 221);
     } else {
       fill(255);  
     }
    
    rect(rectangle[0], rectangle[1], rectangle[2], rectangle[3]);
  }
}
