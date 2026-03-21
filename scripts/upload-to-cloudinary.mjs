// One-time bulk upload: node scripts/upload-to-cloudinary.mjs
// Reads all files in public/illustrations/ and uploads to Cloudinary under
// skipper/illustrations/{name-without-ext}, skipping files already uploaded.

import { v2 as cloudinary } from 'cloudinary'
import { config } from 'dotenv'
import { readdirSync } from 'fs'
import { join, basename, extname, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

config({ path: join(__dirname, '../.env.local') })

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const illustrationsDir = join(__dirname, '../public/illustrations')
const files = readdirSync(illustrationsDir).filter(f => /\.(png|jpg|jpeg|webp|svg)$/i.test(f))

// Fetch all existing public IDs from Cloudinary up front
process.stdout.write('Fetching existing assets from Cloudinary...')
const existing = new Set()
let nextCursor = undefined
do {
  const res = await cloudinary.api.resources({
    type: 'upload',
    prefix: 'skipper/illustrations/',
    max_results: 500,
    next_cursor: nextCursor,
  })
  for (const r of res.resources) existing.add(r.public_id)
  nextCursor = res.next_cursor
} while (nextCursor)
console.log(` ${existing.size} found.\n`)

console.log(`Found ${files.length} local files...\n`)

let uploaded = 0
let skipped = 0

for (const file of files) {
  const name = basename(file, extname(file))
  const publicId = `skipper/illustrations/${name}`
  const filePath = join(illustrationsDir, file)

  if (existing.has(publicId)) {
    console.log(`- skipped   ${publicId}`)
    skipped++
    continue
  }

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      resource_type: 'image',
    })
    console.log(`✓ uploaded  ${publicId} (${result.bytes} bytes)`)
    uploaded++
  } catch (err) {
    console.error(`✗ failed    ${publicId}:`, err?.error?.message ?? err)
  }
}

console.log(`\nDone. ${uploaded} uploaded, ${skipped} skipped.`)
