const clear=document.querySelector(".clear");
const dateElement=document.getElementById("date");
const list=document.getElementById("list");
const input=document.getElementById("input");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough"; 

let LIST=[] , id=0;

let data = localStorage.getItem("TODO");
if(data){
    LIST=JSON.parse(data);
    loadList(LIST);
    id=LIST.length;

}else{

    LIST = [];
    id=0;
}

function loadList(array){
    array.forEach( function(item){
        addToDo(item.name,item.id,item.done,item.trash); 
    });
}

clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
});

const options={weekday : "long" ,month : "short" , day:"numeric"};
const today=new Date();

dateElement.innerHTML=today.toLocaleDateString("en-In",options);

function addToDo(toDo,id,done,trash)
{
    if(trash){return; }

    const DONE=done ? CHECK : UNCHECK;
    const LINE=done ? LINE_THROUGH : "";


    const item=`<li class="item">

    <i class="fa ${DONE} co" job="complete" id="0"></i>
     <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="0"></i>

</li>
 `;
    const position="beforeend";
    list.insertAdjacentHTML(position,item);
}
// addToDo("drink coffee");

document.addEventListener("keyup",function(event){
    if(event.keyCode == 13){
        const toDo = input.value;
        if(toDo){
            addToDo(toDo,id,false,false);
            LIST.push({
                name:toDo,
                id: id,
                done:false,
                trash:false
            });

            localStorage.setItem("TODO",JSON.stringify(LIST));
            id++;
        
        }
        input.value=""; 
    }
});

// addToDo("Coffee",1,false,true);

// document.addEventListener("keyup",function(event){
//     if(event.keyCode == 13){
//         const toDo = input.value;
//         if(toDo){
//           addToDo(toDo);
//         }
//         input.value="";
//     }
// });

function completeToDo(element){
    element.classList.toggle(CHECK); 
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done= LIST[element.id].done ? false : true;
}



function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash=true;
}




list.addEventListener("click", function(event){
    let element=event.target;
    const elementJob = element.attributes.job.value;
     console.log(elementJob);
    if(elementJob == "complete"){
        completeToDo(element);
    }
    else if(elementJob == "delete"){
        removeToDo(element);
    }
});