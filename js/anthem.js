// Plays the national anthem and provides a mute button.
// Browsers only allow audio after a user gesture, so playback starts
// on the first click or key press. The mute setting is remembered.
(function () {
  var audio = document.getElementById("anthem");
  var btn = document.querySelector(".mute-button");
  if (!audio || !btn) return;

  var KEY = "cn2048-muted";

  function readMuted() {
    try { return localStorage.getItem(KEY) === "1"; } catch (e) { return false; }
  }

  function saveMuted(value) {
    try { localStorage.setItem(KEY, value ? "1" : "0"); } catch (e) {}
  }

  var muted = readMuted();
  audio.volume = 0.6;

  function render() {
    audio.muted = muted;
    btn.textContent = muted ? "取消静音" : "静音";
    btn.setAttribute("aria-pressed", muted ? "true" : "false");
  }

  function play() {
    if (muted || !audio.paused) return;
    var p = audio.play();
    if (p && p.catch) p.catch(function () {});
  }

  btn.addEventListener("click", function (event) {
    event.stopPropagation();
    muted = !muted;
    saveMuted(muted);
    render();
    play();
  });

  function onFirstGesture() {
    document.removeEventListener("keydown", onFirstGesture);
    document.removeEventListener("pointerdown", onFirstGesture);
    play();
  }

  document.addEventListener("keydown", onFirstGesture);
  document.addEventListener("pointerdown", onFirstGesture);

  render();
})();
