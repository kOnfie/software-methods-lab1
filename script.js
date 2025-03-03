class Modeling {
  constructor() {
    this.graph = d3.select("#graph");
    this.width = this.graph.attr("width");
    this.height = this.graph.attr("height");

    this.x0 = this.width / 2;
    this.y0 = this.height / 2;
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.v0 = 0;
    this.a = 0;
    this.color = "#000000";
    this.time = 0;
    this.dt = 0;

    this.drawAxes();
  }

  getElement(id) {
    return document.getElementById(id);
  }

  drawAxes() {
    const { graph, width, height } = this;

    graph
      .append("line")
      .attr("x1", 0)
      .attr("y1", height / 2)
      .attr("x2", width)
      .attr("y2", height / 2)
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    graph
      .append("line")
      .attr("x1", width / 2)
      .attr("y1", 0)
      .attr("x2", width / 2)
      .attr("y2", height)
      .attr("stroke", "black")
      .attr("stroke-width", 2);
  }

  readingData() {
    this.x0 = this.width / 2 + parseFloat(this.getElement("x0").value);
    this.y0 = this.height / 2 + parseFloat(this.getElement("y0").value);

    this.angle = (parseFloat(this.getElement("angle").value) * Math.PI) / 180;
    this.v0 = parseFloat(this.getElement("velocity").value);
    this.a = parseFloat(this.getElement("acceleration").value);
    this.color = this.getElement("color").value;
    this.dt = 1;
    this.time = 0;

    this.x = this.x0;
    this.y = this.y0;
  }

  createTrajectory() {
    this.readingData();

    let maxIterations = 10000;

    const trajectoryGroup = this.graph.append("g").attr("class", "trajectory");
    trajectoryGroup
      .append("circle")
      .attr("cx", this.x)
      .attr("cy", this.height - this.y)
      .attr("r", 2)
      .attr("fill", this.color);

    while (this.x >= 0 && this.x < this.width && this.y >= 0 && this.y < this.height && maxIterations > 0) {
      this.x =
        this.x0 +
        this.v0 * Math.cos(this.angle) * this.time +
        (this.a / 2) * Math.cos(this.angle) * this.time * this.time;
      this.y =
        this.y0 +
        this.v0 * Math.sin(this.angle) * this.time +
        (this.a / 2) * Math.sin(this.angle) * this.time * this.time;

      trajectoryGroup
        .append("circle")
        .attr("cx", this.x)
        .attr("cy", this.height - this.y)
        .attr("r", 2)
        .attr("fill", this.color);

      this.time += this.dt;
      maxIterations--;
    }
  }

  clearCanvas() {
    this.graph.selectAll(".trajectory").remove();
  }
}

const canvas = new Modeling();

const create = document.getElementById("create");
const clear = document.getElementById("clear");

create.addEventListener("click", () => {
  canvas.createTrajectory();
});

clear.addEventListener("click", () => {
  canvas.clearCanvas();
});
