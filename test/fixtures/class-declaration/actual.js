export class Foo<T> {
  val: T;
  constructor(val: Array<T>) { this.val = val[0] }
  show(): T {
    return this.val
  }
}

export class Bar<T> extends Foo<T> {
  shows(): [T,T] {
    return [this.val, this.val]
  }
}
