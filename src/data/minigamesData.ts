import { UnitId } from '../types/domain';

export interface FormulaRushQuestion {
  id: string;
  situationText: string;
  formulaOptions: { id: string; name: string; latex: string; isCorrect: boolean }[];
  timeLimitSeconds: number;
}

export interface ProcedureQuestion {
  id: string;
  unitId: UnitId;
  problemLatex: string;
  questionText: string;
  options: { id: string; text: string; isCorrect: boolean; explanation: string }[];
}

export interface DetectiveStep {
  stepNumber: number;
  label: string;
  contentLatex: string;
  isFlawed: boolean;
  errorExplanation?: string;
}

export interface DetectiveQuestion {
  id: string;
  title: string;
  problemStatement: string;
  steps: DetectiveStep[];
  examHint: string;
}

export interface OrderProcedureQuestion {
  id: string;
  title: string;
  problemPromptLatex: string;
  scrambledSteps: { id: string; correctOrderIndex: number; textLatex: string }[];
}

export interface MysteryGraphQuestion {
  id: string;
  title: string;
  graphDescription: string;
  svgType: 'asymptote_vertical' | 'inflection_point' | 'level_circles' | 'revolution_solid' | 'jump_discontinuity';
  questionPrompt: string;
  options: { id: string; text: string; isCorrect: boolean; feedback: string }[];
}

export interface JeopardyQuestion {
  id: string;
  category: 'Funciones y Límites' | 'Derivadas 1V' | 'Aplicaciones' | 'Integrales 1V' | 'Multivariable' | 'EDO' | 'Series';
  points: 100 | 200 | 300 | 400 | 500;
  questionLatex: string;
  options: { id: string; textLatex: string; isCorrect: boolean }[];
  explanation: string;
}

export const FORMULA_RUSH_QUESTIONS: FormulaRushQuestion[] = [
  {
    id: 'FR_1',
    situationText: 'Necesitas derivar un cociente de funciones y = u(x) / v(x):',
    formulaOptions: [
      { id: 'o1', name: 'Regla del Cociente', latex: "\\frac{u'v - uv'}{v^2}", isCorrect: true },
      { id: 'o2', name: 'Cociente Invertido', latex: "\\frac{uv' - u'v}{v^2}", isCorrect: false },
      { id: 'o3', name: 'Regla del Producto', latex: "u'v + uv'", isCorrect: false },
      { id: 'o4', name: 'Regla de la Cadena', latex: "f'(g(x)) \\cdot g'(x)", isCorrect: false }
    ],
    timeLimitSeconds: 8
  },
  {
    id: 'FR_2',
    situationText: 'Necesitas integrar por partes ∫ u dv:',
    formulaOptions: [
      { id: 'o1', name: 'Fórmula de Partes', latex: 'u \\cdot v - \\int v \\, du', isCorrect: true },
      { id: 'o2', name: 'Suma de Partes', latex: 'u \\cdot v + \\int v \\, du', isCorrect: false },
      { id: 'o3', name: 'Regla de Barrow', latex: 'F(b) - F(a)', isCorrect: false },
      { id: 'o4', name: 'Sustitución', latex: '\\int f(\\varphi(t))\\varphi\'(t)dt', isCorrect: false }
    ],
    timeLimitSeconds: 8
  },
  {
    id: 'FR_3',
    situationText: 'Necesitas clasificar un punto crítico en z = f(x, y) con el Hessiano:',
    formulaOptions: [
      { id: 'o1', name: 'Hessiano 2x2', latex: 'z_{xx} z_{yy} - (z_{xy})^2', isCorrect: true },
      { id: 'o2', name: 'Suma Cuadrática', latex: 'z_{xx}^2 + z_{yy}^2', isCorrect: false },
      { id: 'o3', name: 'Diferencial Total', latex: 'z_x dx + z_y dy', isCorrect: false },
      { id: 'o4', name: 'Teorema de Schwarz', latex: 'z_{xy} = z_{yx}', isCorrect: false }
    ],
    timeLimitSeconds: 8
  },
  {
    id: 'FR_4',
    situationText: 'Necesitas hallar el volumen de revolución generado al girar f(x) alrededor del eje x:',
    formulaOptions: [
      { id: 'o1', name: 'Volumen Discos', latex: '\\pi \\int_a^b [f(x)]^2 dx', isCorrect: true },
      { id: 'o2', name: 'Longitud de Arco', latex: '\\int_a^b \\sqrt{1 + (f\')^2} dx', isCorrect: false },
      { id: 'o3', name: 'Área Plana', latex: '\\int_a^b f(x) dx', isCorrect: false },
      { id: 'o4', name: 'Cilindros', latex: '2\\pi \\int_a^b x f(x) dx', isCorrect: false }
    ],
    timeLimitSeconds: 8
  },
  {
    id: 'FR_5',
    situationText: 'Necesitas verificar si una EDO P(x,y)dx + Q(x,y)dy = 0 es exacta:',
    formulaOptions: [
      { id: 'o1', name: 'Condición de Simetría', latex: '\\frac{\\partial P}{\\partial y} = \\frac{\\partial Q}{\\partial x}', isCorrect: true },
      { id: 'o2', name: 'Derivadas Directas', latex: '\\frac{\\partial P}{\\partial x} = \\frac{\\partial Q}{\\partial y}', isCorrect: false },
      { id: 'o3', name: 'Variables Separadas', latex: 'P(x) dx + Q(y) dy = 0', isCorrect: false },
      { id: 'o4', name: 'Factor Integrante', latex: '\\mu(x) = e^{\\int P dx}', isCorrect: false }
    ],
    timeLimitSeconds: 8
  },
  {
    id: 'FR_6',
    situationText: 'Necesitas aproximar g(x) en x₀ = 0 con Maclaurin de orden n:',
    formulaOptions: [
      { id: 'o1', name: 'Polinomio de Maclaurin', latex: '\\sum_{k=0}^n \\frac{f^{(k)}(0)}{k!} x^k', isCorrect: true },
      { id: 'o2', name: 'Sin Factoriales', latex: '\\sum_{k=0}^n f^{(k)}(0) x^k', isCorrect: false },
      { id: 'o3', name: 'Cociente Incremental', latex: '\\frac{f(x) - f(0)}{x}', isCorrect: false },
      { id: 'o4', name: 'Solo Orden 1', latex: "f(0) + f'(0)x", isCorrect: false }
    ],
    timeLimitSeconds: 8
  },
  {
    id: 'FR_7',
    situationText: 'Necesitas derivar la función implícita F(x, y) = 0 para hallar dy/dx:',
    formulaOptions: [
      { id: 'o1', name: 'Fórmula de Derivación Implícita', latex: "-\\frac{F'_x}{F'_y}", isCorrect: true },
      { id: 'o2', name: 'Sin Signo Menos', latex: "\\frac{F'_x}{F'_y}", isCorrect: false },
      { id: 'o3', name: 'Cociente Invertido', latex: "-\\frac{F'_y}{F'_x}", isCorrect: false },
      { id: 'o4', name: 'Producto Directo', latex: "F'_x \\cdot F'_y", isCorrect: false }
    ],
    timeLimitSeconds: 8
  },
  {
    id: 'FR_8',
    situationText: 'Necesitas derivar bajo el signo integral I(y) = ∫_a^b f(x,y) dx respecto a y (Leibniz):',
    formulaOptions: [
      { id: 'o1', name: 'Regla de Leibniz', latex: '\\int_a^b \\frac{\\partial f(x,y)}{\\partial y} dx', isCorrect: true },
      { id: 'o2', name: 'Invertido', latex: '\\frac{d}{dx} \\int_a^b f(x,y) dy', isCorrect: false },
      { id: 'o3', name: 'Barrow Directo', latex: 'f(b, y) - f(a, y)', isCorrect: false },
      { id: 'o4', name: 'Derivada Errónea', latex: '\\int_a^b \\frac{\\partial f}{\\partial x} dy', isCorrect: false }
    ],
    timeLimitSeconds: 8
  },
  {
    id: 'FR_9',
    situationText: 'Necesitas el factor integrante de la EDO lineal y\' + P(x)y = Q(x):',
    formulaOptions: [
      { id: 'o1', name: 'Factor Integrante Canónico', latex: '\\mu(x) = e^{\\int P(x) dx}', isCorrect: true },
      { id: 'o2', name: 'Signo Opuesto', latex: '\\mu(x) = e^{-\\int P(x) dx}', isCorrect: false },
      { id: 'o3', name: 'Sin Exponencial', latex: '\\mu(x) = \\int P(x) dx', isCorrect: false },
      { id: 'o4', name: 'Con Término Q', latex: '\\mu(x) = e^{\\int Q(x) dx}', isCorrect: false }
    ],
    timeLimitSeconds: 8
  },
  {
    id: 'FR_10',
    situationText: 'Necesitas el límite del criterio de D\'Alembert para la serie ∑ a_n:',
    formulaOptions: [
      { id: 'o1', name: 'Criterio del Cociente', latex: 'L = \\lim_{n \\to \\infty} \\frac{a_{n+1}}{a_n}', isCorrect: true },
      { id: 'o2', name: 'Cociente Invertido', latex: 'L = \\lim_{n \\to \\infty} \\frac{a_n}{a_{n+1}}', isCorrect: false },
      { id: 'o3', name: 'Criterio de la Raíz', latex: 'L = \\lim_{n \\to \\infty} \\sqrt[n]{a_n}', isCorrect: false },
      { id: 'o4', name: 'Término General Solo', latex: 'L = \\lim_{n \\to \\infty} a_n', isCorrect: false }
    ],
    timeLimitSeconds: 8
  }
];

export const PROCEDURE_QUESTIONS: ProcedureQuestion[] = [
  {
    id: 'PQ_1',
    unitId: 'U1',
    problemLatex: '\\lim_{x \\to 2} \\frac{x^3 - 8}{x^2 + 2x - 8}',
    questionText: '¿Qué procedimiento utilizarías como primer paso para salvar la indeterminación 0/0?',
    options: [
      { id: 'p1', text: 'Factorización de polinomios mediante regla de Ruffini', isCorrect: true, explanation: 'Ambos polinomios tienen raíz común en x = 2, por lo que factorizar permite cancelar el factor (x - 2).' },
      { id: 'p2', text: 'Multiplicar por el conjugado con radicales', isCorrect: false, explanation: 'No hay raíces cuadradas; multiplicar por conjugados no simplifica polinomios enteros.' },
      { id: 'p3', text: 'Aplicar la definición del número e', isCorrect: false, explanation: 'El número e se reserva para indeterminaciones del tipo 1^∞.' },
      { id: 'p4', text: 'Dividir numerador y denominador por x al cubo', isCorrect: false, explanation: 'Dividir por la máxima potencia es la técnica para límites cuando x tiende a infinito, no para x tendiendo a un número finito.' }
    ]
  },
  {
    id: 'PQ_2',
    unitId: 'U4',
    problemLatex: '\\int \\frac{2x}{x^2 + 1} \\, dx',
    questionText: '¿Qué método de integración es el más directo y eficaz?',
    options: [
      { id: 'p1', text: 'Sustitución simple haciendo t = x² + 1', isCorrect: true, explanation: 'El numerador 2x dx es exactamente la derivada de x² + 1, resultando en ∫ dt/t = ln|t| + C.' },
      { id: 'p2', text: 'Integración por partes', isCorrect: false, explanation: 'Innecesariamente largo y complejo frente a la sustitución inmediata.' },
      { id: 'p3', text: 'Descomposición en fracciones simples', isCorrect: false, explanation: 'El denominador x² + 1 no tiene raíces reales y el numerador ya es su derivada exacta.' },
      { id: 'p4', text: 'Sustitución trigonométrica con x = tg(t)', isCorrect: false, explanation: 'Válido pero innecesariamente engorroso para una antiderivada que se resuelve en una sola línea.' }
    ]
  },
  {
    id: 'PQ_3',
    unitId: 'U9',
    problemLatex: 'y\' + 5y = 20, \\quad y(0) = 2',
    questionText: '¿Qué procedimiento corresponde para resolver esta ecuación diferencial?',
    options: [
      { id: 'p1', text: 'EDO Lineal de primer orden mediante factor integrante e^(∫P dx)', isCorrect: true, explanation: 'Tiene la forma estándar y\' + P(x)y = Q(x) con P(x) = 5 constante.' },
      { id: 'p2', text: 'Cambio de variable homogénea y = u · x', isCorrect: false, explanation: 'No es una ecuación homogénea de grado cero.' },
      { id: 'p3', text: 'Criterio del determinante Hessiano', isCorrect: false, explanation: 'El Hessiano es para extremos de funciones de varias variables, no para resolver EDOs.' },
      { id: 'p4', text: 'Regla de L\'Hôpital', isCorrect: false, explanation: 'L\'Hôpital es una regla de límites, no de ecuaciones diferenciales.' }
    ]
  },
  {
    id: 'PQ_4',
    unitId: 'U4',
    problemLatex: '\\int x^2 \\ln x \\, dx',
    questionText: '¿Qué método de integración es el adecuado para resolver esta integral?',
    options: [
      { id: 'p1', text: 'Integración por partes eligiendo u = ln x y dv = x² dx', isCorrect: true, explanation: 'La regla ALPES prioriza el logaritmo como u para simplificarlo a 1/x dx.' },
      { id: 'p2', text: 'Sustitución simple haciendo t = ln x', isCorrect: false, explanation: 'Falta el término 1/x en el integrando para formar el diferencial dt.' },
      { id: 'p3', text: 'Descomposición en fracciones simples', isCorrect: false, explanation: 'El integrando no es una función racional P(x)/Q(x).' },
      { id: 'p4', text: 'Sustitución trigonométrica con x = sen(t)', isCorrect: false, explanation: 'Innecesario y complicaría el término logarítmico.' }
    ]
  },
  {
    id: 'PQ_5',
    unitId: 'U7',
    problemLatex: 'z = x^3 + y^2 - 3x',
    questionText: '¿Cuál es la secuencia analítica correcta para clasificar los puntos críticos de esta superficie?',
    options: [
      { id: 'p1', text: 'Igualar a cero las derivadas parciales primeras z_x = 0 y z_y = 0, y evaluar el determinante Hessiano H en cada punto crítico hallado', isCorrect: true, explanation: 'Es el algoritmo canónico de clasificación de extremos y sillas en R².' },
      { id: 'p2', text: 'Calcular el límite cuando (x,y) tiende a (0,0) mediante límites iterados', isCorrect: false, explanation: 'Los límites iterados sirven para estudiar límites y continuidad, no para hallar extremos.' },
      { id: 'p3', text: 'Aplicar la Regla de L\'Hôpital derivando sucesivamente', isCorrect: false, explanation: 'L\'Hôpital es una regla de indeterminaciones de límites en una variable.' },
      { id: 'p4', text: 'Integrar la función respecto a x e y sobre un rectángulo', isCorrect: false, explanation: 'La integración calcula volumen o masa, no extremos relativos.' }
    ]
  },
  {
    id: 'PQ_6',
    unitId: 'U6',
    problemLatex: '\\lim_{(x,y) \\to (0,0)} \\frac{3x^2+2y^2}{x^2+y^2}',
    questionText: '¿Qué técnica analítica permite demostrar rigurosamente que este límite doble NO existe?',
    options: [
      { id: 'p1', text: 'Calcular los límites iterados L₁ y L₂ a lo largo de los ejes coordenados y verificar que L₁ ≠ L₂', isCorrect: true, explanation: 'L₁ = 2 y L₂ = 3; al diferir los límites sucesivos se demuestra de forma definitiva la no existencia del límite simultáneo.' },
      { id: 'p2', text: 'Aplicar la regla de Barrow', isCorrect: false, explanation: 'Barrow es para integrales definidas, no para límites multivariables.' },
      { id: 'p3', text: 'Racionalizar con binomios conjugados', isCorrect: false, explanation: 'No hay expresiones con radicales en la función.' },
      { id: 'p4', text: 'Factorizar por Ruffini', isCorrect: false, explanation: 'Ruffini es para polinomios de una variable.' }
    ]
  },
  {
    id: 'PQ_7',
    unitId: 'U9',
    problemLatex: 'x^3 dx + (y+1)^2 dy = 0',
    questionText: '¿Cuál es el método directo para resolver esta ecuación diferencial?',
    options: [
      { id: 'p1', text: 'Separación directa de variables integrando cada miembro respecto a su propio diferencial', isCorrect: true, explanation: 'Los términos ya están desacoplados: ∫ x³ dx + ∫ (y+1)² dy = C.' },
      { id: 'p2', text: 'Multiplicar por factor integrante e^(5x)', isCorrect: false, explanation: 'El factor integrante es para EDO lineales completas, no hace falta en variables ya separadas.' },
      { id: 'p3', text: 'Cambio de variable homogénea y = u·x', isCorrect: false, explanation: 'La presencia de (y+1)² rompe la homogeneidad de grado cero.' },
      { id: 'p4', text: 'Criterio de D\'Alembert', isCorrect: false, explanation: 'D\'Alembert es un criterio de series numéricas.' }
    ]
  },
  {
    id: 'PQ_8',
    unitId: 'U10',
    problemLatex: '\\sum_{n=1}^\\infty \\frac{n^n}{3^n \\cdot n!}',
    questionText: '¿Qué criterio de convergencia es el más adecuado dada la presencia de factoriales y potencias n?',
    options: [
      { id: 'p1', text: 'Criterio de D\'Alembert (del cociente) evaluando lim a_{n+1} / a_n', isCorrect: true, explanation: 'Simplifica los factoriales (n+1)! = (n+1)n! y reduce potencias a la definición del número e.' },
      { id: 'p2', text: 'Criterio de la integral de Cauchy', isCorrect: false, explanation: 'No es factible integrar x! (función Gamma) elementalmente.' },
      { id: 'p3', text: 'Cálculo de suma geométrica a / (1 - q)', isCorrect: false, explanation: 'No es una serie geométrica pura porque intervienen factoriales y n^n.' },
      { id: 'p4', text: 'Descomposición en fracciones simples', isCorrect: false, explanation: 'Es una serie numérica con factoriales, no una integral racional.' }
    ]
  }
];

export const DETECTIVE_QUESTIONS: DetectiveQuestion[] = [
  {
    id: 'DET_1',
    title: 'Error en la Derivación por Regla de la Cadena',
    problemStatement: 'Un alumno resolvió la derivada de f(x) = sen³(2x). Encuentra el primer paso con error.',
    steps: [
      { stepNumber: 1, label: 'Paso 1: Identificar función exterior como potencia cúbica', contentLatex: "f'(x) = 3\\operatorname{sen}^2(2x) \\cdot [\\operatorname{sen}(2x)]'", isFlawed: false },
      { stepNumber: 2, label: 'Paso 2: Derivar la función seno intermedia', contentLatex: "[\\operatorname{sen}(2x)]' = \\cos(2x) \\cdot (2)", isFlawed: false },
      { stepNumber: 3, label: 'Paso 3: Multiplicar los factores de la cadena', contentLatex: "f'(x) = 3\\operatorname{sen}^2(2x) \\cdot \\cos(2x) \\cdot 2 = 6\\operatorname{sen}^2(2x)\\cos(2x)", isFlawed: false },
      { stepNumber: 4, label: 'Paso 4: Simplificación errónea de argumentos', contentLatex: "f'(x) = 6\\operatorname{sen}^2(4x)", isFlawed: true, errorExplanation: '¡Aquí está el error! Multiplicó el argumento (2x) por 2, violando las identidades trigonométricas. El argumento 2x debe conservarse intacto.' }
    ],
    examHint: 'Nunca multipliques factores escalares externos dentro del argumento de una función trigonométrica.'
  },
  {
    id: 'DET_2',
    title: 'Error en Integración por Regla de Barrow',
    problemStatement: 'Un estudiante calculó la integral definida ∫_{-1}^1 (1/x²) dx. Encuentra el paso defectuoso.',
    steps: [
      { stepNumber: 1, label: 'Paso 1: Hallar la primitiva algebraica', contentLatex: "\\int x^{-2}dx = -x^{-1} = -\\frac{1}{x}", isFlawed: false },
      { stepNumber: 2, label: 'Paso 2: Aplicar directamente la regla de Barrow', contentLatex: "\\left[-\\frac{1}{x}\\right]_{-1}^1 = \\left(-\\frac{1}{1}\\right) - \\left(-\\frac{1}{-1}\\right) = -1 - 1 = -2", isFlawed: true, errorExplanation: '¡Grave error conceptual en el Paso 2! La función f(x) = 1/x² tiene una asíntota vertical en x = 0 (dentro de [-1, 1]). Barrow NO se puede aplicar directamente a funciones discontinuas: es una integral impropia de 2ª especie que diverge a +∞. Además, un área bajo una curva positiva nunca puede ser -2.' }
    ],
    examHint: 'Antes de aplicar Barrow, verifica siempre que el integrando sea continuo en TODO el intervalo cerrado [a, b].'
  },
  {
    id: 'DET_3',
    title: 'Aplicación Prematura e Indebida de la Regla de L\'Hôpital',
    problemStatement: 'Un alumno intentó resolver \\lim_{x \\to 0} \\frac{x + 2}{x + 1}. Encuentra el paso con error.',
    steps: [
      { stepNumber: 1, label: 'Paso 1: Identificar el cociente de funciones', contentLatex: "f(x) = \\frac{P(x)}{Q(x)} = \\frac{x + 2}{x + 1}", isFlawed: false },
      { stepNumber: 2, label: 'Paso 2: Aplicar la regla de L\'Hôpital derivando numerador y denominador', contentLatex: "\\lim_{x \\to 0} \\frac{(x + 2)'}{(x + 1)'} = \\lim_{x \\to 0} \\frac{1}{1} = 1", isFlawed: true, errorExplanation: '¡Error grave de fundamentación teórica! L\'Hôpital SOLO es aplicable ante indeterminaciones del tipo 0/0 o ∞/∞. Al evaluar directamente en x = 0 se obtiene (0+2)/(0+1) = 2/1 = 2, sin ninguna indeterminación. Aplicar la regla sin indeterminación arroja un resultado falso.' }
    ],
    examHint: 'En un examen libre de la UNNE, verificar previamente el tipo de indeterminación es condición obligatoria antes de derivar por L\'Hôpital.'
  },
  {
    id: 'DET_4',
    title: 'Error de Signo en Integración por Partes Trigonométrica',
    problemStatement: 'Un estudiante calculó la integral \\int x \\cos x \\, dx. Encuentra el paso con error.',
    steps: [
      { stepNumber: 1, label: 'Paso 1: Elección de partes según ALPES', contentLatex: "u = x \\implies du = dx, \\quad dv = \\cos x \\, dx \\implies v = \\operatorname{sen} x", isFlawed: false },
      { stepNumber: 2, label: 'Paso 2: Aplicar la fórmula general de integración por partes', contentLatex: "\\int x \\cos x \\, dx = u \\cdot v - \\int v \\, du = x \\operatorname{sen} x - \\int \\operatorname{sen} x \\, dx", isFlawed: false },
      { stepNumber: 3, label: 'Paso 3: Calcular la antiderivada restante', contentLatex: "\\int \\operatorname{sen} x \\, dx = \\cos x \\implies x \\operatorname{sen} x - \\cos x + C", isFlawed: true, errorExplanation: '¡Error de signo en la primitiva elemental! La integral de sen(x) es -cos(x). Por tanto: -∫ sen(x) dx = -(-cos(x)) = +cos(x). La solución correcta es x sen(x) + cos(x) + C.' }
    ],
    examHint: 'Ten especial cuidado con los signos al integrar funciones trigonométricas: (cos x)\' = -sen x, por lo que ∫ sen x dx = -cos x.'
  },
  {
    id: 'DET_5',
    title: 'Clasificación Inválida de Punto Crítico por Determinante Hessiano',
    problemStatement: 'Un alumno calculó las derivadas segundas de una función z = f(x, y) en el punto crítico P(1, 2), obteniendo z_xx = 4, z_yy = -2 y z_xy = 1. Encuentra el paso con error.',
    steps: [
      { stepNumber: 1, label: 'Paso 1: Construir el discriminante Hessiano H', contentLatex: "H = z_{xx} \\cdot z_{yy} - (z_{xy})^2 = (4)(-2) - (1)^2 = -8 - 1 = -9", isFlawed: false },
      { stepNumber: 2, label: 'Paso 2: Conclusión sobre la naturaleza del punto crítico', contentLatex: "\\text{Como } z_{xx} = 4 > 0, \\text{ el punto } P(1, 2) \\text{ es un mínimo local.}", isFlawed: true, errorExplanation: '¡Error conceptual crítico! Como H = -9 < 0, la superficie presenta curvaturas de signos opuestos en distintas direcciones: el punto es indefectiblemente de ENSILLADURA (punto silla). El signo de z_xx solo se analiza cuando H > 0.' }
    ],
    examHint: 'Regla de oro: si H < 0, es punto silla sin importar el signo de z_xx ni de z_yy.'
  }
];

export const ORDER_PROCEDURE_QUESTIONS: OrderProcedureQuestion[] = [
  {
    id: 'ORD_1',
    title: 'Procedimiento Canónico: Extremos Relativos con Hessiano en R²',
    problemPromptLatex: '\\text{Ordenar los pasos para hallar y clasificar los extremos de } z = f(x, y)',
    scrambledSteps: [
      { id: 's1', correctOrderIndex: 0, textLatex: '\\text{Calcular las derivadas parciales de primer orden } \\frac{\\partial z}{\\partial x} \\text{ y } \\frac{\\partial z}{\\partial y}' },
      { id: 's2', correctOrderIndex: 1, textLatex: '\\text{Igualar a cero } \\frac{\\partial z}{\\partial x} = 0 \\text{ y } \\frac{\\partial z}{\\partial y} = 0 \\text{ para hallar los puntos críticos } P(x_0, y_0)' },
      { id: 's3', correctOrderIndex: 2, textLatex: '\\text{Calcular las derivadas segundas: } z_{xx}, z_{yy} \\text{ y } z_{xy}' },
      { id: 's4', correctOrderIndex: 3, textLatex: '\\text{Construir y evaluar el determinante Hessiano: } H = z_{xx}z_{yy} - (z_{xy})^2' },
      { id: 's5', correctOrderIndex: 4, textLatex: '\\text{Clasificar: si } H > 0 \\text{ y } z_{xx} > 0 \\implies \\text{Mínimo; si } H > 0 \\text{ y } z_{xx} < 0 \\implies \\text{Máximo; si } H < 0 \\implies \\text{Ensilladura}' }
    ]
  },
  {
    id: 'ORD_2',
    title: 'Procedimiento Canónico: Resolución de EDO Exacta',
    problemPromptLatex: '\\text{Ordenar los pasos para resolver } P(x,y)dx + Q(x,y)dy = 0',
    scrambledSteps: [
      { id: 's1', correctOrderIndex: 0, textLatex: '\\text{Verificar la condición de simetría de Schwarz: } \\frac{\\partial P}{\\partial y} = \\frac{\\partial Q}{\\partial x}' },
      { id: 's2', correctOrderIndex: 1, textLatex: '\\text{Integrar } P(x, y) \\text{ respecto a } x: U(x, y) = \\int P(x, y)dx + \\varphi(y)' },
      { id: 's3', correctOrderIndex: 2, textLatex: '\\text{Derivar } U(x, y) \\text{ respecto a } y \\text{ e igualar a } Q(x, y) \\text{ para despejar } \\varphi\'(y)' },
      { id: 's4', correctOrderIndex: 3, textLatex: '\\text{Integrar } \\varphi\'(y) \\text{ respecto a } y \\text{ para obtener la función } \\varphi(y)' },
      { id: 's5', correctOrderIndex: 4, textLatex: '\\text{Escribir la solución general igualada a una constante arbitraria: } U(x, y) = C' }
    ]
  },
  {
    id: 'ORD_3',
    title: 'Procedimiento Canónico: Polinomio de Maclaurin de Orden n',
    problemPromptLatex: '\\text{Ordenar los pasos para construir el polinomio de Maclaurin } P_n(x) \\text{ de una función } f(x)',
    scrambledSteps: [
      { id: 's1', correctOrderIndex: 0, textLatex: '\\text{Evaluar la función en el origen: } f(0)' },
      { id: 's2', correctOrderIndex: 1, textLatex: '\\text{Calcular sucesivamente las derivadas de orden 1 a } n: f\'(x), f\'\'(x), \\dots, f^{(n)}(x)' },
      { id: 's3', correctOrderIndex: 2, textLatex: '\\text{Evaluar cada derivada en el origen: } f\'(0), f\'\'(0), \\dots, f^{(n)}(0)' },
      { id: 's4', correctOrderIndex: 3, textLatex: '\\text{Calcular los coeficientes dividiendo por factoriales: } a_k = \\frac{f^{(k)}(0)}{k!}' },
      { id: 's5', correctOrderIndex: 4, textLatex: '\\text{Ensamblar el polinomio sumando los términos polinómicos: } P_n(x) = \\sum_{k=0}^n a_k x^k' }
    ]
  },
  {
    id: 'ORD_4',
    title: 'Procedimiento Canónico: EDO Lineal de Primer Orden',
    problemPromptLatex: '\\text{Ordenar los pasos para resolver } y\' + P(x)y = Q(x) \\text{ mediante factor integrante}',
    scrambledSteps: [
      { id: 's1', correctOrderIndex: 0, textLatex: '\\text{Escribir la ecuación en la forma normalizada identificando } P(x) \\text{ y } Q(x)' },
      { id: 's2', correctOrderIndex: 1, textLatex: '\\text{Calcular el factor integrante: } \\mu(x) = e^{\\int P(x)dx}' },
      { id: 's3', correctOrderIndex: 2, textLatex: '\\text{Multiplicar la ecuación completa por } \\mu(x) \\text{ agrupando el primer miembro como } [y \\cdot \\mu(x)]\'' },
      { id: 's4', correctOrderIndex: 3, textLatex: '\\text{Integrar ambos miembros respecto a } x: y \\cdot \\mu(x) = \\int Q(x)\\mu(x)dx + C' },
      { id: 's5', correctOrderIndex: 4, textLatex: '\\text{Despejar } y(x) \\text{ dividiendo por el factor integrante } \\mu(x)' }
    ]
  }
];

export const MYSTERY_GRAPH_QUESTIONS: MysteryGraphQuestion[] = [
  {
    id: 'MG_1',
    title: 'Comportamiento en Discontinuidad de Salto Finito',
    graphDescription: 'Una curva lineal que llega a y = 2 en x = 0 por izquierda, y salta a una parábola que arranca en y = 4 por derecha.',
    svgType: 'jump_discontinuity',
    questionPrompt: '¿Qué propiedad analítica describe con exactitud el comportamiento observado en el gráfico?',
    options: [
      { id: 'o1', text: 'Los límites laterales existen pero son distintos (l₁ ≠ l₂), lo que constituye una discontinuidad esencial de salto finito.', isCorrect: true, feedback: '¡Correcto! lim_{x→0⁻} f(x) = 2 ≠ lim_{x→0⁺} f(x) = 4.' },
      { id: 'o2', text: 'La función tiene una discontinuidad evitable porque f(0) está definida.', isCorrect: false, feedback: 'Para ser evitable, los límites laterales deben ser iguales.' },
      { id: 'o3', text: 'La función es continua porque ambas ramas son polinomios.', isCorrect: false, feedback: 'En el punto de empalme x = 0 hay un salto que rompe la continuidad.' },
      { id: 'o4', text: 'Existe asíntota vertical en x = 0.', isCorrect: false, feedback: 'Los valores de y son finitos (2 y 4), no tienden a infinito.' }
    ]
  },
  {
    id: 'MG_2',
    title: 'Curvas de Nivel Concéntricas en R²',
    graphDescription: 'Proyecciones sobre el plano xy que forman circunferencias concéntricas centradas en el origen (0, 0).',
    svgType: 'level_circles',
    questionPrompt: '¿Cuál de las siguientes superficies de dos variables genera este mapa de curvas de nivel?',
    options: [
      { id: 'o1', text: 'Paraboloide elíptico circular: z = x² + y²', isCorrect: true, feedback: '¡Exacto! Al fijar z = k > 0 se obtienen circunferencias x² + y² = k de radio √k.' },
      { id: 'o2', text: 'Paraboloide hiperbólico (silla de montar): z = x² - y²', isCorrect: false, feedback: 'Genera hipérbolas, no circunferencias.' },
      { id: 'o3', text: 'Plano inclinado: z = 2x + 3y', isCorrect: false, feedback: 'Genera rectas paralelas, no círculos.' },
      { id: 'o4', text: 'Cilindro parabólico: z = x²', isCorrect: false, feedback: 'Genera rectas paralelas al eje y.' }
    ]
  }
];

export const JEOPARDY_QUESTIONS: JeopardyQuestion[] = [
  // Funciones y Límites
  {
    id: 'J_L1_100',
    category: 'Funciones y Límites',
    points: 100,
    questionLatex: '\\lim_{x \\to 4} \\frac{x - 4}{\\sqrt{x} - 2}',
    options: [
      { id: '1', textLatex: '4', isCorrect: true },
      { id: '2', textLatex: '0', isCorrect: false },
      { id: '3', textLatex: '2', isCorrect: false },
      { id: '4', textLatex: '\\infty', isCorrect: false }
    ],
    explanation: 'Multiplicando por el conjugado (√x + 2): (x-4)(√x+2)/(x-4) = √x + 2 → √4 + 2 = 4.'
  },
  {
    id: 'J_L1_200',
    category: 'Funciones y Límites',
    points: 200,
    questionLatex: '\\lim_{x \\to 0} \\frac{\\operatorname{sen}(5x)}{2x}',
    options: [
      { id: '1', textLatex: '\\frac{5}{2}', isCorrect: true },
      { id: '2', textLatex: '0', isCorrect: false },
      { id: '3', textLatex: '1', isCorrect: false },
      { id: '4', textLatex: '\\frac{2}{5}', isCorrect: false }
    ],
    explanation: 'Por el límite notable lim_{u→0} sen(u)/u = 1: (5/2) · lim sen(5x)/(5x) = 5/2 · 1 = 5/2.'
  },
  {
    id: 'J_L1_300',
    category: 'Funciones y Límites',
    points: 300,
    questionLatex: '\\text{Si } l_1 = \\lim_{x\\to a^-} f(x) = 3 \\text{ y } l_2 = \\lim_{x\\to a^+} f(x) = 5, \\text{ ¿existe el límite } \\lim_{x\\to a} f(x)?',
    options: [
      { id: '1', textLatex: '\\text{No existe}', isCorrect: true },
      { id: '2', textLatex: '\\text{Existe y vale 4}', isCorrect: false },
      { id: '3', textLatex: '\\text{Existe y vale 5}', isCorrect: false },
      { id: '4', textLatex: '\\text{Es evitable}', isCorrect: false }
    ],
    explanation: 'Por unicidad del límite, si los límites laterales existen pero difieren (l₁ ≠ l₂), el límite bilateral no existe.'
  },
  {
    id: 'J_L1_400',
    category: 'Funciones y Límites',
    points: 400,
    questionLatex: '\\text{Pendiente } m \\text{ de la asíntota oblicua de } f(x) = \\frac{2x^2 + 3x}{x - 1}',
    options: [
      { id: '1', textLatex: 'm = 2', isCorrect: true },
      { id: '2', textLatex: 'm = 3', isCorrect: false },
      { id: '3', textLatex: 'm = 1', isCorrect: false },
      { id: '4', textLatex: 'm = 0', isCorrect: false }
    ],
    explanation: 'm = lim_{x→∞} f(x)/x = lim (2x² + 3x)/(x² - x) = 2/1 = 2.'
  },
  // Derivadas 1V
  {
    id: 'J_D1_100',
    category: 'Derivadas 1V',
    points: 100,
    questionLatex: '\\text{Derivada de } f(x) = e^{3x}',
    options: [
      { id: '1', textLatex: '3e^{3x}', isCorrect: true },
      { id: '2', textLatex: 'e^{3x}', isCorrect: false },
      { id: '3', textLatex: '3xe^{3x-1}', isCorrect: false },
      { id: '4', textLatex: 'e^3', isCorrect: false }
    ],
    explanation: 'Por regla de la cadena: (e^{u})\' = e^u · u\'. Con u = 3x, u\' = 3 ⇒ 3e^{3x}.'
  },
  {
    id: 'J_D1_200',
    category: 'Derivadas 1V',
    points: 200,
    questionLatex: '\\text{Derivada de } f(x) = \\operatorname{arctg}(x)',
    options: [
      { id: '1', textLatex: '\\frac{1}{1 + x^2}', isCorrect: true },
      { id: '2', textLatex: '\\frac{1}{\\sqrt{1 - x^2}}', isCorrect: false },
      { id: '3', textLatex: '\\frac{1}{x^2 - 1}', isCorrect: false },
      { id: '4', textLatex: '-\\frac{1}{1 + x^2}', isCorrect: false }
    ],
    explanation: "Fórmula de la tabla inmediata de derivadas de funciones ciclométricas: (arctg x)' = 1/(1+x²)."
  },
  {
    id: 'J_D1_300',
    category: 'Derivadas 1V',
    points: 300,
    questionLatex: '\\text{Derivada de } f(x) = 2^x \\cdot \\cos x',
    options: [
      { id: '1', textLatex: '2^x (\\ln 2 \\cdot \\cos x - \\operatorname{sen} x)', isCorrect: true },
      { id: '2', textLatex: '2^x \\cdot \\operatorname{sen} x', isCorrect: false },
      { id: '3', textLatex: 'x 2^{x-1} \\cos x', isCorrect: false },
      { id: '4', textLatex: '2^x (\\cos x - \\operatorname{sen} x)', isCorrect: false }
    ],
    explanation: 'Por regla del producto: (2^x)\' cos x + 2^x (cos x)\' = 2^x ln 2 cos x - 2^x sen x = 2^x(ln 2 cos x - sen x).'
  },
  {
    id: 'J_D1_400',
    category: 'Derivadas 1V',
    points: 400,
    questionLatex: '\\text{Pendiente } m_t \\text{ de la recta tangente a } f(x) = \\sqrt{2x + 1} \\text{ en } x = 4',
    options: [
      { id: '1', textLatex: 'm_t = \\frac{1}{3}', isCorrect: true },
      { id: '2', textLatex: 'm_t = 3', isCorrect: false },
      { id: '3', textLatex: 'm_t = \\frac{1}{6}', isCorrect: false },
      { id: '4', textLatex: 'm_t = \\frac{2}{3}', isCorrect: false }
    ],
    explanation: "f'(x) = 2 / (2√(2x+1)) = 1/√(2x+1). Evaluando en x = 4: f'(4) = 1/√9 = 1/3."
  },
  // Integrales 1V
  {
    id: 'J_I1_100',
    category: 'Integrales 1V',
    points: 100,
    questionLatex: '\\int \\frac{1}{x} \\, dx \\quad (x \\neq 0)',
    options: [
      { id: '1', textLatex: '\\ln|x| + C', isCorrect: true },
      { id: '2', textLatex: '-\\frac{1}{x^2} + C', isCorrect: false },
      { id: '3', textLatex: 'e^x + C', isCorrect: false },
      { id: '4', textLatex: '\\frac{1}{x^2} + C', isCorrect: false }
    ],
    explanation: 'Integral inmediata fundamental: ∫ (1/x) dx = ln|x| + C.'
  },
  {
    id: 'J_I1_200',
    category: 'Integrales 1V',
    points: 200,
    questionLatex: '\\int_0^2 (3x^2 - 1) \\, dx',
    options: [
      { id: '1', textLatex: '6', isCorrect: true },
      { id: '2', textLatex: '8', isCorrect: false },
      { id: '3', textLatex: '4', isCorrect: false },
      { id: '4', textLatex: '10', isCorrect: false }
    ],
    explanation: 'Regla de Barrow: [x³ - x]_0^2 = (8 - 2) - (0 - 0) = 6.'
  },
  {
    id: 'J_I1_300',
    category: 'Integrales 1V',
    points: 300,
    questionLatex: '\\int \\frac{dx}{x^2 - 16}',
    options: [
      { id: '1', textLatex: '\\frac{1}{8} \\ln\\left|\\frac{x - 4}{x + 4}\\right| + C', isCorrect: true },
      { id: '2', textLatex: '\\frac{1}{4} \\operatorname{arctg}(x/4) + C', isCorrect: false },
      { id: '3', textLatex: '\\ln|x^2 - 16| + C', isCorrect: false },
      { id: '4', textLatex: '\\frac{1}{16} \\ln|x - 4| + C', isCorrect: false }
    ],
    explanation: 'Fórmula nº 12 del apunte teórico UNNE: ∫ dx/(x²-a²) = (1/2a) ln|(x-a)/(x+a)| + C, con a = 4 ⇒ 1/8.'
  },
  {
    id: 'J_I1_400',
    category: 'Integrales 1V',
    points: 400,
    questionLatex: '\\int_0^{\\pi/2} \\cos x \\, dx',
    options: [
      { id: '1', textLatex: '1', isCorrect: true },
      { id: '2', textLatex: '0', isCorrect: false },
      { id: '3', textLatex: '\\frac{\\pi}{2}', isCorrect: false },
      { id: '4', textLatex: '-1', isCorrect: false }
    ],
    explanation: 'Regla de Barrow: [sen x]_0^{π/2} = sen(π/2) - sen(0) = 1 - 0 = 1.'
  },
  // Multivariable
  {
    id: 'J_M_100',
    category: 'Multivariable',
    points: 100,
    questionLatex: '\\text{Derivada parcial } \\frac{\\partial z}{\\partial y} \\text{ de } z = x^3 y^2 + 5x - y',
    options: [
      { id: '1', textLatex: '2x^3 y - 1', isCorrect: true },
      { id: '2', textLatex: '3x^2 y^2 + 5', isCorrect: false },
      { id: '3', textLatex: '2y', isCorrect: false },
      { id: '4', textLatex: 'x^3 - 1', isCorrect: false }
    ],
    explanation: 'Tratando x como constante: ∂/∂y(x³ y² + 5x - y) = x³ (2y) + 0 - 1 = 2x³ y - 1.'
  },
  {
    id: 'J_M_200',
    category: 'Multivariable',
    points: 200,
    questionLatex: '\\text{Dominio de la función } z = \\ln(x + y)',
    options: [
      { id: '1', textLatex: 'x + y > 0', isCorrect: true },
      { id: '2', textLatex: 'x + y \\ge 0', isCorrect: false },
      { id: '3', textLatex: 'x > 0 \\text{ e } y > 0', isCorrect: false },
      { id: '4', textLatex: 'x^2 + y^2 > 1', isCorrect: false }
    ],
    explanation: 'El argumento del logaritmo real debe ser estrictamente positivo: x + y > 0 (semiplano abierto encima de y = -x).'
  },
  {
    id: 'J_M_300',
    category: 'Multivariable',
    points: 300,
    questionLatex: '\\text{Si } z_{xy} \\text{ y } z_{yx} \\text{ son continuas, el Teorema de Schwarz afirma que:}',
    options: [
      { id: '1', textLatex: 'z_{xy} = z_{yx}', isCorrect: true },
      { id: '2', textLatex: 'z_{xy} + z_{yx} = 0', isCorrect: false },
      { id: '3', textLatex: 'z_{xy} \\cdot z_{yx} = 1', isCorrect: false },
      { id: '4', textLatex: 'z_{xx} = z_{yy}', isCorrect: false }
    ],
    explanation: 'El Teorema de Schwarz (o Clairaut) garantiza la igualdad de las derivadas parciales cruzadas continuas.'
  },
  {
    id: 'J_M_400',
    category: 'Multivariable',
    points: 400,
    questionLatex: '\\text{Si } H = z_{xx}z_{yy} - (z_{xy})^2 = -5 \\text{ en un punto crítico, ¿qué tipo de punto es?}',
    options: [
      { id: '1', textLatex: '\\text{Punto de Ensilladura (Silla)}', isCorrect: true },
      { id: '2', textLatex: '\\text{Mínimo Relativo}', isCorrect: false },
      { id: '3', textLatex: '\\text{Máximo Relativo}', isCorrect: false },
      { id: '4', textLatex: '\\text{Caso Dudoso}', isCorrect: false }
    ],
    explanation: 'Cuando el discriminante del Hessiano es estrictamente menor a cero (H < 0), el punto crítico es siempre de ensilladura.'
  },
  // EDO
  {
    id: 'J_EDO_100',
    category: 'EDO',
    points: 100,
    questionLatex: '\\text{Orden de la ecuación diferencial } y\'\'\' + 4(y\')^5 + y = \\operatorname{sen} x',
    options: [
      { id: '1', textLatex: '\\text{Orden 3}', isCorrect: true },
      { id: '2', textLatex: '\\text{Orden 5}', isCorrect: false },
      { id: '3', textLatex: '\\text{Orden 1}', isCorrect: false },
      { id: '4', textLatex: '\\text{Orden 4}', isCorrect: false }
    ],
    explanation: 'El orden de una ecuación diferencial es el orden de la derivada más alta presente, que aquí es y\'\'\' (orden 3).'
  },
  {
    id: 'J_EDO_200',
    category: 'EDO',
    points: 200,
    questionLatex: '\\text{Factor integrante } \\mu(x) \\text{ para } y\' + \\frac{3}{x}y = x^2',
    options: [
      { id: '1', textLatex: '\\mu(x) = x^3', isCorrect: true },
      { id: '2', textLatex: '\\mu(x) = 3x', isCorrect: false },
      { id: '3', textLatex: '\\mu(x) = e^{3x}', isCorrect: false },
      { id: '4', textLatex: '\\mu(x) = \\ln x', isCorrect: false }
    ],
    explanation: 'μ(x) = e^{∫ 3/x dx} = e^{3 ln x} = e^{ln x³} = x³.'
  },
  {
    id: 'J_EDO_300',
    category: 'EDO',
    points: 300,
    questionLatex: '\\text{Solución general de } \\frac{dy}{dx} = 2xy',
    options: [
      { id: '1', textLatex: 'y = C e^{x^2}', isCorrect: true },
      { id: '2', textLatex: 'y = x^2 + C', isCorrect: false },
      { id: '3', textLatex: 'y = C e^{2x}', isCorrect: false },
      { id: '4', textLatex: 'y = 2x^2 + C', isCorrect: false }
    ],
    explanation: 'Separando variables: dy/y = 2x dx ⇒ ln|y| = x² + C₁ ⇒ y = C e^(x²).'
  },
  {
    id: 'J_EDO_400',
    category: 'EDO',
    points: 400,
    questionLatex: '\\text{Condición para que } P(x,y)dx + Q(x,y)dy = 0 \\text{ sea una EDO exacta}',
    options: [
      { id: '1', textLatex: '\\frac{\\partial P}{\\partial y} = \\frac{\\partial Q}{\\partial x}', isCorrect: true },
      { id: '2', textLatex: '\\frac{\\partial P}{\\partial x} = \\frac{\\partial Q}{\\partial y}', isCorrect: false },
      { id: '3', textLatex: 'P(x,y) = Q(x,y)', isCorrect: false },
      { id: '4', textLatex: '\\frac{\\partial^2 P}{\\partial x^2} = 0', isCorrect: false }
    ],
    explanation: 'Condición de Euler-Schwarz para campos gradiente / diferenciales totales exactos: ∂P/∂y = ∂Q/∂x.'
  },
  // Series
  {
    id: 'J_S_100',
    category: 'Series',
    points: 100,
    questionLatex: '\\text{Condición necesaria para la convergencia de la serie } \\sum_{n=1}^\\infty a_n',
    options: [
      { id: '1', textLatex: '\\lim_{n \\to \\infty} a_n = 0', isCorrect: true },
      { id: '2', textLatex: '\\lim_{n \\to \\infty} a_n = 1', isCorrect: false },
      { id: '3', textLatex: 'a_n > 0', isCorrect: false },
      { id: '4', textLatex: '\\sum a_n < 1', isCorrect: false }
    ],
    explanation: 'Condición necesaria (pero no suficiente): si una serie converge, necesariamente su término general tiende a 0.'
  },
  {
    id: 'J_S_200',
    category: 'Series',
    points: 200,
    questionLatex: '\\text{Suma de la serie geométrica } \\sum_{n=0}^\\infty \\left(\\frac{1}{2}\\right)^n = 1 + \\frac{1}{2} + \\frac{1}{4} + \\dots',
    options: [
      { id: '1', textLatex: '2', isCorrect: true },
      { id: '2', textLatex: '1', isCorrect: false },
      { id: '3', textLatex: '\\frac{1}{2}', isCorrect: false },
      { id: '4', textLatex: '\\infty', isCorrect: false }
    ],
    explanation: 'S = a / (1 - q) con a = 1 y q = 1/2 ⇒ S = 1 / (1 - 1/2) = 2.'
  },
  {
    id: 'J_S_300',
    category: 'Series',
    points: 300,
    questionLatex: '\\text{Carácter de la p-serie armónica } \\sum_{n=1}^\\infty \\frac{1}{n^2}',
    options: [
      { id: '1', textLatex: '\\text{Converge porque } p = 2 > 1', isCorrect: true },
      { id: '2', textLatex: '\\text{Diverge porque } p = 2 > 1', isCorrect: false },
      { id: '3', textLatex: '\\text{Oscilante}', isCorrect: false },
      { id: '4', textLatex: '\\text{Incierto}', isCorrect: false }
    ],
    explanation: 'Criterio de la p-serie de Riemann: ∑ 1/n^p converge si y solo si p > 1. Como p = 2 > 1, converge.'
  },
  {
    id: 'J_S_500',
    category: 'Series',
    points: 500,
    questionLatex: '\\text{¿Cuál es el valor de la serie armónica alternada } \\sum_{n=1}^\\infty \\frac{(-1)^{n+1}}{n}?',
    options: [
      { id: '1', textLatex: '\\ln 2', isCorrect: true },
      { id: '2', textLatex: '1', isCorrect: false },
      { id: '3', textLatex: '0', isCorrect: false },
      { id: '4', textLatex: '\\infty \\text{ (Diverge)}', isCorrect: false }
    ],
    explanation: 'Teórico UNNE pág. 107: la serie armónica alternada converge a ln 2 como consecuencia del desarrollo de Taylor de ln(1+x).'
  }
];
