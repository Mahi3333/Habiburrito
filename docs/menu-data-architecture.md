# Menu Data Architecture (Habiburrito JSON)

## Goal
Normalize the `app/menu-items-json/*.json` data into a reusable catalog + item model that powers:
- Menu page (category browsing)
- Build page (build-your-own flows)
- Admin CRUD (future)

## Menu Page UX (Target)
Layout should match the reference screenshots:
- **Category landing view**: A clean vertical list of categories (Wraps, Bowls, Quesadillas, Sides) with circular thumbnail + right chevron. Tapping a category navigates to its item grid.
- **Category item grid**: Two-column card grid on desktop, single column on mobile. Each card shows name, short description, price, quantity stepper, and a single primary Order button.
- **Interaction**: Quantity stepper controls the add-to-cart count per item, Order button remains a consistent brand accent.
- **Consistency**: All text on white backgrounds is black. Gray subtext stays readable (no light gray on white).

## Data Model (Prisma)
Source of truth: `prisma/schema.prisma`

Core entities:
- MenuCategory: category.key, name, aliases, sort order.
- MenuItem: item.key, name, description, price, category (legacy slug), category_id, status flags.
- Modifier: reusable group (base, protein, sauces, etc).
- ModifierOption: reusable option within a group (protein.chicken, sauces.white_sauce, etc).
- MenuItemModifierGroup: per-item group rules (required, min/max, allowQuantity, allowNoneOption, notes, freeText).
- MenuItemModifierDefault: per-item defaults for a group.
- MenuItemIncludedOption: per-item included items (used for fixed recipes).

## JSON -> DB Mapping
Categories:
- `category.key` -> MenuCategory.key
- `category.name` -> MenuCategory.name
- `category.aliases[]` -> MenuCategory.aliases[]

Items:
- `items[].key` -> MenuItem.key
- `items[].name` -> MenuItem.name
- `items[].description` -> MenuItem.description
- `items[].price` -> MenuItem.price
- `items[].isActive` -> MenuItem.is_available
- Category relationship via `category_id` (plus legacy `category` string if needed)

Modifier groups:
- `catalog.modifierGroups.{groupKey}` -> Modifier(key, name, type)
- `groupRef` in item -> MenuItemModifierGroup(modifier_id)
- `titleOverride` -> MenuItemModifierGroup.title_override
- `rules.required/min/max/allowQuantity` -> MenuItemModifierGroup fields
- `allowNoneOption` -> MenuItemModifierGroup.allow_none_option
- `rules.type: freeText` + `rules.maxLength` -> Modifier.type=FREE_TEXT and MenuItemModifierGroup.free_text_max_length

Modifier options:
- `catalog.modifierGroups.*.options[]` -> ModifierOption(key, name)
- Price deltas can be added later via `price_adjustment`.

Defaults:
- `modifierGroups[].defaults[]` -> MenuItemModifierDefault(option_id, quantity)

Included items:
- `includedItems[]` -> MenuItemIncludedOption(option_id, quantity)

## Import Flow (Recommended)
1) Load all JSON files in `app/menu-items-json/`.
2) Build a unified catalog:
   - Merge `catalog.modifierGroups` across files.
   - Add any referenced options not present in catalog (see gaps below).
3) Upsert MenuCategory by `category.key`.
4) Upsert Modifier by `group.key`.
5) Upsert ModifierOption by `option.key`.
6) Upsert MenuItem by `item.key`, connect to category.
7) Create MenuItemModifierGroup rows per item/groupRef with rule settings.
8) Create MenuItemModifierDefault rows from `defaults`.
9) Create MenuItemIncludedOption rows from `includedItems`.

## Known Catalog Gaps (from JSON scan)
Referenced but not defined in `catalog.modifierGroups`:
- base.cilantro_rice
- base.habiburrito_rice
- base.nacho_chips
- base.tortilla
- veg.avocado
- veg.cucumber
- veg.salsa

## Open Questions / Decisions
- Pricing: Are any options supposed to have price adjustments?
- Group rules: Should any groups allow multiple selections by default across categories?
- Build page: Which categories feed the Build flow (only build-your-own items, or all)?
- Images: Do items use `image_url` per item, or a category default?
- Category thumbnails: Should `MenuCategory` store an `image_url`, or should we map category keys to static assets in the UI?
