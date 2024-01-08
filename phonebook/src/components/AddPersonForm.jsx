const AddPersonForm = ({onSubmitHandler, nameState, numberState, nameHandler, numberHandler}) => {
    return (
        <form onSubmit={onSubmitHandler}>
        <div>
          name: <input value={nameState} onChange={nameHandler} />
        </div>
        <div>
          number: <input value={numberState} onChange={numberHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
}
 
export default AddPersonForm;