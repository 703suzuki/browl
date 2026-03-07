class Player{

constructor(x,y){

this.x=x
this.y=y

this.r=20

this.hp=120
this.maxHp=120

this.speed=2.5

this.reload=3
this.maxReload=3

this.ult=0

this.lastHit=0

this.kills=0

}

move(dx,dy){

let nx=this.x+dx
let ny=this.y+dy

if(!collideWall(nx,this.y,this.r))
this.x=nx

if(!collideWall(this.x,ny,this.r))
this.y=ny

}

update(){

if(Date.now()-this.lastHit>3000){
this.hp=Math.min(this.maxHp,this.hp+0.1)
}

if(this.reload<this.maxReload){
this.reload+=0.02
}

}

draw(ctx){

ctx.fillStyle="#00ff88"

ctx.beginPath()
ctx.arc(this.x,this.y,this.r,0,Math.PI*2)
ctx.fill()

ctx.fillStyle="white"
ctx.fillText(Math.floor(this.hp),this.x-10,this.y-25)

}

}
