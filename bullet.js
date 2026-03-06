class Bullet{

constructor(x,y,dx,dy,damage,owner,type="normal"){

this.x=x
this.y=y
this.dx=dx
this.dy=dy
this.damage=damage
this.owner=owner
this.type=type
this.r=5

}

update(){

this.x+=this.dx
this.y+=this.dy

}

draw(ctx){

ctx.fillStyle="yellow"

ctx.beginPath()
ctx.arc(this.x,this.y,this.r,0,Math.PI*2)
ctx.fill()

}

}
