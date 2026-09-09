# V0.21 — Vietnam master-itinerary content rebuild

This is the content contract for the next generated app build.

## Canonical source of truth
Preserve every destination and deliberate experience in Tristan's Vietnam master itinerary. Do not replace the route with a generic tourism list.

The detailed locked state from the destination-by-destination research pass is now stored in:

**`docs/VIETNAM_LOCKED_EXPERIENCE_BANK_2027.md`**

That file is canonical for currently locked experiences, Food/Drink Passport items, MUST DO additions, Book Ahead flags, Date Watch items, access/safety flags and later-version feature notes.

`LOCKED` means **saved to the experience bank**, not automatically compulsory in the final day-by-day itinerary. Duration optimisation happens after the bank is complete.

## Product promise
**Open the app anywhere on the trip and know what is worth experiencing next.**

Journey model:

**Discover → Decide → Experience → Remember → Share**

## Destination module standard
Every Vietnam destination hub must support:
- photographic hero
- short historical/context intro
- `COME FOR`
- `DO DIFFERENTLY`
- `EAT`
- `WTF / UNIQUE`
- `PACE`
- Must Do
- Food & Drink
- Day Trips only when geographically sensible
- Hidden Gems / Unique
- Proposed Schedule
- Trip Progress
- Don't Miss
- My Journey
- Go Next
- Map / My List
- Save + Completed state

### Historical/context copy rule
Every region and destination gets a compact context paragraph explaining **how/when the place developed, what shaped it and why it matters today**. Avoid long essays and generic tourism copy.

Every experience card gets **1–3 sentences of useful context** covering whichever of these makes it meaningful: history, date, people, cultural significance, unusual fact, local story or what actually happens there.

Example style:

> **Bình Thủy Ancient House**  
> Built in **1870**, associated with the Dương family, combining French and Chinese/Vietnamese elements. It was also used as a filming location for *The Lover*, creating a narrative continuation from Sa Đéc.

## Experience record standard
Every experience record should support:
- title
- specific image query/image
- concise contextual description
- category/tags
- priority (`MUST DO`, `HIGH`, `WANT`, `OPTIONAL`, `EXPEDITION` where later scoring is needed)
- indicative cost
- best time
- duration
- solo suitability
- booking requirement
- operational/access verification flags
- map location where available
- Save / Done state

## Image relevance rule
Every destination, attraction, dish, activity, day trip and hidden gem must use imagery depicting that **specific place/dish/activity** or a genuinely representative scene.

Never use unrelated Vietnam scenery as filler. If a suitable verified image cannot be resolved, show a designed **`PHOTO TO VERIFY`** fallback naming the experience.

## Passport standard
Every destination gets a Food Passport sized to its genuine local food culture, not an arbitrary count. Add a Coffee/Drink Passport wherever there are enough locally meaningful drinks.

Passports are **cumulative across the trip**:
- `NEW HERE`
- `ALREADY TRIED`
- `STILL MISSING`

Do not pretend repeated dishes such as cơm lam or rượu cần are new every time; use regional comparison cards where that is more meaningful.

Food/drink cards should support:
- representative image
- Vietnamese name
- English explanation
- short context
- indicative price
- Save
- Tried
- persistent progress

Saved food/drinks feed My List.

## Proposed schedule model
Destination pages should offer an editable proposed schedule rather than a rigid itinerary:

**1 DAY | 2 DAYS | 3 DAYS | BUILD MY OWN**

Experience blocks support:
- Keep
- Swap
- Move
- Remove

V0.22 can later adapt the proposed schedule based on weather, time of day, completed experiences and operating status.

Hierarchy:

**Destination → Experiences → My Picks → Proposed Schedule → Do Now**

## Route rule
Geography beats spreadsheet row order. Preserve every locked destination but avoid unnecessary double-backs.

The route contains multiple narrative/geographic chapters rather than one naïve linear list, including:
- Southern/Mekong loop
- Gulf islands / southeast coast
- Central Highlands
- Western Hồ Chí Minh Road / Trường Sơn
- Central coast
- Phong Nha/caves
- northern karst/mountain route

The next planning phase is **duration optimisation**, not deletion of the experience bank.

## Research principles
Prioritise official/local tourism, heritage, conservation and reputable operator sources for factual details. Add distinctive experiences when they materially improve the destination and fit the trip: local life, food, culture, nature, unusual/WTF experiences, slow travel and solo suitability.

Do not pad destinations to a fixed top-10 count. If a destination genuinely has 20–60 worthwhile bank items, keep them.

## BOOK AHEAD / DATE WATCH
A global Book Ahead checklist is tracked in GitHub issue #3.

The app should collect every `BOOK AHEAD` experience into a central checklist with states:

**Not started → Enquired → Booked → Paid → Confirmed**

When an activity date is known, offer to create a Google Calendar reminder/event **28 days before** with notifications. If the activity date changes, update the reminder rather than duplicate it.

Current high-priority examples include:
- Đà Lạt canyoning
- Bidoup 2D/1N trek
- Yok Đôn ethical elephant experience
- **Buôn Ma Thuột Coffee Festival 2027 — MUST DO; DATE WATCH until official dates, then BOOK AHEAD**
- Nha Trang Open Water scuba certification — **MUST DO / BOOK AHEAD / allow 3 days**
- Sơn Đoòng
- Hang Én
- Pygmy/Hung Thoong
- Hạ Long/Lan Hạ overnight boat
- Hà Giang Easy Rider
- selected community homestays, specialist guides, craft sessions and remote excursions where advance arrangement is required

## Safety / legality / access flags
Support explicit flags including:
- `ACCESS CHECK`
- `TIDE CHECK`
- `WEATHER CHECK`
- `SEA CONDITIONS`
- `TRAIL STATUS`
- `SEASON CHECK`
- `BORDER AREA`
- `REMOTE ROAD`
- `UXO`

Former battlefield and border-area content must never encourage off-trail exploration, ordnance handling or unverified border access.

Intercity travel defaults to bus/train/ferry/flight/private transfer unless a specific self-riding plan is confirmed lawful, insured and practical. Northern Vietnam on a 50cc remains off the plan.

## Later-version features — parked
Do not interrupt V0.21 content work to implement these:
- global language selector + per-card quick translation; start English/Vietnamese, later expand by country
- Tinder/swipe-style experience passport/curator
- influencer/creator video links on experience cards (`WATCH` / `SEE IT`), tracked separately in GitHub issue #4
- public Journey/social features remain parked until Vietnam V0.21 content foundation is complete

## Next phase
The Vietnam experience bank is now broad enough. The next major planning task is:

### **OPTIMISE VIETNAM**
Score and prioritise the locked bank into a realistic route while preserving:
- MUST DO items
- Buôn Ma Thuột Coffee Festival
- Nha Trang scuba certification
- major cave expeditions
- distinctive WTF/local experiences
- slow-travel recovery time
- visa/time constraints
- onward Laos/Cambodia/Thailand/Central Asia commitments

Do not delete lower-priority locked experiences during optimisation; move them to optional/backup layers instead.