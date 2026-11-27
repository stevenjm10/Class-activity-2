# Class-activity-2

Web Programming class activity: two **React** apps in a single project.

## Flow

```
Login (Username, Password, Button)
   └── Menu
        ├── SUM        → Number 1, Number 2, Result and Add button
        └── Calculator → Simple calculator
```

## Project structure

| Part | Files |
|------|-------|
| Login and menu | `src/pages/Login.jsx`, `src/pages/Menu.jsx` |
| Sum | `src/pages/Sum.jsx` |
| Calculator | `src/pages/Calculator.jsx` |

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

## Run

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (http://localhost:5173 by default). Any non-empty username and password work on the login screen.
