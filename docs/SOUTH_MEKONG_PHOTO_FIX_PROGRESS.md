# South & Mekong photo fix progress

Updated: 2026-09-19 (batch 3 complete)

## Fixed on main

| Path | Fix |
|------|-----|
| `cai-be/01-floating-market.jpg` | Real fruit-boat market (Commons CC BY 2.0) |
| `cai-be/08-cooking.jpg` | Clean VN kitchen prep (Commons CC BY 2.0) — interim; not exact Cái Bè class |
| `destinations/sa-dec.jpg` | Elevated flower nurseries |
| `destinations/cai-be.jpg` | Church on the Tiền |
| `destinations/chau-doc.jpg` | Bà Chúa Xứ |
| `can-tho/01-cai-rang.jpg` | Real Cái Răng floating market |
| `bac-lieu/04-xiem-can.jpg` | Xiêm Cán pagoda (no watermark) |
| `tra-su/05-dry-season.jpg` | Commons Trà Sư forest (Dec 2010) |
| `ha-tien/01-phu-dung.jpg` + `destinations/ha-tien.jpg` | Phù Dung Cổ Tự (local bank started) |
| `phu-quoc/01-beach.jpg` + `destinations/phu-quoc.jpg` | Phú Quốc beach (local bank started) |
| `con-dao/01-beach.jpg` + `destinations/con-dao.jpg` | Côn Sơn beach (local bank started) |

## Still open

1. **Exact subjects still weak**
   - `cai-be/08-cooking.jpg` — replace interim Hanoi kitchen with real Mekong home-cooking class when licensed
   - `tinh-bien/06-chua-ta-pa.jpg` — higher-res Tà Pạ pagoda
   - `hcmc/can-gio.jpg` — verified Cần Giờ mangrove (not generic)
2. **Expand local banks** (need 6–12 experience shots each, all local)
   - Hà Tiên, Kiên Lương, Rạch Giá, Nam Du
   - Phú Quốc, Côn Đảo
   - Bến Tre, Trà Vinh, Vĩnh Long
3. **Wire new folders** into `vietnam-photo-alignment-v026.js` + manifest so cards resolve locally
4. **License pass** — append all Commons attributions to `image-sources.json`
5. **Compress** any remaining >350 KB locals

## Policy
Nothing may remain PHOTO TO VERIFY. All experience cards need local images to avoid lag.

## Workflows
- `restore-cai-be-floating.yml`
- `restore-south-mekong-batch2.yml`
- `restore-south-mekong-batch3.yml`
- `compress-south-mekong-oversize.yml`
