import { FormulaCard } from '../types/domain';

export const FORMULA_CARDS: FormulaCard[] = [
  // --- UNIDAD 1: LÍMITES Y CONTINUIDAD ---
  {
    id: 'F_ENTORNO',
    unitId: 'U1',
    topicTitle: 'Entorno de un Punto',
    name: 'Definición de Entorno Simétrico',
    latex: 'E(a, \\varepsilon) = \\{x \\in \\mathbb{R} : |x - a| < \\varepsilon\\} = (a - \\varepsilon, a + \\varepsilon)',
    variables: [
      { symbol: 'a', meaning: 'Centro del entorno (número real)' },
      { symbol: '\\varepsilon', meaning: 'Semiamplitud o radio del entorno (\\varepsilon > 0)' },
      { symbol: 'x', meaning: 'Punto perteneciente al entorno' }
    ],
    whenToUse: 'Cuando se deba expresar una vecindad simétrica alrededor de un punto para límites o continuidad.',
    whenNotToUse: 'Cuando el intervalo sea asimétrico [a, b] con a ≠ c - ε o cuando se excluya el centro (en ese caso es entorno reducido E*).',
    canonicalExampleLatex: '|x - 3| < 0.5 \\iff 2.5 < x < 3.5 = E(3; 0.5)',
    frequentMistakes: [
      'Confundir amplitud del intervalo (2ε) con la semiamplitud (ε).',
      'Olvidar que en un entorno reducido E*(a, ε) se excluye el punto central a: 0 < |x - a| < ε.'
    ],
    associatedExerciseIds: ['EX_U1_01', 'EX_U1_02'],
    sourceReference: 'Material Teórico UNNE, pág. 8; TP 1 Ej. 1'
  },
  {
    id: 'F_LIMITE_NOTABLE_TRIG',
    unitId: 'U1',
    topicTitle: 'Límites Trigonométricos',
    name: 'Límite Notable Fundamental',
    latex: '\\lim_{x \\to 0} \\frac{\\operatorname{sen}(x)}{x} = 1',
    variables: [
      { symbol: 'x', meaning: 'Argumento angular medido en radianes tendiendo a 0' }
    ],
    whenToUse: 'Cuando se presente una indeterminación 0/0 con funciones trigonométricas donde el argumento tiende a 0.',
    whenNotToUse: 'Cuando x tienda a un valor diferente de 0 donde el cociente no sea 0/0 (ej: si x tiende a π/2, sen(π/2)/(π/2) = 2/π sin indeterminación).',
    canonicalExampleLatex: '\\lim_{x \\to 0} \\frac{\\operatorname{sen}(6x)}{2x} = \\lim_{x \\to 0} 3 \\cdot \\frac{\\operatorname{sen}(6x)}{6x} = 3 \\cdot 1 = 3',
    frequentMistakes: [
      'Aplicarlo sin igualar los argumentos del seno y del denominador.',
      'Suponer que vale cuando x tiende a infinito (lim_{x→∞} (sen x)/x = 0 por acotamiento, no 1).'
    ],
    associatedExerciseIds: ['EX_U1_07', 'EX_U1_08'],
    sourceReference: 'Material Teórico UNNE, pág. 30-33; TP 1 Ej. 3.f'
  },
  {
    id: 'F_NUMERO_E',
    unitId: 'U1',
    topicTitle: 'Límites Exponenciales',
    name: 'Definición del Número e',
    latex: '\\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^x = e \\approx 2.71828',
    variables: [
      { symbol: 'x', meaning: 'Variable independiente tendiendo a infinito' },
      { symbol: 'e', meaning: 'Base de los logaritmos naturales' }
    ],
    whenToUse: 'Para resolver indeterminaciones del tipo 1^∞ en límites con expresiones racionales elevadas a polinomios.',
    whenNotToUse: 'Cuando la base no tienda estrictamente a 1 o el exponente no tienda a infinito.',
    canonicalExampleLatex: '\\lim_{x \\to \\infty} \\left(1 - \\frac{2}{x}\\right)^{3x} = \\lim_{x \\to \\infty} \\left[\\left(1 + \\frac{1}{-x/2}\\right)^{-x/2}\\right]^{-6} = e^{-6}',
    frequentMistakes: [
      'Olvidar el signo negativo al hacer la sustitución de la variable auxiliar t.',
      'Asumir erróneamente que 1^∞ siempre es igual a 1.'
    ],
    associatedExerciseIds: ['EX_U1_09', 'EX_U1_10'],
    sourceReference: 'Material Teórico UNNE, pág. 33-34; TP 1 Ej. 3.k'
  },
  {
    id: 'F_CONTINUIDAD_PARAMETRICA',
    unitId: 'U1',
    topicTitle: 'Continuidad en Funciones a Trozos',
    name: 'Condición de Continuidad en Puntos de Empalme',
    latex: '\\lim_{x \\to x_0^-} f(x) = \\lim_{x \\to x_0^+} f(x) = f(x_0)',
    variables: [
      { symbol: 'x_0', meaning: 'Punto de cambio de definición o empalme de la función a trozos' },
      { symbol: 'f(x_0)', meaning: 'Valor asignado a la función en el punto de empalme' }
    ],
    whenToUse: 'Para hallar parámetros desconocidos (c, d) que garanticen la continuidad en puntos de empalme.',
    whenNotToUse: 'En funciones elementales continuas en todo su dominio que no tienen ramificaciones a trozos.',
    canonicalExampleLatex: 'f(x) = \\begin{cases} 2 & x \\le -1 \\\\ cx+d & -1 < x < 1 \\\\ -2 & x \\ge 1 \\end{cases} \\implies \\begin{cases} -c+d = 2 \\\\ c+d = -2 \\end{cases} \\implies c=-2, d=0',
    frequentMistakes: [
      'Evaluar solo un límite lateral sin igualarlo a la imagen de la función f(x₀).',
      'Confundir los signos al sustituir valores negativos como x₀ = -1.'
    ],
    associatedExerciseIds: ['EX_U1_02'],
    sourceReference: 'Material Teórico UNNE, pág. 35-37; TP 1 Ej. 6'
  },

  // --- UNIDAD 2: DERIVADAS ---
  {
    id: 'F_DERIVADA_DEFINICION',
    unitId: 'U2',
    topicTitle: 'Cociente Incremental',
    name: 'Derivada por Definición',
    latex: "f'(x) = \\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x) - f(x)}{\\Delta x} = \\lim_{\\Delta x \\to 0} \\frac{\\Delta y}{\\Delta x}",
    variables: [
      { symbol: "f'(x)", meaning: 'Derivada de la función en el punto x (pendiente de la tangente)' },
      { symbol: '\\Delta x', meaning: 'Incremento de la variable independiente' },
      { symbol: '\\Delta y', meaning: 'Incremento correspondiente de la variable dependiente' }
    ],
    whenToUse: 'Cuando el enunciado de examen pida explícitamente "calcular la derivada aplicando la definición".',
    whenNotToUse: 'Cuando se pida derivar por reglas prácticas o tablas (ahorra tiempo y reduce riesgo algebraico).',
    canonicalExampleLatex: "f(x) = x^2 - 2x \\implies f'(1) = \\lim_{\\Delta x \\to 0} \\frac{[(1+\\Delta x)^2 - 2(1+\\Delta x)] - (-1)}{\\Delta x} = 0",
    frequentMistakes: [
      'Olvidar desarrollar completamente el binomio al cuadrado (1 + Δx)²',
      'No cancelar el término independiente al restar f(x), lo que impide simplificar el Δx del denominador.'
    ],
    associatedExerciseIds: ['EX_U2_01'],
    sourceReference: 'Material Teórico UNNE, pág. 39; TP 2 Ej. 1 y 2'
  },
  {
    id: 'F_RECTA_TANGENTE_NORMAL',
    unitId: 'U2',
    topicTitle: 'Aplicaciones Geométricas de la Derivada',
    name: 'Ecuaciones de Recta Tangente y Recta Normal',
    latex: 'y - y_0 = f\'(x_0)(x - x_0), \\quad y - y_0 = -\\frac{1}{f\'(x_0)}(x - x_0)',
    variables: [
      { symbol: 'P_0(x_0, y_0)', meaning: 'Punto de tangencia sobre la curva f(x₀) = y₀' },
      { symbol: 'm_T = f\'(x_0)', meaning: 'Pendiente de la recta tangente en x₀' },
      { symbol: 'm_N = -1/f\'(x_0)', meaning: 'Pendiente de la recta normal perpendicular (f\'(x₀) ≠ 0)' }
    ],
    whenToUse: 'Para hallar la recta tangente y normal a una curva f(x) en una abscisa dada x₀.',
    whenNotToUse: 'Si la derivada en el punto es nula (la normal es vertical x = x₀) o no existe derivada.',
    canonicalExampleLatex: 'f(x) = \\frac{x+1}{x^2+1}, x_0 = 0 \\implies f(0)=1, f\'(0)=1 \\implies y = x+1, \\quad y = -x+1',
    frequentMistakes: [
      'Invertir las pendientes de la tangente y de la normal.',
      'Calcular la pendiente con f(x₀) en vez de con f\'(x₀).'
    ],
    associatedExerciseIds: ['EX_U2_02'],
    sourceReference: 'Material Teórico UNNE, pág. 40; TP 2 Ej. 5'
  },
  {
    id: 'F_REGLA_PRODUCTO',
    unitId: 'U2',
    topicTitle: 'Reglas de Derivación',
    name: 'Derivada del Producto de Funciones',
    latex: '(u \\cdot v)\' = u\' \\cdot v + u \\cdot v\'',
    variables: [
      { symbol: 'u, v', meaning: 'Funciones derivables de x' },
      { symbol: "u', v'", meaning: 'Derivadas de las funciones respectivas' }
    ],
    whenToUse: 'Cuando se tiene el producto algebraico de dos funciones dependientes de la misma variable x.',
    whenNotToUse: 'Cuando uno de los factores sea una constante numérica k; en ese caso se usa directamente (k·u)\' = k·u\'.',
    canonicalExampleLatex: 'y = x^4 \\cdot 2^x \\implies y\' = 4x^3 \\cdot 2^x + x^4 \\cdot 2^x \\ln 2 = x^3 \\cdot 2^x(4 + x \\ln 2)',
    frequentMistakes: [
      'Derivar como el simple producto de las derivadas: (u·v)\' ≠ u\'·v\'.',
      'Olvidar el factor ln 2 al derivar la base exponencial 2^x.'
    ],
    associatedExerciseIds: ['EX_U2_03', 'EX_U2_04'],
    sourceReference: 'Material Teórico UNNE, pág. 41; TP 2 Ej. 3.d'
  },
  {
    id: 'F_REGLA_COCIENTE',
    unitId: 'U2',
    topicTitle: 'Reglas de Derivación',
    name: 'Derivada del Cociente de Funciones',
    latex: '\\left(\\frac{u}{v}\\right)\' = \\frac{u\' \\cdot v - u \\cdot v\'}{v^2}',
    variables: [
      { symbol: 'u', meaning: 'Función en el numerador' },
      { symbol: 'v', meaning: 'Función en el denominador (v ≠ 0)' }
    ],
    whenToUse: 'Para funciones algebraicas fraccionarias donde tanto numerador como denominador dependen de x.',
    whenNotToUse: 'Cuando el denominador es una constante numérica; no complicar con regla de cociente.',
    canonicalExampleLatex: 'y = \\frac{x^3 - 2}{x + 1} \\implies y\' = \\frac{3x^2(x+1) - (x^3-2)(1)}{(x+1)^2} = \\frac{2x^3 + 3x^2 + 2}{(x+1)^2}',
    frequentMistakes: [
      'Invertir los términos del numerador: escribir u·v\' - u\'·v en vez de u\'·v - u·v\'.',
      'Olvidar elevar el denominador al cuadrado en el resultado final.'
    ],
    associatedExerciseIds: ['EX_U2_05', 'EX_U2_06'],
    sourceReference: 'Material Teórico UNNE, pág. 41-42; TP 2 Ej. 3.e'
  },
  {
    id: 'F_REGLA_CADENA',
    unitId: 'U2',
    topicTitle: 'Funciones Compuestas',
    name: 'Regla de la Cadena',
    latex: '\\frac{dy}{dx} = f\'(g(x)) \\cdot g\'(x) \\quad \\text{o} \\quad \\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}',
    variables: [
      { symbol: 'y = f(u)', meaning: 'Función externa respecto a la variable intermedia u' },
      { symbol: 'u = g(x)', meaning: 'Función interna dependiente de x' }
    ],
    whenToUse: 'Cuando el argumento de una función elemental es a su vez otra función (funciones anidadas).',
    whenNotToUse: 'Cuando la función sea una suma o producto directo sin composición.',
    canonicalExampleLatex: 'y = \\operatorname{sen}^2(x^3) \\implies y\' = 2\\operatorname{sen}(x^3) \\cdot \\cos(x^3) \\cdot 3x^2 = 6x^2 \\operatorname{sen}(x^3)\\cos(x^3)',
    frequentMistakes: [
      'Derivar solo la capa externa y olvidar multiplicar por la derivada del argumento interno.',
      'En potencias de funciones trigonométricas sen²(x³), omitir alguno de los 3 eslabones de la cadena.'
    ],
    associatedExerciseIds: ['EX_U2_07', 'EX_U2_08'],
    sourceReference: 'Material Teórico UNNE, pág. 45; TP 2 Ej. 3.p'
  },
  {
    id: 'F_DERIVACION_LOGARITMICA',
    unitId: 'U2',
    topicTitle: 'Derivación Avanzada',
    name: 'Derivación Logarítmica',
    latex: 'y = u(x)^{v(x)} \\implies y\' = u^v \\left[v\' \\ln u + v \\cdot \\frac{u\'}{u}\\right]',
    variables: [
      { symbol: 'u(x)', meaning: 'Base de la función (función positiva)' },
      { symbol: 'v(x)', meaning: 'Exponente dependiente de x' }
    ],
    whenToUse: 'Cuando la base y el exponente dependan simultáneamente de la variable x (ej: x^x, (sen x)^(sen x)).',
    whenNotToUse: 'Cuando el exponente sea constante (usar regla de potencia n·x^(n-1)) o la base sea constante (usar a^x ln a).',
    canonicalExampleLatex: 'y = x^x \\implies \\ln y = x \\ln x \\implies \\frac{y\'}{y} = \\ln x + 1 \\implies y\' = x^x (\\ln x + 1)',
    frequentMistakes: [
      'Tratarla como una potencia común y poner erróneamente x·x^(x-1).',
      'Olvidar multiplicar al final por el valor original de y para despejar y\'.'
    ],
    associatedExerciseIds: ['EX_U2_09', 'EX_U2_10'],
    sourceReference: 'Material Teórico UNNE, pág. 44; TP 2 Ej. 5'
  },
  {
    id: 'F_DIFERENCIAL',
    unitId: 'U2',
    topicTitle: 'Diferencial y Aproximación',
    name: 'Diferencial de una Función y Aproximación Lineal',
    latex: 'dy = f\'(x) \\, dx \\quad \\text{y} \\quad f(x + \\Delta x) \\approx f(x) + f\'(x) \\Delta x',
    variables: [
      { symbol: 'dy', meaning: 'Diferencial de la función (incremento en la tangente)' },
      { symbol: '\\Delta y', meaning: 'Incremento real de la curva: f(x+Δx) - f(x)' },
      { symbol: 'dx = \\Delta x', meaning: 'Incremento de la variable independiente' }
    ],
    whenToUse: 'Para estimaciones lineales rápidas del cambio de una función y análisis de propagación de errores.',
    whenNotToUse: 'Cuando se requiera el valor exacto del incremento (usar Δy en su lugar).',
    canonicalExampleLatex: 'f(x) = x^3 - 2x \\implies dy = (3x^2 - 2)dx',
    frequentMistakes: [
      'Confundir dy con Δy; solo son iguales si la función f(x) es lineal.',
      'Olvidar incluir el diferencial dx al final de la expresión.'
    ],
    associatedExerciseIds: ['EX_U2_11', 'EX_U2_12'],
    sourceReference: 'Material Teórico UNNE, pág. 45-46; TP 2 Ej. 9'
  },

  // --- UNIDAD 3: APLICACIONES DE LA DERIVADA ---
  {
    id: 'F_LAGRANGE',
    unitId: 'U3',
    topicTitle: 'Teoremas del Valor Medio',
    name: 'Teorema del Valor Medio de Lagrange',
    latex: 'f(b) - f(a) = f\'(\\xi)(b - a) \\iff f\'(\\xi) = \\frac{f(b) - f(a)}{b - a}, \\quad \\xi \\in (a, b)',
    variables: [
      { symbol: '[a, b]', meaning: 'Intervalo cerrado donde f es continua' },
      { symbol: '(a, b)', meaning: 'Intervalo abierto donde f es derivable' },
      { symbol: '\\xi', meaning: 'Punto interior donde la tangente es paralela a la recta secante' }
    ],
    whenToUse: 'Para demostrar existencia de tasas instantáneas iguales a la tasa promedio o acotar diferencias.',
    whenNotToUse: 'Si la función presenta una discontinuidad en [a, b] o un punto anguloso/vértice sin derivada en (a, b).',
    canonicalExampleLatex: 'f(x) = x^2 \\text{ en } [a,b] \\implies \\xi = \\frac{a+b}{2}',
    frequentMistakes: [
      'No verificar rigurosamente que f sea derivable en todo el intervalo abierto.',
      'Afirmar que ξ puede ser igual a los extremos a o b (ξ debe ser estrictamente interior).'
    ],
    associatedExerciseIds: ['EX_U3_01', 'EX_U3_02'],
    sourceReference: 'Material Teórico UNNE, pág. 52-53'
  },
  {
    id: 'F_LHOPITAL',
    unitId: 'U3',
    topicTitle: 'Regla de L\'Hôpital',
    name: 'Regla de L\'Hôpital',
    latex: '\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f\'(x)}{g\'(x)}',
    variables: [
      { symbol: 'f(x), g(x)', meaning: 'Funciones derivables con lim f = lim g = 0 o ±∞' }
    ],
    whenToUse: 'Exclusivamente cuando el límite directo arroje indeterminación 0/0 o ∞/∞.',
    whenNotToUse: 'Cuando el cociente no sea indeterminado. Si lim g(x) ≠ 0 y es finito, derivar da un resultado erróneo.',
    canonicalExampleLatex: '\\lim_{x \\to 0} \\frac{x - \\operatorname{sen} x}{x^3} = \\lim_{x \\to 0} \\frac{1 - \\cos x}{3x^2} = \\lim_{x \\to 0} \\frac{\\operatorname{sen} x}{6x} = \\frac{1}{6}',
    frequentMistakes: [
      'Derivar como cociente de funciones (u\'v - uv\')/v² en lugar de derivar numerador y denominador por separado.',
      'Aplicar la regla cuando ya no hay indeterminación.'
    ],
    associatedExerciseIds: ['EX_U3_03'],
    sourceReference: 'Material Teórico UNNE, pág. 53-54; TP 2 Ej. 8'
  },
  {
    id: 'F_TAYLOR_MACLAURIN',
    unitId: 'U3',
    topicTitle: 'Aproximación Polinómica',
    name: 'Polinomio de Taylor y Maclaurin',
    latex: 'P_n(x) = \\sum_{k=0}^n \\frac{f^{(k)}(x_0)}{k!} (x - x_0)^k',
    variables: [
      { symbol: 'x_0', meaning: 'Centro del desarrollo (si x₀ = 0 es el polinomio de Maclaurin)' },
      { symbol: 'f^{(k)}(x_0)', meaning: 'Derivada k-ésima de la función evaluada en el centro' },
      { symbol: 'k!', meaning: 'Factorial del entero k (0! = 1, 1! = 1, 2! = 2, 3! = 6, 4! = 24)' }
    ],
    whenToUse: 'Para aproximar funciones no algebraicas (e^x, sen x, cos x, ln x) por polinomios de grado n.',
    whenNotToUse: 'Cuando se requiera el valor exacto cerrado de la función o fuera del radio de convergencia.',
    canonicalExampleLatex: 'g(x) = e^{-x} \\implies P_4(x) = 1 - x + \\frac{x^2}{2} - \\frac{x^3}{6} + \\frac{x^4}{24}',
    frequentMistakes: [
      'Olvidar dividir cada término por el factorial k! correspondiente.',
      'No alternar los signos correctamente al desarrollar potencias de términos negativos.'
    ],
    associatedExerciseIds: ['EX_U3_04'],
    sourceReference: 'Material Teórico UNNE, pág. 54-55; TP 2 Ej. 10'
  },

  // --- UNIDAD 4: INTEGRALES INDEFINIDAS ---
  {
    id: 'F_INTEGRAL_PARTES',
    unitId: 'U4',
    topicTitle: 'Métodos de Integración',
    name: 'Integración por Partes',
    latex: '\\int u \\, dv = u \\cdot v - \\int v \\, du',
    variables: [
      { symbol: 'u', meaning: 'Función a diferenciar para simplificar (du = u\' dx)' },
      { symbol: 'dv', meaning: 'Diferencial a integrar fácilmente (v = ∫ dv)' }
    ],
    whenToUse: 'Cuando el integrando es un producto de funciones de distinta naturaleza (algebraica con trigonométrica o exponencial, o logaritmos solos).',
    whenNotToUse: 'Cuando el producto contiene la derivada directa del argumento (en ese caso conviene sustitución simple).',
    canonicalExampleLatex: '\\int x e^{3x} dx \\implies u = x, dv = e^{3x}dx \\implies \\frac{1}{3}x e^{3x} - \\frac{1}{9}e^{3x} + C',
    frequentMistakes: [
      'Invertir la elección de u y dv haciendo que la nueva integral ∫ v du sea más compleja que la original.',
      'Olvidar el signo negativo que precede a la integral restante.'
    ],
    associatedExerciseIds: ['EX_U4_01', 'EX_U4_02'],
    sourceReference: 'Material Teórico UNNE, pág. 61; TP 3 Ej. 4'
  },
  {
    id: 'F_INTEGRAL_TRIGONOMETRICA',
    unitId: 'U4',
    topicTitle: 'Integrales Trigonométricas',
    name: 'Potencia Impar de Seno y Coseno',
    latex: '\\int \\operatorname{sen}^{2k+1} x \\, dx = \\int (1 - \\cos^2 x)^k \\operatorname{sen} x \\, dx',
    variables: [
      { symbol: 'u = \\cos x', meaning: 'Sustitución recomendada con diferencial du = -sen x dx' }
    ],
    whenToUse: 'Para integrar funciones trigonométricas donde el seno o el coseno tienen exponente impar positivo.',
    whenNotToUse: 'Cuando ambas potencias son pares (en ese caso se utilizan las fórmulas de ángulo duplo).',
    canonicalExampleLatex: '\\int \\operatorname{sen}^3 x dx = -\\int (1 - u^2) du = \\frac{\\cos^3 x}{3} - \\cos x + C',
    frequentMistakes: [
      'Olvidar el signo menos del diferencial du = -sen x dx.',
      'Intentar integrar la potencia directamente como sen⁴(x)/4.'
    ],
    associatedExerciseIds: ['EX_U4_04'],
    sourceReference: 'Material Teórico UNNE, pág. 63; TP 3 Ej. 6'
  },

  // --- UNIDAD 5: INTEGRALES DEFINIDAS ---
  {
    id: 'F_BARROW',
    unitId: 'U5',
    topicTitle: 'Regla de Barrow',
    name: 'Regla de Barrow (Segundo Teorema Fundamental)',
    latex: '\\int_a^b f(x) \\, dx = [F(x)]_a^b = F(b) - F(a)',
    variables: [
      { symbol: 'F(x)', meaning: 'Cualquier función primitiva de f(x), es decir, F\'(x) = f(x)' },
      { symbol: 'a, b', meaning: 'Límites inferior y superior de integración' }
    ],
    whenToUse: 'Para evaluar el valor numérico exacto de una integral definida de función continua en [a, b].',
    whenNotToUse: 'Cuando la función f(x) presente una discontinuidad infinita en algún punto de [a, b] (se debe tratar como integral impropia).',
    canonicalExampleLatex: '\\int_1^3 (x^2 - 1) dx = \\left[\\frac{x^3}{3} - x\\right]_1^3 = (9 - 3) - \\left(\\frac{1}{3} - 1\\right) = 6 - \\left(-\\frac{2}{3}\\right) = \\frac{20}{3}',
    frequentMistakes: [
      'Invertir los límites restando F(a) - F(b).',
      'No cambiar los límites de integración si se hizo una sustitución de variable previa.'
    ],
    associatedExerciseIds: ['EX_U5_01', 'EX_U5_02'],
    sourceReference: 'Material Teórico UNNE, pág. 71; TP 4 Ej. 1 al 4'
  },
  {
    id: 'F_VOLUMEN_REVOLUCION_X',
    unitId: 'U5',
    topicTitle: 'Aplicaciones de la Integral Definida',
    name: 'Volumen de Sólido de Revolución (Eje X)',
    latex: 'V = \\pi \\int_a^b [f(x)]^2 \\, dx',
    variables: [
      { symbol: 'V', meaning: 'Volumen del cuerpo engendrado al rotar la curva alrededor del eje x' },
      { symbol: 'f(x)', meaning: 'Radio del disco elemental en la posición x' },
      { symbol: '[a, b]', meaning: 'Intervalo de rotación sobre el eje de las abscisas' }
    ],
    whenToUse: 'Para hallar el volumen de un sólido generado por la rotación de un área bajo la curva f(x) alrededor del eje x.',
    whenNotToUse: 'Si el eje de rotación es el eje y (en ese caso es V = π ∫ [g(y)]² dy o método de cascarones).',
    canonicalExampleLatex: 'f(x) = x^2 + 3 \\text{ en } [-2, 2] \\implies V = \\pi \\int_{-2}^2 (x^2 + 3)^2 dx = \\pi \\int_{-2}^2 (x^4 + 6x^2 + 9) dx = \\frac{404\\pi}{5}',
    frequentMistakes: [
      'Olvidar multiplicar la integral por la constante π.',
      'No elevar la función al cuadrado antes de integrar.'
    ],
    associatedExerciseIds: ['EX_U5_03'],
    sourceReference: 'Material Teórico UNNE, pág. 74-75; TP 4 Ej. 6'
  },
  {
    id: 'F_INTEGRAL_IMPROPIA_1',
    unitId: 'U5',
    topicTitle: 'Integrales Impropias',
    name: 'Integral Impropia con Límite Infinito',
    latex: '\\int_a^\\infty f(x) \\, dx = \\lim_{t \\to \\infty} \\int_a^t f(x) \\, dx',
    variables: [
      { symbol: 't', meaning: 'Parámetro de acotamiento tendiendo a +∞' },
      { symbol: 'a', meaning: 'Límite inferior finito donde la función es continua' }
    ],
    whenToUse: 'Cuando el intervalo de integración sea no acotado [a, +∞) o (-∞, b].',
    whenNotToUse: 'En integrales ordinarias de Riemann con ambos extremos finitos y función acotada.',
    canonicalExampleLatex: '\\int_0^\\infty e^{-x} dx = \\lim_{t \\to \\infty} [-e^{-x}]_0^t = \\lim_{t \\to \\infty} (1 - e^{-t}) = 1 \\implies \\text{Converge}',
    frequentMistakes: [
      'Evaluar f(∞) directamente sin plantear el límite formal con t tendiendo a infinito.',
      'Concluir divergencia sin comprobar si el límite existe y es un número real finito.'
    ],
    associatedExerciseIds: ['EX_U5_04'],
    sourceReference: 'Material Teórico UNNE, pág. 76-77; TP 4 Ej. 7'
  },

  // --- UNIDAD 6: FUNCIONES DE VARIAS VARIABLES ---
  {
    id: 'F_DOMINIO_2V',
    unitId: 'U6',
    topicTitle: 'Dominio en Varias Variables',
    name: 'Determinación de Dominio Natural en R²',
    latex: 'D = \\{(x, y) \\in \\mathbb{R}^2 : \\text{condiciones de existencia analítica}\\}',
    variables: [
      { symbol: '(x, y)', meaning: 'Par ordenado de variables independientes en el plano' },
      { symbol: 'D', meaning: 'Subconjunto del plano ℝ² donde la función z = f(x,y) está bien definida' }
    ],
    whenToUse: 'Para hallar analítica y geométricamente la región de definición de una función multivariable.',
    whenNotToUse: 'En funciones polinómicas de varias variables que están definidas en todo ℝ² sin restricciones.',
    canonicalExampleLatex: 'z = \\ln(x + y) \\implies x + y > 0 \\implies D = \\{(x,y) \\in \\mathbb{R}^2 : y > -x\\}',
    frequentMistakes: [
      'Incluir la frontera cuando la desigualdad es estricta (> o <) en logaritmos o denominadores.',
      'Analizar las variables por separado cuando la restricción vincula la suma o resta (ej: x + y > 0).'
    ],
    associatedExerciseIds: ['EX_U6_01'],
    sourceReference: 'Material Teórico UNNE, pág. 78-80; TP 5 Ej. 1'
  },
  {
    id: 'F_CURVAS_NIVEL',
    unitId: 'U6',
    topicTitle: 'Curvas de Nivel',
    name: 'Ecuación de Curvas de Nivel',
    latex: 'f(x, y) = c, \\quad c \\in \\operatorname{Im}(f)',
    variables: [
      { symbol: 'c', meaning: 'Constante o cota sobre el eje z que corta horizontalmente la superficie' },
      { symbol: 'f(x, y) = c', meaning: 'Ecuación cartesiana de la curva proyectada en el plano xy' }
    ],
    whenToUse: 'Para representar el relieve o comportamiento de superficies z = f(x,y) mediante un mapa plano bidimensional.',
    whenNotToUse: 'Para funciones de 3 variables independientes f(x,y,z) (en ese caso se generan superficies de nivel).',
    canonicalExampleLatex: 'z = x^2 + y^2 \\implies x^2 + y^2 = c \\implies \\text{Circunferencias concéntricas centradas en } (0,0) \\text{ de radio } \\sqrt{c}',
    frequentMistakes: [
      'Asignar valores a c fuera de la imagen de la función (ej: c < 0 para z = x² + y² da conjunto vacío).',
      'Confundir las curvas de nivel en R² con las trazas sobre planos coordenados verticales xz o yz.'
    ],
    associatedExerciseIds: ['EX_U6_02'],
    sourceReference: 'Material Teórico UNNE, pág. 81-82; TP 5 Ej. 2'
  },
  {
    id: 'F_LIMITES_ITERADOS',
    unitId: 'U6',
    topicTitle: 'Límites en Varias Variables',
    name: 'Criterio de No Existencia por Límites Iterados',
    latex: 'L_1 = \\lim_{y \\to y_0}\\left[\\lim_{x \\to x_0} f(x,y)\\right], \\quad L_2 = \\lim_{x \\to x_0}\\left[\\lim_{y \\to y_0} f(x,y)\\right] \\implies L_1 \\ne L_2 \\implies \\nexists \\lim_{(x,y)\\to(x_0,y_0)} f(x,y)',
    variables: [
      { symbol: 'L_1, L_2', meaning: 'Límites sucesivos tomados a lo largo de las direcciones de los ejes coordenados' },
      { symbol: '(x_0, y_0)', meaning: 'Punto de acumulación en el plano ℝ²' }
    ],
    whenToUse: 'Para demostrar de forma concluyente que un límite doble no existe cuando L₁ ≠ L₂.',
    whenNotToUse: 'Para concluir que un límite doble existe si L₁ = L₂ (igualdad de iterados NO garantiza existencia).',
    canonicalExampleLatex: 'f(x,y) = \\frac{3x^2+2y^2}{x^2+y^2} \\implies L_1 = 2, \\, L_2 = 3 \\implies L_1 \\ne L_2 \\implies \\nexists \\lim_{(x,y)\\to(0,0)} f(x,y)',
    frequentMistakes: [
      'Afirmar que el límite existe simplemente porque los límites iterados dieron iguales.',
      'Sustituir simultáneamente x = 0 e y = 0 en lugar de evaluar de forma secuencial.'
    ],
    associatedExerciseIds: ['EX_U6_03'],
    sourceReference: 'Material Teórico UNNE, pág. 83-85; TP 5 Ej. 4'
  },

  // --- UNIDAD 7: DERIVADAS DE VARIAS VARIABLES ---
  {
    id: 'F_HESSIANO',
    unitId: 'U7',
    topicTitle: 'Extremos Relativos en R²',
    name: 'Discriminante del Hessiano',
    latex: 'H = z_{xx} \\cdot z_{yy} - (z_{xy})^2 = \\det \\begin{pmatrix} z_{xx} & z_{xy} \\\\ z_{yx} & z_{yy} \\end{pmatrix}',
    variables: [
      { symbol: 'z_{xx}, z_{yy}', meaning: 'Derivadas parciales segundas directas evaluadas en el punto crítico' },
      { symbol: 'z_{xy}', meaning: 'Derivada parcial cruzada (igual a z_yx por Teorema de Schwarz)' }
    ],
    whenToUse: 'Para clasificar puntos críticos (donde z_x = 0 y z_y = 0) en funciones de dos variables.',
    whenNotToUse: 'Si el punto evaluado no es punto crítico (las derivadas primeras no se anulan).',
    canonicalExampleLatex: 'z = x^2 + y^2 - 6x - 9y + 2 \\implies z_x=2x-6=0, z_y=2y-9=0 \\implies P(3, 4.5); z_{xx}=2, z_{yy}=2, z_{xy}=0 \\implies H = 4 > 0, z_{xx}>0 \\implies \\text{Mínimo}',
    frequentMistakes: [
      'Concluir que H < 0 es un caso dudoso (H < 0 es Punto de Ensilladura; el caso dudoso es H = 0).',
      'No elevar al cuadrado la derivada cruzada z_xy al calcular el determinante.'
    ],
    associatedExerciseIds: ['EX_U7_01', 'EX_U7_03'],
    sourceReference: 'Material Teórico UNNE, pág. 90-91; TP 6 Ej. 6'
  },
  {
    id: 'F_TEOREMA_SCHWARZ',
    unitId: 'U7',
    topicTitle: 'Derivadas Parciales de Orden Superior',
    name: 'Teorema de Schwarz (Simetría de Derivadas Cruzadas)',
    latex: 'f\'\'_{xy}(x_0, y_0) = f\'\'_{yx}(x_0, y_0) \\quad \\text{si } f\'\'_{xy} \\text{ y } f\'\'_{yx} \\text{ son continuas}',
    variables: [
      { symbol: 'f\'\'_{xy}', meaning: 'Derivada parcial cruzada primero respecto a x y luego respecto a y' },
      { symbol: 'f\'\'_{yx}', meaning: 'Derivada parcial cruzada primero respecto a y y luego respecto a x' }
    ],
    whenToUse: 'Para conmutar el orden de derivación en derivadas parciales mixtas o verificar exactitud de diferenciales.',
    whenNotToUse: 'En funciones cuyas derivadas parciales segundas presenten discontinuidades esenciales en el punto.',
    canonicalExampleLatex: 'f(x,y) = x \\cos y + y \\cos x \\implies f\'\'_{xy} = f\'\'_{yx} = -\\operatorname{sen} y - \\operatorname{sen} x',
    frequentMistakes: [
      'Olvidar enunciar la hipótesis indispensable de continuidad de las derivadas de 2º orden.',
      'Confundir derivadas cruzadas f\'\'_xy con derivadas directas f\'\'_xx.'
    ],
    associatedExerciseIds: ['EX_U7_02'],
    sourceReference: 'Material Teórico UNNE, pág. 88; TP 6 Ej. 3'
  },
  {
    id: 'F_DERIVADA_IMPLICITA',
    unitId: 'U7',
    topicTitle: 'Funciones Implícitas',
    name: 'Derivada de Función Implícita',
    latex: 'F(x, y) = 0 \\implies \\frac{dy}{dx} = - \\frac{F\'_x}{F\'_y}, \\quad F\'_y \\ne 0',
    variables: [
      { symbol: "F'_x", meaning: 'Derivada parcial de F respecto a x considerando y constante' },
      { symbol: "F'_y", meaning: 'Derivada parcial de F respecto a y considerando x constante' }
    ],
    whenToUse: 'Para hallar dy/dx cuando la relación entre x e y está dada implícitamente por una ecuación no despejada.',
    whenNotToUse: 'Cuando F\'_y = 0 (en ese punto la tangente es vertical o no se cumple el teorema de la función implícita).',
    canonicalExampleLatex: 'x^3 + y^3 - 6xy = 0 \\implies F_x = 3x^2 - 6y, F_y = 3y^2 - 6x \\implies \\frac{dy}{dx} = -\\frac{3x^2 - 6y}{3y^2 - 6x} = \\frac{2y - x^2}{y^2 - 2x}',
    frequentMistakes: [
      'Olvidar el signo menos que precede al cociente de derivadas parciales.',
      'Invertir el numerador y denominador poniendo F_y / F_x.'
    ],
    associatedExerciseIds: ['EX_U7_04'],
    sourceReference: 'Material Teórico UNNE, pág. 90; TP 6 Ej. 7'
  },

  // --- UNIDAD 8: INTEGRALES MÚLTIPLES ---
  {
    id: 'F_LEIBNIZ_PARAMETRICA',
    unitId: 'U8',
    topicTitle: 'Integrales Paramétricas',
    name: 'Regla de Leibniz para Derivación Bajo el Signo Integral',
    latex: '\\frac{d}{dy}\\left[ \\int_a^b f(x, y) \\, dx \\right] = \\int_a^b \\frac{\\partial f(x, y)}{\\partial y} \\, dx',
    variables: [
      { symbol: 'y', meaning: 'Parámetro respecto al cual se diferencia' },
      { symbol: '[a, b]', meaning: 'Límites de integración constantes respecto al parámetro y' }
    ],
    whenToUse: 'Para calcular la derivada de una integral definida dependiente de un parámetro sin necesidad de resolver la integral previamente.',
    whenNotToUse: 'Cuando los límites de integración a(y) o b(y) dependan también de y (en ese caso se debe aplicar la regla de Leibniz completa con términos en los extremos).',
    canonicalExampleLatex: 'I(y) = \\int_1^2 \\frac{x}{y} dx \\implies I\'(y) = \\int_1^2 -\\frac{x}{y^2} dx = -\\frac{3}{2y^2}',
    frequentMistakes: [
      'Derivar respecto a la variable de integración x en vez del parámetro y.',
      'Olvidar el signo negativo al derivar potencias inversas y^(-1).'
    ],
    associatedExerciseIds: ['EX_U8_01'],
    sourceReference: 'Material Teórico UNNE, pág. 92-93; TP 7 Ej. 1'
  },
  {
    id: 'F_INTEGRAL_DOBLE_AREA',
    unitId: 'U8',
    topicTitle: 'Integrales Dobles',
    name: 'Cálculo de Área por Integral Doble',
    latex: '\\text{Área}(D) = \\iint_D dx \\, dy = \\int_a^b \\left( \\int_{\\varphi_1(x)}^{\\varphi_2(x)} dy \\right) dx = \\int_a^b [\\varphi_2(x) - \\varphi_1(x)] dx',
    variables: [
      { symbol: 'D', meaning: 'Región plana de integración regular en el sentido del eje y' },
      { symbol: '\\varphi_1(x), \\varphi_2(x)', meaning: 'Curvas límite inferior y superior del recinto' }
    ],
    whenToUse: 'Para calcular el área de recintos bidimensionales mediante integración en dos variables.',
    whenNotToUse: 'Cuando se calcule volumen (en volumen la función integrando es z = f(x,y) > 0, no 1).',
    canonicalExampleLatex: 'D: 1-x \\le y \\le 3-x^2, x \\in [-1, 2] \\implies \\text{Área} = \\int_{-1}^2 [(3-x^2) - (1-x)] dx = \\frac{9}{2}',
    frequentMistakes: [
      'Invertir el orden de las curvas límite (poner piso - techo en vez de techo - piso).',
      'No hallar correctamente los puntos de intersección para los límites exteriores.'
    ],
    associatedExerciseIds: ['EX_U8_02', 'EX_U8_03'],
    sourceReference: 'Material Teórico UNNE, pág. 95; TP 7 Ej. 4'
  },

  // --- UNIDAD 9: ECUACIONES DIFERENCIALES ---
  {
    id: 'F_EDO_SEPARABLES',
    unitId: 'U9',
    topicTitle: 'Ecuaciones Separables',
    name: 'Resolución de EDO de Variables Separables',
    latex: 'g(y) \\, dy = f(x) \\, dx \\implies \\int g(y) \\, dy = \\int f(x) \\, dx + C',
    variables: [
      { symbol: 'f(x), g(y)', meaning: 'Funciones dependientes exclusivamente de una sola variable' },
      { symbol: 'C', meaning: 'Constante arbitraria de integración real' }
    ],
    whenToUse: 'Cuando los términos de la ecuación diferencial puedan agruparse de modo que cada diferencial acompañe solo a su propia variable.',
    whenNotToUse: 'Cuando los términos contengan sumas inseparables como x + y o xy + 1 sin factorización posible.',
    canonicalExampleLatex: 'x^3 dx + (y+1)^2 dy = 0 \\implies \\int (y+1)^2 dy = -\\int x^3 dx \\implies \\frac{(y+1)^3}{3} = -\\frac{x^4}{4} + C',
    frequentMistakes: [
      'Olvidar colocar la constante C en el paso de integración.',
      'Integrar un miembro respecto a una variable que aún contiene términos de la otra.'
    ],
    associatedExerciseIds: ['EX_U9_02'],
    sourceReference: 'Material Teórico UNNE, pág. 99-100; TP 8 Ej. 1'
  },
  {
    id: 'F_EDO_EXACTA',
    unitId: 'U9',
    topicTitle: 'Ecuaciones Exactas',
    name: 'Condición de Simetría para EDO Exacta',
    latex: 'P(x,y)\\,dx + Q(x,y)\\,dy = 0 \\text{ es exacta } \\iff \\frac{\\partial P}{\\partial y} = \\frac{\\partial Q}{\\partial x}',
    variables: [
      { symbol: 'P(x,y)', meaning: 'Coeficiente del diferencial dx' },
      { symbol: 'Q(x,y)', meaning: 'Coeficiente del diferencial dy' }
    ],
    whenToUse: 'Para verificar si una EDO de primer orden proviene del diferencial total de una función potencial U(x,y) = C.',
    whenNotToUse: 'Si las derivadas cruzadas son distintas (en ese caso buscar factor integrante o resolver por otro método).',
    canonicalExampleLatex: '(2x + 4)dx + (3y - 1)dy = 0 \\implies P_y = 0, Q_x = 0 \\implies \\text{Exacta} \\implies x^2 + 4x + \\frac{3}{2}y^2 - y = C',
    frequentMistakes: [
      'Derivar P respecto a x y Q respecto a y en vez de cruzar las variables de derivación.',
      'Olvidar incluir la constante arbitraria C en la solución general.'
    ],
    associatedExerciseIds: ['EX_U9_01', 'EX_U9_04'],
    sourceReference: 'Material Teórico UNNE, pág. 103-104; TP 8 Ej. 4 y 5'
  },
  {
    id: 'F_EDO_LINEAL_1',
    unitId: 'U9',
    topicTitle: 'EDO Lineales',
    name: 'Solución General de la EDO Lineal de 1º Orden',
    latex: 'y\' + P(x)y = Q(x) \\implies y = e^{-\\int P(x)dx} \\left[ \\int Q(x) e^{\\int P(x)dx} dx + C \\right]',
    variables: [
      { symbol: 'P(x), Q(x)', meaning: 'Funciones continuas de x en el intervalo de definición' },
      { symbol: 'e^{\\int P(x)dx}', meaning: 'Factor integrante de la ecuación' }
    ],
    whenToUse: 'Para cualquier ecuación diferencial de primer orden lineal respecto a y y a y\'.',
    whenNotToUse: 'Si la variable dependiente y aparece al cuadrado o dentro de una función no lineal (ej: Bernoulli o Riccati).',
    canonicalExampleLatex: 'y\' + 5y = 20 \\implies P=5, Q=20 \\implies y = e^{-5x}[\\int 20e^{5x}dx + C] = 4 + C e^{-5x}',
    frequentMistakes: [
      'Olvidar el signo negativo en el factor exponencial exterior e^(-∫Pdx).',
      'Omitir la constante C antes de multiplicar por el término exterior.'
    ],
    associatedExerciseIds: ['EX_U9_03'],
    sourceReference: 'Material Teórico UNNE, pág. 102; TP 8 Ej. 6'
  },

  // --- UNIDAD 10: SERIES NUMÉRICAS ---
  {
    id: 'F_SUCESION_CONVERGENCIA',
    unitId: 'U10',
    topicTitle: 'Sucesiones Numéricas',
    name: 'Teorema de Convergencia del Módulo',
    latex: '\\lim_{n \\to \\infty} |a_n| = 0 \\implies \\lim_{n \\to \\infty} a_n = 0',
    variables: [
      { symbol: 'a_n', meaning: 'Término general de una sucesión numérica real (posiblemente alternada)' }
    ],
    whenToUse: 'Para demostrar convergencia a cero en sucesiones alternadas con factores (-1)^n.',
    whenNotToUse: 'Si lim |a_n| = L > 0 (en ese caso si oscila no converge, por ejemplo an = (-1)^n tiene |an| = 1 pero no converge).',
    canonicalExampleLatex: 'd_n = \\frac{(-1)^{n+1}}{n} \\implies |d_n| = \\frac{1}{n} \\to 0 \\implies \\lim_{n \\to \\infty} d_n = 0',
    frequentMistakes: [
      'Concluir que una sucesión oscilante siempre diverge sin analizar si la amplitud tiende a cero.',
      'Confundir el límite de la sucesión an con la suma de su serie asociada ∑ an.'
    ],
    associatedExerciseIds: ['EX_U10_02'],
    sourceReference: 'Material Teórico UNNE, pág. 105; TP 9 Ej. 4'
  },
  {
    id: 'F_SERIE_GEOMETRICA',
    unitId: 'U10',
    topicTitle: 'Series Numéricas',
    name: 'Suma de la Serie Geométrica',
    latex: '\\sum_{n=1}^\\infty a \\cdot q^{n-1} = \\frac{a}{1 - q} \\quad \\iff \\quad |q| < 1',
    variables: [
      { symbol: 'a', meaning: 'Primer término de la serie' },
      { symbol: 'q', meaning: 'Razón geométrica de la serie' }
    ],
    whenToUse: 'Cuando cada término de la serie se obtiene multiplicando al anterior por una constante fija q.',
    whenNotToUse: 'Si |q| ≥ 1; en tal caso la serie diverge o es oscilante y no tiene suma finita.',
    canonicalExampleLatex: '\\sum_{n=1}^\\infty \\left(\\frac{3}{4}\\right)^n = \\frac{3/4}{1 - 3/4} = 3',
    frequentMistakes: [
      'Aplicar la fórmula cuando la razón es mayor o igual a 1 (ej: con q = 4/3 la serie diverge a infinito).',
      'Confundir el valor del primer término cuando el índice de la sumatoria arranca en n = 0 versus n = 1.'
    ],
    associatedExerciseIds: ['EX_U10_01', 'EX_U10_03'],
    sourceReference: 'Material Teórico UNNE, pág. 105-106; TP 9 Ej. 5 y 6.b'
  },
  {
    id: 'F_DALEMBERT',
    unitId: 'U10',
    topicTitle: 'Criterios de Convergencia',
    name: 'Criterio de D\'Alembert (del Cociente)',
    latex: 'L = \\lim_{n \\to \\infty} \\frac{a_{n+1}}{a_n} \\implies \\begin{cases} L < 1 & \\text{Converge} \\\\ L > 1 & \\text{Diverge} \\\\ L = 1 & \\text{No decide} \\end{cases}',
    variables: [
      { symbol: 'a_n', meaning: 'Término general de una serie de términos estrictamente positivos' },
      { symbol: 'L', meaning: 'Límite del cociente entre el término consecutivo y el anterior' }
    ],
    whenToUse: 'Ideal para series numéricas que contienen factoriales (n!) o potencias exponenciales de n.',
    whenNotToUse: 'Para series de tipo racional o polinómicas P(n)/Q(n), donde L casi siempre da 1 y no decide.',
    canonicalExampleLatex: '\\sum_{n=1}^\\infty \\frac{n!}{n^n} \\implies \\frac{a_{n+1}}{a_n} = \\frac{(n+1)!}{(n+1)^{n+1}} \\cdot \\frac{n^n}{n!} = \\left(\\frac{n}{n+1}\\right)^n \\to \\frac{1}{e} < 1 \\implies \\text{Converge}',
    frequentMistakes: [
      'Concluir que la serie converge cuando L = 1 (el criterio es indeterminado).',
      'Invertir la fracción calculando a_n / a_{n+1}.'
    ],
    associatedExerciseIds: ['EX_U10_04'],
    sourceReference: 'Material Teórico UNNE, pág. 107; TP 9 Ej. 6.d'
  }
];
