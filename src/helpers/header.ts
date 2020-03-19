import {isPlainObject} from "./util";

function normalizeHeader(header: any, normalizeName: string): void {
  if (!header) {
    return
  }

  Object.keys(header).forEach( name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      header[normalizeName] = header[name];
      delete header[name];
    }
  })
}

export function processHeader(header: any, data: any): any {
  normalizeHeader(header, "Content-Type");

  if (isPlainObject(data)) {
    if (header && !header["Content-Type"]) {
      header["Content-Type"] = "application/json;charset=UTF-8";
    }
  }
}

export function parseHeader(header: string): any {
  let parsed = Object.create(null);
  if (!header) {
    return;
  }

  header.split('\r\n').forEach(line => {
    let [key, val] = line.split(':');
    key = key.trim().toLowerCase();
    if (!key) {
      return;
    }
    if (val) {
      val = val.trim();
    }
    parsed[key] = val;
  });

  return parsed;
}
