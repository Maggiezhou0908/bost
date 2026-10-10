# Boost

Boost is an AI-powered e-commerce operation platform. It helps merchants create high-quality product images and copy in seconds — remove backgrounds, generate product scenes, and write platform-ready product titles without a studio or a copywriter.

## Features

- **Background Remover** — Upload a product photo and get a clean cutout. Powered by a [comfy.icu](https://comfy.icu) workflow running the BRIA RMBG model.
- **Image Generation** — Turn a cutout into a professional product scene. A comfy.icu workflow (GroundingDINO + SAM segmentation, ControlNet Canny, SDXL img2img/inpaint) generates multiple scene variations from two prompts: what to select and how the scene should look.
- **Title Generation** — Generate 10 product titles from your product category, name, advantages, keywords, tone and language. Tuned for Amazon, Shopify, Alibaba, Temu, Shopee, AliExpress and Lazada. Powered by Moonshot AI (`moonshot-v1-8k`).
- **History** — All background removals, generated images and generated titles are kept locally, with preview, download, delete, and a shortcut from a cutout straight into image generation.
- **Marketing site** — A landing page (`/`) and an about page (`/about`).

Title Optimization, Product Description and Image Copywriting are placeholders in the UI ("coming soon").

## Tech Stack

- [Next.js 14](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) + [Headless UI](https://headlessui.com)
- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) — image storage
- [comfy.icu](https://comfy.icu) — ComfyUI cloud workflows for image processing
- [Moonshot AI](https://platform.moonshot.cn) — LLM for title generation (via the OpenAI SDK)
- [localforage](https://localforage.github.io/localForage/) — IndexedDB-backed local cache and history

## Getting Started

### Prerequisites

- Node.js v20+
- pnpm v9+
- Vercel CLI v35+

### Setup

```shell
pnpm install

# install the Vercel CLI if you don't have it
npm i -g vercel

# pull environment variables from Vercel (or create .env.local manually)
vercel env --pull

# start the dev server
vercel dev
```

You can also run `pnpm dev` if the environment variables are already available in `.env.local`.

### Environment Variables

| Variable | Description |
| --- | --- |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token used by `/api/upload` |
| `COMFY_ICU_API_KEY` | API key for the comfy.icu workflows |
| `MOONSHOT_API_KEY` | API key for Moonshot AI title generation |

See `.env.example` for the template.

### Deploy

```shell
vercel --prod
```

## How It Works

1. **Upload** — The browser uploads an image to `POST /api/upload` (edge runtime), which stores it in Vercel Blob and returns a public URL. Uploads are cached in IndexedDB keyed by the file's MD5 hash, so the same file is never uploaded twice.
2. **Image workflows** — The client calls `POST /api/comfy` with a workflow ID, a workflow prompt graph and the uploaded file URL. The API route proxies the request to comfy.icu so the API key stays server-side. The client then polls `GET /api/comfy?workflow_id=...&run_id=...` every 10 seconds until the run completes or errors.
3. **Caching** — Completed results are cached in IndexedDB: background removals keyed by file MD5, generated images keyed by file MD5 + prompt MD5. Re-running the same input returns the cached result instantly.
4. **Title generation** — The form submits to `POST /api/moonshot`, which prompts `moonshot-v1-8k` to produce 10 titles for the selected platform, tone and language.

All history lives in the browser (IndexedDB via localforage) — there is no server-side database, and history is per-browser.

## API Routes

| Route | Method | Description |
| --- | --- | --- |
| `/api/upload` | `POST` | Upload an image to Vercel Blob (body is the raw file, content type passed via header) |
| `/api/comfy` | `POST` | Create a comfy.icu workflow run (`workflow_id`, `prompt`, `files`) |
| `/api/comfy` | `GET` | Get a run's status (`workflow_id`, `run_id` query params) |
| `/api/moonshot` | `POST` | Chat completion for product title generation |

## Project Structure

```
app/
  page.tsx              # marketing landing page
  home/                 # dashboard
  backgroundRemover/    # background removal tool
  imageGeneration/      # AI product scene generation
  titleGeneration/      # AI product title generator
  history/              # local generation history
  about/                # about page
  api/
    upload/             # Vercel Blob upload
    comfy/              # comfy.icu workflow proxy
    moonshot/           # title generation chat completion
components/
  image/uploader.tsx    # drag-and-drop image uploader
  base/                 # preview dialogs and empty states
  text/CascadDropdown   # product category selector
  Navbar / Sidebar / PageWarp
utils/
  localDB.ts            # localforage wrapper (upload / remove / image / title stores)
  getUUID.ts            # UUID helper
public/                 # static assets
```
