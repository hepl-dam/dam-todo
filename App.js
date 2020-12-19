import React, {useState} from 'react'

export default function App() {
  
  const [todos, setTodos] = useState([
    {
      text:"Ne pas écouter Qanon",
      isComplete:false,
    },
    {
      text:"Appeler la CILE",
      isComplete:false,
    },
    {
      text:"Préparer la tartiflette",
      isComplete:false,
    },
  ]);

  function TodoForm(){
    
    const [value, setValue] = useState('');
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // Si il n'y a pas de valeur, on ne retourne rien 
      if(!value) return;
      // on ajout le todo au state via une fonction
      addTodo(value);
      // on rétablit la valeur du champ 
      setValue('');
    }
    
    return (
      <form onSubmit={handleSubmit} >
        <input type="text" onChange={ e => setValue(e.target.value)}/>
        <input type="submit" />
      </form>
    )
  }
  
  // La fonction affiche simple le texte des ToDo
  function Todo(props){
    return(
      <li>
        {props.text}
      </li>
    )
  }
  
  /*
    addTodo est une fonction passée en props lors de l'appel/création du formulaire.
    Il peut donc y accéder -> pourrait être à l'intérieur du composant
    -> préparer à la modularisation ?

    fonction stockée dans une variable qui 
    - prend un paramètre que l'on nomme newText (ou autre...)
    - on crée une nouvelle variable dans laquelle on spread le tableau auquel on ajout le nouveau texte mais sous la bonne clé pour notre boucle.
    - on met à jour le state avec setTodos
  */

  const addTodo = newText =>{
    const newTodos = [...todos, {text:newText}];
    setTodos(newTodos);
  }

  return (
    <React.Fragment>
      <h2 aria-level="2" role="heading">
        TODOS
      </h2>
      <section>
        <h2 aria-level="2" role="heading">
          Ma liste
        </h2>
        <ul>
          {todos.map((todo, index) =>(
            <Todo key={index} index={index} text={todo.text} />
          ))}
        </ul>
      </section>
      <TodoForm addTodo={addTodo} />
    </React.Fragment>
  )
}

/* Pour chaque élément de la liste on crée un composant TODO */
  /*
    Les 3 props correspondent à 
    - la clé demandé par React
    - un index pour savoir de quelle tâche il s'agit
    - le contenu de la tâche 
  */