browser.storage.sync.set({todos:[]});
browser.alarms.onAlarm.addListener(listen);

function listen(alarm){
  console.log(alarm);
  var prom = browser.storage.sync.get(null);
  prom.then((res) => {
    console.log(res.todos[parseInt(alarm.name)]);
    browser.notifications.create('notify', {
      "type": "basic",
      "iconUrl": 'icons/clock.jpg',
      "title": "Todo4U Notifier",
      "message": alarm.name
    });
    /*browser.notifications.onClicked.addListener(function(notificationId) {
      console.log('Notification ' + notificationId + ' was clicked by the user');
      if(res.todos[parseInt(alarm.name)]+3!=''){
        browser.tabs.create({
          url:res.todos[parseInt(alarm.name)+3]
        });
      }
    });*/
  });
}
