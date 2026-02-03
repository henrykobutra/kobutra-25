---
order: 1
slug: 200-line-rule
title: "The 200-Line Rule: An AI Coding Assistant's Best Friend"
tags: ["ai-coding", "best-practices", "architecture", "tooling"]
date: "2024-01-15"
excerpt: "How the 200-line rule evolved from AI coding assistant limitations into a powerful maintainability practice, complete with automated tooling."
---

The **200-line rule** started as an observation about AI coding assistants but has become one of my most valuable development practices. What began as working within AI limitations has evolved into a principle that fundamentally improves code quality.

## The AI Coding Origin Story

Initially, I adopted the 200-line rule because early AI coding assistants, including Windsurf, tended to read about 200 lines at a time. While modern AI assistants have long exceeded this threshold, I've kept this as my personal AI coding rule because it creates an optimal working relationship between human and AI.

When files stay under 200 lines, AI assistants can:
- Understand the entire context in one pass
- Make more accurate suggestions
- Avoid partial refactoring that leaves code in an inconsistent state

## Automated Enforcement with Custom Tooling

To make this rule practical, I created a comprehensive line-counting script and integrated it into my development workflow. The script uses [tsx](https://tsx.is/) to run TypeScript directly, so you'll need to install it first:

```bash
bun add -D tsx
# or npm install --save-dev tsx
```

Here's the complete implementation:

```typescript
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
```

*Ironic note: Yes, the script itself is 255 lines and breaks my own rule! 🤦‍♂️ It's a classic case of "do as I say, not as I do." This script could definitely be refactored into smaller modules, but sometimes utility scripts get a pass... or maybe I just need to practice what I preach.*

The script provides:
- **Detailed reporting**: File type breakdowns, averages, and totals
- **CI integration**: `--check` mode that fails builds for oversized files
- **Smart exclusions**: Configurable patterns to skip generated files
- **Actionable guidance**: Specific recommendations for files exceeding limits

I've integrated this into my package.json workflow:

```json
{
  "scripts": {
    "loc": "tsx scripts/loc.ts",
    "loc:check": "tsx scripts/loc.ts --check",
    "quality": "bun run lint && bunx tsc --noEmit && bun run loc:check && bun run knip"
  }
}
```

Now I can simply tell coding assistants: "run `bun run quality`" and let the automated checks guide the refactoring process.

## Real-World Benefits and Trade-offs

This approach has genuinely helped keep files small and maintainable, but it's **not a magic bullet**:

### The Good
- **Prevents drowning in long components**: No more 500+ line utility files or components
- **Forces better architecture**: Naturally leads to more focused, single-responsibility modules
- **Improves AI collaboration**: Assistants work more effectively with smaller, focused files

### The Challenges
- **Prone to over-engineering**: Sometimes coding assistants break down components only partially, creating inconsistent states
- **Unnecessary re-exports**: AI might create complex module hierarchies when simple would suffice
- **Not always practical**: Some complex forms or data visualization components legitimately need more lines

Despite these trade-offs, the benefits have been worth it. The key is being intentional about when to break the rule and having clear criteria for exceptions.

## Future Plans: A Shareable Package

I'm considering creating a shareable npm package similar to [knip](https://knip.dev/) (which I also use for dead code detection). This would make it easier to:
- Take this tooling to other projects
- Share configurations across teams
- Integrate with different build systems
- Provide community-driven best practices

The goal would be making the 200-line rule as easy to adopt as running `npx create-next-app`.

## The Bigger Picture

What started as accommodating AI limitations has become a principle that improves human code comprehension too. When both humans and AI can easily understand your entire file at once, development becomes more predictable and maintainable.

---

*The 200-line rule isn't about arbitrary constraints—it's about creating code that both humans and AI can reason about effectively.*
