function gadget(player){

player.hp=Math.min(player.maxHp,player.hp+40)

}

function hyper(player){

player.speed*=2

setTimeout(()=>{
player.speed/=2
},3000)

}

function ultimate(player,bullets){

for(let i=0;i<10;i++){

let a=Math.random()*Math.PI*2

bullets.push(new Bullet(
player.x,
player.y,
Math.cos(a)*6,
Math.sin(a)*6,
25,
player
))

}

player.ult=0

}
