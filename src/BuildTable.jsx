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

  export default buildTable