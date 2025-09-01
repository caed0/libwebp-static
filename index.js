/**
 * @fileoverview libwebp-static - Static WebP binaries for Node.js
 * 
 * This module provides access to precompiled WebP command-line tools
 * for cross-platform image conversion and manipulation.
 * 
 * @author caed0
 * @version 1.0.2
 * @license GPL-3.0-or-later
 */

const path = require("path");
const fs = require("fs");

/**
 * Current platform identifier (win32, darwin, linux)
 * @type {string}
 */
const platform = process.platform;

/**
 * Current architecture identifier (x64, arm64)
 * @type {string}
 */
const arch = process.arch;

/**
 * Path to the platform-specific binary directory
 * @type {string}
 */
const binaryPath = path.join(__dirname, "binaries", platform, arch, "bin");

/**
 * Object containing paths to all available WebP tools
 * @type {Object.<string, string>}
 */
const binaries = {};

// Verify that the binary directory exists for the current platform/architecture
if (fs.existsSync(binaryPath)) {
    /**
     * Read all binary files from the platform-specific directory
     * and create an object mapping tool names to their full paths
     */
    const files = fs.readdirSync(binaryPath);
    files.forEach(file => { 
        // Remove file extension to get the tool name
        const toolName = file.split('.')[0];
        binaries[toolName] = path.join(binaryPath, file); 
    });
} else {
    // Critical error: binaries not found for current platform
    console.error(`Prebuilt binary for ${platform}-${arch} not found!`);
    console.error(`Expected path: ${binaryPath}`);
    console.error('Please ensure the package was installed correctly and your platform is supported.');
    console.error('Supported platforms: darwin-x64, darwin-arm64, linux-x64, linux-arm64, win32-x64');
    process.exit(1);
}

/**
 * Export object containing paths to all WebP command-line tools.
 * 
 * Available tools (when present):
 * - cwebp: WebP encoder
 * - dwebp: WebP decoder
 * - gif2webp: GIF to WebP converter
 * - img2webp: Image sequence to WebP converter
 * - webpmux: WebP multiplexer/demultiplexer
 * - webpinfo: WebP image information tool
 * - anim_diff: Animation comparison tool
 * - anim_dump: Animation frame extractor
 * - get_disto: Distortion calculation tool
 * - vwebp: WebP viewer (GUI)
 * - webp_quality: Quality estimation tool
 * 
 * @example
 * const { cwebp, dwebp } = require('libwebp-static');
 * const { execFileSync } = require('child_process');
 * 
 * // Convert PNG to WebP
 * execFileSync(cwebp, ['input.png', '-o', 'output.webp']);
 * 
 * // Convert WebP to PNG
 * execFileSync(dwebp, ['input.webp', '-o', 'output.png']);
 * 
 * @module libwebp-static
 */
module.exports = binaries;






