
const Process = Object.freeze({
  ZabbixServer: "Zabbix server",
  ZabbixAgent1: "Zabbix agent",
  WebInterface: "Web interface" 
});


const verSelectBox1 = document.querySelector("#version_1");
const verSelectBox2 = document.querySelector("#version_2");

const indexContainer = document.querySelector("#index-table-container");
const noticeContainer = document.querySelector("#notice-container");


const updateNotice = async() =>
{
  const begin_ver = verSelectBox1.value;
  const end_ver = verSelectBox2.value;
  
  const notices = (await axios.get("http://hirasyain.link:3000/zbx/notice/all")).data;

  console.log("notices", notices);
  console.log("noticeContainer", noticeContainer);
  console.log("begin_ver", begin_ver, "end_ver", end_ver);

  for(const item of noticeContainer.children ?? []) item.querySelector(".notice-list ul").innerHTML="";

  for(const item of notices)
  {
    let container;
    console.log("item.process", item.process)
    if(item.process == Process.ZabbixServer) container = noticeContainer.querySelector("#notice-list-zabbix_server ul");
    else if(item.process == Process.ZabbixAgent1) container = noticeContainer.querySelector("#notice-list-zabbix_agent ul");
    else if(item.process == Process.WebInterface) container = noticeContainer.querySelector("#notice-list-web_interface ul");
    
    if(parseFloat(begin_ver) < parseFloat(end_ver) && parseFloat(begin_ver) <= parseFloat(item.ver) && parseFloat(item.ver) <= parseFloat(end_ver))
    {
      const desc = document.createElement("li");
      desc.innerHTML = item.notice_desc;
      container.appendChild(desc);
    }
  }
}



updateNotice();

verSelectBox1.addEventListener('change', updateNotice);
verSelectBox2.addEventListener('change', updateNotice);
