//const parameters_promise = axios.get("http://localhost:3000/zbx/all");
const parameters_promise = axios.get("https://hirasyain.link:3000/zbx/all");

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

  const fill_param_card = (parameter, param_card) =>
  {
    for (const key in parameter)
    {
      if (key === "id" || key === "ver" || key === "process") continue;

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
      }
    }
  }

  return matches;
}

const extract_only_side_ids = (parameters, process, left_version, right_version) =>
{
  const left_parameters = filter_parameters(parameters, process, left_version);
  const right_parameters = filter_parameters(parameters, process, right_version);

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

    for(key in left_parameter)
    {
      if (key === "id" || key === "ver" || key === "process") continue;

      if( left_parameter[key] !== right_parameter[key])
      {
        diff_id.diff_properties.push(key);
      }
    }
  }

  return diff_ids;
}


update_diff_tables();

left_version_selectbox.addEventListener("change", update_diff_tables);
right_version_selectbox.addEventListener("change", update_diff_tables);
filter_selectbox.addEventListener("change", update_diff_tables);
process_selectbox.addEventListener("change", update_diff_tables);
toggle_display_button.addEventListener("click", toggle_hidden);