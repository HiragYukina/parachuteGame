var stage;
var set = 0;
var player,
  player_goal,
  playerX = 250,
  playerY = 32 + 15,
  map = [],
  backcanvas = [],
  rgba = [];
var gameMode = "title"

  var width = 500,
    height = 500;
  var renderOption = {
    antialiasing: false,
    transparent: false,
    resolution: window.devicePixeRatio,
    autoResize: true,
    backgroundColor: 0xffffff
  }
  var renderer = PIXI.autoDetectRenderer(500, 600, renderOption);
  renderer.view.style.position = "absolute";
  renderer.view.style.top = "0px";
  renderer.view.style.left = "0px";
  renderer.backgroundColor = "break";
  var canvas = renderer.view;
  var ctx = canvas.context;

  var stage = new PIXI.Container();
  var score = 0;
  var scoretext = new PIXI.Text(score + "m", {
    font: "20px",
    fill: "aquamarine"
  });
  scoretext.position.set(450, 10);

  var titl = new PIXI.Text("START", {
    font: "20px",
    fill: "red"
  });
  titl.position.set(width / 2 - 20 * 3, height / 2);

  var scorelabel = new PIXI.Text("現在位置", {
    font: "20px",
    fill: "red"
  });
  scorelabel.position.set(350, 10);

  window.addEventListener("DOMContentLoaded", init);
  document.body.appendChild(renderer.view);

  function init() {
    PIXI.loader.add("images/player.png").add("images/map0.png").add("images/map1.png").add("images/map2.png").add("images/map3.png").add("images/map4.png").add("images/map5.png").add("images/map6.png").add("images/player1.png").load(setup);

    //ctx.fillText(score, 0, 30);
    //ゲーム開始
  }
  function setup() {
    player = new PIXI.Sprite(PIXI.loader.resources["images/player.png"].texture);
    player.position.set(250 - 32, 30);
    player_goal = new PIXI.Sprite(PIXI.loader.resources["images/player1.png"].texture);
    //バックグランド作業
    for (var i = 0; i < 7; i++) {
      backcanvas[i] = document.createElement("canvas");
      backcanvas[i].width = 500;
      backcanvas[i].height = 500;
      var bctx = backcanvas[i].getContext("2d");
      var image = PIXI.loader.resources["images/map" + i + ".png"].texture.baseTexture.source;
      bctx.drawImage(image, 0, 0);
      map[i] = new PIXI.Sprite.from(backcanvas[i]);
      map[i].position.set(0, height * i);
      stage.addChild(map[i]);
    }
    //    map2 = new PIXI.Sprite(PIXI.loader.resources["images/stage2.png"].texture);
    //    map2.position.set(0, height);
    setting();
    requestAnimationFrame(animate);
  }
  function setting() {
    stage.addChild(titl);
    stage.addChild(player);
    stage.addChild(scorelabel);
    stage.addChild(scoretext);
  }
  //色の判定
  function decision() {
    if (hoge == 500) {
      set++;
      hoge = 0;
    }
    var player_positionY = playerY - (height * set);
    var ctx = backcanvas[set].getContext("2d");
    var imagdata = ctx.getImageData(0, 0, backcanvas[set].width, backcanvas[set].height);
    var data = imagdata.data;
    var e = ((Math.floor(player_positionY) * backcanvas[set].width) + Math.floor(playerX)) * 4
    for (var i = 0; i < 4; i++) {
      rgba[i] = data[i + e];
    }
    //console.log(rgba);

  }
  function animate() {
    requestAnimationFrame(animate);
    decision();
    render();
    renderer.render(stage);
  }
  function render() {
    //ctx.clearRect(0, 0, width, height);
    switch (gameMode) {
      case "title":
      titlrender()
      break;
      case "game":
        gamemain();
        gameKey();
        break;
      case "clea":
        var goallabel = new PIXI.Text("ゴール", {
          font: "20px",
          fill: "red"
        });
        goalabel.position.set(width / 2 - 10, height / 2);
        stage.addChild(goalabel);
        addEventListener("touchstart", function() {
          stage.removeChild(goalabel);
          reset()
        });
        break;
      case "end":
        var endlabel = new PIXI.Text("END", {
          font: "20px",
          fill: "red"
        });
        endlabel.position.set(width / 2 - 10, height / 2);
        stage.addChild(endlabel);
        addEventListener("touchstart", function() {
          stage.removeChild(endlabel);
          reset()
        });
        break;
    }
  }
