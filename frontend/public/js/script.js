var rowDataArray_original = {
  data: [
    {
      process: { value: "Zabbix server", diff: 0 },
      ver: { value: "6.0", diff: 0 },
      param_name: { value: "MySQL/Percona", diff: 0 },
      mandatory: { value: "どれか一つ", diff: 0 },
      val_range: { value: "8.0.X", diff: 0 },
      val_default: { value: "なし", diff: 0 },
      param_desc: { value: "MySQL (または Percona) を Zabbix バックエンド データベースとして使用する場合に必要です。 InnoDB エンジンが必要です。 サーバー/プロキシの構築には MariaDB Connector/C ライブラリを使用することをお勧めします。", diff: 0 }
    },
    {
      process: { value: "Zabbix agent(UNIX)", diff: 0 },
      ver: { value: "6.0", diff: 0 },
      param_name: { value: "Agent", diff: 0 },
      mandatory: { value: "あああ", diff: 0 },
      val_range: { value: "8.0.X", diff: 0 },
      val_default: { value: "なし", diff: 0 },
      param_desc: { value: "Agentです", diff: 0 }
    },
    {
      process: { value: "Zabbix server", diff: 0 },
      ver: { value: "5.0", diff: 0 },
      param_name: { value: "MySQL/Percona", diff: 0 },
      mandatory: { value: "どれか一つ", diff: 0 },
      val_range: { value: "8.0.X", diff: 0 },
      val_default: { value: "なし", diff: 0 },
      param_desc: { value: "aaaMySQL (または Percona) を Zabbix バックエンド データベースとして使用する場合に必要です。 InnoDB エンジンが必要です。 サーバー/プロキシの構築には MariaDB Connector/C ライブラリを使用することをお勧めします。", diff: 0 }
    },
    {
      process: { value: "Zabbix server", diff: 0 },
      ver: { value: "5.0", diff: 0 },
      param_name: { value: "aMySQL", diff: 0 },
      mandatory: { value: "どれか一つ", diff: 0 },
      val_range: { value: "8.0.X", diff: 0 },
      val_default: { value: "なし", diff: 0 },
      param_desc: { value: "a", diff: 0 }
    },
    {
      process: { value: "Zabbix server", diff: 0 },
      ver: { value: "4.0", diff: 0 },
      param_name: { value: "MySQL/Percona", diff: 0 },
      mandatory: { value: "あああ", diff: 0 },
      val_range: { value: "8.0.X", diff: 0 },
      val_default: { value: "なし", diff: 0 },
      param_desc: { value: "ああああMySQL (または Percona) を Zabbix バックエンド データベースとして使用する場合に必要です。 InnoDB エンジンが必要です。 サーバー/プロキシの構築には MariaDB Connector/C ライブラリを使用することをお勧めします。", diff: 0 }
    },
    {
      process: { value: "Zabbix agent(UNIX)", diff: 0 },
      ver: { value: "4.0", diff: 0 },
      param_name: { value: "MySQL/Percona", diff: 0 },
      mandatory: { value: "あああ", diff: 0 },
      val_range: { value: "8.0.X", diff: 0 },
      val_default: { value: "なし", diff: 0 },
      param_desc: { value: "ああああMySQL (または Percona) を Zabbix バックエンド データベースとして使用する場合に必要です。 InnoDB エンジンが必要です。 サーバー/プロキシの構築には MariaDB Connector/C ライブラリを使用することをお勧めします。", diff: 0 }
    }
  ]
};



//HTMLのセレクトボックスを取得
const verSelectBox1 = document.getElementById("version_1");
const verSelectBox2 = document.getElementById("version_2");
const comparisonSelectBox = document.getElementById("comparison");
const processSelectBox = document.getElementById("process");



//テーブル表示機能
const showTable = async (table) => {
  //セレクトボックスの値を取得
  const selectedVersion1 = verSelectBox1.value;
  const selectedVersion2 = verSelectBox2.value;
  const selectedcomparison = comparisonSelectBox.value;
  const selectedprocess = processSelectBox.value;
  //HTMLのテーブルのbody(tbody)を取得
  const table1 = document.getElementById("tbl_1_body");
  const table2 = document.getElementById("tbl_2_body");
  //HTMLにて非表示で作成されているテーブルのテンプレート取得
  const rowTemplate1 = table1.querySelector(".zbx_row_template");
  const rowTemplate2 = table2.querySelector(".zbx_row_template");
  //テーブル内データを初期化
  table1.innerHTML = "";
  table2.innerHTML = "";

  //const rowDataArray = await axios.get("http://hirasyain.link:3000/zbx/all");

  //rowDataArrayにデータを投入
  const rowDataArray = JSON.parse(JSON.stringify(rowDataArray_original));

  //rowDataArrayの比較変更
  //不一致：0,一致：１
  console.log(selectedprocess);
  for (const item1 of rowDataArray.data) {
    for (const item2 of rowDataArray.data) {
      if (item1.process.value == selectedprocess && item2.process.value == selectedprocess && item1.ver.value == selectedVersion1 && item2.ver.value == selectedVersion2) {
        //param_nameかparam_descが一致したら他の値も一致、不一致かを判定
        if (item1.param_name.value == item2.param_name.value || item1.param_desc.value == item2.param_desc.value) {
          if (item1.param_name.value == item2.param_name.value) {
            item1.param_name.diff = item2.param_name.diff = 1;
          }
          if (item1.param_desc.value == item2.param_desc.value) {
            item1.param_desc.diff = item2.param_desc.diff = 1;
          }
          if (item1.mandatory.value == item2.mandatory.value) {
            item1.mandatory.diff = item2.mandatory.diff = 1;
          }
          if (item1.val_range.value == item2.val_range.value) {
            item1.val_range.diff = item2.val_range.diff = 1;
          }
          if (item1.val_default.value == item2.val_default.value) {
            item1.val_default.diff = item2.val_default.diff = 1;
          }
          if (item1.ver.value == item2.ver.value) {
            item1.ver.diff = item2.ver.diff = 1;
          }
          if (item1.process.value == item2.process.value) {
            item1.process.diff = item2.process.diff = 1;
          }
        }
      }
    }
  }
  console.log(rowDataArray);

  //
  let rowsIndex1 = 1;
  for (const item of rowDataArray.data) {
    if (item.ver.value == selectedVersion1 && item.process.value == selectedprocess) {
      const row = createRow(item, rowTemplate1, rowsIndex1++);
      if (selectedcomparison === "all" ||
        (selectedcomparison === "match" && (item.param_name.diff == 1 || item.param_desc.diff == 1)) ||
        (selectedcomparison === "diff" && (item.param_name.diff == 0 && item.param_desc.diff == 0))) {
        table1.appendChild(row);
      }

      row.style = "";
      if (item.param_name.diff == 1 || item.param_desc.diff == 1) {
        row.style.backgroundColor = "mediumseagreen";
      } else {
        row.style.backgroundColor = "gray";
      }
    }
  }

    let rowsIndex2 = 1;
    for (const item of rowDataArray.data) {
      if (item.ver.value == selectedVersion2 && item.process.value == selectedprocess) {
        const row = createRow(item, rowTemplate2, rowsIndex2++);
        if (selectedcomparison === "all" ||
          (selectedcomparison === "match" && (item.param_name.diff == 1 || item.param_desc.diff == 1)) ||
          (selectedcomparison === "diff" && (item.param_name.diff == 0 && item.param_desc.diff == 0))) {
          table2.appendChild(row);
        }
  
        row.style = "";
        if (item.param_name.diff == 1 || item.param_desc.diff == 1) {
          row.style.backgroundColor = "mediumseagreen";
        } else {
          row.style.backgroundColor = "gray";
        }
      }
    }
  }



  //テーブル表示()
  const createRow = (rowData, template, index) => {
    // テンプレートの複製
    const row = template.cloneNode(true);
    console.log(template)
    row.hidden = false;
    // rowDataの各プロパティにアクセス
    for (const key in rowData) {
      if (key === 'id' || key === 'ver') continue;
      const id = '.' + key + '_';
      // プロパティのデータ型がオブジェクトで、その中に 'value' プロパティがあるかをチェック
      if (typeof rowData[key] === 'object' && 'value' in rowData[key]) {
        const value = rowData[key].value;
        const ele = row.querySelector(id + '0');
        ele.innerHTML = value;
        ele.id = id + index;
        // diffプロパティをチェックし、テキストカラーを設定
        ele.style.color = '';
        if (rowData[key].diff == 0) {
          ele.style.color = 'red';
        }
      }
    }

    return row;
  }



  showTable();
  verSelectBox1.addEventListener('change', showTable);
  verSelectBox2.addEventListener('change', showTable);
  comparisonSelectBox.addEventListener('change', showTable);
  processSelectBox.addEventListener('change', showTable);