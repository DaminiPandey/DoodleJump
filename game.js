const grid=document.querySelector(".grid")
const doodler=document.createElement("div")
let doodlerLeftSpace=50
let startPoint=150
let doodlerBottomSpace=startPoint
let isGameOver=false
let platformCount=5
let upTimerId
let downTimerId
let leftTimerId
let rightTimerId
let score=0
let isJumping=true
let isGoingLeft=false
let isGoingRight=false
let isStarted=false

let platforms=[]
function createDoodler(){
  grid.appendChild(doodler)
  doodler.classList.add("doodler")
  doodlerLeftSpace=platforms[0].left
  doodler.style.left= doodlerLeftSpace+"px"
  doodler.style.bottom=doodlerBottomSpace+"px"

}
class Platform{
  constructor(newPlatBottom){
    this.bottom=newPlatBottom
    this.left=Math.random()*315
    this.visual=document.createElement("div")
    const visual=this.visual
    visual.classList.add("platform")
    visual.style.left=this.left+"px"
    visual.style.bottom=this.bottom+"px"
    grid.appendChild(visual)

  }

}
function createPlatforms(){
  for(let i=0;  i<platformCount; i++){
   let platGap= 600/platformCount
   let newPlatBottom=100 +i*platGap
   let newPlatform=new Platform(newPlatBottom)
   platforms.push(newPlatform)
   console.log(platforms)
  }
}
function movePlatforms(){
  if(doodlerBottomSpace>200){
    platforms.forEach(platform=> {
      platform.bottom -=4
      let visual=platform.visual
      visual.style.bottom=platform.bottom+"px"
      if(platform.bottom<10){
        let firstPlatform=platforms[0].visual
        firstPlatform.classList.remove("platform")
        platforms.shift()
        score++
        let newPlatform= new Platform(600)
        platforms.push(newPlatform)
      }
    })


  }
}

function jump(){
  isJumping=true
  clearInterval(downTimerId)
  upTimerId=setInterval(function(){
   doodlerBottomSpace+=20
   doodler.style.bottom=doodlerBottomSpace+"px"
   if(doodlerBottomSpace>startPoint+200){
     fall()
   }
   if(doodlerBottomSpace>600){
     fall()
   }
  },30)
}
function fall(){
  isJumping=false
  clearInterval(upTimerId)
  downTimerId=setInterval(function(){
    doodlerBottomSpace-=5
    doodler.style.bottom=doodlerBottomSpace+"px"
    if(doodlerBottomSpace<=0){
      gameOver()
    }
    platforms.forEach(platform=>{
      if(
        (doodlerBottomSpace>=platform.bottom) &&
        (doodlerBottomSpace<=(platform.bottom+15)) &&
        ((doodlerLeftSpace+60)>=platform.left) &&
        (doodlerLeftSpace<=(platform.left+85)) &&
        !isJumping

      ){
        console.log("landed")
        startPoint=doodlerBottomSpace
        jump()
      }
    })
  },30)

}
function gameOver(){
  clearInterval(upTimerId)
  clearInterval(downTimerId)
  clearInterval(leftTimerId)
  clearInterval(rightTimerId)
  console.log("game over")
  isGameOver==true

  while(grid.firstChild){
    grid.removeChild(grid.firstChild)
  }


    grid.innerHTML='Score: '+score
    var btn = document.createElement("button")

       btn.innerHTML = "Refresh"
       btn.classList.add("butt")
       grid.appendChild(btn)


       btn.addEventListener("click",function(){
         isGameOver==false
         isStarted==true
         window.location.reload()
       })


}



 function control(e){
  if(e.key=="ArrowLeft"){
    moveLeft()
  }else if (e.key=="ArrowRight"){
    moveRight()
  }else if (e.key=="ArrowUp"){
    moveStraight()
  }

}
function moveLeft(){
  clearInterval(rightTimerId)
  clearInterval(leftTimerId)
  isGoingRight==false
  isGoingLeft==true

    leftTimerId=setInterval(function(){
      if(doodlerLeftSpace>=0){
      doodlerLeftSpace-=4
      doodler.style.left=doodlerLeftSpace+"px"
  }else moveStraight()

},20)
}
function moveRight(){
  // if(isGoingLeft){
  //   clearInterval(leftTimerId)
  //   isGoingLeft=false
  // }
  clearInterval(leftTimerId)
  clearInterval(rightTimerId)
   isGoingLeft==false
   isGoingRight=true
   rightTimerId=setInterval(function(){
    if(doodlerLeftSpace<=340){
      doodlerLeftSpace +=5
      doodler.style.left=doodlerLeftSpace+"px"
    }else moveStraight()
  },20)
}
function moveStraight(){
  isGoingLeft=false
  isGoingRight=false
  clearInterval(leftTimerId)
  clearInterval(rightTimerId)
}
function start(){
  if (isGameOver==false){
    isStarted==true
    btn.classList.remove("butt")
    grid.removeChild(btn)
    grid.innerHTML=""


    createPlatforms()
    createDoodler()
    setInterval( movePlatforms,30)
     jump()
     document.addEventListener("keydown",control)
     // button.style.visibility="hidden"


  }

}

//attach a button
if(isStarted==false){
  grid.innerHTML="Doodle Jump"
  var btn = document.createElement("button")
   btn.innerHTML = "Play"
   btn.classList.add("butt")
   grid.appendChild(btn);

   btn.addEventListener("click",start)
   isStarted=true
  }
// if(isGameOver){
//   var btn = document.createElement("button")
//
//    btn.innerHTML = "Play Again"
//    btn.classList.add("butt")
//    grid.appendChild(btn)
//
//
//    btn.addEventListener("click",function(){
//      isGameOver==false
//      isStarted==true
//      start()
//  })
// }
