const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const error = document.querySelector('#todoError');   //la till detta felmeddelande och kommenterade bort 
const output = document.querySelector('#output');

let todos = []; //skapar array lista




const fetchTodos = () => {
    fetch('https://jsonplaceholder.typicode.com/todos/?_limit=10')          //api, json fetch hämta
    .then(res => res.json())
    .then(data => {
        todos = data;
        console.log(todos);
        listTodos();
    })
}


const listTodos = () => {
    output.innerHTML = '';
    todos.forEach(todo => {
        newTodo(todo);
    })
}
fetchTodos();

//en todo utan att koppa och klistra från html template, ett äldre sätt, men har sina fördlar
const newTodo = (todo) => {
    let card = document.createElement('div');
    card.classList.add('card', 'p-3', 'my-3');

    let innerCard = document.createElement('div');
    innerCard.classList.add('d-flex', 'justify-content-between', 'align-items-center','p-3');

    let title = document.createElement('h3');
    title.innerText = todo.title;

    let button = document.createElement('button');
    button.classList.add('btn', 'btn-primary');
    button.innerText = 'Delete';
    button.addEventListener('click', () => {
        console.log(todo.id)

    
    })

    // let button2 = document.createElement('button');
    // button.classList.add('btn', 'btn-primary');
    // button.innerText = 'delete';
    // button.addEventListener('click', () => {
    //     console.log(todo.id)

    
    // })

  

    //bygg ihop och lägg till i dom

    innerCard.appendChild(title);
    innerCard.appendChild(button);
    // innerCard.appendChild(button2);
    card.appendChild(innerCard);
    output.appendChild(card);

}



// Nedan, är exakt likadant som ovan men av någon anledning får jag megafel på detta skulle bra gärna vilja veta vad felet är---> fick till det, var en parantes runt json som fattades

const nyTodo = (title) => {                                         //Skapar en funktionen create Todo och skjuter in titeln 
    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',                                                 //post för att skriva ut
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        
            body: JSON.stringify({                                        //gör om json till javascript
                title,                                                      //skriver ut title som anges i input
                completed: false                                         //kommer alltid vara false för att den inte ska vara klar med en gång
            })
         })                                                 //här borde det vara ) men jag får 3 olika fel då
    .then(res => res.json())                                        //här får vi respons från json
    .then(data => {                                                 //får tillbaka data från json
        console.log(data)                                           //skriver ut i consolen

        let newTodo = {                                     //deklarerar en vad newTodo ska innehålla
            ...data,                                        //en spread, samma sak som att lägga completed, id och title
            id: Date.now().toString()
         }
        console.log(newTodo);                               //Skriver ut i console
        todos.unshift(newTodo);                             // ska lägga till todo överst i listan, men det lägger bara till 1 objektet, [0] ???
        listTodos();                                           //lstar todos med funktionen listTodos()
   
    })
}

//validering

const validateTodo = () => {
    // const input = document.querySelector(id); hämtar in const error = document.querySelector('#todoError'); och därför kan dessa kommenteras bort 
    // const error = document.querySelector(id +'-error');

    if (input.value.trim() === ''){
        error.innerText = "Please enter a todo"
        input.focus();
        return false;
    }
    else {
        error.innerText = ''
        return true;
    }
}


form.addEventListener('submit', e => {
    e.preventDefault();

    validateTodo();

    
if(validateTodo()) {
        nyTodo(input.value) 
        form.reset()
    }
 
})

   