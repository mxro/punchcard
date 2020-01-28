import { ClassType, OptionalKeys, RequiredKeys } from '@punchcard/shape';
import { Shape } from '@punchcard/shape/lib/shape';

export type Tag = typeof Tag;
export const Tag = Symbol.for('@punchcard/shape-json.Json.Tag');

export type Json<T extends ClassType | Shape> =  Shape.Of<T> extends { [Tag]: infer J } ? J : never;

declare module '@punchcard/shape/lib/shape' {
  export interface Shape {
    [Tag]: unknown;
  }
}
declare module '@punchcard/shape/lib/primitive' {
  export interface DynamicShape<T extends unknown | any> {
    [Tag]: T;
  }
  export interface BinaryShape {
    [Tag]: string;
  }
  export interface BoolShape {
    [Tag]: boolean;
  }
  export interface NumberShape {
    [Tag]: number;
  }
  export interface NothingShape {
    [Tag]: null;
  }
  export interface StringShape {
    [Tag]: string;
  }
  export interface TimestampShape {
    [Tag]: string;
  }
}

declare module '@punchcard/shape/lib/collection' {
  export interface ArrayShape<T extends Shape> {
    [Tag]: Array<Json<T>>;
  }
  export interface SetShape<T extends Shape> {
    [Tag]: Array<Json<T>>
  }
  export interface MapShape<T extends Shape> {
    [Tag]: {
      [key: string]: Json<T>;
    };
  }
}

declare module '@punchcard/shape/lib/class' {
  export interface ClassShape<M extends ClassMembers, I extends any> {
    [Tag]: {
      [member in RequiredKeys<this['Members']>]: this['Members'][member]['Shape'][Tag];
    } & {
      [member in OptionalKeys<this['Members']>]+?: this['Members'][member]['Shape'][Tag];
    };
  }
}
