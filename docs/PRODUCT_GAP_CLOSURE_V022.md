# V0.22 — Close the Travel Companion Gaps

## Product promise
**Open the app anywhere on your trip and know what is worth experiencing next.**

Every feature must support: **Discover → Decide → Experience → Remember → Share**.

## Priority 1 — What Should I Do Now?
Primary action on every destination hub. Rank by current destination/GPS, local time, current weather, saved/completed/skipped state, Must Do/unique priority, duration, booking constraints, learned preferences and geographic efficiency. Explain the ranking in plain language. Never make completed/skipped items the primary next action unless repeat is requested.

## Priority 2 — Location awareness
Opt-in browser geolocation; resolve to supported destination/experience cluster; manual location remains an override. `Near Me` sorts by distance. Precise coordinates are private by default.

## Priority 3 — Weather-aware decisions
Weather modifies recommendations: rain prioritises rain-safe options; clear mornings favour outdoor experiences; heat shifts outdoor activities earlier/later; unsafe conditions suppress unsuitable activities. Show freshness of weather used.

## Priority 4 — Personal travel style
Onboarding/preferences: food & drink, local life, culture/history, adventure/nature, hidden/unique, nightlife/social, photography/content, pace, budget, transport comfort, solo/group. Learn from saves/skips/completions while remaining editable and explainable.

## Priority 5 — Complete Vietnam foundation
Implement the V0.21 content model across every deliberate master-itinerary stop: curated experiences, master itinerary preservation, researched unique additions, Food Passports, Coffee/Drink Passports where justified, specific imagery, Save/Done/Tried persistence, geographic Go Next with transport/time, and advance-booking flags.

## Priority 6 — Follow My Journey
A public journey view now exists at `journey.html` with its public state in `journey-data.json`.

### Public view
- current **city/region only**, never exact GPS;
- route so far and current chapter;
- destinations/experiences completed;
- food + drink passport progress;
- latest completed experiences;
- logical next destination;
- native share/copy-link action.

### Privacy model
Three distinct levels are required:
1. **Public:** city/region only, preferably manually published or delayed 12–24 hours while travelling; no accommodation, precise GPS or exact live movement.
2. **Friends/family:** private authenticated/link-based view in a later backend phase, optionally more current but still no accommodation disclosure by default.
3. **Private:** exact device GPS may power Near Me and recommendations locally; it is never automatically promoted to public data.

### Sync architecture
The current app is GitHub Pages/static and its completion state lives in browser localStorage, so one traveller's device cannot securely publish to every viewer by itself. `journey-data.json` is therefore the privacy-safe public data boundary for the first release. The next backend milestone should sync approved public events from private state rather than exposing raw localStorage/GPS.

## Destination hub target
1. What should I do now?
2. Explore Experiences
3. Must Do / Food & Drink / Day Trips / Hidden Gems
4. Trip Progress
5. Don't Miss
6. My Journey / Passports
7. Go Next
8. Share / Follow My Journey

## Experience-detail minimum data
Specific photo; why it is worth it; map point; indicative AUD + local-currency cost; duration; best time/day; opening constraints; booking requirement/lead time; weather suitability; solo suitability; access/transport; Save/Done; content opportunity only when useful.

## Journey memory
Accumulate destinations visited, experiences completed, foods/drinks tried, passport completion, saved/completed history and later optional user photos. It should feel like a travel record rather than a task manager.

## Definition of done
A page rendering is not completion. At HCMC, Cái Bè, Đà Lạt, Hội An, Huế, Phong Nha, Hà Nội, Cao Bằng, Hà Giang and Y Tý, a solo traveller must be able to understand what is special, choose a sensible thing to do now, see what not to miss, track experiences, understand the logical next leg, and share a privacy-safe record without consulting separate notes.
