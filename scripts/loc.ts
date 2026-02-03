#!/usr/bin/env tsx

import { readFile, readdir, stat } from 'fs/promises';
import { join, extname, relative } from 'path';
import { existsSync } from 'fs';

interface Config {
  maxLines: number;
  include: {
    extensions: string[];
  };
  exclude: {
    dirs: string[];
    files: string[];
    patterns: string[];
  };
}

interface FileStats {
  path: string;
  lines: number;
  extension: string;
}

interface Results {
  checkedFiles: FileStats[];
  oversizedFiles: FileStats[];
  totalFiles: number;
  totalLines: number;
}

class LineCounter {
  private config: Config;
  private rootDir: string;
  private excludePatterns: RegExp[];

  constructor(config: Config, rootDir: string = process.cwd()) {
    this.config = config;
    this.rootDir = rootDir;
    this.excludePatterns = config.exclude.patterns.map(pattern => new RegExp(pattern));
  }

  async run(checkMode = false): Promise<void> {
    const results = await this.scanDirectory(this.rootDir);
    
    if (checkMode && results.oversizedFiles.length > 0) {
      this.printOversizedFiles(results);
      process.exit(1);
    }

    this.printResults(results);
  }

  private async scanDirectory(dirPath: string): Promise<Results> {
    const results: Results = {
      checkedFiles: [],
      oversizedFiles: [],
      totalFiles: 0,
      totalLines: 0
    };

    await this.scanDirectoryRecursive(dirPath, results);
    return results;
  }

  private async scanDirectoryRecursive(dirPath: string, results: Results): Promise<void> {
    const entries = await readdir(dirPath);

    for (const entry of entries) {
      const fullPath = join(dirPath, entry);
      const stats = await stat(fullPath);

      if (stats.isDirectory()) {
        if (this.shouldExcludeDirectory(entry, fullPath)) {
          continue;
        }
        await this.scanDirectoryRecursive(fullPath, results);
      } else if (stats.isFile()) {
        const fileStats = await this.processFile(fullPath);
        if (fileStats) {
          results.checkedFiles.push(fileStats);
          results.totalFiles++;
          results.totalLines += fileStats.lines;

          if (fileStats.lines > this.config.maxLines) {
            results.oversizedFiles.push(fileStats);
          }
        }
      }
    }
  }

  private shouldExcludeDirectory(dirName: string, fullPath: string): boolean {
    const relativePath = relative(this.rootDir, fullPath);

    // Check excluded directories (both by name and by relative path)
    if (this.config.exclude.dirs.includes(dirName) || this.config.exclude.dirs.includes(relativePath)) {
      return true;
    }

    // Check if directory matches any exclude patterns
    return this.excludePatterns.some(pattern => pattern.test(relativePath) || pattern.test(dirName));
  }

  private shouldExcludeFile(fileName: string, fullPath: string): boolean {
    const relativePath = relative(this.rootDir, fullPath);

    // Check excluded files
    if (this.config.exclude.files.includes(relativePath) || this.config.exclude.files.includes(fileName)) {
      return true;
    }

    // Check if file matches any exclude patterns
    return this.excludePatterns.some(pattern => pattern.test(relativePath) || pattern.test(fileName));
  }

  private async processFile(filePath: string): Promise<FileStats | null> {
    const fileName = filePath.split('/').pop() || '';
    const ext = extname(filePath);

    // Check if file should be excluded
    if (this.shouldExcludeFile(fileName, filePath)) {
      return null;
    }

    // Check if extension is included
    if (!this.config.include.extensions.includes(ext)) {
      return null;
    }

    try {
      const content = await readFile(filePath, 'utf-8');
      const lines = content.split('\n').length;

      return {
        path: relative(this.rootDir, filePath),
        lines,
        extension: ext
      };
    } catch {
      // Skip files that can't be read (binary files, permission issues, etc.)
      return null;
    }
  }

  private printResults(results: Results): void {
    console.log('\n📊 Lines of Code Report');
    console.log('========================\n');

    // Summary
    console.log(`📁 Total files scanned: ${results.totalFiles}`);
    console.log(`📝 Total lines: ${results.totalLines.toLocaleString()}`);
    console.log(`⚠️  Files over ${this.config.maxLines} lines: ${results.oversizedFiles.length}\n`);

    if (results.oversizedFiles.length > 0) {
      this.printOversizedFiles(results);
    }

    // File type breakdown
    this.printFileTypeBreakdown(results.checkedFiles);
  }

  private printOversizedFiles(results: Results): void {
    console.log('🚨 Files exceeding line limit:');
    console.log('--------------------------------');
    
    // Sort by line count descending
    const sorted = [...results.oversizedFiles].sort((a, b) => b.lines - a.lines);
    
    sorted.forEach(file => {
      const linesOverLimit = file.lines - this.config.maxLines;
      console.log(`${file.path} (${file.lines} lines, +${linesOverLimit} over limit)`);
    });
    
    // Guidance based on our code standards
    console.log(`
Recommendation: extract where feasible following our code standards (keep files under ${this.config.maxLines} lines). When breaking down files, make sure to properly add JSDoc comments to explain the purpose of each file.
`);
  }

  private printFileTypeBreakdown(files: FileStats[]): void {
    const breakdown: Record<string, { count: number; lines: number }> = {};

    files.forEach(file => {
      const ext = file.extension || '(no extension)';
      if (!breakdown[ext]) {
        breakdown[ext] = { count: 0, lines: 0 };
      }
      breakdown[ext].count++;
      breakdown[ext].lines += file.lines;
    });

    console.log('📈 File type breakdown:');
    console.log('-----------------------');

    // Sort by total lines descending
    const sorted = Object.entries(breakdown).sort(([,a], [,b]) => b.lines - a.lines);
    
    sorted.forEach(([ext, stats]) => {
      const avgLines = Math.round(stats.lines / stats.count);
      console.log(`${ext.padEnd(8)} ${stats.count.toString().padStart(4)} files, ${stats.lines.toString().padStart(6)} lines (avg: ${avgLines})`);
    });
  }
}

async function loadConfig(): Promise<Config> {
  const configPath = join(process.cwd(), 'loc.config.json');
  
  if (!existsSync(configPath)) {
    console.error('❌ loc.config.json not found. Please create a configuration file.');
    process.exit(1);
  }

  try {
    const configContent = await readFile(configPath, 'utf-8');
    return JSON.parse(configContent) as Config;
  } catch (error) {
    console.error('❌ Error reading loc.config.json:', error);
    process.exit(1);
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const checkMode = args.includes('--check');
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
📊 Lines of Code Counter

Usage: bun run loc [options]

Options:
  --check    Exit with error code if files exceed line limit
  --help     Show this help message

Configuration:
  Edit loc.config.json to customize behavior
`);
    return;
  }

  try {
    const config = await loadConfig();
    const counter = new LineCounter(config);
    await counter.run(checkMode);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
