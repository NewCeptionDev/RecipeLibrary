import { Observable } from "rxjs"

export class TestUtil {
  static observableShouldBeCalledAndIncludeValue<T>(
    observable: Observable<T>,
    expectedValue: T,
    functionCall: Function,
    ...args: any[]
  ) {
    let triggered = false
    observable.subscribe((val) => {
      triggered = true
      expect(val).toBe(expectedValue)
    })
    functionCall.call(this, ...args)
    expect(triggered).toBeTrue()
  }

  static async promiseShouldBeFulfilledAndIncludeValue<T>(promise: Promise<T>, expectedValue: T) {
    let triggered = false
    await promise.then((result) => {
      triggered = true
      expect(result).toBe(expectedValue)
    })
    expect(triggered).toBeTrue()
  }
}
