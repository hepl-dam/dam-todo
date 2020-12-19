import React, {useEffect, useState, Fragment} from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'
import firebase from './utils/firebaseConfig'

export default function MainComp() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
      // cibler un endPoint dans ma database
      const db = firebase.database().ref('users');
      // on écoute ce enpoint et 
      /*
        - On utilise la méthode .on()
        - Cette méthode attend deux paramètres
          - Le premier, c'est une chaîne de caractère représentant un évènement. 
            - Nous voulons observer un changement de valeur sur la base de donnée afin que celle-ci nous renvoie un SNAPSHOT chaque fois que des données sont modifiées (à la référence de base de données spécifiée), y compris les modifications apportées aux enfants.
          - Le deuxième paramètre est une fonction callback qui contient les données comprise dans le snapshot
            - On utilise la méthode .val() sur notre SNAPSHOT pour en extraire les données.
      */
      db.on('value', snap => {
        const dataFromDB = snap.val();
        // On crée un tableau vide
        const tempTable = [];
        // On boucle sur l'objet/le snapshot renvoyé par la DB

        /*
          ********** For (var in object){} **********
          ************* Dans notre cas **************

          For (let uneValeur in monObjet ){
            console.log(uneValeur);
            // -> retourne une liste de valeur correspondant au clé de mon objet
          }

          https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/Op%C3%A9rateurs_de_membres

          objet.propriété
          objet["propriété"]

        */

        for (let singleElementFromDB in dataFromDB) {
          // On pousse le contenu de chaque élément du snapshot dans la DB + l'id de chaque élément
          
          tempTable.push({ id:singleElementFromDB, ...dataFromDB[singleElementFromDB]})

        }
        // console.log(tempTable);
        setTodos(tempTable)
      });
    }, []);

  const completeToDo = (id) =>{
    // on récupère notre endPoint, notre ref dans la db
    // on y ajoute l'enfant via la méthode child()
    // on passe à child(), l'id de l'élément qui a déclenché l'evt
    const dbItem = firebase.database().ref('users').child(id);
    
    // on spécifie ce que l'on veut mettre à jour sur l'élément
    dbItem.update({
      isCompleted:true
    });
  }
  const deleteToDo = (id) =>{
    // on récupère notre endPoint, notre ref dans la db
    // on y ajoute l'enfant via la méthode child()
    // on passe à child(), l'id de l'élément qui a déclenché l'evt
    const dbItem = firebase.database().ref('users').child(id);
    
    // On utilise, sur notre élément, la méthode remove() pour supprimer l'élément
    dbItem.remove();
  }

  return (
    <Fragment>
      <h1 aria-level="1" role="heading">
        Toudoux
      </h1>
      <section>
        <h2 aria-level="2" role="heading">
          Ma liste
        </h2>
        <ul>
          {
            todos.map((todo, index) => (
              <Todo key={index}
                    text={todo.text}
                    id={todo.id}
                    index={index} 
                    completeToDo={completeToDo} 
                    deleteToDo={deleteToDo} 
                    />
            ))
          }
        </ul>
        <TodoForm todos={todos} setTodos={setTodos} />
      </section>
    </Fragment>
  )
}
