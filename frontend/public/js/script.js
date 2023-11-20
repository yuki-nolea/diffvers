<<<<<<< HEAD
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
=======
//const parameters_promise = axios.get("http://localhost:3000/zbx/all");
const parameters_promise = axios.get("http://hirasyain.link:3000/zbx/all");

const left_version_selectbox = document.querySelector(".left_version_selectbox");
const right_version_selectbox = document.querySelector(".right_version_selectbox");
const filter_selectbox = document.querySelector(".filter_selectbox");
const process_selectbox = document.querySelector(".process_selectbox");
const toggle_display_button = document.querySelector(".toggle_display_button");

const update_diff_tables = async () =>
{
  const parameters = (await parameters_promise).data;

  const process = process_selectbox.value;
  const left_version = left_version_selectbox.value;
  const right_version = right_version_selectbox.value;

  const filter = filter_selectbox.value;

  const row_container = document.querySelector(".row_container");
  const row_template = document.querySelector(".row_template");
  
  row_container.innerHTML = "";

  const match_ids = extract_match_ids(parameters, process, left_version, right_version);
  const only_side_ids = extract_only_side_ids(parameters, process, left_version, right_version);
  const diff_ids = extract_diff_ids(parameters, process, left_version, right_version);

  const rows = create_rows_from_template(parameters, match_ids, only_side_ids, diff_ids, row_template, filter);

  for(const row of rows) row_container.appendChild(row);
}

const create_rows_from_template = (parameters, match_ids, only_side_ids, diff_ids, template, filter) =>
{
  const create_row = () =>
  {
    const row = template.cloneNode(true);
    row.classList.remove("row_template");
    row.hidden = false;

    return row;
  }
>>>>>>> dev

  const fill_param_card = (parameter, param_card) =>
  {
    for (const key in parameter)
    {
      if (key === "id" || key === "ver" || key === "process") continue;

<<<<<<< HEAD
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
=======
      const html_parameter = param_card.querySelector("." + key);
      html_parameter.dataset.id = parameter.id;
      html_parameter.innerHTML = parameter[key];
    }
  }

  const rows = [];

  if(filter == "all" || filter == "match")
  {
    for(const item of match_ids)
    {
      const row = create_row();
      const left_param_card = row.querySelector(".left_param_card");
      const right_param_card = row.querySelector(".right_param_card");

      fill_param_card(parameters.find(parameter => parameter.id === item.left_id), left_param_card);
      fill_param_card(parameters.find(parameter => parameter.id === item.right_id), right_param_card);

      left_param_card.classList.add("parameter_match");
      right_param_card.classList.add("parameter_match");
      rows.push(row);
    }
  }

  if(filter == "all" || filter == "diff")
  {
    for(const item of only_side_ids)
    {
      const row = create_row();
      const left_param_card = row.querySelector(".left_param_card");
      const right_param_card = row.querySelector(".right_param_card");

      const parameter = item.left_id === undefined ? parameters.find(param => param.id === item.right_id) : parameters.find(param => param.id === item.left_id);

      fill_param_card(parameter, left_param_card);
      fill_param_card(parameter, right_param_card);

      left_param_card.classList.add(item.left_id === undefined ? "parameter_not_exist" : "parameter_exist");
      right_param_card.classList.add(item.right_id === undefined ? "parameter_not_exist" : "parameter_exist");

      rows.push(row);
    }

    for(const item of diff_ids)
    {
      const row = create_row();
      const left_param_card = row.querySelector(".left_param_card");
      const right_param_card = row.querySelector(".right_param_card");

      fill_param_card(parameters.find(parameter => parameter.id === item.left_id), left_param_card);
      fill_param_card(parameters.find(parameter => parameter.id === item.right_id), right_param_card);

      for(const key of item.diff_properties)
      {
        row.querySelectorAll("." + key).forEach(param_row => param_row.classList.add("parameter_diff"));
      }

      rows.push(row);
    }
  }

  rows.sort((a, b) => a.querySelector(".left_param_card .param_name").textContent > b.querySelector(".left_param_card .param_name").textContent ? 1 : -1);

  return rows;
}

const toggle_hidden = function() 
{
  let cnt = 0;

  return () => {
    cnt = (cnt + 1) % 2;
    const cnts = [cnt, (cnt+1)%2];

    for (const item of document.querySelectorAll('.display_group_' + cnts[0])) item.hidden = true;
    for (const item of document.querySelectorAll('.display_group_' + cnts[1])) item.hidden = false;
  }
}()

const filter_parameters = (parameters, process, version) => parameters.filter(item => item.process == process && item.ver == version)

const is_match_parameter = (left_parameter, right_parameter) => 
{
  const {id: left_id, ver: left_ver, ...left} = left_parameter;
  const {id: right_id, ver: right_ver, ...right} = right_parameter;

  return JSON.stringify(left) === JSON.stringify(right);
}

const extract_match_ids = (parameters, process, left_version, right_version) =>
{
  const left_parameters = filter_parameters(parameters, process, left_version);
  const right_parameters = filter_parameters(parameters, process, right_version);
  
  const matches = [];
  for(left_item of left_parameters)
  {
    for(right_item of right_parameters)
    {
      if(is_match_parameter(left_item, right_item))
      {
        matches.push({left_id: left_item.id, right_id: right_item.id})
>>>>>>> dev
      }
    }

<<<<<<< HEAD
    // ないものを追加
    for (const item of ver2_params) {
      if (item.param_name.match == false && item.ver.value == selectedVersion2) {
        ver1_params.push(item);
      }
    }
=======
  return matches;
}
>>>>>>> dev

const extract_only_side_ids = (parameters, process, left_version, right_version) =>
{
  const left_parameters = filter_parameters(parameters, process, left_version);
  const right_parameters = filter_parameters(parameters, process, right_version);

<<<<<<< HEAD
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
=======
  const only_left_side_parameters = left_parameters.filter(left_item => !right_parameters.find(right_item => left_item.param_name === right_item.param_name));
  const only_right_side_parameters = right_parameters.filter(right_item => !left_parameters.find(left_item => left_item.param_name === right_item.param_name));
  
  const only_left_side_ids = only_left_side_parameters.map(item => ({left_id: item.id, right_id: undefined}));
  const only_right_side_ids = only_right_side_parameters.map(item => ({left_id: undefined, right_id: item.id}));

  return [...only_left_side_ids, ...only_right_side_ids];
}

const extract_diff_ids = (parameters, process, left_version, right_version) =>
{
  const left_parameters = filter_parameters(parameters, process, left_version);
  const right_parameters = filter_parameters(parameters, process, right_version);

  const match_ids = extract_match_ids(parameters, process, left_version, right_version);

  const param_name_matches = [];
  for(left_item of left_parameters)
  {
    for(right_item of right_parameters)
    {
      if(left_item.param_name === right_item.param_name)
      {
        param_name_matches.push({left_id: left_item.id, right_id: right_item.id, diff_properties: []});
      }
    }
  }

  const diff_ids = param_name_matches.filter(item => !match_ids.find(match => match.left_id === item.left_id && match.right_id === item.right_id))
  
  for(const diff_id of diff_ids)
  {
    const left_parameter = left_parameters.find(item => item.id === diff_id.left_id);
    const right_parameter = right_parameters.find(item => item.id === diff_id.right_id);
>>>>>>> dev

    for(key in left_parameter)
    {
      if (key === "id" || key === "ver" || key === "process") continue;

<<<<<<< HEAD

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
=======
      if( left_parameter[key] !== right_parameter[key])
      {
        diff_id.diff_properties.push(key);
>>>>>>> dev
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

<<<<<<< HEAD
  // テーブルを初期表示
  showTable();

  // セレクトボックスの変更時にテーブルを更新
  verSelectBox1.addEventListener('change', showTable);
  verSelectBox2.addEventListener('change', showTable);
  comparisonSelectBox.addEventListener('change', showTable);
  processSelectBox.addEventListener('change', showTable);

}

proc();
=======
  return diff_ids;
}


update_diff_tables();

left_version_selectbox.addEventListener("change", update_diff_tables);
right_version_selectbox.addEventListener("change", update_diff_tables);
filter_selectbox.addEventListener("change", update_diff_tables);
process_selectbox.addEventListener("change", update_diff_tables);
toggle_display_button.addEventListener("click", toggle_hidden);
>>>>>>> dev
