class Bullet{

constructor(x,y,dx,dy,damage,owner){

this.x=x
this.y=y
this.dx=dx
this.dy=dy
this.damage=damage
this.owner=owner
this.r=5
this.dead=false

}

update(){

this.x+=this.dx
this.y+=this.dy

if(collideWall(this.x,this.y,this.r)){
this.dead=true
}

}

draw(ctx){

ctx.fillStyle="yellow"

ctx.beginPath()
ctx.arc(this.x,this.y,this.r,0,Math.PI*2)
ctx.fill()

}

}
