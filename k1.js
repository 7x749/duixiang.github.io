const music = document.getElementById('bg-music');
const toggleMusicButton = document.getElementById('toggle-music');

// 播放音乐
music.play();
// 更新按钮文本的函数
function updateToggleButtonLabel() {
  if (music.paused) {
    toggleMusicButton.textContent = '打开音乐';
  } else {
    toggleMusicButton.textContent = '关闭音乐';
  }
}

// 初始化按钮文本
updateToggleButtonLabel();

// 设置按钮点击事件监听器
toggleMusicButton.addEventListener('click', function() {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
  // 更新按钮文本
  updateToggleButtonLabel();
});

// 监听音乐播放和暂停事件来更新按钮文本
music.addEventListener('play', updateToggleButtonLabel);
music.addEventListener('pause', updateToggleButtonLabel);

// 设置画布

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数

function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

// 生成随机颜色值的函数

function randomColor() {
  const color = 'rgb(' +
                random(0, 258) + ',' +
                random(0, 258) + ',' +
                random(0, 258) + ')';
  return color;
}

// 定义 Ball 构造器

function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

// 定义彩球绘制函数

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// 定义彩球更新函数

Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// 定义碰撞检测函数

Ball.prototype.collisionDetect = function() {
  for(let j = 0; j < balls.length; j++) {
    if(this !== balls[j]) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = randomColor();
      }
    }
  }
};

// 定义一个数组，生成并保存所有的球

let balls = [];

while(balls.length < 30) {
  const size = random(30,40);
  let ball = new Ball(
    // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-10, 10), /*水平方向初始速度*/
    random(-10, 10),  /*垂直方向初始速度*/
    randomColor(),   /*随机颜色*/
    size
  );
  balls.push(ball);
}

// 定义一个循环来不停地播放

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);

  for(let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();