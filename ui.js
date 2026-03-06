function updateUI(player){

document.getElementById("hp").textContent=Math.floor(player.hp)
document.getElementById("reload").textContent=player.reload.toFixed(1)
document.getElementById("ult").textContent=Math.floor(player.ult)
document.getElementById("kills").textContent=player.kills

}
