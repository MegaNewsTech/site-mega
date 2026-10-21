// Static build for the Apache host (meganews.com.br).
// Runs `next build` with STATIC_EXPORT=1 and then copies each nested RSC
// segment file (`route/__next.route/__PAGE__.txt`) to the flat name the
// client router requests (`route/__next.route.__PAGE__.txt`), which Vercel
// resolves on its own but a plain static server does not.
import { spawnSync } from 'node:child_process'
import { copyFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const OUT_DIR = 'out-build'

const build = spawnSync('npx', ['next', 'build'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, STATIC_EXPORT: '1' },
})
if (build.status !== 0) process.exit(build.status ?? 1)

// Copies every file under `segmentDir` (any depth) next to it with the path
// joined by dots: `__next.produtos/$d$slug/__PAGE__.txt` → `__next.produtos.$d$slug.__PAGE__.txt`.
function copyFlat(segmentDir, prefix, targetDir) {
  for (const name of readdirSync(segmentDir)) {
    const full = join(segmentDir, name)
    const flatName = `${prefix}.${name}`
    if (statSync(full).isDirectory()) {
      copyFlat(full, flatName, targetDir)
    } else {
      const flat = join(targetDir, flatName)
      copyFileSync(full, flat)
      console.log(`flattened ${flat}`)
    }
  }
}

function flattenSegments(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (!statSync(full).isDirectory()) continue
    if (name.startsWith('__next.')) {
      copyFlat(full, name, dir)
    } else {
      flattenSegments(full)
    }
  }
}

flattenSegments(OUT_DIR)
