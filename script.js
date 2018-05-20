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
      text+='<ul class="list-group list-group-flush"><li class="list-group-item">'+res.todos[i]+'   '+res.todos[i+1]+'   '+res.todos[i+2]+'</li>';
      text+='<button type="button" class="btn btn-primary" id='+i+'">Delete</button>';
    }
    text+='</ul>';
    document.getElementById("oldTodos").innerHTML = text;
    window.onload=function(){
      console.log("KKOO");
      var promii = browser.storage.sync.get(null);
      promii.then((res) => {
        for(i=0;i<res.todos.length;i+=4){
          console.log("redda");
          document.getElementById(i.toString()).addEventListener('click',function(){
            console.log('kjk'+i);
            var removingItem = browser.storage.sync.remove(i);
            removingItem.then(function(){
              viewPrevious();
            });
          });
        }
      });
    }
  });
}

document.getElementById('myBtn').addEventListener('click',function(){
  if(document.getElementById('todoData').value!=""){
    var prom = browser.storage.sync.get(null);
    prom.then((res) => {
      var todos=res.todos;
      var todo=document.getElementById('todoData').value;
      var date=document.getElementById('date').value;
      var time=document.getElementById('time').value;
      var checkURL='';
      var tab=browser.tabs.query({currentWindow:true,active:true});
      tab.then((resd,resi)=>{
        checkURL=resd[0].url;
        todos.push(todo);
        var len=todos.length-1;
        todos.push(date);
        todos.push(time);
        schedule(date,time,len);
        if(document.getElementById('checkURL').checked){
          todos.push(checkURL);
        }else {
          todos.push('');
        }
        console.log(todos);
        var succes=browser.storage.sync.set({todos:todos});
        succes.then((response)=>{
          viewPrevious();
        });
      });
    });
    var promi = browser.storage.sync.get(null);
    promi.then((res) => {
      console.log(res.todos);
    });
  }else{
    alert('Please Enter Data');
  }
});

function schedule(date,time,len){
  console.log(date);
  var myYear=parseInt(date.slice(0,4));
  var myMonth=parseInt(date.slice(5,7))-1;
  var myDay=parseInt(date.slice(8,10));
  var myHour=parseInt(time.slice(0,2));
  var myMin=parseInt(time.slice(3,5));
  var newTimer=new Date(myYear,myMonth,myDay,myHour,myMin);
  console.log(newTimer);
  console.log(Date.parse(newTimer));
  console.log(Date.now());
  const when =Date.parse(newTimer);
  console.log(len.toString());
  browser.alarms.create(len.toString(), {
    when
  });
  var x=browser.alarms.getAll();
  x.then((res)=>{
    console.log(res[0]);
  });

}
