var rowDataArray = [
  {
      version: "zabbix-Server_6.0",
      name: "MySQL/Percona",
      required: "どれか一つ",
      range: "8.0.X",
      defaultValue: "なし",
      description: "MySQL (または Percona) を Zabbix バックエンド データベースとして使用する場合に必要です。 InnoDB エンジンが必要です。 サーバー/プロキシの構築には MariaDB Connector/C ライブラリを使用することをお勧めします。"
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
