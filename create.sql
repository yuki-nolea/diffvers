drop table if exists parameters;

create table parameters(
  id int not null auto_increment,
  process text not null, 
  ver text not null, 
  param_name text not null, 
  mandatory boolean, 
  val_range text, 
  val_default text, 
  param_desc text,
  PRIMARY KEY(id)
  );

insert into parameters values (0, "Zabbix server", "4.0", "test_parameter_for_ver_4", true, "0-100", "30", "This is a test parameter for ver 4.");
insert into parameters values (0, "Zabbix server", "5.0", "test_parameter_for_ver_5", true, "0-100", "30", "This is a test parameter for ver 5.");
insert into parameters values (0, "Zabbix server", "6.0", "test_parameter_for_ver_6", true, "0-100", "30", "This is a test parameter for ver 6.");


insert into parameters values (0, "Zabbix server", "6.0", "AlertScriptsPath", false, null, "/usr/local/share/zabbix/alertscripts", "Location of custom alert scripts (depends on compile-time installation variable datadir).");
insert into parameters values (0, "Zabbix server", "6.0", "AllowRoot", false, null, "0", "Allow the server to run as 'root'. If disabled and the server is started by 'root', the server will try to switch to the 'zabbix' user instead. Has no effect if started under a regular user.<br>0 - do not allow<br>1 - allow");
insert into parameters values (0, "Zabbix server", "6.0", "AllowUnsupportedDBVersions", false, null, "0", "Allow the server to work with unsupported database versions.<br>0 - do not allow<br>1 - allow");
insert into parameters values (0, "Zabbix server", "6.0", "CacheSize", false, "128K-64G", "32M", "Size of configuration cache, in bytes.<br>Shared memory size for storing host, item and trigger data.");


insert into parameters values (0, "Zabbix server", "4.0", "AlertScriptsPath", false, null, "/usr/local/share/zabbix/alertscripts", "Location of custom alert scripts (depends on compile-time installation variable datadir).");
insert into parameters values (0, "Zabbix server", "4.0", "AllowRoot", false, null, "0", "Allow the server to run as 'root'. If disabled and the server is started by 'root', the server will try to switch to the 'zabbix' user instead. Has no effect if started under a regular user.<br>0 - do not allow<br>1 - allow<br>This parameter is supported since Zabbix 2.2.0.");
insert into parameters values (0, "Zabbix server", "4.0", "CacheSize", false, "128K-64G", "8M", "Size of configuration cache, in bytes.<br>Shared memory size for storing host, item and trigger data.<br>The maximum value of this parameter was increased from 8GB to 64GB in Zabbix 4.0.21.");
insert into parameters values (0, "Zabbix server", "4.0", "CacheUpdateFrequency", false, null, "60", "How often Zabbix will perform update of configuration cache, in seconds.<br>See also runtime control options.");

