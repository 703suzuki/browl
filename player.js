class Player{

constructor(x,y){

this.x=x
this.y=y

this.hp=120
this.maxHp=120

this.speed=2.5

this.reload=3
this.maxReload=3

this.ult=0

this.lastHit=0

this.kills=0

}

update(){

if(Date.now()-this.lastHit>3000){

this.hp=Math.min(this.maxHp,this.hp+0.1)

}

if(this.reload<this.maxReload)
this.reload+=0.02

}

draw(ctx){

ctx.fillStyle="#00ff88"

ctx.beginPath()
ctx.arc(this.x,this.y,20,0,Math.PI*2)
ctx.fill()

}

}
