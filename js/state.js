const MakeGreyPlus = (color = 0x27AE60) => {
  const G = new PIXI.Graphics();
  // G.beginFill(0x5d0015);
  const fontSize = innerWidth / 10,  
  width = 0.5927 * fontSize;
  const lineWidth = fontSize * 0.06999 / 2;
  G.lineStyle({
    width: lineWidth,
    color,
    miterLimit: 200
  });
  const dash = lineWidth, gap = lineWidth / 2;
  const drawDashLine = (
    G,
    fromX, fromY,
    toX, toY
  ) => {
    const dist = Math.sqrt(Math.pow(fromX - toX, 2) + Math.pow(fromY - toY, 2));
    const angle = Math.atan2(toY - fromY, toX - fromX);
    const segmentsCount = Math.floor(dist / (dash + gap)),
          offset = (dist - dash * segmentsCount - gap * (segmentsCount - 1)) / 2;
    for (let i = 0; i < segmentsCount; ++i) {
      G.moveTo(
        fromX + Math.cos(angle) * Math.min(dist, offset + i * (dash + gap)),
        fromY + Math.sin(angle) * Math.min(dist, offset + i * (dash + gap))
      );
      G.lineTo(
        fromX + Math.cos(angle) * Math.min(dist, offset + (i * (dash + gap) + dash)),
        fromY + Math.sin(angle) * Math.min(dist, offset + (i * (dash + gap) + dash))
      );
    }
  }

  const rx = 1 / 43 * width,
        ry = 1 / 72 * fontSize;
  let cx = fontSize/2, cy = fontSize/2;
  const M = (x, y) => G.moveTo(cx = x, cy = y);
  const V = (y) => {
    const l = cy > y ? -1 : 1;
    drawDashLine(G, cx, cy - l * lineWidth / 2, (cx), (cy = y) + l * lineWidth / 2);
  }
  const H = (x) => {
    const l = cx > x ? -1 : 1;
    drawDashLine(G, cx - l * lineWidth / 2, cy, (cx = x) + l * lineWidth / 2, cy);
  }
  M(16.4883 * rx, 22.546 * ry);
  H(25.4883 * rx);
  V(35.9414 * ry);
  H(39.0234 * rx);
  V(45.1875 * ry);
  H(25.4883 * rx);
  V(58.5820 * ry);
  H(16.4883 * rx);
  V(45.1875 * ry);
  H(2.98828 * rx);
  V(35.9414 * ry);
  H(16.4883 * rx);
  V(22.546 * ry);


  console.log(G)
  return G;
}

let state = {
  worldSpeed: 1,
  startText: 0,
  shRealSize: PIXI.TextMetrics.measureText('Ш', config.styles.sh),
  plusRealSize: PIXI.TextMetrics.measureText('+', config.styles.greenPlus),
  recordScore: 0,
  scoreObject: new PIXI.Text('0', config.styles.score),
  sh: new PIXI.Text('Ш', config.styles.sh),
  greyPlus: MakeGreyPlus(),
  fontSize: Width / 10,
  deadPlus: {
    value: 0,
  }, // number dead plus
  deadGoldPlus: {
    value: 0,
  }, // number dead gold plus
  canAnimTransform: false, // start anim gold plus
  pushPlusNextSh: false, // start push plus next sh
  rightPressed: false, // if right arrow pressed
  leftPressed: false, // if left arrow pressed
  difficult: 0, // levels of difficulty
  replic: 0, // replics counter
  stop: false, // stop game
  gravity: 0,
  intervalOfFallingPluses: {
    falling: 1200,
  },
  plusFell: true, // if plus fell
  timeWhenFunctionsDone: 0,
  timeNow: 0,
  score: 0,
  scoreSpeed: 0,
  scoreAnimSwitch: false,
  scoreAnimDo: false,
  scoreColorAlpha: 1,
  scoreAnimRemoveVariables: false,
  catchedGoldPluses: 0, // how many gold pluses
  allGoldCatched: true,
  pluses: {
    falling: [],
    caughtPluses: [], // caught pluses
    boom: [], // grey boom pluses
    Transform: [], // pluses which used to anim gold plus
    gold: [],
  },
  shSizes: {
    x: 0,
    y: 0,
    h: 0,
    w: 0,
  },
  
};

function openMenu(open) {
  let menu = document.getElementById("GameOverMenu");
  menu.className = open ? 'open' : '';
}

function CreateFallingPlus() {
  if (!state.stop) {
    const newPlus = new PIXI.Text('+', config.styles.greenPlus);
    state.pluses.falling.push(newPlus);
    createPlus(newPlus);
    // setTimeout(CreateFallingPlus, state.intervalOfFallingPluses.falling);
  }
}

function FallingPlusCreater() {
  const now = Date.now();
  if (now - state.intervalOfFallingPluses.lastCreated >= state.intervalOfFallingPluses.falling / state.worldSpeed) {
    CreateFallingPlus();
    state.intervalOfFallingPluses.lastCreated = now;
  }
}

function initialization() {
  openMenu(false)
  for (let i = 0; i < state.pluses.boom.length; i++) {
    app.stage.removeChild(state.pluses.boom[i]);
  }
  app.stage.removeChild(state.sh);
  app.stage.removeChild(state.greyPlus);
  app.stage.removeChild(state.scoreObject);
  for (let i = 0; i < state.pluses.falling.length; i++) {
    app.stage.removeChild(state.pluses.falling[i]);
  }
  for (let i = 0; i < state.pluses.caughtPluses.length; i++) {
    app.stage.removeChild(state.pluses.caughtPluses[i]);
  }
  for (let i = 0; i < state.pluses.Transform.length; i++) {
    app.stage.removeChild(state.pluses.Transform[i]);
  }
  for (let i = 0; i < state.pluses.gold.length; i++) {
    app.stage.removeChild(state.pluses.gold[i]);
  }

  state = {
    worldSpeed: 1,
    recordScore: 0,
    shRealSize: PIXI.TextMetrics.measureText('Ш', config.styles.sh),
    plusRealSize: PIXI.TextMetrics.measureText('+', config.styles.greenPlus),
    scoreObject: new PIXI.Text('0', config.styles.score),
    sh: new PIXI.Text('Ш', config.styles.sh),
    greyPlus: MakeGreyPlus(),
    fontSize: Width / 10,
    deadPlus: {
      value: 0,
    }, // number dead plus
    deadGoldPlus: {
      value: 0,
    }, // number dead gold plus
    canAnimTransform: false, // start anim gold plus
    pushPlusNextSh: false, // start push plus next sh
    rightPressed: false, // if right arrow pressed
    leftPressed: false, // if left arrow pressed
    difficult: 0, // levels of difficulty
    stop: false, // stop game
    gravity: 0,
    intervalOfFallingPluses: {
      lastCreated: 0,
      falling: 1200,
    },
    plusFell: true, // if plus fell
    timeWhenFunctionsDone: 0,
    timeNow: 0,
    score: 0,
    scoreSpeed: 0,
    scoreAnimSwitch: false,
    scoreAnimDo: false,
    scoreColorAlpha: 1,
    scoreAnimRemoveVariables: false,
    catchedGoldPluses: 0, // how many gold pluses
    allGoldCatched: true,
    pluses: {
      falling: [],
      caughtPluses: [], // caught pluses
      boom: [], // grey boom pluses
      Transform: [], // pluses which used to anim gold plus
      gold: [],
    },
    shSizes: {
      x: 0,
      y: 0,
      h: 0,
      w: 0,
    },
  };
  state.stop = false;
  state.greyPlus.shag = {};
  state.greyPlus.shag.x = Math.floor(Math.random() * (config.sizesForRandom.x));
  state.greyPlus.shag.y = Math.floor(Math.random() * (config.sizesForRandom.y));
  state.greyPlus.rotationStep = Math.random() * config.rotationRandomizer;
  state.sh.x = config.shStartXPosition;
  state.sh.y = innerHeight - state.shRealSize.height;
  state.sh.shag = {};
  state.sh.shag.x = Math.floor(Math.random() * (config.sizesForRandom.x));
  state.sh.shag.y = Math.floor(Math.random() * (config.sizesForRandom.y));
  state.sh.angle = 0;
  state.sh.rotationStep = Math.random() * config.rotationRandomizer;
  state.scoreObject.x = config.scorePositionX;
  document.body.appendChild(app.view);
  app.stage.addChild(state.scoreObject);
  app.stage.addChild(state.sh);
  app.stage.addChild(state.greyPlus);
  state.startGame = true;
  state.greyPlus.y = state.sh.y
  // CreateFallingPlus();
}