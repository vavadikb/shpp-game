function GameScore() {
  state.scoreObject.text = state.score;
  if (state.scoreAdd) {
    AddScoreAnimation();
    state.score += 1;
    if (state.recordScore < state.score){
      state.recordScore = state.score;
      let gameOvrScore = document.getElementById("GameOverShScore")
      gameOvrScore.innerHTML = "" + state.recordScore;
    }
  }
  state.scoreAdd = false;
}


function ScoreAnimPlus() {
  if (state.scoreColorAlpha < 1) {
    state.scoreObject.style.fill = `rgba(39, 174, 96,${state.scoreColorAlpha})`;
    state.scoreColorAlpha += 0.05;
    state.scoreObject.style.stroke = `rgba(39, 174, 96,${state.scoreColorAlpha})`;
  }
  // if(state.scoreObject.y >= state.fontSize) {
  //     state.scoreSpeed = -10;
  //     state.scoreAnimSwitch = true;

  // }
  // if(state.gravity < 2) {
  //     state.scoreObject.y += state.scoreSpeed;
  // }

  // if(state.scoreAnimSwitch && state.scoreSpeed < 15) {
  //     state.scoreSpeed += state.gravity;
  //     state.gravity += 0.04;

  // }

  const duration = 150;
  const time = Date.now();

  if (time > state.scoreAnimationStart + duration) {
    state.scoreObject.y = state.fontSize*0.3;
  } else {
    state.scoreObject.y = (state.fontSize*0.3)- Math.sin((time - state.scoreAnimationStart) / duration * Math.PI) * state.fontSize * 0.2;
  }
}
function AddScoreAnimation() {
  state.scoreAnimationStart = Date.now();
}

function ScoreVariablesRemove() {
  if (state.scoreAnimRemoveVariables) {
    state.scoreObject.y = 0;
    state.scoreSpeed = 15;
    state.scoreColorAlpha = 0;
    state.gravity = 0;
    state.scoreObject.style.stroke = 'rgba(0,0,0,0)';
    state.scoreAnimSwitch = false;
    state.scoreAnimRemoveVariables = false;
  }
  ScoreAnimPlus();
}