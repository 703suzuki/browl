class Bot{

constructor(x,y){

this.x=x
this.y=y
this.r=20

this.hp=100
this.speed=2

}

move(dx,dy){

let nx=this.x+dx
let ny=this.y+dy

if(!collideWall(nx,this.y,this.r))
this.x=nx

if(!collideWall(this.x,ny,this.r))
this.y=ny

}

update(player){

let dx=player.x-this.x
let dy=player.y-this.y

let d=Math.hypot(dx,dy)

dx/=d
dy/=d

this.move(dx*this.speed,dy*this.speed)

}

draw(ctx){

ctx.fillStyle="red"

ctx.beginPath()
ctx.arc(this.x,this.y,this.r,0,Math.PI*2)
ctx.fill()

}

}
