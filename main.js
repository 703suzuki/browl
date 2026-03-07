const canvas=document.getElementById("game")
const ctx=canvas.getContext("2d")

generateMap()

const spawn=safeSpawn()

const player=new Player(spawn.x,spawn.y)

const bots=[]
const bullets=[]

for(let i=0;i<6;i++){

let p=safeSpawn()

bots.push(new Bot(p.x,p.y))

}

function nearestEnemy(){

let min=9999
let target=null

for(let b of bots){

let d=Math.hypot(b.x-player.x,b.y-player.y)

if(d<min){
min=d
target=b
}

}

return target

}

function shoot(){

if(player.reload<1)return

let target=nearestEnemy()

if(!target)return

let dx=target.x-player.x
let dy=target.y-player.y

let d=Math.hypot(dx,dy)

dx/=d
dy/=d

bullets.push(new Bullet(
player.x,
player.y,
dx*7,
dy*7,
20,
player
))

player.reload=0

}

document.addEventListener("keydown",e=>{

if(e.code==="Space")shoot()

if(e.key==="c")gadget(player)

if(e.key==="v")ultimate(player,bullets)

if(e.key==="b")hyper(player)

})

function update(){

player.update()

for(let bot of bots){
bot.update(player)
}

for(let bullet of bullets){
bullet.update()
}

for(let bullet of bullets){

for(let bot of bots){

let d=Math.hypot(bullet.x-bot.x,bullet.y-bot.y)

if(d<20 && bullet.owner!==bot){

bot.hp-=bullet.damage
bullet.dead=true

player.ult+=5

if(bot.hp<=0){

player.kills++

let p=safeSpawn()

bot.x=p.x
bot.y=p.y
bot.hp=100

}

}

}

}

for(let i=bullets.length-1;i>=0;i--){
if(bullets[i].dead){
bullets.splice(i,1)
}
}

updateUI(player)

}

function draw(){

ctx.clearRect(0,0,1000,600)

drawMap(ctx)

player.draw(ctx)

for(let bot of bots){
bot.draw(ctx)
}

for(let bullet of bullets){
bullet.draw(ctx)
}

}

function loop(){

update()
draw()

requestAnimationFrame(loop)

}

loop()
