# Backlog / To-Do (Type Refinement & Migration)

Focus: tighten TypeScript types across reducers & actions where shapes are still generic or uncertain.

## 1. Drawer / Categories Domain
- [ ] Replace `DrawerState = unknown[]` with a concrete interface, e.g. `interface Drawer { id: string; name: string; iconUrl?: string; order?: number; }` once API shape is confirmed.
- [ ] Update `GetDrawersAction` payload from `unknown[]` to `Drawer[]`.
- [ ] Add a dedicated `drawers.ts` types module or integrate into `types/actions.ts` after shape confirmed.

## 2. Addon / Addon Library Models
- [ ] Split `AddonLibraryItem` (template) vs `AddonItem` (placed instance) more clearly; confirm if library items always have stable `id` from API.
- [ ] Narrow `AddonItem.category: string` to a union (e.g. `'text' | 'image' | 'webcam' | 'shape'`) after auditing data.
- [ ] Consider extracting `AddonDimensions` type for `{h,w}` and `Position` for `{x,y}` to reduce duplication.
- [ ] Validate whether `value` is only present when `category === 'text'`; enforce via discriminated union.

## 3. Account State
- [ ] Replace index signature `[key: string]: unknown` with explicit fields (e.g. `username`, `email`, `createdAt`, etc.) based on API response from `/accounts/` endpoint.
- [ ] Introduce `AccountDetails` interface and have reducer merge into it instead of wide-open shape.

## 4. Creations
- [ ] Unify `Creation.id` type to a single primitive (prefer `string`) to eliminate `string | number` union if API allows.
- [ ] Decide if `composition` should always exist; if so, drop optional and default to empty array.
- [ ] Add timestamps or metadata fields if present in backend but currently ignored.

## 5. CurrentCreation Reducer
- [ ] Extend stored shape beyond `{id,title}` if additional metadata (e.g., `updatedAt`, `thumbnailUrl`) is required.
- [ ] Potentially store a reference to full `Creation` object instead of partial subset for consistency.

## 6. Modals & Forms
- [ ] Evaluate if `welcome` should persist after first dismiss; consider separate reducer slice or remove once onboarding complete.
- [ ] Add type-safe action payloads if future modals require parameters (currently none).

## 7. Loading State
- [ ] Replace single boolean with a keyed map (e.g., `{ global: boolean; addons: boolean; creations: boolean }`) if granular loading indicators are needed.

## 8. Notifications Integration
- [ ] Add explicit TypeScript interfaces for `react-notification-system-redux` actions (e.g., `RNS_SHOW_NOTIFICATION`, `RNS_REMOVE_NOTIFICATION`).
- [ ] Extend `ActionType` enum or create a parallel enum namespace for external library actions to avoid string literals elsewhere.

## 9. Action Type Hygiene
- [ ] Rename `AddonAddonActions` union to `AddonFeatureActions` (current name is redundant) and adjust usages.
- [ ] Audit for any lingering string action types outside enum (search for `type:` with raw strings) and replace with `ActionType` members.
- [ ] Extract coordinate payload shape into a reusable `Coordinates` interface.

## 10. Store / Root State
- [ ] Export a consolidated `RootState` interface referencing refined slice types (after above tasks) and use it for `mapStateToProps` plus selectors.
- [ ] Introduce memoized selectors (e.g. with Reselect) after state shapes stabilize.

## 11. Strictness & Linting
- [ ] Enable `strict` in `tsconfig.json` once unknown / any placeholders are removed.
- [ ] Turn on `noUncheckedIndexedAccess` after refining collections.
- [ ] Add ESLint rule to forbid `unknown[]` and generic index signatures in reducers.

## 12. Testing & Validation
- [ ] Add unit tests for each reducer verifying all ActionType transitions with strongly typed sample payloads.
- [ ] Add runtime guards (zod / io-ts optional) if external API responses are untrusted.

## 13. Future Refactors
- [ ] Consider migrating legacy class-based `App` component to functional component with hooks + `useDispatch` & `useSelector` typed.
- [ ] Evaluate moving to Redux Toolkit to simplify action + reducer boilerplate and gain built-in type inference.
- [ ] If migrating to Redux Toolkit, replace manual action enums with RTK `createSlice` generated action creators (while keeping discriminated types).

---
Generated on: (auto) — update this file as tasks are refined or completed.
