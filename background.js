browser.storage.sync.set({todos:[]});
browser.alarms.onAlarm.addListener(listen);

function listen(alarm){
  var prom = browser.storage.sync.get(null);
  prom.then((res) => {
    browser.notifications.create('notify', {
      "type": "basic",
      "iconUrl": 'icons/clock.jpg',
      "title": "Todo4U Notifier",
      "message": alarm.name
    });
  });
}
