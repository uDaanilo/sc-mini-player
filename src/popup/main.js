const title = document.querySelector("#title")
const author = document.querySelector("#author")
const artwork = document.querySelector("#artwork")
const rangeInput = document.querySelector("#slider")
const background = document.querySelector(".background")
var songInfo

actBtns = document.querySelectorAll(".actBtn")

for (let i = 0; i < actBtns.length; i++) {
   actBtns[i].addEventListener('click', e => {
      chrome.tabs.query({ url: "*://soundcloud.com/*" }, res => {
         if(!res[0] || !res[0].id) return chrome.tabs.create({ url: "https://soundcloud.com" })
         chrome.tabs.sendMessage(res[0].id, { event: e.target.parentElement.id })
      })
   })
}

chrome.runtime.onMessage.addListener((res, sender, sendRes) => {
   if(res.isCurPage) return
   songInfo = res

   if(res.title && title.innerText !== res.title) title.innerText = res.title
   if(res.author && author.innerText !== res.author) author.innerText = res.author
   if(res.totalLength) rangeInput.max = res.totalLength

   if(res.artwork) {
      artwork.style.backgroundImage = res.artwork.replace("t50x50", "t500x500")
      background.style.backgroundImage = res.artwork
   }

   if(res.curLength) {
      rangeInput.value = res.curLength
      rangeInput.title = `${res.curLengthFormatted} / ${res.totalLengthFormatted}`
   }

   if(res.playing){
      if(document.getElementById("imgToggle").src.substr("-14") == "play-solid.svg")
         document.getElementById("imgToggle").src = "../assets/pause-solid.svg"
   }else{
      if(document.getElementById("imgToggle").src.substr("-15") == "pause-solid.svg")
         document.getElementById("imgToggle").src = "../assets/play-solid.svg"
   }

   if(res.fav){
      if(document.getElementById("imgFav").src.substr("-15") == "heart-solid.svg")
         document.getElementById("imgFav").src = "../assets/heart-broken-solid.svg"
         document.getElementById("imgFav").style.filter = 'invert(28%) sepia(86%) saturate(7444%) hue-rotate(356deg) brightness(98%) contrast(120%)'
   }else{
      if(document.getElementById("imgFav").src.substr("-22") == "heart-broken-solid.svg")
         document.getElementById("imgFav").src = "../assets/heart-solid.svg"
         document.getElementById("imgFav").style.filter = 'invert(100%) sepia(100%) saturate(0%) hue-rotate(339deg) brightness(112%) contrast(102%)'
   }

   try {
     BackgroundCheck.init({
        targets: ".change__theme",
        images: ".background",
        threshold: 81,
        debug: true
     })

     BackgroundCheck.refresh()
   } catch (e) {
     return
   }

})

title.addEventListener('click', () => songInfo ? chrome.tabs.create({ url: songInfo.songLink }) : null)
