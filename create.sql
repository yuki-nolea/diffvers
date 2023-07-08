drop table if exists parameters;

create table parameters(
  id int not null auto_increment, 
  ver text not null, 
  param_name text, 
  mandatory boolean, 
  val_range text, 
  val_default text, 
  param_desc text,
  PRIMARY KEY(id)
  );

insert into parameters values (0, "4", "test_parameter_for_ver_4", true, "0-100", "30", "This is a test parameter for ver 4.");
insert into parameters values (0, "5", "test_parameter_for_ver_5", true, "0-100", "30", "This is a test parameter for ver 5.");
insert into parameters values (0, "6", "test_parameter_for_ver_6", true, "0-100", "30", "This is a test parameter for ver 6.");