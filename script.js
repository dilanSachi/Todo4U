/*document.getElementById('myBtn').addEventListener('click',function(){
  browser.runtime.sendMessage({
    action:'notify'
  });
});*/

document.getElementById('myBtn').addEventListener('click',function(){
  var todo={todo:document.getElementById('todoData').value};
  console.log(todo);
  var sto=browser.storage.sync.set(todo);
  alert(browser.storage.sync.get(null));
  console.log(browser.storage.sync.get(null));
});
