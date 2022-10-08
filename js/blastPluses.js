function blastPL(parentPlus, typeofPlus, a) {
  const {length} = parentPlus;
  for (let i = a - 1; i < length; i++) {
    app.stage.removeChild(parentPlus[parentPlus.length - 1]);
    parentPlus.pop();
    state.score -= typeofPlus;
  }
}

function BlastPlusesNextSh() {
  if (state.pushPlusNextSh && state.deadPlus.value > 0) {
    BoomPush();
    blastPL(state.pluses.caughtPluses, 1, state.deadPlus.value);
    state.deadPlus.value = 0;
    state.pushPlusNextSh = false;
  } 
  if (state.pushPlusNextSh && state.deadGoldPlus.value > 0) {
    state.deadPlus.value = state.pluses.caughtPluses.length;
    BoomPush();
    blastPL(state.pluses.gold, 5, state.deadGoldPlus.value);
    state.deadGoldPlus.value = 0;
    state.deadPlus.value = 0;
    for(let i = 0; i<state.pluses.caughtPluses.length; i++){
    app.stage.removeChild(state.pluses.caughtPluses[i])}
    state.score-=state.pluses.caughtPluses.length
    state.pluses.caughtPluses.length = 0;
    state.pushPlusNextSh = false;
  }
}

function DeletingGreyPlusesAfterBlast() {
  if (state.pluses.boom.map(({
    y,
  }) => y).filter((a) => a != undefined).every((a) => a > innerHeight)) {
    for (let i = 0; i < state.pluses.boom.length; i++) {
      app.stage.removeChild(state.pluses.boom[i]);
    }
    for (let i = 0; i < state.pluses.boom.length; i++) {
      state.pluses.boom.pop;
    }
  }
}

function GameOverBlastAnim() {
  for (let i = 0; i < state.pluses.gold.length; i++) {
    const goldPlus = state.pluses.gold[i];
    goldPlus.x += goldPlus.Xshag;
    goldPlus.y += goldPlus.Yshag;
    goldPlus.rotation += goldPlus.rotationStep;
    goldPlus.Yshag += config.gravity;
  }
  for (let i = 0; i < state.pluses.caughtPluses.length; i++) {
    const plusCaught = state.pluses.caughtPluses[i];
    plusCaught.x += plusCaught.Xshag;
    plusCaught.y += plusCaught.Yshag;
    plusCaught.Yshag += config.gravity;
    plusCaught.rotation += plusCaught.rotationStep;
  }
  state.sh.x += state.sh.shag.x;
  state.sh.y += state.sh.shag.y;
  state.sh.rotation += state.sh.rotationStep;
  state.greyPlus.rotation += state.sh.rotationStep;
  state.sh.shag.y += config.gravity;
  state.greyPlus.x += state.greyPlus.shag.x;
  state.greyPlus.y += state.greyPlus.shag.y;
  state.greyPlus.shag.y += config.gravity;
}

function BoomPlusesMove() {
  for (let r = 0; r < state.pluses.boom.length; r++) {
    state.pluses.boom[r].x += state.pluses.boom[r].xShag;
    state.pluses.boom[r].y += state.pluses.boom[r].yShag;
    state.pluses.boom[r].yShag += state.pluses.gravity;
    state.pluses.boom[r].rotation += state.pluses.boom[r].rotationStep;
  }
  DeletingGreyPlusesAfterBlast();
}
