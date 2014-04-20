// Type definitions for node-uuid.js
// Project: https://www.npmjs.org/package/node-uuid
// Definitions by: Robert Kieffer <https://github.com/broofa>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

interface UUIDOptions {

    /**
     * Node id as Array of 6 bytes (per 4.1.6).
     * Default: Randomly generated ID. See note 1.
     */
    node: any[]

    /**
     * (Number between 0 - 0x3fff) RFC clock sequence.
     * Default: An internally maintained clockseq is used.
     */
    clockseq: number

    /**
     * (Number | Date) Time in milliseconds since unix Epoch.
     * Default: The current time is used.
     */
    msecs: any

    /**
     * (Number between 0-9999) additional time, in 100-nanosecond units. Ignored if msecs is unspecified.
     * Default: internal uuid counter is used, as per 4.2.1.2.
     */
    nsecs: number
}

interface UUID {
    v1(options?: UUIDOptions, buffer?: number[], offset?: number): string
    v1(options?: UUIDOptions, buffer?: NodeBuffer, offset?: number): string

    v2(options?: UUIDOptions, buffer?: number[], offset?: number): string
    v2(options?: UUIDOptions, buffer?: NodeBuffer, offset?: number): string

    v3(options?: UUIDOptions, buffer?: number[], offset?: number): string
    v3(options?: UUIDOptions, buffer?: NodeBuffer, offset?: number): string

    v4(options?: UUIDOptions, buffer?: number[], offset?: number): string
    v4(options?: UUIDOptions, buffer?: NodeBuffer, offset?: number): string
}

declare var uuid: UUID;

// Copied verbatim from ../node/node.d.ts
// to avoid needing to depend on node, since this can be deployed separately
interface NodeBuffer {
    [index: number]: number;
    write(string: string, offset?: number, length?: number, encoding?: string): number;
    toString(encoding?: string, start?: number, end?: number): string;
    length: number;
    copy(targetBuffer: NodeBuffer, targetStart?: number, sourceStart?: number, sourceEnd?: number): number;
    slice(start?: number, end?: number): NodeBuffer;
    readUInt8(offset: number, noAsset?: boolean): number;
    readUInt16LE(offset: number, noAssert?: boolean): number;
    readUInt16BE(offset: number, noAssert?: boolean): number;
    readUInt32LE(offset: number, noAssert?: boolean): number;
    readUInt32BE(offset: number, noAssert?: boolean): number;
    readInt8(offset: number, noAssert?: boolean): number;
    readInt16LE(offset: number, noAssert?: boolean): number;
    readInt16BE(offset: number, noAssert?: boolean): number;
    readInt32LE(offset: number, noAssert?: boolean): number;
    readInt32BE(offset: number, noAssert?: boolean): number;
    readFloatLE(offset: number, noAssert?: boolean): number;
    readFloatBE(offset: number, noAssert?: boolean): number;
    readDoubleLE(offset: number, noAssert?: boolean): number;
    readDoubleBE(offset: number, noAssert?: boolean): number;
    writeUInt8(value: number, offset: number, noAssert?: boolean): void;
    writeUInt16LE(value: number, offset: number, noAssert?: boolean): void;
    writeUInt16BE(value: number, offset: number, noAssert?: boolean): void;
    writeUInt32LE(value: number, offset: number, noAssert?: boolean): void;
    writeUInt32BE(value: number, offset: number, noAssert?: boolean): void;
    writeInt8(value: number, offset: number, noAssert?: boolean): void;
    writeInt16LE(value: number, offset: number, noAssert?: boolean): void;
    writeInt16BE(value: number, offset: number, noAssert?: boolean): void;
    writeInt32LE(value: number, offset: number, noAssert?: boolean): void;
    writeInt32BE(value: number, offset: number, noAssert?: boolean): void;
    writeFloatLE(value: number, offset: number, noAssert?: boolean): void;
    writeFloatBE(value: number, offset: number, noAssert?: boolean): void;
    writeDoubleLE(value: number, offset: number, noAssert?: boolean): void;
    writeDoubleBE(value: number, offset: number, noAssert?: boolean): void;
    fill(value: any, offset?: number, end?: number): void;
}
