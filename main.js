const canvas=document.getElementById("game")
const ctx=canvas.getContext("2d")

generateMap()

const player=new Player(200,200)

const bots=[]

for(let i=0;i<6;i++){

bots.push(new Bot(
Math.random()*900,
Math.random()*500
))

}

const bullets=[]

function shoot(){

if(player.reload<1)return

let target=bots[0]

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

if(e.code=="Space")shoot()

if(e.key=="c")gadget(player)

if(e.key=="v")ultimate(player,bullets)

if(e.key=="b")hyper(player)

})

function update(){

player.update()

for(let bot of bots)
bot.update(player)

for(let bullet of bullets)
bullet.update()

updateUI(player)

}

function draw(){

ctx.clearRect(0,0,1000,600)

drawMap(ctx)

player.draw(ctx)

for(let bot of bots)
bot.draw(ctx)

for(let bullet of bullets)
bullet.draw(ctx)

}

function loop(){

update()
draw()

requestAnimationFrame(loop)

}

loop()
