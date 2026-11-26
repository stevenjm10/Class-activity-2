# Class-activity-2

Actividad en clase de Programación Web: dos aplicaciones en **React** dentro de un mismo proyecto.

## Flujo

```
Login (Username, Password, Button)
   └── Menú
        ├── SUM        → Número 1, Número 2, Resultado y botón Sumar
        └── Calculator → Calculadora estándar tipo móvil
```

## Reparto del trabajo

| Parte | Archivo | Responsable |
|-------|---------|-------------|
| Login y menú | `src/pages/Login.jsx`, `src/pages/Menu.jsx` | Equipo |
| Suma | `src/pages/Suma.jsx` | Compañero |
| Calculadora | `src/pages/Calculadora.jsx`, `src/logic/calculadora.js` | Steven |

## Calculadora

- Teclas: `%`, `CE`, `C`, `⌫`, `1/x`, `x²`, `√x`, `÷ × − +`, `+/−`, `.`, `=`
- Encadena operaciones (`1 + 2 × 4 =` → 12) y evita errores de coma flotante (`0.1 + 0.2` → 0.3)
- Muestra error al dividir entre 0 o sacar raíz de un negativo
- También funciona con el teclado: números, `+ - * /`, `Enter`, `Backspace`, `Esc`

## Ejecutar

```bash
npm install
npm run dev
```

Abrir la URL que muestra la terminal (por defecto http://localhost:5173). En el login se puede usar cualquier usuario y contraseña no vacíos.
