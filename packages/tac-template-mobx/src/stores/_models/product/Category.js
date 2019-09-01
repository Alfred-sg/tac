import { observable, action, computed, transaction } from "mobx";
import * as ProductService from 'services/product';

export default class Category {
  @observable categories = [];

  @action
  insertToCategories = (category = {}) => {
    if ( !this.categories.some(item => item.id == category.id) ){
      this.categories.push(category);
    };
  }

  async getCategory(params){
    const res = await ProductService.getCategory(params);
    if ( res && res.code === 200 ){
      // 将多次数据变更合成一个事务，减少重绘的次数
      transaction(() => {
        res.data.map(item => {
          this.insertToCategories(item);
        });
      });
    };

    return res;
  }

  // 处理并行请求
  getCategoryByCids(cids){
    return new Promise((resolve, reject) => {
      this.categories = [];
  
      (cids || []).map(async cid => {
        const res = await this.getCategory({ cid });
        if ( !res || res.code !== 200 ) reject(res);

        // 最后一个请求，响应通过 insertToCategories 方法收集到 categories 属性中
        if ( cids.length == this.categories.length ) 
          resolve(this.categories);
      });
    });
  }

  // 传入 cids，便于并行请求
  getCategoryByLevels(cids){
    return new Promise((resolve, reject) => {
      cids.map(async (cid, index) => {
        const res = await this.getCategory({ level: index + 1 });
        if ( !res || res.code !== 200 ) reject(res);

        if ( index + 1 === cids.length ) resolve(this.categories);
      });
    })
  }

  @computed
  get categoriesTree(){
    let tree = [];
    this.categories.toJS().sort((a, b) => a.level - b.level).filter(item => {
      if ( item.level == 1 ){
        tree.push({
          value: item.id,
          label: item.name,
          isLeaf: false
        });
      } else if ( item.level == 2 ){
        let parent = tree.filter(it => it.value == item.parentId)[0];
        if ( !parent.children ) parent.children = [];
        parent.children.push({
          value: item.id,
          label: item.name
        });
      };
    });

    return tree;
  }

  // 获取商品分类文案
  @computed
  get categoryTexts(){
    return this.categories.map(item => item.name).join(', ');
  }
}
