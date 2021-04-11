import {constantString} from './strings';
import { ItemsState, UnformatedItem } from '../redux/modules/Items';

export const convertSecToHourString = (targetSec: number): string => {
  const hour = Math.floor(targetSec / 3600);
  const min = Math.floor(targetSec % 3600 / 60);
  const sec = Math.floor(targetSec % 3600 % 60);
  
  if(hour <= 0 && min <= 0 && sec <= 0) {
    return constantString.endBid;
  } else {
    return `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }
};

export const getFormatedChatDate = (time: Date):string => {
  const hour = time.getHours();
  const min = time.getMinutes();
  const ampm = hour <= 12 ? '오전' : '오후';
  return `${ampm} ${hour} ${min}`;
};

export const getFormatedItems = (items: Array<UnformatedItem>): ItemsState => {
  return {items: items.map(item => {
    const {id, title, price, photo, description, winnerId, sellerId, isClosed, city} = item;
    return {id, title, price, photo, endTime: new Date(item.endTime), description, winnerId, sellerId, isClosed, city};
  })};
};