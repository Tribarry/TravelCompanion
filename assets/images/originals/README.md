# Source travel images

Put original JPG or PNG photographs in this directory, optionally grouped by country/destination. On pushes to `main`, GitHub Actions automatically creates responsive WebP variants at 480, 800, 1200 and 1600 px (without enlarging smaller originals) under `assets/images/generated/`.

Example:

`assets/images/originals/vietnam/ho-chi-minh-city.jpg`

becomes:

- `assets/images/generated/vietnam/ho-chi-minh-city-480.webp`
- `assets/images/generated/vietnam/ho-chi-minh-city-800.webp`
- `assets/images/generated/vietnam/ho-chi-minh-city-1200.webp`
- `assets/images/generated/vietnam/ho-chi-minh-city-1600.webp`

Use the generated variants in the site; keep originals out of page markup.
