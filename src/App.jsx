import { useState } from 'react'

function randomList(list) {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

function randomAlphabet() {
  let alphabet = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));
  return randomList(alphabet);
}

function buildTable(NumRow, NumColumn, data){
  let tableHeader = [];
  let tableBody = [];

  if (NumRow >0 && NumColumn >0) {
    for (let i = 0; i < NumColumn; i++) {
      tableHeader.push(<th key={i + 1}>{i + 1}</th>);
    }
    tableHeader = <tr>{tableHeader}</tr>;

    
    let k = 0;
    for (let i = 0; i < NumRow; i++) {
      let tableRow = [];
      for (let j = 0; j < NumColumn; j++) {
        if (k < data.length) {
          tableRow.push(<td key={k}>{data[k]}</td>);
        } else {
          tableRow.push(<td key={k}></td>);
        }
        k += 1;
      }
      tableBody.push(<tr key={i}>{tableRow}</tr>);
    }

    return (
      <table className="alfabet-table">
        <thead>{tableHeader}</thead>
        <tbody>{tableBody}</tbody>
      </table>
    );
  } else {
    return (
      <div></div>
    )
  }  
}


const randomizedAlphabet = randomAlphabet();
let formInputValue = { 1 : {}, 2 : {} };
let result = '';


function handleInputNameLength(event, formInputValue, setNumInputs){
  const inputCount = parseInt(event.target.value);
  if (inputCount >= 3 && inputCount <= 10) {
    setNumInputs(inputCount);
    for (let i=0; i<inputCount; i++){
      formInputValue[1][i] = 0;
      formInputValue[2][i] = 0
    }
  } else if (inputCount>10) {
    setNumInputs(0);
    alert("Maksimum 10 karakter");
  } else if (inputCount<3){
    setNumInputs(0);
    alert("Minimal 3 karakter");
  }
};


function handleFirstFormInputChange(i, event, table, numInputs){
  const inputValue = parseInt(event.target.value);
  if (inputValue<1 || inputValue>numInputs){
    if (table == 1) {
      alert("Kolom "+inputValue+" tidak ada!");
    }
  } else {
    if (table == 1) {
      formInputValue[1][i] = inputValue;
    } else {
      formInputValue[2][i] = inputValue;
    }
  }
}

function renderFormInputs(table, numInputs){
  const inputs = [];
  for (let i = 0; i < numInputs; i++) {
    inputs.push(
      <tr key={i}>
        <td>
          Huruf ke-{i + 1} berada dikolom?
        </td>
        <td>
          <input type="text" placeholder={`No. Kolom`} 
            onChange={(event) => handleFirstFormInputChange(i, event, table, numInputs)}/>
        </td>
      </tr>
    );
  }
  return inputs;
};

function App() {
  const [numInputs, setNumInputs] = useState(0);
  const [showSection0, setShowSection0] = useState(true);
  const [showSection1, setShowSection1] = useState(false);
  const [showSection2, setShowSection2] = useState(false);
  const [showSection3, setShowSection3] = useState(false);
  const [showSection4, setShowSection4] = useState(false);
  const [showSection5, setShowSection5] = useState(false);

  let NumRow = 0;
  let NumColumn = 0;

  if (numInputs>0){
    NumColumn =  numInputs;
    NumRow = (26 % numInputs > 0)? Math.floor(26/numInputs) + 1 : Math.floor(26/numInputs);
  };
 
  const firstTable = () => buildTable(NumRow, NumColumn, randomizedAlphabet);

  
  const startHandleClick = () => {
    setShowSection0(false);
    setShowSection1(true); 
  };

  const firstHandleClick = () => {
    setShowSection1(false);
    setShowSection2(true);
  }

  const secondHandleClick = () => {
    if (numInputs>10) {
      alert("Maksimum 10 karakter");
      return
    } else if (numInputs<3){
      alert("Beritahu Saya berapa huruf namanya!");
      return
    }
    setShowSection2(false);
    setShowSection3(true);
  };

  const thirdHandleClick = () => {
    for (let key in formInputValue[1]){
      if (formInputValue[1][key]<1 ||  formInputValue[1][key] > numInputs ){
        alert("Inputan Salah!\nKolom "+ formInputValue[1][key] + " tidak ada.");
        return
      } else if (!formInputValue[1][key]){
        alert("Inputan Salah!\nBeritahu saya No. Kolom untuk hruf ke-"+ formInputValue[1][key] + ".");
        return
      }
    }
    setShowSection3(false);
    setShowSection4(true); 
  };

  let SecondAlphabet = [];
  for (let i=0; i < numInputs; i++) {
    let j = formInputValue[1][i]-1;
    for (let k=0; k < NumRow; k++){
        if (randomizedAlphabet[j]) {
          SecondAlphabet.push(randomizedAlphabet[j]);
        } else {
        SecondAlphabet.push("");
        };
        j += numInputs;
    };
  };

  let NumColumn2 = NumRow;
  let NumRow2 = NumColumn;

  const secondTable = () => buildTable(NumRow2, NumColumn2, SecondAlphabet);

  const fourthHandleClick = () => {
    for (let key in formInputValue[2]){
      if (formInputValue[2][key]<1 ||  formInputValue[2][key] > NumColumn2){
        alert("Inputan Salah!\nKolom "+ formInputValue[2][key] + " tidak ada.");
        return
      } else if (!formInputValue[2][key]){
        alert("Inputan Salah!\nBeritahu saya No. Kolom untuk hruf ke-"+ formInputValue[1][key] + ".");
        return
      }
    }
    setShowSection4(false);
    setShowSection5(true); 
  }

  const lastHandleClick = () => {
    setShowSection5(false);
    setShowSection1(true); 
  }  


  let result= '';
  for (let i=0; i<numInputs; i++){
    result += SecondAlphabet[(i*NumColumn2)+formInputValue[2][i]-1];
  }

  return (
    <div>
      {showSection0 && (
      <div className="container">
         <p>Ayo kita bermain permainan menebak nama! Kamu pikirkan nama seseorang, dan saya akan mencoba menebaknya.<br/>
            Bagaimana menurutmu?</p>
          <p><button className="btn-start" onClick={startHandleClick}>Let's Play</button></p>
      </div>
      )}

      {showSection1 && (
      <div className="container">
         <p>Instruksi 1:</p>
         <p>Ingat satu nama panggilan seseorang dipikiranmu. Kemudian, biarkan Saya akan menebaknya.</p>
         <p>Jika sudah, klik Next untuk instruksi selanjutnya.</p>
         <p>
         <button className="btn-next" onClick={firstHandleClick}>Next</button>
         </p>
      </div>
      )}

      {showSection2 && ( 
        <div className="container">
          <p>Instruksi 2:</p>
          <p>Beritahu saya berapa huruf namanya.</p>
          <p>
            <label>Berapa huruf namanya? </label>
            <input type="number" min="1" max="10" 
                  onChange={(event) => handleInputNameLength(event, formInputValue,setNumInputs)} />
          </p>
          <p>
            Klik Next untuk instruksi selanjutnya.<br/>
            
          </p>
          <p><button className="btn-next" onClick={secondHandleClick}>Next</button></p>
        </div>
      )}

      {showSection3 && (           
        <div className="container">
          <p>Instruksi 3:</p>
          <p>Dari tabel berikut, beritahu saya dikolom mana saja huruf-hurufnya.</p>
          <div className="feature">
            <table>
              <tbody>{renderFormInputs(1, numInputs)}</tbody>
            </table>
          </div>
          <div className="feature">{firstTable()}</div>
          <p>
            Klik Next untuk instruksi selanjutnya.
          </p>
          <p> <button className="btn-next" onClick={thirdHandleClick}>Next</button></p>
        </div>
      )}

      {showSection4 && ( 
        <div className="container">
          <p>Instruksi 4:</p>
          <p>Lakukan seperti di instruksi 3, beritahu saya lagi dikolom mana saja huruf-hurufnya di dalam tabel berikut.</p>
          <div className="feature">
            <table>
              <tbody>{renderFormInputs(2, numInputs)}</tbody>
            </table>
          </div>
          <div className="feature">{secondTable()}</div>
          <p>
            Klik Next, untuk melihat hasil tebakan saya.<br/>
          </p>
          <p><button className="btn-next" onClick={fourthHandleClick}>Next</button></p>
        </div>
      )}

      {showSection5 && (
        <div className="container">
          <p>Yeah, I got it right! The name you had in mind is</p>
          <p>
            <h1 className="game-result">{result}</h1>
          </p>
          <p><button className="btn-next" onClick={lastHandleClick}>Main Lagi?</button></p>
        </div>
          
      )}
    </div>
    
  );
}

export default App