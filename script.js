class Modeling {
  constructor() {
    this.canvas = this.getElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.x0 = this.canvas.width / 2;
    this.y0 = this.canvas.height / 2;
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
    const { ctx, canvas } = this;

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // Малюємо горизонтальну вісь (X)
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    // Малюємо вертикальну вісь (Y)
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
  }

  readingData() {
    this.x0 = this.canvas.width / 2 + parseFloat(this.getElement("x0").value);
    this.y0 = this.canvas.height / 2 + parseFloat(this.getElement("y0").value);

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
    this.ctx.fillStyle = this.color;
    this.ctx.moveTo(this.x0, this.canvas.height - this.y0);

    let maxIterations = 10000;

    while (
      this.x >= 0 &&
      this.x < this.canvas.width &&
      this.y >= 0 &&
      this.y < this.canvas.height &&
      maxIterations > 0
    ) {
      this.x =
        this.x0 +
        this.v0 * Math.cos(this.angle) * this.time +
        (this.a / 2) * Math.cos(this.angle) * this.time * this.time;
      this.y =
        this.y0 +
        this.v0 * Math.sin(this.angle) * this.time +
        (this.a / 2) * Math.sin(this.angle) * this.time * this.time;

      this.ctx.beginPath();
      this.ctx.arc(this.x, this.canvas.height - this.y, 2, 0, Math.PI * 2);
      this.ctx.fill();

      this.time += this.dt;
      maxIterations--;
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawAxes();
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
