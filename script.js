const songs = [
  { title: "KING", src: "music/KING.mp3" },
  { title: "THIS A MUST", src: "music/THIS A MUST.mp3" },
  { title: "FATHER (feat. Travis Scott)", src: "music/FATHER (feat. Travis Scott).mp3" },
  { title: "ALL THE LOVE (feat. Andre Troutman)", src: "music/ALL THE LOVE (feat. Andre Troutman).mp3" },
  { title: "PUNCH DRUNK", src: "music/PUNCH DRUNK.mp3" },
  { title: "WHATEVER WORKS", src: "music/WHATEVER WORKS.mp3" },
  { title: "MAMA'S FAVORITE", src: "music/MAMA'S FAVORITE.mp3" },
  { title: "SISTERS AND BROTHERS", src: "music/SISTERS AND BROTHERS.mp3" },
  { title: "BULLY (feat. CeeLo Green)", src: "music/BULLY (feat. CeeLo Green).mp3" },

  { title: "HIGHS AND LOWS", src: "music/HIGHS AND LOWS.mp3" },
  { title: "I CAN'T WAIT (feat. Ms. Lauryn Hill)", src: "music/I CAN'T WAIT (feat. Ms Lauryn Hill).mp3" },
  { title: "WHITE LINES (feat. Andre Troutman)", src: "music/WHITE LINES (feat. Andre Troutman).mp3" },
  { title: "CIRCLES", src: "music/CIRCLES.mp3" },
  { title: "PREACHER MAN", src: "music/PREACHER MAN.mp3" },
  { title: "BEAUTY AND THE BEAST", src: "music/BEAUTY AND THE BEAST.mp3" },
  { title: "DAMN", src: "music/DAMN.mp3" },
  { title: "LAST BREATH (feat. Peso Pluma)", src: "music/LAST BREATH (feat. Peso Pluma).mp3" },
  { title: "THIS ONE HERE", src: "music/THIS ONE HERE.mp3" },
  { title: "OK (feat. Don Toliver)", src: "music/OK (feat. Don Toliver).mp3" },
  { title: "MISSION CONTROL (feat. The WRLDFMS Tony Williams)", src: "music/MISSION CONTROL (feat. The WRLDFMS Tony Williams).mp3" }
];

let currentSong = 0;
let isUpdating = false;

const audio = document.getElementById("audio");
const playlist = document.getElementById("playlist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playBtn = document.getElementById("playBtn");
const titleDisplay = document.getElementById("title");

function loadSongs() {
  songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.classList.add("song");

    div.innerText = (index + 1) + ". " + song.title;

    div.onclick = () => {
      currentSong = index;
      playSong();
    };

    playlist.appendChild(div);
  });
}

function updateActiveSong() {
  const allSongs = document.querySelectorAll(".song");
  allSongs.forEach(s => s.classList.remove("active"));
  allSongs[currentSong].classList.add("active");
}

function playSong() {
  const song = songs[currentSong];

  audio.src = song.src;
  audio.currentTime = 0;
  progress.value = 0;

  audio.play();

  titleDisplay.innerText = song.title;
  playBtn.innerText = "⏸";

  updateActiveSong();

  isUpdating = false;
  startProgressLoop();
}

function playPause() {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸";
    startProgressLoop();
  } else {
    audio.pause();
    playBtn.innerText = "▶";
  }
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  playSong();
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  playSong();
}

audio.addEventListener("ended", nextSong);

function startProgressLoop() {
  if (isUpdating) return;
  isUpdating = true;

  function update() {
    if (!audio.paused && audio.duration) {
      progress.value = (audio.currentTime / audio.duration) * 100;

      document.getElementById("current").innerText = formatTime(audio.currentTime);
      document.getElementById("duration").innerText = formatTime(audio.duration);
    }
    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  if (sec < 10) sec = "0" + sec;
  return min + ":" + sec;
}

loadSongs();
