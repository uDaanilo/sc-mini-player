var curPage = { id: undefined }

chrome.runtime.onMessage.addListener((res, sender, sendRes) => {
  if(res.isCurPage) sendRes(sender.tab.id == curPage.id)
})

setInterval(() => {
  chrome.tabs.query({ url: "*://soundcloud.com/*" }, res => {
    if(!res[0] || !res[0].id) return
      curPage.id = res[0].id
  })
}, 500)