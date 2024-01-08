const PersonEntry = ({person, deleteHandler}) => {
    return ( 
        <div key={person.name}>{person.name} {person.number} <button onClick={() => deleteHandler(person.id)}>Delete</button> </ div>
     );
}
 
export default PersonEntry;