var f = 0;
var a = null,
  goal = null;
var positionY = 0;
var hoge = 46;
var vectorY = 2;
var vectorX = 0;
var keystate = {
  "a": false,
  "d": false,
  "x": false,
  "s": false
};

function titlrender() {

  if (keystate["x"]) {
    gameMode = "game"
    stage.removeChild(titl)
  }
}
function gameKey() {
  if (keystate["a"]) {
    vectorX -= 0.1;
    /*
    map1.position.x += 2;
    map2.position.x += 2;*/
    /*for (var i = 0; i < map.length; i++) {
      map[i].position.x += vector;

    }*/
    //playerX -= vector;
  }
  if (keystate["d"]) {
    vectorX += 0.1;
    /*  for (var i = 0; i < map.length; i++) {
      map[i].position.x -= vector;

    }*/
    //playerX += vector;
  }
}
function gamemain() {
  /*if (keystate["s"]) {
    vectorY = 4;
  } else {
    vectorY = 2;
  }*/
  if (goal == null) {
    var wind = Math.floor(Math.random() * (65 + 1 - 55)) + 55;
    if (wind == 60) {
      wind = (Math.floor(Math.random() * (1 + 1 - 0)) + 0)
      if (wind == 0) {
        vectorX += 0.4;
        //console.log(playerX);
      } else if (wind == 1) {
        vectorX -= 0.4;
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
      //console.log(rgba);
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

//キーイベント
window.addEventListener("keydown", function(e) {
  keystate[e.key] = true;
});
window.addEventListener("keyup", function(e) {
  keystate[e.key] = false;
});
