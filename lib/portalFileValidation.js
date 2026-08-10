const SIGNATURES = {
  "application/pdf": (buffer) => buffer.subarray(0, 5).toString("ascii") === "%PDF-",
  "image/png": (buffer) => buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
  "image/jpeg": (buffer) => buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff,
  "image/webp": (buffer) => buffer.length >= 12 && buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP",
  "audio/mpeg": (buffer) => buffer.length >= 3 && (buffer.subarray(0, 3).toString("ascii") === "ID3" || (buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0)),
  "audio/mp4": (buffer) => buffer.length >= 12 && buffer.subarray(4, 8).toString("ascii") === "ftyp",
  "audio/wav": (buffer) => buffer.length >= 12 && buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WAVE",
};

const TYPE_ALIASES = {
  "audio/x-m4a": "audio/mp4",
  "audio/x-wav": "audio/wav",
};

const EXTENSIONS = {
  "application/pdf": new Set(["pdf"]),
  "image/png": new Set(["png"]),
  "image/jpeg": new Set(["jpg", "jpeg"]),
  "image/webp": new Set(["webp"]),
  "audio/mpeg": new Set(["mp3"]),
  "audio/mp4": new Set(["m4a", "mp4"]),
  "audio/wav": new Set(["wav"]),
};

function canonicalType(type) {
  const normalized = String(type || "").toLowerCase();
  return TYPE_ALIASES[normalized] || normalized;
}

/**
 * Validate both the browser metadata and the actual file header. This is not a
 * substitute for malware scanning, but it prevents renamed or MIME-spoofed
 * files from entering the private portal vault.
 */
export async function validatePortalUpload(file, { allowedTypes, maxBytes }) {
  if (!(file instanceof File)) return { ok: false, error: "Choose a file to upload." };
  if (file.size <= 0) return { ok: false, error: "The selected file is empty." };
  if (file.size > maxBytes) return { ok: false, error: `The file must be ${Math.round(maxBytes / 1024 / 1024)} MB or smaller.` };

  const type = canonicalType(file.type);
  const allowed = new Set([...allowedTypes].map(canonicalType));
  if (!allowed.has(type) || !SIGNATURES[type]) return { ok: false, error: "This file type is not permitted." };

  const extension = String(file.name || "").split(".").pop()?.toLowerCase();
  if (!extension || !EXTENSIONS[type]?.has(extension)) return { ok: false, error: "The filename extension does not match the selected file type." };

  const buffer = Buffer.from(await file.arrayBuffer());
  if (!SIGNATURES[type](buffer)) return { ok: false, error: "The file content does not match its declared type." };
  return { ok: true, buffer, contentType: type };
}
