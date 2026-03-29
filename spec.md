# Tara Electronics Corporation

## Current State
Full e-commerce platform with product pages, cart, checkout, enquiry forms, and admin dashboard. The authorization component is already installed (MixinAuthorization + AccessControl). The `useInternetIdentity` hook exists. Backend has `getCallerUserRole`, `isCallerAdmin`, `saveCallerUserProfile`, `getCallerUserProfile` APIs. However, there is no Login/Register UI exposed to users anywhere in the app.

## Requested Changes (Diff)

### Add
- Login/Register page at `/account` with Internet Identity login button and a profile form (name, phone, address) after login
- `AuthModal` or inline login section -- when user clicks login, it triggers Internet Identity flow
- Navbar: Add a "Login" button (and user avatar/name + logout when logged in) in the right side of navbar
- `AccountPage` component showing: login state, profile form (save name/phone/address), order history placeholder
- Wrap `App.tsx` with `InternetIdentityProvider` so the hook works app-wide
- Show logged-in user's name in navbar when authenticated

### Modify
- `App.tsx`: Wrap root with `InternetIdentityProvider`, add `/account` route
- `Navbar.tsx`: Add Login/Account button using `useInternetIdentity`

### Remove
- Nothing

## Implementation Plan
1. Wrap `main.tsx` or `App.tsx` with `InternetIdentityProvider`
2. Create `src/pages/AccountPage.tsx` -- shows login prompt if not authenticated, shows profile form + save button if authenticated
3. Update `Navbar.tsx` to show Login button (triggers II login) or user menu with logout when logged in
4. Add `/account` route in `App.tsx`
5. Wire profile save/load via `useActor` calling `saveCallerUserProfile` and `getCallerUserProfile`
