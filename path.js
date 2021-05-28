class Path {
  constructor() {
    this.pts = [];
    this.angles = [];
    this.size = 30;
    this.startFrame = frameCount;
  }

  get lastPt() {
    return this.pts[this.pts.length - 1];
  }

  addPoint(x, y) {
    // let r = map(frameCount - this.startFrame, 300, 700, 2, 30) * 7;
    let r = map(frameCount - this.startFrame, 300, 700, 2, 30) * 8;

    if (this.pts.length < 1) {
      this.pts.push({ pos: new p5.Vector(x, y), r });
      return;
    }

    const nextPt = new p5.Vector(x, y);
    let d = p5.Vector.dist(nextPt, this.lastPt.pos);

    while (d > this.size) {
      const diff = p5.Vector.sub(nextPt, this.lastPt.pos);
      diff.normalize();
      diff.mult(2.5);
      this.pts.push({ pos: p5.Vector.add(this.lastPt.pos, diff), r });
      this.angles.push(diff.heading());
      d -= this.size;
    }
  }

  display() {
    // rectMode(CENTER);
    for (let i = 1; i < this.pts.length; i++) {
      const prev = this.pts[i - 1];
      const next = this.pts[i];
      const diff = p5.Vector.sub(next.pos, prev.pos);
      diff.mult(0.1);
      push();
      translate(prev.pos.x + diff.x, prev.pos.y + diff.y);
      fill(255, 0, 0, 75);
      line(0, 0, prev.r, 0);
      pop();
    }
  }
}
