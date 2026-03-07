```javascript
const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const WIDTH = canvas.width
const HEIGHT = canvas.height

generateMap()

// キー入力管理
const keys = {}

document.addEventListener("keydown", e=>{
keys[e.key.toLowerCase()] = true
})

document.addEventListener("keyup", e=>{
keys[e.key.toLowerCase()] = false
})

// スポーン
const spawn = safeSpawn()

const player = new Player(spawn.x, spawn.y)

const bots = []
const bullets = []

// BOT生成
for(let i=0;i<6;i++){
let p = safeSpawn()
bots.push(new Bot(p.x,p.y))
}

// 一番近い敵
function nearestEnemy(){

let min = Infinity
let target = null

for(let b of bots){

let d = Math.hypot(b.x-player.x,b.y-player.y)

if(d < min){
min = d
target = b
}

}

return target

}

// 射撃
function shoot(){

if(player.reload < 1) return

let target = nearestEnemy()
if(!target) return

let dx = target.x - player.x
let dy = target.y - player.y

let d = Math.hypot(dx,dy)

dx /= d
dy /= d

bullets.push(new Bullet(
player.x,
player.y,
dx*7,
dy*7,
20,
player
))

player.reload = 0

}

// キー操作
document.addEventListener("keydown", e=>{

if(e.code === "Space") shoot()

if(e.key === "c") gadget(player)

if(e.key === "v") ultimate(player,bullets)

if(e.key === "b") hyper(player)

})

// 更新
function update(){

// 移動
let dx = 0
let dy = 0

if(keys["w"]) dy -= player.speed
if(keys["s"]) dy += player.speed
if(keys["a"]) dx -= player.speed
if(keys["d"]) dx += player.speed

player.move(dx,dy)

// 画面外防止
player.x = Math.max(player.r, Math.min(WIDTH-player.r, player.x))
player.y = Math.max(player.r, Math.min(HEIGHT-player.r, player.y))

player.update()

// BOT更新
for(let bot of bots){
bot.update(player,bullets)
}

// 弾更新
for(let bullet of bullets){
bullet.update()
}

// 弾ヒット判定
for(let bullet of bullets){

for(let bot of bots){

let d = Math.hypot(bullet.x-bot.x, bullet.y-bot.y)

if(d < 20 && bullet.owner !== bot){

bot.hp -= bullet.damage
bullet.dead = true

player.ult += 5

if(bot.hp <= 0){

player.kills++

let p = safeSpawn()

bot.x = p.x
bot.y = p.y
bot.hp = 100

}

}

}

}

// 弾削除
for(let i=bullets.length-1;i>=0;i--){
if(bullets[i].dead){
bullets.splice(i,1)
}
}

updateUI(player)

}

// 描画
function draw(){

ctx.clearRect(0,0,WIDTH,HEIGHT)

drawMap(ctx)

player.draw(ctx)

for(let bot of bots){
bot.draw(ctx)
}

for(let bullet of bullets){
bullet.draw(ctx)
}

}

// ゲームループ
function loop(){

update()
draw()

requestAnimationFrame(loop)

}

loop()
```
