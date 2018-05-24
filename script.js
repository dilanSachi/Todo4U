
document.getElementById('myBtnII').addEventListener('click',function(){
  viewPrevious();
});

function viewPrevious(){
  var prom = browser.storage.sync.get(null);
  prom.then((res) => {
    var ul = document.createElement('ul');
    ul.classList.add('list-group', 'list-group-flush');

    var i;
    for (i = 0; i < res.todos.length; i+=4) {
        var li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = res.todos[i]+'   '+res.todos[i+1]+'   '+res.todos[i+2];
        ul.appendChild(li);
        if(res.todos[i+3]!=''){
          var li = document.createElement('li');
          li.classList.add('list-group-item');
          li.textContent = "Saved URL : "+res.todos[i+3];
          ul.appendChild(li);
        }

        var button = document.createElement('button');
        button.classList.add('btn', 'btn-primary');
        button.addEventListener('click', myFunc);
        button.id = i;
        button.innerText="Delete";

        ul.appendChild(button);
    }
    document.getElementById("oldTodos").innerHTML = '';
    document.getElementById("oldTodos").appendChild(ul);

  });
}

function myFunc(){
  var prom=browser.storage.sync.get(null);
  prom.then((res)=>{
    var todos=res.todos;
    todos.splice(parseInt(this.id),4);
    var succes=browser.storage.sync.set({todos:todos});
    succes.then((response)=>{
      viewPrevious();
    });
  });
}

document.getElementById('myBtn').addEventListener('click',function(){
  if(document.getElementById('todoData').value!="" && document.getElementById('date').value!='' && document.getElementById('time').value==''){
    alert("Enter  time");
  }else if(document.getElementById('todoData').value!='' && document.getElementById('date').value=='' && document.getElementById('time').value!=''){
    alert("Enter date");
  }else if(document.getElementById('todoData').value!=""){
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
        todos.push(date);
        todos.push(time);
        if(date!='' && time!=''){
          schedule(date,time,todo);
        }
        if(document.getElementById('checkURL').checked){
          todos.push(checkURL);
        }else {
          todos.push('');
        }
        var succes=browser.storage.sync.set({todos:todos});
        succes.then((response)=>{
          viewPrevious();
        });
      });
    });
  }else{
    alert('Please Enter Data');
  }
});

function schedule(date,time,todo){
  var myYear=parseInt(date.slice(0,4));
  var myMonth=parseInt(date.slice(5,7))-1;
  var myDay=parseInt(date.slice(8,10));
  var myHour=parseInt(time.slice(0,2));
  var myMin=parseInt(time.slice(3,5));
  var newTimer=new Date(myYear,myMonth,myDay,myHour,myMin);
  const when =Date.parse(newTimer);
  browser.alarms.create(todo, {
    when
  });
}
