// function Start() {
//     state.startText = document.getElementById('start');
//     state.startText.innerHTML = config.replics.start[0]
//     state.startText.style.fontSize = 50 + "px"
//     state.startText.style.lineHeight = innerHeight + 'px'
//     state.move = 5;
// }
// Start();
// state.startTextTime = 2.9

// function animStartText() {
//     if (!state.startGame) {
//         state.startText.style.transition = "all " + state.startTextTime + "s"
//         state.startText.style.color = "rgba(0,0,0,0)"
//         state.startText.style.filter = "blur(5px)"
//     }
//     if (state.startGame) {
//         state.startText.innerHTML = ""
// }
// }

// function nullAnimStartText() {
//     if(!state.startGame) {
//     state.replic++;
//     state.startText.style.transition = "none"
//     state.startText.style.filter = "none"
//     state.startText.style.transform = "scale(1)"
//     state.startText.style.verticalAlign = 'middle'
//     state.startText.style.textAlign = 'center'
//     state.startText.style.lineHeight = innerHeight + 'px'
//     state.startText.style.fontSize = 50 + "px"
//     state.startText.style.position = "absolute"
//     state.startText.style.width = innerWidth + "px";
//     state.startText.style.height = innerHeight + "px";
//     state.startText.innerHTML = config.replics.start[state.replic]
//     // if(state.replic > 3){
//     //  state.startTextTime = 1;
//     //  state.animSpeed = 2
//     // }
//     if (state.replic > 6) {
//         initialization();
//         state.startGame = true
//         state.startTextTime = 1
//         state.startText.innerHTML = ""
//     }
//     state.startText.style.color = "rgba(0,0,0,1)"
//     }
// }
// state.animSpeed = 1;
// if (state.animSpeed == 1) {
//    var id1 = setInterval(() => {
//         animStartText();
//         setTimeout(() => {
//             nullAnimStartText();
//         }, state.startTextTime * 1000 + 80)
//     }, state.startTextTime * 1000 + 100)
// } else {
//   var id2 = setInterval(() => {
//         animStartText();
//         setTimeout(() => {
//             nullAnimStartText();
//         }, state.startTextTime * 1000 + 80)
//     }, state.startTextTime * 1000 + 100)
// }
// function skipStart() {
//     clearInterval(id1)
//     clearInterval(id2)
//     state.startGame = true;
//     state.startText.innerHTML = ""
//     initialization();
// }

state.startGame = false
initialization();