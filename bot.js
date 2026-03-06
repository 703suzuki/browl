class Bot{

constructor(x,y){

this.x=x
this.y=y

this.hp=100

this.speed=2

}

update(player){

let dx=player.x-this.x
let dy=player.y-this.y

let d=Math.hypot(dx,dy)

dx/=d
dy/=d

this.x+=dx*this.speed
this.y+=dy*this.speed

}

draw(ctx){

ctx.fillStyle="red"

ctx.beginPath()
ctx.arc(this.x,this.y,20,0,Math.PI*2)
ctx.fill()

}

}
