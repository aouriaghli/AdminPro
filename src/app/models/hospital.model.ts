import { environment } from "src/environments/environment";

const base_url = environment.baseUrl;

interface _hospitalUser{
  _id:string;
  nombre:string;
  img:string;
}

export class Hospital {

  constructor(
    public nombre:string,
    public _id?:string,
    public usuario?:_hospitalUser,
    public img?:string,
  ){ }

}
