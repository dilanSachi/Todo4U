browser.contextMenus.create({
  id:"td4u",
  title:"Add to Todo4U",
  contexts:["selection"]
});

browser.contextMenus.onClicked.addListener(contextMenuAction);

function contextMenuAction(info,tab){
  const url="https://duckduckgo.com/?q="+info.selectionText;
  browser.tabs.create({url:url});
  var todo={todo:url};
  var sto=browser.storage.sync.set(todo);
}

browser.runtime.onMessage.addListener(letsDo);

function letsDo(data){
  browser.notifications.create({
    "type":"basic",
    "title":"todo",
    "message":"fics"
  });
}
