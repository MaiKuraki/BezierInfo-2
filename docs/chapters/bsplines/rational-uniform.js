let points=[];

setup() {
  var r = this.width/3;
  for (let i=0; i<6; i++) {
    points.push({
      x: this.width/2 + r * Math.cos(i/6 * TAU),
      y: this.height/2 + r * Math.sin(i/6 * TAU)
    });
  }
  points = points.concat(points.slice(0,3));
  setMovable(points);
}

draw() {
  clear();

  setStroke(`lightgrey`);
  drawGrid(20);

  setStroke(`#CC00CC99`);
  for (let i=0, e=points.length-1, p, n; i<e; i++) {
    p = points[i];
    n = points[i+1];
    line(p.x, p.y, n.x, n.y);
  }

  setColor(`black`);
  points.forEach(p => circle(p.x, p.y, 3));

  this.drawSplineData();
}

drawSplineData() {
  const spline = new BSpline(this, points, !!this.parameters.open);
  spline.formWeights();

  noFill();
  setStroke(`black`);
  start();
  spline.getLUT((points.length - 3) * 20).forEach(p => vertex(p.x, p.y));
  end();
}
