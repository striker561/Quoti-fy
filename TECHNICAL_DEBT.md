# 🧾 Quotify Project – Technical Debt Checklist

A running audit of outstanding improvements, refactors, and fixes across the Quotify codebase. This check list was generated with AI.

---

## 🔧 1. Error Handling

* [x] Replace all `any` types in `catch` blocks with `unknown` and use proper narrowing.
* [ ] Introduce a custom `AppError` class for consistent error throwing across services.
* [ ] Add `errorUtils.ts` with helpers like `isHttpError`, `parseError`, etc.

---

## 🗂️ 2. API Structure & Routing

* [x] Use RESTful endpoints:

  * `/api/generate/image`
  * `/api/generate/quote`
  * `/api/generate/quotify`
* [x] Use `withAuth` to protect all sensitive routes.

---

## 📁 3. Service Layer Architecture

* [x] Introduce `/services/` directory for core business logic.
* [x] Ensure **all** routes call clean service functions.
* [x] Organize by domain: examples

  * `ImageGenService.ts`
  * `QuoteService.ts`
  * `QuotifyService.ts`

---

## 🔐 4. Auth Layer

* [x] Implement `withAuth(user, req)` pattern for protected APIs.
* [ ] Expand `withAuth` to support optional `roles` and `anonymous` flags. [Not Needed for now]

---

## 🛢️ 5. Persistence

* [ ] Create `QuotifyStore.ts` to handle DB or Redis persistence:

  * Save image + quote result
  * Fetch by user or ID

---

## 📦 6. Types & Interfaces

* [ ] Centralize shared types under `/types/`:

  * `ImageGenRequest`
  * `QuoteRequest`
  * `QuotifyResult`
* [ ] Remove inline type declarations from service files.

---

## 🧪 7. Validation

* [ ] Use Zod or Yup to validate request inputs.
* [ ] Return `400 Bad Request` with validation errors.

---

## 🖼️ 8. Image Upload & Storage

* [x] Create `StorageService.ts` using S3-compatible storage.
* [ ] Support thumbnail resizing (optional).

---

## 📈 9. Rate Limiting

* [x] Add per-user/IP limits to `/generate` routes.

---

## 🧼 10. Misc Cleanup

* [ ] Remove all lingering `any`, `console.log`, and unused vars.
* [ ] Normalize naming conventions across services and API layers.
* [ ] Consistently use `@` for imports.

---

> Update this file as items are completed or as new issues are identified. Stay lean, modular, and focused.

Built with care for maintainability. ❤️
