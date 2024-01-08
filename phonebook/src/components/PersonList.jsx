import PersonEntry from "./PersonEntry";

const PersonList = ({personsToShow, deleteHandler}) => {
    return ( 
         personsToShow.map(person => 
          <PersonEntry key={person.id} person={person} deleteHandler={deleteHandler}/>
        )
     );
}
 
export default PersonList;