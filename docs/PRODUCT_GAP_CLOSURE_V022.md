# V0.22 — Close the Travel Companion Gaps

## Product promise
**Open the app anywhere on your trip and know what is worth experiencing next.**

Every feature must support the loop: **Discover → Decide → Experience → Remember**.

## Priority 1 — What Should I Do Now?
Make this the primary action on every destination hub once the Vietnam content foundation is complete.

The recommendation engine must rank experiences using:
1. current destination and, when permission is granted, GPS proximity;
2. current local time and whether the experience is sensible now;
3. weather suitability;
4. saved vs completed/skipped state;
5. Must Do / unique priority;
6. time required and time remaining in the day;
7. advance-booking requirement;
8. user's learned travel-style profile;
9. geographic efficiency so recommendations cluster sensibly rather than zig-zagging across a city.

The UI should explain *why* something is recommended: e.g. `850 m away · good before sunset · you saved this · indoor/rain-safe`.

Never recommend a completed/skipped item as the primary next action unless the user explicitly asks to repeat it.

## Priority 2 — Location awareness
- Ask for browser geolocation only after the user opts in.
- Resolve GPS to the nearest supported destination/experience cluster.
- Preserve manual `You are here` selection as fallback/override.
- Do not continuously share/store precise coordinates by default.
- `Near Me` sorts useful experiences by distance.

## Priority 3 — Weather-aware decisions
Weather should modify recommendations, not merely display a forecast.
Examples:
- heavy rain → prioritise museums, markets, workshops, cafés and other rain-safe options;
- clear morning → viewpoints, cycling, trekking and outdoor markets;
- extreme heat → indoor/shaded midday activities and outdoor experiences earlier/later;
- unsafe/severe conditions → suppress unsuitable outdoor recommendations.

Weather data must be current when used for a recommendation and its freshness should be visible.

## Priority 4 — Personal travel-style onboarding + learning
The product must work for Tristan's existing profile now, but be generalisable for future users.

Initial onboarding preferences:
- food & drink
- local life
- culture/history
- adventure/nature
- hidden/unique
- nightlife/social
- photography/content
- pace: slow / balanced / packed
- budget
- transport comfort
- solo/group

Then learn from saves, skips, completions and category usage. Allow preferences to be edited/reset. Recommendations must remain explainable and should not trap users in a narrow filter bubble.

## Priority 5 — Complete Vietnam foundation
Before claiming V0.22 complete, implement the V0.21 issue across the full master Vietnam route:
- destination-first hub for every deliberate master-itinerary stop;
- curated Must Do / Unique / Local Life / Nature-Adventure / Food & Drink / sensible Day Trips;
- master-itinerary experiences preserved;
- researched unique additions, no filler quotas;
- destination-specific Food Passport; Coffee/Drink Passport where meaningful;
- specific imagery only;
- Save / Done / Tried / progress persistence;
- explicit geographic `Go Next` metadata, transport/time and skip handling;
- advance-booking flags.

## Destination hub target
The default destination hub should prioritise:
1. **What should I do now?** — one strong contextual recommendation + alternatives;
2. Explore Experiences;
3. Must Do / Food & Drink / Day Trips / Hidden Gems;
4. Trip Progress;
5. Don't Miss;
6. My Journey / Passports;
7. Go Next.

## Experience-detail minimum data
Every experience needs, where applicable:
- specific photo;
- concise `why it is worth it`;
- location/map point;
- indicative AUD + local-currency cost;
- duration;
- best time/day;
- opening constraints;
- booking requirement/lead time;
- weather suitability;
- solo suitability;
- transport/access note;
- Save / Done;
- content opportunity only when genuinely useful.

## Journey memory
`My Journey` should accumulate:
- destinations visited;
- experiences completed;
- foods/drinks tried;
- passport completion;
- saved vs completed history;
- optional user photos later.

It should feel like a travel record, not a task manager.

## Definition of done
V0.22 is **not complete** merely because pages render. Test this question at multiple very different Vietnam stops:

> Can a solo traveller open the app here, understand what is genuinely special, choose a sensible thing to do now, see what they should not miss, track what they have experienced, and understand the logical next leg without consulting a separate notes document?

Test at minimum: HCMC, Cái Bè, Đà Lạt, Hội An, Huế, Phong Nha, Hà Nội, Cao Bằng, Hà Giang and Y Tý.
