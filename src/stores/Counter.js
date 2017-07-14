import { observable, computed } from 'mobx';

class Counter {
  @observable count = 0;

  @computed get isOdd() {
    return((this.count % 2) === 1);
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}

export default Counter;
