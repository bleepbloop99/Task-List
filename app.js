const clear=document.querySelector(".clear");
const dateElement=document.getElementById("date");
const list=document.getElementById("list");
const input=document.getElementById("input");
const time=document.querySelector(".time");
const check="fa-check-circle";
const uncheck="fa-circle-thin";
const line_through="lineThrough";

// Variables
let list_item,id;

// get item from localstorage
let data=localStorage.getItem("TODO");
// check if data is not empty
if(data)
{
    list_item=JSON.parse(data);
    id=list_item.length; // set the id to the last one in the list
    loadList(list_item); // load the list to the user interface
}
else
{
    // if data is empty
    list_item=[];
    id=0;
}

// load items to the user's interface
function loadList(array)
{
    array.forEach(function(item)
    {
        addToDo(item.name,item.id,item.done,item.trash);
    });
}

// clear the local storage
clear.addEventListener("click", function()
{
    localStorage.clear();
    location.reload();
});

// Show todays date
const today=new Date();
const options={weekday : "long", month:"short", day:"numeric"};
dateElement.innerHTML=today.toLocaleDateString("en-US",options);
// add to do function
function addToDo(toDo,id,done,trash)
{    
    if(trash)
    { 
        return; 
    }
    
    const DONE=done?check:uncheck;
    const LINE=done?line_through : "";
    
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
    const position="beforeend";
    list.insertAdjacentHTML(position,item);
}

// add an item to the list user the enter key
document.addEventListener("keyup",function(even)
{
    if(event.keyCode==13)
    {
        const toDo=input.value;  
        // if the input isn't empty
        if(toDo)
        {
            addToDo(toDo, id, false, false);    
            list_item.push(
            {
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            // add item to localstorage ( this code must be added where the list_item array is updated)
            localStorage.setItem("TODO", JSON.stringify(list_item));
            id++;
        }
        input.value="";
    }
});

// complete to do
function completeToDo(element)
{
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(line_through);    
    list_item[element.id].done=list_item[element.id].done?false:true;
}

// remove to do
function removeToDo(element)
{
    element.parentNode.parentNode.removeChild(element.parentNode);    
    list_item[element.id].trash = true;
}

// target the items created dynamically
list.addEventListener("click",function(event)
{
    const element=event.target; // return the clicked element inside list
    const elementJob=element.attributes.job.value; // complete or delete
    if(elementJob=="complete")
    {
        completeToDo(element);
    }
    else if(elementJob=="delete")
    {
        removeToDo(element);
    }
    // add item to localstorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO",JSON.stringify(list_item));
});

function show_time()
{
    let today=new Date;
    let hour=today.getHours(), minutes=today.getMinutes(), seconds=today.getSeconds(), mer="am";    
    if(hour>12)
    {
        hour-=12;
        mer="pm";
    }    
    time.textContent=`${hour}:${add_zero(minutes)}:${add_zero(seconds)} ${mer}`;
    setTimeout(show_time,1000);
}

function add_zero(num)
{
    return (num<10?`0${num}`:`${num}`);
}

show_time();















