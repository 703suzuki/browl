class Bot{

constructor(x,y){

this.x=x
this.y=y
this.r=20

this.hp=100
this.speed=2

this.dir=Math.random()*Math.PI*2
this.changeTimer=0

}

move(dx,dy){

let nx=this.x+dx
let ny=this.y+dy

if(!collideWall(nx,this.y,this.r))
this.x=nx
else
this.dir+=Math.PI/2

if(!collideWall(this.x,ny,this.r))
this.y=ny
else
this.dir+=Math.PI/2

}

update(player,bullets){

let dx=player.x-this.x
let dy=player.y-this.y

let dist=Math.hypot(dx,dy)

dx/=dist
dy/=dist

// 行動変更タイマー
this.changeTimer--

if(this.changeTimer<=0){

this.dir=Math.random()*Math.PI*2
this.changeTimer=60+Math.random()*120

}

// プレイヤーが近いと追跡
if(dist<300){

this.move(dx*this.speed,dy*this.speed)

}else{

// ランダム移動
let mx=Math.cos(this.dir)*this.speed
let my=Math.sin(this.dir)*this.speed

this.move(mx,my)

}

// 距離が近すぎたら逃げる
if(dist<120){

this.move(-dx*this.speed*1.5,-dy*this.speed*1.5)

}

// ランダム射撃
if(Math.random()<0.01){

let bx=player.x-this.x
let by=player.y-this.y

let d=Math.hypot(bx,by)

bx/=d
by/=d

bullets.push(new Bullet(
this.x,
this.y,
bx*6,
by*6,
15,
this
))

}

}

draw(ctx){

ctx.fillStyle="red"

ctx.beginPath()
ctx.arc(this.x,this.y,this.r,0,Math.PI*2)
ctx.fill()

ctx.fillStyle="white"
ctx.fillText(Math.floor(this.hp),this.x-10,this.y-25)

}

}
