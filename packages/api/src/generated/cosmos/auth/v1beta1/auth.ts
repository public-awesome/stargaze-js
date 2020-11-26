/* eslint-disable */
import { Any } from '../../../google/protobuf/any';
import * as Long from 'long';
import { Writer, Reader, util, configure } from 'protobufjs/minimal';


/**
 *  BaseAccount defines a base account type. It contains all the necessary fields
 *  for basic account functionality. Any custom account type should extend this
 *  type for additional functionality (e.g. vesting).
 */
export interface BaseAccount {
  address: string;
  pubKey?: Any;
  accountNumber: number;
  sequence: number;
}

/**
 *  ModuleAccount defines an account for modules that holds coins on a pool.
 */
export interface ModuleAccount {
  baseAccount?: BaseAccount;
  name: string;
  permissions: string[];
}

/**
 *  Params defines the parameters for the auth module.
 */
export interface Params {
  maxMemoCharacters: number;
  txSigLimit: number;
  txSizeCostPerByte: number;
  sigVerifyCostEd25519: number;
  sigVerifyCostSecp256k1: number;
}

const baseBaseAccount: object = {
  address: "",
  accountNumber: 0,
  sequence: 0,
};

const baseModuleAccount: object = {
  name: "",
  permissions: "",
};

const baseParams: object = {
  maxMemoCharacters: 0,
  txSigLimit: 0,
  txSizeCostPerByte: 0,
  sigVerifyCostEd25519: 0,
  sigVerifyCostSecp256k1: 0,
};

function longToNumber(long: Long) {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

export const protobufPackage = 'cosmos.auth.v1beta1'

export const BaseAccount = {
  encode(message: BaseAccount, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.address);
    if (message.pubKey !== undefined && message.pubKey !== undefined) {
      Any.encode(message.pubKey, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(24).uint64(message.accountNumber);
    writer.uint32(32).uint64(message.sequence);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): BaseAccount {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBaseAccount } as BaseAccount;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.pubKey = Any.decode(reader, reader.uint32());
          break;
        case 3:
          message.accountNumber = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.sequence = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): BaseAccount {
    const message = { ...baseBaseAccount } as BaseAccount;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    if (object.pubKey !== undefined && object.pubKey !== null) {
      message.pubKey = Any.fromJSON(object.pubKey);
    } else {
      message.pubKey = undefined;
    }
    if (object.accountNumber !== undefined && object.accountNumber !== null) {
      message.accountNumber = Number(object.accountNumber);
    } else {
      message.accountNumber = 0;
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = Number(object.sequence);
    } else {
      message.sequence = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<BaseAccount>): BaseAccount {
    const message = { ...baseBaseAccount } as BaseAccount;
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    if (object.pubKey !== undefined && object.pubKey !== null) {
      message.pubKey = Any.fromPartial(object.pubKey);
    } else {
      message.pubKey = undefined;
    }
    if (object.accountNumber !== undefined && object.accountNumber !== null) {
      message.accountNumber = object.accountNumber;
    } else {
      message.accountNumber = 0;
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = object.sequence;
    } else {
      message.sequence = 0;
    }
    return message;
  },
  toJSON(message: BaseAccount): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.pubKey !== undefined && (obj.pubKey = message.pubKey ? Any.toJSON(message.pubKey) : undefined);
    message.accountNumber !== undefined && (obj.accountNumber = message.accountNumber);
    message.sequence !== undefined && (obj.sequence = message.sequence);
    return obj;
  },
};

export const ModuleAccount = {
  encode(message: ModuleAccount, writer: Writer = Writer.create()): Writer {
    if (message.baseAccount !== undefined && message.baseAccount !== undefined) {
      BaseAccount.encode(message.baseAccount, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(18).string(message.name);
    for (const v of message.permissions) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ModuleAccount {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseModuleAccount } as ModuleAccount;
    message.permissions = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseAccount = BaseAccount.decode(reader, reader.uint32());
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.permissions.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ModuleAccount {
    const message = { ...baseModuleAccount } as ModuleAccount;
    message.permissions = [];
    if (object.baseAccount !== undefined && object.baseAccount !== null) {
      message.baseAccount = BaseAccount.fromJSON(object.baseAccount);
    } else {
      message.baseAccount = undefined;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.permissions !== undefined && object.permissions !== null) {
      for (const e of object.permissions) {
        message.permissions.push(String(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<ModuleAccount>): ModuleAccount {
    const message = { ...baseModuleAccount } as ModuleAccount;
    message.permissions = [];
    if (object.baseAccount !== undefined && object.baseAccount !== null) {
      message.baseAccount = BaseAccount.fromPartial(object.baseAccount);
    } else {
      message.baseAccount = undefined;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.permissions !== undefined && object.permissions !== null) {
      for (const e of object.permissions) {
        message.permissions.push(e);
      }
    }
    return message;
  },
  toJSON(message: ModuleAccount): unknown {
    const obj: any = {};
    message.baseAccount !== undefined && (obj.baseAccount = message.baseAccount ? BaseAccount.toJSON(message.baseAccount) : undefined);
    message.name !== undefined && (obj.name = message.name);
    if (message.permissions) {
      obj.permissions = message.permissions.map(e => e);
    } else {
      obj.permissions = [];
    }
    return obj;
  },
};

export const Params = {
  encode(message: Params, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint64(message.maxMemoCharacters);
    writer.uint32(16).uint64(message.txSigLimit);
    writer.uint32(24).uint64(message.txSizeCostPerByte);
    writer.uint32(32).uint64(message.sigVerifyCostEd25519);
    writer.uint32(40).uint64(message.sigVerifyCostSecp256k1);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Params {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseParams } as Params;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.maxMemoCharacters = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.txSigLimit = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.txSizeCostPerByte = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.sigVerifyCostEd25519 = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.sigVerifyCostSecp256k1 = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Params {
    const message = { ...baseParams } as Params;
    if (object.maxMemoCharacters !== undefined && object.maxMemoCharacters !== null) {
      message.maxMemoCharacters = Number(object.maxMemoCharacters);
    } else {
      message.maxMemoCharacters = 0;
    }
    if (object.txSigLimit !== undefined && object.txSigLimit !== null) {
      message.txSigLimit = Number(object.txSigLimit);
    } else {
      message.txSigLimit = 0;
    }
    if (object.txSizeCostPerByte !== undefined && object.txSizeCostPerByte !== null) {
      message.txSizeCostPerByte = Number(object.txSizeCostPerByte);
    } else {
      message.txSizeCostPerByte = 0;
    }
    if (object.sigVerifyCostEd25519 !== undefined && object.sigVerifyCostEd25519 !== null) {
      message.sigVerifyCostEd25519 = Number(object.sigVerifyCostEd25519);
    } else {
      message.sigVerifyCostEd25519 = 0;
    }
    if (object.sigVerifyCostSecp256k1 !== undefined && object.sigVerifyCostSecp256k1 !== null) {
      message.sigVerifyCostSecp256k1 = Number(object.sigVerifyCostSecp256k1);
    } else {
      message.sigVerifyCostSecp256k1 = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params;
    if (object.maxMemoCharacters !== undefined && object.maxMemoCharacters !== null) {
      message.maxMemoCharacters = object.maxMemoCharacters;
    } else {
      message.maxMemoCharacters = 0;
    }
    if (object.txSigLimit !== undefined && object.txSigLimit !== null) {
      message.txSigLimit = object.txSigLimit;
    } else {
      message.txSigLimit = 0;
    }
    if (object.txSizeCostPerByte !== undefined && object.txSizeCostPerByte !== null) {
      message.txSizeCostPerByte = object.txSizeCostPerByte;
    } else {
      message.txSizeCostPerByte = 0;
    }
    if (object.sigVerifyCostEd25519 !== undefined && object.sigVerifyCostEd25519 !== null) {
      message.sigVerifyCostEd25519 = object.sigVerifyCostEd25519;
    } else {
      message.sigVerifyCostEd25519 = 0;
    }
    if (object.sigVerifyCostSecp256k1 !== undefined && object.sigVerifyCostSecp256k1 !== null) {
      message.sigVerifyCostSecp256k1 = object.sigVerifyCostSecp256k1;
    } else {
      message.sigVerifyCostSecp256k1 = 0;
    }
    return message;
  },
  toJSON(message: Params): unknown {
    const obj: any = {};
    message.maxMemoCharacters !== undefined && (obj.maxMemoCharacters = message.maxMemoCharacters);
    message.txSigLimit !== undefined && (obj.txSigLimit = message.txSigLimit);
    message.txSizeCostPerByte !== undefined && (obj.txSizeCostPerByte = message.txSizeCostPerByte);
    message.sigVerifyCostEd25519 !== undefined && (obj.sigVerifyCostEd25519 = message.sigVerifyCostEd25519);
    message.sigVerifyCostSecp256k1 !== undefined && (obj.sigVerifyCostSecp256k1 = message.sigVerifyCostSecp256k1);
    return obj;
  },
};

if (util.Long !== Long as any) {
  util.Long = Long as any;
  configure();
}

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;