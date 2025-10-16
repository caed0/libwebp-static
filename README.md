  # libwebp-static

[![NPM Version](https://img.shields.io/npm/v/libwebp-static?style=for-the-badge)](https://www.npmjs.com/package/libwebp-static)
[![NPM Downloads](https://img.shields.io/npm/d18m/libwebp-static?style=for-the-badge)](https://www.npmjs.com/package/libwebp-static)
[![License](https://img.shields.io/npm/l/libwebp-static?style=for-the-badge)](LICENSE)

Static **[libwebp](https://developers.google.com/speed/webp)** binaries for **macOS**, **Linux**, and **Windows**.

A Node.js package that provides precompiled static binaries for all tools from Google's libwebp library, enabling WebP image conversion and manipulation without requiring manual installation or compilation.

## ✨ Features

- 🚀 **Zero compilation** - No need to build libwebp from source
- 🌍 **Cross-platform** - Works on macOS (x64/ARM64), Linux (x64/ARM64), and Windows (x64)
- 📦 **Complete toolset** - Includes all libwebp command-line tools
- ⚡ **Automatic installation** - Binaries are downloaded during npm install
- 🔧 **Easy integration** - Simple Node.js API for accessing binary paths

## 🛠️ Available Tools

This package includes the following libwebp command-line tools:

| Tool | Description |
|------|-------------|
| `cwebp` | Compress images to WebP format |
| `dwebp` | Decompress WebP images to PNG/PPM/PAM/PGM/BMP |
| `gif2webp` | Convert GIF animations to animated WebP |
| `img2webp` | Create animated WebP from image sequence |
| `webpmux` | Mux/demux tool for WebP images |
| `webpinfo` | Display info about WebP images |
| `anim_diff` | Compare animated WebP images |
| `anim_dump` | Dump frames from animated WebP |
| `get_disto` | Compute distortion metrics |
| `vwebp` | Simple WebP viewer (GUI) |
| `webp_quality` | Print quality estimates |

## 🖥️ Platform Support

| Platform | Architecture | Status |
|----------|--------------|--------|
| macOS | x64 (Intel) | ✅ |
| macOS | ARM64 (Apple Silicon) | ✅ |
| Linux | x64 | ✅ |
| Linux | ARM64 | ✅ |
| Windows | x64 | ✅ |

## Sources of the binaries

[The binaries download script](install.js) downloads binaries from these locations:

- [Official WebP releases](https://storage.googleapis.com/downloads.webmproject.org/releases/webp/index.html)

The script extracts build information and (when possible) the license file from the downloaded package or the distribution server. Please consult the official WebP project for exact source versions.

## 📦 Installation

Install via npm:

```bash
npm install libwebp-static
```

### Requirements

- Node.js 12 or higher
- Internet connection (for downloading binaries during installation)

### Platform-specific requirements

- **macOS**: No additional requirements
- **Linux**: `tar` and `gzip` utilities (usually pre-installed)
- **Windows**: No additional requirements


### Available Binary Paths

All tools are available as properties of the exported object:

- `webpTools.cwebp` - WebP encoder
- `webpTools.dwebp` - WebP decoder  
- `webpTools.gif2webp` - GIF to WebP converter
- `webpTools.img2webp` - Image sequence to WebP converter
- `webpTools.webpmux` - WebP multiplexer
- `webpTools.webpinfo` - WebP information tool
- `webpTools.anim_diff` - Animation comparison tool
- `webpTools.anim_dump` - Animation frame extractor
- `webpTools.get_disto` - Distortion calculation tool
- `webpTools.vwebp` - WebP viewer (GUI)
- `webpTools.webp_quality` - Quality estimation tool

### Getting Help

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/caed0/libwebp-static/issues)
- 💡 **Feature Requests**: [GitHub Issues](https://github.com/caed0/libwebp-static/issues)
- 📖 **WebP Documentation**: [Google WebP Docs](https://developers.google.com/speed/webp/)

## 📄 License

This project is licensed under the **GPL-3.0-or-later License** - see the [LICENSE](LICENSE) file for details.

The libwebp library is licensed under a separate license. For more information, please refer to the [libwebp license](https://github.com/webmproject/libwebp/blob/main/COPYING).
