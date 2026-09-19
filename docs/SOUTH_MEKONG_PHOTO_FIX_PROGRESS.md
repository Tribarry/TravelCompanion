# South & Mekong photo fix progress

Updated: 2026-09-19 (batch 2 complete)

## Fixed on main

| Path | Fix |
|------|-----|
| `cai-be/01-floating-market.jpg` | Restored real fruit-boat market (Commons CC BY 2.0 McKay Savage) |
| `destinations/sa-dec.jpg` | Elevated flower nurseries (from local `sa-dec/01`) |
| `destinations/cai-be.jpg` | Church on the Tiền (from local `cai-be/10`) |
| `destinations/chau-doc.jpg` | Bà Chúa Xứ temple (Commons) |
| `can-tho/01-cai-rang.jpg` | Real Cái Răng floating market (Commons) |
| `bac-lieu/04-xiem-can.jpg` | Xiêm Cán pagoda (Commons CC BY-SA, no Vietnamnet watermark) |
| `tra-su/05-dry-season.jpg` | Interim: boardwalk frame (less flooded look) until verified dry-season shot |

## Still open (priority)

1. **Watermarked / weak subject**
   - `cai-be/08-cooking.jpg` — LinsFood watermark → need clean Mekong home-cooking shot
   - `tinh-bien/06-chua-ta-pa.jpg` — low-res crop → higher-res Tà Pạ pagoda
   - `hcmc/can-gio.jpg` — generic mangrove → verified Cần Giờ
2. **True dry-season Trà Sư** (current is interim boardwalk)
3. **Missing destination banks** (local folders required, no remote lag / no PHOTO TO VERIFY)
   - Hà Tiên, Kiên Lương, Rạch Giá, Nam Du, Phú Quốc, Côn Đảo, Bến Tre, Trà Vinh, Vĩnh Long
4. **License pass** on all newly added Commons files (credit in image-sources.json)
5. **Compress remaining oversize** (workflow `compress-south-mekong-oversize.yml`)

## Policy
Nothing may remain PHOTO TO VERIFY. All experience cards need local images.

## Workflows used
- `.github/workflows/restore-cai-be-floating.yml`
- `.github/workflows/restore-south-mekong-batch2.yml`
- `.github/workflows/compress-south-mekong-oversize.yml`
