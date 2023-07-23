function handleFormInputChange(i, event, numInputs, setFormInputValue){
    const inputValue = parseInt(event.target.value);
    if (inputValue<1 || inputValue>numInputs){
        alert("Kolom "+inputValue+" tidak ada!");
    } else {
        setFormInputValue({i: inputValue});
    }
}

function renderFormInputs(numInputs, setFormInputValue){
    const inputs = [];
    for (let i = 0; i < numInputs; i++) {
      inputs.push(
        <tr key={i}>
          <td>
            Huruf ke-{i + 1} berada dikolom?
          </td>
          <td>
            <input type="text" placeholder={`No. Kolom`} 
              onChange={(event) => handleFormInputChange(i, event, numInputs, setFormInputValue)}/>
          </td>
        </tr>
      );
    }
    return inputs;
  };

  export default renderFormInputs