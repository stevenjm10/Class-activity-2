# Class-activity-2

Web Programming class activity: a **React** app with a login, a menu and **4 pages**.

## Run

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (http://localhost:5173 by default). Any non-empty username and password work on the login screen.

| Command | What it does |
|---------|--------------|
| `npm run dev` | Starts the app in development mode |
| `npm run build` | Builds the app for production into `dist/` |
| `npm run lint` | Checks the code with oxlint |

## Flow

```
Login ──► Menu ──► 1. Sum
            ▲      2. Calculator
            │      3. Form
            │      4. Rick and Morty
            └────── "← Back to menu"
```

## Libraries

| Library | Used for |
|---------|----------|
| React 19 | Components and state (`useState`, `useReducer`, `useEffect`, `useRef`) |
| React Hook Form | Form state for Login, Sum and Form (`useForm`, `useWatch`) |
| Zod | Validation rules (schemas in `src/schemas/`, connected with `zodResolver`) |

No router is used: navigation is simulated with React state (see below).

## Project structure

```
src/
├── main.jsx                 Entry point: renders <App /> and loads the styles
├── index.css                All styles, ordered: palette → base → shared components → pages
│
├── app/                     App shell (not pages): sign in, menu and navigation
│   ├── App.jsx              Keeps the signed-in user and the open screen in state
│   ├── Login.jsx            Sign-in screen (React Hook Form + Zod)
│   ├── Menu.jsx             One button per page in screens.js
│   └── screens.js           List of the 4 pages: id, menu label and component
│
├── pages/                   The 4 pages of the activity
│   ├── Sum.jsx              1. Adds two numbers, shows the last 3 sums
│   ├── Calculator.jsx       2. Calculator drawn from a list of keys
│   ├── Form.jsx             3. Registration form
│   └── Characters.jsx       4. Rick and Morty character search
│
├── components/              Reusable pieces (no page-specific logic)
│   ├── Card.jsx             Centered white card with a title (layout of every simple screen)
│   ├── Button.jsx           Button with 'primary' and 'light' variants
│   ├── BackButton.jsx       "← Back to menu" button used by every page
│   ├── Field.jsx            Label + input/select/textarea + error message
│   ├── ErrorMessage.jsx     Error text; renders nothing when there is no error
│   └── characters/          Pieces of the Rick and Morty page
│       ├── CharacterResults.jsx   Loading / error / empty / list for one search
│       ├── CharacterCard.jsx      One character in the list
│       ├── CharacterDetail.jsx    Modal with the character details
│       ├── Pagination.jsx         Previous / Next buttons
│       └── statusLabel.js         Shows "unknown" status as "Unknown"
│
├── hooks/                   Custom hooks (reusable logic with state)
│   ├── useDebounce.js       Waits until the user stops typing
│   └── useCharacters.js     Loads characters and returns { data, error, loading, retry }
│
├── services/
│   └── rickAndMortyApi.js   The only place that calls the external API
│
├── schemas/                 Zod validation rules, one file per form
│   ├── loginSchema.js
│   ├── sumSchema.js
│   └── formSchema.js
│
└── utils/                   Pure functions (no React), easy to test
    ├── formatNumber.js      Fixes floating point results (0.1 + 0.2 → 0.3)
    └── calculator.js        Calculator reducer: every key press returns a new state
```

### Why it is organized this way

- **One responsibility per file**: pages draw the screen, hooks hold logic with state, services talk to the API, schemas validate, utils do calculations.
- **No duplicated components**: every page uses the same `Card`, `Button`, `BackButton`, `Field` and `ErrorMessage`. A change in one of them updates every screen.
- **Data-driven UI**: the menu is drawn from `screens.js` and the calculator keys from a `KEYS` list, so there are no repeated blocks of JSX.
- **Maintainability**: to add a page, create it in `src/pages/` and add one line to `src/app/screens.js`; to change a validation rule, edit only its schema; to change a color, edit only the palette.

## Key concepts

### Simulated navigation (no router)

`src/app/App.jsx` keeps two pieces of state:

- `user`: `null` until someone signs in.
- `screenId`: `null` means the menu; otherwise the `id` of a page from `screens.js`.

Pages receive callbacks as props (`onBack`, `onOpen`, `onLogout`) and call them to change the screen. The URL never changes.

### Conditional rendering

| Pattern | Where | What it decides |
|---------|-------|-----------------|
| Early `return` | `App.jsx` | Login if there is no user, Menu if no page is open, otherwise the open page |
| Early `return` | `CharacterResults.jsx` | Error, loading, "no results" or the list of characters |
| Component that returns `null` | `ErrorMessage.jsx` | Shows the error only when there is a message |
| Ternary `? :` | `Form.jsx` | The form, or the summary after submitting |
| Ternary `? :` | `Sum.jsx` | "Result" and 0, or the last operation and its total |
| `&&` | `Sum.jsx`, `CharacterResults.jsx` | The history only when there are sums; the detail only when a character is selected |

### Forms: React Hook Form + Zod

Every form follows the same steps:

1. The rules live in a Zod schema (`src/schemas/`).
2. `useForm({ resolver: zodResolver(schema) })` connects the schema to the form.
3. Each input is connected with `{...register('name')}`.
4. `handleSubmit(onValid)` runs `onValid` only when the data passes the schema.
5. Errors come from `formState.errors` and are shown with `Field` / `ErrorMessage`.

### Shared color palette

Colors are defined once as CSS variables in `:root` (`src/index.css`). New styles use `var(--primary)`, `var(--surface)`, `var(--text-muted)`, etc. instead of fixed colors, so every page looks the same.

## The 4 pages

### 1. Sum

- Two number inputs validated with Zod (empty or invalid numbers show an error under the input).
- Enter or **Add** shows the operation and the result; **Clear** empties the form.
- Keeps the last 3 sums.
- Uses `formatNumber`, so `0.1 + 0.2` shows `0.3`.

### 2. Calculator

Layout based on the class sketch:

```
[Reset] [ - ] [ x ] [DEL]
[  7  ] [ 8 ] [ 9 ] [ / ]
[  4  ] [ 5 ] [ 6 ] [ + ]
[  1  ] [ 2 ] [ 3 ] [   ]
[ 00  ] [ 0 ] [ . ] [ = ]
```

- The state is handled by `useReducer` with `calculatorReducer` (`src/utils/calculator.js`). Each key sends an action such as `{ type: 'digit', value: '7' }`.
- Chains operations (`1 + 2 x 4 =` → 12) and shows `Error` when dividing by 0.

### 3. Form

Registration form built with **React Hook Form** and validated with a **Zod** schema.

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

### 4. Rick and Morty

Character search using the public [Rick and Morty API](https://rickandmortyapi.com).

- Search by name; `useDebounce` waits until you stop typing.
- `useCharacters` loads the data and cancels old requests when the search changes.
- Previous / Next pages; a new search starts again on page 1.
- Click a character to open a modal with status, species, origin, last location and number of episodes.
