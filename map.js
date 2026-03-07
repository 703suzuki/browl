const walls=[]

function generateMap(){

for(let i=0;i<10;i++){

walls.push({
x:Math.random()*850,
y:Math.random()*450,
w:80,
h:40
})

}

}

function drawMap(ctx){

ctx.fillStyle="#555"

for(let w of walls){
ctx.fillRect(w.x,w.y,w.w,w.h)
}

}

function collideWall(x,y,r){

for(let w of walls){

if(
x+r>w.x &&
x-r<w.x+w.w &&
y+r>w.y &&
y-r<w.y+w.h
){
return true
}

}

return false
}

function safeSpawn(){

while(true){

let x=Math.random()*900+50
let y=Math.random()*500+50

if(!collideWall(x,y,20)){
return {x,y}
}

}

}
