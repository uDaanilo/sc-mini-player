chrome.runtime.onMessage.addListener((res, sender, sendRes) => {
   if(res.event == 'backward') document.querySelector(".playControls__elements .playControls__prev").click()
   if(res.event == 'toggle') document.querySelector(".playControls__elements .playControls__play").click()
   if(res.event == 'forward') document.querySelector(".playControls__elements .playControls__next").click()
   if(res.event == 'fav') document.querySelector(".playbackSoundBadge .playbackSoundBadge__like").click()
})