export class ZbxParam
{
  public id: number;
  public process: string;
  public ver: string;
  public param_name: string;
  public mandatory: boolean;
  public val_range: string;
  public val_default: string;
  public param_desc: string;

  // constructor(id: number, process: string, ver: string, param_name: string, mandatory: boolean, val_range: string, val_default: string, param_desc: string)
  // {
  //   this.id = id;
  //   this.process = process;
  //   this.ver = ver;
  //   this.param_name = param_name;
  //   this.mandatory = mandatory;
  //   this.val_range = val_range;
  //   this.val_default = val_default;
  //   this.param_desc = param_desc;
  // }

  constructor({id, process, ver, param_name, mandatory, val_range, val_default, param_desc}: ZbxParam)
  {
    console.log("constructor: " + id + " " + process);

    this.id = id;
    this.process = process;
    this.ver = ver;
    this.param_name = param_name;
    this.mandatory = mandatory;
    this.val_range = val_range;
    this.val_default = val_default;
    this.param_desc = param_desc;
  }


  public is_diff(o : ZbxParam)
  {
    const j1 = JSON.stringify(this);
    const j2 = JSON.stringify(o);

    return j1 == j2;
  }
}
