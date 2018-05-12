/*document.getElementById('myBtn').addEventListener('click',function(){
  browser.runtime.sendMessage({
    action:'notify'
  });
});*/

document.getElementById('myBtnII').addEventListener('click',function(){
  viewPrevious();
});

function viewPrevious(){
  var prom = browser.storage.sync.get(null);
  prom.then((res) => {
    var text = '<ul class="list-group list-group-flush">';
    var i;
    for (i = 0; i < res.todos.length; i+=4) {
      text+='<ul class="list-group list-group-flush"><li class="list-group-item">'+res.todos[i]+'</li>'
    }
    text+='</ul>'
    document.getElementById("oldTodos").innerHTML = text;
  });
}

document.getElementById('myBtn').addEventListener('click',function(){
  if(document.getElementById('todoData').value!=""){
    var prom = browser.storage.sync.get(null);
    console.log(document.getElementById('checkURL').value);
    prom.then((res) => {
      var todos=res.todos;
      var todo=document.getElementById('todoData').value;
      var date=document.getElementById('date').value;
      var time=document.getElementById('time').value;
      var checkURL='';
      if(document.getElementById('checkURL').value=="on"){
        var tab=browser.tabs.query({currentWindow:true,active:true});
        tab.then((resd,resi)=>{
          checkURL=resd[0].url;
          console.log("asd"+checkURL);
          todos.push(todo);
          todos.push(date);
          todos.push(time);
          todos.push(checkURL);
          console.log(todos);
          var succes=browser.storage.sync.set({todos:todos});
          succes.then((response)=>{
            viewPrevious();
          });
        });
      }
    });
    var promi = browser.storage.sync.get(null);
    prom.then((res) => {
      console.log(res.todos);
    });
  }else{
    alert('Please Enter Data');
  }
});
