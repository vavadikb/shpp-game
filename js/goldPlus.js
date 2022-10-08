function GoldPlusMove() {
  const { gold } = state.pluses;
  if (gold.length > 0 && !gold[gold.length - 1].catched) {
    gold[gold.length - 1].x -= Math.floor((gold[gold.length - 1].x - state.greyPlus.x) / config.animGoldPlusSpeed);
    gold[gold.length - 1].y -= Math.floor((gold[gold.length - 1].y - state.greyPlus.y) / config.animGoldPlusSpeed);
  }
}

function TransformPlusDelete() {
  const { length } = state.pluses.Transform;
  let bool = false;
  if (length > 0) {
    if (state.pluses.Transform[0].y < config.centerOfDisplay.y + 1) {
      createGoldPlus();
      bool = true;
    }
  }
  if (bool) {
    for (let i = length - 1; i > -1; i--) {
      app.stage.removeChild(state.pluses.Transform[state.pluses.Transform.length - 1]);
      state.pluses.Transform.pop();
    }
  }
}

function GoldPlAnim() {
  if (state.canAnimTransform) {
    for (let i = 0; i < state.pluses.Transform.length; i++) {
      const animpl = state.pluses.Transform[i];
      animpl.x -= (animpl.x - config.centerOfDisplay.x) / config.animGoldPlusSpeed;
      animpl.y += (config.centerOfDisplay.y - animpl.y) / config.animGoldPlusSpeed;
    }
  }
}

function GoldPlus() {
  if (state.pluses.caughtPluses.length % 5 === 0) {
    const { length } = state.pluses.caughtPluses;
    for (let i = 0; i < length; i++) {
      const plus = state.pluses.caughtPluses[i];
      const tr = state.pluses.Transform;
      tr.push(new PIXI.Text('+', config.styles.greenPlus));
      tr[tr.length - 1].x = plus.x;
      tr[tr.length - 1].y = plus.y;
      app.stage.addChild(tr[tr.length - 1]);
      app.stage.removeChild(plus);
    }
    state.canAnimTransform = true;
    for (let i = 0; i < length; i++) {
      state.pluses.caughtPluses.pop();
    }
  }
}
