Steps to download a Kaggle dataset and integrate images into the project

1) Choose a dataset
- Good candidates found:
  - Animals-10 (alessiocorrado99/animals10) — ~26K images, 10 categories
  - Oxford-IIIT Pet (various Kaggle mirrors) — labeled pet images (cats/dogs), helpful for domestic species
  - animals-10-enhanced — larger enhanced version
  - Animal-5 Mammal / other smaller mammal-specific sets

2) Install Kaggle CLI (if not installed)

On Windows (PowerShell):

```powershell
pip install kaggle
# place your kaggle.json API token at %USERPROFILE%\.kaggle\kaggle.json (create .kaggle folder)
# set permissions if needed
```

3) Download dataset (example)

```powershell
# Download Animals-10 to ./data/kaggle and unzip
kaggle datasets download -d alessiocorrado99/animals10 -p ./data/kaggle --unzip
# or Oxford IIIT Pet (mirror slug may vary):
kaggle datasets download -d abhinavwalia95/oxford-pets -p ./data/kaggle --unzip
```

4) Organize images for the handbook
- Create `public/images/mammals/` in the repo root.
- Decide a mapping from dataset folders/filenames to the `id` field used in `src/data/mammals.ts` (e.g. `brown-bear` → `brown-bear.jpg`).
- Copy or resize images into `public/images/mammals/<filename>`.

5) Provide a JSON mapping file `scripts/mapping.json` with format:

```json
{
  "brown-bear": "brown-bear-1.jpg",
  "gray-wolf": "wolf-001.jpg",
  "red-fox": "fox-12.jpg"
}
```

6) Run the helper script to update `src/data/mammals.ts` image paths

```powershell
node ./scripts/update_mammals_images.js ./scripts/mapping.json
```

Notes
- Kaggle requires an API token for programmatic downloads. I cannot download directly without your `kaggle.json` or granting access to run the commands on your machine.
- If you want, I can run the download here — provide the Kaggle API token or allow me to run the Kaggle CLI in your terminal.
- The helper script will back up the original `src/data/mammals.ts` before modifying it.
