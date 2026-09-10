var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../../../../../../../../../execroot/_main/bazel-out/k8-opt/bin/frontend/kernel_bindings/snippets/kernel_wasm-5feec41738f550fe/inline0.js
var inline0_exports = {};
__export(inline0_exports, {
  wrap: () => wrap
});
var wrap = (fn) => (...args) => fn(args);

// ../../../../../../../../../execroot/_main/bazel-out/k8-opt/bin/frontend/kernel_bindings/kernel.js
var wasm;
function addToExternrefTable0(obj) {
  const idx = wasm.__externref_table_alloc();
  wasm.__wbindgen_externrefs.set(idx, obj);
  return idx;
}
var CLOSURE_DTORS = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((state) => state.dtor(state.a, state.b));
function debugString(val) {
  const type = typeof val;
  if (type == "number" || type == "boolean" || val == null) {
    return `${val}`;
  }
  if (type == "string") {
    return `"${val}"`;
  }
  if (type == "symbol") {
    const description = val.description;
    if (description == null) {
      return "Symbol";
    } else {
      return `Symbol(${description})`;
    }
  }
  if (type == "function") {
    const name = val.name;
    if (typeof name == "string" && name.length > 0) {
      return `Function(${name})`;
    } else {
      return "Function";
    }
  }
  if (Array.isArray(val)) {
    const length = val.length;
    let debug = "[";
    if (length > 0) {
      debug += debugString(val[0]);
    }
    for (let i = 1; i < length; i++) {
      debug += ", " + debugString(val[i]);
    }
    debug += "]";
    return debug;
  }
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches && builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    return toString.call(val);
  }
  if (className == "Object") {
    try {
      return "Object(" + JSON.stringify(val) + ")";
    } catch (_) {
      return "Object";
    }
  }
  if (val instanceof Error) {
    return `${val.name}: ${val.message}
${val.stack}`;
  }
  return className;
}
function getArrayU32FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}
function getArrayU8FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
function getCachedStringFromWasm0(ptr, len) {
  if (ptr === 0) {
    return getFromExternrefTable0(len);
  } else {
    return getStringFromWasm0(ptr, len);
  }
}
var cachedDataViewMemory0 = null;
function getDataViewMemory0() {
  if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer !== wasm.memory.buffer) {
    cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
  }
  return cachedDataViewMemory0;
}
function getFromExternrefTable0(idx) {
  return wasm.__wbindgen_externrefs.get(idx);
}
function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return decodeText(ptr, len);
}
var cachedUint32ArrayMemory0 = null;
function getUint32ArrayMemory0() {
  if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.buffer !== wasm.memory.buffer) {
    cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
  }
  return cachedUint32ArrayMemory0;
}
var cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
  if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.buffer !== wasm.memory.buffer) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8ArrayMemory0;
}
function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    const idx = addToExternrefTable0(e);
    wasm.__wbindgen_exn_store(idx);
  }
}
function isLikeNone(x) {
  return x === void 0 || x === null;
}
function makeClosure(arg0, arg1, dtor, f) {
  const state = { a: arg0, b: arg1, cnt: 1, dtor };
  const real = (...args) => {
    state.cnt++;
    try {
      return f(state.a, state.b, ...args);
    } finally {
      real._wbg_cb_unref();
    }
  };
  real._wbg_cb_unref = () => {
    if (--state.cnt === 0) {
      state.dtor(state.a, state.b);
      state.a = 0;
      CLOSURE_DTORS.unregister(state);
    }
  };
  CLOSURE_DTORS.register(real, state, state);
  return real;
}
function makeMutClosure(arg0, arg1, dtor, f) {
  const state = { a: arg0, b: arg1, cnt: 1, dtor };
  const real = (...args) => {
    state.cnt++;
    const a = state.a;
    state.a = 0;
    try {
      return f(a, state.b, ...args);
    } finally {
      state.a = a;
      real._wbg_cb_unref();
    }
  };
  real._wbg_cb_unref = () => {
    if (--state.cnt === 0) {
      state.dtor(state.a, state.b);
      state.a = 0;
      CLOSURE_DTORS.unregister(state);
    }
  };
  CLOSURE_DTORS.register(real, state, state);
  return real;
}
function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === void 0) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr2 = malloc(buf.length, 1) >>> 0;
    getUint8ArrayMemory0().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;
  const mem = getUint8ArrayMemory0();
  let offset = 0;
  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 127) break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
    const ret = cachedTextEncoder.encodeInto(arg, view);
    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }
  WASM_VECTOR_LEN = offset;
  return ptr;
}
function takeFromExternrefTable0(idx) {
  const value = wasm.__wbindgen_externrefs.get(idx);
  wasm.__externref_table_dealloc(idx);
  return value;
}
var cachedTextDecoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }) : void 0;
if (cachedTextDecoder) cachedTextDecoder.decode();
var MAX_SAFARI_DECODE_BYTES = 2146435072;
var numBytesDecoded = 0;
function decodeText(ptr, len) {
  numBytesDecoded += len;
  if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
    cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
    cachedTextDecoder.decode();
    numBytesDecoded = len;
  }
  return cachedTextDecoder.decode(getUint8ArrayMemory0().slice(ptr, ptr + len));
}
var cachedTextEncoder = typeof TextEncoder !== "undefined" ? new TextEncoder() : void 0;
if (cachedTextEncoder) {
  cachedTextEncoder.encodeInto = function(arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
      read: arg.length,
      written: buf.length
    };
  };
}
var WASM_VECTOR_LEN = 0;
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___js_sys_9592ece357cd80af___Array__core_cbe48ab93e5e7c65___result__Result_wasm_bindgen_388bf2787b29884b___JsValue__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___js_sys_9592ece357cd80af___Array__core_cbe48ab93e5e7c65___result__Result_wasm_bindgen_388bf2787b29884b___JsValue__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__core_cbe48ab93e5e7c65___result__Result_____wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__core_cbe48ab93e5e7c65___result__Result_____wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2);
  if (ret[1]) {
    throw takeFromExternrefTable0(ret[0]);
  }
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__i32_(arg0, arg1, arg2, arg3) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__i32_(arg0, arg1, arg2, arg3);
  return ret;
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u64__u64__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4, arg5) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u64__u64__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4, arg5);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__i32__i64__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__i32__i64__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__u32__i32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4, arg5) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__u32__i32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4, arg5);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__u32__u32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__u32__u32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__i32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__i32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___9(arg0, arg1, arg2, arg3, arg4) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___9(arg0, arg1, arg2, arg3, arg4);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__u32__core_cbe48ab93e5e7c65___result__Result_____wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4, arg5) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__u32__core_cbe48ab93e5e7c65___result__Result_____wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4, arg5);
  if (ret[1]) {
    throw takeFromExternrefTable0(ret[0]);
  }
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__i32_(arg0, arg1, arg2) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__i32_(arg0, arg1, arg2);
  return ret;
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___js_sys_9592ece357cd80af___Array__core_cbe48ab93e5e7c65___result__Result_wasm_bindgen_388bf2787b29884b___JsValue__wasm_bindgen_388bf2787b29884b___JsValue___12(arg0, arg1, arg2) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___js_sys_9592ece357cd80af___Array__core_cbe48ab93e5e7c65___result__Result_wasm_bindgen_388bf2787b29884b___JsValue__wasm_bindgen_388bf2787b29884b___JsValue___12(arg0, arg1, arg2);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__u32__u64__u64__u32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__u32__u64__u64__u32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__i64__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4, arg5) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__i64__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4, arg5);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u64__u64__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u64__u64__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__i32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___16(arg0, arg1, arg2, arg3) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__i32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___16(arg0, arg1, arg2, arg3);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___17(arg0, arg1, arg2, arg3, arg4) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___17(arg0, arg1, arg2, arg3, arg4);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0] >>> 0;
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__i64__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__i64__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4, arg5, arg6);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u64__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u64__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__i32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___20(arg0, arg1, arg2, arg3) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__i32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___20(arg0, arg1, arg2, arg3);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u64__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u64__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__core_cbe48ab93e5e7c65___result__Result_____wasm_bindgen_388bf2787b29884b___JsValue___22(arg0, arg1, arg2) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__core_cbe48ab93e5e7c65___result__Result_____wasm_bindgen_388bf2787b29884b___JsValue___22(arg0, arg1, arg2);
  if (ret[1]) {
    throw takeFromExternrefTable0(ret[0]);
  }
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__i32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___23(arg0, arg1, arg2, arg3) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__i32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___23(arg0, arg1, arg2, arg3);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___js_sys_9592ece357cd80af___Array__core_cbe48ab93e5e7c65___result__Result_wasm_bindgen_388bf2787b29884b___JsValue__wasm_bindgen_388bf2787b29884b___JsValue___25(arg0, arg1, arg2) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___js_sys_9592ece357cd80af___Array__core_cbe48ab93e5e7c65___result__Result_wasm_bindgen_388bf2787b29884b___JsValue__wasm_bindgen_388bf2787b29884b___JsValue___25(arg0, arg1, arg2);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function wasm_bindgen_388bf2787b29884b___convert__closures________invoke___web_sys_d01318204c8573f3___features__gen_Event__Event_____(arg0, arg1, arg2) {
  wasm.wasm_bindgen_388bf2787b29884b___convert__closures________invoke___web_sys_d01318204c8573f3___features__gen_Event__Event_____(arg0, arg1, arg2);
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke______(arg0, arg1) {
  wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke______(arg0, arg1);
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke_______1_(arg0, arg1) {
  wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke_______1_(arg0, arg1);
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__u32__i32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___29(arg0, arg1, arg2, arg3, arg4, arg5) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__u32__i32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___29(arg0, arg1, arg2, arg3, arg4, arg5);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__i64__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___30(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__i64__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___30(arg0, arg1, arg2, arg3, arg4, arg5, arg6);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___wasm_bindgen_388bf2787b29884b___JsValue_____(arg0, arg1, arg2) {
  wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___wasm_bindgen_388bf2787b29884b___JsValue_____(arg0, arg1, arg2);
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__u32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__u32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___wasm_bindgen_388bf2787b29884b___JsValue______33(arg0, arg1, arg2) {
  wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___wasm_bindgen_388bf2787b29884b___JsValue______33(arg0, arg1, arg2);
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__u32__u32__u64__u64__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__u32__u32__u64__u64__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4, arg5, arg6);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0] >>> 0;
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__u32__u64__u64__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__u32__u64__u64__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___js_sys_9592ece357cd80af___Array__core_cbe48ab93e5e7c65___result__Result_wasm_bindgen_388bf2787b29884b___JsValue__wasm_bindgen_388bf2787b29884b___JsValue___37(arg0, arg1, arg2) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___js_sys_9592ece357cd80af___Array__core_cbe48ab93e5e7c65___result__Result_wasm_bindgen_388bf2787b29884b___JsValue__wasm_bindgen_388bf2787b29884b___JsValue___37(arg0, arg1, arg2);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__i32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___38(arg0, arg1, arg2, arg3) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__i32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___38(arg0, arg1, arg2, arg3);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0] >>> 0;
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___39(arg0, arg1, arg2, arg3, arg4) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___39(arg0, arg1, arg2, arg3, arg4);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___40(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
  const ret = wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___40(arg0, arg1, arg2, arg3, arg4, arg5, arg6);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0];
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___wasm_bindgen_388bf2787b29884b___JsValue__wasm_bindgen_388bf2787b29884b___JsValue_____(arg0, arg1, arg2, arg3) {
  wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___wasm_bindgen_388bf2787b29884b___JsValue__wasm_bindgen_388bf2787b29884b___JsValue_____(arg0, arg1, arg2, arg3);
}
function wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___wasm_bindgen_388bf2787b29884b___JsValue__wasm_bindgen_388bf2787b29884b___JsValue______51(arg0, arg1, arg2, arg3) {
  wasm.wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___wasm_bindgen_388bf2787b29884b___JsValue__wasm_bindgen_388bf2787b29884b___JsValue______51(arg0, arg1, arg2, arg3);
}
var __wbindgen_enum_Kind = ["ready", "error"];
var __wbindgen_enum_WorkerType = ["classic", "module"];
var __wbindgen_enum_XmlHttpRequestResponseType = ["", "arraybuffer", "blob", "document", "json", "text"];
var EnvProxyFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_envproxy_free(ptr >>> 0, 1));
var GotFuncProxyFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_gotfuncproxy_free(ptr >>> 0, 1));
var GotMemProxyFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_gotmemproxy_free(ptr >>> 0, 1));
var PlatformProxyFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_platformproxy_free(ptr >>> 0, 1));
var WasiProxyFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_wasiproxy_free(ptr >>> 0, 1));
var WasiThreadProxyFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_wasithreadproxy_free(ptr >>> 0, 1));
var EnvProxy = class _EnvProxy {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_EnvProxy.prototype);
    obj.__wbg_ptr = ptr;
    EnvProxyFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    EnvProxyFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_envproxy_free(ptr, 0);
  }
  /**
   * @param {any} arg0
   * @param {any} property
   * @returns {any}
   */
  get(arg0, property) {
    const ret = wasm.envproxy_get(this.__wbg_ptr, arg0, property);
    return ret;
  }
};
if (Symbol.dispose) EnvProxy.prototype[Symbol.dispose] = EnvProxy.prototype.free;
var GotFuncProxy = class _GotFuncProxy {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_GotFuncProxy.prototype);
    obj.__wbg_ptr = ptr;
    GotFuncProxyFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    GotFuncProxyFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_gotfuncproxy_free(ptr, 0);
  }
  /**
   * @param {any} arg0
   * @param {any} property
   * @returns {any}
   */
  get(arg0, property) {
    const ret = wasm.gotfuncproxy_get(this.__wbg_ptr, arg0, property);
    return ret;
  }
};
if (Symbol.dispose) GotFuncProxy.prototype[Symbol.dispose] = GotFuncProxy.prototype.free;
var GotMemProxy = class _GotMemProxy {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_GotMemProxy.prototype);
    obj.__wbg_ptr = ptr;
    GotMemProxyFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    GotMemProxyFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_gotmemproxy_free(ptr, 0);
  }
  /**
   * @param {any} arg0
   * @param {any} property
   * @returns {any}
   */
  get(arg0, property) {
    const ret = wasm.gotmemproxy_get(this.__wbg_ptr, arg0, property);
    return ret;
  }
};
if (Symbol.dispose) GotMemProxy.prototype[Symbol.dispose] = GotMemProxy.prototype.free;
var PlatformProxy = class _PlatformProxy {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_PlatformProxy.prototype);
    obj.__wbg_ptr = ptr;
    PlatformProxyFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    PlatformProxyFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_platformproxy_free(ptr, 0);
  }
  /**
   * @param {any} arg0
   * @param {any} property
   * @returns {any}
   */
  get(arg0, property) {
    const ret = wasm.platformproxy_get(this.__wbg_ptr, arg0, property);
    return ret;
  }
};
if (Symbol.dispose) PlatformProxy.prototype[Symbol.dispose] = PlatformProxy.prototype.free;
var WasiProxy = class _WasiProxy {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_WasiProxy.prototype);
    obj.__wbg_ptr = ptr;
    WasiProxyFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    WasiProxyFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasiproxy_free(ptr, 0);
  }
  /**
   * @param {any} arg0
   * @param {any} property
   * @returns {any}
   */
  get(arg0, property) {
    const ret = wasm.wasiproxy_get(this.__wbg_ptr, arg0, property);
    return ret;
  }
};
if (Symbol.dispose) WasiProxy.prototype[Symbol.dispose] = WasiProxy.prototype.free;
var WasiThreadProxy = class _WasiThreadProxy {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_WasiThreadProxy.prototype);
    obj.__wbg_ptr = ptr;
    WasiThreadProxyFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    WasiThreadProxyFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasithreadproxy_free(ptr, 0);
  }
  /**
   * @param {any} arg0
   * @param {any} property
   * @returns {any}
   */
  get(arg0, property) {
    const ret = wasm.wasithreadproxy_get(this.__wbg_ptr, arg0, property);
    return ret;
  }
};
if (Symbol.dispose) WasiThreadProxy.prototype[Symbol.dispose] = WasiThreadProxy.prototype.free;
function kworker_finish() {
  wasm.kworker_finish();
}
function kworker_run(event) {
  wasm.kworker_run(event);
}
function kworker_start() {
  wasm.kworker_start();
}
var EXPECTED_RESPONSE_TYPES = /* @__PURE__ */ new Set(["basic", "cors", "default"]);
async function __wbg_load(module, imports) {
  if (typeof Response === "function" && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        const validResponse = module.ok && EXPECTED_RESPONSE_TYPES.has(module.type);
        if (validResponse && module.headers.get("Content-Type") !== "application/wasm") {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
        } else {
          throw e;
        }
      }
    }
    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);
    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };
    } else {
      return instance;
    }
  }
}
function __wbg_get_imports(memory) {
  const imports = {};
  imports.wbg = {};
  imports.wbg.__wbg___wbindgen_debug_string_adfb662ae34724b6 = function(arg0, arg1) {
    const ret = debugString(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg___wbindgen_is_falsy_7b9692021c137978 = function(arg0) {
    const ret = !arg0;
    return ret;
  };
  imports.wbg.__wbg___wbindgen_is_function_8d400b8b1af978cd = function(arg0) {
    const ret = typeof arg0 === "function";
    return ret;
  };
  imports.wbg.__wbg___wbindgen_is_null_dfda7d66506c95b5 = function(arg0) {
    const ret = arg0 === null;
    return ret;
  };
  imports.wbg.__wbg___wbindgen_is_undefined_f6b95eab589e0269 = function(arg0) {
    const ret = arg0 === void 0;
    return ret;
  };
  imports.wbg.__wbg___wbindgen_memory_a342e963fbcabd68 = function() {
    const ret = wasm.memory;
    return ret;
  };
  imports.wbg.__wbg___wbindgen_module_967adef62ea6cbf8 = function() {
    const ret = __wbg_init.__wbindgen_wasm_module;
    return ret;
  };
  imports.wbg.__wbg___wbindgen_number_get_9619185a74197f95 = function(arg0, arg1) {
    const obj = arg1;
    const ret = typeof obj === "number" ? obj : void 0;
    getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
  };
  imports.wbg.__wbg___wbindgen_rethrow_78714972834ecdf1 = function(arg0) {
    throw arg0;
  };
  imports.wbg.__wbg___wbindgen_string_get_a2a31e16edf96e42 = function(arg0, arg1) {
    const obj = arg1;
    const ret = typeof obj === "string" ? obj : void 0;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg___wbindgen_throw_dd24417ed36fc46e = function(arg0, arg1) {
    var v0 = getCachedStringFromWasm0(arg0, arg1);
    throw new Error(v0);
  };
  imports.wbg.__wbg__wbg_cb_unref_87dfb5aaa0cbcea7 = function(arg0) {
    arg0._wbg_cb_unref();
  };
  imports.wbg.__wbg_abort_07646c894ebbf2bd = function(arg0) {
    arg0.abort();
  };
  imports.wbg.__wbg_addEventListener_82cddc614107eb45 = function() {
    return handleError(function(arg0, arg1, arg2, arg3, arg4) {
      var v0 = getCachedStringFromWasm0(arg1, arg2);
      arg0.addEventListener(v0, arg3, arg4);
    }, arguments);
  };
  imports.wbg.__wbg_apply_52e9ae668d017009 = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = arg0.apply(arg1, arg2);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_arrayBuffer_c04af4fce566092d = function() {
    return handleError(function(arg0) {
      const ret = arg0.arrayBuffer();
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_async_bba5a2ac54b734df = function(arg0) {
    const ret = arg0.async;
    return ret;
  };
  imports.wbg.__wbg_bind_4a14e431c3bc4d50 = function(arg0, arg1) {
    const ret = arg0.bind(arg1);
    return ret;
  };
  imports.wbg.__wbg_body_947b901c33f7fe32 = function(arg0) {
    const ret = arg0.body;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
  };
  imports.wbg.__wbg_buffer_063cd102cc769a1c = function(arg0) {
    const ret = arg0.buffer;
    return ret;
  };
  imports.wbg.__wbg_buffer_6cb2fecb1f253d71 = function(arg0) {
    const ret = arg0.buffer;
    return ret;
  };
  imports.wbg.__wbg_byteLength_05cd8538d8f5f592 = function(arg0) {
    const ret = arg0.byteLength;
    return ret;
  };
  imports.wbg.__wbg_byteLength_faa9938885bdeee6 = function(arg0) {
    const ret = arg0.byteLength;
    return ret;
  };
  imports.wbg.__wbg_call_3020136f7a2d6e44 = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = arg0.call(arg1, arg2);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_call_78f94eb02ec7f9b2 = function() {
    return handleError(function(arg0, arg1, arg2, arg3, arg4) {
      const ret = arg0.call(arg1, arg2, arg3, arg4);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_call_985cbf350d9ec0e5 = function() {
    return handleError(function(arg0, arg1, arg2, arg3, arg4, arg5) {
      const ret = arg0.call(arg1, arg2, arg3, arg4, arg5);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_call_abb4ff46ce38be40 = function() {
    return handleError(function(arg0, arg1) {
      const ret = arg0.call(arg1);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_clearTimeout_5a54f8841c30079a = function(arg0) {
    const ret = clearTimeout(arg0);
    return ret;
  };
  imports.wbg.__wbg_clearTimeout_96804de0ab838f26 = function(arg0) {
    const ret = clearTimeout(arg0);
    return ret;
  };
  imports.wbg.__wbg_compile_6d35b0dd2c50b95d = function(arg0) {
    const ret = WebAssembly.compile(arg0);
    return ret;
  };
  imports.wbg.__wbg_context_b7208098f9c1a728 = function(arg0) {
    const ret = arg0.context;
    return ret;
  };
  imports.wbg.__wbg_data_8bf4ae669a78a688 = function(arg0) {
    const ret = arg0.data;
    return ret;
  };
  imports.wbg.__wbg_debug_9d0c87ddda3dc485 = function(arg0) {
    console.debug(arg0);
  };
  imports.wbg.__wbg_dependencies_2c165c6643f97fa8 = function(arg0) {
    const ret = arg0.dependencies;
    return ret;
  };
  imports.wbg.__wbg_envproxy_new = function(arg0) {
    const ret = EnvProxy.__wrap(arg0);
    return ret;
  };
  imports.wbg.__wbg_error_7534b8e9a36f1ab4 = function(arg0, arg1) {
    var v0 = getCachedStringFromWasm0(arg0, arg1);
    if (arg0 !== 0) {
      wasm.__wbindgen_free(arg0, arg1, 1);
    }
    console.error(v0);
  };
  imports.wbg.__wbg_error_7bc7d576a6aaf855 = function(arg0) {
    console.error(arg0);
  };
  imports.wbg.__wbg_executable_6a0914a4b79d2849 = function(arg0) {
    const ret = arg0.executable;
    return ret;
  };
  imports.wbg.__wbg_exports_58ef4156ca04d176 = function(arg0) {
    const ret = arg0.exports;
    return ret;
  };
  imports.wbg.__wbg_fetch_a70a442575ced609 = function(arg0, arg1, arg2) {
    var v0 = getCachedStringFromWasm0(arg1, arg2);
    const ret = arg0.fetch(v0);
    return ret;
  };
  imports.wbg.__wbg_fetch_bf2dba3dc9383b4e = function(arg0, arg1, arg2, arg3) {
    var v0 = getCachedStringFromWasm0(arg1, arg2);
    const ret = arg0.fetch(v0, arg3);
    return ret;
  };
  imports.wbg.__wbg_fill_508dd108a821ee20 = function(arg0, arg1, arg2, arg3) {
    const ret = arg0.fill(arg1, arg2 >>> 0, arg3 >>> 0);
    return ret;
  };
  imports.wbg.__wbg_forEach_d7b0beca8c53e695 = function(arg0, arg1, arg2) {
    try {
      var state0 = { a: arg1, b: arg2 };
      var cb0 = (arg02, arg12) => {
        const a = state0.a;
        state0.a = 0;
        try {
          return wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___wasm_bindgen_388bf2787b29884b___JsValue__wasm_bindgen_388bf2787b29884b___JsValue_____(a, state0.b, arg02, arg12);
        } finally {
          state0.a = a;
        }
      };
      arg0.forEach(cb0);
    } finally {
      state0.a = state0.b = 0;
    }
  };
  imports.wbg.__wbg_getArg_3c053b822e6eb529 = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = arg0.getArg(arg1, arg2 >>> 0);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_getReader_b6676f6d8b326942 = function(arg0) {
    const ret = arg0.getReader();
    return ret;
  };
  imports.wbg.__wbg_getTime_ad1e9878a735af08 = function(arg0) {
    const ret = arg0.getTime();
    return ret;
  };
  imports.wbg.__wbg_get_16458e8ef25ea5fa = function() {
    return handleError(function(arg0, arg1) {
      const ret = arg0.get(arg1 >>> 0);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_get_2a2c70fb43cb6b44 = function() {
    return handleError(function(arg0, arg1) {
      const ret = Reflect.get(arg0, arg1 >>> 0);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_get_6b7bd52aca3f9671 = function(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return ret;
  };
  imports.wbg.__wbg_get_af9dab7e9603ea93 = function() {
    return handleError(function(arg0, arg1) {
      const ret = Reflect.get(arg0, arg1);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_get_cbf36dc54869cf03 = function(arg0, arg1) {
    const ret = arg0.get(arg1);
    return ret;
  };
  imports.wbg.__wbg_get_index_1226ed36df27e708 = function(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return ret;
  };
  imports.wbg.__wbg_get_index_14b8dac5cd612a86 = function(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return ret;
  };
  imports.wbg.__wbg_get_index_4e7b3f629a0ab9cd = function(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return ret;
  };
  imports.wbg.__wbg_get_index_865ef6c029b35e97 = function(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return ret;
  };
  imports.wbg.__wbg_get_index_f9d9a9f5236833df = function(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return ret;
  };
  imports.wbg.__wbg_gotfuncproxy_new = function(arg0) {
    const ret = GotFuncProxy.__wrap(arg0);
    return ret;
  };
  imports.wbg.__wbg_gotmemproxy_new = function(arg0) {
    const ret = GotMemProxy.__wrap(arg0);
    return ret;
  };
  imports.wbg.__wbg_grow_fb776206c3a4e6f3 = function() {
    return handleError(function(arg0, arg1) {
      const ret = arg0.grow(arg1 >>> 0);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_href_18222dace6ab46cf = function(arg0, arg1) {
    const ret = arg1.href;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg_href_932d39d5679244f8 = function(arg0, arg1) {
    const ret = arg1.href;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg_imports_d7c6f1e23e012391 = function(arg0) {
    const ret = WebAssembly.Module.imports(arg0);
    return ret;
  };
  imports.wbg.__wbg_info_ce6bcc489c22f6f0 = function(arg0) {
    console.info(arg0);
  };
  imports.wbg.__wbg_instanceof_ArrayBuffer_f3320d2419cd0355 = function(arg0) {
    let result;
    try {
      result = arg0 instanceof ArrayBuffer;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_instanceof_DedicatedWorkerGlobalScope_1fad9829936e95d2 = function(arg0) {
    let result;
    try {
      result = arg0 instanceof DedicatedWorkerGlobalScope;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_instanceof_Error_3443650560328fa9 = function(arg0) {
    let result;
    try {
      result = arg0 instanceof Error;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_instanceof_Exception_cf38d4895d54f6c1 = function(arg0) {
    let result;
    try {
      result = arg0 instanceof WebAssembly.Exception;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_instanceof_Module_d37a279bc9a18feb = function(arg0) {
    let result;
    try {
      result = arg0 instanceof WebAssembly.Module;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_instanceof_Object_577e21051f7bcb79 = function(arg0) {
    let result;
    try {
      result = arg0 instanceof Object;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_isArray_51fd9e6422c0a395 = function(arg0) {
    const ret = Array.isArray(arg0);
    return ret;
  };
  imports.wbg.__wbg_length_22ac23eaec9d8053 = function(arg0) {
    const ret = arg0.length;
    return ret;
  };
  imports.wbg.__wbg_length_3a9ca660d3d3391b = function(arg0) {
    const ret = arg0.length;
    return ret;
  };
  imports.wbg.__wbg_length_89c3414ed7f0594d = function(arg0) {
    const ret = arg0.length;
    return ret;
  };
  imports.wbg.__wbg_length_d45040a40c570362 = function(arg0) {
    const ret = arg0.length;
    return ret;
  };
  imports.wbg.__wbg_load_f1dd26e734971d92 = function() {
    return handleError(function(arg0, arg1) {
      const ret = Atomics.load(arg0, arg1 >>> 0);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_location_486c7f516a5e422e = function(arg0) {
    const ret = arg0.location;
    return ret;
  };
  imports.wbg.__wbg_memory_dbfe36f92c63d7da = function(arg0) {
    const ret = arg0.memory;
    return ret;
  };
  imports.wbg.__wbg_message_0305fa7903f4b3d9 = function(arg0) {
    const ret = arg0.message;
    return ret;
  };
  imports.wbg.__wbg_message_c80c69a824811f73 = function(arg0, arg1) {
    const ret = arg1.message;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg_name_a6baf0e1dd2ba874 = function(arg0, arg1) {
    const ret = arg1.name;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg_new_0_23cedd11d9b40c9d = function() {
    const ret = /* @__PURE__ */ new Date();
    return ret;
  };
  imports.wbg.__wbg_new_1acc79167e62f5df = function() {
    return handleError(function(arg0, arg1) {
      const ret = new WebAssembly.Instance(arg0, arg1);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_new_1ba21ce319a06297 = function() {
    const ret = new Object();
    return ret;
  };
  imports.wbg.__wbg_new_25eeefc8de475b52 = function() {
    return handleError(function(arg0) {
      const ret = new WebAssembly.Module(arg0);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_new_25f239778d6112b9 = function() {
    const ret = new Array();
    return ret;
  };
  imports.wbg.__wbg_new_271a0cefca646e6e = function() {
    return handleError(function(arg0) {
      const ret = new WebAssembly.Memory(arg0);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_new_2dd03dbd2a205651 = function(arg0) {
    const ret = new BigUint64Array(arg0);
    return ret;
  };
  imports.wbg.__wbg_new_354204b1383f9085 = function(arg0) {
    const ret = new Float32Array(arg0);
    return ret;
  };
  imports.wbg.__wbg_new_4963b80bb3bb4198 = function() {
    return handleError(function(arg0) {
      const ret = new WebAssembly.Table(arg0);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_new_4fe05c96062a8385 = function() {
    return handleError(function() {
      const ret = new XMLHttpRequest();
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_new_53cb1e86c1ef5d2a = function() {
    return handleError(function(arg0, arg1) {
      var v0 = getCachedStringFromWasm0(arg0, arg1);
      const ret = new Worker(v0);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_new_622bd6e2dcade71d = function(arg0, arg1) {
    const ret = new Proxy(arg0, arg1);
    return ret;
  };
  imports.wbg.__wbg_new_6421f6084cc5bc5a = function(arg0) {
    const ret = new Uint8Array(arg0);
    return ret;
  };
  imports.wbg.__wbg_new_7041ab116402aa97 = function(arg0) {
    const ret = new Uint32Array(arg0);
    return ret;
  };
  imports.wbg.__wbg_new_801803c173555604 = function(arg0) {
    const ret = new Float64Array(arg0);
    return ret;
  };
  imports.wbg.__wbg_new_881a222c65f168fc = function() {
    return handleError(function() {
      const ret = new AbortController();
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_new_8a6f238a6ece86ea = function() {
    const ret = new Error();
    return ret;
  };
  imports.wbg.__wbg_new_9d9fa786dd2be6c2 = function() {
    return handleError(function(arg0) {
      const ret = new WebAssembly.Tag(arg0);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_new_9f7fd5c3a6ba7298 = function(arg0) {
    const ret = new Uint16Array(arg0);
    return ret;
  };
  imports.wbg.__wbg_new_b546ae120718850e = function() {
    const ret = /* @__PURE__ */ new Map();
    return ret;
  };
  imports.wbg.__wbg_new_bed8cca41e959008 = function(arg0, arg1) {
    var v0 = getCachedStringFromWasm0(arg0, arg1);
    const ret = new WebAssembly.RuntimeError(v0);
    return ret;
  };
  imports.wbg.__wbg_new_de1e660b88fc921f = function(arg0) {
    const ret = new Int32Array(arg0);
    return ret;
  };
  imports.wbg.__wbg_new_df1173567d5ff028 = function(arg0, arg1) {
    var v0 = getCachedStringFromWasm0(arg0, arg1);
    const ret = new Error(v0);
    return ret;
  };
  imports.wbg.__wbg_new_ead2c724e8f45c17 = function() {
    return handleError(function(arg0, arg1) {
      const ret = new WebAssembly.Global(arg0, arg1);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_new_ff12d2b041fb48f1 = function(arg0, arg1) {
    try {
      var state0 = { a: arg0, b: arg1 };
      var cb0 = (arg02, arg12) => {
        const a = state0.a;
        state0.a = 0;
        try {
          return wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___wasm_bindgen_388bf2787b29884b___JsValue__wasm_bindgen_388bf2787b29884b___JsValue______51(a, state0.b, arg02, arg12);
        } finally {
          state0.a = a;
        }
      };
      const ret = new Promise(cb0);
      return ret;
    } finally {
      state0.a = state0.b = 0;
    }
  };
  imports.wbg.__wbg_new_from_slice_f9c22b9153b26992 = function(arg0, arg1) {
    const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
    return ret;
  };
  imports.wbg.__wbg_new_no_args_cb138f77cf6151ee = function(arg0, arg1) {
    var v0 = getCachedStringFromWasm0(arg0, arg1);
    const ret = new Function(v0);
    return ret;
  };
  imports.wbg.__wbg_new_with_base_7d0307fe97312036 = function() {
    return handleError(function(arg0, arg1, arg2, arg3) {
      var v0 = getCachedStringFromWasm0(arg0, arg1);
      var v1 = getCachedStringFromWasm0(arg2, arg3);
      const ret = new URL(v0, v1);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_new_with_length_aa5eaf41d35235e5 = function(arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return ret;
  };
  imports.wbg.__wbg_new_with_options_2978557c2c268ef3 = function() {
    return handleError(function(arg0, arg1, arg2) {
      var v0 = getCachedStringFromWasm0(arg0, arg1);
      const ret = new Worker(v0, arg2);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_now_8cf15d6e317793e1 = function(arg0) {
    const ret = arg0.now();
    return ret;
  };
  imports.wbg.__wbg_of_6505a0eb509da02e = function(arg0) {
    const ret = Array.of(arg0);
    return ret;
  };
  imports.wbg.__wbg_of_7779827fa663eec8 = function(arg0, arg1, arg2) {
    const ret = Array.of(arg0, arg1, arg2);
    return ret;
  };
  imports.wbg.__wbg_of_b8cd42ebb79fb759 = function(arg0, arg1) {
    const ret = Array.of(arg0, arg1);
    return ret;
  };
  imports.wbg.__wbg_of_fdf875aa87d9498c = function(arg0, arg1, arg2, arg3) {
    const ret = Array.of(arg0, arg1, arg2, arg3);
    return ret;
  };
  imports.wbg.__wbg_ok_dd98ecb60d721e20 = function(arg0) {
    const ret = arg0.ok;
    return ret;
  };
  imports.wbg.__wbg_open_bfb661c1c2740586 = function() {
    return handleError(function(arg0, arg1, arg2, arg3, arg4, arg5) {
      var v0 = getCachedStringFromWasm0(arg1, arg2);
      var v1 = getCachedStringFromWasm0(arg3, arg4);
      arg0.open(v0, v1, arg5 !== 0);
    }, arguments);
  };
  imports.wbg.__wbg_performance_64147f039018735c = function(arg0) {
    const ret = arg0.performance;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
  };
  imports.wbg.__wbg_platformproxy_new = function(arg0) {
    const ret = PlatformProxy.__wrap(arg0);
    return ret;
  };
  imports.wbg.__wbg_postMessage_07504dbe15265d5c = function() {
    return handleError(function(arg0, arg1) {
      arg0.postMessage(arg1);
    }, arguments);
  };
  imports.wbg.__wbg_postMessage_417c0c38be891258 = function() {
    return handleError(function(arg0, arg1, arg2) {
      arg0.postMessage(arg1, arg2);
    }, arguments);
  };
  imports.wbg.__wbg_postMessage_49af172ec8bdaa5a = function() {
    return handleError(function(arg0, arg1, arg2) {
      arg0.postMessage(arg1, arg2);
    }, arguments);
  };
  imports.wbg.__wbg_postMessage_7243f814e0cfb266 = function() {
    return handleError(function(arg0, arg1) {
      arg0.postMessage(arg1);
    }, arguments);
  };
  imports.wbg.__wbg_postMessage_e0309b53c7ad30e6 = function() {
    return handleError(function(arg0, arg1, arg2) {
      arg0.postMessage(arg1, arg2);
    }, arguments);
  };
  imports.wbg.__wbg_protocol_bddf8ebff9e67035 = function(arg0, arg1) {
    const ret = arg1.protocol;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg_prototypesetcall_dfe9b766cdc1f1fd = function(arg0, arg1, arg2) {
    Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
  };
  imports.wbg.__wbg_ptr_48215cb06afed938 = function(arg0) {
    const ret = arg0.ptr;
    return ret;
  };
  imports.wbg.__wbg_push_7d9be8f38fc13975 = function(arg0, arg1) {
    const ret = arg0.push(arg1);
    return ret;
  };
  imports.wbg.__wbg_queueMicrotask_9b549dfce8865860 = function(arg0) {
    const ret = arg0.queueMicrotask;
    return ret;
  };
  imports.wbg.__wbg_queueMicrotask_fca69f5bfad613a5 = function(arg0) {
    queueMicrotask(arg0);
  };
  imports.wbg.__wbg_random_cc1f9237d866d212 = function() {
    const ret = Math.random();
    return ret;
  };
  imports.wbg.__wbg_read_39c4b35efcd03c25 = function(arg0) {
    const ret = arg0.read();
    return ret;
  };
  imports.wbg.__wbg_removeEventListener_3ff68cd2edbc58d4 = function() {
    return handleError(function(arg0, arg1, arg2, arg3, arg4) {
      var v0 = getCachedStringFromWasm0(arg1, arg2);
      arg0.removeEventListener(v0, arg3, arg4 !== 0);
    }, arguments);
  };
  imports.wbg.__wbg_resolve_fd5bfbaa4ce36e1e = function(arg0) {
    const ret = Promise.resolve(arg0);
    return ret;
  };
  imports.wbg.__wbg_response_19d1d96c8fc76878 = function() {
    return handleError(function(arg0) {
      const ret = arg0.response;
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_send_3accfe4b9b207011 = function() {
    return handleError(function(arg0) {
      arg0.send();
    }, arguments);
  };
  imports.wbg.__wbg_setTimeout_db2dbaeefb6f39c7 = function() {
    return handleError(function(arg0, arg1) {
      const ret = setTimeout(arg0, arg1);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_setTimeout_eefe7f4c234b0c6b = function() {
    return handleError(function(arg0, arg1) {
      const ret = setTimeout(arg0, arg1);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_set_169e13b608078b7b = function(arg0, arg1, arg2) {
    arg0.set(getArrayU8FromWasm0(arg1, arg2));
  };
  imports.wbg.__wbg_set_564e6ccd45f0e738 = function() {
    return handleError(function(arg0, arg1, arg2) {
      arg0.set(arg1 >>> 0, arg2);
    }, arguments);
  };
  imports.wbg.__wbg_set_781438a03c0c3c81 = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = Reflect.set(arg0, arg1, arg2);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_set_bc3a432bdcd60886 = function(arg0, arg1, arg2) {
    arg0.set(arg1, arg2 >>> 0);
  };
  imports.wbg.__wbg_set_c50d03a32da17043 = function() {
    return handleError(function(arg0, arg1, arg2) {
      arg0.set(arg1 >>> 0, arg2);
    }, arguments);
  };
  imports.wbg.__wbg_set_capture_0bafa9ad80668352 = function(arg0, arg1) {
    arg0.capture = arg1 !== 0;
  };
  imports.wbg.__wbg_set_d3b002c9f907b55d = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = Reflect.set(arg0, arg1 >>> 0, arg2);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_set_e7cd108182596b7f = function(arg0, arg1, arg2) {
    arg0.set(getArrayU32FromWasm0(arg1, arg2));
  };
  imports.wbg.__wbg_set_efaaf145b9377369 = function(arg0, arg1, arg2) {
    const ret = arg0.set(arg1, arg2);
    return ret;
  };
  imports.wbg.__wbg_set_index_004a7b69c5302b3d = function(arg0, arg1, arg2) {
    arg0[arg1 >>> 0] = arg2;
  };
  imports.wbg.__wbg_set_index_021489b2916af13e = function(arg0, arg1, arg2) {
    arg0[arg1 >>> 0] = arg2;
  };
  imports.wbg.__wbg_set_index_04c4b93e64d08a52 = function(arg0, arg1, arg2) {
    arg0[arg1 >>> 0] = arg2;
  };
  imports.wbg.__wbg_set_index_165b46b0114d368c = function(arg0, arg1, arg2) {
    arg0[arg1 >>> 0] = arg2;
  };
  imports.wbg.__wbg_set_index_42abe35f117e614e = function(arg0, arg1, arg2) {
    arg0[arg1 >>> 0] = arg2 >>> 0;
  };
  imports.wbg.__wbg_set_name_5399dd71553bb72d = function(arg0, arg1, arg2) {
    var v0 = getCachedStringFromWasm0(arg1, arg2);
    arg0.name = v0;
  };
  imports.wbg.__wbg_set_once_cb88c6a887803dfa = function(arg0, arg1) {
    arg0.once = arg1 !== 0;
  };
  imports.wbg.__wbg_set_onmessage_deb94985de696ac7 = function(arg0, arg1) {
    arg0.onmessage = arg1;
  };
  imports.wbg.__wbg_set_passive_a3aa35eb7292414e = function(arg0, arg1) {
    arg0.passive = arg1 !== 0;
  };
  imports.wbg.__wbg_set_responseType_df7a5fa93f0dd4be = function(arg0, arg1) {
    arg0.responseType = __wbindgen_enum_XmlHttpRequestResponseType[arg1];
  };
  imports.wbg.__wbg_set_signal_e89be862d0091009 = function(arg0, arg1) {
    arg0.signal = arg1;
  };
  imports.wbg.__wbg_set_type_c2eb2929316959f4 = function(arg0, arg1) {
    arg0.type = __wbindgen_enum_WorkerType[arg1];
  };
  imports.wbg.__wbg_set_value_029389309af8006f = function(arg0, arg1) {
    arg0.value = arg1;
  };
  imports.wbg.__wbg_shift_077cbb7c3051ad59 = function(arg0) {
    const ret = arg0.shift();
    return ret;
  };
  imports.wbg.__wbg_signal_3c14fbdc89694b39 = function(arg0) {
    const ret = arg0.signal;
    return ret;
  };
  imports.wbg.__wbg_slice_27b3dfe21d8ce752 = function(arg0, arg1, arg2) {
    const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
    return ret;
  };
  imports.wbg.__wbg_stack_0ed75d68575b0f3c = function(arg0, arg1) {
    const ret = arg1.stack;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg_stack_5cfe2ad0c5dc0277 = function(arg0, arg1) {
    const ret = arg1.stack;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg_static_accessor_GLOBAL_769e6b65d6557335 = function() {
    const ret = typeof global === "undefined" ? null : global;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
  };
  imports.wbg.__wbg_static_accessor_GLOBAL_THIS_60cf02db4de8e1c1 = function() {
    const ret = typeof globalThis === "undefined" ? null : globalThis;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
  };
  imports.wbg.__wbg_static_accessor_SELF_08f5a74c69739274 = function() {
    const ret = typeof self === "undefined" ? null : self;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
  };
  imports.wbg.__wbg_static_accessor_WINDOW_a8924b26aa92d024 = function() {
    const ret = typeof window === "undefined" ? null : window;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
  };
  imports.wbg.__wbg_status_9bfc680efca4bdfd = function(arg0) {
    const ret = arg0.status;
    return ret;
  };
  imports.wbg.__wbg_status_c547ab1614ba835e = function() {
    return handleError(function(arg0) {
      const ret = arg0.status;
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_subarray_3f9741dcca1b9d2d = function(arg0, arg1, arg2) {
    const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
    return ret;
  };
  imports.wbg.__wbg_subarray_845f2f5bce7d061a = function(arg0, arg1, arg2) {
    const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
    return ret;
  };
  imports.wbg.__wbg_then_429f7caf1026411d = function(arg0, arg1, arg2) {
    const ret = arg0.then(arg1, arg2);
    return ret;
  };
  imports.wbg.__wbg_then_4f95312d68691235 = function(arg0, arg1) {
    const ret = arg0.then(arg1);
    return ret;
  };
  imports.wbg.__wbg_timeOrigin_95e84025402e6aa7 = function(arg0) {
    const ret = arg0.timeOrigin;
    return ret;
  };
  imports.wbg.__wbg_type_378a8d394e96d082 = function(arg0) {
    const ret = arg0.type;
    return (__wbindgen_enum_Kind.indexOf(ret) + 1 || 3) - 1;
  };
  imports.wbg.__wbg_unshift_663583d1e06a5041 = function(arg0, arg1) {
    const ret = arg0.unshift(arg1);
    return ret;
  };
  imports.wbg.__wbg_valueOf_17c63ed1b225597a = function(arg0) {
    const ret = arg0.valueOf();
    return ret;
  };
  imports.wbg.__wbg_value_4cd497eeadba94bd = function(arg0) {
    const ret = arg0.value;
    return ret;
  };
  imports.wbg.__wbg_value_d90ca81e8311c834 = function(arg0) {
    const ret = arg0.value;
    return ret;
  };
  imports.wbg.__wbg_values_5122b02db5686076 = function(arg0) {
    const ret = Object.values(arg0);
    return ret;
  };
  imports.wbg.__wbg_waitAsync_8afec80ffd213eca = function(arg0, arg1, arg2) {
    const ret = Atomics.waitAsync(arg0, arg1 >>> 0, arg2);
    return ret;
  };
  imports.wbg.__wbg_waitAsync_c186cb97ffacd552 = function() {
    const ret = Atomics.waitAsync;
    return ret;
  };
  imports.wbg.__wbg_warn_6e567d0d926ff881 = function(arg0) {
    console.warn(arg0);
  };
  imports.wbg.__wbg_wasiproxy_new = function(arg0) {
    const ret = WasiProxy.__wrap(arg0);
    return ret;
  };
  imports.wbg.__wbg_wasithreadproxy_new = function(arg0) {
    const ret = WasiThreadProxy.__wrap(arg0);
    return ret;
  };
  imports.wbg.__wbindgen_cast_097a6eb168ff3f61 = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__i32__i64__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__);
    return ret;
  };
  imports.wbg.__wbindgen_cast_14a5bb8e6424556f = function(arg0, arg1) {
    const ret = makeMutClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures________invoke___web_sys_d01318204c8573f3___features__gen_Event__Event_____);
    return ret;
  };
  imports.wbg.__wbindgen_cast_207b56f5c450e3fd = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___js_sys_9592ece357cd80af___Array__core_cbe48ab93e5e7c65___result__Result_wasm_bindgen_388bf2787b29884b___JsValue__wasm_bindgen_388bf2787b29884b___JsValue___37);
    return ret;
  };
  imports.wbg.__wbindgen_cast_2b703b72e8793f61 = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__i32_);
    return ret;
  };
  imports.wbg.__wbindgen_cast_312de81d53a3413a = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__i32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__);
    return ret;
  };
  imports.wbg.__wbindgen_cast_3139d1f1f0a86e88 = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u64__u64__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__);
    return ret;
  };
  imports.wbg.__wbindgen_cast_3c0cbfe06e4e176b = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___js_sys_9592ece357cd80af___Array__core_cbe48ab93e5e7c65___result__Result_wasm_bindgen_388bf2787b29884b___JsValue__wasm_bindgen_388bf2787b29884b___JsValue___25);
    return ret;
  };
  imports.wbg.__wbindgen_cast_3edf8bef1a76aa9d = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__u32__u32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__);
    return ret;
  };
  imports.wbg.__wbindgen_cast_455abd06ac547eb4 = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__u32__u64__u64__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__);
    return ret;
  };
  imports.wbg.__wbindgen_cast_532788dcc91f36df = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__i64__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__);
    return ret;
  };
  imports.wbg.__wbindgen_cast_53b73f44a53520d6 = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__i64__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__);
    return ret;
  };
  imports.wbg.__wbindgen_cast_596f8c6b615b50d7 = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u64__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__);
    return ret;
  };
  imports.wbg.__wbindgen_cast_5c152efbf5ca7dab = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__i32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___23);
    return ret;
  };
  imports.wbg.__wbindgen_cast_63a5f2d92d87c0c1 = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u64__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__);
    return ret;
  };
  imports.wbg.__wbindgen_cast_65b6ab5877ddbe71 = function(arg0, arg1) {
    const ret = makeMutClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_core_cbe48ab93e5e7c65___ops__function__FnMut__wasm_bindgen_388bf2787b29884b___JsValue____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___wasm_bindgen_388bf2787b29884b___JsValue_____);
    return ret;
  };
  imports.wbg.__wbindgen_cast_6ad97862a7c782d4 = function(arg0, arg1) {
    const ret = makeMutClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_core_cbe48ab93e5e7c65___ops__function__FnMut__wasm_bindgen_388bf2787b29884b___JsValue____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___wasm_bindgen_388bf2787b29884b___JsValue______33);
    return ret;
  };
  imports.wbg.__wbindgen_cast_6cff0c545fabcaa4 = function(arg0, arg1) {
    const ret = makeMutClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_core_cbe48ab93e5e7c65___ops__function__FnMut_____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke______);
    return ret;
  };
  imports.wbg.__wbindgen_cast_7125c12a75d3f289 = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__core_cbe48ab93e5e7c65___result__Result_____wasm_bindgen_388bf2787b29884b___JsValue__);
    return ret;
  };
  imports.wbg.__wbindgen_cast_72253063a041e01f = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___js_sys_9592ece357cd80af___Array__core_cbe48ab93e5e7c65___result__Result_wasm_bindgen_388bf2787b29884b___JsValue__wasm_bindgen_388bf2787b29884b___JsValue___12);
    return ret;
  };
  imports.wbg.__wbindgen_cast_757337c04cbafffa = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__u32__u32__u64__u64__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__);
    return ret;
  };
  imports.wbg.__wbindgen_cast_7ace2407955af040 = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__);
    return ret;
  };
  imports.wbg.__wbindgen_cast_7e9c58eeb11b0a6f = function(arg0, arg1) {
    var v0 = getCachedStringFromWasm0(arg0, arg1);
    const ret = v0;
    return ret;
  };
  imports.wbg.__wbindgen_cast_80b6fc8628e79c8f = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__u32__u64__u64__u32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__);
    return ret;
  };
  imports.wbg.__wbindgen_cast_81d486e251a8cc40 = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__u32__i32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___29);
    return ret;
  };
  imports.wbg.__wbindgen_cast_83742b4211b1c63b = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__i32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___16);
    return ret;
  };
  imports.wbg.__wbindgen_cast_86d079120d4f16c5 = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__i32_);
    return ret;
  };
  imports.wbg.__wbindgen_cast_94d2a947485e0891 = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__u32__core_cbe48ab93e5e7c65___result__Result_____wasm_bindgen_388bf2787b29884b___JsValue__);
    return ret;
  };
  imports.wbg.__wbindgen_cast_a3c6c72c78df51e6 = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__i64__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___30);
    return ret;
  };
  imports.wbg.__wbindgen_cast_a3dfe23eaa384fcd = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___17);
    return ret;
  };
  imports.wbg.__wbindgen_cast_b2b2948e3ace6315 = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__u32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__);
    return ret;
  };
  imports.wbg.__wbindgen_cast_d008025eb7f7c36c = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__);
    return ret;
  };
  imports.wbg.__wbindgen_cast_d0ba506d67568fb9 = function(arg0, arg1) {
    const ret = makeMutClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_core_cbe48ab93e5e7c65___ops__function__FnMut_____Output________1_, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke_______1_);
    return ret;
  };
  imports.wbg.__wbindgen_cast_d43c8e27aaa5b78f = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___39);
    return ret;
  };
  imports.wbg.__wbindgen_cast_d4d30d3458fd2792 = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___js_sys_9592ece357cd80af___Array__core_cbe48ab93e5e7c65___result__Result_wasm_bindgen_388bf2787b29884b___JsValue__wasm_bindgen_388bf2787b29884b___JsValue__);
    return ret;
  };
  imports.wbg.__wbindgen_cast_d674fb7615a9c3bf = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__);
    return ret;
  };
  imports.wbg.__wbindgen_cast_d6cd19b81560fd6e = function(arg0) {
    const ret = arg0;
    return ret;
  };
  imports.wbg.__wbindgen_cast_de7a27158ac76aa0 = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__core_cbe48ab93e5e7c65___result__Result_____wasm_bindgen_388bf2787b29884b___JsValue___22);
    return ret;
  };
  imports.wbg.__wbindgen_cast_e47ed47b3d72cbe3 = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__i32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___20);
    return ret;
  };
  imports.wbg.__wbindgen_cast_e8504dae861d8218 = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u32__u32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___40);
    return ret;
  };
  imports.wbg.__wbindgen_cast_e9119e6a666ef101 = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__u32__i32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__);
    return ret;
  };
  imports.wbg.__wbindgen_cast_ef6cef971fa69707 = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__i32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___38);
    return ret;
  };
  imports.wbg.__wbindgen_cast_f5eaf46612275177 = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___i32__u32__u32__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue___9);
    return ret;
  };
  imports.wbg.__wbindgen_cast_fcc955862d093565 = function(arg0, arg1) {
    const ret = makeClosure(arg0, arg1, wasm.wasm_bindgen_388bf2787b29884b___closure__destroy___dyn_for__a__core_cbe48ab93e5e7c65___ops__function__FnMut____a_web_sys_d01318204c8573f3___features__gen_Event__Event____Output_______, wasm_bindgen_388bf2787b29884b___convert__closures_____invoke___u32__u64__u64__core_cbe48ab93e5e7c65___result__Result_i32__wasm_bindgen_388bf2787b29884b___JsValue__);
    return ret;
  };
  imports.wbg.__wbindgen_init_externref_table = function() {
    const table = wasm.__wbindgen_externrefs;
    const offset = table.grow(4);
    table.set(0, void 0);
    table.set(offset + 0, void 0);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
  };
  imports.wbg.__wbindgen_link_203404ece0e9bab9 = function(arg0) {
    const val = `onmessage = function (ev) {
            let [ia, index, value] = ev.data;
            ia = new Int32Array(ia.buffer);
            let result = Atomics.wait(ia, index, value);
            postMessage(result);
        };
        `;
    const ret = typeof URL.createObjectURL === "undefined" ? "data:application/javascript," + encodeURIComponent(val) : URL.createObjectURL(new Blob([val], { type: "text/javascript" }));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.memory = memory || new WebAssembly.Memory({ initial: 19, maximum: 32768, shared: true });
  imports["./snippets/kernel_wasm-5feec41738f550fe/inline0.js"] = inline0_exports;
  return imports;
}
function __wbg_finalize_init(instance, module, thread_stack_size) {
  wasm = instance.exports;
  __wbg_init.__wbindgen_wasm_module = module;
  cachedDataViewMemory0 = null;
  cachedUint32ArrayMemory0 = null;
  cachedUint8ArrayMemory0 = null;
  if (typeof thread_stack_size !== "undefined" && (typeof thread_stack_size !== "number" || thread_stack_size === 0 || thread_stack_size % 65536 !== 0)) {
    throw "invalid stack size";
  }
  wasm.__wbindgen_start(thread_stack_size);
  return wasm;
}
async function __wbg_init(module_or_path, memory) {
  if (wasm !== void 0) return wasm;
  let thread_stack_size;
  if (typeof module_or_path !== "undefined") {
    if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
      ({ module_or_path, memory, thread_stack_size } = module_or_path);
    } else {
      console.warn("using deprecated parameters for the initialization function; pass a single object instead");
    }
  }
  if (typeof module_or_path === "undefined") {
    module_or_path = new URL("kernel_bg.wasm", import.meta.url);
  }
  const imports = __wbg_get_imports(memory);
  if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) {
    module_or_path = fetch(module_or_path);
  }
  const { instance, module } = await __wbg_load(await module_or_path, imports);
  return __wbg_finalize_init(instance, module, thread_stack_size);
}
var kernel_default = __wbg_init;

// ../../../../../../../../../execroot/_main/bazel-out/k8-opt/bin/frontend/kernel/entry.mjs
if (self.name === "kworker") {
  const report = (message, stack) => self.postMessage({
    type: "error",
    message: String(message),
    stack: String(stack ?? "")
  });
  self.addEventListener("error", (event) => report(event.message, event.error?.stack));
  self.addEventListener("unhandledrejection", (event) => report(event.reason, event.reason?.stack));
  try {
    const ready = new Promise((resolve) => {
      self.onmessage = (event) => {
        self.onmessage = null;
        resolve(event.data);
      };
    });
    const { module, memory } = await ready;
    await kernel_default({ module_or_path: module, memory });
    kworker_start();
    self.onmessage = (event) => {
      try {
        kworker_run(event);
      } finally {
        try {
          kworker_finish();
        } catch (error) {
          report(error, error?.stack);
        }
      }
    };
  } catch (error) {
    report(error, error?.stack);
  }
} else {
  await kernel_default();
}
