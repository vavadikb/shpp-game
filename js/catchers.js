function PlusCatcher() {
  catchSmth(state.pluses.falling);
}

function GoldCatcher() {
  const lastGold = state.pluses.gold[state.pluses.gold.length - 1];
  const { gold } = state.pluses;
  const grey = state.greyPlus;
  if (state.pluses.gold.length > 0) {
    if (grey.y - lastGold.y < 1
            && grey.x - lastGold.x < 1) {
      lastGold.catched = true;
    }
  }
  state.catchedGoldPluses = 0;
  for (let i = 0; i < gold.length; i++) {
    if (gold[i].catched) {
      state.catchedGoldPluses += 1;
    }
  }
}

function SayNumberKnockedPlus(plus, dead) {
  for (let i = 0; i < state.pluses.falling.length; i++) {
    for (let a = 0; a < plus.length; a++) {
      let falling = state.pluses.falling[i];
      let plusDist = config.catchedPlusesDist;
      if (plus[a].x < falling.x + plusDist / 2
                && plus[a].x + plusDist > falling.x + plusDist / 2
                && !falling.catched
                && !falling.kill
                && !plus[a].Transform
                && plus[a].catched) {
        if (plus[a].y > falling.y
                    && plus[a].y - plusDist < falling.y) {
                     
          dead.value = a + 1;
          state.pushPlusNextSh = true;
          falling.kill = true;
          app.stage.removeChild(falling);
          return;
        }
      }
    }
  }
}

function isAllGoldPlusesCatched() {
  for (let i = 0; i < state.pluses.gold.length; i++) {
    if (!state.pluses.gold[i].catched) {
      state.allGoldCatched = false;
    } else {
      state.allGoldCatched = true;
    }
  }
}

function CatcherAnimCaller() {
  CatcherAnimSmth(state.pluses.falling);
}

function CatcherAnimSmth(y) {
  const pluses = y;
  
    for (plus of pluses) {
      if (plus.catched) {
        const shagY = (state.greyPlus.y - plus.y) / 6;
        const shagX = (state.greyPlus.x - plus.x) / 2;

        if (plus.x < state.greyPlus.x && !plus.caught) {
          plus.x += shagX;
        }
        if (plus.x > state.greyPlus.x && !plus.caught) {
          plus.x += shagX;
        }
        if (plus.y < state.greyPlus.y && !plus.caught) {
          plus.y += shagY;
        }
        if (plus.y > state.greyPlus.y - 1 && !plus.caught) {
          plus.y = state.greyPlus.y;
          plus.x = state.greyPlus.x;
          plus.caught = true;
          state.scoreAnimDo = true;
          state.scoreAnimRemoveVariables = true;
          state.scoreAdd = true;
          PlusCaught(plus.x, plus.y);
          app.stage.removeChild(plus);
          state.scoreDecreasMarker += 1;
        }
      }
    }

}

function catchSmth(arr) {
  for (const fallin of arr) {
    if (
      fallin.y < innerHeight - state.fontSize / 2.5 && 
      fallin.y > innerHeight - state.fontSize * 2.5 && 
      !fallin.catched && 
      state.allGoldCatched
    ) {
      if (
        fallin.x > state.greyPlus.x - state.fontSize / 2
                && fallin.x < state.greyPlus.x + state.fontSize / 2
                && !fallin.kill
      ) {
        fallin.catched = true;
      }
    }
  }
}

function SayNumberKnockedPlusCaller() {
  SayNumberKnockedPlus(state.pluses.gold, state.deadGoldPlus);
  SayNumberKnockedPlus(state.pluses.caughtPluses, state.deadPlus);
}
