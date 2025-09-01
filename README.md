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

## 🚀 Quick Start

### Basic Usage

```javascript
const { cwebp, dwebp } = require("libwebp-static");
const { execFileSync } = require("child_process");

// Convert PNG to WebP
execFileSync(cwebp, ["input.png", "-o", "output.webp"]);
console.log("Image converted to WebP!");

// Convert WebP back to PNG
execFileSync(dwebp, ["output.webp", "-o", "decoded.png"]);
console.log("WebP decoded to PNG!");
```

### Advanced Usage

```javascript
const webpTools = require("libwebp-static");
const { spawn } = require("child_process");

// Convert with quality settings
const convertWithQuality = (input, output, quality = 80) => {
  return new Promise((resolve, reject) => {
    const process = spawn(webpTools.cwebp, [
      input,
      "-q", quality.toString(),
      "-o", output
    ]);
    
    process.on("close", (code) => {
      if (code === 0) {
        resolve("Conversion successful");
      } else {
        reject(new Error(`Conversion failed with exit code ${code}`));
      }
    });
  });
};

// Usage
convertWithQuality("image.jpg", "image.webp", 90)
  .then(console.log)
  .catch(console.error);
```

### Creating Animated WebP

```javascript
const { gif2webp, img2webp } = require("libwebp-static");
const { execFileSync } = require("child_process");

// Convert GIF to animated WebP
execFileSync(gif2webp, ["animation.gif", "-o", "animation.webp"]);

// Create animated WebP from image sequence
execFileSync(img2webp, [
  "-o", "sequence.webp",
  "-d", "100", // 100ms between frames
  "frame1.png", "frame2.png", "frame3.png"
]);
```

## 📚 API Reference

The module exports an object containing paths to all available binaries:

```javascript
const webpTools = require("libwebp-static");

console.log(webpTools);
// Output:
// {
//   cwebp: '/path/to/libwebp-static/binaries/platform/arch/bin/cwebp',
//   dwebp: '/path/to/libwebp-static/binaries/platform/arch/bin/dwebp',
//   gif2webp: '/path/to/libwebp-static/binaries/platform/arch/bin/gif2webp',
//   // ... other tools
// }
```

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

## 🔧 Command Line Options

Each tool comes with various command-line options. Here are some common examples:

### cwebp (WebP Encoder)

```bash
# Basic conversion
cwebp input.jpg -o output.webp

# Set quality (0-100)
cwebp input.jpg -q 80 -o output.webp

# Lossless compression
cwebp input.png -lossless -o output.webp

# Resize image
cwebp input.jpg -resize 800 600 -o output.webp
```

### dwebp (WebP Decoder)

```bash
# Convert to PNG
dwebp input.webp -o output.png

# Convert to JPG
dwebp input.webp -bmp -o output.bmp

# Get image info
dwebp input.webp -ppm -o output.ppm
```

### gif2webp (GIF to WebP)

```bash
# Basic conversion
gif2webp animation.gif -o animation.webp

# Set quality for keyframes
gif2webp animation.gif -q 70 -o animation.webp

# Optimize for size
gif2webp animation.gif -lossy -q 60 -o animation.webp
```

For complete documentation of command-line options, refer to the [official WebP documentation](https://developers.google.com/speed/webp/docs/using).

## 🏗️ Building from Source

If you need to build the project yourself:

### Prerequisites

- Node.js 12+
- `curl` command-line tool
- Platform-specific extraction tools:
  - **macOS**: `brew install gnu-tar xz`
  - **Linux**: `tar`, `gzip` (usually pre-installed)
  - **Windows**: Built-in tools are sufficient

### Build Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/caed0/libwebp-static.git
   cd libwebp-static
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Download and extract binaries:
   ```bash
   node install.js
   ```

## 🛠️ Development

### Project Structure

```
libwebp-static/
├── index.js          # Main module entry point
├── install.js        # Binary download and extraction script
├── package.json      # Package configuration
├── README.md         # This documentation
├── LICENSE           # License file
└── binaries/         # Downloaded binaries (created during install)
    ├── darwin/       # macOS binaries
    │   ├── arm64/    # Apple Silicon
    │   └── x64/      # Intel
    ├── linux/        # Linux binaries
    │   ├── arm64/    # ARM64
    │   └── x64/      # x86_64
    └── win32/        # Windows binaries
        └── x64/      # 64-bit
```

### Running Tests

```bash
# Test binary accessibility
node -e "console.log(require('./index.js'))"

# Test a specific tool
node -e "const {cwebp} = require('./'); console.log('cwebp path:', cwebp)"
```

## 🔍 Troubleshooting

### Common Issues

#### "Prebuilt binary for [platform]-[arch] not found!"

This error occurs when binaries for your platform/architecture combination are not available or failed to download.

**Solutions:**
1. Check if your platform is supported (see Platform Support table above)
2. Ensure you have an internet connection during installation
3. Try reinstalling: `rm -rf node_modules && npm install`
4. Check if the download URLs are accessible from your network

#### Permission denied errors on Linux/macOS

The binaries might not have execute permissions.

**Solution:**
```bash
chmod +x node_modules/libwebp-static/binaries/*/*/bin/*
```

#### Network/firewall issues

If downloads fail due to network restrictions:

**Solutions:**
1. Configure npm to use your corporate proxy
2. Download binaries manually and place them in the correct directory structure
3. Use a different network or contact your IT administrator

### Debug Mode

To enable debug output during installation:

```bash
DEBUG=libwebp-static npm install
```

### Getting Help

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/caed0/libwebp-static/issues)
- 💡 **Feature Requests**: [GitHub Issues](https://github.com/caed0/libwebp-static/issues)
- 📖 **WebP Documentation**: [Google WebP Docs](https://developers.google.com/speed/webp/)

## 📋 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed list of changes in each version.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the **GPL-3.0-or-later License** - see the [LICENSE](LICENSE) file for details.

### Third-party Licenses

The included WebP binaries are developed by Google and are subject to their own licensing terms:
- **WebP Library**: BSD-3-Clause License
- **Source Code**: [Chromium WebP Repository](https://chromium.googlesource.com/webm/libwebp/)
- **License Details**: [WebP COPYING file](https://chromium.googlesource.com/webm/libwebp/+/refs/heads/main/COPYING)

## 🙏 Acknowledgments

- Google WebP team for the excellent WebP library
- Contributors and users of this package
- The Node.js community for inspiration and best practices

## 📊 Stats

- **WebP Version**: 1.5.0
- **Package Size**: ~50MB (platform-dependent)
- **Supported Node.js**: 12.x, 14.x, 16.x, 18.x, 20.x+

