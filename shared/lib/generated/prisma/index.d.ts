
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Admin
 * 
 */
export type Admin = $Result.DefaultSelection<Prisma.$AdminPayload>
/**
 * Model Student
 * 
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model Academy
 * 
 */
export type Academy = $Result.DefaultSelection<Prisma.$AcademyPayload>
/**
 * Model AcademyImage
 * 
 */
export type AcademyImage = $Result.DefaultSelection<Prisma.$AcademyImagePayload>
/**
 * Model Announcement
 * 
 */
export type Announcement = $Result.DefaultSelection<Prisma.$AnnouncementPayload>
/**
 * Model AnnouncementFile
 * 
 */
export type AnnouncementFile = $Result.DefaultSelection<Prisma.$AnnouncementFilePayload>
/**
 * Model QnABoard
 * 
 */
export type QnABoard = $Result.DefaultSelection<Prisma.$QnABoardPayload>
/**
 * Model QnABoardComment
 * 
 */
export type QnABoardComment = $Result.DefaultSelection<Prisma.$QnABoardCommentPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  DEVELOPER: 'DEVELOPER',
  ADMIN: 'ADMIN',
  STUDENT: 'STUDENT'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.academy`: Exposes CRUD operations for the **Academy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Academies
    * const academies = await prisma.academy.findMany()
    * ```
    */
  get academy(): Prisma.AcademyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.academyImage`: Exposes CRUD operations for the **AcademyImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AcademyImages
    * const academyImages = await prisma.academyImage.findMany()
    * ```
    */
  get academyImage(): Prisma.AcademyImageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.announcement`: Exposes CRUD operations for the **Announcement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Announcements
    * const announcements = await prisma.announcement.findMany()
    * ```
    */
  get announcement(): Prisma.AnnouncementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.announcementFile`: Exposes CRUD operations for the **AnnouncementFile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AnnouncementFiles
    * const announcementFiles = await prisma.announcementFile.findMany()
    * ```
    */
  get announcementFile(): Prisma.AnnouncementFileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.qnABoard`: Exposes CRUD operations for the **QnABoard** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QnABoards
    * const qnABoards = await prisma.qnABoard.findMany()
    * ```
    */
  get qnABoard(): Prisma.QnABoardDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.qnABoardComment`: Exposes CRUD operations for the **QnABoardComment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QnABoardComments
    * const qnABoardComments = await prisma.qnABoardComment.findMany()
    * ```
    */
  get qnABoardComment(): Prisma.QnABoardCommentDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.11.0
   * Query Engine version: 9c30299f5a0ea26a96790e13f796dc6094db3173
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    User: 'User',
    Admin: 'Admin',
    Student: 'Student',
    Academy: 'Academy',
    AcademyImage: 'AcademyImage',
    Announcement: 'Announcement',
    AnnouncementFile: 'AnnouncementFile',
    QnABoard: 'QnABoard',
    QnABoardComment: 'QnABoardComment'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "admin" | "student" | "academy" | "academyImage" | "announcement" | "announcementFile" | "qnABoard" | "qnABoardComment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Admin: {
        payload: Prisma.$AdminPayload<ExtArgs>
        fields: Prisma.AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findFirst: {
            args: Prisma.AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findMany: {
            args: Prisma.AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          create: {
            args: Prisma.AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          createMany: {
            args: Prisma.AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          update: {
            args: Prisma.AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          deleteMany: {
            args: Prisma.AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      Academy: {
        payload: Prisma.$AcademyPayload<ExtArgs>
        fields: Prisma.AcademyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AcademyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AcademyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademyPayload>
          }
          findFirst: {
            args: Prisma.AcademyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AcademyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademyPayload>
          }
          findMany: {
            args: Prisma.AcademyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademyPayload>[]
          }
          create: {
            args: Prisma.AcademyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademyPayload>
          }
          createMany: {
            args: Prisma.AcademyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AcademyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademyPayload>
          }
          update: {
            args: Prisma.AcademyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademyPayload>
          }
          deleteMany: {
            args: Prisma.AcademyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AcademyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AcademyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademyPayload>
          }
          aggregate: {
            args: Prisma.AcademyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAcademy>
          }
          groupBy: {
            args: Prisma.AcademyGroupByArgs<ExtArgs>
            result: $Utils.Optional<AcademyGroupByOutputType>[]
          }
          count: {
            args: Prisma.AcademyCountArgs<ExtArgs>
            result: $Utils.Optional<AcademyCountAggregateOutputType> | number
          }
        }
      }
      AcademyImage: {
        payload: Prisma.$AcademyImagePayload<ExtArgs>
        fields: Prisma.AcademyImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AcademyImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademyImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AcademyImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademyImagePayload>
          }
          findFirst: {
            args: Prisma.AcademyImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademyImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AcademyImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademyImagePayload>
          }
          findMany: {
            args: Prisma.AcademyImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademyImagePayload>[]
          }
          create: {
            args: Prisma.AcademyImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademyImagePayload>
          }
          createMany: {
            args: Prisma.AcademyImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AcademyImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademyImagePayload>
          }
          update: {
            args: Prisma.AcademyImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademyImagePayload>
          }
          deleteMany: {
            args: Prisma.AcademyImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AcademyImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AcademyImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademyImagePayload>
          }
          aggregate: {
            args: Prisma.AcademyImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAcademyImage>
          }
          groupBy: {
            args: Prisma.AcademyImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<AcademyImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.AcademyImageCountArgs<ExtArgs>
            result: $Utils.Optional<AcademyImageCountAggregateOutputType> | number
          }
        }
      }
      Announcement: {
        payload: Prisma.$AnnouncementPayload<ExtArgs>
        fields: Prisma.AnnouncementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnnouncementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnnouncementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          findFirst: {
            args: Prisma.AnnouncementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnnouncementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          findMany: {
            args: Prisma.AnnouncementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>[]
          }
          create: {
            args: Prisma.AnnouncementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          createMany: {
            args: Prisma.AnnouncementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AnnouncementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          update: {
            args: Prisma.AnnouncementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          deleteMany: {
            args: Prisma.AnnouncementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnnouncementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AnnouncementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          aggregate: {
            args: Prisma.AnnouncementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnnouncement>
          }
          groupBy: {
            args: Prisma.AnnouncementGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnnouncementGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnnouncementCountArgs<ExtArgs>
            result: $Utils.Optional<AnnouncementCountAggregateOutputType> | number
          }
        }
      }
      AnnouncementFile: {
        payload: Prisma.$AnnouncementFilePayload<ExtArgs>
        fields: Prisma.AnnouncementFileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnnouncementFileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementFilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnnouncementFileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementFilePayload>
          }
          findFirst: {
            args: Prisma.AnnouncementFileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementFilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnnouncementFileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementFilePayload>
          }
          findMany: {
            args: Prisma.AnnouncementFileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementFilePayload>[]
          }
          create: {
            args: Prisma.AnnouncementFileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementFilePayload>
          }
          createMany: {
            args: Prisma.AnnouncementFileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AnnouncementFileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementFilePayload>
          }
          update: {
            args: Prisma.AnnouncementFileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementFilePayload>
          }
          deleteMany: {
            args: Prisma.AnnouncementFileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnnouncementFileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AnnouncementFileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementFilePayload>
          }
          aggregate: {
            args: Prisma.AnnouncementFileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnnouncementFile>
          }
          groupBy: {
            args: Prisma.AnnouncementFileGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnnouncementFileGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnnouncementFileCountArgs<ExtArgs>
            result: $Utils.Optional<AnnouncementFileCountAggregateOutputType> | number
          }
        }
      }
      QnABoard: {
        payload: Prisma.$QnABoardPayload<ExtArgs>
        fields: Prisma.QnABoardFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QnABoardFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QnABoardPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QnABoardFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QnABoardPayload>
          }
          findFirst: {
            args: Prisma.QnABoardFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QnABoardPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QnABoardFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QnABoardPayload>
          }
          findMany: {
            args: Prisma.QnABoardFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QnABoardPayload>[]
          }
          create: {
            args: Prisma.QnABoardCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QnABoardPayload>
          }
          createMany: {
            args: Prisma.QnABoardCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.QnABoardDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QnABoardPayload>
          }
          update: {
            args: Prisma.QnABoardUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QnABoardPayload>
          }
          deleteMany: {
            args: Prisma.QnABoardDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QnABoardUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QnABoardUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QnABoardPayload>
          }
          aggregate: {
            args: Prisma.QnABoardAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQnABoard>
          }
          groupBy: {
            args: Prisma.QnABoardGroupByArgs<ExtArgs>
            result: $Utils.Optional<QnABoardGroupByOutputType>[]
          }
          count: {
            args: Prisma.QnABoardCountArgs<ExtArgs>
            result: $Utils.Optional<QnABoardCountAggregateOutputType> | number
          }
        }
      }
      QnABoardComment: {
        payload: Prisma.$QnABoardCommentPayload<ExtArgs>
        fields: Prisma.QnABoardCommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QnABoardCommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QnABoardCommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QnABoardCommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QnABoardCommentPayload>
          }
          findFirst: {
            args: Prisma.QnABoardCommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QnABoardCommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QnABoardCommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QnABoardCommentPayload>
          }
          findMany: {
            args: Prisma.QnABoardCommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QnABoardCommentPayload>[]
          }
          create: {
            args: Prisma.QnABoardCommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QnABoardCommentPayload>
          }
          createMany: {
            args: Prisma.QnABoardCommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.QnABoardCommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QnABoardCommentPayload>
          }
          update: {
            args: Prisma.QnABoardCommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QnABoardCommentPayload>
          }
          deleteMany: {
            args: Prisma.QnABoardCommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QnABoardCommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QnABoardCommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QnABoardCommentPayload>
          }
          aggregate: {
            args: Prisma.QnABoardCommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQnABoardComment>
          }
          groupBy: {
            args: Prisma.QnABoardCommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<QnABoardCommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.QnABoardCommentCountArgs<ExtArgs>
            result: $Utils.Optional<QnABoardCommentCountAggregateOutputType> | number
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
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    admin?: AdminOmit
    student?: StudentOmit
    academy?: AcademyOmit
    academyImage?: AcademyImageOmit
    announcement?: AnnouncementOmit
    announcementFile?: AnnouncementFileOmit
    qnABoard?: QnABoardOmit
    qnABoardComment?: QnABoardCommentOmit
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
    | 'updateManyAndReturn'
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    qna: number
    qnaComments: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    qna?: boolean | UserCountOutputTypeCountQnaArgs
    qnaComments?: boolean | UserCountOutputTypeCountQnaCommentsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountQnaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QnABoardWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountQnaCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QnABoardCommentWhereInput
  }


  /**
   * Count Type AdminCountOutputType
   */

  export type AdminCountOutputType = {
    announcement: number
    academy: number
  }

  export type AdminCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    announcement?: boolean | AdminCountOutputTypeCountAnnouncementArgs
    academy?: boolean | AdminCountOutputTypeCountAcademyArgs
  }

  // Custom InputTypes
  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminCountOutputType
     */
    select?: AdminCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeCountAnnouncementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnnouncementWhereInput
  }

  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeCountAcademyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcademyWhereInput
  }


  /**
   * Count Type AcademyCountOutputType
   */

  export type AcademyCountOutputType = {
    images: number
    students: number
    admins: number
    announcements: number
  }

  export type AcademyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | AcademyCountOutputTypeCountImagesArgs
    students?: boolean | AcademyCountOutputTypeCountStudentsArgs
    admins?: boolean | AcademyCountOutputTypeCountAdminsArgs
    announcements?: boolean | AcademyCountOutputTypeCountAnnouncementsArgs
  }

  // Custom InputTypes
  /**
   * AcademyCountOutputType without action
   */
  export type AcademyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademyCountOutputType
     */
    select?: AcademyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AcademyCountOutputType without action
   */
  export type AcademyCountOutputTypeCountImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcademyImageWhereInput
  }

  /**
   * AcademyCountOutputType without action
   */
  export type AcademyCountOutputTypeCountStudentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
  }

  /**
   * AcademyCountOutputType without action
   */
  export type AcademyCountOutputTypeCountAdminsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
  }

  /**
   * AcademyCountOutputType without action
   */
  export type AcademyCountOutputTypeCountAnnouncementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnnouncementWhereInput
  }


  /**
   * Count Type AnnouncementCountOutputType
   */

  export type AnnouncementCountOutputType = {
    files: number
    academies: number
  }

  export type AnnouncementCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    files?: boolean | AnnouncementCountOutputTypeCountFilesArgs
    academies?: boolean | AnnouncementCountOutputTypeCountAcademiesArgs
  }

  // Custom InputTypes
  /**
   * AnnouncementCountOutputType without action
   */
  export type AnnouncementCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementCountOutputType
     */
    select?: AnnouncementCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AnnouncementCountOutputType without action
   */
  export type AnnouncementCountOutputTypeCountFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnnouncementFileWhereInput
  }

  /**
   * AnnouncementCountOutputType without action
   */
  export type AnnouncementCountOutputTypeCountAcademiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcademyWhereInput
  }


  /**
   * Count Type QnABoardCountOutputType
   */

  export type QnABoardCountOutputType = {
    comments: number
  }

  export type QnABoardCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | QnABoardCountOutputTypeCountCommentsArgs
  }

  // Custom InputTypes
  /**
   * QnABoardCountOutputType without action
   */
  export type QnABoardCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QnABoardCountOutputType
     */
    select?: QnABoardCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QnABoardCountOutputType without action
   */
  export type QnABoardCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QnABoardCommentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    memberId: number | null
  }

  export type UserSumAggregateOutputType = {
    memberId: number | null
  }

  export type UserMinAggregateOutputType = {
    userId: string | null
    userPassword: string | null
    createdAt: Date | null
    role: $Enums.Role | null
    memberId: number | null
  }

  export type UserMaxAggregateOutputType = {
    userId: string | null
    userPassword: string | null
    createdAt: Date | null
    role: $Enums.Role | null
    memberId: number | null
  }

  export type UserCountAggregateOutputType = {
    userId: number
    userPassword: number
    createdAt: number
    role: number
    memberId: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    memberId?: true
  }

  export type UserSumAggregateInputType = {
    memberId?: true
  }

  export type UserMinAggregateInputType = {
    userId?: true
    userPassword?: true
    createdAt?: true
    role?: true
    memberId?: true
  }

  export type UserMaxAggregateInputType = {
    userId?: true
    userPassword?: true
    createdAt?: true
    role?: true
    memberId?: true
  }

  export type UserCountAggregateInputType = {
    userId?: true
    userPassword?: true
    createdAt?: true
    role?: true
    memberId?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    userId: string
    userPassword: string
    createdAt: Date
    role: $Enums.Role
    memberId: number
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    userPassword?: boolean
    createdAt?: boolean
    role?: boolean
    memberId?: boolean
    admin?: boolean | User$adminArgs<ExtArgs>
    qna?: boolean | User$qnaArgs<ExtArgs>
    qnaComments?: boolean | User$qnaCommentsArgs<ExtArgs>
    student?: boolean | User$studentArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    userId?: boolean
    userPassword?: boolean
    createdAt?: boolean
    role?: boolean
    memberId?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "userPassword" | "createdAt" | "role" | "memberId", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | User$adminArgs<ExtArgs>
    qna?: boolean | User$qnaArgs<ExtArgs>
    qnaComments?: boolean | User$qnaCommentsArgs<ExtArgs>
    student?: boolean | User$studentArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      admin: Prisma.$AdminPayload<ExtArgs> | null
      qna: Prisma.$QnABoardPayload<ExtArgs>[]
      qnaComments: Prisma.$QnABoardCommentPayload<ExtArgs>[]
      student: Prisma.$StudentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      userPassword: string
      createdAt: Date
      role: $Enums.Role
      memberId: number
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userWithUserIdOnly = await prisma.user.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin<T extends User$adminArgs<ExtArgs> = {}>(args?: Subset<T, User$adminArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    qna<T extends User$qnaArgs<ExtArgs> = {}>(args?: Subset<T, User$qnaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QnABoardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    qnaComments<T extends User$qnaCommentsArgs<ExtArgs> = {}>(args?: Subset<T, User$qnaCommentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QnABoardCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    student<T extends User$studentArgs<ExtArgs> = {}>(args?: Subset<T, User$studentArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly userId: FieldRef<"User", 'String'>
    readonly userPassword: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly role: FieldRef<"User", 'Role'>
    readonly memberId: FieldRef<"User", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.admin
   */
  export type User$adminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    where?: AdminWhereInput
  }

  /**
   * User.qna
   */
  export type User$qnaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QnABoard
     */
    select?: QnABoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QnABoard
     */
    omit?: QnABoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QnABoardInclude<ExtArgs> | null
    where?: QnABoardWhereInput
    orderBy?: QnABoardOrderByWithRelationInput | QnABoardOrderByWithRelationInput[]
    cursor?: QnABoardWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QnABoardScalarFieldEnum | QnABoardScalarFieldEnum[]
  }

  /**
   * User.qnaComments
   */
  export type User$qnaCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QnABoardComment
     */
    select?: QnABoardCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QnABoardComment
     */
    omit?: QnABoardCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QnABoardCommentInclude<ExtArgs> | null
    where?: QnABoardCommentWhereInput
    orderBy?: QnABoardCommentOrderByWithRelationInput | QnABoardCommentOrderByWithRelationInput[]
    cursor?: QnABoardCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QnABoardCommentScalarFieldEnum | QnABoardCommentScalarFieldEnum[]
  }

  /**
   * User.student
   */
  export type User$studentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    where?: StudentWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminAvgAggregateOutputType = {
    memberId: number | null
  }

  export type AdminSumAggregateOutputType = {
    memberId: number | null
  }

  export type AdminMinAggregateOutputType = {
    adminName: string | null
    adminPhone: string | null
    memberId: number | null
  }

  export type AdminMaxAggregateOutputType = {
    adminName: string | null
    adminPhone: string | null
    memberId: number | null
  }

  export type AdminCountAggregateOutputType = {
    adminName: number
    adminPhone: number
    memberId: number
    _all: number
  }


  export type AdminAvgAggregateInputType = {
    memberId?: true
  }

  export type AdminSumAggregateInputType = {
    memberId?: true
  }

  export type AdminMinAggregateInputType = {
    adminName?: true
    adminPhone?: true
    memberId?: true
  }

  export type AdminMaxAggregateInputType = {
    adminName?: true
    adminPhone?: true
    memberId?: true
  }

  export type AdminCountAggregateInputType = {
    adminName?: true
    adminPhone?: true
    memberId?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admin to aggregate.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdminAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdminSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithAggregationInput | AdminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _avg?: AdminAvgAggregateInputType
    _sum?: AdminSumAggregateInputType
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    adminName: string
    adminPhone: string
    memberId: number
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    adminName?: boolean
    adminPhone?: boolean
    memberId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    announcement?: boolean | Admin$announcementArgs<ExtArgs>
    academy?: boolean | Admin$academyArgs<ExtArgs>
    _count?: boolean | AdminCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>



  export type AdminSelectScalar = {
    adminName?: boolean
    adminPhone?: boolean
    memberId?: boolean
  }

  export type AdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"adminName" | "adminPhone" | "memberId", ExtArgs["result"]["admin"]>
  export type AdminInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    announcement?: boolean | Admin$announcementArgs<ExtArgs>
    academy?: boolean | Admin$academyArgs<ExtArgs>
    _count?: boolean | AdminCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      announcement: Prisma.$AnnouncementPayload<ExtArgs>[]
      academy: Prisma.$AcademyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      adminName: string
      adminPhone: string
      memberId: number
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = $Result.GetResult<Prisma.$AdminPayload, S>

  type AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admin'], meta: { name: 'Admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFindUniqueArgs>(args: SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFindFirstArgs>(args?: SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `adminName`
     * const adminWithAdminNameOnly = await prisma.admin.findMany({ select: { adminName: true } })
     * 
     */
    findMany<T extends AdminFindManyArgs>(args?: SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends AdminCreateArgs>(args: SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminCreateManyArgs>(args?: SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends AdminDeleteArgs>(args: SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUpdateArgs>(args: SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends AdminUpsertArgs>(args: SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
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
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admin model
   */
  readonly fields: AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    announcement<T extends Admin$announcementArgs<ExtArgs> = {}>(args?: Subset<T, Admin$announcementArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    academy<T extends Admin$academyArgs<ExtArgs> = {}>(args?: Subset<T, Admin$academyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Admin model
   */
  interface AdminFieldRefs {
    readonly adminName: FieldRef<"Admin", 'String'>
    readonly adminPhone: FieldRef<"Admin", 'String'>
    readonly memberId: FieldRef<"Admin", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findUniqueOrThrow
   */
  export type AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findFirstOrThrow
   */
  export type AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admins to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin create
   */
  export type AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The data needed to create a Admin.
     */
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>
  }

  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin update
   */
  export type AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The data needed to update a Admin.
     */
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The filter to search for the Admin to update in case it exists.
     */
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     */
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
  }

  /**
   * Admin delete
   */
  export type AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter which Admin to delete.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admins to delete
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to delete.
     */
    limit?: number
  }

  /**
   * Admin.announcement
   */
  export type Admin$announcementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    where?: AnnouncementWhereInput
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    cursor?: AnnouncementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Admin.academy
   */
  export type Admin$academyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Academy
     */
    select?: AcademySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Academy
     */
    omit?: AcademyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademyInclude<ExtArgs> | null
    where?: AcademyWhereInput
    orderBy?: AcademyOrderByWithRelationInput | AcademyOrderByWithRelationInput[]
    cursor?: AcademyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AcademyScalarFieldEnum | AcademyScalarFieldEnum[]
  }

  /**
   * Admin without action
   */
  export type AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
  }


  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentAvgAggregateOutputType = {
    academyId: number | null
    studentBirthYear: number | null
    memberId: number | null
  }

  export type StudentSumAggregateOutputType = {
    academyId: number | null
    studentBirthYear: number | null
    memberId: number | null
  }

  export type StudentMinAggregateOutputType = {
    academyId: number | null
    studentName: string | null
    studentPhone: string | null
    studentHighschool: string | null
    studentBirthYear: number | null
    studentMemo: string | null
    memberId: number | null
  }

  export type StudentMaxAggregateOutputType = {
    academyId: number | null
    studentName: string | null
    studentPhone: string | null
    studentHighschool: string | null
    studentBirthYear: number | null
    studentMemo: string | null
    memberId: number | null
  }

  export type StudentCountAggregateOutputType = {
    academyId: number
    studentName: number
    studentPhone: number
    studentHighschool: number
    studentBirthYear: number
    studentMemo: number
    memberId: number
    _all: number
  }


  export type StudentAvgAggregateInputType = {
    academyId?: true
    studentBirthYear?: true
    memberId?: true
  }

  export type StudentSumAggregateInputType = {
    academyId?: true
    studentBirthYear?: true
    memberId?: true
  }

  export type StudentMinAggregateInputType = {
    academyId?: true
    studentName?: true
    studentPhone?: true
    studentHighschool?: true
    studentBirthYear?: true
    studentMemo?: true
    memberId?: true
  }

  export type StudentMaxAggregateInputType = {
    academyId?: true
    studentName?: true
    studentPhone?: true
    studentHighschool?: true
    studentBirthYear?: true
    studentMemo?: true
    memberId?: true
  }

  export type StudentCountAggregateInputType = {
    academyId?: true
    studentName?: true
    studentPhone?: true
    studentHighschool?: true
    studentBirthYear?: true
    studentMemo?: true
    memberId?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _avg?: StudentAvgAggregateInputType
    _sum?: StudentSumAggregateInputType
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    academyId: number
    studentName: string
    studentPhone: string
    studentHighschool: string | null
    studentBirthYear: number
    studentMemo: string | null
    memberId: number
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    academyId?: boolean
    studentName?: boolean
    studentPhone?: boolean
    studentHighschool?: boolean
    studentBirthYear?: boolean
    studentMemo?: boolean
    memberId?: boolean
    academy?: boolean | AcademyDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>



  export type StudentSelectScalar = {
    academyId?: boolean
    studentName?: boolean
    studentPhone?: boolean
    studentHighschool?: boolean
    studentBirthYear?: boolean
    studentMemo?: boolean
    memberId?: boolean
  }

  export type StudentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"academyId" | "studentName" | "studentPhone" | "studentHighschool" | "studentBirthYear" | "studentMemo" | "memberId", ExtArgs["result"]["student"]>
  export type StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    academy?: boolean | AcademyDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {
      academy: Prisma.$AcademyPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      academyId: number
      studentName: string
      studentPhone: string
      studentHighschool: string | null
      studentBirthYear: number
      studentMemo: string | null
      memberId: number
    }, ExtArgs["result"]["student"]>
    composites: {}
  }

  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `academyId`
     * const studentWithAcademyIdOnly = await prisma.student.findMany({ select: { academyId: true } })
     * 
     */
    findMany<T extends StudentFindManyArgs>(args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
     */
    create<T extends StudentCreateArgs>(args: SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCreateManyArgs>(args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
     */
    delete<T extends StudentDeleteArgs>(args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentUpdateArgs>(args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentUpdateManyArgs>(args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
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
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    academy<T extends AcademyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AcademyDefaultArgs<ExtArgs>>): Prisma__AcademyClient<$Result.GetResult<Prisma.$AcademyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Student model
   */
  interface StudentFieldRefs {
    readonly academyId: FieldRef<"Student", 'Int'>
    readonly studentName: FieldRef<"Student", 'String'>
    readonly studentPhone: FieldRef<"Student", 'String'>
    readonly studentHighschool: FieldRef<"Student", 'String'>
    readonly studentBirthYear: FieldRef<"Student", 'Int'>
    readonly studentMemo: FieldRef<"Student", 'String'>
    readonly memberId: FieldRef<"Student", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }

  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
  }

  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }

  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to delete.
     */
    limit?: number
  }

  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
  }


  /**
   * Model Academy
   */

  export type AggregateAcademy = {
    _count: AcademyCountAggregateOutputType | null
    _avg: AcademyAvgAggregateOutputType | null
    _sum: AcademySumAggregateOutputType | null
    _min: AcademyMinAggregateOutputType | null
    _max: AcademyMaxAggregateOutputType | null
  }

  export type AcademyAvgAggregateOutputType = {
    academyId: number | null
  }

  export type AcademySumAggregateOutputType = {
    academyId: number | null
  }

  export type AcademyMinAggregateOutputType = {
    academyId: number | null
    academyName: string | null
    academyPhone: string | null
    academyAddress: string | null
    createdAt: Date | null
    academyMainImage: string | null
  }

  export type AcademyMaxAggregateOutputType = {
    academyId: number | null
    academyName: string | null
    academyPhone: string | null
    academyAddress: string | null
    createdAt: Date | null
    academyMainImage: string | null
  }

  export type AcademyCountAggregateOutputType = {
    academyId: number
    academyName: number
    academyPhone: number
    academyAddress: number
    createdAt: number
    academyMainImage: number
    _all: number
  }


  export type AcademyAvgAggregateInputType = {
    academyId?: true
  }

  export type AcademySumAggregateInputType = {
    academyId?: true
  }

  export type AcademyMinAggregateInputType = {
    academyId?: true
    academyName?: true
    academyPhone?: true
    academyAddress?: true
    createdAt?: true
    academyMainImage?: true
  }

  export type AcademyMaxAggregateInputType = {
    academyId?: true
    academyName?: true
    academyPhone?: true
    academyAddress?: true
    createdAt?: true
    academyMainImage?: true
  }

  export type AcademyCountAggregateInputType = {
    academyId?: true
    academyName?: true
    academyPhone?: true
    academyAddress?: true
    createdAt?: true
    academyMainImage?: true
    _all?: true
  }

  export type AcademyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Academy to aggregate.
     */
    where?: AcademyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Academies to fetch.
     */
    orderBy?: AcademyOrderByWithRelationInput | AcademyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AcademyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Academies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Academies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Academies
    **/
    _count?: true | AcademyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AcademyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AcademySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AcademyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AcademyMaxAggregateInputType
  }

  export type GetAcademyAggregateType<T extends AcademyAggregateArgs> = {
        [P in keyof T & keyof AggregateAcademy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcademy[P]>
      : GetScalarType<T[P], AggregateAcademy[P]>
  }




  export type AcademyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcademyWhereInput
    orderBy?: AcademyOrderByWithAggregationInput | AcademyOrderByWithAggregationInput[]
    by: AcademyScalarFieldEnum[] | AcademyScalarFieldEnum
    having?: AcademyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AcademyCountAggregateInputType | true
    _avg?: AcademyAvgAggregateInputType
    _sum?: AcademySumAggregateInputType
    _min?: AcademyMinAggregateInputType
    _max?: AcademyMaxAggregateInputType
  }

  export type AcademyGroupByOutputType = {
    academyId: number
    academyName: string
    academyPhone: string | null
    academyAddress: string
    createdAt: Date
    academyMainImage: string | null
    _count: AcademyCountAggregateOutputType | null
    _avg: AcademyAvgAggregateOutputType | null
    _sum: AcademySumAggregateOutputType | null
    _min: AcademyMinAggregateOutputType | null
    _max: AcademyMaxAggregateOutputType | null
  }

  type GetAcademyGroupByPayload<T extends AcademyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AcademyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AcademyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AcademyGroupByOutputType[P]>
            : GetScalarType<T[P], AcademyGroupByOutputType[P]>
        }
      >
    >


  export type AcademySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    academyId?: boolean
    academyName?: boolean
    academyPhone?: boolean
    academyAddress?: boolean
    createdAt?: boolean
    academyMainImage?: boolean
    images?: boolean | Academy$imagesArgs<ExtArgs>
    students?: boolean | Academy$studentsArgs<ExtArgs>
    admins?: boolean | Academy$adminsArgs<ExtArgs>
    announcements?: boolean | Academy$announcementsArgs<ExtArgs>
    _count?: boolean | AcademyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academy"]>



  export type AcademySelectScalar = {
    academyId?: boolean
    academyName?: boolean
    academyPhone?: boolean
    academyAddress?: boolean
    createdAt?: boolean
    academyMainImage?: boolean
  }

  export type AcademyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"academyId" | "academyName" | "academyPhone" | "academyAddress" | "createdAt" | "academyMainImage", ExtArgs["result"]["academy"]>
  export type AcademyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | Academy$imagesArgs<ExtArgs>
    students?: boolean | Academy$studentsArgs<ExtArgs>
    admins?: boolean | Academy$adminsArgs<ExtArgs>
    announcements?: boolean | Academy$announcementsArgs<ExtArgs>
    _count?: boolean | AcademyCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AcademyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Academy"
    objects: {
      images: Prisma.$AcademyImagePayload<ExtArgs>[]
      students: Prisma.$StudentPayload<ExtArgs>[]
      admins: Prisma.$AdminPayload<ExtArgs>[]
      announcements: Prisma.$AnnouncementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      academyId: number
      academyName: string
      academyPhone: string | null
      academyAddress: string
      createdAt: Date
      academyMainImage: string | null
    }, ExtArgs["result"]["academy"]>
    composites: {}
  }

  type AcademyGetPayload<S extends boolean | null | undefined | AcademyDefaultArgs> = $Result.GetResult<Prisma.$AcademyPayload, S>

  type AcademyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AcademyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AcademyCountAggregateInputType | true
    }

  export interface AcademyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Academy'], meta: { name: 'Academy' } }
    /**
     * Find zero or one Academy that matches the filter.
     * @param {AcademyFindUniqueArgs} args - Arguments to find a Academy
     * @example
     * // Get one Academy
     * const academy = await prisma.academy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AcademyFindUniqueArgs>(args: SelectSubset<T, AcademyFindUniqueArgs<ExtArgs>>): Prisma__AcademyClient<$Result.GetResult<Prisma.$AcademyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Academy that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AcademyFindUniqueOrThrowArgs} args - Arguments to find a Academy
     * @example
     * // Get one Academy
     * const academy = await prisma.academy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AcademyFindUniqueOrThrowArgs>(args: SelectSubset<T, AcademyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AcademyClient<$Result.GetResult<Prisma.$AcademyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Academy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademyFindFirstArgs} args - Arguments to find a Academy
     * @example
     * // Get one Academy
     * const academy = await prisma.academy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AcademyFindFirstArgs>(args?: SelectSubset<T, AcademyFindFirstArgs<ExtArgs>>): Prisma__AcademyClient<$Result.GetResult<Prisma.$AcademyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Academy that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademyFindFirstOrThrowArgs} args - Arguments to find a Academy
     * @example
     * // Get one Academy
     * const academy = await prisma.academy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AcademyFindFirstOrThrowArgs>(args?: SelectSubset<T, AcademyFindFirstOrThrowArgs<ExtArgs>>): Prisma__AcademyClient<$Result.GetResult<Prisma.$AcademyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Academies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Academies
     * const academies = await prisma.academy.findMany()
     * 
     * // Get first 10 Academies
     * const academies = await prisma.academy.findMany({ take: 10 })
     * 
     * // Only select the `academyId`
     * const academyWithAcademyIdOnly = await prisma.academy.findMany({ select: { academyId: true } })
     * 
     */
    findMany<T extends AcademyFindManyArgs>(args?: SelectSubset<T, AcademyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Academy.
     * @param {AcademyCreateArgs} args - Arguments to create a Academy.
     * @example
     * // Create one Academy
     * const Academy = await prisma.academy.create({
     *   data: {
     *     // ... data to create a Academy
     *   }
     * })
     * 
     */
    create<T extends AcademyCreateArgs>(args: SelectSubset<T, AcademyCreateArgs<ExtArgs>>): Prisma__AcademyClient<$Result.GetResult<Prisma.$AcademyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Academies.
     * @param {AcademyCreateManyArgs} args - Arguments to create many Academies.
     * @example
     * // Create many Academies
     * const academy = await prisma.academy.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AcademyCreateManyArgs>(args?: SelectSubset<T, AcademyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Academy.
     * @param {AcademyDeleteArgs} args - Arguments to delete one Academy.
     * @example
     * // Delete one Academy
     * const Academy = await prisma.academy.delete({
     *   where: {
     *     // ... filter to delete one Academy
     *   }
     * })
     * 
     */
    delete<T extends AcademyDeleteArgs>(args: SelectSubset<T, AcademyDeleteArgs<ExtArgs>>): Prisma__AcademyClient<$Result.GetResult<Prisma.$AcademyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Academy.
     * @param {AcademyUpdateArgs} args - Arguments to update one Academy.
     * @example
     * // Update one Academy
     * const academy = await prisma.academy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AcademyUpdateArgs>(args: SelectSubset<T, AcademyUpdateArgs<ExtArgs>>): Prisma__AcademyClient<$Result.GetResult<Prisma.$AcademyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Academies.
     * @param {AcademyDeleteManyArgs} args - Arguments to filter Academies to delete.
     * @example
     * // Delete a few Academies
     * const { count } = await prisma.academy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AcademyDeleteManyArgs>(args?: SelectSubset<T, AcademyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Academies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Academies
     * const academy = await prisma.academy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AcademyUpdateManyArgs>(args: SelectSubset<T, AcademyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Academy.
     * @param {AcademyUpsertArgs} args - Arguments to update or create a Academy.
     * @example
     * // Update or create a Academy
     * const academy = await prisma.academy.upsert({
     *   create: {
     *     // ... data to create a Academy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Academy we want to update
     *   }
     * })
     */
    upsert<T extends AcademyUpsertArgs>(args: SelectSubset<T, AcademyUpsertArgs<ExtArgs>>): Prisma__AcademyClient<$Result.GetResult<Prisma.$AcademyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Academies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademyCountArgs} args - Arguments to filter Academies to count.
     * @example
     * // Count the number of Academies
     * const count = await prisma.academy.count({
     *   where: {
     *     // ... the filter for the Academies we want to count
     *   }
     * })
    **/
    count<T extends AcademyCountArgs>(
      args?: Subset<T, AcademyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AcademyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Academy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AcademyAggregateArgs>(args: Subset<T, AcademyAggregateArgs>): Prisma.PrismaPromise<GetAcademyAggregateType<T>>

    /**
     * Group by Academy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademyGroupByArgs} args - Group by arguments.
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
      T extends AcademyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AcademyGroupByArgs['orderBy'] }
        : { orderBy?: AcademyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AcademyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcademyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Academy model
   */
  readonly fields: AcademyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Academy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AcademyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    images<T extends Academy$imagesArgs<ExtArgs> = {}>(args?: Subset<T, Academy$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademyImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    students<T extends Academy$studentsArgs<ExtArgs> = {}>(args?: Subset<T, Academy$studentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    admins<T extends Academy$adminsArgs<ExtArgs> = {}>(args?: Subset<T, Academy$adminsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    announcements<T extends Academy$announcementsArgs<ExtArgs> = {}>(args?: Subset<T, Academy$announcementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Academy model
   */
  interface AcademyFieldRefs {
    readonly academyId: FieldRef<"Academy", 'Int'>
    readonly academyName: FieldRef<"Academy", 'String'>
    readonly academyPhone: FieldRef<"Academy", 'String'>
    readonly academyAddress: FieldRef<"Academy", 'String'>
    readonly createdAt: FieldRef<"Academy", 'DateTime'>
    readonly academyMainImage: FieldRef<"Academy", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Academy findUnique
   */
  export type AcademyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Academy
     */
    select?: AcademySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Academy
     */
    omit?: AcademyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademyInclude<ExtArgs> | null
    /**
     * Filter, which Academy to fetch.
     */
    where: AcademyWhereUniqueInput
  }

  /**
   * Academy findUniqueOrThrow
   */
  export type AcademyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Academy
     */
    select?: AcademySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Academy
     */
    omit?: AcademyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademyInclude<ExtArgs> | null
    /**
     * Filter, which Academy to fetch.
     */
    where: AcademyWhereUniqueInput
  }

  /**
   * Academy findFirst
   */
  export type AcademyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Academy
     */
    select?: AcademySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Academy
     */
    omit?: AcademyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademyInclude<ExtArgs> | null
    /**
     * Filter, which Academy to fetch.
     */
    where?: AcademyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Academies to fetch.
     */
    orderBy?: AcademyOrderByWithRelationInput | AcademyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Academies.
     */
    cursor?: AcademyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Academies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Academies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Academies.
     */
    distinct?: AcademyScalarFieldEnum | AcademyScalarFieldEnum[]
  }

  /**
   * Academy findFirstOrThrow
   */
  export type AcademyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Academy
     */
    select?: AcademySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Academy
     */
    omit?: AcademyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademyInclude<ExtArgs> | null
    /**
     * Filter, which Academy to fetch.
     */
    where?: AcademyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Academies to fetch.
     */
    orderBy?: AcademyOrderByWithRelationInput | AcademyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Academies.
     */
    cursor?: AcademyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Academies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Academies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Academies.
     */
    distinct?: AcademyScalarFieldEnum | AcademyScalarFieldEnum[]
  }

  /**
   * Academy findMany
   */
  export type AcademyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Academy
     */
    select?: AcademySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Academy
     */
    omit?: AcademyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademyInclude<ExtArgs> | null
    /**
     * Filter, which Academies to fetch.
     */
    where?: AcademyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Academies to fetch.
     */
    orderBy?: AcademyOrderByWithRelationInput | AcademyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Academies.
     */
    cursor?: AcademyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Academies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Academies.
     */
    skip?: number
    distinct?: AcademyScalarFieldEnum | AcademyScalarFieldEnum[]
  }

  /**
   * Academy create
   */
  export type AcademyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Academy
     */
    select?: AcademySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Academy
     */
    omit?: AcademyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademyInclude<ExtArgs> | null
    /**
     * The data needed to create a Academy.
     */
    data: XOR<AcademyCreateInput, AcademyUncheckedCreateInput>
  }

  /**
   * Academy createMany
   */
  export type AcademyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Academies.
     */
    data: AcademyCreateManyInput | AcademyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Academy update
   */
  export type AcademyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Academy
     */
    select?: AcademySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Academy
     */
    omit?: AcademyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademyInclude<ExtArgs> | null
    /**
     * The data needed to update a Academy.
     */
    data: XOR<AcademyUpdateInput, AcademyUncheckedUpdateInput>
    /**
     * Choose, which Academy to update.
     */
    where: AcademyWhereUniqueInput
  }

  /**
   * Academy updateMany
   */
  export type AcademyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Academies.
     */
    data: XOR<AcademyUpdateManyMutationInput, AcademyUncheckedUpdateManyInput>
    /**
     * Filter which Academies to update
     */
    where?: AcademyWhereInput
    /**
     * Limit how many Academies to update.
     */
    limit?: number
  }

  /**
   * Academy upsert
   */
  export type AcademyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Academy
     */
    select?: AcademySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Academy
     */
    omit?: AcademyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademyInclude<ExtArgs> | null
    /**
     * The filter to search for the Academy to update in case it exists.
     */
    where: AcademyWhereUniqueInput
    /**
     * In case the Academy found by the `where` argument doesn't exist, create a new Academy with this data.
     */
    create: XOR<AcademyCreateInput, AcademyUncheckedCreateInput>
    /**
     * In case the Academy was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AcademyUpdateInput, AcademyUncheckedUpdateInput>
  }

  /**
   * Academy delete
   */
  export type AcademyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Academy
     */
    select?: AcademySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Academy
     */
    omit?: AcademyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademyInclude<ExtArgs> | null
    /**
     * Filter which Academy to delete.
     */
    where: AcademyWhereUniqueInput
  }

  /**
   * Academy deleteMany
   */
  export type AcademyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Academies to delete
     */
    where?: AcademyWhereInput
    /**
     * Limit how many Academies to delete.
     */
    limit?: number
  }

  /**
   * Academy.images
   */
  export type Academy$imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademyImage
     */
    select?: AcademyImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademyImage
     */
    omit?: AcademyImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademyImageInclude<ExtArgs> | null
    where?: AcademyImageWhereInput
    orderBy?: AcademyImageOrderByWithRelationInput | AcademyImageOrderByWithRelationInput[]
    cursor?: AcademyImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AcademyImageScalarFieldEnum | AcademyImageScalarFieldEnum[]
  }

  /**
   * Academy.students
   */
  export type Academy$studentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    cursor?: StudentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Academy.admins
   */
  export type Academy$adminsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    cursor?: AdminWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Academy.announcements
   */
  export type Academy$announcementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    where?: AnnouncementWhereInput
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    cursor?: AnnouncementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Academy without action
   */
  export type AcademyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Academy
     */
    select?: AcademySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Academy
     */
    omit?: AcademyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademyInclude<ExtArgs> | null
  }


  /**
   * Model AcademyImage
   */

  export type AggregateAcademyImage = {
    _count: AcademyImageCountAggregateOutputType | null
    _avg: AcademyImageAvgAggregateOutputType | null
    _sum: AcademyImageSumAggregateOutputType | null
    _min: AcademyImageMinAggregateOutputType | null
    _max: AcademyImageMaxAggregateOutputType | null
  }

  export type AcademyImageAvgAggregateOutputType = {
    academyImageId: number | null
    academyId: number | null
  }

  export type AcademyImageSumAggregateOutputType = {
    academyImageId: number | null
    academyId: number | null
  }

  export type AcademyImageMinAggregateOutputType = {
    academyImageId: number | null
    academyImageUrl: string | null
    academyId: number | null
    createdAt: Date | null
    academyImageName: string | null
  }

  export type AcademyImageMaxAggregateOutputType = {
    academyImageId: number | null
    academyImageUrl: string | null
    academyId: number | null
    createdAt: Date | null
    academyImageName: string | null
  }

  export type AcademyImageCountAggregateOutputType = {
    academyImageId: number
    academyImageUrl: number
    academyId: number
    createdAt: number
    academyImageName: number
    _all: number
  }


  export type AcademyImageAvgAggregateInputType = {
    academyImageId?: true
    academyId?: true
  }

  export type AcademyImageSumAggregateInputType = {
    academyImageId?: true
    academyId?: true
  }

  export type AcademyImageMinAggregateInputType = {
    academyImageId?: true
    academyImageUrl?: true
    academyId?: true
    createdAt?: true
    academyImageName?: true
  }

  export type AcademyImageMaxAggregateInputType = {
    academyImageId?: true
    academyImageUrl?: true
    academyId?: true
    createdAt?: true
    academyImageName?: true
  }

  export type AcademyImageCountAggregateInputType = {
    academyImageId?: true
    academyImageUrl?: true
    academyId?: true
    createdAt?: true
    academyImageName?: true
    _all?: true
  }

  export type AcademyImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcademyImage to aggregate.
     */
    where?: AcademyImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademyImages to fetch.
     */
    orderBy?: AcademyImageOrderByWithRelationInput | AcademyImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AcademyImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademyImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademyImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AcademyImages
    **/
    _count?: true | AcademyImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AcademyImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AcademyImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AcademyImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AcademyImageMaxAggregateInputType
  }

  export type GetAcademyImageAggregateType<T extends AcademyImageAggregateArgs> = {
        [P in keyof T & keyof AggregateAcademyImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcademyImage[P]>
      : GetScalarType<T[P], AggregateAcademyImage[P]>
  }




  export type AcademyImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcademyImageWhereInput
    orderBy?: AcademyImageOrderByWithAggregationInput | AcademyImageOrderByWithAggregationInput[]
    by: AcademyImageScalarFieldEnum[] | AcademyImageScalarFieldEnum
    having?: AcademyImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AcademyImageCountAggregateInputType | true
    _avg?: AcademyImageAvgAggregateInputType
    _sum?: AcademyImageSumAggregateInputType
    _min?: AcademyImageMinAggregateInputType
    _max?: AcademyImageMaxAggregateInputType
  }

  export type AcademyImageGroupByOutputType = {
    academyImageId: number
    academyImageUrl: string
    academyId: number
    createdAt: Date
    academyImageName: string | null
    _count: AcademyImageCountAggregateOutputType | null
    _avg: AcademyImageAvgAggregateOutputType | null
    _sum: AcademyImageSumAggregateOutputType | null
    _min: AcademyImageMinAggregateOutputType | null
    _max: AcademyImageMaxAggregateOutputType | null
  }

  type GetAcademyImageGroupByPayload<T extends AcademyImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AcademyImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AcademyImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AcademyImageGroupByOutputType[P]>
            : GetScalarType<T[P], AcademyImageGroupByOutputType[P]>
        }
      >
    >


  export type AcademyImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    academyImageId?: boolean
    academyImageUrl?: boolean
    academyId?: boolean
    createdAt?: boolean
    academyImageName?: boolean
    academy?: boolean | AcademyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academyImage"]>



  export type AcademyImageSelectScalar = {
    academyImageId?: boolean
    academyImageUrl?: boolean
    academyId?: boolean
    createdAt?: boolean
    academyImageName?: boolean
  }

  export type AcademyImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"academyImageId" | "academyImageUrl" | "academyId" | "createdAt" | "academyImageName", ExtArgs["result"]["academyImage"]>
  export type AcademyImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    academy?: boolean | AcademyDefaultArgs<ExtArgs>
  }

  export type $AcademyImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AcademyImage"
    objects: {
      academy: Prisma.$AcademyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      academyImageId: number
      academyImageUrl: string
      academyId: number
      createdAt: Date
      academyImageName: string | null
    }, ExtArgs["result"]["academyImage"]>
    composites: {}
  }

  type AcademyImageGetPayload<S extends boolean | null | undefined | AcademyImageDefaultArgs> = $Result.GetResult<Prisma.$AcademyImagePayload, S>

  type AcademyImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AcademyImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AcademyImageCountAggregateInputType | true
    }

  export interface AcademyImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AcademyImage'], meta: { name: 'AcademyImage' } }
    /**
     * Find zero or one AcademyImage that matches the filter.
     * @param {AcademyImageFindUniqueArgs} args - Arguments to find a AcademyImage
     * @example
     * // Get one AcademyImage
     * const academyImage = await prisma.academyImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AcademyImageFindUniqueArgs>(args: SelectSubset<T, AcademyImageFindUniqueArgs<ExtArgs>>): Prisma__AcademyImageClient<$Result.GetResult<Prisma.$AcademyImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AcademyImage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AcademyImageFindUniqueOrThrowArgs} args - Arguments to find a AcademyImage
     * @example
     * // Get one AcademyImage
     * const academyImage = await prisma.academyImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AcademyImageFindUniqueOrThrowArgs>(args: SelectSubset<T, AcademyImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AcademyImageClient<$Result.GetResult<Prisma.$AcademyImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcademyImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademyImageFindFirstArgs} args - Arguments to find a AcademyImage
     * @example
     * // Get one AcademyImage
     * const academyImage = await prisma.academyImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AcademyImageFindFirstArgs>(args?: SelectSubset<T, AcademyImageFindFirstArgs<ExtArgs>>): Prisma__AcademyImageClient<$Result.GetResult<Prisma.$AcademyImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcademyImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademyImageFindFirstOrThrowArgs} args - Arguments to find a AcademyImage
     * @example
     * // Get one AcademyImage
     * const academyImage = await prisma.academyImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AcademyImageFindFirstOrThrowArgs>(args?: SelectSubset<T, AcademyImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__AcademyImageClient<$Result.GetResult<Prisma.$AcademyImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AcademyImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademyImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AcademyImages
     * const academyImages = await prisma.academyImage.findMany()
     * 
     * // Get first 10 AcademyImages
     * const academyImages = await prisma.academyImage.findMany({ take: 10 })
     * 
     * // Only select the `academyImageId`
     * const academyImageWithAcademyImageIdOnly = await prisma.academyImage.findMany({ select: { academyImageId: true } })
     * 
     */
    findMany<T extends AcademyImageFindManyArgs>(args?: SelectSubset<T, AcademyImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademyImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AcademyImage.
     * @param {AcademyImageCreateArgs} args - Arguments to create a AcademyImage.
     * @example
     * // Create one AcademyImage
     * const AcademyImage = await prisma.academyImage.create({
     *   data: {
     *     // ... data to create a AcademyImage
     *   }
     * })
     * 
     */
    create<T extends AcademyImageCreateArgs>(args: SelectSubset<T, AcademyImageCreateArgs<ExtArgs>>): Prisma__AcademyImageClient<$Result.GetResult<Prisma.$AcademyImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AcademyImages.
     * @param {AcademyImageCreateManyArgs} args - Arguments to create many AcademyImages.
     * @example
     * // Create many AcademyImages
     * const academyImage = await prisma.academyImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AcademyImageCreateManyArgs>(args?: SelectSubset<T, AcademyImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AcademyImage.
     * @param {AcademyImageDeleteArgs} args - Arguments to delete one AcademyImage.
     * @example
     * // Delete one AcademyImage
     * const AcademyImage = await prisma.academyImage.delete({
     *   where: {
     *     // ... filter to delete one AcademyImage
     *   }
     * })
     * 
     */
    delete<T extends AcademyImageDeleteArgs>(args: SelectSubset<T, AcademyImageDeleteArgs<ExtArgs>>): Prisma__AcademyImageClient<$Result.GetResult<Prisma.$AcademyImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AcademyImage.
     * @param {AcademyImageUpdateArgs} args - Arguments to update one AcademyImage.
     * @example
     * // Update one AcademyImage
     * const academyImage = await prisma.academyImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AcademyImageUpdateArgs>(args: SelectSubset<T, AcademyImageUpdateArgs<ExtArgs>>): Prisma__AcademyImageClient<$Result.GetResult<Prisma.$AcademyImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AcademyImages.
     * @param {AcademyImageDeleteManyArgs} args - Arguments to filter AcademyImages to delete.
     * @example
     * // Delete a few AcademyImages
     * const { count } = await prisma.academyImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AcademyImageDeleteManyArgs>(args?: SelectSubset<T, AcademyImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcademyImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademyImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AcademyImages
     * const academyImage = await prisma.academyImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AcademyImageUpdateManyArgs>(args: SelectSubset<T, AcademyImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AcademyImage.
     * @param {AcademyImageUpsertArgs} args - Arguments to update or create a AcademyImage.
     * @example
     * // Update or create a AcademyImage
     * const academyImage = await prisma.academyImage.upsert({
     *   create: {
     *     // ... data to create a AcademyImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AcademyImage we want to update
     *   }
     * })
     */
    upsert<T extends AcademyImageUpsertArgs>(args: SelectSubset<T, AcademyImageUpsertArgs<ExtArgs>>): Prisma__AcademyImageClient<$Result.GetResult<Prisma.$AcademyImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AcademyImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademyImageCountArgs} args - Arguments to filter AcademyImages to count.
     * @example
     * // Count the number of AcademyImages
     * const count = await prisma.academyImage.count({
     *   where: {
     *     // ... the filter for the AcademyImages we want to count
     *   }
     * })
    **/
    count<T extends AcademyImageCountArgs>(
      args?: Subset<T, AcademyImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AcademyImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AcademyImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademyImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AcademyImageAggregateArgs>(args: Subset<T, AcademyImageAggregateArgs>): Prisma.PrismaPromise<GetAcademyImageAggregateType<T>>

    /**
     * Group by AcademyImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademyImageGroupByArgs} args - Group by arguments.
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
      T extends AcademyImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AcademyImageGroupByArgs['orderBy'] }
        : { orderBy?: AcademyImageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AcademyImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcademyImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AcademyImage model
   */
  readonly fields: AcademyImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AcademyImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AcademyImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    academy<T extends AcademyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AcademyDefaultArgs<ExtArgs>>): Prisma__AcademyClient<$Result.GetResult<Prisma.$AcademyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AcademyImage model
   */
  interface AcademyImageFieldRefs {
    readonly academyImageId: FieldRef<"AcademyImage", 'Int'>
    readonly academyImageUrl: FieldRef<"AcademyImage", 'String'>
    readonly academyId: FieldRef<"AcademyImage", 'Int'>
    readonly createdAt: FieldRef<"AcademyImage", 'DateTime'>
    readonly academyImageName: FieldRef<"AcademyImage", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AcademyImage findUnique
   */
  export type AcademyImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademyImage
     */
    select?: AcademyImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademyImage
     */
    omit?: AcademyImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademyImageInclude<ExtArgs> | null
    /**
     * Filter, which AcademyImage to fetch.
     */
    where: AcademyImageWhereUniqueInput
  }

  /**
   * AcademyImage findUniqueOrThrow
   */
  export type AcademyImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademyImage
     */
    select?: AcademyImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademyImage
     */
    omit?: AcademyImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademyImageInclude<ExtArgs> | null
    /**
     * Filter, which AcademyImage to fetch.
     */
    where: AcademyImageWhereUniqueInput
  }

  /**
   * AcademyImage findFirst
   */
  export type AcademyImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademyImage
     */
    select?: AcademyImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademyImage
     */
    omit?: AcademyImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademyImageInclude<ExtArgs> | null
    /**
     * Filter, which AcademyImage to fetch.
     */
    where?: AcademyImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademyImages to fetch.
     */
    orderBy?: AcademyImageOrderByWithRelationInput | AcademyImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcademyImages.
     */
    cursor?: AcademyImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademyImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademyImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcademyImages.
     */
    distinct?: AcademyImageScalarFieldEnum | AcademyImageScalarFieldEnum[]
  }

  /**
   * AcademyImage findFirstOrThrow
   */
  export type AcademyImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademyImage
     */
    select?: AcademyImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademyImage
     */
    omit?: AcademyImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademyImageInclude<ExtArgs> | null
    /**
     * Filter, which AcademyImage to fetch.
     */
    where?: AcademyImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademyImages to fetch.
     */
    orderBy?: AcademyImageOrderByWithRelationInput | AcademyImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcademyImages.
     */
    cursor?: AcademyImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademyImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademyImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcademyImages.
     */
    distinct?: AcademyImageScalarFieldEnum | AcademyImageScalarFieldEnum[]
  }

  /**
   * AcademyImage findMany
   */
  export type AcademyImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademyImage
     */
    select?: AcademyImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademyImage
     */
    omit?: AcademyImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademyImageInclude<ExtArgs> | null
    /**
     * Filter, which AcademyImages to fetch.
     */
    where?: AcademyImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademyImages to fetch.
     */
    orderBy?: AcademyImageOrderByWithRelationInput | AcademyImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AcademyImages.
     */
    cursor?: AcademyImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademyImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademyImages.
     */
    skip?: number
    distinct?: AcademyImageScalarFieldEnum | AcademyImageScalarFieldEnum[]
  }

  /**
   * AcademyImage create
   */
  export type AcademyImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademyImage
     */
    select?: AcademyImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademyImage
     */
    omit?: AcademyImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademyImageInclude<ExtArgs> | null
    /**
     * The data needed to create a AcademyImage.
     */
    data: XOR<AcademyImageCreateInput, AcademyImageUncheckedCreateInput>
  }

  /**
   * AcademyImage createMany
   */
  export type AcademyImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AcademyImages.
     */
    data: AcademyImageCreateManyInput | AcademyImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AcademyImage update
   */
  export type AcademyImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademyImage
     */
    select?: AcademyImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademyImage
     */
    omit?: AcademyImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademyImageInclude<ExtArgs> | null
    /**
     * The data needed to update a AcademyImage.
     */
    data: XOR<AcademyImageUpdateInput, AcademyImageUncheckedUpdateInput>
    /**
     * Choose, which AcademyImage to update.
     */
    where: AcademyImageWhereUniqueInput
  }

  /**
   * AcademyImage updateMany
   */
  export type AcademyImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AcademyImages.
     */
    data: XOR<AcademyImageUpdateManyMutationInput, AcademyImageUncheckedUpdateManyInput>
    /**
     * Filter which AcademyImages to update
     */
    where?: AcademyImageWhereInput
    /**
     * Limit how many AcademyImages to update.
     */
    limit?: number
  }

  /**
   * AcademyImage upsert
   */
  export type AcademyImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademyImage
     */
    select?: AcademyImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademyImage
     */
    omit?: AcademyImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademyImageInclude<ExtArgs> | null
    /**
     * The filter to search for the AcademyImage to update in case it exists.
     */
    where: AcademyImageWhereUniqueInput
    /**
     * In case the AcademyImage found by the `where` argument doesn't exist, create a new AcademyImage with this data.
     */
    create: XOR<AcademyImageCreateInput, AcademyImageUncheckedCreateInput>
    /**
     * In case the AcademyImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AcademyImageUpdateInput, AcademyImageUncheckedUpdateInput>
  }

  /**
   * AcademyImage delete
   */
  export type AcademyImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademyImage
     */
    select?: AcademyImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademyImage
     */
    omit?: AcademyImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademyImageInclude<ExtArgs> | null
    /**
     * Filter which AcademyImage to delete.
     */
    where: AcademyImageWhereUniqueInput
  }

  /**
   * AcademyImage deleteMany
   */
  export type AcademyImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcademyImages to delete
     */
    where?: AcademyImageWhereInput
    /**
     * Limit how many AcademyImages to delete.
     */
    limit?: number
  }

  /**
   * AcademyImage without action
   */
  export type AcademyImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademyImage
     */
    select?: AcademyImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademyImage
     */
    omit?: AcademyImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademyImageInclude<ExtArgs> | null
  }


  /**
   * Model Announcement
   */

  export type AggregateAnnouncement = {
    _count: AnnouncementCountAggregateOutputType | null
    _avg: AnnouncementAvgAggregateOutputType | null
    _sum: AnnouncementSumAggregateOutputType | null
    _min: AnnouncementMinAggregateOutputType | null
    _max: AnnouncementMaxAggregateOutputType | null
  }

  export type AnnouncementAvgAggregateOutputType = {
    announcementId: number | null
    authorId: number | null
  }

  export type AnnouncementSumAggregateOutputType = {
    announcementId: number | null
    authorId: number | null
  }

  export type AnnouncementMinAggregateOutputType = {
    announcementId: number | null
    title: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    authorId: number | null
    isItAssetAnnouncement: boolean | null
    isItImportantAnnouncement: boolean | null
  }

  export type AnnouncementMaxAggregateOutputType = {
    announcementId: number | null
    title: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    authorId: number | null
    isItAssetAnnouncement: boolean | null
    isItImportantAnnouncement: boolean | null
  }

  export type AnnouncementCountAggregateOutputType = {
    announcementId: number
    title: number
    content: number
    createdAt: number
    updatedAt: number
    authorId: number
    isItAssetAnnouncement: number
    isItImportantAnnouncement: number
    _all: number
  }


  export type AnnouncementAvgAggregateInputType = {
    announcementId?: true
    authorId?: true
  }

  export type AnnouncementSumAggregateInputType = {
    announcementId?: true
    authorId?: true
  }

  export type AnnouncementMinAggregateInputType = {
    announcementId?: true
    title?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    authorId?: true
    isItAssetAnnouncement?: true
    isItImportantAnnouncement?: true
  }

  export type AnnouncementMaxAggregateInputType = {
    announcementId?: true
    title?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    authorId?: true
    isItAssetAnnouncement?: true
    isItImportantAnnouncement?: true
  }

  export type AnnouncementCountAggregateInputType = {
    announcementId?: true
    title?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    authorId?: true
    isItAssetAnnouncement?: true
    isItImportantAnnouncement?: true
    _all?: true
  }

  export type AnnouncementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Announcement to aggregate.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Announcements
    **/
    _count?: true | AnnouncementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnnouncementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnnouncementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnnouncementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnnouncementMaxAggregateInputType
  }

  export type GetAnnouncementAggregateType<T extends AnnouncementAggregateArgs> = {
        [P in keyof T & keyof AggregateAnnouncement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnnouncement[P]>
      : GetScalarType<T[P], AggregateAnnouncement[P]>
  }




  export type AnnouncementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnnouncementWhereInput
    orderBy?: AnnouncementOrderByWithAggregationInput | AnnouncementOrderByWithAggregationInput[]
    by: AnnouncementScalarFieldEnum[] | AnnouncementScalarFieldEnum
    having?: AnnouncementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnnouncementCountAggregateInputType | true
    _avg?: AnnouncementAvgAggregateInputType
    _sum?: AnnouncementSumAggregateInputType
    _min?: AnnouncementMinAggregateInputType
    _max?: AnnouncementMaxAggregateInputType
  }

  export type AnnouncementGroupByOutputType = {
    announcementId: number
    title: string
    content: string
    createdAt: Date
    updatedAt: Date
    authorId: number | null
    isItAssetAnnouncement: boolean
    isItImportantAnnouncement: boolean
    _count: AnnouncementCountAggregateOutputType | null
    _avg: AnnouncementAvgAggregateOutputType | null
    _sum: AnnouncementSumAggregateOutputType | null
    _min: AnnouncementMinAggregateOutputType | null
    _max: AnnouncementMaxAggregateOutputType | null
  }

  type GetAnnouncementGroupByPayload<T extends AnnouncementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnnouncementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnnouncementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnnouncementGroupByOutputType[P]>
            : GetScalarType<T[P], AnnouncementGroupByOutputType[P]>
        }
      >
    >


  export type AnnouncementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    announcementId?: boolean
    title?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    authorId?: boolean
    isItAssetAnnouncement?: boolean
    isItImportantAnnouncement?: boolean
    author?: boolean | Announcement$authorArgs<ExtArgs>
    files?: boolean | Announcement$filesArgs<ExtArgs>
    academies?: boolean | Announcement$academiesArgs<ExtArgs>
    _count?: boolean | AnnouncementCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["announcement"]>



  export type AnnouncementSelectScalar = {
    announcementId?: boolean
    title?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    authorId?: boolean
    isItAssetAnnouncement?: boolean
    isItImportantAnnouncement?: boolean
  }

  export type AnnouncementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"announcementId" | "title" | "content" | "createdAt" | "updatedAt" | "authorId" | "isItAssetAnnouncement" | "isItImportantAnnouncement", ExtArgs["result"]["announcement"]>
  export type AnnouncementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | Announcement$authorArgs<ExtArgs>
    files?: boolean | Announcement$filesArgs<ExtArgs>
    academies?: boolean | Announcement$academiesArgs<ExtArgs>
    _count?: boolean | AnnouncementCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AnnouncementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Announcement"
    objects: {
      author: Prisma.$AdminPayload<ExtArgs> | null
      files: Prisma.$AnnouncementFilePayload<ExtArgs>[]
      academies: Prisma.$AcademyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      announcementId: number
      title: string
      content: string
      createdAt: Date
      updatedAt: Date
      authorId: number | null
      isItAssetAnnouncement: boolean
      isItImportantAnnouncement: boolean
    }, ExtArgs["result"]["announcement"]>
    composites: {}
  }

  type AnnouncementGetPayload<S extends boolean | null | undefined | AnnouncementDefaultArgs> = $Result.GetResult<Prisma.$AnnouncementPayload, S>

  type AnnouncementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnnouncementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnnouncementCountAggregateInputType | true
    }

  export interface AnnouncementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Announcement'], meta: { name: 'Announcement' } }
    /**
     * Find zero or one Announcement that matches the filter.
     * @param {AnnouncementFindUniqueArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnnouncementFindUniqueArgs>(args: SelectSubset<T, AnnouncementFindUniqueArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Announcement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnnouncementFindUniqueOrThrowArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnnouncementFindUniqueOrThrowArgs>(args: SelectSubset<T, AnnouncementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Announcement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFindFirstArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnnouncementFindFirstArgs>(args?: SelectSubset<T, AnnouncementFindFirstArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Announcement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFindFirstOrThrowArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnnouncementFindFirstOrThrowArgs>(args?: SelectSubset<T, AnnouncementFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Announcements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Announcements
     * const announcements = await prisma.announcement.findMany()
     * 
     * // Get first 10 Announcements
     * const announcements = await prisma.announcement.findMany({ take: 10 })
     * 
     * // Only select the `announcementId`
     * const announcementWithAnnouncementIdOnly = await prisma.announcement.findMany({ select: { announcementId: true } })
     * 
     */
    findMany<T extends AnnouncementFindManyArgs>(args?: SelectSubset<T, AnnouncementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Announcement.
     * @param {AnnouncementCreateArgs} args - Arguments to create a Announcement.
     * @example
     * // Create one Announcement
     * const Announcement = await prisma.announcement.create({
     *   data: {
     *     // ... data to create a Announcement
     *   }
     * })
     * 
     */
    create<T extends AnnouncementCreateArgs>(args: SelectSubset<T, AnnouncementCreateArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Announcements.
     * @param {AnnouncementCreateManyArgs} args - Arguments to create many Announcements.
     * @example
     * // Create many Announcements
     * const announcement = await prisma.announcement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnnouncementCreateManyArgs>(args?: SelectSubset<T, AnnouncementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Announcement.
     * @param {AnnouncementDeleteArgs} args - Arguments to delete one Announcement.
     * @example
     * // Delete one Announcement
     * const Announcement = await prisma.announcement.delete({
     *   where: {
     *     // ... filter to delete one Announcement
     *   }
     * })
     * 
     */
    delete<T extends AnnouncementDeleteArgs>(args: SelectSubset<T, AnnouncementDeleteArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Announcement.
     * @param {AnnouncementUpdateArgs} args - Arguments to update one Announcement.
     * @example
     * // Update one Announcement
     * const announcement = await prisma.announcement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnnouncementUpdateArgs>(args: SelectSubset<T, AnnouncementUpdateArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Announcements.
     * @param {AnnouncementDeleteManyArgs} args - Arguments to filter Announcements to delete.
     * @example
     * // Delete a few Announcements
     * const { count } = await prisma.announcement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnnouncementDeleteManyArgs>(args?: SelectSubset<T, AnnouncementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Announcements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Announcements
     * const announcement = await prisma.announcement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnnouncementUpdateManyArgs>(args: SelectSubset<T, AnnouncementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Announcement.
     * @param {AnnouncementUpsertArgs} args - Arguments to update or create a Announcement.
     * @example
     * // Update or create a Announcement
     * const announcement = await prisma.announcement.upsert({
     *   create: {
     *     // ... data to create a Announcement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Announcement we want to update
     *   }
     * })
     */
    upsert<T extends AnnouncementUpsertArgs>(args: SelectSubset<T, AnnouncementUpsertArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Announcements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementCountArgs} args - Arguments to filter Announcements to count.
     * @example
     * // Count the number of Announcements
     * const count = await prisma.announcement.count({
     *   where: {
     *     // ... the filter for the Announcements we want to count
     *   }
     * })
    **/
    count<T extends AnnouncementCountArgs>(
      args?: Subset<T, AnnouncementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnnouncementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Announcement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AnnouncementAggregateArgs>(args: Subset<T, AnnouncementAggregateArgs>): Prisma.PrismaPromise<GetAnnouncementAggregateType<T>>

    /**
     * Group by Announcement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementGroupByArgs} args - Group by arguments.
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
      T extends AnnouncementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnnouncementGroupByArgs['orderBy'] }
        : { orderBy?: AnnouncementGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AnnouncementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnnouncementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Announcement model
   */
  readonly fields: AnnouncementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Announcement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnnouncementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends Announcement$authorArgs<ExtArgs> = {}>(args?: Subset<T, Announcement$authorArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    files<T extends Announcement$filesArgs<ExtArgs> = {}>(args?: Subset<T, Announcement$filesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    academies<T extends Announcement$academiesArgs<ExtArgs> = {}>(args?: Subset<T, Announcement$academiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Announcement model
   */
  interface AnnouncementFieldRefs {
    readonly announcementId: FieldRef<"Announcement", 'Int'>
    readonly title: FieldRef<"Announcement", 'String'>
    readonly content: FieldRef<"Announcement", 'String'>
    readonly createdAt: FieldRef<"Announcement", 'DateTime'>
    readonly updatedAt: FieldRef<"Announcement", 'DateTime'>
    readonly authorId: FieldRef<"Announcement", 'Int'>
    readonly isItAssetAnnouncement: FieldRef<"Announcement", 'Boolean'>
    readonly isItImportantAnnouncement: FieldRef<"Announcement", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Announcement findUnique
   */
  export type AnnouncementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement findUniqueOrThrow
   */
  export type AnnouncementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement findFirst
   */
  export type AnnouncementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Announcements.
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Announcements.
     */
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Announcement findFirstOrThrow
   */
  export type AnnouncementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Announcements.
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Announcements.
     */
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Announcement findMany
   */
  export type AnnouncementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter, which Announcements to fetch.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Announcements.
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Announcement create
   */
  export type AnnouncementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * The data needed to create a Announcement.
     */
    data: XOR<AnnouncementCreateInput, AnnouncementUncheckedCreateInput>
  }

  /**
   * Announcement createMany
   */
  export type AnnouncementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Announcements.
     */
    data: AnnouncementCreateManyInput | AnnouncementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Announcement update
   */
  export type AnnouncementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * The data needed to update a Announcement.
     */
    data: XOR<AnnouncementUpdateInput, AnnouncementUncheckedUpdateInput>
    /**
     * Choose, which Announcement to update.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement updateMany
   */
  export type AnnouncementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Announcements.
     */
    data: XOR<AnnouncementUpdateManyMutationInput, AnnouncementUncheckedUpdateManyInput>
    /**
     * Filter which Announcements to update
     */
    where?: AnnouncementWhereInput
    /**
     * Limit how many Announcements to update.
     */
    limit?: number
  }

  /**
   * Announcement upsert
   */
  export type AnnouncementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * The filter to search for the Announcement to update in case it exists.
     */
    where: AnnouncementWhereUniqueInput
    /**
     * In case the Announcement found by the `where` argument doesn't exist, create a new Announcement with this data.
     */
    create: XOR<AnnouncementCreateInput, AnnouncementUncheckedCreateInput>
    /**
     * In case the Announcement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnnouncementUpdateInput, AnnouncementUncheckedUpdateInput>
  }

  /**
   * Announcement delete
   */
  export type AnnouncementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter which Announcement to delete.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement deleteMany
   */
  export type AnnouncementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Announcements to delete
     */
    where?: AnnouncementWhereInput
    /**
     * Limit how many Announcements to delete.
     */
    limit?: number
  }

  /**
   * Announcement.author
   */
  export type Announcement$authorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    where?: AdminWhereInput
  }

  /**
   * Announcement.files
   */
  export type Announcement$filesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementFile
     */
    select?: AnnouncementFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementFile
     */
    omit?: AnnouncementFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementFileInclude<ExtArgs> | null
    where?: AnnouncementFileWhereInput
    orderBy?: AnnouncementFileOrderByWithRelationInput | AnnouncementFileOrderByWithRelationInput[]
    cursor?: AnnouncementFileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnnouncementFileScalarFieldEnum | AnnouncementFileScalarFieldEnum[]
  }

  /**
   * Announcement.academies
   */
  export type Announcement$academiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Academy
     */
    select?: AcademySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Academy
     */
    omit?: AcademyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademyInclude<ExtArgs> | null
    where?: AcademyWhereInput
    orderBy?: AcademyOrderByWithRelationInput | AcademyOrderByWithRelationInput[]
    cursor?: AcademyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AcademyScalarFieldEnum | AcademyScalarFieldEnum[]
  }

  /**
   * Announcement without action
   */
  export type AnnouncementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
  }


  /**
   * Model AnnouncementFile
   */

  export type AggregateAnnouncementFile = {
    _count: AnnouncementFileCountAggregateOutputType | null
    _avg: AnnouncementFileAvgAggregateOutputType | null
    _sum: AnnouncementFileSumAggregateOutputType | null
    _min: AnnouncementFileMinAggregateOutputType | null
    _max: AnnouncementFileMaxAggregateOutputType | null
  }

  export type AnnouncementFileAvgAggregateOutputType = {
    id: number | null
    announcementId: number | null
  }

  export type AnnouncementFileSumAggregateOutputType = {
    id: number | null
    announcementId: number | null
  }

  export type AnnouncementFileMinAggregateOutputType = {
    id: number | null
    key: string | null
    originalName: string | null
    fileType: string | null
    announcementId: number | null
    uploadedAt: Date | null
  }

  export type AnnouncementFileMaxAggregateOutputType = {
    id: number | null
    key: string | null
    originalName: string | null
    fileType: string | null
    announcementId: number | null
    uploadedAt: Date | null
  }

  export type AnnouncementFileCountAggregateOutputType = {
    id: number
    key: number
    originalName: number
    fileType: number
    announcementId: number
    uploadedAt: number
    _all: number
  }


  export type AnnouncementFileAvgAggregateInputType = {
    id?: true
    announcementId?: true
  }

  export type AnnouncementFileSumAggregateInputType = {
    id?: true
    announcementId?: true
  }

  export type AnnouncementFileMinAggregateInputType = {
    id?: true
    key?: true
    originalName?: true
    fileType?: true
    announcementId?: true
    uploadedAt?: true
  }

  export type AnnouncementFileMaxAggregateInputType = {
    id?: true
    key?: true
    originalName?: true
    fileType?: true
    announcementId?: true
    uploadedAt?: true
  }

  export type AnnouncementFileCountAggregateInputType = {
    id?: true
    key?: true
    originalName?: true
    fileType?: true
    announcementId?: true
    uploadedAt?: true
    _all?: true
  }

  export type AnnouncementFileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnnouncementFile to aggregate.
     */
    where?: AnnouncementFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnnouncementFiles to fetch.
     */
    orderBy?: AnnouncementFileOrderByWithRelationInput | AnnouncementFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnnouncementFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnnouncementFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnnouncementFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AnnouncementFiles
    **/
    _count?: true | AnnouncementFileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnnouncementFileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnnouncementFileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnnouncementFileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnnouncementFileMaxAggregateInputType
  }

  export type GetAnnouncementFileAggregateType<T extends AnnouncementFileAggregateArgs> = {
        [P in keyof T & keyof AggregateAnnouncementFile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnnouncementFile[P]>
      : GetScalarType<T[P], AggregateAnnouncementFile[P]>
  }




  export type AnnouncementFileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnnouncementFileWhereInput
    orderBy?: AnnouncementFileOrderByWithAggregationInput | AnnouncementFileOrderByWithAggregationInput[]
    by: AnnouncementFileScalarFieldEnum[] | AnnouncementFileScalarFieldEnum
    having?: AnnouncementFileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnnouncementFileCountAggregateInputType | true
    _avg?: AnnouncementFileAvgAggregateInputType
    _sum?: AnnouncementFileSumAggregateInputType
    _min?: AnnouncementFileMinAggregateInputType
    _max?: AnnouncementFileMaxAggregateInputType
  }

  export type AnnouncementFileGroupByOutputType = {
    id: number
    key: string
    originalName: string
    fileType: string
    announcementId: number
    uploadedAt: Date
    _count: AnnouncementFileCountAggregateOutputType | null
    _avg: AnnouncementFileAvgAggregateOutputType | null
    _sum: AnnouncementFileSumAggregateOutputType | null
    _min: AnnouncementFileMinAggregateOutputType | null
    _max: AnnouncementFileMaxAggregateOutputType | null
  }

  type GetAnnouncementFileGroupByPayload<T extends AnnouncementFileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnnouncementFileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnnouncementFileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnnouncementFileGroupByOutputType[P]>
            : GetScalarType<T[P], AnnouncementFileGroupByOutputType[P]>
        }
      >
    >


  export type AnnouncementFileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    originalName?: boolean
    fileType?: boolean
    announcementId?: boolean
    uploadedAt?: boolean
    announcement?: boolean | AnnouncementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["announcementFile"]>



  export type AnnouncementFileSelectScalar = {
    id?: boolean
    key?: boolean
    originalName?: boolean
    fileType?: boolean
    announcementId?: boolean
    uploadedAt?: boolean
  }

  export type AnnouncementFileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "originalName" | "fileType" | "announcementId" | "uploadedAt", ExtArgs["result"]["announcementFile"]>
  export type AnnouncementFileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    announcement?: boolean | AnnouncementDefaultArgs<ExtArgs>
  }

  export type $AnnouncementFilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AnnouncementFile"
    objects: {
      announcement: Prisma.$AnnouncementPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      key: string
      originalName: string
      fileType: string
      announcementId: number
      uploadedAt: Date
    }, ExtArgs["result"]["announcementFile"]>
    composites: {}
  }

  type AnnouncementFileGetPayload<S extends boolean | null | undefined | AnnouncementFileDefaultArgs> = $Result.GetResult<Prisma.$AnnouncementFilePayload, S>

  type AnnouncementFileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnnouncementFileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnnouncementFileCountAggregateInputType | true
    }

  export interface AnnouncementFileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AnnouncementFile'], meta: { name: 'AnnouncementFile' } }
    /**
     * Find zero or one AnnouncementFile that matches the filter.
     * @param {AnnouncementFileFindUniqueArgs} args - Arguments to find a AnnouncementFile
     * @example
     * // Get one AnnouncementFile
     * const announcementFile = await prisma.announcementFile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnnouncementFileFindUniqueArgs>(args: SelectSubset<T, AnnouncementFileFindUniqueArgs<ExtArgs>>): Prisma__AnnouncementFileClient<$Result.GetResult<Prisma.$AnnouncementFilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AnnouncementFile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnnouncementFileFindUniqueOrThrowArgs} args - Arguments to find a AnnouncementFile
     * @example
     * // Get one AnnouncementFile
     * const announcementFile = await prisma.announcementFile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnnouncementFileFindUniqueOrThrowArgs>(args: SelectSubset<T, AnnouncementFileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnnouncementFileClient<$Result.GetResult<Prisma.$AnnouncementFilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnnouncementFile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFileFindFirstArgs} args - Arguments to find a AnnouncementFile
     * @example
     * // Get one AnnouncementFile
     * const announcementFile = await prisma.announcementFile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnnouncementFileFindFirstArgs>(args?: SelectSubset<T, AnnouncementFileFindFirstArgs<ExtArgs>>): Prisma__AnnouncementFileClient<$Result.GetResult<Prisma.$AnnouncementFilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnnouncementFile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFileFindFirstOrThrowArgs} args - Arguments to find a AnnouncementFile
     * @example
     * // Get one AnnouncementFile
     * const announcementFile = await prisma.announcementFile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnnouncementFileFindFirstOrThrowArgs>(args?: SelectSubset<T, AnnouncementFileFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnnouncementFileClient<$Result.GetResult<Prisma.$AnnouncementFilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AnnouncementFiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AnnouncementFiles
     * const announcementFiles = await prisma.announcementFile.findMany()
     * 
     * // Get first 10 AnnouncementFiles
     * const announcementFiles = await prisma.announcementFile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const announcementFileWithIdOnly = await prisma.announcementFile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnnouncementFileFindManyArgs>(args?: SelectSubset<T, AnnouncementFileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AnnouncementFile.
     * @param {AnnouncementFileCreateArgs} args - Arguments to create a AnnouncementFile.
     * @example
     * // Create one AnnouncementFile
     * const AnnouncementFile = await prisma.announcementFile.create({
     *   data: {
     *     // ... data to create a AnnouncementFile
     *   }
     * })
     * 
     */
    create<T extends AnnouncementFileCreateArgs>(args: SelectSubset<T, AnnouncementFileCreateArgs<ExtArgs>>): Prisma__AnnouncementFileClient<$Result.GetResult<Prisma.$AnnouncementFilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AnnouncementFiles.
     * @param {AnnouncementFileCreateManyArgs} args - Arguments to create many AnnouncementFiles.
     * @example
     * // Create many AnnouncementFiles
     * const announcementFile = await prisma.announcementFile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnnouncementFileCreateManyArgs>(args?: SelectSubset<T, AnnouncementFileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AnnouncementFile.
     * @param {AnnouncementFileDeleteArgs} args - Arguments to delete one AnnouncementFile.
     * @example
     * // Delete one AnnouncementFile
     * const AnnouncementFile = await prisma.announcementFile.delete({
     *   where: {
     *     // ... filter to delete one AnnouncementFile
     *   }
     * })
     * 
     */
    delete<T extends AnnouncementFileDeleteArgs>(args: SelectSubset<T, AnnouncementFileDeleteArgs<ExtArgs>>): Prisma__AnnouncementFileClient<$Result.GetResult<Prisma.$AnnouncementFilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AnnouncementFile.
     * @param {AnnouncementFileUpdateArgs} args - Arguments to update one AnnouncementFile.
     * @example
     * // Update one AnnouncementFile
     * const announcementFile = await prisma.announcementFile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnnouncementFileUpdateArgs>(args: SelectSubset<T, AnnouncementFileUpdateArgs<ExtArgs>>): Prisma__AnnouncementFileClient<$Result.GetResult<Prisma.$AnnouncementFilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AnnouncementFiles.
     * @param {AnnouncementFileDeleteManyArgs} args - Arguments to filter AnnouncementFiles to delete.
     * @example
     * // Delete a few AnnouncementFiles
     * const { count } = await prisma.announcementFile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnnouncementFileDeleteManyArgs>(args?: SelectSubset<T, AnnouncementFileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnnouncementFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AnnouncementFiles
     * const announcementFile = await prisma.announcementFile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnnouncementFileUpdateManyArgs>(args: SelectSubset<T, AnnouncementFileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AnnouncementFile.
     * @param {AnnouncementFileUpsertArgs} args - Arguments to update or create a AnnouncementFile.
     * @example
     * // Update or create a AnnouncementFile
     * const announcementFile = await prisma.announcementFile.upsert({
     *   create: {
     *     // ... data to create a AnnouncementFile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AnnouncementFile we want to update
     *   }
     * })
     */
    upsert<T extends AnnouncementFileUpsertArgs>(args: SelectSubset<T, AnnouncementFileUpsertArgs<ExtArgs>>): Prisma__AnnouncementFileClient<$Result.GetResult<Prisma.$AnnouncementFilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AnnouncementFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFileCountArgs} args - Arguments to filter AnnouncementFiles to count.
     * @example
     * // Count the number of AnnouncementFiles
     * const count = await prisma.announcementFile.count({
     *   where: {
     *     // ... the filter for the AnnouncementFiles we want to count
     *   }
     * })
    **/
    count<T extends AnnouncementFileCountArgs>(
      args?: Subset<T, AnnouncementFileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnnouncementFileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AnnouncementFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AnnouncementFileAggregateArgs>(args: Subset<T, AnnouncementFileAggregateArgs>): Prisma.PrismaPromise<GetAnnouncementFileAggregateType<T>>

    /**
     * Group by AnnouncementFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFileGroupByArgs} args - Group by arguments.
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
      T extends AnnouncementFileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnnouncementFileGroupByArgs['orderBy'] }
        : { orderBy?: AnnouncementFileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AnnouncementFileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnnouncementFileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AnnouncementFile model
   */
  readonly fields: AnnouncementFileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AnnouncementFile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnnouncementFileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    announcement<T extends AnnouncementDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnnouncementDefaultArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AnnouncementFile model
   */
  interface AnnouncementFileFieldRefs {
    readonly id: FieldRef<"AnnouncementFile", 'Int'>
    readonly key: FieldRef<"AnnouncementFile", 'String'>
    readonly originalName: FieldRef<"AnnouncementFile", 'String'>
    readonly fileType: FieldRef<"AnnouncementFile", 'String'>
    readonly announcementId: FieldRef<"AnnouncementFile", 'Int'>
    readonly uploadedAt: FieldRef<"AnnouncementFile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AnnouncementFile findUnique
   */
  export type AnnouncementFileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementFile
     */
    select?: AnnouncementFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementFile
     */
    omit?: AnnouncementFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementFileInclude<ExtArgs> | null
    /**
     * Filter, which AnnouncementFile to fetch.
     */
    where: AnnouncementFileWhereUniqueInput
  }

  /**
   * AnnouncementFile findUniqueOrThrow
   */
  export type AnnouncementFileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementFile
     */
    select?: AnnouncementFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementFile
     */
    omit?: AnnouncementFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementFileInclude<ExtArgs> | null
    /**
     * Filter, which AnnouncementFile to fetch.
     */
    where: AnnouncementFileWhereUniqueInput
  }

  /**
   * AnnouncementFile findFirst
   */
  export type AnnouncementFileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementFile
     */
    select?: AnnouncementFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementFile
     */
    omit?: AnnouncementFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementFileInclude<ExtArgs> | null
    /**
     * Filter, which AnnouncementFile to fetch.
     */
    where?: AnnouncementFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnnouncementFiles to fetch.
     */
    orderBy?: AnnouncementFileOrderByWithRelationInput | AnnouncementFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnnouncementFiles.
     */
    cursor?: AnnouncementFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnnouncementFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnnouncementFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnnouncementFiles.
     */
    distinct?: AnnouncementFileScalarFieldEnum | AnnouncementFileScalarFieldEnum[]
  }

  /**
   * AnnouncementFile findFirstOrThrow
   */
  export type AnnouncementFileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementFile
     */
    select?: AnnouncementFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementFile
     */
    omit?: AnnouncementFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementFileInclude<ExtArgs> | null
    /**
     * Filter, which AnnouncementFile to fetch.
     */
    where?: AnnouncementFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnnouncementFiles to fetch.
     */
    orderBy?: AnnouncementFileOrderByWithRelationInput | AnnouncementFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnnouncementFiles.
     */
    cursor?: AnnouncementFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnnouncementFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnnouncementFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnnouncementFiles.
     */
    distinct?: AnnouncementFileScalarFieldEnum | AnnouncementFileScalarFieldEnum[]
  }

  /**
   * AnnouncementFile findMany
   */
  export type AnnouncementFileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementFile
     */
    select?: AnnouncementFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementFile
     */
    omit?: AnnouncementFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementFileInclude<ExtArgs> | null
    /**
     * Filter, which AnnouncementFiles to fetch.
     */
    where?: AnnouncementFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnnouncementFiles to fetch.
     */
    orderBy?: AnnouncementFileOrderByWithRelationInput | AnnouncementFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AnnouncementFiles.
     */
    cursor?: AnnouncementFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnnouncementFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnnouncementFiles.
     */
    skip?: number
    distinct?: AnnouncementFileScalarFieldEnum | AnnouncementFileScalarFieldEnum[]
  }

  /**
   * AnnouncementFile create
   */
  export type AnnouncementFileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementFile
     */
    select?: AnnouncementFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementFile
     */
    omit?: AnnouncementFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementFileInclude<ExtArgs> | null
    /**
     * The data needed to create a AnnouncementFile.
     */
    data: XOR<AnnouncementFileCreateInput, AnnouncementFileUncheckedCreateInput>
  }

  /**
   * AnnouncementFile createMany
   */
  export type AnnouncementFileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AnnouncementFiles.
     */
    data: AnnouncementFileCreateManyInput | AnnouncementFileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AnnouncementFile update
   */
  export type AnnouncementFileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementFile
     */
    select?: AnnouncementFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementFile
     */
    omit?: AnnouncementFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementFileInclude<ExtArgs> | null
    /**
     * The data needed to update a AnnouncementFile.
     */
    data: XOR<AnnouncementFileUpdateInput, AnnouncementFileUncheckedUpdateInput>
    /**
     * Choose, which AnnouncementFile to update.
     */
    where: AnnouncementFileWhereUniqueInput
  }

  /**
   * AnnouncementFile updateMany
   */
  export type AnnouncementFileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AnnouncementFiles.
     */
    data: XOR<AnnouncementFileUpdateManyMutationInput, AnnouncementFileUncheckedUpdateManyInput>
    /**
     * Filter which AnnouncementFiles to update
     */
    where?: AnnouncementFileWhereInput
    /**
     * Limit how many AnnouncementFiles to update.
     */
    limit?: number
  }

  /**
   * AnnouncementFile upsert
   */
  export type AnnouncementFileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementFile
     */
    select?: AnnouncementFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementFile
     */
    omit?: AnnouncementFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementFileInclude<ExtArgs> | null
    /**
     * The filter to search for the AnnouncementFile to update in case it exists.
     */
    where: AnnouncementFileWhereUniqueInput
    /**
     * In case the AnnouncementFile found by the `where` argument doesn't exist, create a new AnnouncementFile with this data.
     */
    create: XOR<AnnouncementFileCreateInput, AnnouncementFileUncheckedCreateInput>
    /**
     * In case the AnnouncementFile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnnouncementFileUpdateInput, AnnouncementFileUncheckedUpdateInput>
  }

  /**
   * AnnouncementFile delete
   */
  export type AnnouncementFileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementFile
     */
    select?: AnnouncementFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementFile
     */
    omit?: AnnouncementFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementFileInclude<ExtArgs> | null
    /**
     * Filter which AnnouncementFile to delete.
     */
    where: AnnouncementFileWhereUniqueInput
  }

  /**
   * AnnouncementFile deleteMany
   */
  export type AnnouncementFileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnnouncementFiles to delete
     */
    where?: AnnouncementFileWhereInput
    /**
     * Limit how many AnnouncementFiles to delete.
     */
    limit?: number
  }

  /**
   * AnnouncementFile without action
   */
  export type AnnouncementFileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementFile
     */
    select?: AnnouncementFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementFile
     */
    omit?: AnnouncementFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementFileInclude<ExtArgs> | null
  }


  /**
   * Model QnABoard
   */

  export type AggregateQnABoard = {
    _count: QnABoardCountAggregateOutputType | null
    _avg: QnABoardAvgAggregateOutputType | null
    _sum: QnABoardSumAggregateOutputType | null
    _min: QnABoardMinAggregateOutputType | null
    _max: QnABoardMaxAggregateOutputType | null
  }

  export type QnABoardAvgAggregateOutputType = {
    qnaId: number | null
    qnaUserId: number | null
  }

  export type QnABoardSumAggregateOutputType = {
    qnaId: number | null
    qnaUserId: number | null
  }

  export type QnABoardMinAggregateOutputType = {
    qnaId: number | null
    qnaTitle: string | null
    qnaContent: string | null
    qnaUserId: number | null
    createdAt: Date | null
    updatedAt: Date | null
    qnaImageUrl: string | null
  }

  export type QnABoardMaxAggregateOutputType = {
    qnaId: number | null
    qnaTitle: string | null
    qnaContent: string | null
    qnaUserId: number | null
    createdAt: Date | null
    updatedAt: Date | null
    qnaImageUrl: string | null
  }

  export type QnABoardCountAggregateOutputType = {
    qnaId: number
    qnaTitle: number
    qnaContent: number
    qnaUserId: number
    createdAt: number
    updatedAt: number
    qnaImageUrl: number
    _all: number
  }


  export type QnABoardAvgAggregateInputType = {
    qnaId?: true
    qnaUserId?: true
  }

  export type QnABoardSumAggregateInputType = {
    qnaId?: true
    qnaUserId?: true
  }

  export type QnABoardMinAggregateInputType = {
    qnaId?: true
    qnaTitle?: true
    qnaContent?: true
    qnaUserId?: true
    createdAt?: true
    updatedAt?: true
    qnaImageUrl?: true
  }

  export type QnABoardMaxAggregateInputType = {
    qnaId?: true
    qnaTitle?: true
    qnaContent?: true
    qnaUserId?: true
    createdAt?: true
    updatedAt?: true
    qnaImageUrl?: true
  }

  export type QnABoardCountAggregateInputType = {
    qnaId?: true
    qnaTitle?: true
    qnaContent?: true
    qnaUserId?: true
    createdAt?: true
    updatedAt?: true
    qnaImageUrl?: true
    _all?: true
  }

  export type QnABoardAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QnABoard to aggregate.
     */
    where?: QnABoardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QnABoards to fetch.
     */
    orderBy?: QnABoardOrderByWithRelationInput | QnABoardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QnABoardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QnABoards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QnABoards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QnABoards
    **/
    _count?: true | QnABoardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QnABoardAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QnABoardSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QnABoardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QnABoardMaxAggregateInputType
  }

  export type GetQnABoardAggregateType<T extends QnABoardAggregateArgs> = {
        [P in keyof T & keyof AggregateQnABoard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQnABoard[P]>
      : GetScalarType<T[P], AggregateQnABoard[P]>
  }




  export type QnABoardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QnABoardWhereInput
    orderBy?: QnABoardOrderByWithAggregationInput | QnABoardOrderByWithAggregationInput[]
    by: QnABoardScalarFieldEnum[] | QnABoardScalarFieldEnum
    having?: QnABoardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QnABoardCountAggregateInputType | true
    _avg?: QnABoardAvgAggregateInputType
    _sum?: QnABoardSumAggregateInputType
    _min?: QnABoardMinAggregateInputType
    _max?: QnABoardMaxAggregateInputType
  }

  export type QnABoardGroupByOutputType = {
    qnaId: number
    qnaTitle: string
    qnaContent: string
    qnaUserId: number
    createdAt: Date
    updatedAt: Date
    qnaImageUrl: string | null
    _count: QnABoardCountAggregateOutputType | null
    _avg: QnABoardAvgAggregateOutputType | null
    _sum: QnABoardSumAggregateOutputType | null
    _min: QnABoardMinAggregateOutputType | null
    _max: QnABoardMaxAggregateOutputType | null
  }

  type GetQnABoardGroupByPayload<T extends QnABoardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QnABoardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QnABoardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QnABoardGroupByOutputType[P]>
            : GetScalarType<T[P], QnABoardGroupByOutputType[P]>
        }
      >
    >


  export type QnABoardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    qnaId?: boolean
    qnaTitle?: boolean
    qnaContent?: boolean
    qnaUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    qnaImageUrl?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    comments?: boolean | QnABoard$commentsArgs<ExtArgs>
    _count?: boolean | QnABoardCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["qnABoard"]>



  export type QnABoardSelectScalar = {
    qnaId?: boolean
    qnaTitle?: boolean
    qnaContent?: boolean
    qnaUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    qnaImageUrl?: boolean
  }

  export type QnABoardOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"qnaId" | "qnaTitle" | "qnaContent" | "qnaUserId" | "createdAt" | "updatedAt" | "qnaImageUrl", ExtArgs["result"]["qnABoard"]>
  export type QnABoardInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    comments?: boolean | QnABoard$commentsArgs<ExtArgs>
    _count?: boolean | QnABoardCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $QnABoardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QnABoard"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      comments: Prisma.$QnABoardCommentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      qnaId: number
      qnaTitle: string
      qnaContent: string
      qnaUserId: number
      createdAt: Date
      updatedAt: Date
      qnaImageUrl: string | null
    }, ExtArgs["result"]["qnABoard"]>
    composites: {}
  }

  type QnABoardGetPayload<S extends boolean | null | undefined | QnABoardDefaultArgs> = $Result.GetResult<Prisma.$QnABoardPayload, S>

  type QnABoardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QnABoardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QnABoardCountAggregateInputType | true
    }

  export interface QnABoardDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QnABoard'], meta: { name: 'QnABoard' } }
    /**
     * Find zero or one QnABoard that matches the filter.
     * @param {QnABoardFindUniqueArgs} args - Arguments to find a QnABoard
     * @example
     * // Get one QnABoard
     * const qnABoard = await prisma.qnABoard.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QnABoardFindUniqueArgs>(args: SelectSubset<T, QnABoardFindUniqueArgs<ExtArgs>>): Prisma__QnABoardClient<$Result.GetResult<Prisma.$QnABoardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QnABoard that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QnABoardFindUniqueOrThrowArgs} args - Arguments to find a QnABoard
     * @example
     * // Get one QnABoard
     * const qnABoard = await prisma.qnABoard.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QnABoardFindUniqueOrThrowArgs>(args: SelectSubset<T, QnABoardFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QnABoardClient<$Result.GetResult<Prisma.$QnABoardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QnABoard that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QnABoardFindFirstArgs} args - Arguments to find a QnABoard
     * @example
     * // Get one QnABoard
     * const qnABoard = await prisma.qnABoard.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QnABoardFindFirstArgs>(args?: SelectSubset<T, QnABoardFindFirstArgs<ExtArgs>>): Prisma__QnABoardClient<$Result.GetResult<Prisma.$QnABoardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QnABoard that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QnABoardFindFirstOrThrowArgs} args - Arguments to find a QnABoard
     * @example
     * // Get one QnABoard
     * const qnABoard = await prisma.qnABoard.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QnABoardFindFirstOrThrowArgs>(args?: SelectSubset<T, QnABoardFindFirstOrThrowArgs<ExtArgs>>): Prisma__QnABoardClient<$Result.GetResult<Prisma.$QnABoardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QnABoards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QnABoardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QnABoards
     * const qnABoards = await prisma.qnABoard.findMany()
     * 
     * // Get first 10 QnABoards
     * const qnABoards = await prisma.qnABoard.findMany({ take: 10 })
     * 
     * // Only select the `qnaId`
     * const qnABoardWithQnaIdOnly = await prisma.qnABoard.findMany({ select: { qnaId: true } })
     * 
     */
    findMany<T extends QnABoardFindManyArgs>(args?: SelectSubset<T, QnABoardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QnABoardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QnABoard.
     * @param {QnABoardCreateArgs} args - Arguments to create a QnABoard.
     * @example
     * // Create one QnABoard
     * const QnABoard = await prisma.qnABoard.create({
     *   data: {
     *     // ... data to create a QnABoard
     *   }
     * })
     * 
     */
    create<T extends QnABoardCreateArgs>(args: SelectSubset<T, QnABoardCreateArgs<ExtArgs>>): Prisma__QnABoardClient<$Result.GetResult<Prisma.$QnABoardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QnABoards.
     * @param {QnABoardCreateManyArgs} args - Arguments to create many QnABoards.
     * @example
     * // Create many QnABoards
     * const qnABoard = await prisma.qnABoard.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QnABoardCreateManyArgs>(args?: SelectSubset<T, QnABoardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a QnABoard.
     * @param {QnABoardDeleteArgs} args - Arguments to delete one QnABoard.
     * @example
     * // Delete one QnABoard
     * const QnABoard = await prisma.qnABoard.delete({
     *   where: {
     *     // ... filter to delete one QnABoard
     *   }
     * })
     * 
     */
    delete<T extends QnABoardDeleteArgs>(args: SelectSubset<T, QnABoardDeleteArgs<ExtArgs>>): Prisma__QnABoardClient<$Result.GetResult<Prisma.$QnABoardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QnABoard.
     * @param {QnABoardUpdateArgs} args - Arguments to update one QnABoard.
     * @example
     * // Update one QnABoard
     * const qnABoard = await prisma.qnABoard.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QnABoardUpdateArgs>(args: SelectSubset<T, QnABoardUpdateArgs<ExtArgs>>): Prisma__QnABoardClient<$Result.GetResult<Prisma.$QnABoardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QnABoards.
     * @param {QnABoardDeleteManyArgs} args - Arguments to filter QnABoards to delete.
     * @example
     * // Delete a few QnABoards
     * const { count } = await prisma.qnABoard.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QnABoardDeleteManyArgs>(args?: SelectSubset<T, QnABoardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QnABoards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QnABoardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QnABoards
     * const qnABoard = await prisma.qnABoard.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QnABoardUpdateManyArgs>(args: SelectSubset<T, QnABoardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one QnABoard.
     * @param {QnABoardUpsertArgs} args - Arguments to update or create a QnABoard.
     * @example
     * // Update or create a QnABoard
     * const qnABoard = await prisma.qnABoard.upsert({
     *   create: {
     *     // ... data to create a QnABoard
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QnABoard we want to update
     *   }
     * })
     */
    upsert<T extends QnABoardUpsertArgs>(args: SelectSubset<T, QnABoardUpsertArgs<ExtArgs>>): Prisma__QnABoardClient<$Result.GetResult<Prisma.$QnABoardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QnABoards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QnABoardCountArgs} args - Arguments to filter QnABoards to count.
     * @example
     * // Count the number of QnABoards
     * const count = await prisma.qnABoard.count({
     *   where: {
     *     // ... the filter for the QnABoards we want to count
     *   }
     * })
    **/
    count<T extends QnABoardCountArgs>(
      args?: Subset<T, QnABoardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QnABoardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QnABoard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QnABoardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends QnABoardAggregateArgs>(args: Subset<T, QnABoardAggregateArgs>): Prisma.PrismaPromise<GetQnABoardAggregateType<T>>

    /**
     * Group by QnABoard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QnABoardGroupByArgs} args - Group by arguments.
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
      T extends QnABoardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QnABoardGroupByArgs['orderBy'] }
        : { orderBy?: QnABoardGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, QnABoardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQnABoardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QnABoard model
   */
  readonly fields: QnABoardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QnABoard.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QnABoardClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    comments<T extends QnABoard$commentsArgs<ExtArgs> = {}>(args?: Subset<T, QnABoard$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QnABoardCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the QnABoard model
   */
  interface QnABoardFieldRefs {
    readonly qnaId: FieldRef<"QnABoard", 'Int'>
    readonly qnaTitle: FieldRef<"QnABoard", 'String'>
    readonly qnaContent: FieldRef<"QnABoard", 'String'>
    readonly qnaUserId: FieldRef<"QnABoard", 'Int'>
    readonly createdAt: FieldRef<"QnABoard", 'DateTime'>
    readonly updatedAt: FieldRef<"QnABoard", 'DateTime'>
    readonly qnaImageUrl: FieldRef<"QnABoard", 'String'>
  }
    

  // Custom InputTypes
  /**
   * QnABoard findUnique
   */
  export type QnABoardFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QnABoard
     */
    select?: QnABoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QnABoard
     */
    omit?: QnABoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QnABoardInclude<ExtArgs> | null
    /**
     * Filter, which QnABoard to fetch.
     */
    where: QnABoardWhereUniqueInput
  }

  /**
   * QnABoard findUniqueOrThrow
   */
  export type QnABoardFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QnABoard
     */
    select?: QnABoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QnABoard
     */
    omit?: QnABoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QnABoardInclude<ExtArgs> | null
    /**
     * Filter, which QnABoard to fetch.
     */
    where: QnABoardWhereUniqueInput
  }

  /**
   * QnABoard findFirst
   */
  export type QnABoardFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QnABoard
     */
    select?: QnABoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QnABoard
     */
    omit?: QnABoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QnABoardInclude<ExtArgs> | null
    /**
     * Filter, which QnABoard to fetch.
     */
    where?: QnABoardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QnABoards to fetch.
     */
    orderBy?: QnABoardOrderByWithRelationInput | QnABoardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QnABoards.
     */
    cursor?: QnABoardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QnABoards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QnABoards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QnABoards.
     */
    distinct?: QnABoardScalarFieldEnum | QnABoardScalarFieldEnum[]
  }

  /**
   * QnABoard findFirstOrThrow
   */
  export type QnABoardFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QnABoard
     */
    select?: QnABoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QnABoard
     */
    omit?: QnABoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QnABoardInclude<ExtArgs> | null
    /**
     * Filter, which QnABoard to fetch.
     */
    where?: QnABoardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QnABoards to fetch.
     */
    orderBy?: QnABoardOrderByWithRelationInput | QnABoardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QnABoards.
     */
    cursor?: QnABoardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QnABoards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QnABoards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QnABoards.
     */
    distinct?: QnABoardScalarFieldEnum | QnABoardScalarFieldEnum[]
  }

  /**
   * QnABoard findMany
   */
  export type QnABoardFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QnABoard
     */
    select?: QnABoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QnABoard
     */
    omit?: QnABoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QnABoardInclude<ExtArgs> | null
    /**
     * Filter, which QnABoards to fetch.
     */
    where?: QnABoardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QnABoards to fetch.
     */
    orderBy?: QnABoardOrderByWithRelationInput | QnABoardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QnABoards.
     */
    cursor?: QnABoardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QnABoards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QnABoards.
     */
    skip?: number
    distinct?: QnABoardScalarFieldEnum | QnABoardScalarFieldEnum[]
  }

  /**
   * QnABoard create
   */
  export type QnABoardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QnABoard
     */
    select?: QnABoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QnABoard
     */
    omit?: QnABoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QnABoardInclude<ExtArgs> | null
    /**
     * The data needed to create a QnABoard.
     */
    data: XOR<QnABoardCreateInput, QnABoardUncheckedCreateInput>
  }

  /**
   * QnABoard createMany
   */
  export type QnABoardCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QnABoards.
     */
    data: QnABoardCreateManyInput | QnABoardCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QnABoard update
   */
  export type QnABoardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QnABoard
     */
    select?: QnABoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QnABoard
     */
    omit?: QnABoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QnABoardInclude<ExtArgs> | null
    /**
     * The data needed to update a QnABoard.
     */
    data: XOR<QnABoardUpdateInput, QnABoardUncheckedUpdateInput>
    /**
     * Choose, which QnABoard to update.
     */
    where: QnABoardWhereUniqueInput
  }

  /**
   * QnABoard updateMany
   */
  export type QnABoardUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QnABoards.
     */
    data: XOR<QnABoardUpdateManyMutationInput, QnABoardUncheckedUpdateManyInput>
    /**
     * Filter which QnABoards to update
     */
    where?: QnABoardWhereInput
    /**
     * Limit how many QnABoards to update.
     */
    limit?: number
  }

  /**
   * QnABoard upsert
   */
  export type QnABoardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QnABoard
     */
    select?: QnABoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QnABoard
     */
    omit?: QnABoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QnABoardInclude<ExtArgs> | null
    /**
     * The filter to search for the QnABoard to update in case it exists.
     */
    where: QnABoardWhereUniqueInput
    /**
     * In case the QnABoard found by the `where` argument doesn't exist, create a new QnABoard with this data.
     */
    create: XOR<QnABoardCreateInput, QnABoardUncheckedCreateInput>
    /**
     * In case the QnABoard was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QnABoardUpdateInput, QnABoardUncheckedUpdateInput>
  }

  /**
   * QnABoard delete
   */
  export type QnABoardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QnABoard
     */
    select?: QnABoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QnABoard
     */
    omit?: QnABoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QnABoardInclude<ExtArgs> | null
    /**
     * Filter which QnABoard to delete.
     */
    where: QnABoardWhereUniqueInput
  }

  /**
   * QnABoard deleteMany
   */
  export type QnABoardDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QnABoards to delete
     */
    where?: QnABoardWhereInput
    /**
     * Limit how many QnABoards to delete.
     */
    limit?: number
  }

  /**
   * QnABoard.comments
   */
  export type QnABoard$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QnABoardComment
     */
    select?: QnABoardCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QnABoardComment
     */
    omit?: QnABoardCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QnABoardCommentInclude<ExtArgs> | null
    where?: QnABoardCommentWhereInput
    orderBy?: QnABoardCommentOrderByWithRelationInput | QnABoardCommentOrderByWithRelationInput[]
    cursor?: QnABoardCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QnABoardCommentScalarFieldEnum | QnABoardCommentScalarFieldEnum[]
  }

  /**
   * QnABoard without action
   */
  export type QnABoardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QnABoard
     */
    select?: QnABoardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QnABoard
     */
    omit?: QnABoardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QnABoardInclude<ExtArgs> | null
  }


  /**
   * Model QnABoardComment
   */

  export type AggregateQnABoardComment = {
    _count: QnABoardCommentCountAggregateOutputType | null
    _avg: QnABoardCommentAvgAggregateOutputType | null
    _sum: QnABoardCommentSumAggregateOutputType | null
    _min: QnABoardCommentMinAggregateOutputType | null
    _max: QnABoardCommentMaxAggregateOutputType | null
  }

  export type QnABoardCommentAvgAggregateOutputType = {
    commentId: number | null
    commentUserId: number | null
    qnaId: number | null
  }

  export type QnABoardCommentSumAggregateOutputType = {
    commentId: number | null
    commentUserId: number | null
    qnaId: number | null
  }

  export type QnABoardCommentMinAggregateOutputType = {
    commentId: number | null
    commentContent: string | null
    commentUserId: number | null
    qnaId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QnABoardCommentMaxAggregateOutputType = {
    commentId: number | null
    commentContent: string | null
    commentUserId: number | null
    qnaId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QnABoardCommentCountAggregateOutputType = {
    commentId: number
    commentContent: number
    commentUserId: number
    qnaId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type QnABoardCommentAvgAggregateInputType = {
    commentId?: true
    commentUserId?: true
    qnaId?: true
  }

  export type QnABoardCommentSumAggregateInputType = {
    commentId?: true
    commentUserId?: true
    qnaId?: true
  }

  export type QnABoardCommentMinAggregateInputType = {
    commentId?: true
    commentContent?: true
    commentUserId?: true
    qnaId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QnABoardCommentMaxAggregateInputType = {
    commentId?: true
    commentContent?: true
    commentUserId?: true
    qnaId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QnABoardCommentCountAggregateInputType = {
    commentId?: true
    commentContent?: true
    commentUserId?: true
    qnaId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type QnABoardCommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QnABoardComment to aggregate.
     */
    where?: QnABoardCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QnABoardComments to fetch.
     */
    orderBy?: QnABoardCommentOrderByWithRelationInput | QnABoardCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QnABoardCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QnABoardComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QnABoardComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QnABoardComments
    **/
    _count?: true | QnABoardCommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QnABoardCommentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QnABoardCommentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QnABoardCommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QnABoardCommentMaxAggregateInputType
  }

  export type GetQnABoardCommentAggregateType<T extends QnABoardCommentAggregateArgs> = {
        [P in keyof T & keyof AggregateQnABoardComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQnABoardComment[P]>
      : GetScalarType<T[P], AggregateQnABoardComment[P]>
  }




  export type QnABoardCommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QnABoardCommentWhereInput
    orderBy?: QnABoardCommentOrderByWithAggregationInput | QnABoardCommentOrderByWithAggregationInput[]
    by: QnABoardCommentScalarFieldEnum[] | QnABoardCommentScalarFieldEnum
    having?: QnABoardCommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QnABoardCommentCountAggregateInputType | true
    _avg?: QnABoardCommentAvgAggregateInputType
    _sum?: QnABoardCommentSumAggregateInputType
    _min?: QnABoardCommentMinAggregateInputType
    _max?: QnABoardCommentMaxAggregateInputType
  }

  export type QnABoardCommentGroupByOutputType = {
    commentId: number
    commentContent: string
    commentUserId: number
    qnaId: number
    createdAt: Date
    updatedAt: Date
    _count: QnABoardCommentCountAggregateOutputType | null
    _avg: QnABoardCommentAvgAggregateOutputType | null
    _sum: QnABoardCommentSumAggregateOutputType | null
    _min: QnABoardCommentMinAggregateOutputType | null
    _max: QnABoardCommentMaxAggregateOutputType | null
  }

  type GetQnABoardCommentGroupByPayload<T extends QnABoardCommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QnABoardCommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QnABoardCommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QnABoardCommentGroupByOutputType[P]>
            : GetScalarType<T[P], QnABoardCommentGroupByOutputType[P]>
        }
      >
    >


  export type QnABoardCommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    commentId?: boolean
    commentContent?: boolean
    commentUserId?: boolean
    qnaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    qna?: boolean | QnABoardDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["qnABoardComment"]>



  export type QnABoardCommentSelectScalar = {
    commentId?: boolean
    commentContent?: boolean
    commentUserId?: boolean
    qnaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type QnABoardCommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"commentId" | "commentContent" | "commentUserId" | "qnaId" | "createdAt" | "updatedAt", ExtArgs["result"]["qnABoardComment"]>
  export type QnABoardCommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    qna?: boolean | QnABoardDefaultArgs<ExtArgs>
  }

  export type $QnABoardCommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QnABoardComment"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      qna: Prisma.$QnABoardPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      commentId: number
      commentContent: string
      commentUserId: number
      qnaId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["qnABoardComment"]>
    composites: {}
  }

  type QnABoardCommentGetPayload<S extends boolean | null | undefined | QnABoardCommentDefaultArgs> = $Result.GetResult<Prisma.$QnABoardCommentPayload, S>

  type QnABoardCommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QnABoardCommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QnABoardCommentCountAggregateInputType | true
    }

  export interface QnABoardCommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QnABoardComment'], meta: { name: 'QnABoardComment' } }
    /**
     * Find zero or one QnABoardComment that matches the filter.
     * @param {QnABoardCommentFindUniqueArgs} args - Arguments to find a QnABoardComment
     * @example
     * // Get one QnABoardComment
     * const qnABoardComment = await prisma.qnABoardComment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QnABoardCommentFindUniqueArgs>(args: SelectSubset<T, QnABoardCommentFindUniqueArgs<ExtArgs>>): Prisma__QnABoardCommentClient<$Result.GetResult<Prisma.$QnABoardCommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QnABoardComment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QnABoardCommentFindUniqueOrThrowArgs} args - Arguments to find a QnABoardComment
     * @example
     * // Get one QnABoardComment
     * const qnABoardComment = await prisma.qnABoardComment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QnABoardCommentFindUniqueOrThrowArgs>(args: SelectSubset<T, QnABoardCommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QnABoardCommentClient<$Result.GetResult<Prisma.$QnABoardCommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QnABoardComment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QnABoardCommentFindFirstArgs} args - Arguments to find a QnABoardComment
     * @example
     * // Get one QnABoardComment
     * const qnABoardComment = await prisma.qnABoardComment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QnABoardCommentFindFirstArgs>(args?: SelectSubset<T, QnABoardCommentFindFirstArgs<ExtArgs>>): Prisma__QnABoardCommentClient<$Result.GetResult<Prisma.$QnABoardCommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QnABoardComment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QnABoardCommentFindFirstOrThrowArgs} args - Arguments to find a QnABoardComment
     * @example
     * // Get one QnABoardComment
     * const qnABoardComment = await prisma.qnABoardComment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QnABoardCommentFindFirstOrThrowArgs>(args?: SelectSubset<T, QnABoardCommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__QnABoardCommentClient<$Result.GetResult<Prisma.$QnABoardCommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QnABoardComments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QnABoardCommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QnABoardComments
     * const qnABoardComments = await prisma.qnABoardComment.findMany()
     * 
     * // Get first 10 QnABoardComments
     * const qnABoardComments = await prisma.qnABoardComment.findMany({ take: 10 })
     * 
     * // Only select the `commentId`
     * const qnABoardCommentWithCommentIdOnly = await prisma.qnABoardComment.findMany({ select: { commentId: true } })
     * 
     */
    findMany<T extends QnABoardCommentFindManyArgs>(args?: SelectSubset<T, QnABoardCommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QnABoardCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QnABoardComment.
     * @param {QnABoardCommentCreateArgs} args - Arguments to create a QnABoardComment.
     * @example
     * // Create one QnABoardComment
     * const QnABoardComment = await prisma.qnABoardComment.create({
     *   data: {
     *     // ... data to create a QnABoardComment
     *   }
     * })
     * 
     */
    create<T extends QnABoardCommentCreateArgs>(args: SelectSubset<T, QnABoardCommentCreateArgs<ExtArgs>>): Prisma__QnABoardCommentClient<$Result.GetResult<Prisma.$QnABoardCommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QnABoardComments.
     * @param {QnABoardCommentCreateManyArgs} args - Arguments to create many QnABoardComments.
     * @example
     * // Create many QnABoardComments
     * const qnABoardComment = await prisma.qnABoardComment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QnABoardCommentCreateManyArgs>(args?: SelectSubset<T, QnABoardCommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a QnABoardComment.
     * @param {QnABoardCommentDeleteArgs} args - Arguments to delete one QnABoardComment.
     * @example
     * // Delete one QnABoardComment
     * const QnABoardComment = await prisma.qnABoardComment.delete({
     *   where: {
     *     // ... filter to delete one QnABoardComment
     *   }
     * })
     * 
     */
    delete<T extends QnABoardCommentDeleteArgs>(args: SelectSubset<T, QnABoardCommentDeleteArgs<ExtArgs>>): Prisma__QnABoardCommentClient<$Result.GetResult<Prisma.$QnABoardCommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QnABoardComment.
     * @param {QnABoardCommentUpdateArgs} args - Arguments to update one QnABoardComment.
     * @example
     * // Update one QnABoardComment
     * const qnABoardComment = await prisma.qnABoardComment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QnABoardCommentUpdateArgs>(args: SelectSubset<T, QnABoardCommentUpdateArgs<ExtArgs>>): Prisma__QnABoardCommentClient<$Result.GetResult<Prisma.$QnABoardCommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QnABoardComments.
     * @param {QnABoardCommentDeleteManyArgs} args - Arguments to filter QnABoardComments to delete.
     * @example
     * // Delete a few QnABoardComments
     * const { count } = await prisma.qnABoardComment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QnABoardCommentDeleteManyArgs>(args?: SelectSubset<T, QnABoardCommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QnABoardComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QnABoardCommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QnABoardComments
     * const qnABoardComment = await prisma.qnABoardComment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QnABoardCommentUpdateManyArgs>(args: SelectSubset<T, QnABoardCommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one QnABoardComment.
     * @param {QnABoardCommentUpsertArgs} args - Arguments to update or create a QnABoardComment.
     * @example
     * // Update or create a QnABoardComment
     * const qnABoardComment = await prisma.qnABoardComment.upsert({
     *   create: {
     *     // ... data to create a QnABoardComment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QnABoardComment we want to update
     *   }
     * })
     */
    upsert<T extends QnABoardCommentUpsertArgs>(args: SelectSubset<T, QnABoardCommentUpsertArgs<ExtArgs>>): Prisma__QnABoardCommentClient<$Result.GetResult<Prisma.$QnABoardCommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QnABoardComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QnABoardCommentCountArgs} args - Arguments to filter QnABoardComments to count.
     * @example
     * // Count the number of QnABoardComments
     * const count = await prisma.qnABoardComment.count({
     *   where: {
     *     // ... the filter for the QnABoardComments we want to count
     *   }
     * })
    **/
    count<T extends QnABoardCommentCountArgs>(
      args?: Subset<T, QnABoardCommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QnABoardCommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QnABoardComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QnABoardCommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends QnABoardCommentAggregateArgs>(args: Subset<T, QnABoardCommentAggregateArgs>): Prisma.PrismaPromise<GetQnABoardCommentAggregateType<T>>

    /**
     * Group by QnABoardComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QnABoardCommentGroupByArgs} args - Group by arguments.
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
      T extends QnABoardCommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QnABoardCommentGroupByArgs['orderBy'] }
        : { orderBy?: QnABoardCommentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, QnABoardCommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQnABoardCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QnABoardComment model
   */
  readonly fields: QnABoardCommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QnABoardComment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QnABoardCommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    qna<T extends QnABoardDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QnABoardDefaultArgs<ExtArgs>>): Prisma__QnABoardClient<$Result.GetResult<Prisma.$QnABoardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the QnABoardComment model
   */
  interface QnABoardCommentFieldRefs {
    readonly commentId: FieldRef<"QnABoardComment", 'Int'>
    readonly commentContent: FieldRef<"QnABoardComment", 'String'>
    readonly commentUserId: FieldRef<"QnABoardComment", 'Int'>
    readonly qnaId: FieldRef<"QnABoardComment", 'Int'>
    readonly createdAt: FieldRef<"QnABoardComment", 'DateTime'>
    readonly updatedAt: FieldRef<"QnABoardComment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QnABoardComment findUnique
   */
  export type QnABoardCommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QnABoardComment
     */
    select?: QnABoardCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QnABoardComment
     */
    omit?: QnABoardCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QnABoardCommentInclude<ExtArgs> | null
    /**
     * Filter, which QnABoardComment to fetch.
     */
    where: QnABoardCommentWhereUniqueInput
  }

  /**
   * QnABoardComment findUniqueOrThrow
   */
  export type QnABoardCommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QnABoardComment
     */
    select?: QnABoardCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QnABoardComment
     */
    omit?: QnABoardCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QnABoardCommentInclude<ExtArgs> | null
    /**
     * Filter, which QnABoardComment to fetch.
     */
    where: QnABoardCommentWhereUniqueInput
  }

  /**
   * QnABoardComment findFirst
   */
  export type QnABoardCommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QnABoardComment
     */
    select?: QnABoardCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QnABoardComment
     */
    omit?: QnABoardCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QnABoardCommentInclude<ExtArgs> | null
    /**
     * Filter, which QnABoardComment to fetch.
     */
    where?: QnABoardCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QnABoardComments to fetch.
     */
    orderBy?: QnABoardCommentOrderByWithRelationInput | QnABoardCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QnABoardComments.
     */
    cursor?: QnABoardCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QnABoardComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QnABoardComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QnABoardComments.
     */
    distinct?: QnABoardCommentScalarFieldEnum | QnABoardCommentScalarFieldEnum[]
  }

  /**
   * QnABoardComment findFirstOrThrow
   */
  export type QnABoardCommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QnABoardComment
     */
    select?: QnABoardCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QnABoardComment
     */
    omit?: QnABoardCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QnABoardCommentInclude<ExtArgs> | null
    /**
     * Filter, which QnABoardComment to fetch.
     */
    where?: QnABoardCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QnABoardComments to fetch.
     */
    orderBy?: QnABoardCommentOrderByWithRelationInput | QnABoardCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QnABoardComments.
     */
    cursor?: QnABoardCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QnABoardComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QnABoardComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QnABoardComments.
     */
    distinct?: QnABoardCommentScalarFieldEnum | QnABoardCommentScalarFieldEnum[]
  }

  /**
   * QnABoardComment findMany
   */
  export type QnABoardCommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QnABoardComment
     */
    select?: QnABoardCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QnABoardComment
     */
    omit?: QnABoardCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QnABoardCommentInclude<ExtArgs> | null
    /**
     * Filter, which QnABoardComments to fetch.
     */
    where?: QnABoardCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QnABoardComments to fetch.
     */
    orderBy?: QnABoardCommentOrderByWithRelationInput | QnABoardCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QnABoardComments.
     */
    cursor?: QnABoardCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QnABoardComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QnABoardComments.
     */
    skip?: number
    distinct?: QnABoardCommentScalarFieldEnum | QnABoardCommentScalarFieldEnum[]
  }

  /**
   * QnABoardComment create
   */
  export type QnABoardCommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QnABoardComment
     */
    select?: QnABoardCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QnABoardComment
     */
    omit?: QnABoardCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QnABoardCommentInclude<ExtArgs> | null
    /**
     * The data needed to create a QnABoardComment.
     */
    data: XOR<QnABoardCommentCreateInput, QnABoardCommentUncheckedCreateInput>
  }

  /**
   * QnABoardComment createMany
   */
  export type QnABoardCommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QnABoardComments.
     */
    data: QnABoardCommentCreateManyInput | QnABoardCommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QnABoardComment update
   */
  export type QnABoardCommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QnABoardComment
     */
    select?: QnABoardCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QnABoardComment
     */
    omit?: QnABoardCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QnABoardCommentInclude<ExtArgs> | null
    /**
     * The data needed to update a QnABoardComment.
     */
    data: XOR<QnABoardCommentUpdateInput, QnABoardCommentUncheckedUpdateInput>
    /**
     * Choose, which QnABoardComment to update.
     */
    where: QnABoardCommentWhereUniqueInput
  }

  /**
   * QnABoardComment updateMany
   */
  export type QnABoardCommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QnABoardComments.
     */
    data: XOR<QnABoardCommentUpdateManyMutationInput, QnABoardCommentUncheckedUpdateManyInput>
    /**
     * Filter which QnABoardComments to update
     */
    where?: QnABoardCommentWhereInput
    /**
     * Limit how many QnABoardComments to update.
     */
    limit?: number
  }

  /**
   * QnABoardComment upsert
   */
  export type QnABoardCommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QnABoardComment
     */
    select?: QnABoardCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QnABoardComment
     */
    omit?: QnABoardCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QnABoardCommentInclude<ExtArgs> | null
    /**
     * The filter to search for the QnABoardComment to update in case it exists.
     */
    where: QnABoardCommentWhereUniqueInput
    /**
     * In case the QnABoardComment found by the `where` argument doesn't exist, create a new QnABoardComment with this data.
     */
    create: XOR<QnABoardCommentCreateInput, QnABoardCommentUncheckedCreateInput>
    /**
     * In case the QnABoardComment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QnABoardCommentUpdateInput, QnABoardCommentUncheckedUpdateInput>
  }

  /**
   * QnABoardComment delete
   */
  export type QnABoardCommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QnABoardComment
     */
    select?: QnABoardCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QnABoardComment
     */
    omit?: QnABoardCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QnABoardCommentInclude<ExtArgs> | null
    /**
     * Filter which QnABoardComment to delete.
     */
    where: QnABoardCommentWhereUniqueInput
  }

  /**
   * QnABoardComment deleteMany
   */
  export type QnABoardCommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QnABoardComments to delete
     */
    where?: QnABoardCommentWhereInput
    /**
     * Limit how many QnABoardComments to delete.
     */
    limit?: number
  }

  /**
   * QnABoardComment without action
   */
  export type QnABoardCommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QnABoardComment
     */
    select?: QnABoardCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QnABoardComment
     */
    omit?: QnABoardCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QnABoardCommentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    userId: 'userId',
    userPassword: 'userPassword',
    createdAt: 'createdAt',
    role: 'role',
    memberId: 'memberId'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AdminScalarFieldEnum: {
    adminName: 'adminName',
    adminPhone: 'adminPhone',
    memberId: 'memberId'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const StudentScalarFieldEnum: {
    academyId: 'academyId',
    studentName: 'studentName',
    studentPhone: 'studentPhone',
    studentHighschool: 'studentHighschool',
    studentBirthYear: 'studentBirthYear',
    studentMemo: 'studentMemo',
    memberId: 'memberId'
  };

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const AcademyScalarFieldEnum: {
    academyId: 'academyId',
    academyName: 'academyName',
    academyPhone: 'academyPhone',
    academyAddress: 'academyAddress',
    createdAt: 'createdAt',
    academyMainImage: 'academyMainImage'
  };

  export type AcademyScalarFieldEnum = (typeof AcademyScalarFieldEnum)[keyof typeof AcademyScalarFieldEnum]


  export const AcademyImageScalarFieldEnum: {
    academyImageId: 'academyImageId',
    academyImageUrl: 'academyImageUrl',
    academyId: 'academyId',
    createdAt: 'createdAt',
    academyImageName: 'academyImageName'
  };

  export type AcademyImageScalarFieldEnum = (typeof AcademyImageScalarFieldEnum)[keyof typeof AcademyImageScalarFieldEnum]


  export const AnnouncementScalarFieldEnum: {
    announcementId: 'announcementId',
    title: 'title',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    authorId: 'authorId',
    isItAssetAnnouncement: 'isItAssetAnnouncement',
    isItImportantAnnouncement: 'isItImportantAnnouncement'
  };

  export type AnnouncementScalarFieldEnum = (typeof AnnouncementScalarFieldEnum)[keyof typeof AnnouncementScalarFieldEnum]


  export const AnnouncementFileScalarFieldEnum: {
    id: 'id',
    key: 'key',
    originalName: 'originalName',
    fileType: 'fileType',
    announcementId: 'announcementId',
    uploadedAt: 'uploadedAt'
  };

  export type AnnouncementFileScalarFieldEnum = (typeof AnnouncementFileScalarFieldEnum)[keyof typeof AnnouncementFileScalarFieldEnum]


  export const QnABoardScalarFieldEnum: {
    qnaId: 'qnaId',
    qnaTitle: 'qnaTitle',
    qnaContent: 'qnaContent',
    qnaUserId: 'qnaUserId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    qnaImageUrl: 'qnaImageUrl'
  };

  export type QnABoardScalarFieldEnum = (typeof QnABoardScalarFieldEnum)[keyof typeof QnABoardScalarFieldEnum]


  export const QnABoardCommentScalarFieldEnum: {
    commentId: 'commentId',
    commentContent: 'commentContent',
    commentUserId: 'commentUserId',
    qnaId: 'qnaId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type QnABoardCommentScalarFieldEnum = (typeof QnABoardCommentScalarFieldEnum)[keyof typeof QnABoardCommentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const UserOrderByRelevanceFieldEnum: {
    userId: 'userId',
    userPassword: 'userPassword'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const AdminOrderByRelevanceFieldEnum: {
    adminName: 'adminName',
    adminPhone: 'adminPhone'
  };

  export type AdminOrderByRelevanceFieldEnum = (typeof AdminOrderByRelevanceFieldEnum)[keyof typeof AdminOrderByRelevanceFieldEnum]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const StudentOrderByRelevanceFieldEnum: {
    studentName: 'studentName',
    studentPhone: 'studentPhone',
    studentHighschool: 'studentHighschool',
    studentMemo: 'studentMemo'
  };

  export type StudentOrderByRelevanceFieldEnum = (typeof StudentOrderByRelevanceFieldEnum)[keyof typeof StudentOrderByRelevanceFieldEnum]


  export const AcademyOrderByRelevanceFieldEnum: {
    academyName: 'academyName',
    academyPhone: 'academyPhone',
    academyAddress: 'academyAddress',
    academyMainImage: 'academyMainImage'
  };

  export type AcademyOrderByRelevanceFieldEnum = (typeof AcademyOrderByRelevanceFieldEnum)[keyof typeof AcademyOrderByRelevanceFieldEnum]


  export const AcademyImageOrderByRelevanceFieldEnum: {
    academyImageUrl: 'academyImageUrl',
    academyImageName: 'academyImageName'
  };

  export type AcademyImageOrderByRelevanceFieldEnum = (typeof AcademyImageOrderByRelevanceFieldEnum)[keyof typeof AcademyImageOrderByRelevanceFieldEnum]


  export const AnnouncementOrderByRelevanceFieldEnum: {
    title: 'title',
    content: 'content'
  };

  export type AnnouncementOrderByRelevanceFieldEnum = (typeof AnnouncementOrderByRelevanceFieldEnum)[keyof typeof AnnouncementOrderByRelevanceFieldEnum]


  export const AnnouncementFileOrderByRelevanceFieldEnum: {
    key: 'key',
    originalName: 'originalName',
    fileType: 'fileType'
  };

  export type AnnouncementFileOrderByRelevanceFieldEnum = (typeof AnnouncementFileOrderByRelevanceFieldEnum)[keyof typeof AnnouncementFileOrderByRelevanceFieldEnum]


  export const QnABoardOrderByRelevanceFieldEnum: {
    qnaTitle: 'qnaTitle',
    qnaContent: 'qnaContent',
    qnaImageUrl: 'qnaImageUrl'
  };

  export type QnABoardOrderByRelevanceFieldEnum = (typeof QnABoardOrderByRelevanceFieldEnum)[keyof typeof QnABoardOrderByRelevanceFieldEnum]


  export const QnABoardCommentOrderByRelevanceFieldEnum: {
    commentContent: 'commentContent'
  };

  export type QnABoardCommentOrderByRelevanceFieldEnum = (typeof QnABoardCommentOrderByRelevanceFieldEnum)[keyof typeof QnABoardCommentOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    userId?: StringFilter<"User"> | string
    userPassword?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    memberId?: IntFilter<"User"> | number
    admin?: XOR<AdminNullableScalarRelationFilter, AdminWhereInput> | null
    qna?: QnABoardListRelationFilter
    qnaComments?: QnABoardCommentListRelationFilter
    student?: XOR<StudentNullableScalarRelationFilter, StudentWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    userId?: SortOrder
    userPassword?: SortOrder
    createdAt?: SortOrder
    role?: SortOrder
    memberId?: SortOrder
    admin?: AdminOrderByWithRelationInput
    qna?: QnABoardOrderByRelationAggregateInput
    qnaComments?: QnABoardCommentOrderByRelationAggregateInput
    student?: StudentOrderByWithRelationInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    userId?: string
    memberId?: number
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    userPassword?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    admin?: XOR<AdminNullableScalarRelationFilter, AdminWhereInput> | null
    qna?: QnABoardListRelationFilter
    qnaComments?: QnABoardCommentListRelationFilter
    student?: XOR<StudentNullableScalarRelationFilter, StudentWhereInput> | null
  }, "memberId" | "userId">

  export type UserOrderByWithAggregationInput = {
    userId?: SortOrder
    userPassword?: SortOrder
    createdAt?: SortOrder
    role?: SortOrder
    memberId?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"User"> | string
    userPassword?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    memberId?: IntWithAggregatesFilter<"User"> | number
  }

  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    adminName?: StringFilter<"Admin"> | string
    adminPhone?: StringFilter<"Admin"> | string
    memberId?: IntFilter<"Admin"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    announcement?: AnnouncementListRelationFilter
    academy?: AcademyListRelationFilter
  }

  export type AdminOrderByWithRelationInput = {
    adminName?: SortOrder
    adminPhone?: SortOrder
    memberId?: SortOrder
    user?: UserOrderByWithRelationInput
    announcement?: AnnouncementOrderByRelationAggregateInput
    academy?: AcademyOrderByRelationAggregateInput
    _relevance?: AdminOrderByRelevanceInput
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    adminPhone?: string
    memberId?: number
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    adminName?: StringFilter<"Admin"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    announcement?: AnnouncementListRelationFilter
    academy?: AcademyListRelationFilter
  }, "memberId" | "adminPhone">

  export type AdminOrderByWithAggregationInput = {
    adminName?: SortOrder
    adminPhone?: SortOrder
    memberId?: SortOrder
    _count?: AdminCountOrderByAggregateInput
    _avg?: AdminAvgOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
    _sum?: AdminSumOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    OR?: AdminScalarWhereWithAggregatesInput[]
    NOT?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    adminName?: StringWithAggregatesFilter<"Admin"> | string
    adminPhone?: StringWithAggregatesFilter<"Admin"> | string
    memberId?: IntWithAggregatesFilter<"Admin"> | number
  }

  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    academyId?: IntFilter<"Student"> | number
    studentName?: StringFilter<"Student"> | string
    studentPhone?: StringFilter<"Student"> | string
    studentHighschool?: StringNullableFilter<"Student"> | string | null
    studentBirthYear?: IntFilter<"Student"> | number
    studentMemo?: StringNullableFilter<"Student"> | string | null
    memberId?: IntFilter<"Student"> | number
    academy?: XOR<AcademyScalarRelationFilter, AcademyWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type StudentOrderByWithRelationInput = {
    academyId?: SortOrder
    studentName?: SortOrder
    studentPhone?: SortOrder
    studentHighschool?: SortOrderInput | SortOrder
    studentBirthYear?: SortOrder
    studentMemo?: SortOrderInput | SortOrder
    memberId?: SortOrder
    academy?: AcademyOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    _relevance?: StudentOrderByRelevanceInput
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    studentPhone?: string
    memberId?: number
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    academyId?: IntFilter<"Student"> | number
    studentName?: StringFilter<"Student"> | string
    studentHighschool?: StringNullableFilter<"Student"> | string | null
    studentBirthYear?: IntFilter<"Student"> | number
    studentMemo?: StringNullableFilter<"Student"> | string | null
    academy?: XOR<AcademyScalarRelationFilter, AcademyWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "memberId" | "studentPhone">

  export type StudentOrderByWithAggregationInput = {
    academyId?: SortOrder
    studentName?: SortOrder
    studentPhone?: SortOrder
    studentHighschool?: SortOrderInput | SortOrder
    studentBirthYear?: SortOrder
    studentMemo?: SortOrderInput | SortOrder
    memberId?: SortOrder
    _count?: StudentCountOrderByAggregateInput
    _avg?: StudentAvgOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
    _sum?: StudentSumOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    academyId?: IntWithAggregatesFilter<"Student"> | number
    studentName?: StringWithAggregatesFilter<"Student"> | string
    studentPhone?: StringWithAggregatesFilter<"Student"> | string
    studentHighschool?: StringNullableWithAggregatesFilter<"Student"> | string | null
    studentBirthYear?: IntWithAggregatesFilter<"Student"> | number
    studentMemo?: StringNullableWithAggregatesFilter<"Student"> | string | null
    memberId?: IntWithAggregatesFilter<"Student"> | number
  }

  export type AcademyWhereInput = {
    AND?: AcademyWhereInput | AcademyWhereInput[]
    OR?: AcademyWhereInput[]
    NOT?: AcademyWhereInput | AcademyWhereInput[]
    academyId?: IntFilter<"Academy"> | number
    academyName?: StringFilter<"Academy"> | string
    academyPhone?: StringNullableFilter<"Academy"> | string | null
    academyAddress?: StringFilter<"Academy"> | string
    createdAt?: DateTimeFilter<"Academy"> | Date | string
    academyMainImage?: StringNullableFilter<"Academy"> | string | null
    images?: AcademyImageListRelationFilter
    students?: StudentListRelationFilter
    admins?: AdminListRelationFilter
    announcements?: AnnouncementListRelationFilter
  }

  export type AcademyOrderByWithRelationInput = {
    academyId?: SortOrder
    academyName?: SortOrder
    academyPhone?: SortOrderInput | SortOrder
    academyAddress?: SortOrder
    createdAt?: SortOrder
    academyMainImage?: SortOrderInput | SortOrder
    images?: AcademyImageOrderByRelationAggregateInput
    students?: StudentOrderByRelationAggregateInput
    admins?: AdminOrderByRelationAggregateInput
    announcements?: AnnouncementOrderByRelationAggregateInput
    _relevance?: AcademyOrderByRelevanceInput
  }

  export type AcademyWhereUniqueInput = Prisma.AtLeast<{
    academyId?: number
    academyName?: string
    academyPhone?: string
    AND?: AcademyWhereInput | AcademyWhereInput[]
    OR?: AcademyWhereInput[]
    NOT?: AcademyWhereInput | AcademyWhereInput[]
    academyAddress?: StringFilter<"Academy"> | string
    createdAt?: DateTimeFilter<"Academy"> | Date | string
    academyMainImage?: StringNullableFilter<"Academy"> | string | null
    images?: AcademyImageListRelationFilter
    students?: StudentListRelationFilter
    admins?: AdminListRelationFilter
    announcements?: AnnouncementListRelationFilter
  }, "academyId" | "academyName" | "academyPhone">

  export type AcademyOrderByWithAggregationInput = {
    academyId?: SortOrder
    academyName?: SortOrder
    academyPhone?: SortOrderInput | SortOrder
    academyAddress?: SortOrder
    createdAt?: SortOrder
    academyMainImage?: SortOrderInput | SortOrder
    _count?: AcademyCountOrderByAggregateInput
    _avg?: AcademyAvgOrderByAggregateInput
    _max?: AcademyMaxOrderByAggregateInput
    _min?: AcademyMinOrderByAggregateInput
    _sum?: AcademySumOrderByAggregateInput
  }

  export type AcademyScalarWhereWithAggregatesInput = {
    AND?: AcademyScalarWhereWithAggregatesInput | AcademyScalarWhereWithAggregatesInput[]
    OR?: AcademyScalarWhereWithAggregatesInput[]
    NOT?: AcademyScalarWhereWithAggregatesInput | AcademyScalarWhereWithAggregatesInput[]
    academyId?: IntWithAggregatesFilter<"Academy"> | number
    academyName?: StringWithAggregatesFilter<"Academy"> | string
    academyPhone?: StringNullableWithAggregatesFilter<"Academy"> | string | null
    academyAddress?: StringWithAggregatesFilter<"Academy"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Academy"> | Date | string
    academyMainImage?: StringNullableWithAggregatesFilter<"Academy"> | string | null
  }

  export type AcademyImageWhereInput = {
    AND?: AcademyImageWhereInput | AcademyImageWhereInput[]
    OR?: AcademyImageWhereInput[]
    NOT?: AcademyImageWhereInput | AcademyImageWhereInput[]
    academyImageId?: IntFilter<"AcademyImage"> | number
    academyImageUrl?: StringFilter<"AcademyImage"> | string
    academyId?: IntFilter<"AcademyImage"> | number
    createdAt?: DateTimeFilter<"AcademyImage"> | Date | string
    academyImageName?: StringNullableFilter<"AcademyImage"> | string | null
    academy?: XOR<AcademyScalarRelationFilter, AcademyWhereInput>
  }

  export type AcademyImageOrderByWithRelationInput = {
    academyImageId?: SortOrder
    academyImageUrl?: SortOrder
    academyId?: SortOrder
    createdAt?: SortOrder
    academyImageName?: SortOrderInput | SortOrder
    academy?: AcademyOrderByWithRelationInput
    _relevance?: AcademyImageOrderByRelevanceInput
  }

  export type AcademyImageWhereUniqueInput = Prisma.AtLeast<{
    academyImageId?: number
    AND?: AcademyImageWhereInput | AcademyImageWhereInput[]
    OR?: AcademyImageWhereInput[]
    NOT?: AcademyImageWhereInput | AcademyImageWhereInput[]
    academyImageUrl?: StringFilter<"AcademyImage"> | string
    academyId?: IntFilter<"AcademyImage"> | number
    createdAt?: DateTimeFilter<"AcademyImage"> | Date | string
    academyImageName?: StringNullableFilter<"AcademyImage"> | string | null
    academy?: XOR<AcademyScalarRelationFilter, AcademyWhereInput>
  }, "academyImageId">

  export type AcademyImageOrderByWithAggregationInput = {
    academyImageId?: SortOrder
    academyImageUrl?: SortOrder
    academyId?: SortOrder
    createdAt?: SortOrder
    academyImageName?: SortOrderInput | SortOrder
    _count?: AcademyImageCountOrderByAggregateInput
    _avg?: AcademyImageAvgOrderByAggregateInput
    _max?: AcademyImageMaxOrderByAggregateInput
    _min?: AcademyImageMinOrderByAggregateInput
    _sum?: AcademyImageSumOrderByAggregateInput
  }

  export type AcademyImageScalarWhereWithAggregatesInput = {
    AND?: AcademyImageScalarWhereWithAggregatesInput | AcademyImageScalarWhereWithAggregatesInput[]
    OR?: AcademyImageScalarWhereWithAggregatesInput[]
    NOT?: AcademyImageScalarWhereWithAggregatesInput | AcademyImageScalarWhereWithAggregatesInput[]
    academyImageId?: IntWithAggregatesFilter<"AcademyImage"> | number
    academyImageUrl?: StringWithAggregatesFilter<"AcademyImage"> | string
    academyId?: IntWithAggregatesFilter<"AcademyImage"> | number
    createdAt?: DateTimeWithAggregatesFilter<"AcademyImage"> | Date | string
    academyImageName?: StringNullableWithAggregatesFilter<"AcademyImage"> | string | null
  }

  export type AnnouncementWhereInput = {
    AND?: AnnouncementWhereInput | AnnouncementWhereInput[]
    OR?: AnnouncementWhereInput[]
    NOT?: AnnouncementWhereInput | AnnouncementWhereInput[]
    announcementId?: IntFilter<"Announcement"> | number
    title?: StringFilter<"Announcement"> | string
    content?: StringFilter<"Announcement"> | string
    createdAt?: DateTimeFilter<"Announcement"> | Date | string
    updatedAt?: DateTimeFilter<"Announcement"> | Date | string
    authorId?: IntNullableFilter<"Announcement"> | number | null
    isItAssetAnnouncement?: BoolFilter<"Announcement"> | boolean
    isItImportantAnnouncement?: BoolFilter<"Announcement"> | boolean
    author?: XOR<AdminNullableScalarRelationFilter, AdminWhereInput> | null
    files?: AnnouncementFileListRelationFilter
    academies?: AcademyListRelationFilter
  }

  export type AnnouncementOrderByWithRelationInput = {
    announcementId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrderInput | SortOrder
    isItAssetAnnouncement?: SortOrder
    isItImportantAnnouncement?: SortOrder
    author?: AdminOrderByWithRelationInput
    files?: AnnouncementFileOrderByRelationAggregateInput
    academies?: AcademyOrderByRelationAggregateInput
    _relevance?: AnnouncementOrderByRelevanceInput
  }

  export type AnnouncementWhereUniqueInput = Prisma.AtLeast<{
    announcementId?: number
    AND?: AnnouncementWhereInput | AnnouncementWhereInput[]
    OR?: AnnouncementWhereInput[]
    NOT?: AnnouncementWhereInput | AnnouncementWhereInput[]
    title?: StringFilter<"Announcement"> | string
    content?: StringFilter<"Announcement"> | string
    createdAt?: DateTimeFilter<"Announcement"> | Date | string
    updatedAt?: DateTimeFilter<"Announcement"> | Date | string
    authorId?: IntNullableFilter<"Announcement"> | number | null
    isItAssetAnnouncement?: BoolFilter<"Announcement"> | boolean
    isItImportantAnnouncement?: BoolFilter<"Announcement"> | boolean
    author?: XOR<AdminNullableScalarRelationFilter, AdminWhereInput> | null
    files?: AnnouncementFileListRelationFilter
    academies?: AcademyListRelationFilter
  }, "announcementId">

  export type AnnouncementOrderByWithAggregationInput = {
    announcementId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrderInput | SortOrder
    isItAssetAnnouncement?: SortOrder
    isItImportantAnnouncement?: SortOrder
    _count?: AnnouncementCountOrderByAggregateInput
    _avg?: AnnouncementAvgOrderByAggregateInput
    _max?: AnnouncementMaxOrderByAggregateInput
    _min?: AnnouncementMinOrderByAggregateInput
    _sum?: AnnouncementSumOrderByAggregateInput
  }

  export type AnnouncementScalarWhereWithAggregatesInput = {
    AND?: AnnouncementScalarWhereWithAggregatesInput | AnnouncementScalarWhereWithAggregatesInput[]
    OR?: AnnouncementScalarWhereWithAggregatesInput[]
    NOT?: AnnouncementScalarWhereWithAggregatesInput | AnnouncementScalarWhereWithAggregatesInput[]
    announcementId?: IntWithAggregatesFilter<"Announcement"> | number
    title?: StringWithAggregatesFilter<"Announcement"> | string
    content?: StringWithAggregatesFilter<"Announcement"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Announcement"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Announcement"> | Date | string
    authorId?: IntNullableWithAggregatesFilter<"Announcement"> | number | null
    isItAssetAnnouncement?: BoolWithAggregatesFilter<"Announcement"> | boolean
    isItImportantAnnouncement?: BoolWithAggregatesFilter<"Announcement"> | boolean
  }

  export type AnnouncementFileWhereInput = {
    AND?: AnnouncementFileWhereInput | AnnouncementFileWhereInput[]
    OR?: AnnouncementFileWhereInput[]
    NOT?: AnnouncementFileWhereInput | AnnouncementFileWhereInput[]
    id?: IntFilter<"AnnouncementFile"> | number
    key?: StringFilter<"AnnouncementFile"> | string
    originalName?: StringFilter<"AnnouncementFile"> | string
    fileType?: StringFilter<"AnnouncementFile"> | string
    announcementId?: IntFilter<"AnnouncementFile"> | number
    uploadedAt?: DateTimeFilter<"AnnouncementFile"> | Date | string
    announcement?: XOR<AnnouncementScalarRelationFilter, AnnouncementWhereInput>
  }

  export type AnnouncementFileOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    originalName?: SortOrder
    fileType?: SortOrder
    announcementId?: SortOrder
    uploadedAt?: SortOrder
    announcement?: AnnouncementOrderByWithRelationInput
    _relevance?: AnnouncementFileOrderByRelevanceInput
  }

  export type AnnouncementFileWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AnnouncementFileWhereInput | AnnouncementFileWhereInput[]
    OR?: AnnouncementFileWhereInput[]
    NOT?: AnnouncementFileWhereInput | AnnouncementFileWhereInput[]
    key?: StringFilter<"AnnouncementFile"> | string
    originalName?: StringFilter<"AnnouncementFile"> | string
    fileType?: StringFilter<"AnnouncementFile"> | string
    announcementId?: IntFilter<"AnnouncementFile"> | number
    uploadedAt?: DateTimeFilter<"AnnouncementFile"> | Date | string
    announcement?: XOR<AnnouncementScalarRelationFilter, AnnouncementWhereInput>
  }, "id">

  export type AnnouncementFileOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    originalName?: SortOrder
    fileType?: SortOrder
    announcementId?: SortOrder
    uploadedAt?: SortOrder
    _count?: AnnouncementFileCountOrderByAggregateInput
    _avg?: AnnouncementFileAvgOrderByAggregateInput
    _max?: AnnouncementFileMaxOrderByAggregateInput
    _min?: AnnouncementFileMinOrderByAggregateInput
    _sum?: AnnouncementFileSumOrderByAggregateInput
  }

  export type AnnouncementFileScalarWhereWithAggregatesInput = {
    AND?: AnnouncementFileScalarWhereWithAggregatesInput | AnnouncementFileScalarWhereWithAggregatesInput[]
    OR?: AnnouncementFileScalarWhereWithAggregatesInput[]
    NOT?: AnnouncementFileScalarWhereWithAggregatesInput | AnnouncementFileScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AnnouncementFile"> | number
    key?: StringWithAggregatesFilter<"AnnouncementFile"> | string
    originalName?: StringWithAggregatesFilter<"AnnouncementFile"> | string
    fileType?: StringWithAggregatesFilter<"AnnouncementFile"> | string
    announcementId?: IntWithAggregatesFilter<"AnnouncementFile"> | number
    uploadedAt?: DateTimeWithAggregatesFilter<"AnnouncementFile"> | Date | string
  }

  export type QnABoardWhereInput = {
    AND?: QnABoardWhereInput | QnABoardWhereInput[]
    OR?: QnABoardWhereInput[]
    NOT?: QnABoardWhereInput | QnABoardWhereInput[]
    qnaId?: IntFilter<"QnABoard"> | number
    qnaTitle?: StringFilter<"QnABoard"> | string
    qnaContent?: StringFilter<"QnABoard"> | string
    qnaUserId?: IntFilter<"QnABoard"> | number
    createdAt?: DateTimeFilter<"QnABoard"> | Date | string
    updatedAt?: DateTimeFilter<"QnABoard"> | Date | string
    qnaImageUrl?: StringNullableFilter<"QnABoard"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    comments?: QnABoardCommentListRelationFilter
  }

  export type QnABoardOrderByWithRelationInput = {
    qnaId?: SortOrder
    qnaTitle?: SortOrder
    qnaContent?: SortOrder
    qnaUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    qnaImageUrl?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    comments?: QnABoardCommentOrderByRelationAggregateInput
    _relevance?: QnABoardOrderByRelevanceInput
  }

  export type QnABoardWhereUniqueInput = Prisma.AtLeast<{
    qnaId?: number
    AND?: QnABoardWhereInput | QnABoardWhereInput[]
    OR?: QnABoardWhereInput[]
    NOT?: QnABoardWhereInput | QnABoardWhereInput[]
    qnaTitle?: StringFilter<"QnABoard"> | string
    qnaContent?: StringFilter<"QnABoard"> | string
    qnaUserId?: IntFilter<"QnABoard"> | number
    createdAt?: DateTimeFilter<"QnABoard"> | Date | string
    updatedAt?: DateTimeFilter<"QnABoard"> | Date | string
    qnaImageUrl?: StringNullableFilter<"QnABoard"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    comments?: QnABoardCommentListRelationFilter
  }, "qnaId">

  export type QnABoardOrderByWithAggregationInput = {
    qnaId?: SortOrder
    qnaTitle?: SortOrder
    qnaContent?: SortOrder
    qnaUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    qnaImageUrl?: SortOrderInput | SortOrder
    _count?: QnABoardCountOrderByAggregateInput
    _avg?: QnABoardAvgOrderByAggregateInput
    _max?: QnABoardMaxOrderByAggregateInput
    _min?: QnABoardMinOrderByAggregateInput
    _sum?: QnABoardSumOrderByAggregateInput
  }

  export type QnABoardScalarWhereWithAggregatesInput = {
    AND?: QnABoardScalarWhereWithAggregatesInput | QnABoardScalarWhereWithAggregatesInput[]
    OR?: QnABoardScalarWhereWithAggregatesInput[]
    NOT?: QnABoardScalarWhereWithAggregatesInput | QnABoardScalarWhereWithAggregatesInput[]
    qnaId?: IntWithAggregatesFilter<"QnABoard"> | number
    qnaTitle?: StringWithAggregatesFilter<"QnABoard"> | string
    qnaContent?: StringWithAggregatesFilter<"QnABoard"> | string
    qnaUserId?: IntWithAggregatesFilter<"QnABoard"> | number
    createdAt?: DateTimeWithAggregatesFilter<"QnABoard"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"QnABoard"> | Date | string
    qnaImageUrl?: StringNullableWithAggregatesFilter<"QnABoard"> | string | null
  }

  export type QnABoardCommentWhereInput = {
    AND?: QnABoardCommentWhereInput | QnABoardCommentWhereInput[]
    OR?: QnABoardCommentWhereInput[]
    NOT?: QnABoardCommentWhereInput | QnABoardCommentWhereInput[]
    commentId?: IntFilter<"QnABoardComment"> | number
    commentContent?: StringFilter<"QnABoardComment"> | string
    commentUserId?: IntFilter<"QnABoardComment"> | number
    qnaId?: IntFilter<"QnABoardComment"> | number
    createdAt?: DateTimeFilter<"QnABoardComment"> | Date | string
    updatedAt?: DateTimeFilter<"QnABoardComment"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    qna?: XOR<QnABoardScalarRelationFilter, QnABoardWhereInput>
  }

  export type QnABoardCommentOrderByWithRelationInput = {
    commentId?: SortOrder
    commentContent?: SortOrder
    commentUserId?: SortOrder
    qnaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    qna?: QnABoardOrderByWithRelationInput
    _relevance?: QnABoardCommentOrderByRelevanceInput
  }

  export type QnABoardCommentWhereUniqueInput = Prisma.AtLeast<{
    commentId?: number
    AND?: QnABoardCommentWhereInput | QnABoardCommentWhereInput[]
    OR?: QnABoardCommentWhereInput[]
    NOT?: QnABoardCommentWhereInput | QnABoardCommentWhereInput[]
    commentContent?: StringFilter<"QnABoardComment"> | string
    commentUserId?: IntFilter<"QnABoardComment"> | number
    qnaId?: IntFilter<"QnABoardComment"> | number
    createdAt?: DateTimeFilter<"QnABoardComment"> | Date | string
    updatedAt?: DateTimeFilter<"QnABoardComment"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    qna?: XOR<QnABoardScalarRelationFilter, QnABoardWhereInput>
  }, "commentId">

  export type QnABoardCommentOrderByWithAggregationInput = {
    commentId?: SortOrder
    commentContent?: SortOrder
    commentUserId?: SortOrder
    qnaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: QnABoardCommentCountOrderByAggregateInput
    _avg?: QnABoardCommentAvgOrderByAggregateInput
    _max?: QnABoardCommentMaxOrderByAggregateInput
    _min?: QnABoardCommentMinOrderByAggregateInput
    _sum?: QnABoardCommentSumOrderByAggregateInput
  }

  export type QnABoardCommentScalarWhereWithAggregatesInput = {
    AND?: QnABoardCommentScalarWhereWithAggregatesInput | QnABoardCommentScalarWhereWithAggregatesInput[]
    OR?: QnABoardCommentScalarWhereWithAggregatesInput[]
    NOT?: QnABoardCommentScalarWhereWithAggregatesInput | QnABoardCommentScalarWhereWithAggregatesInput[]
    commentId?: IntWithAggregatesFilter<"QnABoardComment"> | number
    commentContent?: StringWithAggregatesFilter<"QnABoardComment"> | string
    commentUserId?: IntWithAggregatesFilter<"QnABoardComment"> | number
    qnaId?: IntWithAggregatesFilter<"QnABoardComment"> | number
    createdAt?: DateTimeWithAggregatesFilter<"QnABoardComment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"QnABoardComment"> | Date | string
  }

  export type UserCreateInput = {
    userId: string
    userPassword: string
    createdAt?: Date | string
    role?: $Enums.Role
    admin?: AdminCreateNestedOneWithoutUserInput
    qna?: QnABoardCreateNestedManyWithoutUserInput
    qnaComments?: QnABoardCommentCreateNestedManyWithoutUserInput
    student?: StudentCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    userId: string
    userPassword: string
    createdAt?: Date | string
    role?: $Enums.Role
    memberId?: number
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    qna?: QnABoardUncheckedCreateNestedManyWithoutUserInput
    qnaComments?: QnABoardCommentUncheckedCreateNestedManyWithoutUserInput
    student?: StudentUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userPassword?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    admin?: AdminUpdateOneWithoutUserNestedInput
    qna?: QnABoardUpdateManyWithoutUserNestedInput
    qnaComments?: QnABoardCommentUpdateManyWithoutUserNestedInput
    student?: StudentUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userPassword?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    memberId?: IntFieldUpdateOperationsInput | number
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    qna?: QnABoardUncheckedUpdateManyWithoutUserNestedInput
    qnaComments?: QnABoardCommentUncheckedUpdateManyWithoutUserNestedInput
    student?: StudentUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    userId: string
    userPassword: string
    createdAt?: Date | string
    role?: $Enums.Role
    memberId?: number
  }

  export type UserUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userPassword?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type UserUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userPassword?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    memberId?: IntFieldUpdateOperationsInput | number
  }

  export type AdminCreateInput = {
    adminName: string
    adminPhone: string
    user: UserCreateNestedOneWithoutAdminInput
    announcement?: AnnouncementCreateNestedManyWithoutAuthorInput
    academy?: AcademyCreateNestedManyWithoutAdminsInput
  }

  export type AdminUncheckedCreateInput = {
    adminName: string
    adminPhone: string
    memberId: number
    announcement?: AnnouncementUncheckedCreateNestedManyWithoutAuthorInput
    academy?: AcademyUncheckedCreateNestedManyWithoutAdminsInput
  }

  export type AdminUpdateInput = {
    adminName?: StringFieldUpdateOperationsInput | string
    adminPhone?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutAdminNestedInput
    announcement?: AnnouncementUpdateManyWithoutAuthorNestedInput
    academy?: AcademyUpdateManyWithoutAdminsNestedInput
  }

  export type AdminUncheckedUpdateInput = {
    adminName?: StringFieldUpdateOperationsInput | string
    adminPhone?: StringFieldUpdateOperationsInput | string
    memberId?: IntFieldUpdateOperationsInput | number
    announcement?: AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput
    academy?: AcademyUncheckedUpdateManyWithoutAdminsNestedInput
  }

  export type AdminCreateManyInput = {
    adminName: string
    adminPhone: string
    memberId: number
  }

  export type AdminUpdateManyMutationInput = {
    adminName?: StringFieldUpdateOperationsInput | string
    adminPhone?: StringFieldUpdateOperationsInput | string
  }

  export type AdminUncheckedUpdateManyInput = {
    adminName?: StringFieldUpdateOperationsInput | string
    adminPhone?: StringFieldUpdateOperationsInput | string
    memberId?: IntFieldUpdateOperationsInput | number
  }

  export type StudentCreateInput = {
    studentName: string
    studentPhone: string
    studentHighschool?: string | null
    studentBirthYear: number
    studentMemo?: string | null
    academy: AcademyCreateNestedOneWithoutStudentsInput
    user: UserCreateNestedOneWithoutStudentInput
  }

  export type StudentUncheckedCreateInput = {
    academyId: number
    studentName: string
    studentPhone: string
    studentHighschool?: string | null
    studentBirthYear: number
    studentMemo?: string | null
    memberId: number
  }

  export type StudentUpdateInput = {
    studentName?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentHighschool?: NullableStringFieldUpdateOperationsInput | string | null
    studentBirthYear?: IntFieldUpdateOperationsInput | number
    studentMemo?: NullableStringFieldUpdateOperationsInput | string | null
    academy?: AcademyUpdateOneRequiredWithoutStudentsNestedInput
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateInput = {
    academyId?: IntFieldUpdateOperationsInput | number
    studentName?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentHighschool?: NullableStringFieldUpdateOperationsInput | string | null
    studentBirthYear?: IntFieldUpdateOperationsInput | number
    studentMemo?: NullableStringFieldUpdateOperationsInput | string | null
    memberId?: IntFieldUpdateOperationsInput | number
  }

  export type StudentCreateManyInput = {
    academyId: number
    studentName: string
    studentPhone: string
    studentHighschool?: string | null
    studentBirthYear: number
    studentMemo?: string | null
    memberId: number
  }

  export type StudentUpdateManyMutationInput = {
    studentName?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentHighschool?: NullableStringFieldUpdateOperationsInput | string | null
    studentBirthYear?: IntFieldUpdateOperationsInput | number
    studentMemo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StudentUncheckedUpdateManyInput = {
    academyId?: IntFieldUpdateOperationsInput | number
    studentName?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentHighschool?: NullableStringFieldUpdateOperationsInput | string | null
    studentBirthYear?: IntFieldUpdateOperationsInput | number
    studentMemo?: NullableStringFieldUpdateOperationsInput | string | null
    memberId?: IntFieldUpdateOperationsInput | number
  }

  export type AcademyCreateInput = {
    academyName: string
    academyPhone?: string | null
    academyAddress: string
    createdAt?: Date | string
    academyMainImage?: string | null
    images?: AcademyImageCreateNestedManyWithoutAcademyInput
    students?: StudentCreateNestedManyWithoutAcademyInput
    admins?: AdminCreateNestedManyWithoutAcademyInput
    announcements?: AnnouncementCreateNestedManyWithoutAcademiesInput
  }

  export type AcademyUncheckedCreateInput = {
    academyId?: number
    academyName: string
    academyPhone?: string | null
    academyAddress: string
    createdAt?: Date | string
    academyMainImage?: string | null
    images?: AcademyImageUncheckedCreateNestedManyWithoutAcademyInput
    students?: StudentUncheckedCreateNestedManyWithoutAcademyInput
    admins?: AdminUncheckedCreateNestedManyWithoutAcademyInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutAcademiesInput
  }

  export type AcademyUpdateInput = {
    academyName?: StringFieldUpdateOperationsInput | string
    academyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    academyAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academyMainImage?: NullableStringFieldUpdateOperationsInput | string | null
    images?: AcademyImageUpdateManyWithoutAcademyNestedInput
    students?: StudentUpdateManyWithoutAcademyNestedInput
    admins?: AdminUpdateManyWithoutAcademyNestedInput
    announcements?: AnnouncementUpdateManyWithoutAcademiesNestedInput
  }

  export type AcademyUncheckedUpdateInput = {
    academyId?: IntFieldUpdateOperationsInput | number
    academyName?: StringFieldUpdateOperationsInput | string
    academyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    academyAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academyMainImage?: NullableStringFieldUpdateOperationsInput | string | null
    images?: AcademyImageUncheckedUpdateManyWithoutAcademyNestedInput
    students?: StudentUncheckedUpdateManyWithoutAcademyNestedInput
    admins?: AdminUncheckedUpdateManyWithoutAcademyNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutAcademiesNestedInput
  }

  export type AcademyCreateManyInput = {
    academyId?: number
    academyName: string
    academyPhone?: string | null
    academyAddress: string
    createdAt?: Date | string
    academyMainImage?: string | null
  }

  export type AcademyUpdateManyMutationInput = {
    academyName?: StringFieldUpdateOperationsInput | string
    academyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    academyAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academyMainImage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AcademyUncheckedUpdateManyInput = {
    academyId?: IntFieldUpdateOperationsInput | number
    academyName?: StringFieldUpdateOperationsInput | string
    academyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    academyAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academyMainImage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AcademyImageCreateInput = {
    academyImageUrl: string
    createdAt?: Date | string
    academyImageName?: string | null
    academy: AcademyCreateNestedOneWithoutImagesInput
  }

  export type AcademyImageUncheckedCreateInput = {
    academyImageId?: number
    academyImageUrl: string
    academyId: number
    createdAt?: Date | string
    academyImageName?: string | null
  }

  export type AcademyImageUpdateInput = {
    academyImageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academyImageName?: NullableStringFieldUpdateOperationsInput | string | null
    academy?: AcademyUpdateOneRequiredWithoutImagesNestedInput
  }

  export type AcademyImageUncheckedUpdateInput = {
    academyImageId?: IntFieldUpdateOperationsInput | number
    academyImageUrl?: StringFieldUpdateOperationsInput | string
    academyId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academyImageName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AcademyImageCreateManyInput = {
    academyImageId?: number
    academyImageUrl: string
    academyId: number
    createdAt?: Date | string
    academyImageName?: string | null
  }

  export type AcademyImageUpdateManyMutationInput = {
    academyImageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academyImageName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AcademyImageUncheckedUpdateManyInput = {
    academyImageId?: IntFieldUpdateOperationsInput | number
    academyImageUrl?: StringFieldUpdateOperationsInput | string
    academyId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academyImageName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AnnouncementCreateInput = {
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isItAssetAnnouncement?: boolean
    isItImportantAnnouncement?: boolean
    author?: AdminCreateNestedOneWithoutAnnouncementInput
    files?: AnnouncementFileCreateNestedManyWithoutAnnouncementInput
    academies?: AcademyCreateNestedManyWithoutAnnouncementsInput
  }

  export type AnnouncementUncheckedCreateInput = {
    announcementId?: number
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId?: number | null
    isItAssetAnnouncement?: boolean
    isItImportantAnnouncement?: boolean
    files?: AnnouncementFileUncheckedCreateNestedManyWithoutAnnouncementInput
    academies?: AcademyUncheckedCreateNestedManyWithoutAnnouncementsInput
  }

  export type AnnouncementUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isItAssetAnnouncement?: BoolFieldUpdateOperationsInput | boolean
    isItImportantAnnouncement?: BoolFieldUpdateOperationsInput | boolean
    author?: AdminUpdateOneWithoutAnnouncementNestedInput
    files?: AnnouncementFileUpdateManyWithoutAnnouncementNestedInput
    academies?: AcademyUpdateManyWithoutAnnouncementsNestedInput
  }

  export type AnnouncementUncheckedUpdateInput = {
    announcementId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: NullableIntFieldUpdateOperationsInput | number | null
    isItAssetAnnouncement?: BoolFieldUpdateOperationsInput | boolean
    isItImportantAnnouncement?: BoolFieldUpdateOperationsInput | boolean
    files?: AnnouncementFileUncheckedUpdateManyWithoutAnnouncementNestedInput
    academies?: AcademyUncheckedUpdateManyWithoutAnnouncementsNestedInput
  }

  export type AnnouncementCreateManyInput = {
    announcementId?: number
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId?: number | null
    isItAssetAnnouncement?: boolean
    isItImportantAnnouncement?: boolean
  }

  export type AnnouncementUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isItAssetAnnouncement?: BoolFieldUpdateOperationsInput | boolean
    isItImportantAnnouncement?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AnnouncementUncheckedUpdateManyInput = {
    announcementId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: NullableIntFieldUpdateOperationsInput | number | null
    isItAssetAnnouncement?: BoolFieldUpdateOperationsInput | boolean
    isItImportantAnnouncement?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AnnouncementFileCreateInput = {
    key: string
    originalName: string
    fileType: string
    uploadedAt?: Date | string
    announcement: AnnouncementCreateNestedOneWithoutFilesInput
  }

  export type AnnouncementFileUncheckedCreateInput = {
    id?: number
    key: string
    originalName: string
    fileType: string
    announcementId: number
    uploadedAt?: Date | string
  }

  export type AnnouncementFileUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    announcement?: AnnouncementUpdateOneRequiredWithoutFilesNestedInput
  }

  export type AnnouncementFileUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    announcementId?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnouncementFileCreateManyInput = {
    id?: number
    key: string
    originalName: string
    fileType: string
    announcementId: number
    uploadedAt?: Date | string
  }

  export type AnnouncementFileUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnouncementFileUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    announcementId?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QnABoardCreateInput = {
    qnaTitle: string
    qnaContent: string
    createdAt?: Date | string
    updatedAt?: Date | string
    qnaImageUrl?: string | null
    user: UserCreateNestedOneWithoutQnaInput
    comments?: QnABoardCommentCreateNestedManyWithoutQnaInput
  }

  export type QnABoardUncheckedCreateInput = {
    qnaId?: number
    qnaTitle: string
    qnaContent: string
    qnaUserId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    qnaImageUrl?: string | null
    comments?: QnABoardCommentUncheckedCreateNestedManyWithoutQnaInput
  }

  export type QnABoardUpdateInput = {
    qnaTitle?: StringFieldUpdateOperationsInput | string
    qnaContent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    qnaImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutQnaNestedInput
    comments?: QnABoardCommentUpdateManyWithoutQnaNestedInput
  }

  export type QnABoardUncheckedUpdateInput = {
    qnaId?: IntFieldUpdateOperationsInput | number
    qnaTitle?: StringFieldUpdateOperationsInput | string
    qnaContent?: StringFieldUpdateOperationsInput | string
    qnaUserId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    qnaImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: QnABoardCommentUncheckedUpdateManyWithoutQnaNestedInput
  }

  export type QnABoardCreateManyInput = {
    qnaId?: number
    qnaTitle: string
    qnaContent: string
    qnaUserId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    qnaImageUrl?: string | null
  }

  export type QnABoardUpdateManyMutationInput = {
    qnaTitle?: StringFieldUpdateOperationsInput | string
    qnaContent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    qnaImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QnABoardUncheckedUpdateManyInput = {
    qnaId?: IntFieldUpdateOperationsInput | number
    qnaTitle?: StringFieldUpdateOperationsInput | string
    qnaContent?: StringFieldUpdateOperationsInput | string
    qnaUserId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    qnaImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QnABoardCommentCreateInput = {
    commentContent: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutQnaCommentsInput
    qna: QnABoardCreateNestedOneWithoutCommentsInput
  }

  export type QnABoardCommentUncheckedCreateInput = {
    commentId?: number
    commentContent: string
    commentUserId: number
    qnaId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QnABoardCommentUpdateInput = {
    commentContent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutQnaCommentsNestedInput
    qna?: QnABoardUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type QnABoardCommentUncheckedUpdateInput = {
    commentId?: IntFieldUpdateOperationsInput | number
    commentContent?: StringFieldUpdateOperationsInput | string
    commentUserId?: IntFieldUpdateOperationsInput | number
    qnaId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QnABoardCommentCreateManyInput = {
    commentId?: number
    commentContent: string
    commentUserId: number
    qnaId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QnABoardCommentUpdateManyMutationInput = {
    commentContent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QnABoardCommentUncheckedUpdateManyInput = {
    commentId?: IntFieldUpdateOperationsInput | number
    commentContent?: StringFieldUpdateOperationsInput | string
    commentUserId?: IntFieldUpdateOperationsInput | number
    qnaId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    search?: string
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

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type AdminNullableScalarRelationFilter = {
    is?: AdminWhereInput | null
    isNot?: AdminWhereInput | null
  }

  export type QnABoardListRelationFilter = {
    every?: QnABoardWhereInput
    some?: QnABoardWhereInput
    none?: QnABoardWhereInput
  }

  export type QnABoardCommentListRelationFilter = {
    every?: QnABoardCommentWhereInput
    some?: QnABoardCommentWhereInput
    none?: QnABoardCommentWhereInput
  }

  export type StudentNullableScalarRelationFilter = {
    is?: StudentWhereInput | null
    isNot?: StudentWhereInput | null
  }

  export type QnABoardOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QnABoardCommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    userId?: SortOrder
    userPassword?: SortOrder
    createdAt?: SortOrder
    role?: SortOrder
    memberId?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    memberId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    userId?: SortOrder
    userPassword?: SortOrder
    createdAt?: SortOrder
    role?: SortOrder
    memberId?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    userId?: SortOrder
    userPassword?: SortOrder
    createdAt?: SortOrder
    role?: SortOrder
    memberId?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    memberId?: SortOrder
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
    search?: string
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

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AnnouncementListRelationFilter = {
    every?: AnnouncementWhereInput
    some?: AnnouncementWhereInput
    none?: AnnouncementWhereInput
  }

  export type AcademyListRelationFilter = {
    every?: AcademyWhereInput
    some?: AcademyWhereInput
    none?: AcademyWhereInput
  }

  export type AnnouncementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AcademyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AdminOrderByRelevanceInput = {
    fields: AdminOrderByRelevanceFieldEnum | AdminOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AdminCountOrderByAggregateInput = {
    adminName?: SortOrder
    adminPhone?: SortOrder
    memberId?: SortOrder
  }

  export type AdminAvgOrderByAggregateInput = {
    memberId?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    adminName?: SortOrder
    adminPhone?: SortOrder
    memberId?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    adminName?: SortOrder
    adminPhone?: SortOrder
    memberId?: SortOrder
  }

  export type AdminSumOrderByAggregateInput = {
    memberId?: SortOrder
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
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type AcademyScalarRelationFilter = {
    is?: AcademyWhereInput
    isNot?: AcademyWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StudentOrderByRelevanceInput = {
    fields: StudentOrderByRelevanceFieldEnum | StudentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type StudentCountOrderByAggregateInput = {
    academyId?: SortOrder
    studentName?: SortOrder
    studentPhone?: SortOrder
    studentHighschool?: SortOrder
    studentBirthYear?: SortOrder
    studentMemo?: SortOrder
    memberId?: SortOrder
  }

  export type StudentAvgOrderByAggregateInput = {
    academyId?: SortOrder
    studentBirthYear?: SortOrder
    memberId?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    academyId?: SortOrder
    studentName?: SortOrder
    studentPhone?: SortOrder
    studentHighschool?: SortOrder
    studentBirthYear?: SortOrder
    studentMemo?: SortOrder
    memberId?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    academyId?: SortOrder
    studentName?: SortOrder
    studentPhone?: SortOrder
    studentHighschool?: SortOrder
    studentBirthYear?: SortOrder
    studentMemo?: SortOrder
    memberId?: SortOrder
  }

  export type StudentSumOrderByAggregateInput = {
    academyId?: SortOrder
    studentBirthYear?: SortOrder
    memberId?: SortOrder
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
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type AcademyImageListRelationFilter = {
    every?: AcademyImageWhereInput
    some?: AcademyImageWhereInput
    none?: AcademyImageWhereInput
  }

  export type StudentListRelationFilter = {
    every?: StudentWhereInput
    some?: StudentWhereInput
    none?: StudentWhereInput
  }

  export type AdminListRelationFilter = {
    every?: AdminWhereInput
    some?: AdminWhereInput
    none?: AdminWhereInput
  }

  export type AcademyImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AdminOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AcademyOrderByRelevanceInput = {
    fields: AcademyOrderByRelevanceFieldEnum | AcademyOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AcademyCountOrderByAggregateInput = {
    academyId?: SortOrder
    academyName?: SortOrder
    academyPhone?: SortOrder
    academyAddress?: SortOrder
    createdAt?: SortOrder
    academyMainImage?: SortOrder
  }

  export type AcademyAvgOrderByAggregateInput = {
    academyId?: SortOrder
  }

  export type AcademyMaxOrderByAggregateInput = {
    academyId?: SortOrder
    academyName?: SortOrder
    academyPhone?: SortOrder
    academyAddress?: SortOrder
    createdAt?: SortOrder
    academyMainImage?: SortOrder
  }

  export type AcademyMinOrderByAggregateInput = {
    academyId?: SortOrder
    academyName?: SortOrder
    academyPhone?: SortOrder
    academyAddress?: SortOrder
    createdAt?: SortOrder
    academyMainImage?: SortOrder
  }

  export type AcademySumOrderByAggregateInput = {
    academyId?: SortOrder
  }

  export type AcademyImageOrderByRelevanceInput = {
    fields: AcademyImageOrderByRelevanceFieldEnum | AcademyImageOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AcademyImageCountOrderByAggregateInput = {
    academyImageId?: SortOrder
    academyImageUrl?: SortOrder
    academyId?: SortOrder
    createdAt?: SortOrder
    academyImageName?: SortOrder
  }

  export type AcademyImageAvgOrderByAggregateInput = {
    academyImageId?: SortOrder
    academyId?: SortOrder
  }

  export type AcademyImageMaxOrderByAggregateInput = {
    academyImageId?: SortOrder
    academyImageUrl?: SortOrder
    academyId?: SortOrder
    createdAt?: SortOrder
    academyImageName?: SortOrder
  }

  export type AcademyImageMinOrderByAggregateInput = {
    academyImageId?: SortOrder
    academyImageUrl?: SortOrder
    academyId?: SortOrder
    createdAt?: SortOrder
    academyImageName?: SortOrder
  }

  export type AcademyImageSumOrderByAggregateInput = {
    academyImageId?: SortOrder
    academyId?: SortOrder
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type AnnouncementFileListRelationFilter = {
    every?: AnnouncementFileWhereInput
    some?: AnnouncementFileWhereInput
    none?: AnnouncementFileWhereInput
  }

  export type AnnouncementFileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnnouncementOrderByRelevanceInput = {
    fields: AnnouncementOrderByRelevanceFieldEnum | AnnouncementOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AnnouncementCountOrderByAggregateInput = {
    announcementId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
    isItAssetAnnouncement?: SortOrder
    isItImportantAnnouncement?: SortOrder
  }

  export type AnnouncementAvgOrderByAggregateInput = {
    announcementId?: SortOrder
    authorId?: SortOrder
  }

  export type AnnouncementMaxOrderByAggregateInput = {
    announcementId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
    isItAssetAnnouncement?: SortOrder
    isItImportantAnnouncement?: SortOrder
  }

  export type AnnouncementMinOrderByAggregateInput = {
    announcementId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
    isItAssetAnnouncement?: SortOrder
    isItImportantAnnouncement?: SortOrder
  }

  export type AnnouncementSumOrderByAggregateInput = {
    announcementId?: SortOrder
    authorId?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AnnouncementScalarRelationFilter = {
    is?: AnnouncementWhereInput
    isNot?: AnnouncementWhereInput
  }

  export type AnnouncementFileOrderByRelevanceInput = {
    fields: AnnouncementFileOrderByRelevanceFieldEnum | AnnouncementFileOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AnnouncementFileCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    originalName?: SortOrder
    fileType?: SortOrder
    announcementId?: SortOrder
    uploadedAt?: SortOrder
  }

  export type AnnouncementFileAvgOrderByAggregateInput = {
    id?: SortOrder
    announcementId?: SortOrder
  }

  export type AnnouncementFileMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    originalName?: SortOrder
    fileType?: SortOrder
    announcementId?: SortOrder
    uploadedAt?: SortOrder
  }

  export type AnnouncementFileMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    originalName?: SortOrder
    fileType?: SortOrder
    announcementId?: SortOrder
    uploadedAt?: SortOrder
  }

  export type AnnouncementFileSumOrderByAggregateInput = {
    id?: SortOrder
    announcementId?: SortOrder
  }

  export type QnABoardOrderByRelevanceInput = {
    fields: QnABoardOrderByRelevanceFieldEnum | QnABoardOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type QnABoardCountOrderByAggregateInput = {
    qnaId?: SortOrder
    qnaTitle?: SortOrder
    qnaContent?: SortOrder
    qnaUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    qnaImageUrl?: SortOrder
  }

  export type QnABoardAvgOrderByAggregateInput = {
    qnaId?: SortOrder
    qnaUserId?: SortOrder
  }

  export type QnABoardMaxOrderByAggregateInput = {
    qnaId?: SortOrder
    qnaTitle?: SortOrder
    qnaContent?: SortOrder
    qnaUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    qnaImageUrl?: SortOrder
  }

  export type QnABoardMinOrderByAggregateInput = {
    qnaId?: SortOrder
    qnaTitle?: SortOrder
    qnaContent?: SortOrder
    qnaUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    qnaImageUrl?: SortOrder
  }

  export type QnABoardSumOrderByAggregateInput = {
    qnaId?: SortOrder
    qnaUserId?: SortOrder
  }

  export type QnABoardScalarRelationFilter = {
    is?: QnABoardWhereInput
    isNot?: QnABoardWhereInput
  }

  export type QnABoardCommentOrderByRelevanceInput = {
    fields: QnABoardCommentOrderByRelevanceFieldEnum | QnABoardCommentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type QnABoardCommentCountOrderByAggregateInput = {
    commentId?: SortOrder
    commentContent?: SortOrder
    commentUserId?: SortOrder
    qnaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QnABoardCommentAvgOrderByAggregateInput = {
    commentId?: SortOrder
    commentUserId?: SortOrder
    qnaId?: SortOrder
  }

  export type QnABoardCommentMaxOrderByAggregateInput = {
    commentId?: SortOrder
    commentContent?: SortOrder
    commentUserId?: SortOrder
    qnaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QnABoardCommentMinOrderByAggregateInput = {
    commentId?: SortOrder
    commentContent?: SortOrder
    commentUserId?: SortOrder
    qnaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QnABoardCommentSumOrderByAggregateInput = {
    commentId?: SortOrder
    commentUserId?: SortOrder
    qnaId?: SortOrder
  }

  export type AdminCreateNestedOneWithoutUserInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput
    connect?: AdminWhereUniqueInput
  }

  export type QnABoardCreateNestedManyWithoutUserInput = {
    create?: XOR<QnABoardCreateWithoutUserInput, QnABoardUncheckedCreateWithoutUserInput> | QnABoardCreateWithoutUserInput[] | QnABoardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QnABoardCreateOrConnectWithoutUserInput | QnABoardCreateOrConnectWithoutUserInput[]
    createMany?: QnABoardCreateManyUserInputEnvelope
    connect?: QnABoardWhereUniqueInput | QnABoardWhereUniqueInput[]
  }

  export type QnABoardCommentCreateNestedManyWithoutUserInput = {
    create?: XOR<QnABoardCommentCreateWithoutUserInput, QnABoardCommentUncheckedCreateWithoutUserInput> | QnABoardCommentCreateWithoutUserInput[] | QnABoardCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QnABoardCommentCreateOrConnectWithoutUserInput | QnABoardCommentCreateOrConnectWithoutUserInput[]
    createMany?: QnABoardCommentCreateManyUserInputEnvelope
    connect?: QnABoardCommentWhereUniqueInput | QnABoardCommentWhereUniqueInput[]
  }

  export type StudentCreateNestedOneWithoutUserInput = {
    create?: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentCreateOrConnectWithoutUserInput
    connect?: StudentWhereUniqueInput
  }

  export type AdminUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput
    connect?: AdminWhereUniqueInput
  }

  export type QnABoardUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<QnABoardCreateWithoutUserInput, QnABoardUncheckedCreateWithoutUserInput> | QnABoardCreateWithoutUserInput[] | QnABoardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QnABoardCreateOrConnectWithoutUserInput | QnABoardCreateOrConnectWithoutUserInput[]
    createMany?: QnABoardCreateManyUserInputEnvelope
    connect?: QnABoardWhereUniqueInput | QnABoardWhereUniqueInput[]
  }

  export type QnABoardCommentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<QnABoardCommentCreateWithoutUserInput, QnABoardCommentUncheckedCreateWithoutUserInput> | QnABoardCommentCreateWithoutUserInput[] | QnABoardCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QnABoardCommentCreateOrConnectWithoutUserInput | QnABoardCommentCreateOrConnectWithoutUserInput[]
    createMany?: QnABoardCommentCreateManyUserInputEnvelope
    connect?: QnABoardCommentWhereUniqueInput | QnABoardCommentWhereUniqueInput[]
  }

  export type StudentUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentCreateOrConnectWithoutUserInput
    connect?: StudentWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type AdminUpdateOneWithoutUserNestedInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput
    upsert?: AdminUpsertWithoutUserInput
    disconnect?: AdminWhereInput | boolean
    delete?: AdminWhereInput | boolean
    connect?: AdminWhereUniqueInput
    update?: XOR<XOR<AdminUpdateToOneWithWhereWithoutUserInput, AdminUpdateWithoutUserInput>, AdminUncheckedUpdateWithoutUserInput>
  }

  export type QnABoardUpdateManyWithoutUserNestedInput = {
    create?: XOR<QnABoardCreateWithoutUserInput, QnABoardUncheckedCreateWithoutUserInput> | QnABoardCreateWithoutUserInput[] | QnABoardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QnABoardCreateOrConnectWithoutUserInput | QnABoardCreateOrConnectWithoutUserInput[]
    upsert?: QnABoardUpsertWithWhereUniqueWithoutUserInput | QnABoardUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: QnABoardCreateManyUserInputEnvelope
    set?: QnABoardWhereUniqueInput | QnABoardWhereUniqueInput[]
    disconnect?: QnABoardWhereUniqueInput | QnABoardWhereUniqueInput[]
    delete?: QnABoardWhereUniqueInput | QnABoardWhereUniqueInput[]
    connect?: QnABoardWhereUniqueInput | QnABoardWhereUniqueInput[]
    update?: QnABoardUpdateWithWhereUniqueWithoutUserInput | QnABoardUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: QnABoardUpdateManyWithWhereWithoutUserInput | QnABoardUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: QnABoardScalarWhereInput | QnABoardScalarWhereInput[]
  }

  export type QnABoardCommentUpdateManyWithoutUserNestedInput = {
    create?: XOR<QnABoardCommentCreateWithoutUserInput, QnABoardCommentUncheckedCreateWithoutUserInput> | QnABoardCommentCreateWithoutUserInput[] | QnABoardCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QnABoardCommentCreateOrConnectWithoutUserInput | QnABoardCommentCreateOrConnectWithoutUserInput[]
    upsert?: QnABoardCommentUpsertWithWhereUniqueWithoutUserInput | QnABoardCommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: QnABoardCommentCreateManyUserInputEnvelope
    set?: QnABoardCommentWhereUniqueInput | QnABoardCommentWhereUniqueInput[]
    disconnect?: QnABoardCommentWhereUniqueInput | QnABoardCommentWhereUniqueInput[]
    delete?: QnABoardCommentWhereUniqueInput | QnABoardCommentWhereUniqueInput[]
    connect?: QnABoardCommentWhereUniqueInput | QnABoardCommentWhereUniqueInput[]
    update?: QnABoardCommentUpdateWithWhereUniqueWithoutUserInput | QnABoardCommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: QnABoardCommentUpdateManyWithWhereWithoutUserInput | QnABoardCommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: QnABoardCommentScalarWhereInput | QnABoardCommentScalarWhereInput[]
  }

  export type StudentUpdateOneWithoutUserNestedInput = {
    create?: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentCreateOrConnectWithoutUserInput
    upsert?: StudentUpsertWithoutUserInput
    disconnect?: StudentWhereInput | boolean
    delete?: StudentWhereInput | boolean
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutUserInput, StudentUpdateWithoutUserInput>, StudentUncheckedUpdateWithoutUserInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AdminUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput
    upsert?: AdminUpsertWithoutUserInput
    disconnect?: AdminWhereInput | boolean
    delete?: AdminWhereInput | boolean
    connect?: AdminWhereUniqueInput
    update?: XOR<XOR<AdminUpdateToOneWithWhereWithoutUserInput, AdminUpdateWithoutUserInput>, AdminUncheckedUpdateWithoutUserInput>
  }

  export type QnABoardUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<QnABoardCreateWithoutUserInput, QnABoardUncheckedCreateWithoutUserInput> | QnABoardCreateWithoutUserInput[] | QnABoardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QnABoardCreateOrConnectWithoutUserInput | QnABoardCreateOrConnectWithoutUserInput[]
    upsert?: QnABoardUpsertWithWhereUniqueWithoutUserInput | QnABoardUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: QnABoardCreateManyUserInputEnvelope
    set?: QnABoardWhereUniqueInput | QnABoardWhereUniqueInput[]
    disconnect?: QnABoardWhereUniqueInput | QnABoardWhereUniqueInput[]
    delete?: QnABoardWhereUniqueInput | QnABoardWhereUniqueInput[]
    connect?: QnABoardWhereUniqueInput | QnABoardWhereUniqueInput[]
    update?: QnABoardUpdateWithWhereUniqueWithoutUserInput | QnABoardUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: QnABoardUpdateManyWithWhereWithoutUserInput | QnABoardUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: QnABoardScalarWhereInput | QnABoardScalarWhereInput[]
  }

  export type QnABoardCommentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<QnABoardCommentCreateWithoutUserInput, QnABoardCommentUncheckedCreateWithoutUserInput> | QnABoardCommentCreateWithoutUserInput[] | QnABoardCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QnABoardCommentCreateOrConnectWithoutUserInput | QnABoardCommentCreateOrConnectWithoutUserInput[]
    upsert?: QnABoardCommentUpsertWithWhereUniqueWithoutUserInput | QnABoardCommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: QnABoardCommentCreateManyUserInputEnvelope
    set?: QnABoardCommentWhereUniqueInput | QnABoardCommentWhereUniqueInput[]
    disconnect?: QnABoardCommentWhereUniqueInput | QnABoardCommentWhereUniqueInput[]
    delete?: QnABoardCommentWhereUniqueInput | QnABoardCommentWhereUniqueInput[]
    connect?: QnABoardCommentWhereUniqueInput | QnABoardCommentWhereUniqueInput[]
    update?: QnABoardCommentUpdateWithWhereUniqueWithoutUserInput | QnABoardCommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: QnABoardCommentUpdateManyWithWhereWithoutUserInput | QnABoardCommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: QnABoardCommentScalarWhereInput | QnABoardCommentScalarWhereInput[]
  }

  export type StudentUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentCreateOrConnectWithoutUserInput
    upsert?: StudentUpsertWithoutUserInput
    disconnect?: StudentWhereInput | boolean
    delete?: StudentWhereInput | boolean
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutUserInput, StudentUpdateWithoutUserInput>, StudentUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutAdminInput = {
    create?: XOR<UserCreateWithoutAdminInput, UserUncheckedCreateWithoutAdminInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdminInput
    connect?: UserWhereUniqueInput
  }

  export type AnnouncementCreateNestedManyWithoutAuthorInput = {
    create?: XOR<AnnouncementCreateWithoutAuthorInput, AnnouncementUncheckedCreateWithoutAuthorInput> | AnnouncementCreateWithoutAuthorInput[] | AnnouncementUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAuthorInput | AnnouncementCreateOrConnectWithoutAuthorInput[]
    createMany?: AnnouncementCreateManyAuthorInputEnvelope
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
  }

  export type AcademyCreateNestedManyWithoutAdminsInput = {
    create?: XOR<AcademyCreateWithoutAdminsInput, AcademyUncheckedCreateWithoutAdminsInput> | AcademyCreateWithoutAdminsInput[] | AcademyUncheckedCreateWithoutAdminsInput[]
    connectOrCreate?: AcademyCreateOrConnectWithoutAdminsInput | AcademyCreateOrConnectWithoutAdminsInput[]
    connect?: AcademyWhereUniqueInput | AcademyWhereUniqueInput[]
  }

  export type AnnouncementUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<AnnouncementCreateWithoutAuthorInput, AnnouncementUncheckedCreateWithoutAuthorInput> | AnnouncementCreateWithoutAuthorInput[] | AnnouncementUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAuthorInput | AnnouncementCreateOrConnectWithoutAuthorInput[]
    createMany?: AnnouncementCreateManyAuthorInputEnvelope
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
  }

  export type AcademyUncheckedCreateNestedManyWithoutAdminsInput = {
    create?: XOR<AcademyCreateWithoutAdminsInput, AcademyUncheckedCreateWithoutAdminsInput> | AcademyCreateWithoutAdminsInput[] | AcademyUncheckedCreateWithoutAdminsInput[]
    connectOrCreate?: AcademyCreateOrConnectWithoutAdminsInput | AcademyCreateOrConnectWithoutAdminsInput[]
    connect?: AcademyWhereUniqueInput | AcademyWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutAdminNestedInput = {
    create?: XOR<UserCreateWithoutAdminInput, UserUncheckedCreateWithoutAdminInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdminInput
    upsert?: UserUpsertWithoutAdminInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAdminInput, UserUpdateWithoutAdminInput>, UserUncheckedUpdateWithoutAdminInput>
  }

  export type AnnouncementUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<AnnouncementCreateWithoutAuthorInput, AnnouncementUncheckedCreateWithoutAuthorInput> | AnnouncementCreateWithoutAuthorInput[] | AnnouncementUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAuthorInput | AnnouncementCreateOrConnectWithoutAuthorInput[]
    upsert?: AnnouncementUpsertWithWhereUniqueWithoutAuthorInput | AnnouncementUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: AnnouncementCreateManyAuthorInputEnvelope
    set?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    disconnect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    delete?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    update?: AnnouncementUpdateWithWhereUniqueWithoutAuthorInput | AnnouncementUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: AnnouncementUpdateManyWithWhereWithoutAuthorInput | AnnouncementUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: AnnouncementScalarWhereInput | AnnouncementScalarWhereInput[]
  }

  export type AcademyUpdateManyWithoutAdminsNestedInput = {
    create?: XOR<AcademyCreateWithoutAdminsInput, AcademyUncheckedCreateWithoutAdminsInput> | AcademyCreateWithoutAdminsInput[] | AcademyUncheckedCreateWithoutAdminsInput[]
    connectOrCreate?: AcademyCreateOrConnectWithoutAdminsInput | AcademyCreateOrConnectWithoutAdminsInput[]
    upsert?: AcademyUpsertWithWhereUniqueWithoutAdminsInput | AcademyUpsertWithWhereUniqueWithoutAdminsInput[]
    set?: AcademyWhereUniqueInput | AcademyWhereUniqueInput[]
    disconnect?: AcademyWhereUniqueInput | AcademyWhereUniqueInput[]
    delete?: AcademyWhereUniqueInput | AcademyWhereUniqueInput[]
    connect?: AcademyWhereUniqueInput | AcademyWhereUniqueInput[]
    update?: AcademyUpdateWithWhereUniqueWithoutAdminsInput | AcademyUpdateWithWhereUniqueWithoutAdminsInput[]
    updateMany?: AcademyUpdateManyWithWhereWithoutAdminsInput | AcademyUpdateManyWithWhereWithoutAdminsInput[]
    deleteMany?: AcademyScalarWhereInput | AcademyScalarWhereInput[]
  }

  export type AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<AnnouncementCreateWithoutAuthorInput, AnnouncementUncheckedCreateWithoutAuthorInput> | AnnouncementCreateWithoutAuthorInput[] | AnnouncementUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAuthorInput | AnnouncementCreateOrConnectWithoutAuthorInput[]
    upsert?: AnnouncementUpsertWithWhereUniqueWithoutAuthorInput | AnnouncementUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: AnnouncementCreateManyAuthorInputEnvelope
    set?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    disconnect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    delete?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    update?: AnnouncementUpdateWithWhereUniqueWithoutAuthorInput | AnnouncementUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: AnnouncementUpdateManyWithWhereWithoutAuthorInput | AnnouncementUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: AnnouncementScalarWhereInput | AnnouncementScalarWhereInput[]
  }

  export type AcademyUncheckedUpdateManyWithoutAdminsNestedInput = {
    create?: XOR<AcademyCreateWithoutAdminsInput, AcademyUncheckedCreateWithoutAdminsInput> | AcademyCreateWithoutAdminsInput[] | AcademyUncheckedCreateWithoutAdminsInput[]
    connectOrCreate?: AcademyCreateOrConnectWithoutAdminsInput | AcademyCreateOrConnectWithoutAdminsInput[]
    upsert?: AcademyUpsertWithWhereUniqueWithoutAdminsInput | AcademyUpsertWithWhereUniqueWithoutAdminsInput[]
    set?: AcademyWhereUniqueInput | AcademyWhereUniqueInput[]
    disconnect?: AcademyWhereUniqueInput | AcademyWhereUniqueInput[]
    delete?: AcademyWhereUniqueInput | AcademyWhereUniqueInput[]
    connect?: AcademyWhereUniqueInput | AcademyWhereUniqueInput[]
    update?: AcademyUpdateWithWhereUniqueWithoutAdminsInput | AcademyUpdateWithWhereUniqueWithoutAdminsInput[]
    updateMany?: AcademyUpdateManyWithWhereWithoutAdminsInput | AcademyUpdateManyWithWhereWithoutAdminsInput[]
    deleteMany?: AcademyScalarWhereInput | AcademyScalarWhereInput[]
  }

  export type AcademyCreateNestedOneWithoutStudentsInput = {
    create?: XOR<AcademyCreateWithoutStudentsInput, AcademyUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: AcademyCreateOrConnectWithoutStudentsInput
    connect?: AcademyWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutStudentInput = {
    create?: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
    connectOrCreate?: UserCreateOrConnectWithoutStudentInput
    connect?: UserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type AcademyUpdateOneRequiredWithoutStudentsNestedInput = {
    create?: XOR<AcademyCreateWithoutStudentsInput, AcademyUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: AcademyCreateOrConnectWithoutStudentsInput
    upsert?: AcademyUpsertWithoutStudentsInput
    connect?: AcademyWhereUniqueInput
    update?: XOR<XOR<AcademyUpdateToOneWithWhereWithoutStudentsInput, AcademyUpdateWithoutStudentsInput>, AcademyUncheckedUpdateWithoutStudentsInput>
  }

  export type UserUpdateOneRequiredWithoutStudentNestedInput = {
    create?: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
    connectOrCreate?: UserCreateOrConnectWithoutStudentInput
    upsert?: UserUpsertWithoutStudentInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStudentInput, UserUpdateWithoutStudentInput>, UserUncheckedUpdateWithoutStudentInput>
  }

  export type AcademyImageCreateNestedManyWithoutAcademyInput = {
    create?: XOR<AcademyImageCreateWithoutAcademyInput, AcademyImageUncheckedCreateWithoutAcademyInput> | AcademyImageCreateWithoutAcademyInput[] | AcademyImageUncheckedCreateWithoutAcademyInput[]
    connectOrCreate?: AcademyImageCreateOrConnectWithoutAcademyInput | AcademyImageCreateOrConnectWithoutAcademyInput[]
    createMany?: AcademyImageCreateManyAcademyInputEnvelope
    connect?: AcademyImageWhereUniqueInput | AcademyImageWhereUniqueInput[]
  }

  export type StudentCreateNestedManyWithoutAcademyInput = {
    create?: XOR<StudentCreateWithoutAcademyInput, StudentUncheckedCreateWithoutAcademyInput> | StudentCreateWithoutAcademyInput[] | StudentUncheckedCreateWithoutAcademyInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutAcademyInput | StudentCreateOrConnectWithoutAcademyInput[]
    createMany?: StudentCreateManyAcademyInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type AdminCreateNestedManyWithoutAcademyInput = {
    create?: XOR<AdminCreateWithoutAcademyInput, AdminUncheckedCreateWithoutAcademyInput> | AdminCreateWithoutAcademyInput[] | AdminUncheckedCreateWithoutAcademyInput[]
    connectOrCreate?: AdminCreateOrConnectWithoutAcademyInput | AdminCreateOrConnectWithoutAcademyInput[]
    connect?: AdminWhereUniqueInput | AdminWhereUniqueInput[]
  }

  export type AnnouncementCreateNestedManyWithoutAcademiesInput = {
    create?: XOR<AnnouncementCreateWithoutAcademiesInput, AnnouncementUncheckedCreateWithoutAcademiesInput> | AnnouncementCreateWithoutAcademiesInput[] | AnnouncementUncheckedCreateWithoutAcademiesInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAcademiesInput | AnnouncementCreateOrConnectWithoutAcademiesInput[]
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
  }

  export type AcademyImageUncheckedCreateNestedManyWithoutAcademyInput = {
    create?: XOR<AcademyImageCreateWithoutAcademyInput, AcademyImageUncheckedCreateWithoutAcademyInput> | AcademyImageCreateWithoutAcademyInput[] | AcademyImageUncheckedCreateWithoutAcademyInput[]
    connectOrCreate?: AcademyImageCreateOrConnectWithoutAcademyInput | AcademyImageCreateOrConnectWithoutAcademyInput[]
    createMany?: AcademyImageCreateManyAcademyInputEnvelope
    connect?: AcademyImageWhereUniqueInput | AcademyImageWhereUniqueInput[]
  }

  export type StudentUncheckedCreateNestedManyWithoutAcademyInput = {
    create?: XOR<StudentCreateWithoutAcademyInput, StudentUncheckedCreateWithoutAcademyInput> | StudentCreateWithoutAcademyInput[] | StudentUncheckedCreateWithoutAcademyInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutAcademyInput | StudentCreateOrConnectWithoutAcademyInput[]
    createMany?: StudentCreateManyAcademyInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type AdminUncheckedCreateNestedManyWithoutAcademyInput = {
    create?: XOR<AdminCreateWithoutAcademyInput, AdminUncheckedCreateWithoutAcademyInput> | AdminCreateWithoutAcademyInput[] | AdminUncheckedCreateWithoutAcademyInput[]
    connectOrCreate?: AdminCreateOrConnectWithoutAcademyInput | AdminCreateOrConnectWithoutAcademyInput[]
    connect?: AdminWhereUniqueInput | AdminWhereUniqueInput[]
  }

  export type AnnouncementUncheckedCreateNestedManyWithoutAcademiesInput = {
    create?: XOR<AnnouncementCreateWithoutAcademiesInput, AnnouncementUncheckedCreateWithoutAcademiesInput> | AnnouncementCreateWithoutAcademiesInput[] | AnnouncementUncheckedCreateWithoutAcademiesInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAcademiesInput | AnnouncementCreateOrConnectWithoutAcademiesInput[]
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
  }

  export type AcademyImageUpdateManyWithoutAcademyNestedInput = {
    create?: XOR<AcademyImageCreateWithoutAcademyInput, AcademyImageUncheckedCreateWithoutAcademyInput> | AcademyImageCreateWithoutAcademyInput[] | AcademyImageUncheckedCreateWithoutAcademyInput[]
    connectOrCreate?: AcademyImageCreateOrConnectWithoutAcademyInput | AcademyImageCreateOrConnectWithoutAcademyInput[]
    upsert?: AcademyImageUpsertWithWhereUniqueWithoutAcademyInput | AcademyImageUpsertWithWhereUniqueWithoutAcademyInput[]
    createMany?: AcademyImageCreateManyAcademyInputEnvelope
    set?: AcademyImageWhereUniqueInput | AcademyImageWhereUniqueInput[]
    disconnect?: AcademyImageWhereUniqueInput | AcademyImageWhereUniqueInput[]
    delete?: AcademyImageWhereUniqueInput | AcademyImageWhereUniqueInput[]
    connect?: AcademyImageWhereUniqueInput | AcademyImageWhereUniqueInput[]
    update?: AcademyImageUpdateWithWhereUniqueWithoutAcademyInput | AcademyImageUpdateWithWhereUniqueWithoutAcademyInput[]
    updateMany?: AcademyImageUpdateManyWithWhereWithoutAcademyInput | AcademyImageUpdateManyWithWhereWithoutAcademyInput[]
    deleteMany?: AcademyImageScalarWhereInput | AcademyImageScalarWhereInput[]
  }

  export type StudentUpdateManyWithoutAcademyNestedInput = {
    create?: XOR<StudentCreateWithoutAcademyInput, StudentUncheckedCreateWithoutAcademyInput> | StudentCreateWithoutAcademyInput[] | StudentUncheckedCreateWithoutAcademyInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutAcademyInput | StudentCreateOrConnectWithoutAcademyInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutAcademyInput | StudentUpsertWithWhereUniqueWithoutAcademyInput[]
    createMany?: StudentCreateManyAcademyInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutAcademyInput | StudentUpdateWithWhereUniqueWithoutAcademyInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutAcademyInput | StudentUpdateManyWithWhereWithoutAcademyInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type AdminUpdateManyWithoutAcademyNestedInput = {
    create?: XOR<AdminCreateWithoutAcademyInput, AdminUncheckedCreateWithoutAcademyInput> | AdminCreateWithoutAcademyInput[] | AdminUncheckedCreateWithoutAcademyInput[]
    connectOrCreate?: AdminCreateOrConnectWithoutAcademyInput | AdminCreateOrConnectWithoutAcademyInput[]
    upsert?: AdminUpsertWithWhereUniqueWithoutAcademyInput | AdminUpsertWithWhereUniqueWithoutAcademyInput[]
    set?: AdminWhereUniqueInput | AdminWhereUniqueInput[]
    disconnect?: AdminWhereUniqueInput | AdminWhereUniqueInput[]
    delete?: AdminWhereUniqueInput | AdminWhereUniqueInput[]
    connect?: AdminWhereUniqueInput | AdminWhereUniqueInput[]
    update?: AdminUpdateWithWhereUniqueWithoutAcademyInput | AdminUpdateWithWhereUniqueWithoutAcademyInput[]
    updateMany?: AdminUpdateManyWithWhereWithoutAcademyInput | AdminUpdateManyWithWhereWithoutAcademyInput[]
    deleteMany?: AdminScalarWhereInput | AdminScalarWhereInput[]
  }

  export type AnnouncementUpdateManyWithoutAcademiesNestedInput = {
    create?: XOR<AnnouncementCreateWithoutAcademiesInput, AnnouncementUncheckedCreateWithoutAcademiesInput> | AnnouncementCreateWithoutAcademiesInput[] | AnnouncementUncheckedCreateWithoutAcademiesInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAcademiesInput | AnnouncementCreateOrConnectWithoutAcademiesInput[]
    upsert?: AnnouncementUpsertWithWhereUniqueWithoutAcademiesInput | AnnouncementUpsertWithWhereUniqueWithoutAcademiesInput[]
    set?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    disconnect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    delete?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    update?: AnnouncementUpdateWithWhereUniqueWithoutAcademiesInput | AnnouncementUpdateWithWhereUniqueWithoutAcademiesInput[]
    updateMany?: AnnouncementUpdateManyWithWhereWithoutAcademiesInput | AnnouncementUpdateManyWithWhereWithoutAcademiesInput[]
    deleteMany?: AnnouncementScalarWhereInput | AnnouncementScalarWhereInput[]
  }

  export type AcademyImageUncheckedUpdateManyWithoutAcademyNestedInput = {
    create?: XOR<AcademyImageCreateWithoutAcademyInput, AcademyImageUncheckedCreateWithoutAcademyInput> | AcademyImageCreateWithoutAcademyInput[] | AcademyImageUncheckedCreateWithoutAcademyInput[]
    connectOrCreate?: AcademyImageCreateOrConnectWithoutAcademyInput | AcademyImageCreateOrConnectWithoutAcademyInput[]
    upsert?: AcademyImageUpsertWithWhereUniqueWithoutAcademyInput | AcademyImageUpsertWithWhereUniqueWithoutAcademyInput[]
    createMany?: AcademyImageCreateManyAcademyInputEnvelope
    set?: AcademyImageWhereUniqueInput | AcademyImageWhereUniqueInput[]
    disconnect?: AcademyImageWhereUniqueInput | AcademyImageWhereUniqueInput[]
    delete?: AcademyImageWhereUniqueInput | AcademyImageWhereUniqueInput[]
    connect?: AcademyImageWhereUniqueInput | AcademyImageWhereUniqueInput[]
    update?: AcademyImageUpdateWithWhereUniqueWithoutAcademyInput | AcademyImageUpdateWithWhereUniqueWithoutAcademyInput[]
    updateMany?: AcademyImageUpdateManyWithWhereWithoutAcademyInput | AcademyImageUpdateManyWithWhereWithoutAcademyInput[]
    deleteMany?: AcademyImageScalarWhereInput | AcademyImageScalarWhereInput[]
  }

  export type StudentUncheckedUpdateManyWithoutAcademyNestedInput = {
    create?: XOR<StudentCreateWithoutAcademyInput, StudentUncheckedCreateWithoutAcademyInput> | StudentCreateWithoutAcademyInput[] | StudentUncheckedCreateWithoutAcademyInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutAcademyInput | StudentCreateOrConnectWithoutAcademyInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutAcademyInput | StudentUpsertWithWhereUniqueWithoutAcademyInput[]
    createMany?: StudentCreateManyAcademyInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutAcademyInput | StudentUpdateWithWhereUniqueWithoutAcademyInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutAcademyInput | StudentUpdateManyWithWhereWithoutAcademyInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type AdminUncheckedUpdateManyWithoutAcademyNestedInput = {
    create?: XOR<AdminCreateWithoutAcademyInput, AdminUncheckedCreateWithoutAcademyInput> | AdminCreateWithoutAcademyInput[] | AdminUncheckedCreateWithoutAcademyInput[]
    connectOrCreate?: AdminCreateOrConnectWithoutAcademyInput | AdminCreateOrConnectWithoutAcademyInput[]
    upsert?: AdminUpsertWithWhereUniqueWithoutAcademyInput | AdminUpsertWithWhereUniqueWithoutAcademyInput[]
    set?: AdminWhereUniqueInput | AdminWhereUniqueInput[]
    disconnect?: AdminWhereUniqueInput | AdminWhereUniqueInput[]
    delete?: AdminWhereUniqueInput | AdminWhereUniqueInput[]
    connect?: AdminWhereUniqueInput | AdminWhereUniqueInput[]
    update?: AdminUpdateWithWhereUniqueWithoutAcademyInput | AdminUpdateWithWhereUniqueWithoutAcademyInput[]
    updateMany?: AdminUpdateManyWithWhereWithoutAcademyInput | AdminUpdateManyWithWhereWithoutAcademyInput[]
    deleteMany?: AdminScalarWhereInput | AdminScalarWhereInput[]
  }

  export type AnnouncementUncheckedUpdateManyWithoutAcademiesNestedInput = {
    create?: XOR<AnnouncementCreateWithoutAcademiesInput, AnnouncementUncheckedCreateWithoutAcademiesInput> | AnnouncementCreateWithoutAcademiesInput[] | AnnouncementUncheckedCreateWithoutAcademiesInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAcademiesInput | AnnouncementCreateOrConnectWithoutAcademiesInput[]
    upsert?: AnnouncementUpsertWithWhereUniqueWithoutAcademiesInput | AnnouncementUpsertWithWhereUniqueWithoutAcademiesInput[]
    set?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    disconnect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    delete?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    update?: AnnouncementUpdateWithWhereUniqueWithoutAcademiesInput | AnnouncementUpdateWithWhereUniqueWithoutAcademiesInput[]
    updateMany?: AnnouncementUpdateManyWithWhereWithoutAcademiesInput | AnnouncementUpdateManyWithWhereWithoutAcademiesInput[]
    deleteMany?: AnnouncementScalarWhereInput | AnnouncementScalarWhereInput[]
  }

  export type AcademyCreateNestedOneWithoutImagesInput = {
    create?: XOR<AcademyCreateWithoutImagesInput, AcademyUncheckedCreateWithoutImagesInput>
    connectOrCreate?: AcademyCreateOrConnectWithoutImagesInput
    connect?: AcademyWhereUniqueInput
  }

  export type AcademyUpdateOneRequiredWithoutImagesNestedInput = {
    create?: XOR<AcademyCreateWithoutImagesInput, AcademyUncheckedCreateWithoutImagesInput>
    connectOrCreate?: AcademyCreateOrConnectWithoutImagesInput
    upsert?: AcademyUpsertWithoutImagesInput
    connect?: AcademyWhereUniqueInput
    update?: XOR<XOR<AcademyUpdateToOneWithWhereWithoutImagesInput, AcademyUpdateWithoutImagesInput>, AcademyUncheckedUpdateWithoutImagesInput>
  }

  export type AdminCreateNestedOneWithoutAnnouncementInput = {
    create?: XOR<AdminCreateWithoutAnnouncementInput, AdminUncheckedCreateWithoutAnnouncementInput>
    connectOrCreate?: AdminCreateOrConnectWithoutAnnouncementInput
    connect?: AdminWhereUniqueInput
  }

  export type AnnouncementFileCreateNestedManyWithoutAnnouncementInput = {
    create?: XOR<AnnouncementFileCreateWithoutAnnouncementInput, AnnouncementFileUncheckedCreateWithoutAnnouncementInput> | AnnouncementFileCreateWithoutAnnouncementInput[] | AnnouncementFileUncheckedCreateWithoutAnnouncementInput[]
    connectOrCreate?: AnnouncementFileCreateOrConnectWithoutAnnouncementInput | AnnouncementFileCreateOrConnectWithoutAnnouncementInput[]
    createMany?: AnnouncementFileCreateManyAnnouncementInputEnvelope
    connect?: AnnouncementFileWhereUniqueInput | AnnouncementFileWhereUniqueInput[]
  }

  export type AcademyCreateNestedManyWithoutAnnouncementsInput = {
    create?: XOR<AcademyCreateWithoutAnnouncementsInput, AcademyUncheckedCreateWithoutAnnouncementsInput> | AcademyCreateWithoutAnnouncementsInput[] | AcademyUncheckedCreateWithoutAnnouncementsInput[]
    connectOrCreate?: AcademyCreateOrConnectWithoutAnnouncementsInput | AcademyCreateOrConnectWithoutAnnouncementsInput[]
    connect?: AcademyWhereUniqueInput | AcademyWhereUniqueInput[]
  }

  export type AnnouncementFileUncheckedCreateNestedManyWithoutAnnouncementInput = {
    create?: XOR<AnnouncementFileCreateWithoutAnnouncementInput, AnnouncementFileUncheckedCreateWithoutAnnouncementInput> | AnnouncementFileCreateWithoutAnnouncementInput[] | AnnouncementFileUncheckedCreateWithoutAnnouncementInput[]
    connectOrCreate?: AnnouncementFileCreateOrConnectWithoutAnnouncementInput | AnnouncementFileCreateOrConnectWithoutAnnouncementInput[]
    createMany?: AnnouncementFileCreateManyAnnouncementInputEnvelope
    connect?: AnnouncementFileWhereUniqueInput | AnnouncementFileWhereUniqueInput[]
  }

  export type AcademyUncheckedCreateNestedManyWithoutAnnouncementsInput = {
    create?: XOR<AcademyCreateWithoutAnnouncementsInput, AcademyUncheckedCreateWithoutAnnouncementsInput> | AcademyCreateWithoutAnnouncementsInput[] | AcademyUncheckedCreateWithoutAnnouncementsInput[]
    connectOrCreate?: AcademyCreateOrConnectWithoutAnnouncementsInput | AcademyCreateOrConnectWithoutAnnouncementsInput[]
    connect?: AcademyWhereUniqueInput | AcademyWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type AdminUpdateOneWithoutAnnouncementNestedInput = {
    create?: XOR<AdminCreateWithoutAnnouncementInput, AdminUncheckedCreateWithoutAnnouncementInput>
    connectOrCreate?: AdminCreateOrConnectWithoutAnnouncementInput
    upsert?: AdminUpsertWithoutAnnouncementInput
    disconnect?: AdminWhereInput | boolean
    delete?: AdminWhereInput | boolean
    connect?: AdminWhereUniqueInput
    update?: XOR<XOR<AdminUpdateToOneWithWhereWithoutAnnouncementInput, AdminUpdateWithoutAnnouncementInput>, AdminUncheckedUpdateWithoutAnnouncementInput>
  }

  export type AnnouncementFileUpdateManyWithoutAnnouncementNestedInput = {
    create?: XOR<AnnouncementFileCreateWithoutAnnouncementInput, AnnouncementFileUncheckedCreateWithoutAnnouncementInput> | AnnouncementFileCreateWithoutAnnouncementInput[] | AnnouncementFileUncheckedCreateWithoutAnnouncementInput[]
    connectOrCreate?: AnnouncementFileCreateOrConnectWithoutAnnouncementInput | AnnouncementFileCreateOrConnectWithoutAnnouncementInput[]
    upsert?: AnnouncementFileUpsertWithWhereUniqueWithoutAnnouncementInput | AnnouncementFileUpsertWithWhereUniqueWithoutAnnouncementInput[]
    createMany?: AnnouncementFileCreateManyAnnouncementInputEnvelope
    set?: AnnouncementFileWhereUniqueInput | AnnouncementFileWhereUniqueInput[]
    disconnect?: AnnouncementFileWhereUniqueInput | AnnouncementFileWhereUniqueInput[]
    delete?: AnnouncementFileWhereUniqueInput | AnnouncementFileWhereUniqueInput[]
    connect?: AnnouncementFileWhereUniqueInput | AnnouncementFileWhereUniqueInput[]
    update?: AnnouncementFileUpdateWithWhereUniqueWithoutAnnouncementInput | AnnouncementFileUpdateWithWhereUniqueWithoutAnnouncementInput[]
    updateMany?: AnnouncementFileUpdateManyWithWhereWithoutAnnouncementInput | AnnouncementFileUpdateManyWithWhereWithoutAnnouncementInput[]
    deleteMany?: AnnouncementFileScalarWhereInput | AnnouncementFileScalarWhereInput[]
  }

  export type AcademyUpdateManyWithoutAnnouncementsNestedInput = {
    create?: XOR<AcademyCreateWithoutAnnouncementsInput, AcademyUncheckedCreateWithoutAnnouncementsInput> | AcademyCreateWithoutAnnouncementsInput[] | AcademyUncheckedCreateWithoutAnnouncementsInput[]
    connectOrCreate?: AcademyCreateOrConnectWithoutAnnouncementsInput | AcademyCreateOrConnectWithoutAnnouncementsInput[]
    upsert?: AcademyUpsertWithWhereUniqueWithoutAnnouncementsInput | AcademyUpsertWithWhereUniqueWithoutAnnouncementsInput[]
    set?: AcademyWhereUniqueInput | AcademyWhereUniqueInput[]
    disconnect?: AcademyWhereUniqueInput | AcademyWhereUniqueInput[]
    delete?: AcademyWhereUniqueInput | AcademyWhereUniqueInput[]
    connect?: AcademyWhereUniqueInput | AcademyWhereUniqueInput[]
    update?: AcademyUpdateWithWhereUniqueWithoutAnnouncementsInput | AcademyUpdateWithWhereUniqueWithoutAnnouncementsInput[]
    updateMany?: AcademyUpdateManyWithWhereWithoutAnnouncementsInput | AcademyUpdateManyWithWhereWithoutAnnouncementsInput[]
    deleteMany?: AcademyScalarWhereInput | AcademyScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AnnouncementFileUncheckedUpdateManyWithoutAnnouncementNestedInput = {
    create?: XOR<AnnouncementFileCreateWithoutAnnouncementInput, AnnouncementFileUncheckedCreateWithoutAnnouncementInput> | AnnouncementFileCreateWithoutAnnouncementInput[] | AnnouncementFileUncheckedCreateWithoutAnnouncementInput[]
    connectOrCreate?: AnnouncementFileCreateOrConnectWithoutAnnouncementInput | AnnouncementFileCreateOrConnectWithoutAnnouncementInput[]
    upsert?: AnnouncementFileUpsertWithWhereUniqueWithoutAnnouncementInput | AnnouncementFileUpsertWithWhereUniqueWithoutAnnouncementInput[]
    createMany?: AnnouncementFileCreateManyAnnouncementInputEnvelope
    set?: AnnouncementFileWhereUniqueInput | AnnouncementFileWhereUniqueInput[]
    disconnect?: AnnouncementFileWhereUniqueInput | AnnouncementFileWhereUniqueInput[]
    delete?: AnnouncementFileWhereUniqueInput | AnnouncementFileWhereUniqueInput[]
    connect?: AnnouncementFileWhereUniqueInput | AnnouncementFileWhereUniqueInput[]
    update?: AnnouncementFileUpdateWithWhereUniqueWithoutAnnouncementInput | AnnouncementFileUpdateWithWhereUniqueWithoutAnnouncementInput[]
    updateMany?: AnnouncementFileUpdateManyWithWhereWithoutAnnouncementInput | AnnouncementFileUpdateManyWithWhereWithoutAnnouncementInput[]
    deleteMany?: AnnouncementFileScalarWhereInput | AnnouncementFileScalarWhereInput[]
  }

  export type AcademyUncheckedUpdateManyWithoutAnnouncementsNestedInput = {
    create?: XOR<AcademyCreateWithoutAnnouncementsInput, AcademyUncheckedCreateWithoutAnnouncementsInput> | AcademyCreateWithoutAnnouncementsInput[] | AcademyUncheckedCreateWithoutAnnouncementsInput[]
    connectOrCreate?: AcademyCreateOrConnectWithoutAnnouncementsInput | AcademyCreateOrConnectWithoutAnnouncementsInput[]
    upsert?: AcademyUpsertWithWhereUniqueWithoutAnnouncementsInput | AcademyUpsertWithWhereUniqueWithoutAnnouncementsInput[]
    set?: AcademyWhereUniqueInput | AcademyWhereUniqueInput[]
    disconnect?: AcademyWhereUniqueInput | AcademyWhereUniqueInput[]
    delete?: AcademyWhereUniqueInput | AcademyWhereUniqueInput[]
    connect?: AcademyWhereUniqueInput | AcademyWhereUniqueInput[]
    update?: AcademyUpdateWithWhereUniqueWithoutAnnouncementsInput | AcademyUpdateWithWhereUniqueWithoutAnnouncementsInput[]
    updateMany?: AcademyUpdateManyWithWhereWithoutAnnouncementsInput | AcademyUpdateManyWithWhereWithoutAnnouncementsInput[]
    deleteMany?: AcademyScalarWhereInput | AcademyScalarWhereInput[]
  }

  export type AnnouncementCreateNestedOneWithoutFilesInput = {
    create?: XOR<AnnouncementCreateWithoutFilesInput, AnnouncementUncheckedCreateWithoutFilesInput>
    connectOrCreate?: AnnouncementCreateOrConnectWithoutFilesInput
    connect?: AnnouncementWhereUniqueInput
  }

  export type AnnouncementUpdateOneRequiredWithoutFilesNestedInput = {
    create?: XOR<AnnouncementCreateWithoutFilesInput, AnnouncementUncheckedCreateWithoutFilesInput>
    connectOrCreate?: AnnouncementCreateOrConnectWithoutFilesInput
    upsert?: AnnouncementUpsertWithoutFilesInput
    connect?: AnnouncementWhereUniqueInput
    update?: XOR<XOR<AnnouncementUpdateToOneWithWhereWithoutFilesInput, AnnouncementUpdateWithoutFilesInput>, AnnouncementUncheckedUpdateWithoutFilesInput>
  }

  export type UserCreateNestedOneWithoutQnaInput = {
    create?: XOR<UserCreateWithoutQnaInput, UserUncheckedCreateWithoutQnaInput>
    connectOrCreate?: UserCreateOrConnectWithoutQnaInput
    connect?: UserWhereUniqueInput
  }

  export type QnABoardCommentCreateNestedManyWithoutQnaInput = {
    create?: XOR<QnABoardCommentCreateWithoutQnaInput, QnABoardCommentUncheckedCreateWithoutQnaInput> | QnABoardCommentCreateWithoutQnaInput[] | QnABoardCommentUncheckedCreateWithoutQnaInput[]
    connectOrCreate?: QnABoardCommentCreateOrConnectWithoutQnaInput | QnABoardCommentCreateOrConnectWithoutQnaInput[]
    createMany?: QnABoardCommentCreateManyQnaInputEnvelope
    connect?: QnABoardCommentWhereUniqueInput | QnABoardCommentWhereUniqueInput[]
  }

  export type QnABoardCommentUncheckedCreateNestedManyWithoutQnaInput = {
    create?: XOR<QnABoardCommentCreateWithoutQnaInput, QnABoardCommentUncheckedCreateWithoutQnaInput> | QnABoardCommentCreateWithoutQnaInput[] | QnABoardCommentUncheckedCreateWithoutQnaInput[]
    connectOrCreate?: QnABoardCommentCreateOrConnectWithoutQnaInput | QnABoardCommentCreateOrConnectWithoutQnaInput[]
    createMany?: QnABoardCommentCreateManyQnaInputEnvelope
    connect?: QnABoardCommentWhereUniqueInput | QnABoardCommentWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutQnaNestedInput = {
    create?: XOR<UserCreateWithoutQnaInput, UserUncheckedCreateWithoutQnaInput>
    connectOrCreate?: UserCreateOrConnectWithoutQnaInput
    upsert?: UserUpsertWithoutQnaInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutQnaInput, UserUpdateWithoutQnaInput>, UserUncheckedUpdateWithoutQnaInput>
  }

  export type QnABoardCommentUpdateManyWithoutQnaNestedInput = {
    create?: XOR<QnABoardCommentCreateWithoutQnaInput, QnABoardCommentUncheckedCreateWithoutQnaInput> | QnABoardCommentCreateWithoutQnaInput[] | QnABoardCommentUncheckedCreateWithoutQnaInput[]
    connectOrCreate?: QnABoardCommentCreateOrConnectWithoutQnaInput | QnABoardCommentCreateOrConnectWithoutQnaInput[]
    upsert?: QnABoardCommentUpsertWithWhereUniqueWithoutQnaInput | QnABoardCommentUpsertWithWhereUniqueWithoutQnaInput[]
    createMany?: QnABoardCommentCreateManyQnaInputEnvelope
    set?: QnABoardCommentWhereUniqueInput | QnABoardCommentWhereUniqueInput[]
    disconnect?: QnABoardCommentWhereUniqueInput | QnABoardCommentWhereUniqueInput[]
    delete?: QnABoardCommentWhereUniqueInput | QnABoardCommentWhereUniqueInput[]
    connect?: QnABoardCommentWhereUniqueInput | QnABoardCommentWhereUniqueInput[]
    update?: QnABoardCommentUpdateWithWhereUniqueWithoutQnaInput | QnABoardCommentUpdateWithWhereUniqueWithoutQnaInput[]
    updateMany?: QnABoardCommentUpdateManyWithWhereWithoutQnaInput | QnABoardCommentUpdateManyWithWhereWithoutQnaInput[]
    deleteMany?: QnABoardCommentScalarWhereInput | QnABoardCommentScalarWhereInput[]
  }

  export type QnABoardCommentUncheckedUpdateManyWithoutQnaNestedInput = {
    create?: XOR<QnABoardCommentCreateWithoutQnaInput, QnABoardCommentUncheckedCreateWithoutQnaInput> | QnABoardCommentCreateWithoutQnaInput[] | QnABoardCommentUncheckedCreateWithoutQnaInput[]
    connectOrCreate?: QnABoardCommentCreateOrConnectWithoutQnaInput | QnABoardCommentCreateOrConnectWithoutQnaInput[]
    upsert?: QnABoardCommentUpsertWithWhereUniqueWithoutQnaInput | QnABoardCommentUpsertWithWhereUniqueWithoutQnaInput[]
    createMany?: QnABoardCommentCreateManyQnaInputEnvelope
    set?: QnABoardCommentWhereUniqueInput | QnABoardCommentWhereUniqueInput[]
    disconnect?: QnABoardCommentWhereUniqueInput | QnABoardCommentWhereUniqueInput[]
    delete?: QnABoardCommentWhereUniqueInput | QnABoardCommentWhereUniqueInput[]
    connect?: QnABoardCommentWhereUniqueInput | QnABoardCommentWhereUniqueInput[]
    update?: QnABoardCommentUpdateWithWhereUniqueWithoutQnaInput | QnABoardCommentUpdateWithWhereUniqueWithoutQnaInput[]
    updateMany?: QnABoardCommentUpdateManyWithWhereWithoutQnaInput | QnABoardCommentUpdateManyWithWhereWithoutQnaInput[]
    deleteMany?: QnABoardCommentScalarWhereInput | QnABoardCommentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutQnaCommentsInput = {
    create?: XOR<UserCreateWithoutQnaCommentsInput, UserUncheckedCreateWithoutQnaCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutQnaCommentsInput
    connect?: UserWhereUniqueInput
  }

  export type QnABoardCreateNestedOneWithoutCommentsInput = {
    create?: XOR<QnABoardCreateWithoutCommentsInput, QnABoardUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: QnABoardCreateOrConnectWithoutCommentsInput
    connect?: QnABoardWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutQnaCommentsNestedInput = {
    create?: XOR<UserCreateWithoutQnaCommentsInput, UserUncheckedCreateWithoutQnaCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutQnaCommentsInput
    upsert?: UserUpsertWithoutQnaCommentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutQnaCommentsInput, UserUpdateWithoutQnaCommentsInput>, UserUncheckedUpdateWithoutQnaCommentsInput>
  }

  export type QnABoardUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<QnABoardCreateWithoutCommentsInput, QnABoardUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: QnABoardCreateOrConnectWithoutCommentsInput
    upsert?: QnABoardUpsertWithoutCommentsInput
    connect?: QnABoardWhereUniqueInput
    update?: XOR<XOR<QnABoardUpdateToOneWithWhereWithoutCommentsInput, QnABoardUpdateWithoutCommentsInput>, QnABoardUncheckedUpdateWithoutCommentsInput>
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
    search?: string
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

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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
    search?: string
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

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
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
    search?: string
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AdminCreateWithoutUserInput = {
    adminName: string
    adminPhone: string
    announcement?: AnnouncementCreateNestedManyWithoutAuthorInput
    academy?: AcademyCreateNestedManyWithoutAdminsInput
  }

  export type AdminUncheckedCreateWithoutUserInput = {
    adminName: string
    adminPhone: string
    announcement?: AnnouncementUncheckedCreateNestedManyWithoutAuthorInput
    academy?: AcademyUncheckedCreateNestedManyWithoutAdminsInput
  }

  export type AdminCreateOrConnectWithoutUserInput = {
    where: AdminWhereUniqueInput
    create: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
  }

  export type QnABoardCreateWithoutUserInput = {
    qnaTitle: string
    qnaContent: string
    createdAt?: Date | string
    updatedAt?: Date | string
    qnaImageUrl?: string | null
    comments?: QnABoardCommentCreateNestedManyWithoutQnaInput
  }

  export type QnABoardUncheckedCreateWithoutUserInput = {
    qnaId?: number
    qnaTitle: string
    qnaContent: string
    createdAt?: Date | string
    updatedAt?: Date | string
    qnaImageUrl?: string | null
    comments?: QnABoardCommentUncheckedCreateNestedManyWithoutQnaInput
  }

  export type QnABoardCreateOrConnectWithoutUserInput = {
    where: QnABoardWhereUniqueInput
    create: XOR<QnABoardCreateWithoutUserInput, QnABoardUncheckedCreateWithoutUserInput>
  }

  export type QnABoardCreateManyUserInputEnvelope = {
    data: QnABoardCreateManyUserInput | QnABoardCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type QnABoardCommentCreateWithoutUserInput = {
    commentContent: string
    createdAt?: Date | string
    updatedAt?: Date | string
    qna: QnABoardCreateNestedOneWithoutCommentsInput
  }

  export type QnABoardCommentUncheckedCreateWithoutUserInput = {
    commentId?: number
    commentContent: string
    qnaId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QnABoardCommentCreateOrConnectWithoutUserInput = {
    where: QnABoardCommentWhereUniqueInput
    create: XOR<QnABoardCommentCreateWithoutUserInput, QnABoardCommentUncheckedCreateWithoutUserInput>
  }

  export type QnABoardCommentCreateManyUserInputEnvelope = {
    data: QnABoardCommentCreateManyUserInput | QnABoardCommentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type StudentCreateWithoutUserInput = {
    studentName: string
    studentPhone: string
    studentHighschool?: string | null
    studentBirthYear: number
    studentMemo?: string | null
    academy: AcademyCreateNestedOneWithoutStudentsInput
  }

  export type StudentUncheckedCreateWithoutUserInput = {
    academyId: number
    studentName: string
    studentPhone: string
    studentHighschool?: string | null
    studentBirthYear: number
    studentMemo?: string | null
  }

  export type StudentCreateOrConnectWithoutUserInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
  }

  export type AdminUpsertWithoutUserInput = {
    update: XOR<AdminUpdateWithoutUserInput, AdminUncheckedUpdateWithoutUserInput>
    create: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    where?: AdminWhereInput
  }

  export type AdminUpdateToOneWithWhereWithoutUserInput = {
    where?: AdminWhereInput
    data: XOR<AdminUpdateWithoutUserInput, AdminUncheckedUpdateWithoutUserInput>
  }

  export type AdminUpdateWithoutUserInput = {
    adminName?: StringFieldUpdateOperationsInput | string
    adminPhone?: StringFieldUpdateOperationsInput | string
    announcement?: AnnouncementUpdateManyWithoutAuthorNestedInput
    academy?: AcademyUpdateManyWithoutAdminsNestedInput
  }

  export type AdminUncheckedUpdateWithoutUserInput = {
    adminName?: StringFieldUpdateOperationsInput | string
    adminPhone?: StringFieldUpdateOperationsInput | string
    announcement?: AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput
    academy?: AcademyUncheckedUpdateManyWithoutAdminsNestedInput
  }

  export type QnABoardUpsertWithWhereUniqueWithoutUserInput = {
    where: QnABoardWhereUniqueInput
    update: XOR<QnABoardUpdateWithoutUserInput, QnABoardUncheckedUpdateWithoutUserInput>
    create: XOR<QnABoardCreateWithoutUserInput, QnABoardUncheckedCreateWithoutUserInput>
  }

  export type QnABoardUpdateWithWhereUniqueWithoutUserInput = {
    where: QnABoardWhereUniqueInput
    data: XOR<QnABoardUpdateWithoutUserInput, QnABoardUncheckedUpdateWithoutUserInput>
  }

  export type QnABoardUpdateManyWithWhereWithoutUserInput = {
    where: QnABoardScalarWhereInput
    data: XOR<QnABoardUpdateManyMutationInput, QnABoardUncheckedUpdateManyWithoutUserInput>
  }

  export type QnABoardScalarWhereInput = {
    AND?: QnABoardScalarWhereInput | QnABoardScalarWhereInput[]
    OR?: QnABoardScalarWhereInput[]
    NOT?: QnABoardScalarWhereInput | QnABoardScalarWhereInput[]
    qnaId?: IntFilter<"QnABoard"> | number
    qnaTitle?: StringFilter<"QnABoard"> | string
    qnaContent?: StringFilter<"QnABoard"> | string
    qnaUserId?: IntFilter<"QnABoard"> | number
    createdAt?: DateTimeFilter<"QnABoard"> | Date | string
    updatedAt?: DateTimeFilter<"QnABoard"> | Date | string
    qnaImageUrl?: StringNullableFilter<"QnABoard"> | string | null
  }

  export type QnABoardCommentUpsertWithWhereUniqueWithoutUserInput = {
    where: QnABoardCommentWhereUniqueInput
    update: XOR<QnABoardCommentUpdateWithoutUserInput, QnABoardCommentUncheckedUpdateWithoutUserInput>
    create: XOR<QnABoardCommentCreateWithoutUserInput, QnABoardCommentUncheckedCreateWithoutUserInput>
  }

  export type QnABoardCommentUpdateWithWhereUniqueWithoutUserInput = {
    where: QnABoardCommentWhereUniqueInput
    data: XOR<QnABoardCommentUpdateWithoutUserInput, QnABoardCommentUncheckedUpdateWithoutUserInput>
  }

  export type QnABoardCommentUpdateManyWithWhereWithoutUserInput = {
    where: QnABoardCommentScalarWhereInput
    data: XOR<QnABoardCommentUpdateManyMutationInput, QnABoardCommentUncheckedUpdateManyWithoutUserInput>
  }

  export type QnABoardCommentScalarWhereInput = {
    AND?: QnABoardCommentScalarWhereInput | QnABoardCommentScalarWhereInput[]
    OR?: QnABoardCommentScalarWhereInput[]
    NOT?: QnABoardCommentScalarWhereInput | QnABoardCommentScalarWhereInput[]
    commentId?: IntFilter<"QnABoardComment"> | number
    commentContent?: StringFilter<"QnABoardComment"> | string
    commentUserId?: IntFilter<"QnABoardComment"> | number
    qnaId?: IntFilter<"QnABoardComment"> | number
    createdAt?: DateTimeFilter<"QnABoardComment"> | Date | string
    updatedAt?: DateTimeFilter<"QnABoardComment"> | Date | string
  }

  export type StudentUpsertWithoutUserInput = {
    update: XOR<StudentUpdateWithoutUserInput, StudentUncheckedUpdateWithoutUserInput>
    create: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutUserInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutUserInput, StudentUncheckedUpdateWithoutUserInput>
  }

  export type StudentUpdateWithoutUserInput = {
    studentName?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentHighschool?: NullableStringFieldUpdateOperationsInput | string | null
    studentBirthYear?: IntFieldUpdateOperationsInput | number
    studentMemo?: NullableStringFieldUpdateOperationsInput | string | null
    academy?: AcademyUpdateOneRequiredWithoutStudentsNestedInput
  }

  export type StudentUncheckedUpdateWithoutUserInput = {
    academyId?: IntFieldUpdateOperationsInput | number
    studentName?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentHighschool?: NullableStringFieldUpdateOperationsInput | string | null
    studentBirthYear?: IntFieldUpdateOperationsInput | number
    studentMemo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateWithoutAdminInput = {
    userId: string
    userPassword: string
    createdAt?: Date | string
    role?: $Enums.Role
    qna?: QnABoardCreateNestedManyWithoutUserInput
    qnaComments?: QnABoardCommentCreateNestedManyWithoutUserInput
    student?: StudentCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAdminInput = {
    userId: string
    userPassword: string
    createdAt?: Date | string
    role?: $Enums.Role
    memberId?: number
    qna?: QnABoardUncheckedCreateNestedManyWithoutUserInput
    qnaComments?: QnABoardCommentUncheckedCreateNestedManyWithoutUserInput
    student?: StudentUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAdminInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAdminInput, UserUncheckedCreateWithoutAdminInput>
  }

  export type AnnouncementCreateWithoutAuthorInput = {
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isItAssetAnnouncement?: boolean
    isItImportantAnnouncement?: boolean
    files?: AnnouncementFileCreateNestedManyWithoutAnnouncementInput
    academies?: AcademyCreateNestedManyWithoutAnnouncementsInput
  }

  export type AnnouncementUncheckedCreateWithoutAuthorInput = {
    announcementId?: number
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isItAssetAnnouncement?: boolean
    isItImportantAnnouncement?: boolean
    files?: AnnouncementFileUncheckedCreateNestedManyWithoutAnnouncementInput
    academies?: AcademyUncheckedCreateNestedManyWithoutAnnouncementsInput
  }

  export type AnnouncementCreateOrConnectWithoutAuthorInput = {
    where: AnnouncementWhereUniqueInput
    create: XOR<AnnouncementCreateWithoutAuthorInput, AnnouncementUncheckedCreateWithoutAuthorInput>
  }

  export type AnnouncementCreateManyAuthorInputEnvelope = {
    data: AnnouncementCreateManyAuthorInput | AnnouncementCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type AcademyCreateWithoutAdminsInput = {
    academyName: string
    academyPhone?: string | null
    academyAddress: string
    createdAt?: Date | string
    academyMainImage?: string | null
    images?: AcademyImageCreateNestedManyWithoutAcademyInput
    students?: StudentCreateNestedManyWithoutAcademyInput
    announcements?: AnnouncementCreateNestedManyWithoutAcademiesInput
  }

  export type AcademyUncheckedCreateWithoutAdminsInput = {
    academyId?: number
    academyName: string
    academyPhone?: string | null
    academyAddress: string
    createdAt?: Date | string
    academyMainImage?: string | null
    images?: AcademyImageUncheckedCreateNestedManyWithoutAcademyInput
    students?: StudentUncheckedCreateNestedManyWithoutAcademyInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutAcademiesInput
  }

  export type AcademyCreateOrConnectWithoutAdminsInput = {
    where: AcademyWhereUniqueInput
    create: XOR<AcademyCreateWithoutAdminsInput, AcademyUncheckedCreateWithoutAdminsInput>
  }

  export type UserUpsertWithoutAdminInput = {
    update: XOR<UserUpdateWithoutAdminInput, UserUncheckedUpdateWithoutAdminInput>
    create: XOR<UserCreateWithoutAdminInput, UserUncheckedCreateWithoutAdminInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAdminInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAdminInput, UserUncheckedUpdateWithoutAdminInput>
  }

  export type UserUpdateWithoutAdminInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userPassword?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    qna?: QnABoardUpdateManyWithoutUserNestedInput
    qnaComments?: QnABoardCommentUpdateManyWithoutUserNestedInput
    student?: StudentUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAdminInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userPassword?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    memberId?: IntFieldUpdateOperationsInput | number
    qna?: QnABoardUncheckedUpdateManyWithoutUserNestedInput
    qnaComments?: QnABoardCommentUncheckedUpdateManyWithoutUserNestedInput
    student?: StudentUncheckedUpdateOneWithoutUserNestedInput
  }

  export type AnnouncementUpsertWithWhereUniqueWithoutAuthorInput = {
    where: AnnouncementWhereUniqueInput
    update: XOR<AnnouncementUpdateWithoutAuthorInput, AnnouncementUncheckedUpdateWithoutAuthorInput>
    create: XOR<AnnouncementCreateWithoutAuthorInput, AnnouncementUncheckedCreateWithoutAuthorInput>
  }

  export type AnnouncementUpdateWithWhereUniqueWithoutAuthorInput = {
    where: AnnouncementWhereUniqueInput
    data: XOR<AnnouncementUpdateWithoutAuthorInput, AnnouncementUncheckedUpdateWithoutAuthorInput>
  }

  export type AnnouncementUpdateManyWithWhereWithoutAuthorInput = {
    where: AnnouncementScalarWhereInput
    data: XOR<AnnouncementUpdateManyMutationInput, AnnouncementUncheckedUpdateManyWithoutAuthorInput>
  }

  export type AnnouncementScalarWhereInput = {
    AND?: AnnouncementScalarWhereInput | AnnouncementScalarWhereInput[]
    OR?: AnnouncementScalarWhereInput[]
    NOT?: AnnouncementScalarWhereInput | AnnouncementScalarWhereInput[]
    announcementId?: IntFilter<"Announcement"> | number
    title?: StringFilter<"Announcement"> | string
    content?: StringFilter<"Announcement"> | string
    createdAt?: DateTimeFilter<"Announcement"> | Date | string
    updatedAt?: DateTimeFilter<"Announcement"> | Date | string
    authorId?: IntNullableFilter<"Announcement"> | number | null
    isItAssetAnnouncement?: BoolFilter<"Announcement"> | boolean
    isItImportantAnnouncement?: BoolFilter<"Announcement"> | boolean
  }

  export type AcademyUpsertWithWhereUniqueWithoutAdminsInput = {
    where: AcademyWhereUniqueInput
    update: XOR<AcademyUpdateWithoutAdminsInput, AcademyUncheckedUpdateWithoutAdminsInput>
    create: XOR<AcademyCreateWithoutAdminsInput, AcademyUncheckedCreateWithoutAdminsInput>
  }

  export type AcademyUpdateWithWhereUniqueWithoutAdminsInput = {
    where: AcademyWhereUniqueInput
    data: XOR<AcademyUpdateWithoutAdminsInput, AcademyUncheckedUpdateWithoutAdminsInput>
  }

  export type AcademyUpdateManyWithWhereWithoutAdminsInput = {
    where: AcademyScalarWhereInput
    data: XOR<AcademyUpdateManyMutationInput, AcademyUncheckedUpdateManyWithoutAdminsInput>
  }

  export type AcademyScalarWhereInput = {
    AND?: AcademyScalarWhereInput | AcademyScalarWhereInput[]
    OR?: AcademyScalarWhereInput[]
    NOT?: AcademyScalarWhereInput | AcademyScalarWhereInput[]
    academyId?: IntFilter<"Academy"> | number
    academyName?: StringFilter<"Academy"> | string
    academyPhone?: StringNullableFilter<"Academy"> | string | null
    academyAddress?: StringFilter<"Academy"> | string
    createdAt?: DateTimeFilter<"Academy"> | Date | string
    academyMainImage?: StringNullableFilter<"Academy"> | string | null
  }

  export type AcademyCreateWithoutStudentsInput = {
    academyName: string
    academyPhone?: string | null
    academyAddress: string
    createdAt?: Date | string
    academyMainImage?: string | null
    images?: AcademyImageCreateNestedManyWithoutAcademyInput
    admins?: AdminCreateNestedManyWithoutAcademyInput
    announcements?: AnnouncementCreateNestedManyWithoutAcademiesInput
  }

  export type AcademyUncheckedCreateWithoutStudentsInput = {
    academyId?: number
    academyName: string
    academyPhone?: string | null
    academyAddress: string
    createdAt?: Date | string
    academyMainImage?: string | null
    images?: AcademyImageUncheckedCreateNestedManyWithoutAcademyInput
    admins?: AdminUncheckedCreateNestedManyWithoutAcademyInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutAcademiesInput
  }

  export type AcademyCreateOrConnectWithoutStudentsInput = {
    where: AcademyWhereUniqueInput
    create: XOR<AcademyCreateWithoutStudentsInput, AcademyUncheckedCreateWithoutStudentsInput>
  }

  export type UserCreateWithoutStudentInput = {
    userId: string
    userPassword: string
    createdAt?: Date | string
    role?: $Enums.Role
    admin?: AdminCreateNestedOneWithoutUserInput
    qna?: QnABoardCreateNestedManyWithoutUserInput
    qnaComments?: QnABoardCommentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutStudentInput = {
    userId: string
    userPassword: string
    createdAt?: Date | string
    role?: $Enums.Role
    memberId?: number
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    qna?: QnABoardUncheckedCreateNestedManyWithoutUserInput
    qnaComments?: QnABoardCommentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutStudentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
  }

  export type AcademyUpsertWithoutStudentsInput = {
    update: XOR<AcademyUpdateWithoutStudentsInput, AcademyUncheckedUpdateWithoutStudentsInput>
    create: XOR<AcademyCreateWithoutStudentsInput, AcademyUncheckedCreateWithoutStudentsInput>
    where?: AcademyWhereInput
  }

  export type AcademyUpdateToOneWithWhereWithoutStudentsInput = {
    where?: AcademyWhereInput
    data: XOR<AcademyUpdateWithoutStudentsInput, AcademyUncheckedUpdateWithoutStudentsInput>
  }

  export type AcademyUpdateWithoutStudentsInput = {
    academyName?: StringFieldUpdateOperationsInput | string
    academyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    academyAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academyMainImage?: NullableStringFieldUpdateOperationsInput | string | null
    images?: AcademyImageUpdateManyWithoutAcademyNestedInput
    admins?: AdminUpdateManyWithoutAcademyNestedInput
    announcements?: AnnouncementUpdateManyWithoutAcademiesNestedInput
  }

  export type AcademyUncheckedUpdateWithoutStudentsInput = {
    academyId?: IntFieldUpdateOperationsInput | number
    academyName?: StringFieldUpdateOperationsInput | string
    academyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    academyAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academyMainImage?: NullableStringFieldUpdateOperationsInput | string | null
    images?: AcademyImageUncheckedUpdateManyWithoutAcademyNestedInput
    admins?: AdminUncheckedUpdateManyWithoutAcademyNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutAcademiesNestedInput
  }

  export type UserUpsertWithoutStudentInput = {
    update: XOR<UserUpdateWithoutStudentInput, UserUncheckedUpdateWithoutStudentInput>
    create: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStudentInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStudentInput, UserUncheckedUpdateWithoutStudentInput>
  }

  export type UserUpdateWithoutStudentInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userPassword?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    admin?: AdminUpdateOneWithoutUserNestedInput
    qna?: QnABoardUpdateManyWithoutUserNestedInput
    qnaComments?: QnABoardCommentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutStudentInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userPassword?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    memberId?: IntFieldUpdateOperationsInput | number
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    qna?: QnABoardUncheckedUpdateManyWithoutUserNestedInput
    qnaComments?: QnABoardCommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AcademyImageCreateWithoutAcademyInput = {
    academyImageUrl: string
    createdAt?: Date | string
    academyImageName?: string | null
  }

  export type AcademyImageUncheckedCreateWithoutAcademyInput = {
    academyImageId?: number
    academyImageUrl: string
    createdAt?: Date | string
    academyImageName?: string | null
  }

  export type AcademyImageCreateOrConnectWithoutAcademyInput = {
    where: AcademyImageWhereUniqueInput
    create: XOR<AcademyImageCreateWithoutAcademyInput, AcademyImageUncheckedCreateWithoutAcademyInput>
  }

  export type AcademyImageCreateManyAcademyInputEnvelope = {
    data: AcademyImageCreateManyAcademyInput | AcademyImageCreateManyAcademyInput[]
    skipDuplicates?: boolean
  }

  export type StudentCreateWithoutAcademyInput = {
    studentName: string
    studentPhone: string
    studentHighschool?: string | null
    studentBirthYear: number
    studentMemo?: string | null
    user: UserCreateNestedOneWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutAcademyInput = {
    studentName: string
    studentPhone: string
    studentHighschool?: string | null
    studentBirthYear: number
    studentMemo?: string | null
    memberId: number
  }

  export type StudentCreateOrConnectWithoutAcademyInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutAcademyInput, StudentUncheckedCreateWithoutAcademyInput>
  }

  export type StudentCreateManyAcademyInputEnvelope = {
    data: StudentCreateManyAcademyInput | StudentCreateManyAcademyInput[]
    skipDuplicates?: boolean
  }

  export type AdminCreateWithoutAcademyInput = {
    adminName: string
    adminPhone: string
    user: UserCreateNestedOneWithoutAdminInput
    announcement?: AnnouncementCreateNestedManyWithoutAuthorInput
  }

  export type AdminUncheckedCreateWithoutAcademyInput = {
    adminName: string
    adminPhone: string
    memberId: number
    announcement?: AnnouncementUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type AdminCreateOrConnectWithoutAcademyInput = {
    where: AdminWhereUniqueInput
    create: XOR<AdminCreateWithoutAcademyInput, AdminUncheckedCreateWithoutAcademyInput>
  }

  export type AnnouncementCreateWithoutAcademiesInput = {
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isItAssetAnnouncement?: boolean
    isItImportantAnnouncement?: boolean
    author?: AdminCreateNestedOneWithoutAnnouncementInput
    files?: AnnouncementFileCreateNestedManyWithoutAnnouncementInput
  }

  export type AnnouncementUncheckedCreateWithoutAcademiesInput = {
    announcementId?: number
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId?: number | null
    isItAssetAnnouncement?: boolean
    isItImportantAnnouncement?: boolean
    files?: AnnouncementFileUncheckedCreateNestedManyWithoutAnnouncementInput
  }

  export type AnnouncementCreateOrConnectWithoutAcademiesInput = {
    where: AnnouncementWhereUniqueInput
    create: XOR<AnnouncementCreateWithoutAcademiesInput, AnnouncementUncheckedCreateWithoutAcademiesInput>
  }

  export type AcademyImageUpsertWithWhereUniqueWithoutAcademyInput = {
    where: AcademyImageWhereUniqueInput
    update: XOR<AcademyImageUpdateWithoutAcademyInput, AcademyImageUncheckedUpdateWithoutAcademyInput>
    create: XOR<AcademyImageCreateWithoutAcademyInput, AcademyImageUncheckedCreateWithoutAcademyInput>
  }

  export type AcademyImageUpdateWithWhereUniqueWithoutAcademyInput = {
    where: AcademyImageWhereUniqueInput
    data: XOR<AcademyImageUpdateWithoutAcademyInput, AcademyImageUncheckedUpdateWithoutAcademyInput>
  }

  export type AcademyImageUpdateManyWithWhereWithoutAcademyInput = {
    where: AcademyImageScalarWhereInput
    data: XOR<AcademyImageUpdateManyMutationInput, AcademyImageUncheckedUpdateManyWithoutAcademyInput>
  }

  export type AcademyImageScalarWhereInput = {
    AND?: AcademyImageScalarWhereInput | AcademyImageScalarWhereInput[]
    OR?: AcademyImageScalarWhereInput[]
    NOT?: AcademyImageScalarWhereInput | AcademyImageScalarWhereInput[]
    academyImageId?: IntFilter<"AcademyImage"> | number
    academyImageUrl?: StringFilter<"AcademyImage"> | string
    academyId?: IntFilter<"AcademyImage"> | number
    createdAt?: DateTimeFilter<"AcademyImage"> | Date | string
    academyImageName?: StringNullableFilter<"AcademyImage"> | string | null
  }

  export type StudentUpsertWithWhereUniqueWithoutAcademyInput = {
    where: StudentWhereUniqueInput
    update: XOR<StudentUpdateWithoutAcademyInput, StudentUncheckedUpdateWithoutAcademyInput>
    create: XOR<StudentCreateWithoutAcademyInput, StudentUncheckedCreateWithoutAcademyInput>
  }

  export type StudentUpdateWithWhereUniqueWithoutAcademyInput = {
    where: StudentWhereUniqueInput
    data: XOR<StudentUpdateWithoutAcademyInput, StudentUncheckedUpdateWithoutAcademyInput>
  }

  export type StudentUpdateManyWithWhereWithoutAcademyInput = {
    where: StudentScalarWhereInput
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyWithoutAcademyInput>
  }

  export type StudentScalarWhereInput = {
    AND?: StudentScalarWhereInput | StudentScalarWhereInput[]
    OR?: StudentScalarWhereInput[]
    NOT?: StudentScalarWhereInput | StudentScalarWhereInput[]
    academyId?: IntFilter<"Student"> | number
    studentName?: StringFilter<"Student"> | string
    studentPhone?: StringFilter<"Student"> | string
    studentHighschool?: StringNullableFilter<"Student"> | string | null
    studentBirthYear?: IntFilter<"Student"> | number
    studentMemo?: StringNullableFilter<"Student"> | string | null
    memberId?: IntFilter<"Student"> | number
  }

  export type AdminUpsertWithWhereUniqueWithoutAcademyInput = {
    where: AdminWhereUniqueInput
    update: XOR<AdminUpdateWithoutAcademyInput, AdminUncheckedUpdateWithoutAcademyInput>
    create: XOR<AdminCreateWithoutAcademyInput, AdminUncheckedCreateWithoutAcademyInput>
  }

  export type AdminUpdateWithWhereUniqueWithoutAcademyInput = {
    where: AdminWhereUniqueInput
    data: XOR<AdminUpdateWithoutAcademyInput, AdminUncheckedUpdateWithoutAcademyInput>
  }

  export type AdminUpdateManyWithWhereWithoutAcademyInput = {
    where: AdminScalarWhereInput
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyWithoutAcademyInput>
  }

  export type AdminScalarWhereInput = {
    AND?: AdminScalarWhereInput | AdminScalarWhereInput[]
    OR?: AdminScalarWhereInput[]
    NOT?: AdminScalarWhereInput | AdminScalarWhereInput[]
    adminName?: StringFilter<"Admin"> | string
    adminPhone?: StringFilter<"Admin"> | string
    memberId?: IntFilter<"Admin"> | number
  }

  export type AnnouncementUpsertWithWhereUniqueWithoutAcademiesInput = {
    where: AnnouncementWhereUniqueInput
    update: XOR<AnnouncementUpdateWithoutAcademiesInput, AnnouncementUncheckedUpdateWithoutAcademiesInput>
    create: XOR<AnnouncementCreateWithoutAcademiesInput, AnnouncementUncheckedCreateWithoutAcademiesInput>
  }

  export type AnnouncementUpdateWithWhereUniqueWithoutAcademiesInput = {
    where: AnnouncementWhereUniqueInput
    data: XOR<AnnouncementUpdateWithoutAcademiesInput, AnnouncementUncheckedUpdateWithoutAcademiesInput>
  }

  export type AnnouncementUpdateManyWithWhereWithoutAcademiesInput = {
    where: AnnouncementScalarWhereInput
    data: XOR<AnnouncementUpdateManyMutationInput, AnnouncementUncheckedUpdateManyWithoutAcademiesInput>
  }

  export type AcademyCreateWithoutImagesInput = {
    academyName: string
    academyPhone?: string | null
    academyAddress: string
    createdAt?: Date | string
    academyMainImage?: string | null
    students?: StudentCreateNestedManyWithoutAcademyInput
    admins?: AdminCreateNestedManyWithoutAcademyInput
    announcements?: AnnouncementCreateNestedManyWithoutAcademiesInput
  }

  export type AcademyUncheckedCreateWithoutImagesInput = {
    academyId?: number
    academyName: string
    academyPhone?: string | null
    academyAddress: string
    createdAt?: Date | string
    academyMainImage?: string | null
    students?: StudentUncheckedCreateNestedManyWithoutAcademyInput
    admins?: AdminUncheckedCreateNestedManyWithoutAcademyInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutAcademiesInput
  }

  export type AcademyCreateOrConnectWithoutImagesInput = {
    where: AcademyWhereUniqueInput
    create: XOR<AcademyCreateWithoutImagesInput, AcademyUncheckedCreateWithoutImagesInput>
  }

  export type AcademyUpsertWithoutImagesInput = {
    update: XOR<AcademyUpdateWithoutImagesInput, AcademyUncheckedUpdateWithoutImagesInput>
    create: XOR<AcademyCreateWithoutImagesInput, AcademyUncheckedCreateWithoutImagesInput>
    where?: AcademyWhereInput
  }

  export type AcademyUpdateToOneWithWhereWithoutImagesInput = {
    where?: AcademyWhereInput
    data: XOR<AcademyUpdateWithoutImagesInput, AcademyUncheckedUpdateWithoutImagesInput>
  }

  export type AcademyUpdateWithoutImagesInput = {
    academyName?: StringFieldUpdateOperationsInput | string
    academyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    academyAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academyMainImage?: NullableStringFieldUpdateOperationsInput | string | null
    students?: StudentUpdateManyWithoutAcademyNestedInput
    admins?: AdminUpdateManyWithoutAcademyNestedInput
    announcements?: AnnouncementUpdateManyWithoutAcademiesNestedInput
  }

  export type AcademyUncheckedUpdateWithoutImagesInput = {
    academyId?: IntFieldUpdateOperationsInput | number
    academyName?: StringFieldUpdateOperationsInput | string
    academyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    academyAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academyMainImage?: NullableStringFieldUpdateOperationsInput | string | null
    students?: StudentUncheckedUpdateManyWithoutAcademyNestedInput
    admins?: AdminUncheckedUpdateManyWithoutAcademyNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutAcademiesNestedInput
  }

  export type AdminCreateWithoutAnnouncementInput = {
    adminName: string
    adminPhone: string
    user: UserCreateNestedOneWithoutAdminInput
    academy?: AcademyCreateNestedManyWithoutAdminsInput
  }

  export type AdminUncheckedCreateWithoutAnnouncementInput = {
    adminName: string
    adminPhone: string
    memberId: number
    academy?: AcademyUncheckedCreateNestedManyWithoutAdminsInput
  }

  export type AdminCreateOrConnectWithoutAnnouncementInput = {
    where: AdminWhereUniqueInput
    create: XOR<AdminCreateWithoutAnnouncementInput, AdminUncheckedCreateWithoutAnnouncementInput>
  }

  export type AnnouncementFileCreateWithoutAnnouncementInput = {
    key: string
    originalName: string
    fileType: string
    uploadedAt?: Date | string
  }

  export type AnnouncementFileUncheckedCreateWithoutAnnouncementInput = {
    id?: number
    key: string
    originalName: string
    fileType: string
    uploadedAt?: Date | string
  }

  export type AnnouncementFileCreateOrConnectWithoutAnnouncementInput = {
    where: AnnouncementFileWhereUniqueInput
    create: XOR<AnnouncementFileCreateWithoutAnnouncementInput, AnnouncementFileUncheckedCreateWithoutAnnouncementInput>
  }

  export type AnnouncementFileCreateManyAnnouncementInputEnvelope = {
    data: AnnouncementFileCreateManyAnnouncementInput | AnnouncementFileCreateManyAnnouncementInput[]
    skipDuplicates?: boolean
  }

  export type AcademyCreateWithoutAnnouncementsInput = {
    academyName: string
    academyPhone?: string | null
    academyAddress: string
    createdAt?: Date | string
    academyMainImage?: string | null
    images?: AcademyImageCreateNestedManyWithoutAcademyInput
    students?: StudentCreateNestedManyWithoutAcademyInput
    admins?: AdminCreateNestedManyWithoutAcademyInput
  }

  export type AcademyUncheckedCreateWithoutAnnouncementsInput = {
    academyId?: number
    academyName: string
    academyPhone?: string | null
    academyAddress: string
    createdAt?: Date | string
    academyMainImage?: string | null
    images?: AcademyImageUncheckedCreateNestedManyWithoutAcademyInput
    students?: StudentUncheckedCreateNestedManyWithoutAcademyInput
    admins?: AdminUncheckedCreateNestedManyWithoutAcademyInput
  }

  export type AcademyCreateOrConnectWithoutAnnouncementsInput = {
    where: AcademyWhereUniqueInput
    create: XOR<AcademyCreateWithoutAnnouncementsInput, AcademyUncheckedCreateWithoutAnnouncementsInput>
  }

  export type AdminUpsertWithoutAnnouncementInput = {
    update: XOR<AdminUpdateWithoutAnnouncementInput, AdminUncheckedUpdateWithoutAnnouncementInput>
    create: XOR<AdminCreateWithoutAnnouncementInput, AdminUncheckedCreateWithoutAnnouncementInput>
    where?: AdminWhereInput
  }

  export type AdminUpdateToOneWithWhereWithoutAnnouncementInput = {
    where?: AdminWhereInput
    data: XOR<AdminUpdateWithoutAnnouncementInput, AdminUncheckedUpdateWithoutAnnouncementInput>
  }

  export type AdminUpdateWithoutAnnouncementInput = {
    adminName?: StringFieldUpdateOperationsInput | string
    adminPhone?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutAdminNestedInput
    academy?: AcademyUpdateManyWithoutAdminsNestedInput
  }

  export type AdminUncheckedUpdateWithoutAnnouncementInput = {
    adminName?: StringFieldUpdateOperationsInput | string
    adminPhone?: StringFieldUpdateOperationsInput | string
    memberId?: IntFieldUpdateOperationsInput | number
    academy?: AcademyUncheckedUpdateManyWithoutAdminsNestedInput
  }

  export type AnnouncementFileUpsertWithWhereUniqueWithoutAnnouncementInput = {
    where: AnnouncementFileWhereUniqueInput
    update: XOR<AnnouncementFileUpdateWithoutAnnouncementInput, AnnouncementFileUncheckedUpdateWithoutAnnouncementInput>
    create: XOR<AnnouncementFileCreateWithoutAnnouncementInput, AnnouncementFileUncheckedCreateWithoutAnnouncementInput>
  }

  export type AnnouncementFileUpdateWithWhereUniqueWithoutAnnouncementInput = {
    where: AnnouncementFileWhereUniqueInput
    data: XOR<AnnouncementFileUpdateWithoutAnnouncementInput, AnnouncementFileUncheckedUpdateWithoutAnnouncementInput>
  }

  export type AnnouncementFileUpdateManyWithWhereWithoutAnnouncementInput = {
    where: AnnouncementFileScalarWhereInput
    data: XOR<AnnouncementFileUpdateManyMutationInput, AnnouncementFileUncheckedUpdateManyWithoutAnnouncementInput>
  }

  export type AnnouncementFileScalarWhereInput = {
    AND?: AnnouncementFileScalarWhereInput | AnnouncementFileScalarWhereInput[]
    OR?: AnnouncementFileScalarWhereInput[]
    NOT?: AnnouncementFileScalarWhereInput | AnnouncementFileScalarWhereInput[]
    id?: IntFilter<"AnnouncementFile"> | number
    key?: StringFilter<"AnnouncementFile"> | string
    originalName?: StringFilter<"AnnouncementFile"> | string
    fileType?: StringFilter<"AnnouncementFile"> | string
    announcementId?: IntFilter<"AnnouncementFile"> | number
    uploadedAt?: DateTimeFilter<"AnnouncementFile"> | Date | string
  }

  export type AcademyUpsertWithWhereUniqueWithoutAnnouncementsInput = {
    where: AcademyWhereUniqueInput
    update: XOR<AcademyUpdateWithoutAnnouncementsInput, AcademyUncheckedUpdateWithoutAnnouncementsInput>
    create: XOR<AcademyCreateWithoutAnnouncementsInput, AcademyUncheckedCreateWithoutAnnouncementsInput>
  }

  export type AcademyUpdateWithWhereUniqueWithoutAnnouncementsInput = {
    where: AcademyWhereUniqueInput
    data: XOR<AcademyUpdateWithoutAnnouncementsInput, AcademyUncheckedUpdateWithoutAnnouncementsInput>
  }

  export type AcademyUpdateManyWithWhereWithoutAnnouncementsInput = {
    where: AcademyScalarWhereInput
    data: XOR<AcademyUpdateManyMutationInput, AcademyUncheckedUpdateManyWithoutAnnouncementsInput>
  }

  export type AnnouncementCreateWithoutFilesInput = {
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isItAssetAnnouncement?: boolean
    isItImportantAnnouncement?: boolean
    author?: AdminCreateNestedOneWithoutAnnouncementInput
    academies?: AcademyCreateNestedManyWithoutAnnouncementsInput
  }

  export type AnnouncementUncheckedCreateWithoutFilesInput = {
    announcementId?: number
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId?: number | null
    isItAssetAnnouncement?: boolean
    isItImportantAnnouncement?: boolean
    academies?: AcademyUncheckedCreateNestedManyWithoutAnnouncementsInput
  }

  export type AnnouncementCreateOrConnectWithoutFilesInput = {
    where: AnnouncementWhereUniqueInput
    create: XOR<AnnouncementCreateWithoutFilesInput, AnnouncementUncheckedCreateWithoutFilesInput>
  }

  export type AnnouncementUpsertWithoutFilesInput = {
    update: XOR<AnnouncementUpdateWithoutFilesInput, AnnouncementUncheckedUpdateWithoutFilesInput>
    create: XOR<AnnouncementCreateWithoutFilesInput, AnnouncementUncheckedCreateWithoutFilesInput>
    where?: AnnouncementWhereInput
  }

  export type AnnouncementUpdateToOneWithWhereWithoutFilesInput = {
    where?: AnnouncementWhereInput
    data: XOR<AnnouncementUpdateWithoutFilesInput, AnnouncementUncheckedUpdateWithoutFilesInput>
  }

  export type AnnouncementUpdateWithoutFilesInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isItAssetAnnouncement?: BoolFieldUpdateOperationsInput | boolean
    isItImportantAnnouncement?: BoolFieldUpdateOperationsInput | boolean
    author?: AdminUpdateOneWithoutAnnouncementNestedInput
    academies?: AcademyUpdateManyWithoutAnnouncementsNestedInput
  }

  export type AnnouncementUncheckedUpdateWithoutFilesInput = {
    announcementId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: NullableIntFieldUpdateOperationsInput | number | null
    isItAssetAnnouncement?: BoolFieldUpdateOperationsInput | boolean
    isItImportantAnnouncement?: BoolFieldUpdateOperationsInput | boolean
    academies?: AcademyUncheckedUpdateManyWithoutAnnouncementsNestedInput
  }

  export type UserCreateWithoutQnaInput = {
    userId: string
    userPassword: string
    createdAt?: Date | string
    role?: $Enums.Role
    admin?: AdminCreateNestedOneWithoutUserInput
    qnaComments?: QnABoardCommentCreateNestedManyWithoutUserInput
    student?: StudentCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutQnaInput = {
    userId: string
    userPassword: string
    createdAt?: Date | string
    role?: $Enums.Role
    memberId?: number
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    qnaComments?: QnABoardCommentUncheckedCreateNestedManyWithoutUserInput
    student?: StudentUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutQnaInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutQnaInput, UserUncheckedCreateWithoutQnaInput>
  }

  export type QnABoardCommentCreateWithoutQnaInput = {
    commentContent: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutQnaCommentsInput
  }

  export type QnABoardCommentUncheckedCreateWithoutQnaInput = {
    commentId?: number
    commentContent: string
    commentUserId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QnABoardCommentCreateOrConnectWithoutQnaInput = {
    where: QnABoardCommentWhereUniqueInput
    create: XOR<QnABoardCommentCreateWithoutQnaInput, QnABoardCommentUncheckedCreateWithoutQnaInput>
  }

  export type QnABoardCommentCreateManyQnaInputEnvelope = {
    data: QnABoardCommentCreateManyQnaInput | QnABoardCommentCreateManyQnaInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutQnaInput = {
    update: XOR<UserUpdateWithoutQnaInput, UserUncheckedUpdateWithoutQnaInput>
    create: XOR<UserCreateWithoutQnaInput, UserUncheckedCreateWithoutQnaInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutQnaInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutQnaInput, UserUncheckedUpdateWithoutQnaInput>
  }

  export type UserUpdateWithoutQnaInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userPassword?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    admin?: AdminUpdateOneWithoutUserNestedInput
    qnaComments?: QnABoardCommentUpdateManyWithoutUserNestedInput
    student?: StudentUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutQnaInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userPassword?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    memberId?: IntFieldUpdateOperationsInput | number
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    qnaComments?: QnABoardCommentUncheckedUpdateManyWithoutUserNestedInput
    student?: StudentUncheckedUpdateOneWithoutUserNestedInput
  }

  export type QnABoardCommentUpsertWithWhereUniqueWithoutQnaInput = {
    where: QnABoardCommentWhereUniqueInput
    update: XOR<QnABoardCommentUpdateWithoutQnaInput, QnABoardCommentUncheckedUpdateWithoutQnaInput>
    create: XOR<QnABoardCommentCreateWithoutQnaInput, QnABoardCommentUncheckedCreateWithoutQnaInput>
  }

  export type QnABoardCommentUpdateWithWhereUniqueWithoutQnaInput = {
    where: QnABoardCommentWhereUniqueInput
    data: XOR<QnABoardCommentUpdateWithoutQnaInput, QnABoardCommentUncheckedUpdateWithoutQnaInput>
  }

  export type QnABoardCommentUpdateManyWithWhereWithoutQnaInput = {
    where: QnABoardCommentScalarWhereInput
    data: XOR<QnABoardCommentUpdateManyMutationInput, QnABoardCommentUncheckedUpdateManyWithoutQnaInput>
  }

  export type UserCreateWithoutQnaCommentsInput = {
    userId: string
    userPassword: string
    createdAt?: Date | string
    role?: $Enums.Role
    admin?: AdminCreateNestedOneWithoutUserInput
    qna?: QnABoardCreateNestedManyWithoutUserInput
    student?: StudentCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutQnaCommentsInput = {
    userId: string
    userPassword: string
    createdAt?: Date | string
    role?: $Enums.Role
    memberId?: number
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    qna?: QnABoardUncheckedCreateNestedManyWithoutUserInput
    student?: StudentUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutQnaCommentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutQnaCommentsInput, UserUncheckedCreateWithoutQnaCommentsInput>
  }

  export type QnABoardCreateWithoutCommentsInput = {
    qnaTitle: string
    qnaContent: string
    createdAt?: Date | string
    updatedAt?: Date | string
    qnaImageUrl?: string | null
    user: UserCreateNestedOneWithoutQnaInput
  }

  export type QnABoardUncheckedCreateWithoutCommentsInput = {
    qnaId?: number
    qnaTitle: string
    qnaContent: string
    qnaUserId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    qnaImageUrl?: string | null
  }

  export type QnABoardCreateOrConnectWithoutCommentsInput = {
    where: QnABoardWhereUniqueInput
    create: XOR<QnABoardCreateWithoutCommentsInput, QnABoardUncheckedCreateWithoutCommentsInput>
  }

  export type UserUpsertWithoutQnaCommentsInput = {
    update: XOR<UserUpdateWithoutQnaCommentsInput, UserUncheckedUpdateWithoutQnaCommentsInput>
    create: XOR<UserCreateWithoutQnaCommentsInput, UserUncheckedCreateWithoutQnaCommentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutQnaCommentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutQnaCommentsInput, UserUncheckedUpdateWithoutQnaCommentsInput>
  }

  export type UserUpdateWithoutQnaCommentsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userPassword?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    admin?: AdminUpdateOneWithoutUserNestedInput
    qna?: QnABoardUpdateManyWithoutUserNestedInput
    student?: StudentUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutQnaCommentsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userPassword?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    memberId?: IntFieldUpdateOperationsInput | number
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    qna?: QnABoardUncheckedUpdateManyWithoutUserNestedInput
    student?: StudentUncheckedUpdateOneWithoutUserNestedInput
  }

  export type QnABoardUpsertWithoutCommentsInput = {
    update: XOR<QnABoardUpdateWithoutCommentsInput, QnABoardUncheckedUpdateWithoutCommentsInput>
    create: XOR<QnABoardCreateWithoutCommentsInput, QnABoardUncheckedCreateWithoutCommentsInput>
    where?: QnABoardWhereInput
  }

  export type QnABoardUpdateToOneWithWhereWithoutCommentsInput = {
    where?: QnABoardWhereInput
    data: XOR<QnABoardUpdateWithoutCommentsInput, QnABoardUncheckedUpdateWithoutCommentsInput>
  }

  export type QnABoardUpdateWithoutCommentsInput = {
    qnaTitle?: StringFieldUpdateOperationsInput | string
    qnaContent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    qnaImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutQnaNestedInput
  }

  export type QnABoardUncheckedUpdateWithoutCommentsInput = {
    qnaId?: IntFieldUpdateOperationsInput | number
    qnaTitle?: StringFieldUpdateOperationsInput | string
    qnaContent?: StringFieldUpdateOperationsInput | string
    qnaUserId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    qnaImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QnABoardCreateManyUserInput = {
    qnaId?: number
    qnaTitle: string
    qnaContent: string
    createdAt?: Date | string
    updatedAt?: Date | string
    qnaImageUrl?: string | null
  }

  export type QnABoardCommentCreateManyUserInput = {
    commentId?: number
    commentContent: string
    qnaId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QnABoardUpdateWithoutUserInput = {
    qnaTitle?: StringFieldUpdateOperationsInput | string
    qnaContent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    qnaImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: QnABoardCommentUpdateManyWithoutQnaNestedInput
  }

  export type QnABoardUncheckedUpdateWithoutUserInput = {
    qnaId?: IntFieldUpdateOperationsInput | number
    qnaTitle?: StringFieldUpdateOperationsInput | string
    qnaContent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    qnaImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: QnABoardCommentUncheckedUpdateManyWithoutQnaNestedInput
  }

  export type QnABoardUncheckedUpdateManyWithoutUserInput = {
    qnaId?: IntFieldUpdateOperationsInput | number
    qnaTitle?: StringFieldUpdateOperationsInput | string
    qnaContent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    qnaImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QnABoardCommentUpdateWithoutUserInput = {
    commentContent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    qna?: QnABoardUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type QnABoardCommentUncheckedUpdateWithoutUserInput = {
    commentId?: IntFieldUpdateOperationsInput | number
    commentContent?: StringFieldUpdateOperationsInput | string
    qnaId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QnABoardCommentUncheckedUpdateManyWithoutUserInput = {
    commentId?: IntFieldUpdateOperationsInput | number
    commentContent?: StringFieldUpdateOperationsInput | string
    qnaId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnouncementCreateManyAuthorInput = {
    announcementId?: number
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isItAssetAnnouncement?: boolean
    isItImportantAnnouncement?: boolean
  }

  export type AnnouncementUpdateWithoutAuthorInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isItAssetAnnouncement?: BoolFieldUpdateOperationsInput | boolean
    isItImportantAnnouncement?: BoolFieldUpdateOperationsInput | boolean
    files?: AnnouncementFileUpdateManyWithoutAnnouncementNestedInput
    academies?: AcademyUpdateManyWithoutAnnouncementsNestedInput
  }

  export type AnnouncementUncheckedUpdateWithoutAuthorInput = {
    announcementId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isItAssetAnnouncement?: BoolFieldUpdateOperationsInput | boolean
    isItImportantAnnouncement?: BoolFieldUpdateOperationsInput | boolean
    files?: AnnouncementFileUncheckedUpdateManyWithoutAnnouncementNestedInput
    academies?: AcademyUncheckedUpdateManyWithoutAnnouncementsNestedInput
  }

  export type AnnouncementUncheckedUpdateManyWithoutAuthorInput = {
    announcementId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isItAssetAnnouncement?: BoolFieldUpdateOperationsInput | boolean
    isItImportantAnnouncement?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AcademyUpdateWithoutAdminsInput = {
    academyName?: StringFieldUpdateOperationsInput | string
    academyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    academyAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academyMainImage?: NullableStringFieldUpdateOperationsInput | string | null
    images?: AcademyImageUpdateManyWithoutAcademyNestedInput
    students?: StudentUpdateManyWithoutAcademyNestedInput
    announcements?: AnnouncementUpdateManyWithoutAcademiesNestedInput
  }

  export type AcademyUncheckedUpdateWithoutAdminsInput = {
    academyId?: IntFieldUpdateOperationsInput | number
    academyName?: StringFieldUpdateOperationsInput | string
    academyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    academyAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academyMainImage?: NullableStringFieldUpdateOperationsInput | string | null
    images?: AcademyImageUncheckedUpdateManyWithoutAcademyNestedInput
    students?: StudentUncheckedUpdateManyWithoutAcademyNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutAcademiesNestedInput
  }

  export type AcademyUncheckedUpdateManyWithoutAdminsInput = {
    academyId?: IntFieldUpdateOperationsInput | number
    academyName?: StringFieldUpdateOperationsInput | string
    academyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    academyAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academyMainImage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AcademyImageCreateManyAcademyInput = {
    academyImageId?: number
    academyImageUrl: string
    createdAt?: Date | string
    academyImageName?: string | null
  }

  export type StudentCreateManyAcademyInput = {
    studentName: string
    studentPhone: string
    studentHighschool?: string | null
    studentBirthYear: number
    studentMemo?: string | null
    memberId: number
  }

  export type AcademyImageUpdateWithoutAcademyInput = {
    academyImageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academyImageName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AcademyImageUncheckedUpdateWithoutAcademyInput = {
    academyImageId?: IntFieldUpdateOperationsInput | number
    academyImageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academyImageName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AcademyImageUncheckedUpdateManyWithoutAcademyInput = {
    academyImageId?: IntFieldUpdateOperationsInput | number
    academyImageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academyImageName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StudentUpdateWithoutAcademyInput = {
    studentName?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentHighschool?: NullableStringFieldUpdateOperationsInput | string | null
    studentBirthYear?: IntFieldUpdateOperationsInput | number
    studentMemo?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutAcademyInput = {
    studentName?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentHighschool?: NullableStringFieldUpdateOperationsInput | string | null
    studentBirthYear?: IntFieldUpdateOperationsInput | number
    studentMemo?: NullableStringFieldUpdateOperationsInput | string | null
    memberId?: IntFieldUpdateOperationsInput | number
  }

  export type StudentUncheckedUpdateManyWithoutAcademyInput = {
    studentName?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentHighschool?: NullableStringFieldUpdateOperationsInput | string | null
    studentBirthYear?: IntFieldUpdateOperationsInput | number
    studentMemo?: NullableStringFieldUpdateOperationsInput | string | null
    memberId?: IntFieldUpdateOperationsInput | number
  }

  export type AdminUpdateWithoutAcademyInput = {
    adminName?: StringFieldUpdateOperationsInput | string
    adminPhone?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutAdminNestedInput
    announcement?: AnnouncementUpdateManyWithoutAuthorNestedInput
  }

  export type AdminUncheckedUpdateWithoutAcademyInput = {
    adminName?: StringFieldUpdateOperationsInput | string
    adminPhone?: StringFieldUpdateOperationsInput | string
    memberId?: IntFieldUpdateOperationsInput | number
    announcement?: AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type AdminUncheckedUpdateManyWithoutAcademyInput = {
    adminName?: StringFieldUpdateOperationsInput | string
    adminPhone?: StringFieldUpdateOperationsInput | string
    memberId?: IntFieldUpdateOperationsInput | number
  }

  export type AnnouncementUpdateWithoutAcademiesInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isItAssetAnnouncement?: BoolFieldUpdateOperationsInput | boolean
    isItImportantAnnouncement?: BoolFieldUpdateOperationsInput | boolean
    author?: AdminUpdateOneWithoutAnnouncementNestedInput
    files?: AnnouncementFileUpdateManyWithoutAnnouncementNestedInput
  }

  export type AnnouncementUncheckedUpdateWithoutAcademiesInput = {
    announcementId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: NullableIntFieldUpdateOperationsInput | number | null
    isItAssetAnnouncement?: BoolFieldUpdateOperationsInput | boolean
    isItImportantAnnouncement?: BoolFieldUpdateOperationsInput | boolean
    files?: AnnouncementFileUncheckedUpdateManyWithoutAnnouncementNestedInput
  }

  export type AnnouncementUncheckedUpdateManyWithoutAcademiesInput = {
    announcementId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: NullableIntFieldUpdateOperationsInput | number | null
    isItAssetAnnouncement?: BoolFieldUpdateOperationsInput | boolean
    isItImportantAnnouncement?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AnnouncementFileCreateManyAnnouncementInput = {
    id?: number
    key: string
    originalName: string
    fileType: string
    uploadedAt?: Date | string
  }

  export type AnnouncementFileUpdateWithoutAnnouncementInput = {
    key?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnouncementFileUncheckedUpdateWithoutAnnouncementInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnouncementFileUncheckedUpdateManyWithoutAnnouncementInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademyUpdateWithoutAnnouncementsInput = {
    academyName?: StringFieldUpdateOperationsInput | string
    academyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    academyAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academyMainImage?: NullableStringFieldUpdateOperationsInput | string | null
    images?: AcademyImageUpdateManyWithoutAcademyNestedInput
    students?: StudentUpdateManyWithoutAcademyNestedInput
    admins?: AdminUpdateManyWithoutAcademyNestedInput
  }

  export type AcademyUncheckedUpdateWithoutAnnouncementsInput = {
    academyId?: IntFieldUpdateOperationsInput | number
    academyName?: StringFieldUpdateOperationsInput | string
    academyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    academyAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academyMainImage?: NullableStringFieldUpdateOperationsInput | string | null
    images?: AcademyImageUncheckedUpdateManyWithoutAcademyNestedInput
    students?: StudentUncheckedUpdateManyWithoutAcademyNestedInput
    admins?: AdminUncheckedUpdateManyWithoutAcademyNestedInput
  }

  export type AcademyUncheckedUpdateManyWithoutAnnouncementsInput = {
    academyId?: IntFieldUpdateOperationsInput | number
    academyName?: StringFieldUpdateOperationsInput | string
    academyPhone?: NullableStringFieldUpdateOperationsInput | string | null
    academyAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    academyMainImage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QnABoardCommentCreateManyQnaInput = {
    commentId?: number
    commentContent: string
    commentUserId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QnABoardCommentUpdateWithoutQnaInput = {
    commentContent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutQnaCommentsNestedInput
  }

  export type QnABoardCommentUncheckedUpdateWithoutQnaInput = {
    commentId?: IntFieldUpdateOperationsInput | number
    commentContent?: StringFieldUpdateOperationsInput | string
    commentUserId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QnABoardCommentUncheckedUpdateManyWithoutQnaInput = {
    commentId?: IntFieldUpdateOperationsInput | number
    commentContent?: StringFieldUpdateOperationsInput | string
    commentUserId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



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