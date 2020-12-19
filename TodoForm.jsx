import React, {useState} from 'react'
import firebase from './utils/firebaseConfig'

export default function TodoForm(props) {
    
    const [valueInput, setValueInput] = useState('');

    const handleSubmit = (e) => {
        // on arrête le recharchement de la page
        e.preventDefault();
        // ajouter la valeur contenu dans la var valueInput au state dans le composant parent
        props.setTodos([...props.todos, {text:valueInput}]);
        // On récupérère notre endPoint
        const maDB = firebase.database().ref('users');
        // On pousse un objet avec ces valeurs
        maDB.push({
            text:valueInput,
            isCompleted:false
        });

    }

    return (
    <form onSubmit={handleSubmit}>
        <input type="text" onChange={e => setValueInput(e.target.value)} />
        <input type="submit"/>
      </form>
    )
}