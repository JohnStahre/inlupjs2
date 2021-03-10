const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const output = document.querySelector('#output');

let todos = [];

const fetchTodos = () => {
    fetch('https://jsonplaceholder.typicode.com/todos/?_limit=10')
    .then(res => res.json())
    .then(data => {
        todos = data;
        console.log(todos);
        listTodos();
    })
}
fetchTodos();

const listTodos = () => {
    output.innerHTML = '';
    todos.forEach(todo => {
        newTodo(todo);
    })
}
//en todo utan att koppa och klistra från html template, ett äldre sätt, men har sina fördlar
const newTodo = (todo) => {
    let card = document.createElement('div');
    card.classList.add('card', 'p-3', 'my-3');

    let innerCard = document.createElement('div');
    innerCard.classList.add('d-flex', 'justify-content-between', 'align-items-center');

    let title = document.createElement('h3');
    title.innerText = todo.title;

    let button = document.createElement('button');
    button.classList.add('btn', 'btn-primary');
    button.innerText = 'Delete';
    button.addEventListener('click', () => {
        console.log(todo.id)
    })

    // let button2 = document.createElement('button');
    // button.classList.add('btn', 'btn-info');
    // button.innerText = 'edit';
    // button.addEventListener('click', () => {
    //     console.log('edit')
    // })

    //bygg ihop och lägg till i dom

    innerCard.appendChild(title);
    innerCard.appendChild(button);
    card.appendChild(innerCard);
    output.appendChild(card);

}

const createTodo = (title) => {
    fetch('https://jsonplaceholder.typicode.com/todos'), {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: {
            body: JSON.stringify({
                title,
                completed: false //kommer alltid vara false för att den inte ska vara klar med en gång
                
                // userId: 1, id behövs inte skicka med
        })
    }
    .then(res => res.json())
    .then(data => {
        console.log(data)

        let newTodo = {
            ...data, //en spread, samma sak som att lägga completed, id och title
            id: Date.now().toString()
         }
        console.log(newTodo);
        todos.unshift(newTodo);
        listTodos();
   
    })
}

form.addEventListener('submit', e => {
    e.preventDefault();

    //ta den lagrade variablen input och skapa en ny to do

    createTodo(input.value);
    input.value = '';
    form.requestFullscreen();

})

}
