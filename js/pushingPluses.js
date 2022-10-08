function round(numb, float) {
  return +numb.toFixed(float);
}

function pushBoomPluses(lastPlus, parentPlus) {
  lastPlus.x = parentPlus.x;
  lastPlus.y = parentPlus.y;
  lastPlus.rotationStep = Math.random() * config.rotationRandomizer;
  lastPlus.xShag = Math.floor(Math.random() * config.sizesForRandom.x);
  lastPlus.yShag = Math.floor(Math.random() * config.sizesForRandom.y);
  state.pluses.gravity = 0.4;
  app.stage.addChild(lastPlus);
}

function BoomPush() {
  if (state.pluses.caughtPluses.length > 0 && state.deadPlus.value > 0) {
    for (let a = state.deadPlus.value - 1; a < state.pluses.caughtPluses.length; a++) {
      state.pluses.boom.push(new PIXI.Text('+', config.styles.grayPlus));
      const lastPlus = state.pluses.boom[state.pluses.boom.length - 1];
      pushBoomPluses(lastPlus, state.pluses.caughtPluses[a]);
    }
  }
  if (state.pluses.gold.length > 0 && state.deadGoldPlus.value > 0) {
    for (let a = state.deadGoldPlus.value - 1; a < state.pluses.gold.length; a++) {
      state.pluses.boom.push(new PIXI.Text('+', config.styles.grayPlus));
      const lastPlus = state.pluses.boom[state.pluses.boom.length - 1];
      pushBoomPluses(lastPlus, state.pluses.gold[a]);
    }
  }
}
// Функция которая создаёт новый плюс и закидывает его в массив------------------------------------------------
function createPlus(lastPlus) {
  lastPlus.catched = false;
  lastPlus.onPlace = false;
  lastPlus.kill = false;
  if (state.difficult === 0) {
    lastPlus.speed = round((config.minSpeed + (config.sizesForSpeedRandom.y * Math.random())), 2);
  }
  if (state.difficult === 1) {
    lastPlus.speed = round((config.minSpeed + (config.sizesForSpeedRandom.y * Math.random())), 2) + config.fallingPlusesSpeed * 0.2;
  }
  if (state.difficult === 2) {
    lastPlus.speed = round((config.minSpeed + (config.sizesForSpeedRandom.y * Math.random())), 2) + config.fallingPlusesSpeed * 0.4;
    state.intervalOfFallingPluses.falling = 1000;
  }
  if (state.difficult === 3) {
    lastPlus.speed = round((config.minSpeed + (config.sizesForSpeedRandom.y * Math.random())), 2) + config.fallingPlusesSpeed * 0.6;
    state.intervalOfFallingPluses.falling = 800;
  }
  if (state.difficult >= 4) {
    lastPlus.speed = round((config.minSpeed + (config.sizesForSpeedRandom.y * Math.random())), 2) + config.fallingPlusesSpeed * 0.69;
    state.intervalOfFallingPluses.falling = 650;
  }
  if (state.difficult >= 6) {
    lastPlus.speed = round((config.minSpeed + (config.sizesForSpeedRandom.y * Math.random())), 2) + config.fallingPlusesSpeed * 0.7;
    state.intervalOfFallingPluses.falling = 600;
  }

  if (state.difficult >= 9) {
    lastPlus.speed = round((config.minSpeed + (config.sizesForSpeedRandom.y * Math.random())), 2) + config.fallingPlusesSpeed * 0.8;
    state.intervalOfFallingPluses.falling = 550;
  }

  if (state.difficult >= 11) {
    lastPlus.speed = round((config.minSpeed + (config.sizesForSpeedRandom.y * Math.random())), 2) + config.fallingPlusesSpeed * 0.8;
    state.intervalOfFallingPluses.falling = 500;
  }

  if (state.difficult >=13) {
    lastPlus.speed = round((config.minSpeed + (config.sizesForSpeedRandom.y * Math.random())), 2) + config.fallingPlusesSpeed * 0.8;
    state.intervalOfFallingPluses.falling = 450;
  }
  if (state.difficult >= 15) {
    lastPlus.speed = round((config.minSpeed + (config.sizesForSpeedRandom.y * Math.random())), 2) + config.fallingPlusesSpeed * 0.8;
    state.intervalOfFallingPluses.falling = 400;
  }

  lastPlus.rotationStep = round((Math.random() * config.rotationRandomizer), 2);
  lastPlus.x = Math.floor(Math.random() * (innerWidth - 100) + 100);
  lastPlus.y = -100;
  app.stage.addChild(lastPlus);
}

 // Функция которая пушит первый плюс отдельно от других--------------------------------------------------------
// Функция которая пушит плюсы рядом с "Ш" --------------------------------------------------------------------
function PlusCaught(X, Y) {
  state.pluses.caughtPluses.push(new PIXI.Text('+', config.styles.greenPlus));
  const lastPlus = state.pluses.caughtPluses[state.pluses.caughtPluses.length - 1];
  lastPlus.x = X;
  lastPlus.y = Y;
  lastPlus.Transform = false;
  lastPlus.rotationStep = Math.random() * config.rotationRandomizer;
  lastPlus.shag = {};
  lastPlus.catched = true;
  lastPlus.Xshag = Math.floor(Math.random() * config.sizesForRandom.x);
  lastPlus.Yshag = Math.floor(Math.random() * config.sizesForRandom.y);
  app.stage.addChild(lastPlus);
  window.navigator.vibrate(15);
}

function createGoldPlus() {
  const { gold } = state.pluses;
  gold.push(new PIXI.Text('+', config.styles.goldPlus));
  gold[gold.length - 1].x = config.centerOfDisplay.x;
  gold[gold.length - 1].Xshag = Math.floor(Math.random() * config.sizesForRandom.x);
  gold[gold.length - 1].Yshag = Math.floor(Math.random() * config.sizesForRandom.y);
  gold[gold.length - 1].rotationStep = Math.random() * config.rotationRandomizer;
  gold[gold.length - 1].y = config.centerOfDisplay.y;
  gold[gold.length - 1].catched = false;
  app.stage.addChild(gold[gold.length - 1]);
}
