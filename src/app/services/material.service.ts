// import { Injectable } from '@angular/core';

declare var M:any;


export class MaterialService {

  static toast(message:string){
    M.toast({html: message})

  }
  constructor() { }
}
