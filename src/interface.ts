export interface DebounceFunction<T extends (...args: any[]) => Promise<any>> {
  (...args: Parameters<T>): Promise<any>
  cancel: () => void
}

export interface ThrottleFunction<T extends (...args: any[]) => Promise<any>> {
  (...args: Parameters<T>): Promise<any>
  cancel: () => void
}

