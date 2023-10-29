var rowDataArray_original = {
  data: [
    {
      process: "Zabbix server",
      ver: "6.0",
      param_name: "MySQL/Percona",
      mandatory: "どれか一つ",
      val_range: "8.0.X",
      val_default: "なし",
      param_desc: "MySQL (または Percona) を Zabbix バックエンド データベースとして使用する場合に必要です。 InnoDB エンジンが必要です。 サーバー/プロキシの構築には MariaDB Connector/C ライブラリを使用することをお勧めします。"
    },
    {
      process: "Zabbix agent(UNIX)",
      ver: "6.0",
      param_name: "Agent",
      mandatory: "あああ",
      val_range: "8.0.X",
      val_default: "なし",
      param_desc: "Agentです"
    }
  ]
};

const proc = async () => {
  // rowDataArrayにデータを投入
  //const rowDataArray = JSON.parse(JSON.stringify(rowDataArray_original));
  const rowDataArray = await axios.get("http://hirasyain.link:3000/zbx/all");
  // HTMLのセレクトボックスを取得
  const verSelectBox1 = document.getElementById("version_1");
  const verSelectBox2 = document.getElementById("version_2");
  const comparisonSelectBox = document.getElementById("comparison");
  const processSelectBox = document.getElementById("process");

  // テーブル表示機能
  const showTable = async (table) => {
    toggleHidden();

    // セレクトボックスの値を取得
    const selectedVersion1 = verSelectBox1.value;
    const selectedVersion2 = verSelectBox2.value;
    const selectedcomparison = comparisonSelectBox.value;
    const selectedprocess = processSelectBox.value;
    // HTMLのテーブルのbody(tbody)を取得
    const table1 = document.getElementById("tbl_1_body");
    const table2 = document.getElementById("tbl_2_body");
    // HTMLにて非表示で作成されているテーブルのテンプレート取得
    const rowTemplate1 = table1.querySelector(".zbx_row_template");
    const rowTemplate2 = table2.querySelector(".zbx_row_template");
    // テーブル内データを初期化
    const removeRows = (table) => {
      const rowsToRemove = table.getElementsByClassName('new_row_class');
      while (rowsToRemove.length > 0) {
        rowsToRemove[0].remove();
      }
    };
    // 初期化
    removeRows(table1);
    removeRows(table2);

    for (let i = 0; i < rowDataArray.data.length; ++i) {
      for (const key in rowDataArray.data[i]) {
        if (key == 'id') delete rowDataArray.data[i][key]
        else rowDataArray.data[i][key] = { value: rowDataArray.data[i][key], match: false }
      }
    }


    const sha256 = async (text) => {
      const uint8 = new TextEncoder().encode(text)
      const digest = await crypto.subtle.digest('SHA-256', uint8)
      return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2, '0')).join('')
    }

    console.log(sha256('テスト').then(hash => console.log(hash)));
    // ver1_paramsとver2_paramsを作成
    const get_specified_param = (process, ver) => {
      const ar = [];
      for (const item of rowDataArray.data) {
        console.log("process.value:", item.process.value)
        console.log("process:", process)
        console.log("ver.value:", item.ver.value)
        console.log("ver:", ver)
        console.log("condithon: ", item.process.value == process)
        if (item.process.value == process && item.ver.value == ver) {
          ar.push(item);
          console.log("aaaaa");
        }
      }
      return ar;
    }
    const ver1_params = get_specified_param(selectedprocess, selectedVersion1);
    const ver2_params = get_specified_param(selectedprocess, selectedVersion2);


    // パラメータを比較
    const key_pare = ["process", "ver", "param_name", "mandatory", "val_range", "val_default", "param_desc"];
    for (const item1 of ver1_params) {
      for (const item2 of ver2_params) {
        if (item1.param_name.value == item2.param_name.value) {
          for (const key of key_pare) {
            if (item1[key].value == item2[key].value) {
              item1[key].match = item2[key].match = true;
            }
          }
        }
      }
    }

    // ないものを追加
    for (const item of ver2_params) {
      if (item.param_name.match == false && item.ver.value == selectedVersion2) {
        ver1_params.push(item);
      }
    }


    // テーブル表示
    let rowsIndex1 = 1;
    for (const item of ver1_params) {
      const row = createRow(item, rowTemplate1, rowsIndex1++);
      if (selectedcomparison === "all" ||
        (selectedcomparison === "match" && item.param_name.match == true) ||
        (selectedcomparison === "diff" && item.param_name.match == false)) {
        table1.appendChild(row);
        row.style = "";
        if (item.ver.value != selectedVersion1) {
          row.style.backgroundColor = "gray";
          row.style.textDecoration = "line-through";
        } else if (item.param_name.match == false) {
          row.style.backgroundColor = "lime";
        }
      }
    }

    let rowsIndex2 = 1;
    for (const item of ver2_params) {
      const row = createRow(item, rowTemplate2, rowsIndex2++);
      if (selectedcomparison === "all" ||
        (selectedcomparison === "match" && item.param_name.match == true) ||
        (selectedcomparison === "diff" && item.param_name.match == false)) {
        table2.appendChild(row);
      }
      if (item.param_name.match == false) {
        row.style.backgroundColor = "gray";
      }
    }
  };



  // パラメータを表示
  const createRow = (rowData, template, index) => {
    const row = template.cloneNode(true);
    row.classList.remove('zbx_row_template'); // 前のクラスを削除
    row.classList.add('new_row_class'); // 新しいクラスを追加
    row.hidden = false;
    for (const key in rowData) {
      if (key === 'id' || key === 'ver' || key === 'process') continue;
      const id = key + '_';

      if (typeof rowData[key] === 'object' && 'value' in rowData[key]) {
        const value = rowData[key].value;
        const ele = row.querySelector('#' + id + '0');
        ele.id = id + index;
        ele.innerHTML = value;
        ele.style.color = '';
        if (rowData[key].match == false) {
          ele.style.color = 'red';
        }
      }
    }
    return row;
  };


  let toggle_cnt = 0;
  const toggleHidden = () => {
    console.log(document.querySelectorAll('.hidden_gp_' + toggle_cnt));
    console.log(toggle_cnt);
    for (const item of document.querySelectorAll('.hidden_gp_' + toggle_cnt)) {
      item.hidden = true;
    }
    for (const item of document.querySelectorAll('.hidden_gp_' + (toggle_cnt + 1) % 2)) {
      item.hidden = false;
    }
    toggle_cnt = (toggle_cnt + 1) % 2;
  }

  // テーブルを初期表示
  showTable();

  // セレクトボックスの変更時にテーブルを更新
  verSelectBox1.addEventListener('change', showTable);
  verSelectBox2.addEventListener('change', showTable);
  comparisonSelectBox.addEventListener('change', showTable);
  processSelectBox.addEventListener('change', showTable);

}

proc();