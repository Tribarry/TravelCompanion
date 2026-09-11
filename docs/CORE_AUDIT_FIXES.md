# Core Audit Fixes

- Browser title corrected to **Asia 2027**.
- Main Journey and global Journey now use chronological country order: Vietnam → Laos → Thailand → Kazakhstan → Kyrgyzstan → Cambodia.
- Country date labels reflect the June/July training and Central Asia sequence, with Cambodia resuming from 14 August.
- Current location gains a stable destination slug while preserving legacy `state.here` compatibility.
- Experience Saved/Done/Skip/ratings now write a stable destination + experience key while still reading/writing legacy keys for migration safety.
- All countries now have meaningful route chapters instead of one generic `Your route` bucket.
- Book Ahead now has persistent Not started → Enquired → Booked → Paid → Confirmed states.
- Experience qualitative costs are normalised to labelled AUD estimates where possible.
- Dark-theme active/progress states have stronger terracotta contrast.
