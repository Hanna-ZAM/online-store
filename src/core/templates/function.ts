import {itemsInBasket, countItemInBasket, sumItemInBasket} from '../../pages/app/app';
import productsList from '../../core/templates/product';

export function changeBasket(Id:number, add:boolean=true):Array<number>{
  if (add) {
    itemsInBasket.push(Id);
  } else if((itemsInBasket.includes(Id)&&(!add))){
    itemsInBasket.splice(itemsInBasket.indexOf(Id), 1);
  }
  countItemInBasket!.innerHTML=itemsInBasket.length.toString();
  sumItemInBasket!.innerHTML=`${itemsInBasket.reduce((acc:number, el:number):number => (acc + productsList.products[el-1].price), 0).toString()} $`;
  return itemsInBasket;
}
