# static libwebp binaries

Static **[libwebp](https://developers.google.com/speed/webp) binaries for macOS, Linux, Windows.**

Provides precompiled static binaries for all tools of the libwebp library.

`anim_diff`, `anim_dump`, `cwebp`, `dwebp`, `get_disto`, `gif2webp`, `img2webp`, `vwebp`, `webpinfo`, `webpmux`, `webp_quality`

Supports macOS (64-bit and arm64), Linux (64-bit, arm64), Windows (64-bit).

![NPM Downloads](https://img.shields.io/npm/d18m/libwebp-static?style=for-the-badge)

## Sources of the binaries

[The binaries download script](install.js) downloads binaries from these locations:

- [Official WebP releases](https://storage.googleapis.com/downloads.webmproject.org/releases/webp/index.html)

The script extracts build information and (when possible) the license file from the downloaded package or the distribution server. Please consult the official WebP project for exact source versions.

## Installation

Install via npm:
```sh
npm install libwebp-static
```

## Usage

This package provides paths to the static `cwebp` and `dwebp` binaries, so they can be used in your Node.js applications:

```js
const { cwebp, dwebp } = require("libwebp-static");
const { execFileSync } = require("child_process");

execFileSync(cwebp, ["input.png", "-o", "output.webp"]);
console.log("Image converted to WebP!");
```

## Building the project

The `unzip`, `tar` CLI executables need to be installed. On macOS, use `brew install gnu-tar xz`.

## License

This project is licensed under the **GPL-3.0 License**.

The included WebP binaries are provided by Google and are subject to their own licensing terms. For more details, see the [WebP licensing information](https://chromium.googlesource.com/webm/libwebp/+/refs/heads/main/COPYING).

