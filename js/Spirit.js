//sx,sy
//w,h
//x,y
//rotation
//scale
//img

class Spirit {
  constructor(options) {
    this.img = options.img;

    this.sx = options.sx || 0;
    this.sy = options.sy || 0;

    this.w = options.w || this.img.width;
    this.h = options.h || this.img.height;

    this.x = options.x || 0;
    this.y = options.y || 0;

    this.rotation = options.rotation || 0;
    this.scaleX = options.scaleX || 1;
    this.scaleY = options.scaleY || 1;

    //速度
    this.speed = options.speed || 1;

    this.frame = 0;
    this.max_fame=0;

    //控制帧的切换
    this.tick = 0;
    this.max_tick=0;
  }

  //绘制鱼
  draw(gd) {
    gd.save();

    gd.translate(this.x,this.y);
    gd.rotate(this.rotation*Math.PI/180);
    gd.scale(this.scaleX,this.scaleY);
    //画
    gd.drawImage(
      this.img,
      this.sx,this.sy,this.w,this.h,
      -this.w/2,-this.h/2,this.w,this.h
    );
    gd.restore();
  }

  //游动的速度
  move() {
    let speed_x = this.speed*Math.sin(this.rotation*Math.PI/180);
    let speed_y = this.speed*Math.cos(this.rotation*Math.PI/180);

    this.x += speed_x;
    this.y -= speed_y;
  }

  setFrame(frame) {
    this.sy = frame*this.h
  }

  //帧动画
  nextFrame() {
    this.tick++;
    if (this.tick === this.max_tick) {
      this.tick = 0;
      this.frame++;
      if (this.frame === this.max_fame) {
        this.frame = 0;
        this.setFrame(this.frame);
        return true;
      } else {
        this.setFrame(this.frame);
        return false;
      }
    }
  }
  //检测鱼、炮弹是否出去canvas
  outOfCanvas(w,h) {
    if (this.x < 0 - this.w - 100
      || this.y < 0 - this.h - 100
      || this.x > w + this.w + 100
      || this.y > h + this.h + 100
    ) {
      return true;
    } else {
      return false;
    }
  }

  //检测碰撞
  collTest(spirit2) {
    //两个物体间的半径
    let r1=Math.min(this.w/2,this.h/2);
    let r2=Math.min(spirit2.w/2,spirit2.h/2);

    //两个圆心之间的距离
    let dis = Math.sqrt(Math.pow(this.x-spirit2.x,2)+Math.pow(this.y-spirit2.y,2));

    return dis <= (r1+r2);
  }
}