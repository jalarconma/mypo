import Dexie, { Table } from 'dexie';

import { Symbol } from '../API'

export class MypoDB extends Dexie {
  symbols!: Table<Symbol>; 

  constructor() {
    super('MypoDB');
    this.version(1).stores({
      symbols: 'id, symbol, type, displaySymbol, description, createdAt, updatedAt'
    });
  }
}

export const mypoDB = new MypoDB();