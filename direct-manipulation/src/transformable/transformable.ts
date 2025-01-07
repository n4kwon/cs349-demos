import {
  drawCross,
  insideHitTestRectangle,
  insideHitTestCircle,
  rotate,
} from "./utility";

// rotatable, scalable, and translatable shape
export class Transformable {
  constructor(
    public width: number,
    public height: number,
    public x = 0,
    public y = 0,
    public angle = 0
  ) {}

  mode: "idle" | "scale" | "rotate" | "translate" = "idle";

  // size of draggable circles for scaling and rotation
  handleSize = 8;

  // DEMO: shift canvas coordinates to the right and down
  demo = {
    on: false, // turn demo on and off
    shift: 100,
    mx: 0,
    my: 0,
  };

  addListeners(canvas: HTMLCanvasElement) {
    // DEMO: use shift for mouse position
    const shift = this.demo.on ? this.demo.shift : 0;

    canvas.addEventListener("mousedown", (e) =>
      this.mousedown(e.clientX - shift, e.clientY - shift)
    );
    canvas.addEventListener("mousemove", (e) =>
      this.mousemove(e.clientX - shift, e.clientY - shift)
    );
    canvas.addEventListener("mouseup", (_) => this.mouseup());
  }

  // utility function used by some mouse events
  transformMouseToShapeCoord(_mx: number, _my: number) {
    // transform mouse to shape coordinates
    // (_mx, _my) is mouse in world coordinates
    // (mx, my) is mouse in shape coordinates

    // translate mouse to shape position
    let mx = _mx - this.x;
    let my = _my - this.y;
    // rotate mouse to shape angle
    [mx, my] = rotate(mx, my, -this.angle, 0, 0);

    // DEMO: save mouse position in shape coordinates
    this.demo.mx = mx;
    this.demo.my = my;

    return [mx, my];
  }

  // keep track of how much shape changes due to dragging action
  delta = { x: 0, y: 0, width: 0, height: 0, angle: 0 };
  // where drag started (in shape coordinates)
  dragStart = { x: 0, y: 0 };

  mousedown(_mx: number, _my: number) {
    // transform mouse position to shape local coordinates
    // (this considers shape translation and rotation)
    const [mx, my] = this.transformMouseToShapeCoord(_mx, _my);

    // determine which mode to use based on mouse position
    if (
      insideHitTestCircle(
        mx,
        my,
        this.width / 2,
        this.height / 2,
        this.handleSize
      )
    ) {
      this.mode = "scale";
    } else if (
      insideHitTestCircle(
        mx,
        my,
        0,
        -this.height / 2 - this.handleSize * 3,
        this.handleSize
      )
    ) {
      this.mode = "rotate";
    } else if (
      insideHitTestRectangle(
        mx,
        my,
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      )
    ) {
      this.mode = "translate";
    }

    // save starting position to calculate drag delta
    this.dragStart = { x: mx, y: my };
  }

  mousemove(_mx: number, _my: number) {
    // transform mouse position to shape coordinates
    // (this considers shape translation and rotation)
    const [mx, my] = this.transformMouseToShapeCoord(_mx, _my);

    // calculate drag delta (dx, dy)
    const dx = mx - this.dragStart.x;
    const dy = my - this.dragStart.y;

    switch (this.mode) {
      case "scale":
        {
          // use drag delta for width and height
          // (could constrain min size here too, e.g. max(dx, -this.width))
          this.delta.width = dx;
          this.delta.height = dy;
          // adjust the shape centre to keep opposite corner fixed
          // 1. find the rotated width and height
          const [dwRotated, dhRotated] = rotate(
            this.delta.width,
            this.delta.height,
            this.angle
          );
          // 2. move the shape centre by half the size deltas
          this.delta.x = dwRotated / 2;
          this.delta.y = dhRotated / 2;
        }
        break;
      case "translate":
        {
          const [dxRotated, dyRotated] = rotate(dx, dy, this.angle);
          this.delta.x = dxRotated;
          this.delta.y = dyRotated;
        }
        break;
      case "rotate":
        {
          const handlePoint = { x: 0, y: -this.height / 2 };
          const mouseAngle = Math.atan2(my, mx);
          const handleAngle = Math.atan2(
            handlePoint.y,
            handlePoint.x
          );
          this.delta.angle = mouseAngle - handleAngle;
        }
        break;
    }
  }

  mouseup() {
    // apply the deltas to update the shape
    this.width += this.delta.width;
    this.height += this.delta.height;
    this.x += this.delta.x;
    this.y += this.delta.y;
    this.angle += this.delta.angle;

    // clear the delta and reset mode
    this.delta = { x: 0, y: 0, width: 0, height: 0, angle: 0 };
    this.mode = "idle";
  }

  draw(gc: CanvasRenderingContext2D) {
    // apply deltas to shape properties for drawing
    const x = this.x + this.delta.x;
    const y = this.y + this.delta.y;
    const width = this.width + this.delta.width;
    const height = this.height + this.delta.height;
    const angle = this.angle + this.delta.angle;

    //#region DEMO
    gc.save();
    if (this.demo.on) {
      // draw shape in local coordinate frame
      gc.translate(this.demo.shift, this.demo.shift);
      this.drawShiftedOrigin(gc);
      this.drawShape(gc, width, height, 0.5);

      if (this.mode !== "idle") {
        // visualize drag delta
        gc.beginPath();
        gc.moveTo(this.dragStart.x, this.dragStart.y);
        gc.lineTo(this.demo.mx, this.demo.my);
        gc.strokeStyle = "red";
        gc.stroke();
      }
      // draw mouse position in shape coordinates
      gc.beginPath();
      gc.arc(this.demo.mx, this.demo.my, 3, 0, 2 * Math.PI);
      gc.fillStyle = "red";
      gc.fill();

      gc.save();
      // draw the shape before applying the dragging deltas
      gc.translate(this.x, this.y);
      gc.rotate(this.angle);
      this.drawShape(gc, this.width, this.height, 0.5);
      gc.restore();
    }
    //#endregion

    // set shape position and rotation for drawing
    gc.translate(x, y);
    gc.rotate(angle);

    // draw the shape
    this.drawShape(gc, width, height);

    gc.restore();
  }

  drawShape(
    gc: CanvasRenderingContext2D,
    width: number,
    height: number,
    alpha = 1
  ) {
    gc.save();

    gc.globalAlpha = alpha;

    // rectangle centred at 0,0
    gc.beginPath();
    gc.rect(-width / 2, -height / 2, width, height);
    gc.fillStyle =
      this.mode === "translate" ? "LightSkyBlue" : "LightGrey";
    gc.fill();
    gc.strokeStyle = "black";
    gc.lineWidth = 1;
    gc.stroke();

    // scale handle is at lower-right corner
    gc.beginPath();
    gc.arc(width / 2, height / 2, this.handleSize, 0, 2 * Math.PI);
    gc.fillStyle = this.mode === "scale" ? "LightSkyBlue" : "white";
    gc.fill();
    gc.strokeStyle = "black";
    gc.stroke();

    // rotate handle is centred at top
    const handleY = -height / 2 - this.handleSize * 3;
    gc.beginPath();
    gc.moveTo(0, -height / 2);
    gc.lineTo(0, handleY);
    gc.strokeStyle = "black";
    gc.stroke();
    gc.beginPath();
    gc.arc(0, handleY, this.handleSize, 0, 2 * Math.PI);
    gc.fillStyle = this.mode === "rotate" ? "LightSkyBlue" : "white";
    gc.fill();
    gc.strokeStyle = "black";
    gc.stroke();

    // cross at centre (to make demo clearer)
    gc.strokeStyle =
      this.mode === "rotate" || this.mode === "scale"
        ? "OrangeRed"
        : "white";
    drawCross(gc, 0, 0);

    gc.restore();
  }

  // DEMO: draw a shifted origin to show the shape in its own coordinate frame
  drawShiftedOrigin(gc: CanvasRenderingContext2D) {
    gc.save();
    gc.fillStyle = "white";
    gc.fillRect(
      -this.demo.shift,
      -this.demo.shift,
      gc.canvas.width,
      this.demo.shift
    );
    gc.fillStyle = "white";
    gc.fillRect(
      -this.demo.shift,
      -this.demo.shift,
      this.demo.shift,
      gc.canvas.height
    );
    gc.restore();
  }
}
