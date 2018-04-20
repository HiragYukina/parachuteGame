var f = 0;
var a = null,
  goal = null;
var positionY = 0;
var hoge = 46;
var vectorY = 2;
var vectorX = 0;
var slope = {
  "left": false,
  "right": false
}

function reset() {
  stage.addChild(titl);
  hoge = 46;
  vectorX = 0
  positionY = 0
  playerX = 250
  playerY = 32 + 15
  a = null
  goal = null
  score = 0
  scoretext.setText(score + "m");
  set = 0
  slope = 0
  player.position.set(250 - 32, 30);
  stage.removeChild(player_goal)
  stage.addChild(player)
  for (var i = 0; i < 7; i++) {
    map[i].position.set(0, height * i);
  }
    gameMode = "titl"
}

function titlrender() {
  window.addEventListener("touchstart", function() {
    switch (gameMode) {
      case "titl":
      gameMode = "game"
      stage.removeChild(titl)
        break;
        case "end":
        case "clea":
        reset()
            break;
    }
  })
}
function reset() {
  playerX = 250;
  playerY = 32 + 15;
  score = 0;
  set = 0;
  player.position.set(250 - 32, 30);
  for (var i = 0; i < map.length; i++) {
    map[i].position.set(0, height * i);
  }
}
function gameKey() {
  vectorX += slope
}
function gamemain() {
  if (goal == null) {
    var wind = Math.floor(Math.random() * 10);
    if (wind == 0) {
      wind = Math.floor(Math.random() * 2)
      if (wind == 0) {
        vectorX += 0.2;
      } else if (wind == 1) {
        vectorX -= 0.2;
      }
    }
    //マップスクロール
    hoge += vectorY;
    for (var i = 0; i < map.length; i++) {
      map[i].position.x -= vectorX;
    }
    playerX += vectorX;
    //  console.log(playerX);
    if (a == null) {
      player.position.y += vectorY;
      playerY += vectorY;
      positionY += vectorY;
      if (positionY == 100) {
        a = false;
      }
    } else {
      for (var i = 0; i < map.length; i++) {
        map[i].position.y -= vectorY;
      }
      playerY += vectorY;
    }
    f++;
    if (f == 20) {
      score++;
      scoretext.setText(score + "m");
      f = 0;
    } else if (score == 75) {
      goal = false;
    }
    if (rgba[0] != 255 || rgba[1] != 255 || rgba[2] != 255) {
      gameMode = "end";

    }
  }
  //当たり判定
  if (goal == false) {
    player.position.y += vectorY;
    playerY -= 1;
    if (rgba[0] != 255 || rgba[1] != 255 || rgba[2] != 255) {
      player_goal.position.set(player.position.x, player.position.y);
      stage.addChild(player_goal);
      stage.removeChild(player);
      gameMode = "clea";
    }
  }
}
window.addEventListener("deviceorientation", function(e) {
  slope = e.gamma/600
})
