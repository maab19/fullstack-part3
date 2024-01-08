const Filter = ({onChangeHandler, filterState, text}) => {
    return ( 
        <div>
        {text}: <input value={filterState} onChange={onChangeHandler}/>
        </div>
     );
}
 
export default Filter;