# Later-version features — parked during V0.21

These are deliberately recorded but must not interrupt the Vietnam V0.21 content foundation.

## Language selector + per-card translation
- Global app language selector, starting with English and Vietnamese.
- Remember selected language across pages/sessions.
- Keep Vietnamese place names unchanged where appropriate.
- Destination intros, experience descriptions, history snippets, food/drink cards, proposed schedules, warnings and UI copy can switch language.
- Per-card `EN | VI` quick translation so the traveller can show a local person the Vietnamese version without changing the entire app.
- Expand by country later (Khmer, Lao, Thai, etc.).

## Swipe / Tinder-style experience passport
- Parked experience-curation mode for fast Keep / Skip / Save decisions.
- Must not replace the normal destination experience bank or My List.
- Revisit after V0.21 content and core scheduling are stable.

## Reel Pins / creator inspiration
Tracked alongside the existing creator-video concept.
- Add a `🎬 Reel Inspiration` layer to each destination and landmark.
- Let the traveller save an Instagram Reel URL against a destination, experience or landmark.
- Preferred iPhone workflow: Instagram Share Sheet → iOS Shortcut (`Save to Travel Companion`) → Travel Companion save screen.
- Also support manual `Paste Instagram Reel` inside the app.
- On save, suggest the most likely destination / landmark and associated coordinates; traveller confirms before saving.
- Store source platform, URL, optional note, destination, landmark, latitude/longitude and date saved.
- Surface saved Reel counts on city hero pages and experience cards, e.g. `🎬 4 saved Reels`.
- Show Reel pins on the destination map; tapping a pin opens the saved Reel / inspiration detail.
- Preserve the exact Reel that motivated the save rather than relying on the traveller to remember it later.
- Do not depend on scraping or claiming a definitive `highest viewed Reel` ranking, because Instagram does not expose a reliable public ranking endpoint for arbitrary landmarks.
- Optional later discovery layer: curated public creator videos for major landmarks, clearly separated from the traveller's own saved Reel Pins.
- Keep creator claims separate from verified factual, visa, transport and safety information.

## Influencer / creator video links
Tracked in GitHub issue #4.
- Attach Instagram, TikTok, YouTube/Shorts or other useful creator videos to an experience.
- Show under an optional `WATCH` / `SEE IT` section.
- Store source/platform/link/note/date checked.
- Keep creator claims separate from verified factual, visa, transport and safety information.

## Book Ahead / Calendar integration
Tracked in GitHub issue #3.
- Central checklist of flagged experiences.
- Google Calendar reminder 28 days before known activity dates with notifications.
- Update reminders when activity dates move; do not duplicate.