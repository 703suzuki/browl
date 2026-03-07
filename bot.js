```javascript
class Bot{

constructor(x,y){

this.x = x
this.y = y

this.r = 20

// HP
this.hp = 100
this.maxHp = 100

this.speed = 2

// 射撃
this.reload = 2
this.maxReload = 2

// ランダム移動
this.dir = Math.random()*Math.PI*2
this.changeTimer = 0

}

// 壁衝突付き移動
move(dx,dy){

let nx = this.x + dx
let ny = this.y + dy

if(!collideWall(nx,this.y,this.r)){
this.x = nx
}else{
this.dir += Math.PI/2
}

if(!collideWall(this.x,ny,this.r)){
this.y = ny
}else{
this.dir += Math.PI/2
}

}

// BOT攻撃
shoot(player,bullets){

if(this.reload < 1) return

let dx = player.x - this.x
let dy = player.y - this.y

let d = Math.hypot(dx,dy)

dx /= d
dy /= d

bullets.push(new Bullet(
this.x,
this.y,
dx*6,
dy*6,
15,
this
))

this.reload = 0

}

update(player,bullets){

// リロード回復
if(this.reload < this.maxReload){
this.reload += 0.02
}

let dx = player.x - this.x
let dy = player.y - this.y

let dist = Math.hypot(dx,dy)

dx /= dist
dy /= dist

// 行動変更
this.changeTimer--

if(this.changeTimer <= 0){
this.dir = Math.random()*Math.PI*2
this.changeTimer = 60 + Math.random()*120
}

// プレイヤーが近いと追跡
if(dist < 300){

this.move(dx*this.speed, dy*this.speed)

}else{

// ランダム移動
let mx = Math.cos(this.dir)*this.speed
let my = Math.sin(this.dir)*this.speed

this.move(mx,my)

}

// 近すぎたら逃げる
if(dist < 120){

this.move(-dx*this.speed*1.5, -dy*this.speed*1.5)

}

// 攻撃
if(dist < 350 && Math.random() < 0.02){
this.shoot(player,bullets)
}

}

draw(ctx){

// キャラ
ctx.fillStyle = "red"

ctx.beginPath()
ctx.arc(this.x,this.y,this.r,0,Math.PI*2)
ctx.fill()

// HPバー背景
ctx.fillStyle = "black"
ctx.fillRect(this.x-20,this.y-30,40,5)

// HPバー
ctx.fillStyle = "lime"
ctx.fillRect(
this.x-20,
this.y-30,
40*(this.hp/this.maxHp),
5
)

// HP数字
ctx.fillStyle = "white"
ctx.font = "12px Arial"
ctx.fillText(Math.floor(this.hp),this.x-10,this.y-35)

}

}
```
