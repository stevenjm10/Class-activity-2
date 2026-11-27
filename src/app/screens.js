import Sum from '../pages/Sum.jsx'
import Calculator from '../pages/Calculator.jsx'
import Form from '../pages/Form.jsx'
import Characters from '../pages/Characters.jsx'

// The 4 pages of the project, in menu order.
// To add a page, add it here: the menu and the navigation both read this list.
export const SCREENS = [
  { id: 'sum', label: 'SUM', component: Sum },
  { id: 'calculator', label: 'Calculator', component: Calculator },
  { id: 'form', label: 'Form', component: Form },
  { id: 'characters', label: 'Rick and Morty', component: Characters },
]
