var rowDataArray = {data:[
  {
    process: {value: "Zabbix server",diff: false},
    ver: {value:"6.0",diff:false},
    param_name: {value:"MySQL/Percona",diff:false},
    mandatory: {value:"どれか一つ",diff:false},
    val_range: {value:"8.0.X",diff:false},
    val_default: {value:"なし",diff:false},
    param_desc: {value:"MySQL (または Percona) を Zabbix バックエンド データベースとして使用する場合に必要です。 InnoDB エンジンが必要です。 サーバー/プロキシの構築には MariaDB Connector/C ライブラリを使用することをお勧めします。",diff:false}
  },
  {
    process: {value: "Zabbix server",diff: false},
    ver: {value:"5.0",diff:false},
    param_name: {value:"MySQL/Percona",diff:false},
    mandatory: {value:"あああ",diff:false},
    val_range: {value:"8.0.X",diff:false},
    val_default: {value:"なし",diff:false},
    param_desc: {value:"ああああMySQL (または Percona) を Zabbix バックエンド データベースとして使用する場合に必要です。 InnoDB エンジンが必要です。 サーバー/プロキシの構築には MariaDB Connector/C ライブラリを使用することをお勧めします。",diff:false}  }
]};

//HTMLのid=versionを取得
const verSelectBox1 = document.getElementById("version_1");
const verSelectBox2 = document.getElementById("version_2");

/*
function showData() {
  //HTMLのid=versionを取得
  var version1Select = document.getElementById("version_1");
  var version2Select = document.getElementById("version_2");
  //HTMLのversionのvalueを取得
  var selectedValue1 = version1Select.value;
  var selectedValue2 = version2Select.value;
　//テーブル(形式)を取得
  var table1 = document.getElementById("tbl_1_body");
  var table2 = document.getElementById("tbl_2_body");
//テーブルの初期化
  table1.innerHTML = "";
  table2.innerHTML = "";

    for (var i = 0; i < rowDataArray.length; i++) {
      var rowData = rowDataArray.data[i];
      console.log(rowData.ver.value);
//htmlのバージョンとrowData.versionが一致していたらテーブルを作成
      if (selectedValue1 === rowData.ver.value) {
          var row1 = createTableRow(rowData);
          table1.appendChild(row1);
      }

      if (selectedValue2 === rowData.ver.value) {
          var row2 = createTableRow(rowData);
          table2.appendChild(row2);
      }
  }
}
*/

//テーブルに行追加
/*
  function createTableRow(rowData) {
  var row = document.createElement("tr");

  var nameCell = document.createElement("td");
  nameCell.textContent = rowData.param_name.value;
  row.appendChild(nameCell);

  var requiredCell = document.createElement("td");
  requiredCell.textContent = rowData.mandatory.value;
  row.appendChild(requiredCell);

  var rangeCell = document.createElement("td");
  rangeCell.textContent = rowData.val_range.value;
  row.appendChild(rangeCell);

  var defaultValueCell = document.createElement("td");
  defaultValueCell.textContent = rowData.val_default.value;
  row.appendChild(defaultValueCell);

  var descriptionCell = document.createElement("td");
  descriptionCell.textContent = rowData.param_desc.value;
  row.appendChild(descriptionCell);

  return row;
}
*/

//テーブル表示
const showTable = async (table) => {
  //HTMLのid=versionのvalueを取得
  const selectedVersion1 = verSelectBox1.value;
  const selectedVersion2 = verSelectBox2.value;
	//HTMLのテーブルのbody(tbody)を取得
  const table1 = document.getElementById("tbl_1_body");
  const table2 = document.getElementById("tbl_2_body");
  //HTMLにて非表示で作成
  const rowTemplate1 = table1.querySelector(".zbx_row_template");
  const rowTemplate2 = table2.querySelector(".zbx_row_template");
  //テーブル内データを初期化
  table1.innerHTML = "";
  table2.innerHTML = "";

  //const rowDataArray = await axios.get("http://hirasyain.link:3000/zbx/all");
  console.log(rowDataArray);

//itemに違った場合にdiff=trueになる

  for(const item1 of rowDataArray.data){
    for(const item2 of rowDataArray.data) {
       if(item1.param_name.value == item2.param_name.value){
        if(item1.param_desc.value != item2.param_desc.value){
          item1.param_desc.diff = item2.param_desc.diff = true;
        }
       }
    }
  }
  console.log(rowDataArray.data);

  let rowsIndex1 = 1;
  for(const item of rowDataArray.data) {
    if(item.ver.value === selectedVersion1) {
      const row = createRow(item, rowTemplate1, rowsIndex1++);
      table1.appendChild(row);
    }
  }


  let rowsIndex2 = 1;
  for(const item of rowDataArray.data) {
    if(item.ver.value === selectedVersion2) {
      const row = createRow(item, rowTemplate2, rowsIndex2++);
      table2.appendChild(row);
    }
  }
}


const createRow = (rowData, template, index) => {
  // テンプレートのコピーを作成
  const row = template.cloneNode(true);
  row.hidden = false;

  console.log("row = ", row);

  // rowDataの各プロパティにアクセス
  for (const key in rowData) {
    if (key === 'id' || key === 'ver') continue;

    const id = '.' + key + '_';

    console.log(id);

    // プロパティのデータ型がオブジェクトで、その中に 'value' プロパティがあるかをチェック
    if (typeof rowData[key] === 'object' && 'value' in rowData[key]) {
      const value = rowData[key].value;
      const ele = row.querySelector(id + '0');
      ele.innerHTML = value;
      ele.id = id + index;
    }
  }
  console.log(row);

  return row;
}

showTable();

verSelectBox1.addEventListener('change', showTable);
verSelectBox2.addEventListener('change', showTable);
