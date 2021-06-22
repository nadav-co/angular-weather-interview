import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  
  query(entityType: string) {
    var entities = JSON.parse(localStorage.getItem(entityType))
    return Promise.resolve(entities)
  }
  remove(entityType: string, key: string) {
    return this.query(entityType)
      .then(entities => {
        const idx = entities.findIndex((entity: any) => entity.key === key)
        entities.splice(idx, 1)
        this.save(entityType, entities)
      })
  }

  save(entityType: string, entities: any | any[]) {
    localStorage.setItem(entityType, JSON.stringify(entities))
  }

  async saveToArr(entityType: string, entities: any | any[]) {
    const arr = await this.query(entityType)
    if (arr?.length) {
      arr.push(entities)
      localStorage.setItem(entityType, JSON.stringify(arr))

    } else localStorage.setItem(entityType, JSON.stringify([entities]))
  }
}
