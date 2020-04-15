window.onload = function(){
   setInterval(() => {
      chrome.runtime.sendMessage({isCurPage: '?'}, res => {
         if(res) this.updateSongInfo()
      })
   }, 100)
}

var songInfo = {}

function updateSongInfo(){
   songInfo = {
      artwork: document.querySelector(".playbackSoundBadge span.sc-artwork").style.backgroundImage,
      title: document.querySelector(".playbackSoundBadge .playbackSoundBadge__title a").title,
      author: document.querySelector(".playbackSoundBadge .playbackSoundBadge__lightLink").title,
      songLink: document.querySelector(".playbackSoundBadge .playbackSoundBadge__titleLink").href,
      curLength: document.querySelector(".playbackTimeline__progressWrapper").getAttribute("aria-valuenow"),
      curLengthFormatted: document.querySelectorAll(".playbackTimeline__timePassed span")[1].innerText,
      totalLength: document.querySelector(".playbackTimeline__progressWrapper").getAttribute("aria-valuemax"),
      totalLengthFormatted: document.querySelectorAll(".playbackTimeline__duration span")[1].innerText,
      playing: document.querySelector(".playControls__play").classList.toString().search("playing") != -1 ? true : false,
      fav: document.querySelector(".playbackSoundBadge .playbackSoundBadge__like").classList.toString().search("sc-button-selected") != -1 ? true : false
   }

   chrome.runtime.sendMessage(songInfo)
}

