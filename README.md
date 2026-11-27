# Class-activity-2

Web Programming class activity: **React** apps in a single project.

## Flow

```
Login (Username, Password, Button)
   └── Menu
        ├── SUM        → Number 1, Number 2, Result and Add button
        ├── Calculator → Simple calculator
        ├── Form       → Registration form (React Hook Form + Zod)
        └── Rick and Morty → Character search (Rick and Morty API)
```

## Project structure

| Part | Files |
|------|-------|
| Login and menu | `src/pages/Login.jsx`, `src/pages/Menu.jsx` |
| Sum | `src/pages/Sum.jsx` |
| Calculator | `src/pages/Calculator.jsx` |
| Form | `src/pages/Form.jsx`, `src/schemas/formSchema.js` |
| Rick and Morty | `src/pages/Characters.jsx` |
| Styles (shared color palette) | `src/index.css` |

## Calculator

Layout based on the class sketch:

```
[Reset] [ - ] [ x ] [DEL]
[  7  ] [ 8 ] [ 9 ] [ / ]
[  4  ] [ 5 ] [ 6 ] [ + ]
[  1  ] [ 2 ] [ 3 ] [   ]
[ 00  ] [ 0 ] [ . ] [ = ]
```

- Chains operations (`1 + 2 x 4 =` → 12)
- Shows `Error` when dividing by 0

## Form

Registration form built with **React Hook Form** and validated with a **Zod** schema (`@hookform/resolvers/zod`).

| Field | Control | Validation |
|-------|---------|------------|
| Account type | Radio buttons | Required |
| Terms and conditions | Checkbox | Must be checked |
| Password | Password input | 8+ characters, at least one letter and one number |
| Full name | Text input | 3–50 characters |
| Subject | Select | Required |
| Comments | Textarea | 10–300 characters (live counter) |

- Errors are shown under each field after it is touched or when pressing **Submit**.
- **Submit** simulates sending the data and then shows a summary (the password is masked); **Clear** resets the form.

## Rick and Morty

Character search using the public [Rick and Morty API](https://rickandmortyapi.com).

- Search by name (waits until you stop typing)
- Previous / Next pages
- Click a character to see status, species, origin, last location and number of episodes

## Colors

Every page uses the same palette, defined once as CSS variables in `:root` (`src/index.css`). New styles should use `var(--primary)`, `var(--surface)`, `var(--text-muted)`, etc. instead of fixed colors.

## Run

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (http://localhost:5173 by default). Any non-empty username and password work on the login screen.
