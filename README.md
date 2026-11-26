# Class-activity-2

Actividad en clase de Programación Web en **React**: calculadora estándar tipo móvil.

> Esta rama contiene solo la calculadora. El login, el menú y la aplicación de suma se desarrollan en la rama `dev`.

## Calculadora

- Teclas: `%`, `CE`, `C`, `⌫`, `1/x`, `x²`, `√x`, `÷ × − +`, `+/−`, `.`, `=`
- Encadena operaciones (`1 + 2 × 4 =` → 12) y evita errores de coma flotante (`0.1 + 0.2` → 0.3)
- Muestra error al dividir entre 0 o sacar raíz de un negativo
- También funciona con el teclado: números, `+ - * /`, `Enter`, `Backspace`, `Esc`

Archivos: `src/pages/Calculadora.jsx` (interfaz) y `src/logic/calculadora.js` (lógica).

## Ejecutar

```bash
npm install
npm run dev
```

Abrir la URL que muestra la terminal (por defecto http://localhost:5173).
