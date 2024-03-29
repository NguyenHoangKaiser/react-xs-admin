declare type RefType<T> = T | null;

declare type Recordable<T = any> = Record<string, T>;

declare type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
