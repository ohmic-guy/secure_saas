const icons = ["🍎","🚗","🐶","⚽","🎧","📷","🌙","🔥","🎲"];
let selected = [];

function shuffle(a){ return a.sort(()=>Math.random()-0.5); }

function loadGrid(){
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  shuffle([...icons]).forEach(icon=>{
    const div = document.createElement("div");
    div.className = "cell";
    div.innerText = icon;
    div.onclick = ()=>selectIcon(icon, div);
    grid.appendChild(div);
  });
}

function selectIcon(icon, el){
  if(selected.length < 3 && !selected.includes(icon)){
    selected.push(icon);
    el.classList.add("selected");
  }
}

document.getElementById("verifyBtn").onclick = ()=>{
  document.getElementById("msg").innerText =
    "Pattern chosen: " + selected.join(" ");
};

loadGrid();
