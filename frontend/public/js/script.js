var rowDataArray = [
  {
    process: "Zabbix server",
    ver: "zabbix-Server_6.0",
    param_name: "MySQL/Percona",
    mandatory: "どれか一つ",
    val_range: "8.0.X",
    val_default: "なし",
    param_desc: "MySQL (または Percona) を Zabbix バックエンド データベースとして使用する場合に必要です。 InnoDB エンジンが必要です。 サーバー/プロキシの構築には MariaDB Connector/C ライブラリを使用することをお勧めします。"
  },
  {
      version: "zabbix-Server_5.0",
      name: "MariaDB",
      required: "どれか一つ",
      range: "10.5.00-10.8.X",
      defaultValue: "なし",
      description: "InnoDB エンジンが必要です。 サーバー/プロキシの構築には MariaDB Connector/C ライブラリを使用することをお勧めします。"
  }
];

const verSelectBox1 = document.getElementById("version_1");
const verSelectBox2 = document.getElementById("version_2");


function showData() {
  var version1Select = document.getElementById("version_1");
  var version2Select = document.getElementById("version_2");
  var selectedValue1 = version1Select.value;
  var selectedValue2 = version2Select.value;

  var table1 = document.getElementById("tbl_1_body");
  var table2 = document.getElementById("tbl_2_body");

  table1.innerHTML = "";
  table2.innerHTML = "";

    for (var i = 0; i < rowDataArray.length; i++) {
      var rowData = rowDataArray[i];

      if (selectedValue1 === rowData.version) {
          var row1 = createTableRow(rowData);
          table1.appendChild(row1);
      }

      if (selectedValue2 === rowData.version) {
          var row2 = createTableRow(rowData);
          table2.appendChild(row2);
      }
  }
}

function createTableRow(rowData) {
  var row = document.createElement("tr");

  var nameCell = document.createElement("td");
  nameCell.textContent = rowData.name;
  row.appendChild(nameCell);

  var requiredCell = document.createElement("td");
  requiredCell.textContent = rowData.required;
  row.appendChild(requiredCell);

  var rangeCell = document.createElement("td");
  rangeCell.textContent = rowData.range;
  row.appendChild(rangeCell);

  var defaultValueCell = document.createElement("td");
  defaultValueCell.textContent = rowData.defaultValue;
  row.appendChild(defaultValueCell);

  var descriptionCell = document.createElement("td");
  descriptionCell.textContent = rowData.description;
  row.appendChild(descriptionCell);

  return row;
}

const showTable = async (table) => {
  const selectedVersion1 = verSelectBox1.value;
  const selectedVersion2 = verSelectBox2.value;
	
  const table1 = document.getElementById("tbl_1_body");
  const table2 = document.getElementById("tbl_2_body");
  
  const rowTemplate1 = table1.querySelector(".zbx_row_template");
  const rowTemplate2 = table2.querySelector(".zbx_row_template");
  
  table1.innerHTML = "";
  table2.innerHTML = "";

  const rowDataArray = await axios.get("http://hirasyain.link:3000/zbx/all");
  console.log(rowDataArray);


  let rowsIndex1 = 1;

  for(const item of rowDataArray.data) {
    if(item.ver === selectedVersion1) {
      const row = createRow(item, rowTemplate1, rowsIndex1++);
      table1.appendChild(row);
    }
  }


  let rowsIndex2 = 1;
  for(const item of rowDataArray.data) {
    if(item.ver === selectedVersion2) {
      const row = createRow(item, rowTemplate2, rowsIndex2++);
      table2.appendChild(row);
    }
  }
}


const createRow = (rowData, template, index) => {

  //template no copi- wo sakusei suru
  const row = template.cloneNode(true);
  row.hidden = false;

  console.log("row = ", row)

  // rowData no atai wo k to v ni dainyu si ru-pu suru
  for(const k in rowData) {

    if(k == 'id' || k == 'ver') continue;

    const id = '.' + k + '_';

	  console.log(id);

    //k ha parame-ta no namae katu hyou no seru no id to itti site iru node seru shutoku dekiru
    const ele = row.querySelector(id + '0');

    //console.log(ele)

    // shutoku sita seru no atai wo v nisuru
    ele.innerHTML = rowData[k];
    ele.id = id + index;
  }

  console.log(row);

  return row;
}

showTable();

verSelectBox1.addEventListener('change', showTable);
verSelectBox2.addEventListener('change', showTable);

