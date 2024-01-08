import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import AddPersonForm from './components/AddPersonForm'
import PersonList from './components/PersonList'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notification, setNotification] = useState(null)
  

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })

  }

  useEffect(hook, [])

  const personsToShow = filterName == filterName === '' 
  ? persons
  : persons.filter(person => 
      person.name.toLowerCase().includes(
          filterName.toLocaleLowerCase()
        )
      )

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)

    if(names.includes(newName)) {
      const person = persons.find(person => person.name === newName)
      const decision = confirm(`${newName} is already added to phonebook. Do you want to update the number?`)
      if (decision) {
        const personObject = {
          ...person,
          number: newNumber
        }
                personService
          .update(person.id, personObject)
          .then(updatedPerson => {
                        setPersons(persons.map(p => p.id !== person.id ? p : updatedPerson))
            setNewName('')
            setNewNumber('')
            const newNotification = {
              message: `Number updated for ${person.name}`,
              type: "success"
            }
            setNotification(newNotification)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            console.log(error.response.status)
            let message = 'Unknown error'
            if(error.response.status === 400) {
              message=error.response.data.error
            }
            else if(error.response.status === 404) {
              message=`Information for ${person.name} was already removed from the server`
              setPersons(persons.filter(p => p.id !== person.id))
            }
            const newError = {
              message: message,
              type: "error"
            }
            setNotification(newError)
            setTimeout(() => {
                setNotification(null)
              }, 5000)

          })
                }
    }
    else {
            const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
          const newNotification = {
              message: `Person created: ${newName}`,
              type: "success"
            }
        setNotification(newNotification)
        setTimeout(() => {
              setNotification(null)
            }, 5000)
        })
        .catch(error => {
          console.log(error.response.status)
          const newNotification = {
              message: error.response.data.error,
              type: "error"
          }
          setNotification(newNotification)
          setTimeout(() => {
              setNotification(null)
            }, 5000)
        })
      
          }
      }

  const handlePersonDelete = (id) => {
    personService
      .remove(id)
      .then(deletedId =>{
        const copy = [...persons]
        const indexToRemove = copy.findIndex(person => person.id === deletedId);
        if (indexToRemove !== -1) {
          copy.splice(indexToRemove, 1);
        }
        setPersons(copy)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter text="Filter by name" filterState={filterName} onChangeHandler={handleFilterChange}/>
      <h2>add a new</h2>
      <AddPersonForm 
        onSubmitHandler={addPerson}
        nameState={newName} 
        numberState={newNumber}
        nameHandler={handleNameChange}
        numberHandler={handleNumberChange} />
      <h2>Numbers</h2>
      <PersonList personsToShow={personsToShow} deleteHandler={handlePersonDelete} />
    </div>
  )
}

export default App