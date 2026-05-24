
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model AIAnalysisLog
 * 
 */
export type AIAnalysisLog = $Result.DefaultSelection<Prisma.$AIAnalysisLogPayload>
/**
 * Model ComplaintAnalysis
 * 
 */
export type ComplaintAnalysis = $Result.DefaultSelection<Prisma.$ComplaintAnalysisPayload>
/**
 * Model VoiceComplaintLog
 * 
 */
export type VoiceComplaintLog = $Result.DefaultSelection<Prisma.$VoiceComplaintLogPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AIAnalysisLogs
 * const aIAnalysisLogs = await prisma.aIAnalysisLog.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more AIAnalysisLogs
   * const aIAnalysisLogs = await prisma.aIAnalysisLog.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.aIAnalysisLog`: Exposes CRUD operations for the **AIAnalysisLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIAnalysisLogs
    * const aIAnalysisLogs = await prisma.aIAnalysisLog.findMany()
    * ```
    */
  get aIAnalysisLog(): Prisma.AIAnalysisLogDelegate<ExtArgs>;

  /**
   * `prisma.complaintAnalysis`: Exposes CRUD operations for the **ComplaintAnalysis** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ComplaintAnalyses
    * const complaintAnalyses = await prisma.complaintAnalysis.findMany()
    * ```
    */
  get complaintAnalysis(): Prisma.ComplaintAnalysisDelegate<ExtArgs>;

  /**
   * `prisma.voiceComplaintLog`: Exposes CRUD operations for the **VoiceComplaintLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VoiceComplaintLogs
    * const voiceComplaintLogs = await prisma.voiceComplaintLog.findMany()
    * ```
    */
  get voiceComplaintLog(): Prisma.VoiceComplaintLogDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    AIAnalysisLog: 'AIAnalysisLog',
    ComplaintAnalysis: 'ComplaintAnalysis',
    VoiceComplaintLog: 'VoiceComplaintLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "aIAnalysisLog" | "complaintAnalysis" | "voiceComplaintLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AIAnalysisLog: {
        payload: Prisma.$AIAnalysisLogPayload<ExtArgs>
        fields: Prisma.AIAnalysisLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIAnalysisLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIAnalysisLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisLogPayload>
          }
          findFirst: {
            args: Prisma.AIAnalysisLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIAnalysisLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisLogPayload>
          }
          findMany: {
            args: Prisma.AIAnalysisLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisLogPayload>[]
          }
          create: {
            args: Prisma.AIAnalysisLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisLogPayload>
          }
          createMany: {
            args: Prisma.AIAnalysisLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIAnalysisLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisLogPayload>[]
          }
          delete: {
            args: Prisma.AIAnalysisLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisLogPayload>
          }
          update: {
            args: Prisma.AIAnalysisLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisLogPayload>
          }
          deleteMany: {
            args: Prisma.AIAnalysisLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIAnalysisLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AIAnalysisLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisLogPayload>
          }
          aggregate: {
            args: Prisma.AIAnalysisLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIAnalysisLog>
          }
          groupBy: {
            args: Prisma.AIAnalysisLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIAnalysisLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIAnalysisLogCountArgs<ExtArgs>
            result: $Utils.Optional<AIAnalysisLogCountAggregateOutputType> | number
          }
        }
      }
      ComplaintAnalysis: {
        payload: Prisma.$ComplaintAnalysisPayload<ExtArgs>
        fields: Prisma.ComplaintAnalysisFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComplaintAnalysisFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAnalysisPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComplaintAnalysisFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAnalysisPayload>
          }
          findFirst: {
            args: Prisma.ComplaintAnalysisFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAnalysisPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComplaintAnalysisFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAnalysisPayload>
          }
          findMany: {
            args: Prisma.ComplaintAnalysisFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAnalysisPayload>[]
          }
          create: {
            args: Prisma.ComplaintAnalysisCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAnalysisPayload>
          }
          createMany: {
            args: Prisma.ComplaintAnalysisCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComplaintAnalysisCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAnalysisPayload>[]
          }
          delete: {
            args: Prisma.ComplaintAnalysisDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAnalysisPayload>
          }
          update: {
            args: Prisma.ComplaintAnalysisUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAnalysisPayload>
          }
          deleteMany: {
            args: Prisma.ComplaintAnalysisDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComplaintAnalysisUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ComplaintAnalysisUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAnalysisPayload>
          }
          aggregate: {
            args: Prisma.ComplaintAnalysisAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComplaintAnalysis>
          }
          groupBy: {
            args: Prisma.ComplaintAnalysisGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComplaintAnalysisGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComplaintAnalysisCountArgs<ExtArgs>
            result: $Utils.Optional<ComplaintAnalysisCountAggregateOutputType> | number
          }
        }
      }
      VoiceComplaintLog: {
        payload: Prisma.$VoiceComplaintLogPayload<ExtArgs>
        fields: Prisma.VoiceComplaintLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VoiceComplaintLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceComplaintLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VoiceComplaintLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceComplaintLogPayload>
          }
          findFirst: {
            args: Prisma.VoiceComplaintLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceComplaintLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VoiceComplaintLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceComplaintLogPayload>
          }
          findMany: {
            args: Prisma.VoiceComplaintLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceComplaintLogPayload>[]
          }
          create: {
            args: Prisma.VoiceComplaintLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceComplaintLogPayload>
          }
          createMany: {
            args: Prisma.VoiceComplaintLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VoiceComplaintLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceComplaintLogPayload>[]
          }
          delete: {
            args: Prisma.VoiceComplaintLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceComplaintLogPayload>
          }
          update: {
            args: Prisma.VoiceComplaintLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceComplaintLogPayload>
          }
          deleteMany: {
            args: Prisma.VoiceComplaintLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VoiceComplaintLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VoiceComplaintLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoiceComplaintLogPayload>
          }
          aggregate: {
            args: Prisma.VoiceComplaintLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVoiceComplaintLog>
          }
          groupBy: {
            args: Prisma.VoiceComplaintLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<VoiceComplaintLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.VoiceComplaintLogCountArgs<ExtArgs>
            result: $Utils.Optional<VoiceComplaintLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model AIAnalysisLog
   */

  export type AggregateAIAnalysisLog = {
    _count: AIAnalysisLogCountAggregateOutputType | null
    _avg: AIAnalysisLogAvgAggregateOutputType | null
    _sum: AIAnalysisLogSumAggregateOutputType | null
    _min: AIAnalysisLogMinAggregateOutputType | null
    _max: AIAnalysisLogMaxAggregateOutputType | null
  }

  export type AIAnalysisLogAvgAggregateOutputType = {
    id: number | null
  }

  export type AIAnalysisLogSumAggregateOutputType = {
    id: number | null
  }

  export type AIAnalysisLogMinAggregateOutputType = {
    id: number | null
    model_name: string | null
    model_ver: string | null
    created_at: Date | null
  }

  export type AIAnalysisLogMaxAggregateOutputType = {
    id: number | null
    model_name: string | null
    model_ver: string | null
    created_at: Date | null
  }

  export type AIAnalysisLogCountAggregateOutputType = {
    id: number
    model_name: number
    model_ver: number
    created_at: number
    _all: number
  }


  export type AIAnalysisLogAvgAggregateInputType = {
    id?: true
  }

  export type AIAnalysisLogSumAggregateInputType = {
    id?: true
  }

  export type AIAnalysisLogMinAggregateInputType = {
    id?: true
    model_name?: true
    model_ver?: true
    created_at?: true
  }

  export type AIAnalysisLogMaxAggregateInputType = {
    id?: true
    model_name?: true
    model_ver?: true
    created_at?: true
  }

  export type AIAnalysisLogCountAggregateInputType = {
    id?: true
    model_name?: true
    model_ver?: true
    created_at?: true
    _all?: true
  }

  export type AIAnalysisLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIAnalysisLog to aggregate.
     */
    where?: AIAnalysisLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIAnalysisLogs to fetch.
     */
    orderBy?: AIAnalysisLogOrderByWithRelationInput | AIAnalysisLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIAnalysisLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIAnalysisLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIAnalysisLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIAnalysisLogs
    **/
    _count?: true | AIAnalysisLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AIAnalysisLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AIAnalysisLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIAnalysisLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIAnalysisLogMaxAggregateInputType
  }

  export type GetAIAnalysisLogAggregateType<T extends AIAnalysisLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAIAnalysisLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIAnalysisLog[P]>
      : GetScalarType<T[P], AggregateAIAnalysisLog[P]>
  }




  export type AIAnalysisLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIAnalysisLogWhereInput
    orderBy?: AIAnalysisLogOrderByWithAggregationInput | AIAnalysisLogOrderByWithAggregationInput[]
    by: AIAnalysisLogScalarFieldEnum[] | AIAnalysisLogScalarFieldEnum
    having?: AIAnalysisLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIAnalysisLogCountAggregateInputType | true
    _avg?: AIAnalysisLogAvgAggregateInputType
    _sum?: AIAnalysisLogSumAggregateInputType
    _min?: AIAnalysisLogMinAggregateInputType
    _max?: AIAnalysisLogMaxAggregateInputType
  }

  export type AIAnalysisLogGroupByOutputType = {
    id: number
    model_name: string
    model_ver: string
    created_at: Date
    _count: AIAnalysisLogCountAggregateOutputType | null
    _avg: AIAnalysisLogAvgAggregateOutputType | null
    _sum: AIAnalysisLogSumAggregateOutputType | null
    _min: AIAnalysisLogMinAggregateOutputType | null
    _max: AIAnalysisLogMaxAggregateOutputType | null
  }

  type GetAIAnalysisLogGroupByPayload<T extends AIAnalysisLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIAnalysisLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIAnalysisLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIAnalysisLogGroupByOutputType[P]>
            : GetScalarType<T[P], AIAnalysisLogGroupByOutputType[P]>
        }
      >
    >


  export type AIAnalysisLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    model_name?: boolean
    model_ver?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["aIAnalysisLog"]>

  export type AIAnalysisLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    model_name?: boolean
    model_ver?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["aIAnalysisLog"]>

  export type AIAnalysisLogSelectScalar = {
    id?: boolean
    model_name?: boolean
    model_ver?: boolean
    created_at?: boolean
  }


  export type $AIAnalysisLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIAnalysisLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      model_name: string
      model_ver: string
      created_at: Date
    }, ExtArgs["result"]["aIAnalysisLog"]>
    composites: {}
  }

  type AIAnalysisLogGetPayload<S extends boolean | null | undefined | AIAnalysisLogDefaultArgs> = $Result.GetResult<Prisma.$AIAnalysisLogPayload, S>

  type AIAnalysisLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AIAnalysisLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AIAnalysisLogCountAggregateInputType | true
    }

  export interface AIAnalysisLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIAnalysisLog'], meta: { name: 'AIAnalysisLog' } }
    /**
     * Find zero or one AIAnalysisLog that matches the filter.
     * @param {AIAnalysisLogFindUniqueArgs} args - Arguments to find a AIAnalysisLog
     * @example
     * // Get one AIAnalysisLog
     * const aIAnalysisLog = await prisma.aIAnalysisLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIAnalysisLogFindUniqueArgs>(args: SelectSubset<T, AIAnalysisLogFindUniqueArgs<ExtArgs>>): Prisma__AIAnalysisLogClient<$Result.GetResult<Prisma.$AIAnalysisLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AIAnalysisLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AIAnalysisLogFindUniqueOrThrowArgs} args - Arguments to find a AIAnalysisLog
     * @example
     * // Get one AIAnalysisLog
     * const aIAnalysisLog = await prisma.aIAnalysisLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIAnalysisLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AIAnalysisLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIAnalysisLogClient<$Result.GetResult<Prisma.$AIAnalysisLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AIAnalysisLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisLogFindFirstArgs} args - Arguments to find a AIAnalysisLog
     * @example
     * // Get one AIAnalysisLog
     * const aIAnalysisLog = await prisma.aIAnalysisLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIAnalysisLogFindFirstArgs>(args?: SelectSubset<T, AIAnalysisLogFindFirstArgs<ExtArgs>>): Prisma__AIAnalysisLogClient<$Result.GetResult<Prisma.$AIAnalysisLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AIAnalysisLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisLogFindFirstOrThrowArgs} args - Arguments to find a AIAnalysisLog
     * @example
     * // Get one AIAnalysisLog
     * const aIAnalysisLog = await prisma.aIAnalysisLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIAnalysisLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AIAnalysisLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIAnalysisLogClient<$Result.GetResult<Prisma.$AIAnalysisLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AIAnalysisLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIAnalysisLogs
     * const aIAnalysisLogs = await prisma.aIAnalysisLog.findMany()
     * 
     * // Get first 10 AIAnalysisLogs
     * const aIAnalysisLogs = await prisma.aIAnalysisLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIAnalysisLogWithIdOnly = await prisma.aIAnalysisLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIAnalysisLogFindManyArgs>(args?: SelectSubset<T, AIAnalysisLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIAnalysisLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AIAnalysisLog.
     * @param {AIAnalysisLogCreateArgs} args - Arguments to create a AIAnalysisLog.
     * @example
     * // Create one AIAnalysisLog
     * const AIAnalysisLog = await prisma.aIAnalysisLog.create({
     *   data: {
     *     // ... data to create a AIAnalysisLog
     *   }
     * })
     * 
     */
    create<T extends AIAnalysisLogCreateArgs>(args: SelectSubset<T, AIAnalysisLogCreateArgs<ExtArgs>>): Prisma__AIAnalysisLogClient<$Result.GetResult<Prisma.$AIAnalysisLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AIAnalysisLogs.
     * @param {AIAnalysisLogCreateManyArgs} args - Arguments to create many AIAnalysisLogs.
     * @example
     * // Create many AIAnalysisLogs
     * const aIAnalysisLog = await prisma.aIAnalysisLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIAnalysisLogCreateManyArgs>(args?: SelectSubset<T, AIAnalysisLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIAnalysisLogs and returns the data saved in the database.
     * @param {AIAnalysisLogCreateManyAndReturnArgs} args - Arguments to create many AIAnalysisLogs.
     * @example
     * // Create many AIAnalysisLogs
     * const aIAnalysisLog = await prisma.aIAnalysisLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIAnalysisLogs and only return the `id`
     * const aIAnalysisLogWithIdOnly = await prisma.aIAnalysisLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIAnalysisLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AIAnalysisLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIAnalysisLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AIAnalysisLog.
     * @param {AIAnalysisLogDeleteArgs} args - Arguments to delete one AIAnalysisLog.
     * @example
     * // Delete one AIAnalysisLog
     * const AIAnalysisLog = await prisma.aIAnalysisLog.delete({
     *   where: {
     *     // ... filter to delete one AIAnalysisLog
     *   }
     * })
     * 
     */
    delete<T extends AIAnalysisLogDeleteArgs>(args: SelectSubset<T, AIAnalysisLogDeleteArgs<ExtArgs>>): Prisma__AIAnalysisLogClient<$Result.GetResult<Prisma.$AIAnalysisLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AIAnalysisLog.
     * @param {AIAnalysisLogUpdateArgs} args - Arguments to update one AIAnalysisLog.
     * @example
     * // Update one AIAnalysisLog
     * const aIAnalysisLog = await prisma.aIAnalysisLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIAnalysisLogUpdateArgs>(args: SelectSubset<T, AIAnalysisLogUpdateArgs<ExtArgs>>): Prisma__AIAnalysisLogClient<$Result.GetResult<Prisma.$AIAnalysisLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AIAnalysisLogs.
     * @param {AIAnalysisLogDeleteManyArgs} args - Arguments to filter AIAnalysisLogs to delete.
     * @example
     * // Delete a few AIAnalysisLogs
     * const { count } = await prisma.aIAnalysisLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIAnalysisLogDeleteManyArgs>(args?: SelectSubset<T, AIAnalysisLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIAnalysisLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIAnalysisLogs
     * const aIAnalysisLog = await prisma.aIAnalysisLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIAnalysisLogUpdateManyArgs>(args: SelectSubset<T, AIAnalysisLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AIAnalysisLog.
     * @param {AIAnalysisLogUpsertArgs} args - Arguments to update or create a AIAnalysisLog.
     * @example
     * // Update or create a AIAnalysisLog
     * const aIAnalysisLog = await prisma.aIAnalysisLog.upsert({
     *   create: {
     *     // ... data to create a AIAnalysisLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIAnalysisLog we want to update
     *   }
     * })
     */
    upsert<T extends AIAnalysisLogUpsertArgs>(args: SelectSubset<T, AIAnalysisLogUpsertArgs<ExtArgs>>): Prisma__AIAnalysisLogClient<$Result.GetResult<Prisma.$AIAnalysisLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AIAnalysisLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisLogCountArgs} args - Arguments to filter AIAnalysisLogs to count.
     * @example
     * // Count the number of AIAnalysisLogs
     * const count = await prisma.aIAnalysisLog.count({
     *   where: {
     *     // ... the filter for the AIAnalysisLogs we want to count
     *   }
     * })
    **/
    count<T extends AIAnalysisLogCountArgs>(
      args?: Subset<T, AIAnalysisLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIAnalysisLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIAnalysisLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AIAnalysisLogAggregateArgs>(args: Subset<T, AIAnalysisLogAggregateArgs>): Prisma.PrismaPromise<GetAIAnalysisLogAggregateType<T>>

    /**
     * Group by AIAnalysisLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AIAnalysisLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIAnalysisLogGroupByArgs['orderBy'] }
        : { orderBy?: AIAnalysisLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AIAnalysisLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIAnalysisLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIAnalysisLog model
   */
  readonly fields: AIAnalysisLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIAnalysisLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIAnalysisLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AIAnalysisLog model
   */ 
  interface AIAnalysisLogFieldRefs {
    readonly id: FieldRef<"AIAnalysisLog", 'Int'>
    readonly model_name: FieldRef<"AIAnalysisLog", 'String'>
    readonly model_ver: FieldRef<"AIAnalysisLog", 'String'>
    readonly created_at: FieldRef<"AIAnalysisLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIAnalysisLog findUnique
   */
  export type AIAnalysisLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysisLog
     */
    select?: AIAnalysisLogSelect<ExtArgs> | null
    /**
     * Filter, which AIAnalysisLog to fetch.
     */
    where: AIAnalysisLogWhereUniqueInput
  }

  /**
   * AIAnalysisLog findUniqueOrThrow
   */
  export type AIAnalysisLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysisLog
     */
    select?: AIAnalysisLogSelect<ExtArgs> | null
    /**
     * Filter, which AIAnalysisLog to fetch.
     */
    where: AIAnalysisLogWhereUniqueInput
  }

  /**
   * AIAnalysisLog findFirst
   */
  export type AIAnalysisLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysisLog
     */
    select?: AIAnalysisLogSelect<ExtArgs> | null
    /**
     * Filter, which AIAnalysisLog to fetch.
     */
    where?: AIAnalysisLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIAnalysisLogs to fetch.
     */
    orderBy?: AIAnalysisLogOrderByWithRelationInput | AIAnalysisLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIAnalysisLogs.
     */
    cursor?: AIAnalysisLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIAnalysisLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIAnalysisLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIAnalysisLogs.
     */
    distinct?: AIAnalysisLogScalarFieldEnum | AIAnalysisLogScalarFieldEnum[]
  }

  /**
   * AIAnalysisLog findFirstOrThrow
   */
  export type AIAnalysisLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysisLog
     */
    select?: AIAnalysisLogSelect<ExtArgs> | null
    /**
     * Filter, which AIAnalysisLog to fetch.
     */
    where?: AIAnalysisLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIAnalysisLogs to fetch.
     */
    orderBy?: AIAnalysisLogOrderByWithRelationInput | AIAnalysisLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIAnalysisLogs.
     */
    cursor?: AIAnalysisLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIAnalysisLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIAnalysisLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIAnalysisLogs.
     */
    distinct?: AIAnalysisLogScalarFieldEnum | AIAnalysisLogScalarFieldEnum[]
  }

  /**
   * AIAnalysisLog findMany
   */
  export type AIAnalysisLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysisLog
     */
    select?: AIAnalysisLogSelect<ExtArgs> | null
    /**
     * Filter, which AIAnalysisLogs to fetch.
     */
    where?: AIAnalysisLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIAnalysisLogs to fetch.
     */
    orderBy?: AIAnalysisLogOrderByWithRelationInput | AIAnalysisLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIAnalysisLogs.
     */
    cursor?: AIAnalysisLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIAnalysisLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIAnalysisLogs.
     */
    skip?: number
    distinct?: AIAnalysisLogScalarFieldEnum | AIAnalysisLogScalarFieldEnum[]
  }

  /**
   * AIAnalysisLog create
   */
  export type AIAnalysisLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysisLog
     */
    select?: AIAnalysisLogSelect<ExtArgs> | null
    /**
     * The data needed to create a AIAnalysisLog.
     */
    data: XOR<AIAnalysisLogCreateInput, AIAnalysisLogUncheckedCreateInput>
  }

  /**
   * AIAnalysisLog createMany
   */
  export type AIAnalysisLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIAnalysisLogs.
     */
    data: AIAnalysisLogCreateManyInput | AIAnalysisLogCreateManyInput[]
  }

  /**
   * AIAnalysisLog createManyAndReturn
   */
  export type AIAnalysisLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysisLog
     */
    select?: AIAnalysisLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AIAnalysisLogs.
     */
    data: AIAnalysisLogCreateManyInput | AIAnalysisLogCreateManyInput[]
  }

  /**
   * AIAnalysisLog update
   */
  export type AIAnalysisLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysisLog
     */
    select?: AIAnalysisLogSelect<ExtArgs> | null
    /**
     * The data needed to update a AIAnalysisLog.
     */
    data: XOR<AIAnalysisLogUpdateInput, AIAnalysisLogUncheckedUpdateInput>
    /**
     * Choose, which AIAnalysisLog to update.
     */
    where: AIAnalysisLogWhereUniqueInput
  }

  /**
   * AIAnalysisLog updateMany
   */
  export type AIAnalysisLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIAnalysisLogs.
     */
    data: XOR<AIAnalysisLogUpdateManyMutationInput, AIAnalysisLogUncheckedUpdateManyInput>
    /**
     * Filter which AIAnalysisLogs to update
     */
    where?: AIAnalysisLogWhereInput
  }

  /**
   * AIAnalysisLog upsert
   */
  export type AIAnalysisLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysisLog
     */
    select?: AIAnalysisLogSelect<ExtArgs> | null
    /**
     * The filter to search for the AIAnalysisLog to update in case it exists.
     */
    where: AIAnalysisLogWhereUniqueInput
    /**
     * In case the AIAnalysisLog found by the `where` argument doesn't exist, create a new AIAnalysisLog with this data.
     */
    create: XOR<AIAnalysisLogCreateInput, AIAnalysisLogUncheckedCreateInput>
    /**
     * In case the AIAnalysisLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIAnalysisLogUpdateInput, AIAnalysisLogUncheckedUpdateInput>
  }

  /**
   * AIAnalysisLog delete
   */
  export type AIAnalysisLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysisLog
     */
    select?: AIAnalysisLogSelect<ExtArgs> | null
    /**
     * Filter which AIAnalysisLog to delete.
     */
    where: AIAnalysisLogWhereUniqueInput
  }

  /**
   * AIAnalysisLog deleteMany
   */
  export type AIAnalysisLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIAnalysisLogs to delete
     */
    where?: AIAnalysisLogWhereInput
  }

  /**
   * AIAnalysisLog without action
   */
  export type AIAnalysisLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysisLog
     */
    select?: AIAnalysisLogSelect<ExtArgs> | null
  }


  /**
   * Model ComplaintAnalysis
   */

  export type AggregateComplaintAnalysis = {
    _count: ComplaintAnalysisCountAggregateOutputType | null
    _avg: ComplaintAnalysisAvgAggregateOutputType | null
    _sum: ComplaintAnalysisSumAggregateOutputType | null
    _min: ComplaintAnalysisMinAggregateOutputType | null
    _max: ComplaintAnalysisMaxAggregateOutputType | null
  }

  export type ComplaintAnalysisAvgAggregateOutputType = {
    id: number | null
    complaint_id: number | null
    severity_score: number | null
    confidence_score: number | null
  }

  export type ComplaintAnalysisSumAggregateOutputType = {
    id: number | null
    complaint_id: number | null
    severity_score: number | null
    confidence_score: number | null
  }

  export type ComplaintAnalysisMinAggregateOutputType = {
    id: number | null
    complaint_id: number | null
    severity_score: number | null
    urgency_level: string | null
    predicted_category: string | null
    confidence_score: number | null
    extracted_entities: string | null
    explanation: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ComplaintAnalysisMaxAggregateOutputType = {
    id: number | null
    complaint_id: number | null
    severity_score: number | null
    urgency_level: string | null
    predicted_category: string | null
    confidence_score: number | null
    extracted_entities: string | null
    explanation: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ComplaintAnalysisCountAggregateOutputType = {
    id: number
    complaint_id: number
    severity_score: number
    urgency_level: number
    predicted_category: number
    confidence_score: number
    extracted_entities: number
    explanation: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ComplaintAnalysisAvgAggregateInputType = {
    id?: true
    complaint_id?: true
    severity_score?: true
    confidence_score?: true
  }

  export type ComplaintAnalysisSumAggregateInputType = {
    id?: true
    complaint_id?: true
    severity_score?: true
    confidence_score?: true
  }

  export type ComplaintAnalysisMinAggregateInputType = {
    id?: true
    complaint_id?: true
    severity_score?: true
    urgency_level?: true
    predicted_category?: true
    confidence_score?: true
    extracted_entities?: true
    explanation?: true
    created_at?: true
    updated_at?: true
  }

  export type ComplaintAnalysisMaxAggregateInputType = {
    id?: true
    complaint_id?: true
    severity_score?: true
    urgency_level?: true
    predicted_category?: true
    confidence_score?: true
    extracted_entities?: true
    explanation?: true
    created_at?: true
    updated_at?: true
  }

  export type ComplaintAnalysisCountAggregateInputType = {
    id?: true
    complaint_id?: true
    severity_score?: true
    urgency_level?: true
    predicted_category?: true
    confidence_score?: true
    extracted_entities?: true
    explanation?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ComplaintAnalysisAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplaintAnalysis to aggregate.
     */
    where?: ComplaintAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintAnalyses to fetch.
     */
    orderBy?: ComplaintAnalysisOrderByWithRelationInput | ComplaintAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComplaintAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ComplaintAnalyses
    **/
    _count?: true | ComplaintAnalysisCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ComplaintAnalysisAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ComplaintAnalysisSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComplaintAnalysisMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComplaintAnalysisMaxAggregateInputType
  }

  export type GetComplaintAnalysisAggregateType<T extends ComplaintAnalysisAggregateArgs> = {
        [P in keyof T & keyof AggregateComplaintAnalysis]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComplaintAnalysis[P]>
      : GetScalarType<T[P], AggregateComplaintAnalysis[P]>
  }




  export type ComplaintAnalysisGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplaintAnalysisWhereInput
    orderBy?: ComplaintAnalysisOrderByWithAggregationInput | ComplaintAnalysisOrderByWithAggregationInput[]
    by: ComplaintAnalysisScalarFieldEnum[] | ComplaintAnalysisScalarFieldEnum
    having?: ComplaintAnalysisScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComplaintAnalysisCountAggregateInputType | true
    _avg?: ComplaintAnalysisAvgAggregateInputType
    _sum?: ComplaintAnalysisSumAggregateInputType
    _min?: ComplaintAnalysisMinAggregateInputType
    _max?: ComplaintAnalysisMaxAggregateInputType
  }

  export type ComplaintAnalysisGroupByOutputType = {
    id: number
    complaint_id: number
    severity_score: number
    urgency_level: string
    predicted_category: string
    confidence_score: number
    extracted_entities: string
    explanation: string | null
    created_at: Date
    updated_at: Date
    _count: ComplaintAnalysisCountAggregateOutputType | null
    _avg: ComplaintAnalysisAvgAggregateOutputType | null
    _sum: ComplaintAnalysisSumAggregateOutputType | null
    _min: ComplaintAnalysisMinAggregateOutputType | null
    _max: ComplaintAnalysisMaxAggregateOutputType | null
  }

  type GetComplaintAnalysisGroupByPayload<T extends ComplaintAnalysisGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComplaintAnalysisGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComplaintAnalysisGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComplaintAnalysisGroupByOutputType[P]>
            : GetScalarType<T[P], ComplaintAnalysisGroupByOutputType[P]>
        }
      >
    >


  export type ComplaintAnalysisSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    complaint_id?: boolean
    severity_score?: boolean
    urgency_level?: boolean
    predicted_category?: boolean
    confidence_score?: boolean
    extracted_entities?: boolean
    explanation?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["complaintAnalysis"]>

  export type ComplaintAnalysisSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    complaint_id?: boolean
    severity_score?: boolean
    urgency_level?: boolean
    predicted_category?: boolean
    confidence_score?: boolean
    extracted_entities?: boolean
    explanation?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["complaintAnalysis"]>

  export type ComplaintAnalysisSelectScalar = {
    id?: boolean
    complaint_id?: boolean
    severity_score?: boolean
    urgency_level?: boolean
    predicted_category?: boolean
    confidence_score?: boolean
    extracted_entities?: boolean
    explanation?: boolean
    created_at?: boolean
    updated_at?: boolean
  }


  export type $ComplaintAnalysisPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ComplaintAnalysis"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      complaint_id: number
      severity_score: number
      urgency_level: string
      predicted_category: string
      confidence_score: number
      extracted_entities: string
      explanation: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["complaintAnalysis"]>
    composites: {}
  }

  type ComplaintAnalysisGetPayload<S extends boolean | null | undefined | ComplaintAnalysisDefaultArgs> = $Result.GetResult<Prisma.$ComplaintAnalysisPayload, S>

  type ComplaintAnalysisCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ComplaintAnalysisFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ComplaintAnalysisCountAggregateInputType | true
    }

  export interface ComplaintAnalysisDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ComplaintAnalysis'], meta: { name: 'ComplaintAnalysis' } }
    /**
     * Find zero or one ComplaintAnalysis that matches the filter.
     * @param {ComplaintAnalysisFindUniqueArgs} args - Arguments to find a ComplaintAnalysis
     * @example
     * // Get one ComplaintAnalysis
     * const complaintAnalysis = await prisma.complaintAnalysis.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComplaintAnalysisFindUniqueArgs>(args: SelectSubset<T, ComplaintAnalysisFindUniqueArgs<ExtArgs>>): Prisma__ComplaintAnalysisClient<$Result.GetResult<Prisma.$ComplaintAnalysisPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ComplaintAnalysis that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ComplaintAnalysisFindUniqueOrThrowArgs} args - Arguments to find a ComplaintAnalysis
     * @example
     * // Get one ComplaintAnalysis
     * const complaintAnalysis = await prisma.complaintAnalysis.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComplaintAnalysisFindUniqueOrThrowArgs>(args: SelectSubset<T, ComplaintAnalysisFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComplaintAnalysisClient<$Result.GetResult<Prisma.$ComplaintAnalysisPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ComplaintAnalysis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintAnalysisFindFirstArgs} args - Arguments to find a ComplaintAnalysis
     * @example
     * // Get one ComplaintAnalysis
     * const complaintAnalysis = await prisma.complaintAnalysis.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComplaintAnalysisFindFirstArgs>(args?: SelectSubset<T, ComplaintAnalysisFindFirstArgs<ExtArgs>>): Prisma__ComplaintAnalysisClient<$Result.GetResult<Prisma.$ComplaintAnalysisPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ComplaintAnalysis that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintAnalysisFindFirstOrThrowArgs} args - Arguments to find a ComplaintAnalysis
     * @example
     * // Get one ComplaintAnalysis
     * const complaintAnalysis = await prisma.complaintAnalysis.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComplaintAnalysisFindFirstOrThrowArgs>(args?: SelectSubset<T, ComplaintAnalysisFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComplaintAnalysisClient<$Result.GetResult<Prisma.$ComplaintAnalysisPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ComplaintAnalyses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintAnalysisFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ComplaintAnalyses
     * const complaintAnalyses = await prisma.complaintAnalysis.findMany()
     * 
     * // Get first 10 ComplaintAnalyses
     * const complaintAnalyses = await prisma.complaintAnalysis.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const complaintAnalysisWithIdOnly = await prisma.complaintAnalysis.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComplaintAnalysisFindManyArgs>(args?: SelectSubset<T, ComplaintAnalysisFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintAnalysisPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ComplaintAnalysis.
     * @param {ComplaintAnalysisCreateArgs} args - Arguments to create a ComplaintAnalysis.
     * @example
     * // Create one ComplaintAnalysis
     * const ComplaintAnalysis = await prisma.complaintAnalysis.create({
     *   data: {
     *     // ... data to create a ComplaintAnalysis
     *   }
     * })
     * 
     */
    create<T extends ComplaintAnalysisCreateArgs>(args: SelectSubset<T, ComplaintAnalysisCreateArgs<ExtArgs>>): Prisma__ComplaintAnalysisClient<$Result.GetResult<Prisma.$ComplaintAnalysisPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ComplaintAnalyses.
     * @param {ComplaintAnalysisCreateManyArgs} args - Arguments to create many ComplaintAnalyses.
     * @example
     * // Create many ComplaintAnalyses
     * const complaintAnalysis = await prisma.complaintAnalysis.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComplaintAnalysisCreateManyArgs>(args?: SelectSubset<T, ComplaintAnalysisCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ComplaintAnalyses and returns the data saved in the database.
     * @param {ComplaintAnalysisCreateManyAndReturnArgs} args - Arguments to create many ComplaintAnalyses.
     * @example
     * // Create many ComplaintAnalyses
     * const complaintAnalysis = await prisma.complaintAnalysis.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ComplaintAnalyses and only return the `id`
     * const complaintAnalysisWithIdOnly = await prisma.complaintAnalysis.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComplaintAnalysisCreateManyAndReturnArgs>(args?: SelectSubset<T, ComplaintAnalysisCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintAnalysisPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ComplaintAnalysis.
     * @param {ComplaintAnalysisDeleteArgs} args - Arguments to delete one ComplaintAnalysis.
     * @example
     * // Delete one ComplaintAnalysis
     * const ComplaintAnalysis = await prisma.complaintAnalysis.delete({
     *   where: {
     *     // ... filter to delete one ComplaintAnalysis
     *   }
     * })
     * 
     */
    delete<T extends ComplaintAnalysisDeleteArgs>(args: SelectSubset<T, ComplaintAnalysisDeleteArgs<ExtArgs>>): Prisma__ComplaintAnalysisClient<$Result.GetResult<Prisma.$ComplaintAnalysisPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ComplaintAnalysis.
     * @param {ComplaintAnalysisUpdateArgs} args - Arguments to update one ComplaintAnalysis.
     * @example
     * // Update one ComplaintAnalysis
     * const complaintAnalysis = await prisma.complaintAnalysis.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComplaintAnalysisUpdateArgs>(args: SelectSubset<T, ComplaintAnalysisUpdateArgs<ExtArgs>>): Prisma__ComplaintAnalysisClient<$Result.GetResult<Prisma.$ComplaintAnalysisPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ComplaintAnalyses.
     * @param {ComplaintAnalysisDeleteManyArgs} args - Arguments to filter ComplaintAnalyses to delete.
     * @example
     * // Delete a few ComplaintAnalyses
     * const { count } = await prisma.complaintAnalysis.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComplaintAnalysisDeleteManyArgs>(args?: SelectSubset<T, ComplaintAnalysisDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComplaintAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintAnalysisUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ComplaintAnalyses
     * const complaintAnalysis = await prisma.complaintAnalysis.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComplaintAnalysisUpdateManyArgs>(args: SelectSubset<T, ComplaintAnalysisUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ComplaintAnalysis.
     * @param {ComplaintAnalysisUpsertArgs} args - Arguments to update or create a ComplaintAnalysis.
     * @example
     * // Update or create a ComplaintAnalysis
     * const complaintAnalysis = await prisma.complaintAnalysis.upsert({
     *   create: {
     *     // ... data to create a ComplaintAnalysis
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ComplaintAnalysis we want to update
     *   }
     * })
     */
    upsert<T extends ComplaintAnalysisUpsertArgs>(args: SelectSubset<T, ComplaintAnalysisUpsertArgs<ExtArgs>>): Prisma__ComplaintAnalysisClient<$Result.GetResult<Prisma.$ComplaintAnalysisPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ComplaintAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintAnalysisCountArgs} args - Arguments to filter ComplaintAnalyses to count.
     * @example
     * // Count the number of ComplaintAnalyses
     * const count = await prisma.complaintAnalysis.count({
     *   where: {
     *     // ... the filter for the ComplaintAnalyses we want to count
     *   }
     * })
    **/
    count<T extends ComplaintAnalysisCountArgs>(
      args?: Subset<T, ComplaintAnalysisCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComplaintAnalysisCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ComplaintAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintAnalysisAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ComplaintAnalysisAggregateArgs>(args: Subset<T, ComplaintAnalysisAggregateArgs>): Prisma.PrismaPromise<GetComplaintAnalysisAggregateType<T>>

    /**
     * Group by ComplaintAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintAnalysisGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ComplaintAnalysisGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComplaintAnalysisGroupByArgs['orderBy'] }
        : { orderBy?: ComplaintAnalysisGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ComplaintAnalysisGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComplaintAnalysisGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ComplaintAnalysis model
   */
  readonly fields: ComplaintAnalysisFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ComplaintAnalysis.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComplaintAnalysisClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ComplaintAnalysis model
   */ 
  interface ComplaintAnalysisFieldRefs {
    readonly id: FieldRef<"ComplaintAnalysis", 'Int'>
    readonly complaint_id: FieldRef<"ComplaintAnalysis", 'Int'>
    readonly severity_score: FieldRef<"ComplaintAnalysis", 'Int'>
    readonly urgency_level: FieldRef<"ComplaintAnalysis", 'String'>
    readonly predicted_category: FieldRef<"ComplaintAnalysis", 'String'>
    readonly confidence_score: FieldRef<"ComplaintAnalysis", 'Float'>
    readonly extracted_entities: FieldRef<"ComplaintAnalysis", 'String'>
    readonly explanation: FieldRef<"ComplaintAnalysis", 'String'>
    readonly created_at: FieldRef<"ComplaintAnalysis", 'DateTime'>
    readonly updated_at: FieldRef<"ComplaintAnalysis", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ComplaintAnalysis findUnique
   */
  export type ComplaintAnalysisFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAnalysis
     */
    select?: ComplaintAnalysisSelect<ExtArgs> | null
    /**
     * Filter, which ComplaintAnalysis to fetch.
     */
    where: ComplaintAnalysisWhereUniqueInput
  }

  /**
   * ComplaintAnalysis findUniqueOrThrow
   */
  export type ComplaintAnalysisFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAnalysis
     */
    select?: ComplaintAnalysisSelect<ExtArgs> | null
    /**
     * Filter, which ComplaintAnalysis to fetch.
     */
    where: ComplaintAnalysisWhereUniqueInput
  }

  /**
   * ComplaintAnalysis findFirst
   */
  export type ComplaintAnalysisFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAnalysis
     */
    select?: ComplaintAnalysisSelect<ExtArgs> | null
    /**
     * Filter, which ComplaintAnalysis to fetch.
     */
    where?: ComplaintAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintAnalyses to fetch.
     */
    orderBy?: ComplaintAnalysisOrderByWithRelationInput | ComplaintAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplaintAnalyses.
     */
    cursor?: ComplaintAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplaintAnalyses.
     */
    distinct?: ComplaintAnalysisScalarFieldEnum | ComplaintAnalysisScalarFieldEnum[]
  }

  /**
   * ComplaintAnalysis findFirstOrThrow
   */
  export type ComplaintAnalysisFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAnalysis
     */
    select?: ComplaintAnalysisSelect<ExtArgs> | null
    /**
     * Filter, which ComplaintAnalysis to fetch.
     */
    where?: ComplaintAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintAnalyses to fetch.
     */
    orderBy?: ComplaintAnalysisOrderByWithRelationInput | ComplaintAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplaintAnalyses.
     */
    cursor?: ComplaintAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplaintAnalyses.
     */
    distinct?: ComplaintAnalysisScalarFieldEnum | ComplaintAnalysisScalarFieldEnum[]
  }

  /**
   * ComplaintAnalysis findMany
   */
  export type ComplaintAnalysisFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAnalysis
     */
    select?: ComplaintAnalysisSelect<ExtArgs> | null
    /**
     * Filter, which ComplaintAnalyses to fetch.
     */
    where?: ComplaintAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintAnalyses to fetch.
     */
    orderBy?: ComplaintAnalysisOrderByWithRelationInput | ComplaintAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ComplaintAnalyses.
     */
    cursor?: ComplaintAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintAnalyses.
     */
    skip?: number
    distinct?: ComplaintAnalysisScalarFieldEnum | ComplaintAnalysisScalarFieldEnum[]
  }

  /**
   * ComplaintAnalysis create
   */
  export type ComplaintAnalysisCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAnalysis
     */
    select?: ComplaintAnalysisSelect<ExtArgs> | null
    /**
     * The data needed to create a ComplaintAnalysis.
     */
    data: XOR<ComplaintAnalysisCreateInput, ComplaintAnalysisUncheckedCreateInput>
  }

  /**
   * ComplaintAnalysis createMany
   */
  export type ComplaintAnalysisCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ComplaintAnalyses.
     */
    data: ComplaintAnalysisCreateManyInput | ComplaintAnalysisCreateManyInput[]
  }

  /**
   * ComplaintAnalysis createManyAndReturn
   */
  export type ComplaintAnalysisCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAnalysis
     */
    select?: ComplaintAnalysisSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ComplaintAnalyses.
     */
    data: ComplaintAnalysisCreateManyInput | ComplaintAnalysisCreateManyInput[]
  }

  /**
   * ComplaintAnalysis update
   */
  export type ComplaintAnalysisUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAnalysis
     */
    select?: ComplaintAnalysisSelect<ExtArgs> | null
    /**
     * The data needed to update a ComplaintAnalysis.
     */
    data: XOR<ComplaintAnalysisUpdateInput, ComplaintAnalysisUncheckedUpdateInput>
    /**
     * Choose, which ComplaintAnalysis to update.
     */
    where: ComplaintAnalysisWhereUniqueInput
  }

  /**
   * ComplaintAnalysis updateMany
   */
  export type ComplaintAnalysisUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ComplaintAnalyses.
     */
    data: XOR<ComplaintAnalysisUpdateManyMutationInput, ComplaintAnalysisUncheckedUpdateManyInput>
    /**
     * Filter which ComplaintAnalyses to update
     */
    where?: ComplaintAnalysisWhereInput
  }

  /**
   * ComplaintAnalysis upsert
   */
  export type ComplaintAnalysisUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAnalysis
     */
    select?: ComplaintAnalysisSelect<ExtArgs> | null
    /**
     * The filter to search for the ComplaintAnalysis to update in case it exists.
     */
    where: ComplaintAnalysisWhereUniqueInput
    /**
     * In case the ComplaintAnalysis found by the `where` argument doesn't exist, create a new ComplaintAnalysis with this data.
     */
    create: XOR<ComplaintAnalysisCreateInput, ComplaintAnalysisUncheckedCreateInput>
    /**
     * In case the ComplaintAnalysis was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComplaintAnalysisUpdateInput, ComplaintAnalysisUncheckedUpdateInput>
  }

  /**
   * ComplaintAnalysis delete
   */
  export type ComplaintAnalysisDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAnalysis
     */
    select?: ComplaintAnalysisSelect<ExtArgs> | null
    /**
     * Filter which ComplaintAnalysis to delete.
     */
    where: ComplaintAnalysisWhereUniqueInput
  }

  /**
   * ComplaintAnalysis deleteMany
   */
  export type ComplaintAnalysisDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplaintAnalyses to delete
     */
    where?: ComplaintAnalysisWhereInput
  }

  /**
   * ComplaintAnalysis without action
   */
  export type ComplaintAnalysisDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAnalysis
     */
    select?: ComplaintAnalysisSelect<ExtArgs> | null
  }


  /**
   * Model VoiceComplaintLog
   */

  export type AggregateVoiceComplaintLog = {
    _count: VoiceComplaintLogCountAggregateOutputType | null
    _avg: VoiceComplaintLogAvgAggregateOutputType | null
    _sum: VoiceComplaintLogSumAggregateOutputType | null
    _min: VoiceComplaintLogMinAggregateOutputType | null
    _max: VoiceComplaintLogMaxAggregateOutputType | null
  }

  export type VoiceComplaintLogAvgAggregateOutputType = {
    id: number | null
    confidence: number | null
    final_complaint_id: number | null
  }

  export type VoiceComplaintLogSumAggregateOutputType = {
    id: number | null
    confidence: number | null
    final_complaint_id: number | null
  }

  export type VoiceComplaintLogMinAggregateOutputType = {
    id: number | null
    audio_path: string | null
    transcript: string | null
    extracted_json: string | null
    confidence: number | null
    created_at: Date | null
    final_complaint_id: number | null
  }

  export type VoiceComplaintLogMaxAggregateOutputType = {
    id: number | null
    audio_path: string | null
    transcript: string | null
    extracted_json: string | null
    confidence: number | null
    created_at: Date | null
    final_complaint_id: number | null
  }

  export type VoiceComplaintLogCountAggregateOutputType = {
    id: number
    audio_path: number
    transcript: number
    extracted_json: number
    confidence: number
    created_at: number
    final_complaint_id: number
    _all: number
  }


  export type VoiceComplaintLogAvgAggregateInputType = {
    id?: true
    confidence?: true
    final_complaint_id?: true
  }

  export type VoiceComplaintLogSumAggregateInputType = {
    id?: true
    confidence?: true
    final_complaint_id?: true
  }

  export type VoiceComplaintLogMinAggregateInputType = {
    id?: true
    audio_path?: true
    transcript?: true
    extracted_json?: true
    confidence?: true
    created_at?: true
    final_complaint_id?: true
  }

  export type VoiceComplaintLogMaxAggregateInputType = {
    id?: true
    audio_path?: true
    transcript?: true
    extracted_json?: true
    confidence?: true
    created_at?: true
    final_complaint_id?: true
  }

  export type VoiceComplaintLogCountAggregateInputType = {
    id?: true
    audio_path?: true
    transcript?: true
    extracted_json?: true
    confidence?: true
    created_at?: true
    final_complaint_id?: true
    _all?: true
  }

  export type VoiceComplaintLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VoiceComplaintLog to aggregate.
     */
    where?: VoiceComplaintLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VoiceComplaintLogs to fetch.
     */
    orderBy?: VoiceComplaintLogOrderByWithRelationInput | VoiceComplaintLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VoiceComplaintLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VoiceComplaintLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VoiceComplaintLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VoiceComplaintLogs
    **/
    _count?: true | VoiceComplaintLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VoiceComplaintLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VoiceComplaintLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VoiceComplaintLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VoiceComplaintLogMaxAggregateInputType
  }

  export type GetVoiceComplaintLogAggregateType<T extends VoiceComplaintLogAggregateArgs> = {
        [P in keyof T & keyof AggregateVoiceComplaintLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVoiceComplaintLog[P]>
      : GetScalarType<T[P], AggregateVoiceComplaintLog[P]>
  }




  export type VoiceComplaintLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoiceComplaintLogWhereInput
    orderBy?: VoiceComplaintLogOrderByWithAggregationInput | VoiceComplaintLogOrderByWithAggregationInput[]
    by: VoiceComplaintLogScalarFieldEnum[] | VoiceComplaintLogScalarFieldEnum
    having?: VoiceComplaintLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VoiceComplaintLogCountAggregateInputType | true
    _avg?: VoiceComplaintLogAvgAggregateInputType
    _sum?: VoiceComplaintLogSumAggregateInputType
    _min?: VoiceComplaintLogMinAggregateInputType
    _max?: VoiceComplaintLogMaxAggregateInputType
  }

  export type VoiceComplaintLogGroupByOutputType = {
    id: number
    audio_path: string
    transcript: string
    extracted_json: string
    confidence: number | null
    created_at: Date
    final_complaint_id: number | null
    _count: VoiceComplaintLogCountAggregateOutputType | null
    _avg: VoiceComplaintLogAvgAggregateOutputType | null
    _sum: VoiceComplaintLogSumAggregateOutputType | null
    _min: VoiceComplaintLogMinAggregateOutputType | null
    _max: VoiceComplaintLogMaxAggregateOutputType | null
  }

  type GetVoiceComplaintLogGroupByPayload<T extends VoiceComplaintLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VoiceComplaintLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VoiceComplaintLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VoiceComplaintLogGroupByOutputType[P]>
            : GetScalarType<T[P], VoiceComplaintLogGroupByOutputType[P]>
        }
      >
    >


  export type VoiceComplaintLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    audio_path?: boolean
    transcript?: boolean
    extracted_json?: boolean
    confidence?: boolean
    created_at?: boolean
    final_complaint_id?: boolean
  }, ExtArgs["result"]["voiceComplaintLog"]>

  export type VoiceComplaintLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    audio_path?: boolean
    transcript?: boolean
    extracted_json?: boolean
    confidence?: boolean
    created_at?: boolean
    final_complaint_id?: boolean
  }, ExtArgs["result"]["voiceComplaintLog"]>

  export type VoiceComplaintLogSelectScalar = {
    id?: boolean
    audio_path?: boolean
    transcript?: boolean
    extracted_json?: boolean
    confidence?: boolean
    created_at?: boolean
    final_complaint_id?: boolean
  }


  export type $VoiceComplaintLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VoiceComplaintLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      audio_path: string
      transcript: string
      extracted_json: string
      confidence: number | null
      created_at: Date
      final_complaint_id: number | null
    }, ExtArgs["result"]["voiceComplaintLog"]>
    composites: {}
  }

  type VoiceComplaintLogGetPayload<S extends boolean | null | undefined | VoiceComplaintLogDefaultArgs> = $Result.GetResult<Prisma.$VoiceComplaintLogPayload, S>

  type VoiceComplaintLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VoiceComplaintLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VoiceComplaintLogCountAggregateInputType | true
    }

  export interface VoiceComplaintLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VoiceComplaintLog'], meta: { name: 'VoiceComplaintLog' } }
    /**
     * Find zero or one VoiceComplaintLog that matches the filter.
     * @param {VoiceComplaintLogFindUniqueArgs} args - Arguments to find a VoiceComplaintLog
     * @example
     * // Get one VoiceComplaintLog
     * const voiceComplaintLog = await prisma.voiceComplaintLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VoiceComplaintLogFindUniqueArgs>(args: SelectSubset<T, VoiceComplaintLogFindUniqueArgs<ExtArgs>>): Prisma__VoiceComplaintLogClient<$Result.GetResult<Prisma.$VoiceComplaintLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one VoiceComplaintLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VoiceComplaintLogFindUniqueOrThrowArgs} args - Arguments to find a VoiceComplaintLog
     * @example
     * // Get one VoiceComplaintLog
     * const voiceComplaintLog = await prisma.voiceComplaintLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VoiceComplaintLogFindUniqueOrThrowArgs>(args: SelectSubset<T, VoiceComplaintLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VoiceComplaintLogClient<$Result.GetResult<Prisma.$VoiceComplaintLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first VoiceComplaintLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoiceComplaintLogFindFirstArgs} args - Arguments to find a VoiceComplaintLog
     * @example
     * // Get one VoiceComplaintLog
     * const voiceComplaintLog = await prisma.voiceComplaintLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VoiceComplaintLogFindFirstArgs>(args?: SelectSubset<T, VoiceComplaintLogFindFirstArgs<ExtArgs>>): Prisma__VoiceComplaintLogClient<$Result.GetResult<Prisma.$VoiceComplaintLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first VoiceComplaintLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoiceComplaintLogFindFirstOrThrowArgs} args - Arguments to find a VoiceComplaintLog
     * @example
     * // Get one VoiceComplaintLog
     * const voiceComplaintLog = await prisma.voiceComplaintLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VoiceComplaintLogFindFirstOrThrowArgs>(args?: SelectSubset<T, VoiceComplaintLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__VoiceComplaintLogClient<$Result.GetResult<Prisma.$VoiceComplaintLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more VoiceComplaintLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoiceComplaintLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VoiceComplaintLogs
     * const voiceComplaintLogs = await prisma.voiceComplaintLog.findMany()
     * 
     * // Get first 10 VoiceComplaintLogs
     * const voiceComplaintLogs = await prisma.voiceComplaintLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const voiceComplaintLogWithIdOnly = await prisma.voiceComplaintLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VoiceComplaintLogFindManyArgs>(args?: SelectSubset<T, VoiceComplaintLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoiceComplaintLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a VoiceComplaintLog.
     * @param {VoiceComplaintLogCreateArgs} args - Arguments to create a VoiceComplaintLog.
     * @example
     * // Create one VoiceComplaintLog
     * const VoiceComplaintLog = await prisma.voiceComplaintLog.create({
     *   data: {
     *     // ... data to create a VoiceComplaintLog
     *   }
     * })
     * 
     */
    create<T extends VoiceComplaintLogCreateArgs>(args: SelectSubset<T, VoiceComplaintLogCreateArgs<ExtArgs>>): Prisma__VoiceComplaintLogClient<$Result.GetResult<Prisma.$VoiceComplaintLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many VoiceComplaintLogs.
     * @param {VoiceComplaintLogCreateManyArgs} args - Arguments to create many VoiceComplaintLogs.
     * @example
     * // Create many VoiceComplaintLogs
     * const voiceComplaintLog = await prisma.voiceComplaintLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VoiceComplaintLogCreateManyArgs>(args?: SelectSubset<T, VoiceComplaintLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VoiceComplaintLogs and returns the data saved in the database.
     * @param {VoiceComplaintLogCreateManyAndReturnArgs} args - Arguments to create many VoiceComplaintLogs.
     * @example
     * // Create many VoiceComplaintLogs
     * const voiceComplaintLog = await prisma.voiceComplaintLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VoiceComplaintLogs and only return the `id`
     * const voiceComplaintLogWithIdOnly = await prisma.voiceComplaintLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VoiceComplaintLogCreateManyAndReturnArgs>(args?: SelectSubset<T, VoiceComplaintLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoiceComplaintLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a VoiceComplaintLog.
     * @param {VoiceComplaintLogDeleteArgs} args - Arguments to delete one VoiceComplaintLog.
     * @example
     * // Delete one VoiceComplaintLog
     * const VoiceComplaintLog = await prisma.voiceComplaintLog.delete({
     *   where: {
     *     // ... filter to delete one VoiceComplaintLog
     *   }
     * })
     * 
     */
    delete<T extends VoiceComplaintLogDeleteArgs>(args: SelectSubset<T, VoiceComplaintLogDeleteArgs<ExtArgs>>): Prisma__VoiceComplaintLogClient<$Result.GetResult<Prisma.$VoiceComplaintLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one VoiceComplaintLog.
     * @param {VoiceComplaintLogUpdateArgs} args - Arguments to update one VoiceComplaintLog.
     * @example
     * // Update one VoiceComplaintLog
     * const voiceComplaintLog = await prisma.voiceComplaintLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VoiceComplaintLogUpdateArgs>(args: SelectSubset<T, VoiceComplaintLogUpdateArgs<ExtArgs>>): Prisma__VoiceComplaintLogClient<$Result.GetResult<Prisma.$VoiceComplaintLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more VoiceComplaintLogs.
     * @param {VoiceComplaintLogDeleteManyArgs} args - Arguments to filter VoiceComplaintLogs to delete.
     * @example
     * // Delete a few VoiceComplaintLogs
     * const { count } = await prisma.voiceComplaintLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VoiceComplaintLogDeleteManyArgs>(args?: SelectSubset<T, VoiceComplaintLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VoiceComplaintLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoiceComplaintLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VoiceComplaintLogs
     * const voiceComplaintLog = await prisma.voiceComplaintLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VoiceComplaintLogUpdateManyArgs>(args: SelectSubset<T, VoiceComplaintLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VoiceComplaintLog.
     * @param {VoiceComplaintLogUpsertArgs} args - Arguments to update or create a VoiceComplaintLog.
     * @example
     * // Update or create a VoiceComplaintLog
     * const voiceComplaintLog = await prisma.voiceComplaintLog.upsert({
     *   create: {
     *     // ... data to create a VoiceComplaintLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VoiceComplaintLog we want to update
     *   }
     * })
     */
    upsert<T extends VoiceComplaintLogUpsertArgs>(args: SelectSubset<T, VoiceComplaintLogUpsertArgs<ExtArgs>>): Prisma__VoiceComplaintLogClient<$Result.GetResult<Prisma.$VoiceComplaintLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of VoiceComplaintLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoiceComplaintLogCountArgs} args - Arguments to filter VoiceComplaintLogs to count.
     * @example
     * // Count the number of VoiceComplaintLogs
     * const count = await prisma.voiceComplaintLog.count({
     *   where: {
     *     // ... the filter for the VoiceComplaintLogs we want to count
     *   }
     * })
    **/
    count<T extends VoiceComplaintLogCountArgs>(
      args?: Subset<T, VoiceComplaintLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VoiceComplaintLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VoiceComplaintLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoiceComplaintLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VoiceComplaintLogAggregateArgs>(args: Subset<T, VoiceComplaintLogAggregateArgs>): Prisma.PrismaPromise<GetVoiceComplaintLogAggregateType<T>>

    /**
     * Group by VoiceComplaintLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoiceComplaintLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VoiceComplaintLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VoiceComplaintLogGroupByArgs['orderBy'] }
        : { orderBy?: VoiceComplaintLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VoiceComplaintLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVoiceComplaintLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VoiceComplaintLog model
   */
  readonly fields: VoiceComplaintLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VoiceComplaintLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VoiceComplaintLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VoiceComplaintLog model
   */ 
  interface VoiceComplaintLogFieldRefs {
    readonly id: FieldRef<"VoiceComplaintLog", 'Int'>
    readonly audio_path: FieldRef<"VoiceComplaintLog", 'String'>
    readonly transcript: FieldRef<"VoiceComplaintLog", 'String'>
    readonly extracted_json: FieldRef<"VoiceComplaintLog", 'String'>
    readonly confidence: FieldRef<"VoiceComplaintLog", 'Float'>
    readonly created_at: FieldRef<"VoiceComplaintLog", 'DateTime'>
    readonly final_complaint_id: FieldRef<"VoiceComplaintLog", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * VoiceComplaintLog findUnique
   */
  export type VoiceComplaintLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceComplaintLog
     */
    select?: VoiceComplaintLogSelect<ExtArgs> | null
    /**
     * Filter, which VoiceComplaintLog to fetch.
     */
    where: VoiceComplaintLogWhereUniqueInput
  }

  /**
   * VoiceComplaintLog findUniqueOrThrow
   */
  export type VoiceComplaintLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceComplaintLog
     */
    select?: VoiceComplaintLogSelect<ExtArgs> | null
    /**
     * Filter, which VoiceComplaintLog to fetch.
     */
    where: VoiceComplaintLogWhereUniqueInput
  }

  /**
   * VoiceComplaintLog findFirst
   */
  export type VoiceComplaintLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceComplaintLog
     */
    select?: VoiceComplaintLogSelect<ExtArgs> | null
    /**
     * Filter, which VoiceComplaintLog to fetch.
     */
    where?: VoiceComplaintLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VoiceComplaintLogs to fetch.
     */
    orderBy?: VoiceComplaintLogOrderByWithRelationInput | VoiceComplaintLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VoiceComplaintLogs.
     */
    cursor?: VoiceComplaintLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VoiceComplaintLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VoiceComplaintLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VoiceComplaintLogs.
     */
    distinct?: VoiceComplaintLogScalarFieldEnum | VoiceComplaintLogScalarFieldEnum[]
  }

  /**
   * VoiceComplaintLog findFirstOrThrow
   */
  export type VoiceComplaintLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceComplaintLog
     */
    select?: VoiceComplaintLogSelect<ExtArgs> | null
    /**
     * Filter, which VoiceComplaintLog to fetch.
     */
    where?: VoiceComplaintLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VoiceComplaintLogs to fetch.
     */
    orderBy?: VoiceComplaintLogOrderByWithRelationInput | VoiceComplaintLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VoiceComplaintLogs.
     */
    cursor?: VoiceComplaintLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VoiceComplaintLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VoiceComplaintLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VoiceComplaintLogs.
     */
    distinct?: VoiceComplaintLogScalarFieldEnum | VoiceComplaintLogScalarFieldEnum[]
  }

  /**
   * VoiceComplaintLog findMany
   */
  export type VoiceComplaintLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceComplaintLog
     */
    select?: VoiceComplaintLogSelect<ExtArgs> | null
    /**
     * Filter, which VoiceComplaintLogs to fetch.
     */
    where?: VoiceComplaintLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VoiceComplaintLogs to fetch.
     */
    orderBy?: VoiceComplaintLogOrderByWithRelationInput | VoiceComplaintLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VoiceComplaintLogs.
     */
    cursor?: VoiceComplaintLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VoiceComplaintLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VoiceComplaintLogs.
     */
    skip?: number
    distinct?: VoiceComplaintLogScalarFieldEnum | VoiceComplaintLogScalarFieldEnum[]
  }

  /**
   * VoiceComplaintLog create
   */
  export type VoiceComplaintLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceComplaintLog
     */
    select?: VoiceComplaintLogSelect<ExtArgs> | null
    /**
     * The data needed to create a VoiceComplaintLog.
     */
    data: XOR<VoiceComplaintLogCreateInput, VoiceComplaintLogUncheckedCreateInput>
  }

  /**
   * VoiceComplaintLog createMany
   */
  export type VoiceComplaintLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VoiceComplaintLogs.
     */
    data: VoiceComplaintLogCreateManyInput | VoiceComplaintLogCreateManyInput[]
  }

  /**
   * VoiceComplaintLog createManyAndReturn
   */
  export type VoiceComplaintLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceComplaintLog
     */
    select?: VoiceComplaintLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many VoiceComplaintLogs.
     */
    data: VoiceComplaintLogCreateManyInput | VoiceComplaintLogCreateManyInput[]
  }

  /**
   * VoiceComplaintLog update
   */
  export type VoiceComplaintLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceComplaintLog
     */
    select?: VoiceComplaintLogSelect<ExtArgs> | null
    /**
     * The data needed to update a VoiceComplaintLog.
     */
    data: XOR<VoiceComplaintLogUpdateInput, VoiceComplaintLogUncheckedUpdateInput>
    /**
     * Choose, which VoiceComplaintLog to update.
     */
    where: VoiceComplaintLogWhereUniqueInput
  }

  /**
   * VoiceComplaintLog updateMany
   */
  export type VoiceComplaintLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VoiceComplaintLogs.
     */
    data: XOR<VoiceComplaintLogUpdateManyMutationInput, VoiceComplaintLogUncheckedUpdateManyInput>
    /**
     * Filter which VoiceComplaintLogs to update
     */
    where?: VoiceComplaintLogWhereInput
  }

  /**
   * VoiceComplaintLog upsert
   */
  export type VoiceComplaintLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceComplaintLog
     */
    select?: VoiceComplaintLogSelect<ExtArgs> | null
    /**
     * The filter to search for the VoiceComplaintLog to update in case it exists.
     */
    where: VoiceComplaintLogWhereUniqueInput
    /**
     * In case the VoiceComplaintLog found by the `where` argument doesn't exist, create a new VoiceComplaintLog with this data.
     */
    create: XOR<VoiceComplaintLogCreateInput, VoiceComplaintLogUncheckedCreateInput>
    /**
     * In case the VoiceComplaintLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VoiceComplaintLogUpdateInput, VoiceComplaintLogUncheckedUpdateInput>
  }

  /**
   * VoiceComplaintLog delete
   */
  export type VoiceComplaintLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceComplaintLog
     */
    select?: VoiceComplaintLogSelect<ExtArgs> | null
    /**
     * Filter which VoiceComplaintLog to delete.
     */
    where: VoiceComplaintLogWhereUniqueInput
  }

  /**
   * VoiceComplaintLog deleteMany
   */
  export type VoiceComplaintLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VoiceComplaintLogs to delete
     */
    where?: VoiceComplaintLogWhereInput
  }

  /**
   * VoiceComplaintLog without action
   */
  export type VoiceComplaintLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoiceComplaintLog
     */
    select?: VoiceComplaintLogSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AIAnalysisLogScalarFieldEnum: {
    id: 'id',
    model_name: 'model_name',
    model_ver: 'model_ver',
    created_at: 'created_at'
  };

  export type AIAnalysisLogScalarFieldEnum = (typeof AIAnalysisLogScalarFieldEnum)[keyof typeof AIAnalysisLogScalarFieldEnum]


  export const ComplaintAnalysisScalarFieldEnum: {
    id: 'id',
    complaint_id: 'complaint_id',
    severity_score: 'severity_score',
    urgency_level: 'urgency_level',
    predicted_category: 'predicted_category',
    confidence_score: 'confidence_score',
    extracted_entities: 'extracted_entities',
    explanation: 'explanation',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ComplaintAnalysisScalarFieldEnum = (typeof ComplaintAnalysisScalarFieldEnum)[keyof typeof ComplaintAnalysisScalarFieldEnum]


  export const VoiceComplaintLogScalarFieldEnum: {
    id: 'id',
    audio_path: 'audio_path',
    transcript: 'transcript',
    extracted_json: 'extracted_json',
    confidence: 'confidence',
    created_at: 'created_at',
    final_complaint_id: 'final_complaint_id'
  };

  export type VoiceComplaintLogScalarFieldEnum = (typeof VoiceComplaintLogScalarFieldEnum)[keyof typeof VoiceComplaintLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type AIAnalysisLogWhereInput = {
    AND?: AIAnalysisLogWhereInput | AIAnalysisLogWhereInput[]
    OR?: AIAnalysisLogWhereInput[]
    NOT?: AIAnalysisLogWhereInput | AIAnalysisLogWhereInput[]
    id?: IntFilter<"AIAnalysisLog"> | number
    model_name?: StringFilter<"AIAnalysisLog"> | string
    model_ver?: StringFilter<"AIAnalysisLog"> | string
    created_at?: DateTimeFilter<"AIAnalysisLog"> | Date | string
  }

  export type AIAnalysisLogOrderByWithRelationInput = {
    id?: SortOrder
    model_name?: SortOrder
    model_ver?: SortOrder
    created_at?: SortOrder
  }

  export type AIAnalysisLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AIAnalysisLogWhereInput | AIAnalysisLogWhereInput[]
    OR?: AIAnalysisLogWhereInput[]
    NOT?: AIAnalysisLogWhereInput | AIAnalysisLogWhereInput[]
    model_name?: StringFilter<"AIAnalysisLog"> | string
    model_ver?: StringFilter<"AIAnalysisLog"> | string
    created_at?: DateTimeFilter<"AIAnalysisLog"> | Date | string
  }, "id">

  export type AIAnalysisLogOrderByWithAggregationInput = {
    id?: SortOrder
    model_name?: SortOrder
    model_ver?: SortOrder
    created_at?: SortOrder
    _count?: AIAnalysisLogCountOrderByAggregateInput
    _avg?: AIAnalysisLogAvgOrderByAggregateInput
    _max?: AIAnalysisLogMaxOrderByAggregateInput
    _min?: AIAnalysisLogMinOrderByAggregateInput
    _sum?: AIAnalysisLogSumOrderByAggregateInput
  }

  export type AIAnalysisLogScalarWhereWithAggregatesInput = {
    AND?: AIAnalysisLogScalarWhereWithAggregatesInput | AIAnalysisLogScalarWhereWithAggregatesInput[]
    OR?: AIAnalysisLogScalarWhereWithAggregatesInput[]
    NOT?: AIAnalysisLogScalarWhereWithAggregatesInput | AIAnalysisLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AIAnalysisLog"> | number
    model_name?: StringWithAggregatesFilter<"AIAnalysisLog"> | string
    model_ver?: StringWithAggregatesFilter<"AIAnalysisLog"> | string
    created_at?: DateTimeWithAggregatesFilter<"AIAnalysisLog"> | Date | string
  }

  export type ComplaintAnalysisWhereInput = {
    AND?: ComplaintAnalysisWhereInput | ComplaintAnalysisWhereInput[]
    OR?: ComplaintAnalysisWhereInput[]
    NOT?: ComplaintAnalysisWhereInput | ComplaintAnalysisWhereInput[]
    id?: IntFilter<"ComplaintAnalysis"> | number
    complaint_id?: IntFilter<"ComplaintAnalysis"> | number
    severity_score?: IntFilter<"ComplaintAnalysis"> | number
    urgency_level?: StringFilter<"ComplaintAnalysis"> | string
    predicted_category?: StringFilter<"ComplaintAnalysis"> | string
    confidence_score?: FloatFilter<"ComplaintAnalysis"> | number
    extracted_entities?: StringFilter<"ComplaintAnalysis"> | string
    explanation?: StringNullableFilter<"ComplaintAnalysis"> | string | null
    created_at?: DateTimeFilter<"ComplaintAnalysis"> | Date | string
    updated_at?: DateTimeFilter<"ComplaintAnalysis"> | Date | string
  }

  export type ComplaintAnalysisOrderByWithRelationInput = {
    id?: SortOrder
    complaint_id?: SortOrder
    severity_score?: SortOrder
    urgency_level?: SortOrder
    predicted_category?: SortOrder
    confidence_score?: SortOrder
    extracted_entities?: SortOrder
    explanation?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ComplaintAnalysisWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    complaint_id?: number
    AND?: ComplaintAnalysisWhereInput | ComplaintAnalysisWhereInput[]
    OR?: ComplaintAnalysisWhereInput[]
    NOT?: ComplaintAnalysisWhereInput | ComplaintAnalysisWhereInput[]
    severity_score?: IntFilter<"ComplaintAnalysis"> | number
    urgency_level?: StringFilter<"ComplaintAnalysis"> | string
    predicted_category?: StringFilter<"ComplaintAnalysis"> | string
    confidence_score?: FloatFilter<"ComplaintAnalysis"> | number
    extracted_entities?: StringFilter<"ComplaintAnalysis"> | string
    explanation?: StringNullableFilter<"ComplaintAnalysis"> | string | null
    created_at?: DateTimeFilter<"ComplaintAnalysis"> | Date | string
    updated_at?: DateTimeFilter<"ComplaintAnalysis"> | Date | string
  }, "id" | "complaint_id">

  export type ComplaintAnalysisOrderByWithAggregationInput = {
    id?: SortOrder
    complaint_id?: SortOrder
    severity_score?: SortOrder
    urgency_level?: SortOrder
    predicted_category?: SortOrder
    confidence_score?: SortOrder
    extracted_entities?: SortOrder
    explanation?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ComplaintAnalysisCountOrderByAggregateInput
    _avg?: ComplaintAnalysisAvgOrderByAggregateInput
    _max?: ComplaintAnalysisMaxOrderByAggregateInput
    _min?: ComplaintAnalysisMinOrderByAggregateInput
    _sum?: ComplaintAnalysisSumOrderByAggregateInput
  }

  export type ComplaintAnalysisScalarWhereWithAggregatesInput = {
    AND?: ComplaintAnalysisScalarWhereWithAggregatesInput | ComplaintAnalysisScalarWhereWithAggregatesInput[]
    OR?: ComplaintAnalysisScalarWhereWithAggregatesInput[]
    NOT?: ComplaintAnalysisScalarWhereWithAggregatesInput | ComplaintAnalysisScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ComplaintAnalysis"> | number
    complaint_id?: IntWithAggregatesFilter<"ComplaintAnalysis"> | number
    severity_score?: IntWithAggregatesFilter<"ComplaintAnalysis"> | number
    urgency_level?: StringWithAggregatesFilter<"ComplaintAnalysis"> | string
    predicted_category?: StringWithAggregatesFilter<"ComplaintAnalysis"> | string
    confidence_score?: FloatWithAggregatesFilter<"ComplaintAnalysis"> | number
    extracted_entities?: StringWithAggregatesFilter<"ComplaintAnalysis"> | string
    explanation?: StringNullableWithAggregatesFilter<"ComplaintAnalysis"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"ComplaintAnalysis"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"ComplaintAnalysis"> | Date | string
  }

  export type VoiceComplaintLogWhereInput = {
    AND?: VoiceComplaintLogWhereInput | VoiceComplaintLogWhereInput[]
    OR?: VoiceComplaintLogWhereInput[]
    NOT?: VoiceComplaintLogWhereInput | VoiceComplaintLogWhereInput[]
    id?: IntFilter<"VoiceComplaintLog"> | number
    audio_path?: StringFilter<"VoiceComplaintLog"> | string
    transcript?: StringFilter<"VoiceComplaintLog"> | string
    extracted_json?: StringFilter<"VoiceComplaintLog"> | string
    confidence?: FloatNullableFilter<"VoiceComplaintLog"> | number | null
    created_at?: DateTimeFilter<"VoiceComplaintLog"> | Date | string
    final_complaint_id?: IntNullableFilter<"VoiceComplaintLog"> | number | null
  }

  export type VoiceComplaintLogOrderByWithRelationInput = {
    id?: SortOrder
    audio_path?: SortOrder
    transcript?: SortOrder
    extracted_json?: SortOrder
    confidence?: SortOrderInput | SortOrder
    created_at?: SortOrder
    final_complaint_id?: SortOrderInput | SortOrder
  }

  export type VoiceComplaintLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: VoiceComplaintLogWhereInput | VoiceComplaintLogWhereInput[]
    OR?: VoiceComplaintLogWhereInput[]
    NOT?: VoiceComplaintLogWhereInput | VoiceComplaintLogWhereInput[]
    audio_path?: StringFilter<"VoiceComplaintLog"> | string
    transcript?: StringFilter<"VoiceComplaintLog"> | string
    extracted_json?: StringFilter<"VoiceComplaintLog"> | string
    confidence?: FloatNullableFilter<"VoiceComplaintLog"> | number | null
    created_at?: DateTimeFilter<"VoiceComplaintLog"> | Date | string
    final_complaint_id?: IntNullableFilter<"VoiceComplaintLog"> | number | null
  }, "id">

  export type VoiceComplaintLogOrderByWithAggregationInput = {
    id?: SortOrder
    audio_path?: SortOrder
    transcript?: SortOrder
    extracted_json?: SortOrder
    confidence?: SortOrderInput | SortOrder
    created_at?: SortOrder
    final_complaint_id?: SortOrderInput | SortOrder
    _count?: VoiceComplaintLogCountOrderByAggregateInput
    _avg?: VoiceComplaintLogAvgOrderByAggregateInput
    _max?: VoiceComplaintLogMaxOrderByAggregateInput
    _min?: VoiceComplaintLogMinOrderByAggregateInput
    _sum?: VoiceComplaintLogSumOrderByAggregateInput
  }

  export type VoiceComplaintLogScalarWhereWithAggregatesInput = {
    AND?: VoiceComplaintLogScalarWhereWithAggregatesInput | VoiceComplaintLogScalarWhereWithAggregatesInput[]
    OR?: VoiceComplaintLogScalarWhereWithAggregatesInput[]
    NOT?: VoiceComplaintLogScalarWhereWithAggregatesInput | VoiceComplaintLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"VoiceComplaintLog"> | number
    audio_path?: StringWithAggregatesFilter<"VoiceComplaintLog"> | string
    transcript?: StringWithAggregatesFilter<"VoiceComplaintLog"> | string
    extracted_json?: StringWithAggregatesFilter<"VoiceComplaintLog"> | string
    confidence?: FloatNullableWithAggregatesFilter<"VoiceComplaintLog"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"VoiceComplaintLog"> | Date | string
    final_complaint_id?: IntNullableWithAggregatesFilter<"VoiceComplaintLog"> | number | null
  }

  export type AIAnalysisLogCreateInput = {
    model_name: string
    model_ver: string
    created_at?: Date | string
  }

  export type AIAnalysisLogUncheckedCreateInput = {
    id?: number
    model_name: string
    model_ver: string
    created_at?: Date | string
  }

  export type AIAnalysisLogUpdateInput = {
    model_name?: StringFieldUpdateOperationsInput | string
    model_ver?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIAnalysisLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    model_name?: StringFieldUpdateOperationsInput | string
    model_ver?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIAnalysisLogCreateManyInput = {
    id?: number
    model_name: string
    model_ver: string
    created_at?: Date | string
  }

  export type AIAnalysisLogUpdateManyMutationInput = {
    model_name?: StringFieldUpdateOperationsInput | string
    model_ver?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIAnalysisLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    model_name?: StringFieldUpdateOperationsInput | string
    model_ver?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintAnalysisCreateInput = {
    complaint_id: number
    severity_score: number
    urgency_level: string
    predicted_category: string
    confidence_score: number
    extracted_entities: string
    explanation?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ComplaintAnalysisUncheckedCreateInput = {
    id?: number
    complaint_id: number
    severity_score: number
    urgency_level: string
    predicted_category: string
    confidence_score: number
    extracted_entities: string
    explanation?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ComplaintAnalysisUpdateInput = {
    complaint_id?: IntFieldUpdateOperationsInput | number
    severity_score?: IntFieldUpdateOperationsInput | number
    urgency_level?: StringFieldUpdateOperationsInput | string
    predicted_category?: StringFieldUpdateOperationsInput | string
    confidence_score?: FloatFieldUpdateOperationsInput | number
    extracted_entities?: StringFieldUpdateOperationsInput | string
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintAnalysisUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    complaint_id?: IntFieldUpdateOperationsInput | number
    severity_score?: IntFieldUpdateOperationsInput | number
    urgency_level?: StringFieldUpdateOperationsInput | string
    predicted_category?: StringFieldUpdateOperationsInput | string
    confidence_score?: FloatFieldUpdateOperationsInput | number
    extracted_entities?: StringFieldUpdateOperationsInput | string
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintAnalysisCreateManyInput = {
    id?: number
    complaint_id: number
    severity_score: number
    urgency_level: string
    predicted_category: string
    confidence_score: number
    extracted_entities: string
    explanation?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ComplaintAnalysisUpdateManyMutationInput = {
    complaint_id?: IntFieldUpdateOperationsInput | number
    severity_score?: IntFieldUpdateOperationsInput | number
    urgency_level?: StringFieldUpdateOperationsInput | string
    predicted_category?: StringFieldUpdateOperationsInput | string
    confidence_score?: FloatFieldUpdateOperationsInput | number
    extracted_entities?: StringFieldUpdateOperationsInput | string
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintAnalysisUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    complaint_id?: IntFieldUpdateOperationsInput | number
    severity_score?: IntFieldUpdateOperationsInput | number
    urgency_level?: StringFieldUpdateOperationsInput | string
    predicted_category?: StringFieldUpdateOperationsInput | string
    confidence_score?: FloatFieldUpdateOperationsInput | number
    extracted_entities?: StringFieldUpdateOperationsInput | string
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoiceComplaintLogCreateInput = {
    audio_path: string
    transcript: string
    extracted_json: string
    confidence?: number | null
    created_at?: Date | string
    final_complaint_id?: number | null
  }

  export type VoiceComplaintLogUncheckedCreateInput = {
    id?: number
    audio_path: string
    transcript: string
    extracted_json: string
    confidence?: number | null
    created_at?: Date | string
    final_complaint_id?: number | null
  }

  export type VoiceComplaintLogUpdateInput = {
    audio_path?: StringFieldUpdateOperationsInput | string
    transcript?: StringFieldUpdateOperationsInput | string
    extracted_json?: StringFieldUpdateOperationsInput | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    final_complaint_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type VoiceComplaintLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    audio_path?: StringFieldUpdateOperationsInput | string
    transcript?: StringFieldUpdateOperationsInput | string
    extracted_json?: StringFieldUpdateOperationsInput | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    final_complaint_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type VoiceComplaintLogCreateManyInput = {
    id?: number
    audio_path: string
    transcript: string
    extracted_json: string
    confidence?: number | null
    created_at?: Date | string
    final_complaint_id?: number | null
  }

  export type VoiceComplaintLogUpdateManyMutationInput = {
    audio_path?: StringFieldUpdateOperationsInput | string
    transcript?: StringFieldUpdateOperationsInput | string
    extracted_json?: StringFieldUpdateOperationsInput | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    final_complaint_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type VoiceComplaintLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    audio_path?: StringFieldUpdateOperationsInput | string
    transcript?: StringFieldUpdateOperationsInput | string
    extracted_json?: StringFieldUpdateOperationsInput | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    final_complaint_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AIAnalysisLogCountOrderByAggregateInput = {
    id?: SortOrder
    model_name?: SortOrder
    model_ver?: SortOrder
    created_at?: SortOrder
  }

  export type AIAnalysisLogAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AIAnalysisLogMaxOrderByAggregateInput = {
    id?: SortOrder
    model_name?: SortOrder
    model_ver?: SortOrder
    created_at?: SortOrder
  }

  export type AIAnalysisLogMinOrderByAggregateInput = {
    id?: SortOrder
    model_name?: SortOrder
    model_ver?: SortOrder
    created_at?: SortOrder
  }

  export type AIAnalysisLogSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ComplaintAnalysisCountOrderByAggregateInput = {
    id?: SortOrder
    complaint_id?: SortOrder
    severity_score?: SortOrder
    urgency_level?: SortOrder
    predicted_category?: SortOrder
    confidence_score?: SortOrder
    extracted_entities?: SortOrder
    explanation?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ComplaintAnalysisAvgOrderByAggregateInput = {
    id?: SortOrder
    complaint_id?: SortOrder
    severity_score?: SortOrder
    confidence_score?: SortOrder
  }

  export type ComplaintAnalysisMaxOrderByAggregateInput = {
    id?: SortOrder
    complaint_id?: SortOrder
    severity_score?: SortOrder
    urgency_level?: SortOrder
    predicted_category?: SortOrder
    confidence_score?: SortOrder
    extracted_entities?: SortOrder
    explanation?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ComplaintAnalysisMinOrderByAggregateInput = {
    id?: SortOrder
    complaint_id?: SortOrder
    severity_score?: SortOrder
    urgency_level?: SortOrder
    predicted_category?: SortOrder
    confidence_score?: SortOrder
    extracted_entities?: SortOrder
    explanation?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ComplaintAnalysisSumOrderByAggregateInput = {
    id?: SortOrder
    complaint_id?: SortOrder
    severity_score?: SortOrder
    confidence_score?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type VoiceComplaintLogCountOrderByAggregateInput = {
    id?: SortOrder
    audio_path?: SortOrder
    transcript?: SortOrder
    extracted_json?: SortOrder
    confidence?: SortOrder
    created_at?: SortOrder
    final_complaint_id?: SortOrder
  }

  export type VoiceComplaintLogAvgOrderByAggregateInput = {
    id?: SortOrder
    confidence?: SortOrder
    final_complaint_id?: SortOrder
  }

  export type VoiceComplaintLogMaxOrderByAggregateInput = {
    id?: SortOrder
    audio_path?: SortOrder
    transcript?: SortOrder
    extracted_json?: SortOrder
    confidence?: SortOrder
    created_at?: SortOrder
    final_complaint_id?: SortOrder
  }

  export type VoiceComplaintLogMinOrderByAggregateInput = {
    id?: SortOrder
    audio_path?: SortOrder
    transcript?: SortOrder
    extracted_json?: SortOrder
    confidence?: SortOrder
    created_at?: SortOrder
    final_complaint_id?: SortOrder
  }

  export type VoiceComplaintLogSumOrderByAggregateInput = {
    id?: SortOrder
    confidence?: SortOrder
    final_complaint_id?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use AIAnalysisLogDefaultArgs instead
     */
    export type AIAnalysisLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AIAnalysisLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ComplaintAnalysisDefaultArgs instead
     */
    export type ComplaintAnalysisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ComplaintAnalysisDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VoiceComplaintLogDefaultArgs instead
     */
    export type VoiceComplaintLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VoiceComplaintLogDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}