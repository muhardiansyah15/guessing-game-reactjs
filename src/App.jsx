import { useState } from 'react'
import buildTable from './BuildTable.jsx'
import renderFormInputs from './InputForm.jsx'
import randomList from './Helper.jsx'

  
function randomAlphabet() {
  let alphabet = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));
  return randomList(alphabet);
}

let randomizedAlphabet = randomAlphabet();
let NumRow = 0;
let NumColumn = 0;
let formInputValueFirst = {};
let formInputValueSecond = {};
let result = "";

function App() {
  const [numInputs, setNumInputs] = useState(0);
  const [showSection0, setShowSection0] = useState(true);
  const [showSection1, setShowSection1] = useState(false);
  const [showSection2, setShowSection2] = useState(false);
  const [showSection3, setShowSection3] = useState(false);
  const [showSection4, setShowSection4] = useState(false);
  const [showSection5, setShowSection5] = useState(false);

  

 
  let nextSection = <div></div>;
  if (showSection0) {
    const handleSection0 = () => {
      setShowSection0(false);
      setShowSection1(true);
    };
    nextSection = <div className="container">
                      <p>Ayo kita bermain permainan menebak nama! Kamu pikirkan nama seseorang, dan saya akan mencoba menebaknya.<br/>
                        Bagaimana menurutmu?</p>
                      <p><button className="btn-start" onClick={handleSection0}>Let's Play</button></p>
                  </div>
  } else if (showSection1) {
    const handleSection1 = () => {
      setShowSection1(false);
      setShowSection2(true);
    };
    nextSection= <div className="container">
                    <p><b>Instruksi 1:</b></p>
                    <p>Ingat satu nama panggilan seseorang dipikiranmu. Kemudian, biarkan Saya akan menebaknya.</p>
                    <p>Jika sudah, klik Next untuk instruksi selanjutnya.</p>
                    <p>
                    <button className="btn-next" onClick={handleSection1}>Next</button>
                    </p>
                </div>




  } else if (showSection2) {

    function handleInputNameLength(event, setNumInputs){
      const inputValue = parseInt(event.target.value);
      if (inputValue>10) {
        alert("Maksimal 10 karakter");
        return
      } else if (inputValue<3 && inputValue>0){
        alert("Minimal 3 karakter");
        return
      } else if (inputValue<0) {
        alert("Beritahu Saya berapa jumlah huruf namanya!");
      } else {
        setNumInputs(inputValue);
      }
    }

    const secondHandleClick = () => {
      if (numInputs>10) {
        alert("Maksimal 10 karakter");
        return
      } else if (numInputs<3 && numInputs>0){
        alert("Minimal 3 karakter");
        return
      } else if (numInputs<0) {
        alert("Beritahu Saya berapa jumlah huruf namanya!");
      } else {
        for (let i=0; i<numInputs; i++) {
          formInputValueFirst[i] = 0;
          formInputValueSecond[i] = 0;
        }
      }

      setShowSection2(false);
      setShowSection3(true);
    };
    nextSection = <div className="container">
                    <p><b>Instruksi 2:</b></p>
                    <p>Beritahu saya berapa huruf namanya.</p>
                    <p>
                      <label>Berapa huruf namanya? </label>
                      <input type="number" min="1" max="10" 
                            onChange={(event) => handleInputNameLength(event, setNumInputs)} />
                    </p>
                    <p>
                      Klik Next untuk instruksi selanjutnya.<br/>
                      
                    </p>
                    <p><button className="btn-next" onClick={secondHandleClick}>Next</button></p>
                  </div>




  } else if (showSection3) {
    if (numInputs>0){
      NumColumn =  numInputs;
      NumRow = (26 % numInputs > 0)? Math.floor(26/numInputs) + 1 : Math.floor(26/numInputs);
    };
    const firstTable = () => buildTable(NumRow, NumColumn, randomizedAlphabet);

    const handleFirstFormInputChange = (i, event) => {
      const inputValue = parseInt(event.target.value);
      if (inputValue<1 || inputValue>numInputs){
          alert("Kolom "+inputValue+" tidak ada!");
      } else {
          formInputValueFirst[i] = inputValue;

      }
    };
    
    const renderFirstFormInputs = () => {
        const inputs = [];
        for (let i = 0; i < numInputs; i++) {
          inputs.push(
            <tr key={i}>
              <td>
                Huruf ke-{i + 1} berada dikolom?
              </td>
              <td>
                <input type="text" placeholder={`No. Kolom`} 
                  onChange={(event) => handleFirstFormInputChange(i, event)}/>
              </td>
            </tr>
          );
        }
        return inputs;
    };

    const thirdHandleClick = () => {
      for (let key in formInputValueFirst){
        if (formInputValueFirst[key]<1 ||  formInputValueFirst[key] > numInputs ){
          alert("Inputan Salah!\nKolom "+ formInputValueFirst[key] + " tidak ada.");
          return
        } else if (!formInputValueFirst[key]){
          alert("Inputan Salah!\nBeritahu saya No. Kolom untuk hruf ke-"+ formInputValueFirst[key] + ".");
          return
        }
      }
      setShowSection3(false);
      setShowSection4(true);
    };
    nextSection = <div className="container">
                    <p><b>Instruksi 3:</b></p>
                    <p>Dari tabel berikut, beritahu saya dikolom mana saja huruf-hurufnya.</p>
                    <p>Note: Pastikan nomor kolom yang di input benar. Jika tidak saya tidak dapat menembaknya.</p>
                    <div className="feature">
                      <table>
                        <tbody>{renderFirstFormInputs()}</tbody>
                      </table>
                    </div>
                    <div className="feature">{firstTable()}</div>
                    <p>
                      Klik Next untuk instruksi selanjutnya.
                    </p>
                    <p> <button className="btn-next" onClick={thirdHandleClick}>Next</button></p>
                  </div>




  } else if (showSection4) {
    let NumColumn2 = NumRow;
    let NumRow2 = NumColumn;

    const handleSecondFormInputChange = (i, event) => {
      const inputValue = parseInt(event.target.value);
      if (inputValue<1 || inputValue>NumColumn2){
          alert("Kolom "+inputValue+" tidak ada!");
      } else {
        formInputValueSecond[i] = inputValue;
      }
    };
    
    const renderSecondFormInputs = () => {
        const inputs = [];
        for (let i = 0; i < numInputs; i++) {
          inputs.push(
            <tr key={i}>
              <td>
                Huruf ke-{i + 1} berada dikolom?
              </td>
              <td>
                <input type="text" placeholder={`No. Kolom`} 
                  onChange={(event) => handleSecondFormInputChange(i, event)}/>
              </td>
            </tr>
          );
        }
        return inputs;
    };

    let SecondAlphabet = [];
    for (let i=0; i < numInputs; i++) {
      let j = formInputValueFirst[i]-1;
      for (let k=0; k < NumRow; k++){
          if (randomizedAlphabet[j]) {
            SecondAlphabet.push(randomizedAlphabet[j]);
          } else {
            SecondAlphabet.push("");
          };
          j += numInputs;
      };
    };

    
    for (let i=0; i<SecondAlphabet.length; i++){
      if (!SecondAlphabet[i]){
        for (let j=0; j<randomizedAlphabet.length; j++){
          if (!SecondAlphabet.includes(randomizedAlphabet[j])){
            SecondAlphabet[i] = randomizedAlphabet[j];
            continue;
          }
        }
      }
    }

    const secondTable = () => buildTable(NumRow2, NumColumn2, SecondAlphabet);

    const fourthHandleClick = () => {
      for (let key in formInputValueSecond){
        if (formInputValueSecond[key]<1 ||  formInputValueSecond[key] > NumColumn2){
          alert("Inputan Salah!\nKolom "+ formInputValueSecond[key] + " tidak ada.");
          return
        } else if (!formInputValueSecond[key]){
          alert("Inputan Salah!\nBeritahu saya No. Kolom untuk hruf ke-"+ formInputValueSecond[key] + ".");
          return
        }
      }
      setShowSection4(false);
      setShowSection5(true); 

      for (let i=0; i<numInputs; i++){
        result += SecondAlphabet[(i*NumColumn2)+formInputValueSecond[i]-1];
      };
    };
    
    nextSection = <div className="container">
                    <p><b>Instruksi 4:</b></p>
                    <p>Lakukan seperti di instruksi 3, beritahu saya lagi dikolom mana saja huruf-hurufnya di dalam tabel berikut.</p>
                    <div className="feature">
                      <table>
                        <tbody>{renderSecondFormInputs()}</tbody>
                      </table>
                    </div>
                    <div className="feature">{secondTable()}</div>
                    <p>
                      Klik Next, untuk melihat hasil tebakan saya.<br/>
                    </p>
                    <p><button className="btn-next" onClick={fourthHandleClick}>Next</button></p>
                  </div>
  } else if (showSection5) {
    
    const lastHandleClick = () => {
      setShowSection0(true);
      setShowSection1(false);
      setShowSection2(false);
      setShowSection3(false);
      setShowSection4(false);
      setShowSection5(false);
      formInputValueFirst = {};
      formInputValueSecond = {};
      result = '';
      randomizedAlphabet = randomAlphabet();
    };
    nextSection = <div className="container">
                    <p>Yeah, I got it right! The name you had in mind is</p>
                    <p className="game-result">{result}</p>
                    <p><button className="btn-next" onClick={lastHandleClick}>Main Lagi?</button></p>
                  </div>
  }

  return (
    <div>
      {nextSection}
    </div>
    
  );
}

export default App