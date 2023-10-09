drop table if exists parameters;

create table parameters(
  id int not null auto_increment,
  process text not null,              /* Zabbix server, Zabbix agent... */
  ver text not null, 
  param_name text not null, 
  mandatory text, 
  val_range text, 
  val_default text, 
  param_desc text,
  PRIMARY KEY(id)
  );

insert into parameters values (0, "Zabbix server", "4.0", "test_parameter_for_ver_4", "yes", "0-100", "30", "This is a test parameter for ver 4.");
insert into parameters values (0, "Zabbix server", "5.0", "test_parameter_for_ver_5", "yes", "0-100", "30", "This is a test parameter for ver 5.");
insert into parameters values (0, "Zabbix server", "6.0", "test_parameter_for_ver_6", "yes", "0-100", "30", "This is a test parameter for ver 6.");


insert into parameters values (0, "Zabbix server", "6.0", "AlertScriptsPath", "no", null, "/usr/local/share/zabbix/alertscripts", "Location of custom alert scripts (depends on compile-time installation variable datadir).");
insert into parameters values (0, "Zabbix server", "6.0", "AllowRoot", "no", null, "0", "Allow the server to run as 'root'. If disabled and the server is started by 'root', the server will try to switch to the 'zabbix' user instead. Has no effect if started under a regular user.<br>0 - do not allow<br>1 - allow");
insert into parameters values (0, "Zabbix server", "6.0", "AllowUnsupportedDBVersions", "no", null, "0", "Allow the server to work with unsupported database versions.<br>0 - do not allow<br>1 - allow");
insert into parameters values (0, "Zabbix server", "6.0", "CacheSize", "no", "128K-64G", "32M", "Size of configuration cache, in bytes.<br>Shared memory size for storing host, item and trigger data.");


insert into parameters values (0, "Zabbix server", "4.0", "AlertScriptsPath", "no", null, "/usr/local/share/zabbix/alertscripts", "Location of custom alert scripts (depends on compile-time installation variable datadir).");
insert into parameters values (0, "Zabbix server", "4.0", "AllowRoot", "no", null, "0", "Allow the server to run as 'root'. If disabled and the server is started by 'root', the server will try to switch to the 'zabbix' user instead. Has no effect if started under a regular user.<br>0 - do not allow<br>1 - allow<br>This parameter is supported since Zabbix 2.2.0.");
insert into parameters values (0, "Zabbix server", "4.0", "CacheSize", "no", "128K-64G", "8M", "Size of configuration cache, in bytes.<br>Shared memory size for storing host, item and trigger data.<br>The maximum value of this parameter was increased from 8GB to 64GB in Zabbix 4.0.21.");
insert into parameters values (0, "Zabbix server", "4.0", "CacheUpdateFrequency", "no", null, "60", "How often Zabbix will perform update of configuration cache, in seconds.<br>See also runtime control options.");


drop table if exists notices;

create table notices(
  id int not null auto_increment,
  process text not null,            /* Zabbix server, Zabbix agent, Web interface */
  ver text not null,                /* 注意すべき点が発生したバージョン */
  notice_desc text,
  PRIMARY KEY(id)
  );


insert into notices values (0, "Zabbix server", "6.0", 'ZabbixDBの各テーブルの文字コードをutf8mb4へ変換することが推奨されている。変換方法は<a href="https://www.zabbix.com/documentation/6.0/jp/manual/appendix/install/db_charset_coll">2 Zabbixデータベースのキャラクターセットと照合の修正</a>を参照');
insert into notices values (0, "Zabbix server", "6.0", 'History系テーブルにプライマリキーが追加された。ただのデータ移行ではプライマリキーは自動追加されないため、<strong>手動で追加する</strong>必要がある。方法は<a href="https://www.zabbix.com/documentation/6.0/jp/manual/appendix/install/db_primary_keys">3 データベースの主キーのアップグレード</a>参照');
insert into notices values (0, "Zabbix server", "6.0", "ポジショナルマクロが撤廃された。手動変換しないとアイテムの名前がキーの引数の名前に変換されず”$1”などと表示されてしまう。公式にてポジショナルマクロ変換スクリプトが提供されているが、ベーシックサポート以上の契約が必要");
insert into notices values (0, "Web interface", "4.0", "Zabbix Server の“SenderFrequencyパラメータ”が撤廃されたため、代わりに、Webインターフェースからメディアタイプを選択し、オプションの”試行間隔”に値を設定する必要がある。");
