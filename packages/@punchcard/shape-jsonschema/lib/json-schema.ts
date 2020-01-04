import { ClassType } from '@punchcard/shape';
import { Shape } from '@punchcard/shape/lib/shape';
import { ObjectSchema } from './class';
import { ArraySchema, MapSchema, SetSchema } from './collection';
import { NumberSchema, StringSchema, TimestampSchema } from './primitive';
import { ToJsonSchemaVisitor } from './visitor';

export type SchemaTag = typeof SchemaTag;
export const SchemaTag = Symbol.for('@punchcard/shape-jsonschema');

export type JsonSchema =
  | MapSchema<any>
  | SetSchema<any>
  | ArraySchema<any>
  | ObjectSchema<any>
  | NumberSchema
  | TimestampSchema
  | StringSchema
  ;
export namespace JsonSchema {
  export type Of<T extends {[SchemaTag]: any}> = T[SchemaTag] extends JsonSchema ? T[SchemaTag] : never;

  export function of<T extends Shape | ClassType>(item: T): JsonSchema.Of<Shape.Of<T>> {
    return (Shape.of(item) as any).visit(new ToJsonSchemaVisitor());
  }
}

declare module '@punchcard/shape/lib/shape' {
  interface Shape {
    [SchemaTag]: JsonSchema;
  }
}
