# Valo Adda — App Build Guideline

Purpose: give an AI (or a developer) everything needed to regenerate this exact
Expo app — same stack, same theme, same 5 screens, same component contracts —
without seeing the original conversation.

---

## 1. Stack and project setup

- **Framework:** Expo (SDK 57) + Expo Router (file-based routing), TypeScript, strict mode.
- **Styling:** NativeWind v4 (Tailwind for React Native) — all colors/spacing/fonts
  come from Tailwind theme tokens. **No hard-coded colors in component JSX.**
- **Fonts:** `@expo-google-fonts/chakra-petch` (display/headings/numbers) and
  `@expo-google-fonts/inter` (body text). Loaded once in the root layout with `useFonts`.
- **Icons:** `@expo/vector-icons` (Ionicons only — no custom icon assets, no logos).
- **Navigation:** `expo-router/unstable-native-tabs` (`NativeTabs`) for native
  iOS/Android, with a parallel `expo-router/ui` (`Tabs`/`TabList`/`TabTrigger`)
  implementation in a `.web.tsx` file for web — Expo Router auto-picks the right
  one per platform based on file extension.
- **State:** local `useState` only. No global store, no backend, no real auth.
  All data is inlined as plain constants in each screen file.

### Commands
```
npx create-expo-app my-expo-app --template
cd my-expo-app
npx expo install @expo-google-fonts/chakra-petch @expo-google-fonts/inter @expo/vector-icons
npx expo install nativewind tailwindcss react-native-safe-area-context
npx expo install expo-router expo-splash-screen expo-status-bar
```
Project uses `src/app` as the Expo Router root (set via `"main": "expo-router/entry"`
in `package.json` and `src/app` containing the router files — confirm `app.json`/
Metro config point there, e.g. via `expo-router/entry` resolving `src/app` when
`src` is the configured root).

---

## 2. Folder structure (final, minimal)

```
src/
  app/
    _layout.tsx       # root layout: fonts, theme provider, tab navigator
    index.tsx         # Home tab
    scrims.tsx         # Scrims tab
    lfg.tsx             # LFG tab
    team.tsx            # Team tab
    profile.tsx          # Profile tab
  components/
    app-tabs.tsx        # native tab bar (iOS/Android)
    app-tabs.web.tsx     # web tab bar
    header.tsx           # main screen header (title + chat/bell icons)
    card.tsx             # generic bordered panel
    button.tsx           # primary/ghost/text/destructive button
    chip.tsx              # filter/role/tag pill
    avatar.tsx            # initials-on-tinted-tile placeholder avatar
    rank-badge.tsx        # small rank pill
    fab.tsx                # floating "+" action button
    segmented-toggle.tsx   # 2-4 option segmented control
    bottom-sheet.tsx        # modal-based bottom sheet for filters
    empty-state.tsx          # centered icon + title + body for empty lists
  theme/
    colors.ts            # raw hex palette (for Ionicons `color` props etc.)
  global.css              # Tailwind directives
tailwind.config.js        # NativeWind theme tokens (mirrors theme/colors.ts)
```

Explicitly **do not** add: a `data/` folder (mock data lives inline per-screen),
a `constants/` folder, a `hooks/` folder, or any component not listed above
unless a new screen genuinely needs it. Keep the file count minimal — inline
small one-off presentational bits (list rows, status pills) directly inside the
screen that uses them instead of extracting a component for a single use site.

---

## 3. Theme tokens

Define identical values in **both** `src/theme/colors.ts` (raw hex, for props
like `Ionicons color=`) and `tailwind.config.js` under `theme.extend.colors.valo`
(for `className="text-valo-..."` etc). Keep them in sync — this is the single
most important rule for consistency.

Valorant-style dark theme (black/grey base, red accent):

| Token | Hex | Usage |
|---|---|---|
| `bg` | `#0F1923` | Screen background |
| `deep` | `#0A0E13` | Splash screen / deepest background |
| `panel` | `#161F2B` | Cards, inputs, tab bar background |
| `raised` | `#1E2A38` | Slightly raised surfaces |
| `line` | `#2B3744` | Borders/dividers |
| `text` | `#ECE8E1` | Primary text (cream, not pure white) |
| `white` | `#FFFFFF` | Text on solid color backgrounds (buttons, badges) |
| `muted` | `#8B97A3` | Secondary text, inactive icons |
| `dim` | `#5C6773` | Tertiary/least-important text |
| `ink` | `#0F1923` | Reserved for text on light backgrounds (rarely used now) |
| `accent` | `#FF4655` | Valorant red — primary buttons, FAB, selected tab, badges, borders |
| `danger` | `#C9344D` | Destructive actions only (Cancel/Decline/Log out), action-needed left-border |
| `violet` | `#7C5CFF` | Reserved accent, currently unused by the 5 screens |

Font families (Tailwind `fontFamily` keys):
- `display` → `ChakraPetch_700Bold` (titles, big numbers)
- `display-semibold` → `ChakraPetch_600SemiBold` (section labels, badges)
- `display-medium` → `ChakraPetch_500Medium`
- `body` → `Inter_400Regular` (paragraph text)
- `body-medium` → `Inter_500Medium`
- `body-semibold` → `Inter_600SemiBold`
- `body-bold` → `Inter_700Bold`

### Contrast rule (important, caused real bugs)
`accent` is a saturated red — **always pair it with white text/icons**, never
with `ink`/dark text, when it's used as a solid background (primary buttons,
FAB, selected segmented-toggle tab). `ink`/dark text is only safe on light or
transparent-tinted backgrounds (e.g. `bg-valo-accent/10`).

### tailwind.config.js skeleton
```js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: { valo: { /* same keys as colors.ts, lowercase */ } },
      fontFamily: { /* as above */ },
    },
  },
  plugins: [],
};
```

---

## 4. Navigation

Exactly **5 bottom tabs**, no more: **Home | Scrims | LFG | Team | Profile**.
No separate Chat or Settings tab — those are out of scope for this build.

- `app-tabs.tsx` (native): use `NativeTabs` from `expo-router/unstable-native-tabs`.
  Set `backgroundColor={colors.panel}`, `tintColor={colors.accent}`,
  `indicatorColor={colors.accent}`, and per-tab `labelStyle` selected/default
  colors. Each `NativeTabs.Trigger` needs a `name` matching the route file,
  a `Label`, and an `Icon` with both `sf` (SF Symbols, iOS) and `md` (Material
  icon name, Android) variants.
- `app-tabs.web.tsx` (web only — same filename + `.web.tsx` so Expo Router picks
  it automatically on web): use `Tabs`/`TabSlot`/`TabList`/`TabTrigger` from
  `expo-router/ui`. Render a custom `TabButton` using `Ionicons` + `Text`,
  styled with the same `valo-accent`/`valo-muted` tokens so native and web look
  the same.

Root layout (`_layout.tsx`) only does three things: load both font families with
`useFonts`, hide the splash screen once loaded, and wrap `<AppTabs />` in
`<ThemeProvider value={DarkTheme}>` with `<StatusBar style="light" />`. No modals,
no providers, no global state wiring.

---

## 5. Shared component contracts

Keep every component this small and this generic — no screen-specific logic
inside shared components.

**Header** — `{ title: string; unreadCount?: number }`. Renders a 64px-min-height
row: uppercase title left (`font-display text-xl tracking-[2px]`), a chat icon
and a bell icon (with an optional unread-count badge in `danger`) right. No
navigation wired — purely presentational for this build.

**Button** — `{ title: string; variant?: 'primary'|'ghost'|'text'|'destructive'; small?: boolean } & PressableProps`.
- `primary`: solid `accent` background, `accent` border, white text, soft colored shadow.
- `ghost`: `panel` background, `line` border, `text`-colored text.
- `text`: no background/border, `danger`-colored text, min 44×44 hit target.
- `destructive`: solid `danger` background/border, white text.
- Title is always rendered uppercase.

**Card** — `{ children; className?: string; featured?: boolean }`. `line` border,
`panel` background, `rounded-lg`, `p-4`. `featured` adds a stronger `accent/60`
border for highlighted cards (e.g. "Next match").

**Chip** — `{ label: string; selected?: boolean; onPress?: () => void; destructive?: boolean }`.
Pill shape (`rounded-full`), 36px min height. Selected = `accent` border/tint +
`accent` text. Destructive = `danger` border/tint + `danger` text. Default =
`line` border + `muted` text.

**Avatar** — `{ initials: string; size?: 'small'|'medium'|'large'; label?: string }`.
Square-ish tinted tile (`rounded-lg`, `accent/10` background, `accent/40` border),
shows up to 3 uppercase initial characters in `accent` text. This is the **only**
placeholder for pictures/logos anywhere in the app — never use empty boxes or
real images.

**RankBadge** — `{ rank: string }`. Small uppercase pill, `accent` border/tint/text.

**FAB** — `{ label?: string; onPress?: () => void }`. 56×56 circle, `absolute
bottom-6 right-5`, solid `accent` background, white "+" icon (Ionicons `add`,
size 28). Used only on list screens that need a primary create action (Scrims, LFG).

**SegmentedToggle** — `{ options: string[]; value: string; onChange: (v: string) => void; accessibilityLabel?: string }`.
2-4 option pill group inside a `panel` background with 1px padding. Selected
option gets solid `accent` background + white text; others `muted` text,
transparent background. `accessibilityRole="tablist"` on the wrapper,
`"tab"` + `accessibilityState={{ selected }}` on each option.

**BottomSheet** — `{ visible: boolean; title: string; onClose: () => void; children }`.
`Modal` with `animationType="slide" transparent`, a `black/60` backdrop
Pressable that closes on tap, and a `panel` sheet sliding from the bottom with
a title row (close "X" icon) and a scrollable body capped at `max-h-[70%]`.
Wrap sheet content in `SafeAreaView edges={['bottom']}`.

**EmptyState** — `{ title: string; body: string }`. Centered icon-in-circle
(`checkmark-circle-outline`, `accent`/`red` tinted), bold title, muted body text.
Used for every empty list (no scrims, no players, no team, etc).

---

## 6. Screen-by-screen spec

Each screen file: `View.flex-1.bg-valo-bg` → `SafeAreaView edges={['top']}` →
screen content. Mock data is declared as plain `const`/`interface` at the top of
the file, directly above the component — not imported from elsewhere.

### 6.1 Home (`index.tsx`)
Structure, top to bottom:
1. `<Header title="Valo Adda" unreadCount={user.unread} />`
2. Scrollable body (`ScrollView` with `gap-6 p-4 pb-12`):
   - **Profile box**: `Card` with `Avatar`, Riot ID + team name, `RankBadge`.
   - **Quick actions**: two `Button`s side by side — "Post scrim" (primary),
     "LFG" (ghost, navigates to `/lfg`).
   - **Action needed** section: list of dismissible cards (`danger` left border,
     title/detail/time, Decline + Accept buttons that remove the item from
     local state). Falls back to `EmptyState` when empty.
   - **Next match** section: a `featured` `Card` showing "YOU vs OPPONENT" with
     ratings, date, maps, server.
   - **My team** section: team name, win rate, rating pill, and a 5-pip W/L
     strip (win = `text` tint, loss = `danger` tint). Falls back to `EmptyState`
     ("not on a team yet") when `hasTeam` is false.
   - **Recent matches** section: simple row list with opponent, map/score, and
     a `+N` rating delta in `accent`.
   - Riot/Valorant fan-project disclaimer text, centered, `dim` color, at the
     very bottom.
3. A local `Section({ title, onArrowPress, children })` helper renders each
   section's uppercase title + a right-aligned forward-arrow icon button.

### 6.2 Scrims (`scrims.tsx`)
1. `<Header title="Scrims" />`
2. Search bar (icon + `TextInput`) + a filter icon button that opens a `BottomSheet`.
3. `SegmentedToggle` with options `Open | My requests | Confirmed`.
4. `FlatList` of scrim cards: `Avatar` (team tag initials) + team name/rank/date/
   format/region + a status pill (`OPEN`/`REQUESTED`/`CONFIRMED`) + a `Button`
   ("Request", disabled+ghost once requested). Tapping Request flips local state
   so the card re-renders as requested.
5. `EmptyState` when the active list is empty.
6. `FAB label="Post scrim"` bottom-right.
7. `BottomSheet` filter contents: four chip groups — Rank range, Map, Time,
   Region/server — each just a `flex-row flex-wrap` of `Chip`s (non-functional
   selection is fine; this is UI only).

### 6.3 LFG (`lfg.tsx`)
1. `<Header title="LFG" />`
2. `SegmentedToggle` with options `Players | Teams`.
3. Horizontal scroll of filter `Chip`s (roles, ranks, time-of-day) — decorative,
   not wired to filtering logic.
4. If `Players`: `FlatList` of player cards (`Avatar`, Riot ID, `RankBadge` +
   role, top agents + availability, "Invite"/"Invited" `Button`).
5. If `Teams`: `FlatList` of team recruiting cards (`Avatar` with team tag,
   team name, avg rank + players needed + roles needed, region, "Request to
   join" `Button`).
6. `EmptyState` per list when empty.
7. `FAB label="Post LFG"`.

### 6.4 Team (`team.tsx`)
Two states gated by a local `hasTeam` boolean (default `true`):
- **No team**: `EmptyState` + "Create team" (primary) + "Find a team in LFG"
  (text) buttons, vertically centered.
- **Has team**: 
  1. `<Header title="Team" />`
  2. Team header `Card`: `Avatar` (large, team tag), team name + `[TAG]`,
     "Edit" button (captain only), rating pill, player count, "Post scrim" +
     "Manage" buttons (Manage is captain-only).
  3. **Roster** `Card`: one row per player (Riot ID + captain star icon + role
     + `RankBadge`), followed by dashed-border "Invite player" rows for any
     open slots up to 5 total.
  4. **Upcoming scrims** section: simple `Card` rows, opponent + date/format +
     chevron.
  5. **Team stats** `Card`: three-column matches/win rate/avg round diff.
- A local `IS_CAPTAIN` constant (`true`) gates captain-only buttons — no real
  auth, just a flag for the UI demo.

### 6.5 Profile (`profile.tsx`)
No shared `Header` — a custom simple header row with just the uppercase title
"PROFILE" (no chat/bell icons here, since this is the user's own profile).
1. Profile `Card`: large `Avatar`, Riot ID, `RankBadge` + region, team name,
   "Edit" button (ghost).
2. **Roles** chips (all `selected`) + **Top agents** chips (unselected).
3. **Availability**: a 7-day chip row (M T W Th F S Su) where days in the
   user's `availabilityDays` array are highlighted in `accent`, plus a time-
   slot label underneath.
4. Stats `Card`: three-column matches/win rate/K-D.
5. **Badges** chip row.
6. Riot/Valorant disclaimer text at the very bottom, centered, `dim` color.

---

## 7. Conventions an AI must follow when generating this app

1. **No hard-coded hex/rgb values inside component or screen JSX.** Every color
   is a `text-valo-*` / `bg-valo-*` / `border-valo-*` Tailwind class, or (when a
   raw string is unavoidable, e.g. `Ionicons color=`) pulled from `theme/colors.ts`.
2. **Uppercase display text.** Button titles, header titles, section titles,
   and status pills are rendered uppercase via `.toUpperCase()` or `uppercase`
   tracking classes — matches the tactical/competitive look.
3. **Touch targets ≥ 44×44px**, every interactive element has
   `accessibilityRole` and a descriptive `accessibilityLabel`.
4. **FlatList for any list that can grow** (scrims, players, teams); plain
   `.map()` only for small, fixed-size collections (roster of ≤5, stat rows,
   day chips).
5. **SafeAreaView edges={['top']}** wraps every tab screen's content so nothing
   sits under the status bar/notch; `BottomSheet` wraps its content in
   `SafeAreaView edges={['bottom']}` for the home-indicator area.
6. **Mock data lives next to its screen.** Declare `const`/`interface` at the
   top of the screen file. Do not create a shared data module for a 5-screen app.
7. **No backend, no real navigation side-effects beyond the 5 tabs.** `router.push`
   is only used to jump between the 5 existing tab routes (e.g. Home's "LFG"
   quick action → `/lfg`, "My team" arrow → `/team`). Never reference a route
   that doesn't exist in `src/app/`.
8. **Keep components generic and reusable.** If a visual pattern is only used
   once, inline it in the screen as a small local function or straight JSX
   instead of creating a new file in `components/`.
9. **Dark theme only** (`userInterfaceStyle: "dark"` in `app.json`,
   `ThemeProvider value={DarkTheme}`) — no light-mode variant needed.
10. **Android glow fallback**: when a component relies on a colored shadow
    (`shadow-valo-accent/30`), always also set a solid `border-valo-accent`
    (or relevant color) so the element still reads correctly on Android, where
    colored shadows don't render.

---

## 8. How to brief an AI with this document

Paste this file's contents (or attach it) and say:

> "Build this Expo app exactly as specified in the guideline: same stack,
> same theme tokens, same 5 screens, same component contracts. Use NativeWind
> for all styling, keep mock data inline per screen, and don't add extra
> files/folders beyond what's listed in section 2."

That's enough context for an AI with file-write access to regenerate the app
from scratch, matching this build screen-for-screen and component-for-component.
