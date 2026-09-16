import { Exercise } from '../types/domain';

export const EXERCISES_DATA: Exercise[] = [
  // ==========================================
  // UNIDAD 1: FUNCIONES, LÍMITES Y CONTINUIDAD
  // ==========================================
  {
    id: 'EX_U1_01',
    unitId: 'U1',
    topicId: 'U1_T1',
    subtopicTitle: 'Inecuaciones con Módulo y Entornos',
    type: 'multiple_choice',
    difficulty: 1,
    promptLatex: '\\text{Resolver la desigualdad: } |2x - 5| < 1 \\text{ y expresarla como entorno.}',
    instructionText: 'Determina el subconjunto de números reales y exprésalo como entorno simétrico E(a, ε).',
    options: [
      { id: 'opt_a', textLatex: 'x \\in (2, 3) = E(2.5, 0.5)', isCorrect: true },
      { id: 'opt_b', textLatex: 'x \\in [2, 3] = E(2.5, 1)', isCorrect: false, specificFeedback: 'La desigualdad es estricta (<), el intervalo debe ser abierto y el radio es 0.5, no 1.' },
      { id: 'opt_c', textLatex: 'x \\in (4, 6) = E(5, 1)', isCorrect: false, specificFeedback: 'Olvidaste dividir por el coeficiente 2 de la variable x.' },
      { id: 'opt_d', textLatex: 'x \\in (2, 4) = E(3, 1)', isCorrect: false, specificFeedback: 'Cálculo de límites incorrecto.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Propiedad del módulo', contentLatex: '|A| < b \\iff -b < A < b', penaltyXpPercentage: 5 },
      { step: 2, title: 'Planteo algebraico', contentLatex: '-1 < 2x - 5 < 1', penaltyXpPercentage: 10 },
      { step: 3, title: 'Despeje de x', contentLatex: '4 < 2x < 6 \\implies 2 < x < 3', penaltyXpPercentage: 20 },
      { step: 4, title: 'Cálculo del centro y radio', contentLatex: 'a = \\frac{2+3}{2} = 2.5, \\quad \\varepsilon = \\frac{3-2}{2} = 0.5', penaltyXpPercentage: 35 },
      { step: 5, title: 'Notación de entorno', contentLatex: 'E(2.5, 0.5)', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_ENTORNO'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 1,
      topicName: 'Funciones, Límites y Continuidad',
      practicalWorkNumber: 1,
      exerciseNumber: '1.a',
      pageReference: 2
    },
    explanation: {
      whatYouDid: 'Despejaste la inecuación modular aplicando propiedades de desigualdades absolutas.',
      whereIsMistake: 'En caso de error, suele olvidarse dividir los extremos por el factor 2 o confundir el radio del entorno.',
      whyIsIncorrect: 'Un entorno E(a, ε) exige centro exacto a = (x₁ + x₂)/2 y radio ε = (x₂ - x₁)/2.',
      whatToDetectNextTime: 'Detecta primero si la desigualdad es estricta (<) o amplia (≤). Si es estricta, genera un intervalo abierto.',
      correctResolutionLatex: '|2x-5| < 1 \\iff -1 < 2x - 5 < 1 \\iff 4 < 2x < 6 \\iff 2 < x < 3 \\implies E(2.5, 0.5)',
      examFreeTip: 'En el examen libre de la UNNE suelen pedir simultáneamente: intervalo, cotas, extremos y entorno.'
    }
  },
  {
    id: 'EX_U1_07',
    unitId: 'U1',
    topicId: 'U1_T3',
    subtopicTitle: 'Límites Trigonométricos Notables',
    type: 'multiple_choice',
    difficulty: 2,
    promptLatex: '\\lim_{x \\to 0} \\frac{\\operatorname{sen}(6x)}{2x}',
    instructionText: 'Calcula el límite salvando la indeterminación mediante el límite trigonométrico notable.',
    options: [
      { id: 'opt_a', textLatex: '3', isCorrect: true },
      { id: 'opt_b', textLatex: '1', isCorrect: false, specificFeedback: 'Omitiste el factor de escala entre 6 y 2.' },
      { id: 'opt_c', textLatex: '0', isCorrect: false, specificFeedback: 'Es una indeterminación 0/0, no tiende a 0.' },
      { id: 'opt_d', textLatex: '\\infty', isCorrect: false, specificFeedback: 'El límite notable tiene valor finito.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Identificar tipo', contentLatex: '\\frac{\\operatorname{sen}(0)}{0} = \\left[\\frac{0}{0}\\right]', penaltyXpPercentage: 5 },
      { step: 2, title: 'Recordar límite notable', contentLatex: '\\lim_{u \\to 0} \\frac{\\operatorname{sen} u}{u} = 1', penaltyXpPercentage: 10 },
      { step: 3, title: 'Ajustar coeficientes', contentLatex: '\\frac{\\operatorname{sen}(6x)}{2x} = \\frac{6}{2} \\cdot \\frac{\\operatorname{sen}(6x)}{6x} = 3 \\cdot \\frac{\\operatorname{sen}(6x)}{6x}', penaltyXpPercentage: 25 },
      { step: 4, title: 'Paso al límite', contentLatex: '3 \\cdot 1 = 3', penaltyXpPercentage: 40 },
      { step: 5, title: 'Resultado final', contentLatex: '3', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_LIMITE_NOTABLE_TRIG'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 1,
      topicName: 'Límites Trigonométricos',
      practicalWorkNumber: 1,
      exerciseNumber: '3.f',
      pageReference: 2
    },
    explanation: {
      whatYouDid: 'Identificaste la indeterminación 0/0 y la presencia de la función seno con argumento que tiende a 0.',
      whereIsMistake: 'El error común es asumir directamente que da 1 sin compensar los factores numéricos.',
      whyIsIncorrect: 'La propiedad lim (sen u)/u = 1 exige que el denominador sea idéntico al argumento u = 6x.',
      whatToDetectNextTime: 'Multiplica y divide por la constante adecuada para forzar el argumento del seno en el denominador.',
      correctResolutionLatex: '\\lim_{x\\to 0}\\frac{\\operatorname{sen}(6x)}{2x} = \\lim_{x\\to 0} \\frac{6}{2} \\cdot \\frac{\\operatorname{sen}(6x)}{6x} = 3 \\cdot 1 = 3',
      examFreeTip: 'Este ejercicio es un clásico de la UNNE para evaluar si el alumno memoriza fórmulas sin comprender el argumento.'
    }
  },
  {
    id: 'EX_U1_09',
    unitId: 'U1',
    topicId: 'U1_T3',
    subtopicTitle: 'Indeterminación 1^∞ y Número e',
    type: 'multiple_choice',
    difficulty: 3,
    promptLatex: '\\lim_{x \\to \\infty} \\left(1 - \\frac{2}{x}\\right)^{3x}',
    instructionText: 'Evalúa el límite exponencial salvando la indeterminación 1^∞ mediante la definición del número e.',
    options: [
      { id: 'opt_a', textLatex: 'e^{-6}', isCorrect: true },
      { id: 'opt_b', textLatex: 'e^6', isCorrect: false, specificFeedback: 'Cuidado con el signo: el término es -2/x, lo que genera exponente negativo.' },
      { id: 'opt_c', textLatex: 'e^{-2}', isCorrect: false, specificFeedback: 'Olvidaste multiplicar por el factor 3 del exponente.' },
      { id: 'opt_d', textLatex: '1', isCorrect: false, specificFeedback: '1^∞ es indeterminado, no se evalúa directamente como 1.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Verificar indeterminación', contentLatex: '\\lim (1 - 0)^{\\infty} = [1^\\infty]', penaltyXpPercentage: 5 },
      { step: 2, title: 'Forma canónica del número e', contentLatex: '\\lim_{t \\to \\infty} \\left(1 + \\frac{1}{t}\\right)^t = e', penaltyXpPercentage: 15 },
      { step: 3, title: 'Cambio de variable', contentLatex: 't = -\\frac{x}{2} \\implies x = -2t', penaltyXpPercentage: 25 },
      { step: 4, title: 'Sustituir en el exponente', contentLatex: '3x = 3(-2t) = -6t', penaltyXpPercentage: 35 },
      { step: 5, title: 'Aplicar potencia de potencia', contentLatex: '\\lim \\left[\\left(1 + \\frac{1}{t}\\right)^t\\right]^{-6} = e^{-6}', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_NUMERO_E'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 1,
      topicName: 'Límites',
      practicalWorkNumber: 1,
      exerciseNumber: '3.k',
      pageReference: 2
    },
    explanation: {
      whatYouDid: 'Reconociste la indeterminación de tipo potencial-exponencial 1^∞.',
      whereIsMistake: 'Olvidar el signo menos en el exponente resultante o no multiplicar los coeficientes (-2) * 3 = -6.',
      whyIsIncorrect: 'La base tiende a 1 por abajo y el exponente crece a infinito, lo cual converge a e^(-6).',
      whatToDetectNextTime: 'Usa la regla de oro: lim (1 + a/x)^(bx) = e^(a · b). Aquí a = -2 y b = 3, por tanto e^(-6).',
      correctResolutionLatex: '\\lim_{x\\to\\infty}\\left(1 + \\frac{1}{-x/2}\\right)^{\\left(-\\frac{x}{2}\\right) \\cdot (-6)} = e^{-6}',
      examFreeTip: 'La regla simplificada e^(a·b) te ahorra 5 minutos en el examen libre.'
    }
  },
  {
    id: 'EX_U1_02',
    unitId: 'U1',
    topicId: 'U1_T4',
    subtopicTitle: 'Continuidad con Parámetros en Función a Trozos',
    type: 'multiple_choice',
    difficulty: 3,
    promptLatex: '\\text{Hallar los valores de } c \\text{ y } d \\text{ para que la función sea continua en todo } \\mathbb{R}: \\quad f(x) = \\begin{cases} 2 & \\text{si } x \\le -1 \\\\ cx + d & \\text{si } -1 < x < 1 \\\\ -2 & \\text{si } x \\ge 1 \\end{cases}',
    instructionText: 'Plantea la igualdad de límites laterales en los puntos de empalme x = -1 y x = 1 para determinar los parámetros c y d.',
    options: [
      { id: 'opt_a', textLatex: 'c = -2, \\quad d = 0', isCorrect: true },
      { id: 'opt_b', textLatex: 'c = 2, \\quad d = 0', isCorrect: false, specificFeedback: 'Si c = 2, f(1) daría +2 en lugar de -2.' },
      { id: 'opt_c', textLatex: 'c = 0, \\quad d = 2', isCorrect: false, specificFeedback: 'Si c = 0, la función sería constante 2 y no conectaría con -2 en x = 1.' },
      { id: 'opt_d', textLatex: 'c = -1, \\quad d = 1', isCorrect: false, specificFeedback: 'Con esos valores el límite por derecha en x = -1 daría 2 pero en x = 1 daría 0 en vez de -2.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Condición en x = -1', contentLatex: '\\lim_{x \\to -1^-} f(x) = \\lim_{x \\to -1^+} f(x) = f(-1)', penaltyXpPercentage: 5 },
      { step: 2, title: 'Evaluar laterales en x = -1', contentLatex: '2 = c(-1) + d \\implies -c + d = 2', penaltyXpPercentage: 15 },
      { step: 3, title: 'Condición en x = 1', contentLatex: '\\lim_{x \\to 1^-} f(x) = \\lim_{x \\to 1^+} f(x) = f(1)', penaltyXpPercentage: 25 },
      { step: 4, title: 'Evaluar laterales en x = 1', contentLatex: 'c(1) + d = -2 \\implies c + d = -2', penaltyXpPercentage: 35 },
      { step: 5, title: 'Resolver el sistema 2x2', contentLatex: '(-c + d) + (c + d) = 2 + (-2) \\implies 2d = 0 \\implies d = 0, \\quad c = -2', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_CONTINUIDAD_PARAMETRICA'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 1,
      topicName: 'Continuidad',
      practicalWorkNumber: 1,
      exerciseNumber: '6',
      pageReference: 3
    },
    explanation: {
      whatYouDid: 'Planteaste el sistema de dos ecuaciones lineales que asegura la coincidencia de límites laterales en los dos puntos de cambio de definición.',
      whereIsMistake: 'En los signos al evaluar c(-1) o al resolver el sistema de dos ecuaciones con dos incógnitas.',
      whyIsIncorrect: 'Para que una función a trozos sea continua, el límite por izquierda debe ser idéntico al límite por derecha en cada punto crítico de empalme.',
      whatToDetectNextTime: 'Identifica los puntos donde la función cambia de fórmula y formula una ecuación por cada punto de empalme.',
      correctResolutionLatex: '\\begin{cases} -c + d = 2 \\\\ c + d = -2 \\end{cases} \\implies 2d = 0 \\implies d = 0, \\quad c = -2',
      examFreeTip: 'Este ejercicio es un clásico ineludible en el examen libre de la UNNE para evaluar continuidad y álgebra básica simultáneamente.'
    }
  },
  {
    id: 'EX_U1_03',
    unitId: 'U1',
    topicId: 'U1_T3',
    subtopicTitle: 'Límites Racionales con Radicales',
    type: 'multiple_choice',
    difficulty: 2,
    promptLatex: '\\lim_{x \\to 4} \\frac{\\sqrt{x+5} - 3}{x - 4}',
    instructionText: 'Salva la indeterminación 0/0 multiplicando y dividiendo por el binomio conjugado del numerador.',
    options: [
      { id: 'opt_a', textLatex: '\\frac{1}{6}', isCorrect: true },
      { id: 'opt_b', textLatex: '\\frac{1}{3}', isCorrect: false, specificFeedback: 'Olvidaste sumar el 3 en el denominador conjugado: √(4+5)+3 = 3+3 = 6.' },
      { id: 'opt_c', textLatex: '0', isCorrect: false, specificFeedback: 'El límite es indeterminado 0/0, requiere salvar la indeterminación.' },
      { id: 'opt_d', textLatex: '6', isCorrect: false, specificFeedback: 'Invertiste la fracción al simplificar el factor (x - 4).' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Verificar indeterminación', contentLatex: '\\frac{\\sqrt{4+5} - 3}{4 - 4} = \\left[\\frac{0}{0}\\right]', penaltyXpPercentage: 5 },
      { step: 2, title: 'Multiplicar por el conjugado', contentLatex: '\\frac{(\\sqrt{x+5}-3)(\\sqrt{x+5}+3)}{(x-4)(\\sqrt{x+5}+3)}', penaltyXpPercentage: 15 },
      { step: 3, title: 'Desarrollar diferencia de cuadrados', contentLatex: '(\\sqrt{x+5})^2 - 3^2 = x + 5 - 9 = x - 4', penaltyXpPercentage: 25 },
      { step: 4, title: 'Cancelar factor común', contentLatex: '\\frac{x-4}{(x-4)(\\sqrt{x+5}+3)} = \\frac{1}{\\sqrt{x+5}+3}', penaltyXpPercentage: 35 },
      { step: 5, title: 'Paso al límite', contentLatex: '\\frac{1}{\\sqrt{4+5}+3} = \\frac{1}{3+3} = \\frac{1}{6}', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_ENTORNO'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 1,
      topicName: 'Límites con Radicales',
      practicalWorkNumber: 1,
      exerciseNumber: '3.e',
      pageReference: 2
    },
    explanation: {
      whatYouDid: 'Multiplicaste numerador y denominador por el binomio conjugado para transformar la resta de raíces en una diferencia de cuadrados.',
      whereIsMistake: 'En la evaluación final del denominador: 3 + 3 = 6 en el denominador, resultando en 1/6.',
      whyIsIncorrect: 'La indeterminación 0/0 con raíces cuadradas algebraicas se salva multiplicando por el conjugado (A - B)(A + B) = A² - B².',
      whatToDetectNextTime: 'Cuando veas raíz cuadrada menos constante con indeterminación 0/0, el método estándar es el conjugado.',
      correctResolutionLatex: '\\lim_{x\\to 4}\\frac{\\sqrt{x+5}-3}{x-4} = \\lim_{x\\to 4}\\frac{x-4}{(x-4)(\\sqrt{x+5}+3)} = \\frac{1}{3+3} = \\frac{1}{6}',
      examFreeTip: 'En el examen libre debes justificar que x ≠ 4 al cancelar el factor (x - 4).'
    }
  },

  // ==========================================
  // UNIDAD 2: DERIVADA DE UNA VARIABLE
  // ==========================================
  {
    id: 'EX_U2_01',
    unitId: 'U2',
    topicId: 'U2_T1',
    subtopicTitle: 'Derivada por Definición en un Punto',
    type: 'multiple_choice',
    difficulty: 2,
    promptLatex: '\\text{Dada } f(x) = x^2 - 2x, \\text{ calcular } f\'(1) \\text{ aplicando la definición.}',
    instructionText: 'Aplica el límite del cociente incremental f\'(x₀) = lim(Δx→0) [f(x₀+Δx) - f(x₀)] / Δx para x₀ = 1.',
    options: [
      { id: 'opt_a', textLatex: "f'(1) = 0", isCorrect: true },
      { id: 'opt_b', textLatex: "f'(1) = 2", isCorrect: false, specificFeedback: "Ese es el valor de f'(2), no en x = 1." },
      { id: 'opt_c', textLatex: "f'(1) = -1", isCorrect: false, specificFeedback: "Ese es el valor de f(1), no de su derivada." },
      { id: 'opt_d', textLatex: "f'(1) = -2", isCorrect: false, specificFeedback: "Derivada calculada erróneamente." }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Evaluar f(1)', contentLatex: 'f(1) = 1^2 - 2(1) = -1', penaltyXpPercentage: 5 },
      { step: 2, title: 'Plantear f(1 + Δx)', contentLatex: 'f(1+\\Delta x) = (1+\\Delta x)^2 - 2(1+\\Delta x) = 1 + 2\\Delta x + \\Delta x^2 - 2 - 2\\Delta x = \\Delta x^2 - 1', penaltyXpPercentage: 15 },
      { step: 3, title: 'Formar el incremento Δy', contentLatex: '\\Delta y = f(1+\\Delta x) - f(1) = (\\Delta x^2 - 1) - (-1) = \\Delta x^2', penaltyXpPercentage: 25 },
      { step: 4, title: 'Cociente incremental', contentLatex: '\\frac{\\Delta y}{\\Delta x} = \\frac{\\Delta x^2}{\\Delta x} = \\Delta x', penaltyXpPercentage: 35 },
      { step: 5, title: 'Calcular el límite', contentLatex: '\\lim_{\\Delta x \\to 0} \\Delta x = 0', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_DERIVADA_DEFINICION'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 2,
      topicName: 'La Derivada y sus Aplicaciones',
      practicalWorkNumber: 2,
      exerciseNumber: '2.a',
      pageReference: 5
    },
    explanation: {
      whatYouDid: 'Construiste el cociente incremental evaluando la función en el punto 1 y en 1 + Δx.',
      whereIsMistake: 'En el desarrollo algebraico de (1 + Δx)² o en los signos al restar f(1) = -1.',
      whyIsIncorrect: 'La recta tangente en el vértice de una parábola es horizontal, por lo que su pendiente debe ser 0.',
      whatToDetectNextTime: 'Reconoce que x = 1 es el vértice de la parábola y = x² - 2x, por lo que f\'(1) debe anularse.',
      correctResolutionLatex: "f'(1) = \\lim_{\\Delta x \\to 0} \\frac{(1+\\Delta x)^2 - 2(1+\\Delta x) - (-1)}{\\Delta x} = \\lim_{\\Delta x \\to 0} \\frac{\\Delta x^2}{\\Delta x} = 0",
      examFreeTip: 'En el examen libre siempre te pedirán al menos una derivada por cociente incremental con límite.'
    }
  },
  {
    id: 'EX_U2_07',
    unitId: 'U2',
    topicId: 'U2_T2',
    subtopicTitle: 'Regla de la Cadena con Potencias',
    type: 'multiple_choice',
    difficulty: 3,
    promptLatex: '\\text{Calcular la derivada de } y = \\ln^2(x^2 + 2)',
    instructionText: 'Aplica la regla de la cadena reconociendo la cadena de funciones exterior, media e interior.',
    options: [
      { id: 'opt_a', textLatex: "y' = \\frac{4x \\ln(x^2 + 2)}{x^2 + 2}", isCorrect: true },
      { id: 'opt_b', textLatex: "y' = \\frac{2 \\ln(x^2 + 2)}{x^2 + 2}", isCorrect: false, specificFeedback: "Olvidaste la derivada de la función más interna: (x² + 2)' = 2x." },
      { id: 'opt_c', textLatex: "y' = 2 \\ln(x^2 + 2) \\cdot 2x", isCorrect: false, specificFeedback: "Omitiste derivar la función logaritmo natural 1/(x²+2)." },
      { id: 'opt_d', textLatex: "y' = \\frac{2x}{(x^2 + 2)^2}", isCorrect: false, specificFeedback: "Derivación totalmente errónea de la potencia de logaritmo." }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Identificar capas de composición', contentLatex: 'u = x^2 + 2, \\quad v = \\ln(u), \\quad y = v^2', penaltyXpPercentage: 5 },
      { step: 2, title: 'Derivar capa exterior (potencia)', contentLatex: '\\frac{dy}{dv} = 2v = 2\\ln(x^2+2)', penaltyXpPercentage: 15 },
      { step: 3, title: 'Derivar capa media (logaritmo)', contentLatex: '\\frac{dv}{du} = \\frac{1}{u} = \\frac{1}{x^2+2}', penaltyXpPercentage: 25 },
      { step: 4, title: 'Derivar capa interior (polinomio)', contentLatex: '\\frac{du}{dx} = 2x', penaltyXpPercentage: 35 },
      { step: 5, title: 'Multiplicar todas las derivadas', contentLatex: 'y\' = 2\\ln(x^2+2) \\cdot \\frac{1}{x^2+2} \\cdot 2x = \\frac{4x\\ln(x^2+2)}{x^2+2}', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_REGLA_CADENA'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 2,
      topicName: 'Reglas de Derivación',
      practicalWorkNumber: 2,
      exerciseNumber: '3.t',
      pageReference: 5
    },
    explanation: {
      whatYouDid: 'Identificaste la función como una potencia compuesta de un logaritmo cuyo argumento es cuadrático.',
      whereIsMistake: 'El fallo típico es omitir la derivada interna 2x o no dividir por el argumento x²+2.',
      whyIsIncorrect: 'Por la regla de la cadena, cada eslabón anidado debe aportar su factor derivado multiplicativo.',
      whatToDetectNextTime: 'Escribe explícitamente: exterior = ( )², media = ln( ), interior = x² + 2.',
      correctResolutionLatex: "y' = 2[\\ln(x^2+2)] \\cdot [\\ln(x^2+2)]' = 2\\ln(x^2+2) \\cdot \\frac{2x}{x^2+2} = \\frac{4x\\ln(x^2+2)}{x^2+2}",
      examFreeTip: 'Cuidado con la notación: ln²(x) es (ln x)², NO es ln(x²).'
    }
  },
  {
    id: 'EX_U2_09',
    unitId: 'U2',
    topicId: 'U2_T3',
    subtopicTitle: 'Derivación Logarítmica',
    type: 'multiple_choice',
    difficulty: 3,
    promptLatex: '\\text{Calcular la derivada de } f(x) = x^x',
    instructionText: 'Aplica derivación logarítmica tomando logaritmo natural en ambos miembros antes de diferenciar.',
    options: [
      { id: 'opt_a', textLatex: "f'(x) = x^x(\\ln x + 1)", isCorrect: true },
      { id: 'opt_b', textLatex: "f'(x) = x \\cdot x^{x-1} = x^x", isCorrect: false, specificFeedback: "Error grave: trataste el exponente x como si fuera una constante." },
      { id: 'opt_c', textLatex: "f'(x) = x^x \\ln x", isCorrect: false, specificFeedback: "Error: trataste la base x como si fuera una constante numérica." },
      { id: 'opt_d', textLatex: "f'(x) = \\ln x + 1", isCorrect: false, specificFeedback: "Olvidaste multiplicar por y = x^x al despejar y'." }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Aplicar ln a ambos miembros', contentLatex: '\\ln y = \\ln(x^x)', penaltyXpPercentage: 5 },
      { step: 2, title: 'Bajar el exponente con propiedad de logaritmos', contentLatex: '\\ln y = x \\ln x', penaltyXpPercentage: 15 },
      { step: 3, title: 'Derivar implícitamente respecto a x', contentLatex: '\\frac{y\'}{y} = (1)\\ln x + x\\left(\\frac{1}{x}\\right) = \\ln x + 1', penaltyXpPercentage: 25 },
      { step: 4, title: 'Despejar y\'', contentLatex: 'y\' = y (\\ln x + 1)', penaltyXpPercentage: 35 },
      { step: 5, title: 'Reemplazar y por su expresión original', contentLatex: 'y\' = x^x(\\ln x + 1)', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_DERIVACION_LOGARITMICA'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 2,
      topicName: 'Derivación Logarítmica',
      practicalWorkNumber: 2,
      exerciseNumber: '5.a',
      pageReference: 5
    },
    explanation: {
      whatYouDid: 'Aplicaste el método de derivación logarítmica para una función con variable tanto en base como en exponente.',
      whereIsMistake: 'Tratarla como potencia polinómica o exponencial simple es el error más recurrente de los exámenes libres.',
      whyIsIncorrect: 'Ni la base ni el exponente son constantes; ninguna regla elemental directa aplica sin logaritmos.',
      whatToDetectNextTime: 'Cada vez que veas [f(x)]^[g(x)], tu única vía legítima es la derivación logarítmica.',
      correctResolutionLatex: "\\ln y = x \\ln x \\implies \\frac{y'}{y} = \\ln x + 1 \\implies y' = x^x(\\ln x + 1)",
      examFreeTip: 'Los profesores de FaCENA evalúan este ejercicio para verificar si el alumno distingue funciones potenciales de exponenciales.'
    }
  },
  {
    id: 'EX_U2_02',
    unitId: 'U2',
    topicId: 'U2_T1',
    subtopicTitle: 'Recta Tangente y Normal a una Curva',
    type: 'multiple_choice',
    difficulty: 2,
    promptLatex: '\\text{Hallar las ecuaciones de la recta tangente y normal a la curva } f(x) = \\frac{x+1}{x^2+1} \\text{ en el punto de abscisa } x_0 = 0.',
    instructionText: 'Calcula f(0), halla f\'(x) por regla del cociente, evalúa f\'(0) y escribe las ecuaciones punto-pendiente.',
    options: [
      { id: 'opt_a', textLatex: '\\text{Tangente: } y = x + 1; \\quad \\text{Normal: } y = -x + 1', isCorrect: true },
      { id: 'opt_b', textLatex: '\\text{Tangente: } y = x - 1; \\quad \\text{Normal: } y = -x - 1', isCorrect: false, specificFeedback: 'f(0) = 1, la ordenada al origen debe ser +1.' },
      { id: 'opt_c', textLatex: '\\text{Tangente: } y = 2x + 1; \\quad \\text{Normal: } y = -\\frac{1}{2}x + 1', isCorrect: false, specificFeedback: 'f\'(0) da 1, no 2.' },
      { id: 'opt_d', textLatex: '\\text{Tangente: } y = -x + 1; \\quad \\text{Normal: } y = x + 1', isCorrect: false, specificFeedback: 'Invertiste las pendientes de la tangente y de la normal.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Punto de paso', contentLatex: 'f(0) = \\frac{0+1}{0+1} = 1 \\implies P_0(0, 1)', penaltyXpPercentage: 5 },
      { step: 2, title: 'Derivar por regla del cociente', contentLatex: 'f\'(x) = \\frac{1(x^2+1) - (x+1)(2x)}{(x^2+1)^2} = \\frac{-x^2 - 2x + 1}{(x^2+1)^2}', penaltyXpPercentage: 15 },
      { step: 3, title: 'Evaluar pendiente tangente', contentLatex: 'm_T = f\'(0) = \\frac{0 - 0 + 1}{(0+1)^2} = 1', penaltyXpPercentage: 25 },
      { step: 4, title: 'Ecuación de la recta tangente', contentLatex: 'y - 1 = 1(x - 0) \\implies y = x + 1', penaltyXpPercentage: 35 },
      { step: 5, title: 'Pendiente y recta normal', contentLatex: 'm_N = -\\frac{1}{m_T} = -1 \\implies y - 1 = -1(x - 0) \\implies y = -x + 1', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_RECTA_TANGENTE_NORMAL', 'F_REGLA_COCIENTE'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 2,
      topicName: 'Recta Tangente y Normal',
      practicalWorkNumber: 2,
      exerciseNumber: '5.a',
      pageReference: 5
    },
    explanation: {
      whatYouDid: 'Calculaste la pendiente de la recta tangente evaluando la derivada primera y utilizaste la condición de perpendicularidad m_N = -1/m_T.',
      whereIsMistake: 'En el signo de la derivada al aplicar la regla del cociente (u\'v - uv\')/v².',
      whyIsIncorrect: 'La recta tangente tiene pendiente f\'(x₀) y la normal es perpendicular a ella, por lo que su pendiente es el opuesto del recíproco.',
      whatToDetectNextTime: 'Comprueba siempre que m_T · m_N = -1 (salvo en tangentes horizontales y verticales).',
      correctResolutionLatex: 'f\'(0) = 1 \\implies y - 1 = 1(x - 0) \\implies y = x + 1; \\quad m_N = -1 \\implies y = -x + 1',
      examFreeTip: 'En el examen libre siempre piden ambas rectas: tangente y normal. No olvides indicar el punto de paso P₀(x₀, y₀).'
    }
  },
  {
    id: 'EX_U2_03',
    unitId: 'U2',
    topicId: 'U2_T2',
    subtopicTitle: 'Regla del Producto con Base Exponencial Arbitraria',
    type: 'multiple_choice',
    difficulty: 2,
    promptLatex: '\\text{Calcular la derivada de } y = x^4 \\cdot 2^x',
    instructionText: 'Aplica la regla del producto recordando que la derivada de a^x incluye el factor ln(a).',
    options: [
      { id: 'opt_a', textLatex: 'y\' = x^3 \\cdot 2^x (4 + x \\ln 2)', isCorrect: true },
      { id: 'opt_b', textLatex: 'y\' = 4x^3 \\cdot 2^x', isCorrect: false, specificFeedback: 'Olvidaste derivar el segundo factor 2^x.' },
      { id: 'opt_c', textLatex: 'y\' = x^4 \\cdot 2^x \\ln 2', isCorrect: false, specificFeedback: 'Olvidaste derivar el primer factor x^4.' },
      { id: 'opt_d', textLatex: 'y\' = 4x^3 \\cdot x 2^{x-1}', isCorrect: false, specificFeedback: 'Error grave: trataste 2^x como una potencia polinómica.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Identificar factores', contentLatex: 'u = x^4, \\quad v = 2^x', penaltyXpPercentage: 5 },
      { step: 2, title: 'Derivar primer factor', contentLatex: 'u\' = 4x^3', penaltyXpPercentage: 15 },
      { step: 3, title: 'Derivar segundo factor (base a)', contentLatex: 'v\' = 2^x \\ln 2', penaltyXpPercentage: 25 },
      { step: 4, title: 'Aplicar regla del producto', contentLatex: 'y\' = 4x^3 \\cdot 2^x + x^4 \\cdot 2^x \\ln 2', penaltyXpPercentage: 35 },
      { step: 5, title: 'Extraer factor común', contentLatex: 'y\' = x^3 \\cdot 2^x (4 + x \\ln 2)', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_REGLA_PRODUCTO'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 2,
      topicName: 'Reglas de Derivación',
      practicalWorkNumber: 2,
      exerciseNumber: '3.d',
      pageReference: 5
    },
    explanation: {
      whatYouDid: 'Aplicaste la regla del producto combinando una función potencial polinómica con una exponencial de base distinta de e.',
      whereIsMistake: 'En olvidar el logaritmo natural ln 2 en la derivada de 2^x o confundir la regla de la potencia con la exponencial.',
      whyIsIncorrect: 'La derivada de a^x es a^x · ln(a), no a·x^(a-1).',
      whatToDetectNextTime: 'Distingue siempre base constante con exponente variable (a^x) de base variable con exponente constante (x^a).',
      correctResolutionLatex: 'y\' = 4x^3 \\cdot 2^x + x^4 \\cdot 2^x \\ln 2 = x^3 2^x(4 + x \\ln 2)',
      examFreeTip: 'En los exámenes libres de la UNNE suelen mezclar bases 2 o 10 para ver si recordás poner ln(base).'
    }
  },

  // ==========================================
  // UNIDAD 3: APLICACIONES DE LA DERIVADA
  // ==========================================
  {
    id: 'EX_U3_03',
    unitId: 'U3',
    topicId: 'U3_T4',
    subtopicTitle: 'Regla de L\'Hôpital Iterada',
    type: 'multiple_choice',
    difficulty: 3,
    promptLatex: '\\lim_{x \\to 0} \\frac{x - \\operatorname{sen} x}{x^3}',
    instructionText: 'Aplica la regla de L\'Hôpital hasta eliminar la indeterminación.',
    options: [
      { id: 'opt_a', textLatex: '\\frac{1}{6}', isCorrect: true },
      { id: 'opt_b', textLatex: '0', isCorrect: false, specificFeedback: 'Detuviste el proceso prematuramente en una etapa aún indeterminada.' },
      { id: 'opt_c', textLatex: '\\frac{1}{3}', isCorrect: false, specificFeedback: 'Error en la derivada de sen x o en los coeficientes del denominador.' },
      { id: 'opt_d', textLatex: '\\infty', isCorrect: false, specificFeedback: 'El límite converge a un valor finito.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Comprobar 0/0 inicial', contentLatex: '\\frac{0 - \\operatorname{sen} 0}{0^3} = \\left[\\frac{0}{0}\\right]', penaltyXpPercentage: 5 },
      { step: 2, title: 'Primera aplicación de L\'Hôpital', contentLatex: '\\lim_{x\\to 0} \\frac{1 - \\cos x}{3x^2} = \\left[\\frac{0}{0}\\right]', penaltyXpPercentage: 15 },
      { step: 3, title: 'Segunda aplicación de L\'Hôpital', contentLatex: '\\lim_{x\\to 0} \\frac{\\operatorname{sen} x}{6x} = \\left[\\frac{0}{0}\\right]', penaltyXpPercentage: 25 },
      { step: 4, title: 'Tercera aplicación o límite notable', contentLatex: '\\frac{1}{6} \\lim_{x\\to 0} \\frac{\\operatorname{sen} x}{x} = \\frac{1}{6} \\cdot 1', penaltyXpPercentage: 35 },
      { step: 5, title: 'Resultado final', contentLatex: '\\frac{1}{6}', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_LHOPITAL'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 2,
      topicName: 'Verificación de Límites con L\'Hôpital',
      practicalWorkNumber: 2,
      exerciseNumber: '8.b',
      pageReference: 6
    },
    explanation: {
      whatYouDid: 'Diferenciaste numerador y denominador de manera iterativa mientras persistía la indeterminación 0/0.',
      whereIsMistake: 'En el signo de la derivada de -cos x (que es +sen x) o en el producto 3 · 2 = 6.',
      whyIsIncorrect: 'La regla de Cauchy/L\'Hôpital autoriza derivar sucesivamente siempre que se verifiquen las hipótesis en cada paso.',
      whatToDetectNextTime: 'Al llegar a sen(x) / (6x), puedes usar directamente el límite notable sin necesidad de una 3ª derivada.',
      correctResolutionLatex: "\\lim_{x\\to 0}\\frac{x - \\operatorname{sen} x}{x^3} = \\lim_{x\\to 0}\\frac{1 - \\cos x}{3x^2} = \\lim_{x\\to 0}\\frac{\\operatorname{sen} x}{6x} = \\frac{1}{6}",
      examFreeTip: 'En el examen debes escribir explícitamente [0/0] en cada paso para justificar ante el docente la aplicación de L\'Hôpital.'
    }
  },
  {
    id: 'EX_U3_01',
    unitId: 'U3',
    topicId: 'U3_T1',
    subtopicTitle: 'Estudio de Curva: Extremos y Puntos de Inflexión',
    type: 'multiple_choice',
    difficulty: 3,
    promptLatex: '\\text{Determinar los extremos relativos y puntos de inflexión de } y = x^4 - 2x^2',
    instructionText: 'Calcula las derivadas primera y segunda, encuentra los puntos críticos y clasifícalos.',
    options: [
      { id: 'opt_a', textLatex: '\\text{Máximo en } (0, 0); \\text{ Mínimos en } (\\pm 1, -1); \\text{ Inflexión en } \\left(\\pm \\frac{\\sqrt{3}}{3}, -\\frac{5}{9}\\right)', isCorrect: true },
      { id: 'opt_b', textLatex: '\\text{Mínimo en } (0, 0); \\text{ Máximos en } (\\pm 1, -1); \\text{ Inflexión en } (0, 0)', isCorrect: false, specificFeedback: 'En x = 0, y\'\'(0) = -4 < 0, por lo que es un máximo relativo, no un mínimo.' },
      { id: 'opt_c', textLatex: '\\text{Solo tiene mínimo en } (0, 0) \\text{ y no tiene puntos de inflexión}', isCorrect: false, specificFeedback: 'y\' = 4x(x² - 1) tiene 3 raíces reales, no solo x = 0.' },
      { id: 'opt_d', textLatex: '\\text{Máximo en } (1, -1); \\text{ Mínimo en } (-1, -1)', isCorrect: false, specificFeedback: 'Ambos puntos x = 1 y x = -1 tienen y\'\' = +8 > 0, ambos son mínimos.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Derivada primera', contentLatex: 'y\' = 4x^3 - 4x = 4x(x^2 - 1) = 4x(x - 1)(x + 1)', penaltyXpPercentage: 5 },
      { step: 2, title: 'Puntos críticos', contentLatex: 'y\' = 0 \\implies x_1 = 0, \\quad x_2 = 1, \\quad x_3 = -1', penaltyXpPercentage: 15 },
      { step: 3, title: 'Derivada segunda', contentLatex: 'y\'\' = 12x^2 - 4', penaltyXpPercentage: 25 },
      { step: 4, title: 'Clasificar extremos', contentLatex: 'y\'\'(0) = -4 < 0 \\implies \\text{Máx en } (0,0); \\quad y\'\'(\\pm 1) = 8 > 0 \\implies \\text{Mín en } (\\pm 1, -1)', penaltyXpPercentage: 35 },
      { step: 5, title: 'Puntos de inflexión', contentLatex: 'y\'\' = 0 \\implies 12x^2 = 4 \\implies x = \\pm \\frac{1}{\\sqrt{3}} = \\pm \\frac{\\sqrt{3}}{3}; \\quad y = \\frac{1}{9} - \\frac{2}{3} = -\\frac{5}{9}', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_LAGRANGE'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 2,
      topicName: 'Estudio Completo de Funciones',
      practicalWorkNumber: 2,
      exerciseNumber: '6.i',
      pageReference: 6
    },
    explanation: {
      whatYouDid: 'Calculaste los puntos críticos anulando la derivada primera y los clasificaste con el signo de la derivada segunda.',
      whereIsMistake: 'En la regla de signos de la 2ª derivada: y\'\' < 0 indica concavidad hacia abajo (máximo) y no mínimo.',
      whyIsIncorrect: 'La curva es simétrica par f(-x) = f(x), con un pico en el origen y dos valles iguales en x = 1 y x = -1.',
      whatToDetectNextTime: 'Nota que y\'\'(0) = -4 < 0; asocia siempre signo negativo de la segunda derivada con cóncava hacia abajo (máximo).',
      correctResolutionLatex: 'y\' = 4x(x^2-1)=0 \\implies x \\in \\{0, \\pm 1\\}; \\quad y\'\'=12x^2-4 \\implies y\'\'(0)=-4<0, \\, y\'\'(\\pm 1)=8>0',
      examFreeTip: 'En el libre de la UNNE suelen pedir trazar la gráfica aproximada a partir de los puntos hallados.'
    }
  },
  {
    id: 'EX_U3_02',
    unitId: 'U3',
    topicId: 'U3_T3',
    subtopicTitle: 'Teorema de Rolle en Polinomios Cuadráticos',
    type: 'multiple_choice',
    difficulty: 2,
    promptLatex: '\\text{Verificar si } f(x) = x^2 - 4x + 3 \\text{ satisface las hipótesis del Teorema de Rolle en } [1, 3] \\text{ y hallar el punto } \\xi.',
    instructionText: 'Comprueba continuidad en el cerrado, derivabilidad en el abierto, igualdad f(a) = f(b) y resuelve f\'(ξ) = 0.',
    options: [
      { id: 'opt_a', textLatex: '\\text{Cumple hipótesis y } \\xi = 2 \\in (1, 3)', isCorrect: true },
      { id: 'opt_b', textLatex: '\\text{No cumple porque } f(1) \\ne f(3)', isCorrect: false, specificFeedback: 'f(1) = 0 y f(3) = 0, sí son iguales.' },
      { id: 'opt_c', textLatex: '\\text{Cumple hipótesis pero } \\xi = 0', isCorrect: false, specificFeedback: 'f\'(0) = -4 ≠ 0, además ξ = 0 no pertenece al intervalo (1, 3).' },
      { id: 'opt_d', textLatex: '\\text{No es derivable en el intervalo abierto}', isCorrect: false, specificFeedback: 'Los polinomios son infinitamente derivables en todo ℝ.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Continuidad', contentLatex: 'f \\text{ es polinómica } \\implies \\text{continua en } [1, 3]', penaltyXpPercentage: 5 },
      { step: 2, title: 'Derivabilidad', contentLatex: 'f\'(x) = 2x - 4 \\text{ existe } \\forall x \\in (1, 3)', penaltyXpPercentage: 15 },
      { step: 3, title: 'Valores en los extremos', contentLatex: 'f(1) = 1 - 4 + 3 = 0, \\quad f(3) = 9 - 12 + 3 = 0 \\implies f(1) = f(3)', penaltyXpPercentage: 25 },
      { step: 4, title: 'Plantear condición de Rolle', contentLatex: 'f\'(\\xi) = 0 \\implies 2\\xi - 4 = 0', penaltyXpPercentage: 35 },
      { step: 5, title: 'Despejar y verificar pertenencia', contentLatex: '\\xi = 2 \\in (1, 3)', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_LAGRANGE'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 2,
      topicName: 'Teoremas de Rolle y Lagrange',
      practicalWorkNumber: 2,
      exerciseNumber: '7.a',
      pageReference: 6
    },
    explanation: {
      whatYouDid: 'Verificaste las tres hipótesis de Rolle: continuidad en [a,b], derivabilidad en (a,b) y f(a)=f(b), y hallaste el punto donde la tangente es horizontal.',
      whereIsMistake: 'En omitir la verificación explícita de f(a) = f(b) antes de igualar f\' a cero.',
      whyIsIncorrect: 'El Teorema de Rolle exige indispensablemente que los valores en los extremos coincidan para garantizar una tangente horizontal intermedia.',
      whatToDetectNextTime: 'Para funciones cuadráticas, el punto de Rolle ξ siempre coincide con el punto medio (a+b)/2 = (1+3)/2 = 2.',
      correctResolutionLatex: 'f(1)=f(3)=0; \\quad f\'(x)=2x-4=0 \\implies \\xi = 2 \\in (1, 3)',
      examFreeTip: 'En el examen libre debes redactar las 3 hipótesis por separado con nombre y apellido antes de calcular ξ.'
    }
  },
  {
    id: 'EX_U3_04',
    unitId: 'U3',
    topicId: 'U3_T4',
    subtopicTitle: 'Polinomio de Maclaurin de Orden 4',
    type: 'multiple_choice',
    difficulty: 3,
    promptLatex: '\\text{Hallar el polinomio de Maclaurin de orden 4 para la función } g(x) = e^{-x}',
    instructionText: 'Calcula las derivadas sucesivas en x = 0 y construye el polinomio P₄(x) = ∑ [g^(k)(0)/k!] x^k.',
    options: [
      { id: 'opt_a', textLatex: 'P_4(x) = 1 - x + \\frac{x^2}{2} - \\frac{x^3}{6} + \\frac{x^4}{24}', isCorrect: true },
      { id: 'opt_b', textLatex: 'P_4(x) = 1 + x + \\frac{x^2}{2} + \\frac{x^3}{6} + \\frac{x^4}{24}', isCorrect: false, specificFeedback: 'Ese es el desarrollo de e^x, no de e^(-x); los signos deben alternar.' },
      { id: 'opt_c', textLatex: 'P_4(x) = 1 - x + x^2 - x^3 + x^4', isCorrect: false, specificFeedback: 'Olvidaste dividir por los factoriales k! (2!, 3!, 4!).' },
      { id: 'opt_d', textLatex: 'P_4(x) = -x + \\frac{x^2}{2} - \\frac{x^3}{6} + \\frac{x^4}{24}', isCorrect: false, specificFeedback: 'Omitiste el término constante g(0) = e^0 = 1.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Fórmula de Maclaurin', contentLatex: 'P_4(x) = g(0) + g\'(0)x + \\frac{g\'\'(0)}{2!}x^2 + \\frac{g\'\'\'(0)}{3!}x^3 + \\frac{g^{(4)}(0)}{4!}x^4', penaltyXpPercentage: 5 },
      { step: 2, title: 'Derivadas pares en 0', contentLatex: 'g(0) = e^0 = 1, \\quad g\'\'(0) = e^0 = 1, \\quad g^{(4)}(0) = 1', penaltyXpPercentage: 15 },
      { step: 3, title: 'Derivadas impares en 0', contentLatex: 'g\'(0) = -e^0 = -1, \\quad g\'\'\'(0) = -e^0 = -1', penaltyXpPercentage: 25 },
      { step: 4, title: 'Calcular factoriales', contentLatex: '2! = 2, \\quad 3! = 6, \\quad 4! = 24', penaltyXpPercentage: 35 },
      { step: 5, title: 'Ensamblar polinomio', contentLatex: 'P_4(x) = 1 - x + \\frac{x^2}{2} - \\frac{x^3}{6} + \\frac{x^4}{24}', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_TAYLOR_MACLAURIN'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 2,
      topicName: 'Polinomios de Taylor y Maclaurin',
      practicalWorkNumber: 2,
      exerciseNumber: '10.b',
      pageReference: 7
    },
    explanation: {
      whatYouDid: 'Derivaste sucesivamente la función exponencial compuesta y evaluaste los coeficientes divididos por k! en el centro x = 0.',
      whereIsMistake: 'En la alternancia de signos generada por la regla de la cadena d/dx[e^(-x)] = -e^(-x).',
      whyIsIncorrect: 'Las derivadas impares aportan signo negativo y las pares signo positivo.',
      whatToDetectNextTime: 'Simplemente toma el desarrollo de e^u = 1 + u + u²/2 + u³/6 + u⁴/24 y sustituye u = -x.',
      correctResolutionLatex: 'g^{(k)}(0) = (-1)^k \\implies P_4(x) = 1 - x + \\frac{x^2}{2} - \\frac{x^3}{6} + \\frac{x^4}{24}',
      examFreeTip: 'En el examen libre de la UNNE suelen pedir también acotar el resto de Lagrange R_n(x).'
    }
  },

  // ==========================================
  // UNIDAD 4: INTEGRALES INDEFINIDAS
  // ==========================================
  {
    id: 'EX_U4_01',
    unitId: 'U4',
    topicId: 'U4_T2',
    subtopicTitle: 'Integración por Partes Polinómica-Exponencial',
    type: 'multiple_choice',
    difficulty: 3,
    promptLatex: '\\int x e^{3x} \\, dx',
    instructionText: 'Resuelve la integral indefinida utilizando el método de integración por partes.',
    options: [
      { id: 'opt_a', textLatex: '\\frac{1}{3}x e^{3x} - \\frac{1}{9}e^{3x} + C', isCorrect: true },
      { id: 'opt_b', textLatex: '\\frac{1}{3}x e^{3x} - \\frac{1}{3}e^{3x} + C', isCorrect: false, specificFeedback: 'Olvidaste volver a dividir por 3 al integrar e^(3x).' },
      { id: 'opt_c', textLatex: 'x e^{3x} - e^{3x} + C', isCorrect: false, specificFeedback: 'Omitiste los coeficientes 1/3 de la constante de la exponencial.' },
      { id: 'opt_d', textLatex: '\\frac{1}{3}x e^{3x} + \\frac{1}{9}e^{3x} + C', isCorrect: false, specificFeedback: 'Error de signo: la fórmula de partes es u·v MENOS la integral de v·du.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Elección de u y dv (ILPET)', contentLatex: 'u = x \\implies du = dx, \\quad dv = e^{3x}dx \\implies v = \\frac{1}{3}e^{3x}', penaltyXpPercentage: 5 },
      { step: 2, title: 'Planteo de la fórmula', contentLatex: '\\int u \\, dv = u \\cdot v - \\int v \\, du', penaltyXpPercentage: 15 },
      { step: 3, title: 'Sustitución de términos', contentLatex: 'x \\left(\\frac{1}{3}e^{3x}\\right) - \\int \\frac{1}{3}e^{3x} \\, dx', penaltyXpPercentage: 25 },
      { step: 4, title: 'Resolver la integral restante', contentLatex: '\\int \\frac{1}{3}e^{3x}dx = \\frac{1}{9}e^{3x}', penaltyXpPercentage: 35 },
      { step: 5, title: 'Resultado con constante C', contentLatex: '\\frac{1}{3}x e^{3x} - \\frac{1}{9}e^{3x} + C', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_INTEGRAL_PARTES'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 3,
      topicName: 'Integrales Indefinidas',
      practicalWorkNumber: 3,
      exerciseNumber: '4.a',
      pageReference: 8
    },
    explanation: {
      whatYouDid: 'Seleccionaste u = x para reducir su grado polinómico y dv = e^(3x)dx como parte integrable.',
      whereIsMistake: 'En no integrar correctamente e^(3x) (que genera un factor 1/3 en cada integración).',
      whyIsIncorrect: 'La integral de e^(kx)dx es (1/k)e^(kx); al integrarse dos veces se convierte en 1/9.',
      whatToDetectNextTime: 'Cada vez que veas un polinomio multiplicado por e^(kx), el polinomio debe ser siempre u.',
      correctResolutionLatex: "\\int x e^{3x}dx = x\\left(\\frac{e^{3x}}{3}\\right) - \\int \\frac{e^{3x}}{3}dx = \\frac{1}{3}x e^{3x} - \\frac{1}{9}e^{3x} + C",
      examFreeTip: 'Comprueba siempre derivando tu resultado: la derivada debe coincidir exactamente con el integrando x·e^(3x).'
    }
  },
  {
    id: 'EX_U4_02',
    unitId: 'U4',
    topicId: 'U4_T2',
    subtopicTitle: 'Integración por Partes con Logaritmo y Potencia',
    type: 'multiple_choice',
    difficulty: 3,
    promptLatex: '\\int x^2 \\ln x \\, dx',
    instructionText: 'Aplica integración por partes eligiendo adecuadamente u y dv.',
    options: [
      { id: 'opt_a', textLatex: '\\frac{x^3}{3}\\ln x - \\frac{x^3}{9} + C', isCorrect: true },
      { id: 'opt_b', textLatex: '\\frac{x^3}{3}\\ln x - \\frac{x^3}{3} + C', isCorrect: false, specificFeedback: 'Olvidaste que la integral de x² aporta otro factor 1/3, dando 1/9.' },
      { id: 'opt_c', textLatex: '\\frac{x^3}{3}\\ln x + \\frac{x^3}{9} + C', isCorrect: false, specificFeedback: 'Error de signo: la fórmula de partes lleva signo menos en la integral.' },
      { id: 'opt_d', textLatex: '2x \\ln x + x + C', isCorrect: false, specificFeedback: 'Derivaste en lugar de integrar.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Regla ALPES', contentLatex: 'u = \\ln x, \\quad dv = x^2 dx', penaltyXpPercentage: 5 },
      { step: 2, title: 'Diferenciar e integrar', contentLatex: 'du = \\frac{1}{x}dx, \\quad v = \\frac{x^3}{3}', penaltyXpPercentage: 15 },
      { step: 3, title: 'Fórmula de partes', contentLatex: 'u \\cdot v - \\int v \\, du = \\frac{x^3}{3}\\ln x - \\int \\frac{x^3}{3}\\frac{1}{x}dx', penaltyXpPercentage: 25 },
      { step: 4, title: 'Simplificar integrando restante', contentLatex: '\\int \\frac{x^2}{3}dx = \\frac{x^3}{9}', penaltyXpPercentage: 35 },
      { step: 5, title: 'Expresión final', contentLatex: '\\frac{x^3}{3}\\ln x - \\frac{x^3}{9} + C = \\frac{x^3}{3}\\left(\\ln x - \\frac{1}{3}\\right) + C', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_INTEGRAL_PARTES'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 3,
      topicName: 'Integración por Partes',
      practicalWorkNumber: 3,
      exerciseNumber: '5.c',
      pageReference: 8
    },
    explanation: {
      whatYouDid: 'Elegiste u = ln x para eliminar el logaritmo mediante su derivada 1/x y dv = x² dx.',
      whereIsMistake: 'En la integración de x²/3 que produce x³/9.',
      whyIsIncorrect: 'Elegir u = x² obligaría a integrar ln x, complejizando innecesariamente el problema.',
      whatToDetectNextTime: 'Siempre que haya un polinomio multiplicado por ln(x), el logaritmo DEBE ser u.',
      correctResolutionLatex: '\\int x^2 \\ln x dx = \\frac{x^3}{3}\\ln x - \\int \\frac{x^2}{3}dx = \\frac{x^3}{3}\\ln x - \\frac{x^3}{9} + C',
      examFreeTip: 'Verifica siempre derivando tu resultado: (x³/3 ln x - x³/9)\' = x² ln x + x²/3 - x²/3 = x² ln x.'
    }
  },
  {
    id: 'EX_U4_03',
    unitId: 'U4',
    topicId: 'U4_T1',
    subtopicTitle: 'Determinación de Curva a partir de la Pendiente',
    type: 'multiple_choice',
    difficulty: 2,
    promptLatex: '\\text{Hallar la función } f(x) \\text{ cuya pendiente en cada punto es } f\'(x) = x^3 + 4, \\text{ sabiendo que pasa por el punto } (0, 1).',
    instructionText: 'Encuentra la familia de primitivas mediante integración indefinida y determina la constante C usando la condición inicial.',
    options: [
      { id: 'opt_a', textLatex: 'f(x) = \\frac{x^4}{4} + 4x + 1', isCorrect: true },
      { id: 'opt_b', textLatex: 'f(x) = \\frac{x^4}{4} + 4x', isCorrect: false, specificFeedback: 'Omitiste la constante C = 1 dada por el punto de paso.' },
      { id: 'opt_c', textLatex: 'f(x) = 3x^2 + 1', isCorrect: false, specificFeedback: 'Derivaste en lugar de integrar f\'(x).' },
      { id: 'opt_d', textLatex: 'f(x) = x^4 + 4x + 1', isCorrect: false, specificFeedback: 'Olvidaste dividir por 4 al integrar x³.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Integrar la pendiente', contentLatex: 'f(x) = \\int (x^3 + 4) dx', penaltyXpPercentage: 5 },
      { step: 2, title: 'Aplicar linealidad', contentLatex: 'f(x) = \\frac{x^4}{4} + 4x + C', penaltyXpPercentage: 15 },
      { step: 3, title: 'Condición del punto de paso', contentLatex: 'f(0) = 1', penaltyXpPercentage: 25 },
      { step: 4, title: 'Reemplazar x = 0', contentLatex: '\\frac{0^4}{4} + 4(0) + C = 1 \\implies C = 1', penaltyXpPercentage: 35 },
      { step: 5, title: 'Escribir la función particular', contentLatex: 'f(x) = \\frac{x^4}{4} + 4x + 1', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_INTEGRAL_PARTES'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 3,
      topicName: 'Integrales Indefinidas',
      practicalWorkNumber: 3,
      exerciseNumber: '5.a',
      pageReference: 8
    },
    explanation: {
      whatYouDid: 'Calculaste la antiderivada general y hallaste la constante particular evaluando en (0, 1).',
      whereIsMistake: 'En asumir que C = 0 o derivar la pendiente en vez de integrarla.',
      whyIsIncorrect: 'La derivada representa la pendiente m; la función original es su integral indefinida sujeta al punto inicial.',
      whatToDetectNextTime: 'Identifica que "pasa por (x₀, y₀)" significa f(x₀) = y₀, lo que fija unívocamente a C.',
      correctResolutionLatex: 'f(x) = \\int (x^3+4)dx = \\frac{x^4}{4}+4x+C; \\quad f(0)=1 \\implies C=1 \\implies f(x)=\\frac{x^4}{4}+4x+1',
      examFreeTip: 'Este problema suele presentarse como problema introductorio de ecuaciones diferenciales de variables separables.'
    }
  },
  {
    id: 'EX_U4_04',
    unitId: 'U4',
    topicId: 'U4_T3',
    subtopicTitle: 'Integrales Trigonométricas de Potencia Impar',
    type: 'multiple_choice',
    difficulty: 3,
    promptLatex: '\\int \\operatorname{sen}^3 x \\, dx',
    instructionText: 'Separa un factor sen x, utiliza la identidad pitagórica sen² x = 1 - cos² x y aplica sustitución u = cos x.',
    options: [
      { id: 'opt_a', textLatex: '\\frac{\\cos^3 x}{3} - \\cos x + C', isCorrect: true },
      { id: 'opt_b', textLatex: '-\\frac{\\cos^3 x}{3} + \\cos x + C', isCorrect: false, specificFeedback: 'Error de signos: al sustituir u = cos x, du = -sen x dx introduce un signo menos.' },
      { id: 'opt_c', textLatex: '\\frac{\\operatorname{sen}^4 x}{4} + C', isCorrect: false, specificFeedback: 'No se puede integrar directamente una potencia sin su derivada interna.' },
      { id: 'opt_d', textLatex: '-\\cos^3 x + C', isCorrect: false, specificFeedback: 'Fórmula incorrecta.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Descomponer potencia impar', contentLatex: '\\operatorname{sen}^3 x = \\operatorname{sen}^2 x \\cdot \\operatorname{sen} x', penaltyXpPercentage: 5 },
      { step: 2, title: 'Identidad fundamental', contentLatex: '\\operatorname{sen}^2 x = 1 - \\cos^2 x', penaltyXpPercentage: 15 },
      { step: 3, title: 'Reescribir integral', contentLatex: '\\int (1 - \\cos^2 x) \\operatorname{sen} x \\, dx', penaltyXpPercentage: 25 },
      { step: 4, title: 'Sustitución', contentLatex: 'u = \\cos x \\implies du = -\\operatorname{sen} x dx \\implies \\operatorname{sen} x dx = -du', penaltyXpPercentage: 35 },
      { step: 5, title: 'Integrar polinomios', contentLatex: '-\\int (1 - u^2) du = \\int (u^2 - 1) du = \\frac{u^3}{3} - u + C = \\frac{\\cos^3 x}{3} - \\cos x + C', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_INTEGRAL_TRIGONOMETRICA'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 3,
      topicName: 'Integrales Trigonométricas',
      practicalWorkNumber: 3,
      exerciseNumber: '6.a',
      pageReference: 9
    },
    explanation: {
      whatYouDid: 'Aislaste un término sen x dx para que sirva de diferencial du de la función u = cos x.',
      whereIsMistake: 'En olvidar que la derivada de cos x es -sen x, lo que invierte los signos de la integral.',
      whyIsIncorrect: 'En potencias impares de sen x o cos x, siempre se reserva una potencia para el diferencial y el resto se convierte con sen² + cos² = 1.',
      whatToDetectNextTime: 'Cuando el exponente es impar, reserva un factor simple para du; si ambos son pares, usa identidades de ángulo doble.',
      correctResolutionLatex: '\\int \\operatorname{sen}^3 x dx = \\int (1 - \\cos^2 x)\\operatorname{sen} x dx = -\\int(1-u^2)du = \\frac{\\cos^3 x}{3} - \\cos x + C',
      examFreeTip: 'En el examen libre de la UNNE suelen comparar esta técnica con la de potencias pares que requiere cos(2x).'
    }
  },

  // ==========================================
  // UNIDAD 5: INTEGRALES DEFINIDAS Y APLICACIONES
  // ==========================================
  {
    id: 'EX_U5_01',
    unitId: 'U5',
    topicId: 'U5_T2',
    subtopicTitle: 'Área Encerrada entre Parábola y Recta',
    type: 'multiple_choice',
    difficulty: 3,
    promptLatex: '\\text{Calcular el área encerrada entre } f(x) = x^2 \\text{ y } g(x) = x + 2',
    instructionText: 'Determina los puntos de intersección y plantea la integral de área respetando la curva superior e inferior.',
    options: [
      { id: 'opt_a', textLatex: '\\text{Área} = \\frac{9}{2} = 4.5', isCorrect: true },
      { id: 'opt_b', textLatex: '\\text{Área} = \\frac{7}{2} = 3.5', isCorrect: false, specificFeedback: 'Error en la primitiva o en la evaluación de los límites de Barrow.' },
      { id: 'opt_c', textLatex: '\\text{Área} = -\\frac{9}{2}', isCorrect: false, specificFeedback: 'Un área no puede ser negativa. Invertiste la función techo y piso.' },
      { id: 'opt_d', textLatex: '\\text{Área} = 9', isCorrect: false, specificFeedback: 'Olvidaste restar la integral de la curva inferior.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Hallar intersecciones', contentLatex: 'x^2 = x + 2 \\implies x^2 - x - 2 = 0 \\implies x_1 = -1, \\quad x_2 = 2', penaltyXpPercentage: 5 },
      { step: 2, title: 'Determinar techo y piso', contentLatex: '\\text{En } (-1, 2), \\quad g(x) = x + 2 \\ge f(x) = x^2', penaltyXpPercentage: 15 },
      { step: 3, title: 'Plantear la integral de área', contentLatex: 'A = \\int_{-1}^2 [(x + 2) - x^2] \\, dx', penaltyXpPercentage: 25 },
      { step: 4, title: 'Calcular la primitiva', contentLatex: 'F(x) = \\frac{x^2}{2} + 2x - \\frac{x^3}{3}', penaltyXpPercentage: 35 },
      { step: 5, title: 'Aplicar Barrow', contentLatex: 'F(2) - F(-1) = \\left(2 + 4 - \\frac{8}{3}\\right) - \\left(\\frac{1}{2} - 2 + \\frac{1}{3}\\right) = \\frac{10}{3} - \\left(-\\frac{7}{6}\\right) = \\frac{9}{2}', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_BARROW'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 4,
      topicName: 'La Integral Definida. Aplicaciones',
      practicalWorkNumber: 4,
      exerciseNumber: '4.a',
      pageReference: 10
    },
    explanation: {
      whatYouDid: 'Calculaste los ceros del sistema de ecuaciones para encontrar los límites de integración y aplicaste Barrow.',
      whereIsMistake: 'Restar f - g en vez de g - f genera un área negativa, lo cual es inaceptable en un examen.',
      whyIsIncorrect: 'La recta y = x + 2 está por encima de la parábola y = x² en todo el intervalo abierto (-1, 2).',
      whatToDetectNextTime: 'Evalúa un punto intermedio (ej: x = 0): g(0) = 2 > f(0) = 0. Claramente la recta es el techo.',
      correctResolutionLatex: "A = \\int_{-1}^2 (x + 2 - x^2)dx = \\left[\\frac{x^2}{2} + 2x - \\frac{x^3}{3}\\right]_{-1}^2 = \\frac{10}{3} - \\left(-\\frac{7}{6}\\right) = \\frac{9}{2}",
      examFreeTip: 'Siempre que calcules áreas, acompaña el planteo analítico con un bosquejo gráfico de las funciones.'
    }
  },
  {
    id: 'EX_U5_02',
    unitId: 'U5',
    topicId: 'U5_T2',
    subtopicTitle: 'Área Bajo la Parábola y el Eje de Abscisas',
    type: 'multiple_choice',
    difficulty: 2,
    promptLatex: '\\text{Calcular el área de la región acotada por la curva } y = 4 - x^2 \\text{ y el eje de abscisas } y = 0.',
    instructionText: 'Halla los puntos de corte con el eje x y evalúa la integral definida mediante la regla de Barrow.',
    options: [
      { id: 'opt_a', textLatex: '\\text{Área} = \\frac{32}{3} \\approx 10.67', isCorrect: true },
      { id: 'opt_b', textLatex: '\\text{Área} = \\frac{16}{3} \\approx 5.33', isCorrect: false, specificFeedback: 'Calculaste solo la mitad del área (de 0 a 2) sin multiplicar por 2.' },
      { id: 'opt_c', textLatex: '\\text{Área} = 16', isCorrect: false, specificFeedback: 'No integraste la función parabólica correctamente.' },
      { id: 'opt_d', textLatex: '\\text{Área} = -\\frac{32}{3}', isCorrect: false, specificFeedback: 'El área geométrica debe ser positiva.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Puntos de intersección con y = 0', contentLatex: '4 - x^2 = 0 \\implies x_1 = -2, \\quad x_2 = 2', penaltyXpPercentage: 5 },
      { step: 2, title: 'Verificar signo en el intervalo', contentLatex: '4 - x^2 \\ge 0 \\text{ en } [-2, 2]', penaltyXpPercentage: 15 },
      { step: 3, title: 'Plantear integral simétrica', contentLatex: 'A = \\int_{-2}^2 (4 - x^2) dx = 2 \\int_0^2 (4 - x^2) dx', penaltyXpPercentage: 25 },
      { step: 4, title: 'Primitiva', contentLatex: 'F(x) = 4x - \\frac{x^3}{3}', penaltyXpPercentage: 35 },
      { step: 5, title: 'Evaluar por Barrow', contentLatex: '2 \\left[4(2) - \\frac{8}{3}\\right] = 2 \\left(\\frac{16}{3}\\right) = \\frac{32}{3}', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_BARROW'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 4,
      topicName: 'Áreas Planas',
      practicalWorkNumber: 4,
      exerciseNumber: '4.b',
      pageReference: 10
    },
    explanation: {
      whatYouDid: 'Hallaste las raíces de la parábola invertida e integraste entre -2 y 2 aprovechando la simetría par.',
      whereIsMistake: 'En integrar solo de 0 a 2 olvidando la región simétrica del semiplano izquierdo.',
      whyIsIncorrect: 'La región total se extiende desde x = -2 hasta x = +2.',
      whatToDetectNextTime: 'Aprovecha siempre la simetría de funciones pares: ∫_{-a}^a f(x)dx = 2 ∫_0^a f(x)dx.',
      correctResolutionLatex: 'A = 2 \\int_0^2 (4 - x^2)dx = 2\\left[4x - \\frac{x^3}{3}\\right]_0^2 = 2\\left(8 - \\frac{8}{3}\\right) = \\frac{32}{3}',
      examFreeTip: 'Mencionar la propiedad de simetría par en el examen libre demuestra madurez matemática ante el tribunal.'
    }
  },
  {
    id: 'EX_U5_03',
    unitId: 'U5',
    topicId: 'U5_T3',
    subtopicTitle: 'Volumen de Sólido de Revolución por Discos',
    type: 'multiple_choice',
    difficulty: 3,
    promptLatex: '\\text{Calcular el volumen del sólido generado al girar } f(x) = x^2 + 3 \\text{ alrededor del eje } x \\text{ en el intervalo } [-2, 2].',
    instructionText: 'Aplica la fórmula de revolución V = π ∫_a^b [f(x)]² dx desarrollando el cuadrado del binomio.',
    options: [
      { id: 'opt_a', textLatex: 'V = \\frac{404\\pi}{5} = 80.8\\pi', isCorrect: true },
      { id: 'opt_b', textLatex: 'V = \\frac{202\\pi}{5} = 40.4\\pi', isCorrect: false, specificFeedback: 'Calculaste solo la mitad del volumen integrando en [0, 2] sin duplicar.' },
      { id: 'opt_c', textLatex: 'V = 404\\pi', isCorrect: false, specificFeedback: 'Olvidaste dividir por el denominador 5 al integrar x^4.' },
      { id: 'opt_d', textLatex: 'V = \\frac{136\\pi}{3}', isCorrect: false, specificFeedback: 'No elevaste la función al cuadrado antes de integrar.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Fórmula de volumen', contentLatex: 'V = \\pi \\int_{-2}^2 [f(x)]^2 dx', penaltyXpPercentage: 5 },
      { step: 2, title: 'Desarrollar binomio al cuadrado', contentLatex: '(x^2 + 3)^2 = x^4 + 6x^2 + 9', penaltyXpPercentage: 15 },
      { step: 3, title: 'Usar simetría par', contentLatex: 'V = 2\\pi \\int_0^2 (x^4 + 6x^2 + 9) dx', penaltyXpPercentage: 25 },
      { step: 4, title: 'Calcular primitiva', contentLatex: '\\left[\\frac{x^5}{5} + 2x^3 + 9x\\right]_0^2 = \\frac{32}{5} + 16 + 18 = \\frac{202}{5}', penaltyXpPercentage: 35 },
      { step: 5, title: 'Multiplicar por 2π', contentLatex: 'V = 2\\pi \\cdot \\frac{202}{5} = \\frac{404\\pi}{5}', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_VOLUMEN_REVOLUCION_X'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 4,
      topicName: 'Volúmenes de Revolución',
      practicalWorkNumber: 4,
      exerciseNumber: '6.a.i',
      pageReference: 11
    },
    explanation: {
      whatYouDid: 'Elevaste al cuadrado el radio f(x), integraste término a término y multiplicaste por π.',
      whereIsMistake: 'En olvidar elevar al cuadrado el binomio antes de integrar o perder la constante π.',
      whyIsIncorrect: 'Cada rebanada del cuerpo es un disco circular de área π r² = π [f(x)]².',
      whatToDetectNextTime: 'Desarrolla siempre (a+b)² = a² + 2ab + b² antes de buscar la primitiva.',
      correctResolutionLatex: 'V = \\pi \\int_{-2}^2 (x^4+6x^2+9)dx = 2\\pi\\left[\\frac{x^5}{5}+2x^3+9x\\right]_0^2 = \\frac{404\\pi}{5}',
      examFreeTip: 'Nunca olvides escribir la unidad: unidades de volumen (u³) al finalizar el cálculo.'
    }
  },
  {
    id: 'EX_U5_04',
    unitId: 'U5',
    topicId: 'U5_T4',
    subtopicTitle: 'Integral Impropia de Primera Especie Con Límite Infinito',
    type: 'multiple_choice',
    difficulty: 2,
    promptLatex: '\\int_0^\\infty e^{-x} \\, dx',
    instructionText: 'Plantea el límite con parámetro t tendiendo a infinito y determina si la integral converge o diverge.',
    options: [
      { id: 'opt_a', textLatex: '\\text{Converge y su valor es } 1', isCorrect: true },
      { id: 'opt_b', textLatex: '\\text{Diverge a } +\\infty', isCorrect: false, specificFeedback: 'e^(-t) tiende a 0 cuando t → ∞, la integral no se va a infinito.' },
      { id: 'opt_c', textLatex: '\\text{Converge y su valor es } -1', isCorrect: false, specificFeedback: 'El área bajo una exponencial positiva es estrictamente positiva.' },
      { id: 'opt_d', textLatex: '\\text{Converge a } 0', isCorrect: false, specificFeedback: 'Evaluaste en infinito pero olvidaste restar la evaluación en el límite inferior 0.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Definición de impropia 1ª especie', contentLatex: '\\lim_{t \\to \\infty} \\int_0^t e^{-x} dx', penaltyXpPercentage: 5 },
      { step: 2, title: 'Primitiva de la exponencial negativa', contentLatex: '\\int e^{-x} dx = -e^{-x}', penaltyXpPercentage: 15 },
      { step: 3, title: 'Aplicar Barrow con extremo variable t', contentLatex: '[-e^{-x}]_0^t = -e^{-t} - (-e^0) = -e^{-t} + 1', penaltyXpPercentage: 25 },
      { step: 4, title: 'Calcular límite cuando t tiende a infinito', contentLatex: '\\lim_{t \\to \\infty} (-e^{-t} + 1) = 0 + 1 = 1', penaltyXpPercentage: 35 },
      { step: 5, title: 'Conclusión de convergencia', contentLatex: '\\text{La integral converge y vale 1}', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_INTEGRAL_IMPROPIA_1'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 4,
      topicName: 'Integrales Impropias',
      practicalWorkNumber: 4,
      exerciseNumber: '7.a',
      pageReference: 11
    },
    explanation: {
      whatYouDid: 'Transformaste el límite infinito en un proceso de paso al límite finito lim_{t→∞} F(t) - F(0).',
      whereIsMistake: 'En los signos de la regla de Barrow al restar -(-e⁰) = +1.',
      whyIsIncorrect: 'La integral impropia de primera especie converge si el límite existe y es finito.',
      whatToDetectNextTime: 'Recuerda que e^(-∞) = 0 y e⁰ = 1.',
      correctResolutionLatex: '\\int_0^\\infty e^{-x}dx = \\lim_{t\\to\\infty} [-e^{-x}]_0^t = \\lim_{t\\to\\infty} (1 - e^{-t}) = 1',
      examFreeTip: 'En el examen libre te descalifican si escribes F(∞) en vez de plantear formalmente el límite con variable t.'
    }
  },
  {
    id: 'EX_U5_05',
    unitId: 'U5',
    topicId: 'U5_T4',
    subtopicTitle: 'Problema Aplicado a Sistemas: Compilador C++ a Assembler',
    type: 'multiple_choice',
    difficulty: 4,
    promptLatex: '\\text{Un compilador traduce líneas de código a una velocidad } V(t) = 10t\\sqrt[3]{2 - t^2} \\text{ líneas/s. Hallar el total de líneas traducidas entre } t = 0 \\text{ y } t = 1 \\text{ s.}',
    instructionText: 'Calcula la integral definida N = ∫₀¹ V(t) dt aplicando sustitución con u = 2 - t².',
    options: [
      { id: 'opt_a', textLatex: 'N = \\frac{15}{4}\\left(2^{4/3} - 1\\right) \\approx 5.70 \\text{ líneas}', isCorrect: true },
      { id: 'opt_b', textLatex: 'N = 10\\left(2^{4/3} - 1\\right) \\approx 15.20 \\text{ líneas}', isCorrect: false, specificFeedback: 'Olvidaste multiplicar por el factor 3/4 que proviene de la integral de u^(1/3).' },
      { id: 'opt_c', textLatex: 'N = \\frac{15}{4} \\cdot 2^{4/3} \\approx 9.45 \\text{ líneas}', isCorrect: false, specificFeedback: 'Olvidaste restar el límite inferior u = 1.' },
      { id: 'opt_d', textLatex: 'N = 5 \\text{ líneas}', isCorrect: false, specificFeedback: 'Aproximación lineal errónea.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Plantear la integral de acumulación', contentLatex: 'N = \\int_0^1 10t (2 - t^2)^{1/3} dt', penaltyXpPercentage: 5 },
      { step: 2, title: 'Sustitución de variable', contentLatex: 'u = 2 - t^2 \\implies du = -2t dt \\implies 10t dt = -5 du', penaltyXpPercentage: 15 },
      { step: 3, title: 'Cambio de límites de integración', contentLatex: 't = 0 \\implies u = 2; \\quad t = 1 \\implies u = 1', penaltyXpPercentage: 25 },
      { step: 4, title: 'Invertir límites con el signo menos', contentLatex: '\\int_2^1 (-5) u^{1/3} du = 5 \\int_1^2 u^{1/3} du', penaltyXpPercentage: 35 },
      { step: 5, title: 'Integrar potencia y evaluar', contentLatex: '5 \\left[\\frac{u^{4/3}}{4/3}\\right]_1^2 = 5 \\cdot \\frac{3}{4} (2^{4/3} - 1) = \\frac{15}{4}(2^{4/3} - 1)', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_BARROW'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 4,
      topicName: 'Aplicaciones a Sistemas',
      practicalWorkNumber: 4,
      exerciseNumber: '8',
      pageReference: 12
    },
    explanation: {
      whatYouDid: 'Modelaste la cantidad total de líneas como la integral definida de la tasa instantánea de compilación V(t) y aplicaste sustitución.',
      whereIsMistake: 'En no invertir los límites al cancelar el signo menos del diferencial du = -2t dt.',
      whyIsIncorrect: 'La integral de una velocidad instantánea entre t₁ y t₂ representa siempre la cantidad total acumulada.',
      whatToDetectNextTime: 'Nota que 10t dt es proporcional a la derivada de (2 - t²), lo que indica sustitución inmediata.',
      correctResolutionLatex: 'N = \\int_0^1 10t(2-t^2)^{1/3}dt = 5\\int_1^2 u^{1/3}du = \\frac{15}{4}[u^{4/3}]_1^2 = \\frac{15}{4}(2^{4/3}-1)',
      examFreeTip: 'Este problema fue diseñado específicamente por la cátedra de FaCENA para la carrera de Sistemas.'
    }
  },

  // ==========================================
  // UNIDAD 6: FUNCIONES DE VARIAS VARIABLES
  // ==========================================
  {
    id: 'EX_U6_01',
    unitId: 'U6',
    topicId: 'U6_T1',
    subtopicTitle: 'Dominio Analítico y Geométrico en R²',
    type: 'multiple_choice',
    difficulty: 2,
    promptLatex: '\\text{Determinar y describir el dominio de la función de dos variables: } z = \\ln(x + y)',
    instructionText: 'Establece la condición algebraica de existencia para la función logaritmo natural e interpreta la región en el plano cartesiano xy.',
    options: [
      { id: 'opt_a', textLatex: 'D = \\{(x,y) \\in \\mathbb{R}^2 : y > -x\\} \\text{ (Semiplano abierto por encima de la recta } y = -x\\text{)}', isCorrect: true },
      { id: 'opt_b', textLatex: 'D = \\{(x,y) \\in \\mathbb{R}^2 : y \\ge -x\\} \\text{ (Semiplano cerrado incluyendo la recta)}', isCorrect: false, specificFeedback: 'El argumento del logaritmo debe ser estrictamente positivo (> 0), no puede ser cero.' },
      { id: 'opt_c', textLatex: 'D = \\{(x,y) \\in \\mathbb{R}^2 : x > 0 \\text{ e } y > 0\\} \\text{ (Primer cuadrante)}', isCorrect: false, specificFeedback: 'Es la suma x + y la que debe ser positiva, no cada variable por separado.' },
      { id: 'opt_d', textLatex: 'D = \\{(x,y) \\in \\mathbb{R}^2 : x + y \\ne 0\\}', isCorrect: false, specificFeedback: 'El logaritmo tampoco está definido para valores negativos.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Condición del logaritmo', contentLatex: '\\ln(u) \\text{ exige que su argumento sea estrictamente positivo: } u > 0', penaltyXpPercentage: 5 },
      { step: 2, title: 'Plantear inecuación', contentLatex: 'x + y > 0', penaltyXpPercentage: 15 },
      { step: 3, title: 'Despejar y en función de x', contentLatex: 'y > -x', penaltyXpPercentage: 25 },
      { step: 4, title: 'Frontera del dominio', contentLatex: 'y = -x \\text{ (recta bisectriz del 2º y 4º cuadrante con línea discontinua)}', penaltyXpPercentage: 35 },
      { step: 5, title: 'Región correspondiente', contentLatex: '\\text{Todos los puntos estrictamente por encima de la recta } y = -x', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_DOMINIO_2V'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 5,
      topicName: 'Funciones de Varias Variables',
      practicalWorkNumber: 5,
      exerciseNumber: '1.c',
      pageReference: 13
    },
    explanation: {
      whatYouDid: 'Identificaste la restricción de positividad del logaritmo y graficaste la frontera como recta discontinua.',
      whereIsMistake: 'En incluir la recta frontera y = -x donde el argumento se hace 0 (ln(0) no existe).',
      whyIsIncorrect: 'La función logaritmo natural solo admite argumentos estrictamente positivos pertenecientes a (0, +∞).',
      whatToDetectNextTime: 'Distingue siempre frontera incluida (desigualdad amplia ≥) con línea continua de frontera excluida (desigualdad estricta >) con línea de trazos.',
      correctResolutionLatex: 'x + y > 0 \\iff y > -x \\implies D = \\{(x, y) \\in \\mathbb{R}^2 : y > -x\\}',
      examFreeTip: 'En el examen libre de la UNNE debes dibujar el plano cartesiano marcando la línea de trazos y sombrear el semiplano superior.'
    }
  },
  {
    id: 'EX_U6_02',
    unitId: 'U6',
    topicId: 'U6_T2',
    subtopicTitle: 'Curvas de Nivel de un Paraboloide Elíptico',
    type: 'multiple_choice',
    difficulty: 2,
    promptLatex: '\\text{Describir las curvas de nivel de la superficie } z = x^2 + y^2 \\text{ para valores constantes } z = c \\ge 0.',
    instructionText: 'Fija z = c y clasifica la familia de curvas generadas en el plano xy.',
    options: [
      { id: 'opt_a', textLatex: '\\text{Circunferencias concéntricas con centro en } (0,0) \\text{ y radio } r = \\sqrt{c} \\text{ (un punto para } c = 0\\text{)}', isCorrect: true },
      { id: 'opt_b', textLatex: '\\text{Parábolas paralelas que se abren hacia el eje } y', isCorrect: false, specificFeedback: 'x² + y² = c es la ecuación canónica de una circunferencia, no de una parábola.' },
      { id: 'opt_c', textLatex: '\\text{Hipérbolas equiláteras asintóticas}', isCorrect: false, specificFeedback: 'Las hipérbolas tendrían signo opuesto: x² - y² = c.' },
      { id: 'opt_d', textLatex: '\\text{Rectas paralelas de pendiente constante}', isCorrect: false, specificFeedback: 'Las rectas provienen de planos ax + by = c, no de cuádricas.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Definición de curva de nivel', contentLatex: '\\text{Intersección de la superficie con el plano horizontal } z = c', penaltyXpPercentage: 5 },
      { step: 2, title: 'Igualar la función a la constante', contentLatex: 'x^2 + y^2 = c', penaltyXpPercentage: 15 },
      { step: 3, title: 'Analizar para c > 0', contentLatex: 'x^2 + y^2 = (\\sqrt{c})^2 \\implies \\text{Circunferencia de radio } r = \\sqrt{c}', penaltyXpPercentage: 25 },
      { step: 4, title: 'Analizar para c = 0', contentLatex: 'x^2 + y^2 = 0 \\implies \\text{Punto único en el origen } (0, 0)', penaltyXpPercentage: 35 },
      { step: 5, title: 'Analizar para c < 0', contentLatex: 'x^2 + y^2 = c < 0 \\implies \\text{Conjunto vacío } \\emptyset', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_CURVAS_NIVEL'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 5,
      topicName: 'Curvas de Nivel',
      practicalWorkNumber: 5,
      exerciseNumber: '2.a',
      pageReference: 13
    },
    explanation: {
      whatYouDid: 'Fijaste la cota z = c constante y reconociste la ecuación canónica de circunferencias centradas en el origen.',
      whereIsMistake: 'En confundir la superficie tridimensional (paraboloide) con su mapa plano de curvas de nivel (círculos).',
      whyIsIncorrect: 'Las curvas de nivel son siempre figuras planas pertenecientes a R², obtenidas por corte horizontal.',
      whatToDetectNextTime: 'x² + y² = cte siempre genera círculos; ax² + by² = cte genera elipses; x² - y² = cte genera hipérbolas.',
      correctResolutionLatex: 'z = c > 0 \\implies x^2 + y^2 = (\\sqrt{c})^2 \\implies \\text{Circunferencias concéntricas centradas en } (0,0)',
      examFreeTip: 'Te pedirán graficar al menos 3 curvas de nivel indicando el valor de c (ej: c = 1, c = 4, c = 9 con radios 1, 2 y 3).'
    }
  },
  {
    id: 'EX_U6_03',
    unitId: 'U6',
    topicId: 'U6_T3',
    subtopicTitle: 'No Existencia de Límite Doble Mediante Límites Iterados',
    type: 'multiple_choice',
    difficulty: 3,
    promptLatex: '\\text{Calcular los límites iterados y determinar la existencia del límite doble: } \\lim_{(x,y) \\to (0,0)} \\frac{3x^2 + 2y^2}{x^2 + y^2}',
    instructionText: 'Calcula L₁ = lim_{y→0}[lim_{x→0} f(x,y)] y L₂ = lim_{x→0}[lim_{y→0} f(x,y)] y compara sus valores.',
    options: [
      { id: 'opt_a', textLatex: 'L_1 = 2, \\quad L_2 = 3. \\text{ Como } L_1 \\ne L_2, \\text{ el límite doble NO existe.}', isCorrect: true },
      { id: 'opt_b', textLatex: 'L_1 = 3, \\quad L_2 = 3. \\text{ El límite doble existe y vale } 3.', isCorrect: false, specificFeedback: 'Al hacer x = 0 primero, queda 2y²/y² = 2, no 3.' },
      { id: 'opt_c', textLatex: '\\text{El límite doble vale } 0/0 = 0.', isCorrect: false, specificFeedback: '0/0 es una indeterminación, no es igual a 0.' },
      { id: 'opt_d', textLatex: '\\text{El límite doble vale } 5/2 \\text{ por ser el promedio.}', isCorrect: false, specificFeedback: 'El límite de una función no se promedia cuando los límites iterados difieren.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Planteo de L₁ (x tiende a 0 primero)', contentLatex: 'L_1 = \\lim_{y \\to 0} \\left[ \\lim_{x \\to 0} \\frac{3x^2 + 2y^2}{x^2 + y^2} \\right]', penaltyXpPercentage: 5 },
      { step: 2, title: 'Evaluar límite interior de L₁', contentLatex: '\\lim_{x \\to 0} \\frac{0 + 2y^2}{0 + y^2} = \\frac{2y^2}{y^2} = 2 \\implies L_1 = \\lim_{y \\to 0} 2 = 2', penaltyXpPercentage: 15 },
      { step: 3, title: 'Planteo de L₂ (y tiende a 0 primero)', contentLatex: 'L_2 = \\lim_{x \\to 0} \\left[ \\lim_{y \\to 0} \\frac{3x^2 + 2y^2}{x^2 + y^2} \\right]', penaltyXpPercentage: 25 },
      { step: 4, title: 'Evaluar límite interior de L₂', contentLatex: '\\lim_{y \\to 0} \\frac{3x^2 + 0}{x^2 + 0} = \\frac{3x^2}{x^2} = 3 \\implies L_2 = \\lim_{x \\to 0} 3 = 3', penaltyXpPercentage: 35 },
      { step: 5, title: 'Criterio de no existencia', contentLatex: 'L_1 = 2 \\ne L_2 = 3 \\implies \\lim_{(x,y)\\to(0,0)} f(x,y) \\text{ no existe}', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_LIMITES_ITERADOS'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 5,
      topicName: 'Límites Iterados',
      practicalWorkNumber: 5,
      exerciseNumber: '4.a',
      pageReference: 13
    },
    explanation: {
      whatYouDid: 'Calculaste los dos límites sucesivos a lo largo de los ejes coordenados demostrando que dan valores distintos.',
      whereIsMistake: 'En suponer que el orden de los límites iterados es conmutativo sin verificar.',
      whyIsIncorrect: 'Si los límites iterados difieren (L₁ ≠ L₂), el Teorema de existencia del límite doble garantiza que el límite simultáneo no existe.',
      whatToDetectNextTime: 'Cuando los grados del numerador y denominador sean idénticos y homogéneos, los límites iterados casi siempre revelan no existencia inmediata.',
      correctResolutionLatex: 'L_1 = \\lim_{y\\to 0} \\frac{2y^2}{y^2} = 2; \\quad L_2 = \\lim_{x\\to 0} \\frac{3x^2}{x^2} = 3; \\quad L_1 \\ne L_2 \\implies \\nexists \\lim_{(x,y)\\to(0,0)} f(x,y)',
      examFreeTip: 'Cuidado en el examen: si L₁ = L₂ NO prueba que el límite exista (requiere analizar familias de rectas y = mx o polares). Pero si L₁ ≠ L₂, prueba categóricamente que NO existe.'
    }
  },

  // ==========================================
  // UNIDAD 7: DERIVADAS DE VARIAS VARIABLES
  // ==========================================
  {
    id: 'EX_U7_01',
    unitId: 'U7',
    topicId: 'U7_T3',
    subtopicTitle: 'Extremos Relativos y Criterio del Hessiano',
    type: 'multiple_choice',
    difficulty: 4,
    promptLatex: '\\text{Hallar y clasificar los extremos relativos de } z = x^2 + xy + y^2 - 6x - 9y + 2',
    instructionText: 'Halla los puntos críticos anulando las derivadas parciales de 1º orden y clasifica con el discriminante del Hessiano.',
    options: [
      { id: 'opt_a', textLatex: 'P(1, 4) \\text{ es un Mínimo Relativo}', isCorrect: true },
      { id: 'opt_b', textLatex: 'P(1, 4) \\text{ es un Punto de Ensilladura}', isCorrect: false, specificFeedback: 'El Hessiano H = z_xx·z_yy - (z_xy)² da positivo (+3), no negativo.' },
      { id: 'opt_c', textLatex: 'P(1, 4) \\text{ es un Máximo Relativo}', isCorrect: false, specificFeedback: 'z_xx = 2 > 0, por lo tanto la superficie es cóncava hacia arriba (mínimo).' },
      { id: 'opt_d', textLatex: 'P(3, 4.5) \\text{ es un Mínimo Relativo}', isCorrect: false, specificFeedback: 'No resolviste correctamente el sistema lineal con el término cruzado xy.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Calcular derivadas primeras', contentLatex: 'z_x = 2x + y - 6, \\quad z_y = x + 2y - 9', penaltyXpPercentage: 5 },
      { step: 2, title: 'Resolver sistema 2x2', contentLatex: '\\begin{cases} 2x + y = 6 \\\\ x + 2y = 9 \\end{cases} \\implies x = 1, \\quad y = 4', penaltyXpPercentage: 15 },
      { step: 3, title: 'Calcular derivadas segundas', contentLatex: 'z_{xx} = 2, \\quad z_{yy} = 2, \\quad z_{xy} = 1', penaltyXpPercentage: 25 },
      { step: 4, title: 'Calcular el Hessiano H', contentLatex: 'H = z_{xx}z_{yy} - (z_{xy})^2 = (2)(2) - (1)^2 = 4 - 1 = 3 > 0', penaltyXpPercentage: 35 },
      { step: 5, title: 'Clasificar según signo de z_xx', contentLatex: 'H > 0 \\text{ y } z_{xx} = 2 > 0 \\implies \\text{Mínimo Relativo en } (1, 4)', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_HESSIANO'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 6,
      topicName: 'Derivadas Parciales',
      practicalWorkNumber: 6,
      exerciseNumber: '6.f',
      pageReference: 14
    },
    explanation: {
      whatYouDid: 'Resolviste el sistema lineal de derivadas parciales para encontrar el punto crítico y aplicaste el determinante Hessiano.',
      whereIsMistake: 'En el cálculo del término cruzado z_xy o en la resolución simultánea de 2x + y = 6 y x + 2y = 9.',
      whyIsIncorrect: 'Un Hessiano positivo (H > 0) garantiza un extremo relativo; el signo de z_xx determina que se abre hacia arriba.',
      whatToDetectNextTime: 'Si H > 0 mira de inmediato z_xx. Si z_xx > 0 es Mínimo; si z_xx < 0 es Máximo.',
      correctResolutionLatex: "\\begin{cases} 2x+y-6=0 \\\\ x+2y-9=0 \\end{cases} \\implies P(1,4); \\quad H = \\det\\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix} = 3 > 0; \\quad z_{xx}=2>0 \\implies \\text{Mínimo}",
      examFreeTip: 'Este tipo de ejercicio aparece en el 90% de los exámenes libres de la UNNE como problema de análisis completo.'
    }
  },
  {
    id: 'EX_U7_02',
    unitId: 'U7',
    topicId: 'U7_T1',
    subtopicTitle: 'Teorema de Schwarz y Derivadas Cruzadas',
    type: 'multiple_choice',
    difficulty: 2,
    promptLatex: '\\text{Verificar el Teorema de Schwarz para } f(x, y) = x \\cos y + y \\cos x \\text{ hallando } f\'\'_{xy} \\text{ y } f\'\'_{yx}.',
    instructionText: 'Calcula las derivadas parciales de primer orden, deriva cruzado respecto a la otra variable y compara.',
    options: [
      { id: 'opt_a', textLatex: 'f\'\'_{xy} = f\'\'_{yx} = -\\operatorname{sen} y - \\operatorname{sen} x', isCorrect: true },
      { id: 'opt_b', textLatex: 'f\'\'_{xy} = \\operatorname{sen} y + \\operatorname{sen} x; \\quad f\'\'_{yx} = -\\operatorname{sen} y - \\operatorname{sen} x', isCorrect: false, specificFeedback: 'Error de signos en las derivadas de coseno.' },
      { id: 'opt_c', textLatex: 'f\'\'_{xy} = \\cos y - \\cos x', isCorrect: false, specificFeedback: 'Derivaste respecto a la misma variable en lugar de cruzar.' },
      { id: 'opt_d', textLatex: 'f\'\'_{xy} = 0 \\text{ porque son variables independientes}', isCorrect: false, specificFeedback: 'x e y aparecen multiplicadas con funciones de la otra variable.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Derivada respecto a x', contentLatex: 'f\'_x = \\frac{\\partial}{\\partial x}[x \\cos y + y \\cos x] = \\cos y - y \\operatorname{sen} x', penaltyXpPercentage: 5 },
      { step: 2, title: 'Derivar f\'_x respecto a y', contentLatex: 'f\'\'_{xy} = \\frac{\\partial}{\\partial y}[\\cos y - y \\operatorname{sen} x] = -\\operatorname{sen} y - \\operatorname{sen} x', penaltyXpPercentage: 15 },
      { step: 3, title: 'Derivada respecto a y', contentLatex: 'f\'_y = \\frac{\\partial}{\\partial y}[x \\cos y + y \\cos x] = -x \\operatorname{sen} y + \\cos x', penaltyXpPercentage: 25 },
      { step: 4, title: 'Derivar f\'_y respecto a x', contentLatex: 'f\'\'_{yx} = \\frac{\\partial}{\\partial x}[-x \\operatorname{sen} y + \\cos x] = -\\operatorname{sen} y - \\operatorname{sen} x', penaltyXpPercentage: 35 },
      { step: 5, title: 'Verificación de igualdad', contentLatex: 'f\'\'_{xy} = f\'\'_{yx} = -\\operatorname{sen} y - \\operatorname{sen} x', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_TEOREMA_SCHWARZ'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 6,
      topicName: 'Derivadas Parciales de 2º Orden',
      practicalWorkNumber: 6,
      exerciseNumber: '3.a',
      pageReference: 14
    },
    explanation: {
      whatYouDid: 'Calculaste f_xy y f_yx de forma independiente demostrando que coinciden exactamente.',
      whereIsMistake: 'En los signos de la derivada de cos y (que es -sen y) y cos x (que es -sen x).',
      whyIsIncorrect: 'Por el Teorema de Schwarz (Clairaut), si las derivadas de segundo orden son continuas, el orden de derivación es indistinto.',
      whatToDetectNextTime: 'Cuando deriven respecto a x, consideren a y como una constante fija, y viceversa.',
      correctResolutionLatex: 'f_{xy} = \\frac{\\partial}{\\partial y}(\\cos y - y\\operatorname{sen} x) = -\\operatorname{sen} y - \\operatorname{sen} x = f_{yx}',
      examFreeTip: 'El Teorema de Schwarz es la hipótesis fundamental para que la matriz Hessiana sea simétrica.'
    }
  },
  {
    id: 'EX_U7_03',
    unitId: 'U7',
    topicId: 'U7_T3',
    subtopicTitle: 'Extremos Relativos y Puntos de Ensilladura',
    type: 'multiple_choice',
    difficulty: 4,
    promptLatex: '\\text{Hallar y clasificar los puntos críticos de } z = x^3 + y^2 - 3x',
    instructionText: 'Determina los puntos donde se anulan ambas derivadas parciales y aplica el criterio del determinante Hessiano.',
    options: [
      { id: 'opt_a', textLatex: 'P_1(1, 0) \\text{ es Mínimo Relativo; } P_2(-1, 0) \\text{ es Punto de Ensilladura}', isCorrect: true },
      { id: 'opt_b', textLatex: 'P_1(1, 0) \\text{ es Máximo Relativo; } P_2(-1, 0) \\text{ es Mínimo Relativo}', isCorrect: false, specificFeedback: 'P₂ tiene Hessiano H = -12 < 0, lo que define un punto de ensilladura.' },
      { id: 'opt_c', textLatex: '\\text{Ambos son Puntos de Ensilladura}', isCorrect: false, specificFeedback: 'En P₁, H = +12 > 0 y z_xx = 6 > 0, es un mínimo local.' },
      { id: 'opt_d', textLatex: 'P_1(0, 0) \\text{ es el único punto crítico}', isCorrect: false, specificFeedback: 'z_x = 3x² - 3 = 0 arroja x = ±1, nunca x = 0.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Derivadas parciales de 1º orden', contentLatex: 'z_x = 3x^2 - 3, \\quad z_y = 2y', penaltyXpPercentage: 5 },
      { step: 2, title: 'Puntos críticos', contentLatex: '3(x^2 - 1) = 0 \\implies x = \\pm 1; \\quad 2y = 0 \\implies y = 0 \\implies P_1(1, 0), \\, P_2(-1, 0)', penaltyXpPercentage: 15 },
      { step: 3, title: 'Derivadas parciales de 2º orden', contentLatex: 'z_{xx} = 6x, \\quad z_{yy} = 2, \\quad z_{xy} = 0', penaltyXpPercentage: 25 },
      { step: 4, title: 'Hessiano genérico', contentLatex: 'H = z_{xx}z_{yy} - (z_{xy})^2 = (6x)(2) - 0 = 12x', penaltyXpPercentage: 35 },
      { step: 5, title: 'Evaluar puntos', contentLatex: 'H(1, 0) = 12 > 0, z_{xx}(1)=6>0 \\implies \\text{Mínimo}; \\quad H(-1, 0) = -12 < 0 \\implies \\text{Ensilladura}', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_HESSIANO'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 6,
      topicName: 'Extremos Relativos',
      practicalWorkNumber: 6,
      exerciseNumber: '6.e',
      pageReference: 14
    },
    explanation: {
      whatYouDid: 'Resolviste el sistema de derivadas nulas y clasificaste cada punto crítico con el determinante Hessiano H.',
      whereIsMistake: 'En olvidar la raíz negativa x = -1 al resolver x² - 1 = 0.',
      whyIsIncorrect: 'Un Hessiano negativo H < 0 indica que en una dirección la superficie sube y en otra baja (punto de silla), sin ser extremo.',
      whatToDetectNextTime: 'Si H < 0 no necesitas mirar el signo de z_xx: directamente es Punto de Ensilladura.',
      correctResolutionLatex: 'H(1,0)=12>0, z_{xx}=6>0 \\implies \\text{Mínimo en } (1,0,-2); \\quad H(-1,0)=-12<0 \\implies \\text{Ensilladura en } (-1,0,2)',
      examFreeTip: 'No olvides reportar también el valor de z en cada punto crítico: z(1,0) = -2 y z(-1,0) = 2.'
    }
  },
  {
    id: 'EX_U7_04',
    unitId: 'U7',
    topicId: 'U7_T2',
    subtopicTitle: 'Derivación Implícita del Folium de Descartes',
    type: 'multiple_choice',
    difficulty: 3,
    promptLatex: '\\text{Hallar la derivada } \\frac{dy}{dx} \\text{ de la curva dada implícitamente por } x^3 + y^3 - 6xy = 0',
    instructionText: 'Aplica la fórmula dy/dx = - (F\'_x) / (F\'_y) considerando F(x, y) = x³ + y³ - 6xy.',
    options: [
      { id: 'opt_a', textLatex: '\\frac{dy}{dx} = \\frac{2y - x^2}{y^2 - 2x}', isCorrect: true },
      { id: 'opt_b', textLatex: '\\frac{dy}{dx} = \\frac{x^2 - 2y}{y^2 - 2x}', isCorrect: false, specificFeedback: 'Olvidaste el signo menos de la fórmula de la función implícita.' },
      { id: 'opt_c', textLatex: '\\frac{dy}{dx} = \\frac{y^2 - 2x}{2y - x^2}', isCorrect: false, specificFeedback: 'Invertiste el cociente de derivadas: pusiste F\'_y / F\'_x.' },
      { id: 'opt_d', textLatex: '\\frac{dy}{dx} = -\\frac{3x^2}{3y^2} = -\\frac{x^2}{y^2}', isCorrect: false, specificFeedback: 'Olvidaste derivar el término cruzado -6xy.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Definir la función implícita', contentLatex: 'F(x, y) = x^3 + y^3 - 6xy = 0', penaltyXpPercentage: 5 },
      { step: 2, title: 'Derivada parcial respecto a x', contentLatex: 'F\'_x = 3x^2 - 6y', penaltyXpPercentage: 15 },
      { step: 3, title: 'Derivada parcial respecto a y', contentLatex: 'F\'_y = 3y^2 - 6x', penaltyXpPercentage: 25 },
      { step: 4, title: 'Fórmula de derivación implícita', contentLatex: '\\frac{dy}{dx} = -\\frac{F\'_x}{F\'_y} = -\\frac{3x^2 - 6y}{3y^2 - 6x}', penaltyXpPercentage: 35 },
      { step: 5, title: 'Simplificar factor 3 y signo', contentLatex: '\\frac{-(x^2 - 2y)}{y^2 - 2x} = \\frac{2y - x^2}{y^2 - 2x}', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_DERIVADA_IMPLICITA'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 6,
      topicName: 'Funciones Implícitas',
      practicalWorkNumber: 6,
      exerciseNumber: '7.a',
      pageReference: 14
    },
    explanation: {
      whatYouDid: 'Calculaste las derivadas parciales de la función implícita F(x,y)=0 y aplicaste dy/dx = -F_x / F_y.',
      whereIsMistake: 'En el signo negativo exterior o en la derivación del producto -6xy (cuya derivada respecto a x es -6y y respecto a y es -6x).',
      whyIsIncorrect: 'La diferencial total dF = F_x dx + F_y dy = 0 conduce algebraicamente a dy/dx = -F_x / F_y.',
      whatToDetectNextTime: 'Recuerda: el signo menos proviene de pasar F_x dx al otro miembro de la igualdad.',
      correctResolutionLatex: '\\frac{dy}{dx} = -\\frac{3x^2 - 6y}{3y^2 - 6x} = \\frac{2y - x^2}{y^2 - 2x}',
      examFreeTip: 'El Folium de Descartes es una de las curvas implícitas favoritas de la cátedra de FaCENA.'
    }
  },

  // ==========================================
  // UNIDAD 8: INTEGRALES MÚLTIPLES
  // ==========================================
  {
    id: 'EX_U8_01',
    unitId: 'U8',
    topicId: 'U8_T1',
    subtopicTitle: 'Integral Paramétrica y Regla de Leibniz',
    type: 'multiple_choice',
    difficulty: 2,
    promptLatex: '\\text{Dada la integral paramétrica } I(y) = \\int_1^2 \\frac{x}{y} dx \\text{ para } y > 0, \\text{ hallar } I\'(y) \\text{ derivando bajo el signo integral.}',
    instructionText: 'Aplica la Regla de Leibniz d/dy [∫ f(x,y) dx] = ∫ (∂f/∂y) dx o evalúa primero la integral.',
    options: [
      { id: 'opt_a', textLatex: 'I\'(y) = -\\frac{3}{2y^2}', isCorrect: true },
      { id: 'opt_b', textLatex: 'I\'(y) = \\frac{3}{2y^2}', isCorrect: false, specificFeedback: 'La derivada de 1/y es -1/y², lleva signo menos.' },
      { id: 'opt_c', textLatex: 'I\'(y) = \\frac{3}{2} \\ln y', isCorrect: false, specificFeedback: 'Integraste respecto a y en lugar de derivar.' },
      { id: 'opt_d', textLatex: 'I\'(y) = -\\frac{1}{y^2}', isCorrect: false, specificFeedback: 'Olvidaste evaluar la integral de x dx entre 1 y 2 que da 3/2.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Regla de Leibniz', contentLatex: 'I\'(y) = \\int_1^2 \\frac{\\partial}{\\partial y}\\left(\\frac{x}{y}\\right) dx', penaltyXpPercentage: 5 },
      { step: 2, title: 'Derivada parcial del integrando', contentLatex: '\\frac{\\partial}{\\partial y}\\left(x \\cdot y^{-1}\\right) = -x y^{-2} = -\\frac{x}{y^2}', penaltyXpPercentage: 15 },
      { step: 3, title: 'Extraer constantes respecto a x', contentLatex: 'I\'(y) = -\\frac{1}{y^2} \\int_1^2 x \\, dx', penaltyXpPercentage: 25 },
      { step: 4, title: 'Calcular integral de x', contentLatex: '\\left[\\frac{x^2}{2}\\right]_1^2 = \\frac{4}{2} - \\frac{1}{2} = \\frac{3}{2}', penaltyXpPercentage: 35 },
      { step: 5, title: 'Multiplicar resultados', contentLatex: 'I\'(y) = -\\frac{1}{y^2} \\cdot \\frac{3}{2} = -\\frac{3}{2y^2}', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_LEIBNIZ_PARAMETRICA'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 7,
      topicName: 'Integrales Paramétricas',
      practicalWorkNumber: 7,
      exerciseNumber: '1.a',
      pageReference: 15
    },
    explanation: {
      whatYouDid: 'Derivaste bajo el signo integral aplicando la fórmula de Leibniz para integrales dependientes de un parámetro con límites constantes.',
      whereIsMistake: 'En olvidar el signo menos al derivar y^(-1) o en el cálculo de la integral de x entre 1 y 2.',
      whyIsIncorrect: 'La derivada de 1/y con respecto a y es -1/y².',
      whatToDetectNextTime: 'Comprueba resolviendo primero la integral I(y) = 3/(2y) y derivando directamente I\'(y) = -3/(2y²).',
      correctResolutionLatex: 'I\'(y) = \\int_1^2 -\\frac{x}{y^2}dx = -\\frac{1}{y^2}\\left[\\frac{x^2}{2}\\right]_1^2 = -\\frac{3}{2y^2}',
      examFreeTip: 'En el examen libre te pedirán verificar ambas vías: derivando bajo el signo y resolviendo previamente.'
    }
  },
  {
    id: 'EX_U8_02',
    unitId: 'U8',
    topicId: 'U8_T1',
    subtopicTitle: 'Integral Doble Rectangular Iterada',
    type: 'multiple_choice',
    difficulty: 2,
    promptLatex: '\\int_0^1 \\left( \\int_0^2 (x + y) \\, dx \\right) dy',
    instructionText: 'Calcula primero la integral interior respecto a x tratando a y como constante, y luego integra respecto a y.',
    options: [
      { id: 'opt_a', textLatex: '3', isCorrect: true },
      { id: 'opt_b', textLatex: '2', isCorrect: false, specificFeedback: 'Olvidaste el término correspondiente a y en la integral externa.' },
      { id: 'opt_c', textLatex: '4', isCorrect: false, specificFeedback: 'Error en la evaluación de los límites de integración.' },
      { id: 'opt_d', textLatex: '\\frac{3}{2}', isCorrect: false, specificFeedback: 'Calculaste solo la integral de x² / 2.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Resolver integral interior (dx)', contentLatex: '\\int_0^2 (x + y) dx = \\left[\\frac{x^2}{2} + yx\\right]_0^2', penaltyXpPercentage: 5 },
      { step: 2, title: 'Evaluar límites en x = 2 y x = 0', contentLatex: '\\left(\\frac{4}{2} + 2y\\right) - 0 = 2 + 2y', penaltyXpPercentage: 15 },
      { step: 3, title: 'Plantear integral exterior (dy)', contentLatex: '\\int_0^1 (2 + 2y) dy', penaltyXpPercentage: 25 },
      { step: 4, title: 'Calcular primitiva respecto a y', contentLatex: '\\left[2y + y^2\\right]_0^1', penaltyXpPercentage: 35 },
      { step: 5, title: 'Evaluar en límites 1 y 0', contentLatex: '2(1) + 1^2 - 0 = 2 + 1 = 3', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_INTEGRAL_DOBLE_AREA'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 7,
      topicName: 'Integrales Dobles',
      practicalWorkNumber: 7,
      exerciseNumber: '2.a',
      pageReference: 15
    },
    explanation: {
      whatYouDid: 'Resolviste la integral doble iterada aplicando el Teorema de Fubini de adentro hacia afuera.',
      whereIsMistake: 'En olvidar que al integrar respecto a x, el término y se integra como y·x.',
      whyIsIncorrect: 'En una integral iterada, las variables de la integración externa actúan como constantes en la integral interna.',
      whatToDetectNextTime: 'Trata a y exactamente como si fuera el número 5 durante la primera etapa respecto a x.',
      correctResolutionLatex: '\\int_0^1 \\left[\\frac{x^2}{2}+yx\\right]_0^2 dy = \\int_0^1 (2+2y)dy = [2y+y^2]_0^1 = 3',
      examFreeTip: 'El Teorema de Fubini permite invertir el orden a dy dx sobre rectángulos dando exactamente el mismo valor 3.'
    }
  },
  {
    id: 'EX_U8_03',
    unitId: 'U8',
    topicId: 'U8_T2',
    subtopicTitle: 'Área de Centro de Procesamiento de Datos (Sistemas)',
    type: 'multiple_choice',
    difficulty: 3,
    promptLatex: '\\text{Calcular mediante integral doble el área del recinto acotado por } f_1(x) = 1 - x \\text{ y } f_2(x) = 3 - x^2',
    instructionText: 'Determina las abscisas de intersección y plantea la integral doble Área = ∬_D dx dy = ∫ [f₂(x) - f₁(x)] dx.',
    options: [
      { id: 'opt_a', textLatex: '\\text{Área} = \\frac{9}{2} = 4.5', isCorrect: true },
      { id: 'opt_b', textLatex: '\\text{Área} = \\frac{7}{2} = 3.5', isCorrect: false, specificFeedback: 'Error al evaluar la primitiva en el límite inferior x = -1.' },
      { id: 'opt_c', textLatex: '\\text{Área} = 9', isCorrect: false, specificFeedback: 'Olvidaste restar la curva inferior f₁(x).' },
      { id: 'opt_d', textLatex: '\\text{Área} = -\\frac{9}{2}', isCorrect: false, specificFeedback: 'Invertiste el techo y el piso obteniendo un área negativa.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Hallar intersecciones', contentLatex: '3 - x^2 = 1 - x \\implies x^2 - x - 2 = 0 \\implies x_1 = -1, \\quad x_2 = 2', penaltyXpPercentage: 5 },
      { step: 2, title: 'Determinar curva superior e inferior', contentLatex: '\\text{En } (-1, 2), \\quad 3 - x^2 \\ge 1 - x', penaltyXpPercentage: 15 },
      { step: 3, title: 'Planteo de integral doble', contentLatex: '\\text{Área} = \\int_{-1}^2 \\left(\\int_{1-x}^{3-x^2} dy\\right) dx = \\int_{-1}^2 (3 - x^2 - 1 + x) dx', penaltyXpPercentage: 25 },
      { step: 4, title: 'Simplificar integrando', contentLatex: '\\int_{-1}^2 (2 + x - x^2) dx = \\left[2x + \\frac{x^2}{2} - \\frac{x^3}{3}\\right]_{-1}^2', penaltyXpPercentage: 35 },
      { step: 5, title: 'Evaluar por Barrow', contentLatex: '\\left(4 + 2 - \\frac{8}{3}\\right) - \\left(-2 + \\frac{1}{2} + \\frac{1}{3}\\right) = \\frac{10}{3} - \\left(-\\frac{7}{6}\\right) = \\frac{27}{6} = \\frac{9}{2}', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_INTEGRAL_DOBLE_AREA'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 7,
      topicName: 'Áreas por Integrales Dobles',
      practicalWorkNumber: 7,
      exerciseNumber: '4',
      pageReference: 16
    },
    explanation: {
      whatYouDid: 'Planteaste el cálculo de área mediante la integral doble de la función 1 sobre la región regular tipo I.',
      whereIsMistake: 'En la evaluación de Barrow en x = -1 donde los signos del cubo (-1)³ = -1 producen errores de resta.',
      whyIsIncorrect: 'El integrando de área es siempre 1 dx dy; tras la primera integración queda la resta de techo menos piso.',
      whatToDetectNextTime: 'Evalúa un punto intermedio, por ejemplo x = 0: 3 - 0² = 3 > 1 - 0 = 1, confirmando que la parábola es el techo.',
      correctResolutionLatex: '\\text{Área} = \\int_{-1}^2 (2 + x - x^2)dx = \\left[2x + \\frac{x^2}{2} - \\frac{x^3}{3}\\right]_{-1}^2 = \\frac{10}{3} + \\frac{7}{6} = \\frac{9}{2}',
      examFreeTip: 'Este problema figura textualmente en la Guía de TP de FaCENA como aplicación para estudiantes de Sistemas.'
    }
  },

  // ==========================================
  // UNIDAD 9: ECUACIONES DIFERENCIALES
  // ==========================================
  {
    id: 'EX_U9_01',
    unitId: 'U9',
    topicId: 'U9_T3',
    subtopicTitle: 'Ecuaciones Diferenciales Exactas',
    type: 'multiple_choice',
    difficulty: 3,
    promptLatex: '\\text{Determinar si la ecuación es exacta y resolver: } (2x + 4)dx + (3y - 1)dy = 0',
    instructionText: 'Comprueba la condición de simetría de Schwarz y encuentra la función potencial U(x, y) = C.',
    options: [
      { id: 'opt_a', textLatex: 'x^2 + 4x + \\frac{3}{2}y^2 - y = C', isCorrect: true },
      { id: 'opt_b', textLatex: '2x^2 + 4x + 3y^2 - y = C', isCorrect: false, specificFeedback: 'Error al integrar 2x dx o 3y dy: la integral de 2x es x², no 2x².' },
      { id: 'opt_c', textLatex: 'x^2 + 4x - \\frac{3}{2}y^2 + y = C', isCorrect: false, specificFeedback: 'Error de signos en la función potencial.' },
      { id: 'opt_d', textLatex: '\\text{No es exacta porque } P_x \\ne Q_y', isCorrect: false, specificFeedback: 'La condición de simetría exige comparar P_y con Q_x, no P_x con Q_y.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Identificar P y Q', contentLatex: 'P(x,y) = 2x + 4, \\quad Q(x,y) = 3y - 1', penaltyXpPercentage: 5 },
      { step: 2, title: 'Verificar simetría de derivadas cruzadas', contentLatex: '\\frac{\\partial P}{\\partial y} = 0, \\quad \\frac{\\partial Q}{\\partial x} = 0 \\implies \\frac{\\partial P}{\\partial y} = \\frac{\\partial Q}{\\partial x} = 0 \\implies \\text{Es Exacta}', penaltyXpPercentage: 15 },
      { step: 3, title: 'Integrar P(x, y) respecto a x', contentLatex: 'U(x, y) = \\int (2x + 4)dx = x^2 + 4x + \\varphi(y)', penaltyXpPercentage: 25 },
      { step: 4, title: 'Diferenciar respecto a y e igualar a Q', contentLatex: '\\frac{\\partial U}{\\partial y} = \\varphi\'(y) = 3y - 1 \\implies \\varphi(y) = \\frac{3}{2}y^2 - y', penaltyXpPercentage: 35 },
      { step: 5, title: 'Escribir la solución general', contentLatex: 'x^2 + 4x + \\frac{3}{2}y^2 - y = C', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_EDO_EXACTA'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 8,
      topicName: 'Ecuaciones Diferenciales',
      practicalWorkNumber: 8,
      exerciseNumber: '4.a',
      pageReference: 17
    },
    explanation: {
      whatYouDid: 'Verificaste la condición de simetría de derivadas cruzadas ∂P/∂y = ∂Q/∂x y obtuviste la familia potencial.',
      whereIsMistake: 'En no integrar correctamente los monomios lineales o confundir las variables cruzadas.',
      whyIsIncorrect: 'La ecuación representa la diferencial total dU = 0, cuya integral directa es la familia de curvas U(x,y) = C.',
      whatToDetectNextTime: 'Recuerda: P acompaña a dx, pero se deriva respecto a y; Q acompaña a dy, pero se deriva respecto a x.',
      correctResolutionLatex: "\\frac{\\partial P}{\\partial y} = 0 = \\frac{\\partial Q}{\\partial x} \\implies U(x,y) = \\int(2x+4)dx + \\varphi(y) = x^2+4x+\\frac{3}{2}y^2-y = C",
      examFreeTip: 'Siempre debes enunciar formalmente el Teorema de Schwarz al justificar la exactitud.'
    }
  },
  {
    id: 'EX_U9_02',
    unitId: 'U9',
    topicId: 'U9_T1',
    subtopicTitle: 'EDO de Variables Separables',
    type: 'multiple_choice',
    difficulty: 2,
    promptLatex: '\\text{Resolver la ecuación diferencial: } x^3 dx + (y + 1)^2 dy = 0',
    instructionText: 'Separa las variables llevando una a cada miembro e integra ambos miembros.',
    options: [
      { id: 'opt_a', textLatex: '\\frac{x^4}{4} + \\frac{(y + 1)^3}{3} = C', isCorrect: true },
      { id: 'opt_b', textLatex: '\\frac{x^4}{4} - \\frac{(y + 1)^3}{3} = C', isCorrect: false, specificFeedback: 'Al estar ambos términos sumados en el primer miembro, la suma de primitivas iguala a C.' },
      { id: 'opt_c', textLatex: '3x^2 + 2(y + 1) = C', isCorrect: false, specificFeedback: 'Derivaste en lugar de integrar los diferenciales.' },
      { id: 'opt_d', textLatex: 'x^4 + (y + 1)^3 = C', isCorrect: false, specificFeedback: 'Olvidaste los denominadores 4 y 3 que provienen de las reglas de potencias.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Identificar tipo', contentLatex: '\\text{Las variables ya se encuentran separadas con sus respectivos diferenciales}', penaltyXpPercentage: 5 },
      { step: 2, title: 'Integrar miembro a miembro', contentLatex: '\\int x^3 dx + \\int (y + 1)^2 dy = C', penaltyXpPercentage: 15 },
      { step: 3, title: 'Integral de x³', contentLatex: '\\int x^3 dx = \\frac{x^4}{4}', penaltyXpPercentage: 25 },
      { step: 4, title: 'Integral de (y+1)²', contentLatex: '\\int (y + 1)^2 dy = \\frac{(y + 1)^3}{3}', penaltyXpPercentage: 35 },
      { step: 5, title: 'Solución general implícita', contentLatex: '\\frac{x^4}{4} + \\frac{(y + 1)^3}{3} = C', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_EDO_SEPARABLES'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 8,
      topicName: 'Variables Separables',
      practicalWorkNumber: 8,
      exerciseNumber: '1.a',
      pageReference: 17
    },
    explanation: {
      whatYouDid: 'Integraste cada variable con su diferencial correspondiente para obtener la familia implícita de curvas solución.',
      whereIsMistake: 'En olvidar dividir por 4 y por 3 al integrar potencias enteras.',
      whyIsIncorrect: 'La integración indefinida de una suma de formas diferenciales separadas es la suma de sus primitivas igualada a una constante.',
      whatToDetectNextTime: 'Cuando la ecuación tenga términos puramente en x con dx y puramente en y con dy, es de variables separables directas.',
      correctResolutionLatex: '\\int x^3 dx + \\int (y+1)^2 dy = \\frac{x^4}{4} + \\frac{(y+1)^3}{3} = C',
      examFreeTip: 'Multiplicar por 12 para eliminar fracciones da 3x⁴ + 4(y+1)³ = C*, una forma muy apreciada por los docentes.'
    }
  },
  {
    id: 'EX_U9_03',
    unitId: 'U9',
    topicId: 'U9_T2',
    subtopicTitle: 'EDO Lineal de 1º Orden con Condición Inicial (PVI)',
    type: 'multiple_choice',
    difficulty: 3,
    promptLatex: '\\text{Resolver el problema de valor inicial: } y\' + 5y = 20, \\quad y(0) = 2',
    instructionText: 'Calcula el factor integrante μ(x) = e^(∫5dx), halla la solución general y determina la constante C con y(0) = 2.',
    options: [
      { id: 'opt_a', textLatex: 'y = 4 - 2e^{-5x}', isCorrect: true },
      { id: 'opt_b', textLatex: 'y = 4 + 2e^{-5x}', isCorrect: false, specificFeedback: 'Si C = +2, y(0) = 4 + 2 = 6 ≠ 2.' },
      { id: 'opt_c', textLatex: 'y = 20 - 18e^{-5x}', isCorrect: false, specificFeedback: 'Olvidaste dividir 20 por el coeficiente 5 al buscar la solución estacionaria: 20/5 = 4.' },
      { id: 'opt_d', textLatex: 'y = 4 - 2e^{5x}', isCorrect: false, specificFeedback: 'El exponente debe ser negativo (-5x) para que sea solución de y\' + 5y = 20.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Identificar coeficientes', contentLatex: 'P(x) = 5, \\quad Q(x) = 20', penaltyXpPercentage: 5 },
      { step: 2, title: 'Factor integrante', contentLatex: '\\mu(x) = e^{\\int 5 dx} = e^{5x}', penaltyXpPercentage: 15 },
      { step: 3, title: 'Multiplicar ecuación por μ', contentLatex: '(y \\cdot e^{5x})\' = 20 e^{5x}', penaltyXpPercentage: 25 },
      { step: 4, title: 'Integrar ambos lados', contentLatex: 'y \\cdot e^{5x} = \\frac{20}{5}e^{5x} + C = 4e^{5x} + C \\implies y = 4 + C e^{-5x}', penaltyXpPercentage: 35 },
      { step: 5, title: 'Aplicar condición y(0) = 2', contentLatex: '2 = 4 + C e^0 = 4 + C \\implies C = -2 \\implies y = 4 - 2e^{-5x}', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_EDO_LINEAL_1'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 8,
      topicName: 'EDO Lineales de 1º Orden',
      practicalWorkNumber: 8,
      exerciseNumber: '6.a',
      pageReference: 18
    },
    explanation: {
      whatYouDid: 'Resolviste la ecuación lineal de 1º orden mediante factor integrante y fijaste la constante con el dato de Cauchy.',
      whereIsMistake: 'En el signo de C al despejar 2 = 4 + C (da C = -2, no +2).',
      whyIsIncorrect: 'La solución de una ecuación lineal consta de la solución particular constante (4) más la homogénea (Ce^(-5x)).',
      whatToDetectNextTime: 'Nota que y = 4 es el estado de equilibrio (y\' = 0 => 5(4) = 20); la solución evoluciona exponencialmente hacia 4.',
      correctResolutionLatex: 'y = e^{-5x}\\left[\\int 20e^{5x}dx + C\\right] = 4 + C e^{-5x}; \\quad y(0)=2 \\implies 4+C=2 \\implies C=-2 \\implies y = 4 - 2e^{-5x}',
      examFreeTip: 'Verifica siempre tu PVI sustituyendo x = 0: y(0) = 4 - 2 = 2. ¡Comprobación en 3 segundos!'
    }
  },
  {
    id: 'EX_U9_04',
    unitId: 'U9',
    topicId: 'U9_T3',
    subtopicTitle: 'Determinación de Parámetro para EDO Exacta',
    type: 'multiple_choice',
    difficulty: 3,
    promptLatex: '\\text{Hallar el valor de la constante } k \\text{ para que la ecuación sea exacta: } (y^3 + kxy^4 - 2x)dx + (3xy^2 + 20x^2y^3)dy = 0',
    instructionText: 'Calcula ∂P/∂y y ∂Q/∂x, iguala las derivadas cruzadas y despeja el coeficiente k.',
    options: [
      { id: 'opt_a', textLatex: 'k = 10', isCorrect: true },
      { id: 'opt_b', textLatex: 'k = 5', isCorrect: false, specificFeedback: '4k = 40 implica k = 10, no 5.' },
      { id: 'opt_c', textLatex: 'k = 20', isCorrect: false, specificFeedback: 'Olvidaste multiplicar por el exponente 4 al derivar y^4.' },
      { id: 'opt_d', textLatex: 'k = 4', isCorrect: false, specificFeedback: 'Cálculo incorrecto.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Identificar P y Q', contentLatex: 'P(x,y) = y^3 + kxy^4 - 2x, \\quad Q(x,y) = 3xy^2 + 20x^2y^3', penaltyXpPercentage: 5 },
      { step: 2, title: 'Derivar P respecto a y', contentLatex: '\\frac{\\partial P}{\\partial y} = 3y^2 + 4kxy^3', penaltyXpPercentage: 15 },
      { step: 3, title: 'Derivar Q respecto a x', contentLatex: '\\frac{\\partial Q}{\\partial x} = 3y^2 + 40xy^3', penaltyXpPercentage: 25 },
      { step: 4, title: 'Condición de exactitud', contentLatex: '\\frac{\\partial P}{\\partial y} = \\frac{\\partial Q}{\\partial x} \\implies 3y^2 + 4kxy^3 = 3y^2 + 40xy^3', penaltyXpPercentage: 35 },
      { step: 5, title: 'Igualar coeficientes', contentLatex: '4k = 40 \\implies k = 10', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_EDO_EXACTA'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 8,
      topicName: 'Ecuaciones Diferenciales Exactas',
      practicalWorkNumber: 8,
      exerciseNumber: '5.a',
      pageReference: 18
    },
    explanation: {
      whatYouDid: 'Aplicaste el Teorema de Schwarz igualando las derivadas cruzadas ∂P/∂y = ∂Q/∂x para determinar el parámetro.',
      whereIsMistake: 'En la derivada de k x y⁴ respecto a y: baja el 4 dando 4k x y³.',
      whyIsIncorrect: 'Una ecuación diferencial en forma de diferencial total dU = 0 requiere rigurosamente la simetría de derivadas mixtas.',
      whatToDetectNextTime: 'Recuerda: el término que acompaña a dx se deriva respecto a y; el que acompaña a dy se deriva respecto a x.',
      correctResolutionLatex: '\\frac{\\partial P}{\\partial y} = 3y^2 + 4kxy^3 = \\frac{\\partial Q}{\\partial x} = 3y^2 + 40xy^3 \\implies 4k = 40 \\implies k = 10',
      examFreeTip: 'Este tipo de ejercicio es un favorito de los profesores para evaluar exactitud sin obligar a resolver toda la integral potencial.'
    }
  },

  // ==========================================
  // UNIDAD 10: SUCESIONES Y SERIES
  // ==========================================
  {
    id: 'EX_U10_01',
    unitId: 'U10',
    topicId: 'U10_T2',
    subtopicTitle: 'Convergencia de Serie Geométrica',
    type: 'multiple_choice',
    difficulty: 2,
    promptLatex: '\\text{Calcular la suma de la serie infinita: } \\sum_{n=1}^\\infty \\left(\\frac{3}{4}\\right)^n',
    instructionText: 'Verifica si la serie geométrica es convergente y halla el valor exacto de su suma infinita S.',
    options: [
      { id: 'opt_a', textLatex: 'S = 3', isCorrect: true },
      { id: 'opt_b', textLatex: 'S = 4', isCorrect: false, specificFeedback: 'Calculaste a / (1 - q) tomando a = 1, pero la serie comienza en n = 1, por lo que a = 3/4.' },
      { id: 'opt_c', textLatex: 'S = \\frac{3}{4}', isCorrect: false, specificFeedback: 'Ese es solo el primer término, no la suma de la serie infinita.' },
      { id: 'opt_d', textLatex: '\\text{Diverge porque } q = \\frac{3}{4}', isCorrect: false, specificFeedback: '|q| = 3/4 < 1, la serie es estrictamente convergente.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Identificar razón geométrica q', contentLatex: 'q = \\frac{3}{4} \\implies |q| < 1 \\implies \\text{Serie Convergente}', penaltyXpPercentage: 5 },
      { step: 2, title: 'Identificar primer término a', contentLatex: '\\text{Para } n = 1, \\quad a = \\left(\\frac{3}{4}\\right)^1 = \\frac{3}{4}', penaltyXpPercentage: 15 },
      { step: 3, title: 'Fórmula de suma de serie geométrica', contentLatex: 'S = \\frac{a}{1 - q}', penaltyXpPercentage: 25 },
      { step: 4, title: 'Sustituir a y q', contentLatex: 'S = \\frac{3/4}{1 - 3/4} = \\frac{3/4}{1/4}', penaltyXpPercentage: 35 },
      { step: 5, title: 'Simplificar cociente', contentLatex: 'S = 3', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_SERIE_GEOMETRICA'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 9,
      topicName: 'Sucesiones y Series',
      practicalWorkNumber: 9,
      exerciseNumber: '6.b',
      pageReference: 18
    },
    explanation: {
      whatYouDid: 'Reconociste que la razón geométrica q = 3/4 satisface |q| < 1 y aplicaste la fórmula de suma infinita.',
      whereIsMistake: 'El error clásico es suponer que el primer término es 1 en vez de (3/4)¹.',
      whyIsIncorrect: 'Si la sumatoria arranca en n = 1, el primer término a es necesariamente (3/4)¹ = 3/4.',
      whatToDetectNextTime: 'Fíjate en el índice inferior de la sumatoria: si es n = 0, a = 1; si es n = 1, a = q.',
      correctResolutionLatex: "S = \\frac{a_1}{1 - q} = \\frac{3/4}{1 - 3/4} = \\frac{3/4}{1/4} = 3",
      examFreeTip: 'En el examen libre de la UNNE suelen preguntar el valor de verdad de lim an = 0 <=> converge (Falso, contraejemplo serie armónica).'
    }
  },
  {
    id: 'EX_U10_02',
    unitId: 'U10',
    topicId: 'U10_T1',
    subtopicTitle: 'Límite y Convergencia de Sucesión Alternada',
    type: 'multiple_choice',
    difficulty: 2,
    promptLatex: '\\text{Determinar la convergencia de la sucesión } d_n = \\frac{(-1)^{n+1}}{n} \\text{ y calcular su límite cuando } n \\to \\infty.',
    instructionText: 'Analiza el comportamiento de los valores absolutos |d_n| y aplica el teorema de la compresión o del módulo.',
    options: [
      { id: 'opt_a', textLatex: '\\text{Converge a } 0', isCorrect: true },
      { id: 'opt_b', textLatex: '\\text{Oscila sin límite entre } 1 \\text{ y } -1', isCorrect: false, specificFeedback: 'El denominador n crece indefinidamente, amortiguando la oscilación hacia cero.' },
      { id: 'opt_c', textLatex: '\\text{Diverge a } +\\infty', isCorrect: false, specificFeedback: '1/n tiende a 0, no a infinito.' },
      { id: 'opt_d', textLatex: '\\text{Converge a } 1', isCorrect: false, specificFeedback: 'Ese es el valor del primer término d₁, no su límite cuando n → ∞.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Escribir primeros términos', contentLatex: 'd_1 = 1, \\quad d_2 = -\\frac{1}{2}, \\quad d_3 = \\frac{1}{3}, \\quad d_4 = -\\frac{1}{4}, \\dots', penaltyXpPercentage: 5 },
      { step: 2, title: 'Tomar valor absoluto del término general', contentLatex: '|d_n| = \\left|\\frac{(-1)^{n+1}}{n}\\right| = \\frac{1}{n}', penaltyXpPercentage: 15 },
      { step: 3, title: 'Calcular límite del módulo', contentLatex: '\\lim_{n \\to \\infty} \\frac{1}{n} = 0', penaltyXpPercentage: 25 },
      { step: 4, title: 'Teorema del módulo', contentLatex: '\\lim |a_n| = 0 \\implies \\lim a_n = 0', penaltyXpPercentage: 35 },
      { step: 5, title: 'Conclusión', contentLatex: '\\lim_{n \\to \\infty} d_n = 0 \\implies \\text{La sucesión es convergente a 0}', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_SUCESION_CONVERGENCIA'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 9,
      topicName: 'Sucesiones Numéricas',
      practicalWorkNumber: 9,
      exerciseNumber: '4.d',
      pageReference: 18
    },
    explanation: {
      whatYouDid: 'Demostraste que la sucesión alternada está acotada por -1/n y 1/n y converge a 0 por teorema del emparedado.',
      whereIsMistake: 'En confundir la alternancia de signo con divergencia o no existencia de límite.',
      whyIsIncorrect: 'Una sucesión con factor (-1)^n solo oscila indefinidamente si la amplitud no tiende a cero (ej: (-1)^n carece de límite, pero (-1)^n/n tiende a 0).',
      whatToDetectNextTime: 'Si |a_n| tiende a 0, a_n converge a 0 independientemente de cómo cambien los signos.',
      correctResolutionLatex: '\\lim_{n\\to\\infty}\\left|\\frac{(-1)^{n+1}}{n}\\right| = \\lim_{n\\to\\infty}\\frac{1}{n} = 0 \\implies \\lim_{n\\to\\infty} d_n = 0',
      examFreeTip: 'No confundir la sucesión {(-1)^(n+1)/n} (que converge a 0) con la serie armónica alternada ∑ (-1)^(n+1)/n (cuya suma es ln 2).'
    }
  },
  {
    id: 'EX_U10_03',
    unitId: 'U10',
    topicId: 'U10_T2',
    subtopicTitle: 'Suma Infinita de Triángulos Equiláteros Inscritos',
    type: 'multiple_choice',
    difficulty: 3,
    promptLatex: '\\text{Se inscribe un triángulo equilátero uniendo los puntos medios de otro de área } A_1 = \\frac{\\sqrt{3}}{4}, \\text{ repitiendo el proceso infinitas veces. Hallar la suma total de las áreas.}',
    instructionText: 'Identifica la razón geométrica de las áreas de triángulos concéntricos y calcula la suma infinita S = a / (1 - q).',
    options: [
      { id: 'opt_a', textLatex: 'S = \\frac{\\sqrt{3}}{3} \\approx 0.577', isCorrect: true },
      { id: 'opt_b', textLatex: 'S = \\frac{\\sqrt{3}}{2} \\approx 0.866', isCorrect: false, specificFeedback: 'Tomaste razón 1/2 en vez de 1/4 (el área varía con el cuadrado del lado).' },
      { id: 'opt_c', textLatex: 'S = \\sqrt{3}', isCorrect: false, specificFeedback: 'Error en el cociente algebraico.' },
      { id: 'opt_d', textLatex: 'S = \\infty \\text{ (Diverge)}', isCorrect: false, specificFeedback: 'La razón q = 1/4 es estrictamente menor a 1, la suma geométrica converge.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Relación geométrica', contentLatex: '\\text{Al unir los puntos medios, el nuevo lado es } l_2 = \\frac{1}{2} l_1', penaltyXpPercentage: 5 },
      { step: 2, title: 'Relación de áreas', contentLatex: 'A_2 = \\left(\\frac{1}{2}\\right)^2 A_1 = \\frac{1}{4} A_1 \\implies q = \\frac{1}{4}', penaltyXpPercentage: 15 },
      { step: 3, title: 'Condición de convergencia', contentLatex: '|q| = \\frac{1}{4} < 1 \\implies \\text{Serie geométrica convergente}', penaltyXpPercentage: 25 },
      { step: 4, title: 'Fórmula de suma infinita', contentLatex: 'S = \\frac{A_1}{1 - q} = \\frac{\\frac{\\sqrt{3}}{4}}{1 - \\frac{1}{4}} = \\frac{\\frac{\\sqrt{3}}{4}}{\\frac{3}{4}}', penaltyXpPercentage: 35 },
      { step: 5, title: 'Simplificar fracciones', contentLatex: 'S = \\frac{\\sqrt{3}}{4} \\cdot \\frac{4}{3} = \\frac{\\sqrt{3}}{3}', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_SERIE_GEOMETRICA'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 9,
      topicName: 'Series Geométricas',
      practicalWorkNumber: 9,
      exerciseNumber: '5',
      pageReference: 18
    },
    explanation: {
      whatYouDid: 'Modelaste la sucesión de áreas como una serie geométrica de razón q = (1/2)² = 1/4 y aplicaste la suma infinita.',
      whereIsMistake: 'En tomar la razón lineal 1/2 de los lados en lugar de la razón cuadrática 1/4 de las áreas.',
      whyIsIncorrect: 'En figuras semejantes bidimensionales, el área es proporcional al cuadrado de la escala lineal.',
      whatToDetectNextTime: 'Recuerda: longitud escala con r, área con r², volumen con r³.',
      correctResolutionLatex: 'S = \\frac{a}{1 - q} = \\frac{\\sqrt{3}/4}{1 - 1/4} = \\frac{\\sqrt{3}/4}{3/4} = \\frac{\\sqrt{3}}{3}',
      examFreeTip: 'Este problema geométrico clásico aparece en la Guía de Trabajos Prácticos de la UNNE para ilustrar series infinitas convergentes.'
    }
  },
  {
    id: 'EX_U10_04',
    unitId: 'U10',
    topicId: 'U10_T3',
    subtopicTitle: 'Criterio de D\'Alembert con Factoriales y Potencias',
    type: 'multiple_choice',
    difficulty: 4,
    promptLatex: '\\text{Determinar la convergencia de la serie de términos positivos: } \\sum_{n=1}^\\infty \\frac{n^n}{3^n \\cdot n!}',
    instructionText: 'Aplica el criterio de D\'Alembert calculando el límite del cociente a_{n+1} / a_n cuando n tiende a infinito.',
    options: [
      { id: 'opt_a', textLatex: 'L = \\frac{e}{3} < 1 \\implies \\text{La serie CONVERGE}', isCorrect: true },
      { id: 'opt_b', textLatex: 'L = \\frac{e}{3} > 1 \\implies \\text{La serie DIVERGE}', isCorrect: false, specificFeedback: 'e ≈ 2.718 < 3, por lo que e/3 < 1, la serie converge.' },
      { id: 'opt_c', textLatex: 'L = 1 \\implies \\text{El criterio no decide}', isCorrect: false, specificFeedback: 'Olvidaste el factor 1/3 del denominador.' },
      { id: 'opt_d', textLatex: 'L = 0 \\implies \\text{La serie converge}', isCorrect: false, specificFeedback: '(1 + 1/n)^n tiende al número e, no a cero.' }
    ],
    correctOptionId: 'opt_a',
    hints: [
      { step: 1, title: 'Planteo de D\'Alembert', contentLatex: 'L = \\lim_{n \\to \\infty} \\frac{a_{n+1}}{a_n}', penaltyXpPercentage: 5 },
      { step: 2, title: 'Escribir término n+1', contentLatex: 'a_{n+1} = \\frac{(n+1)^{n+1}}{3^{n+1} (n+1)!} = \\frac{(n+1)^n (n+1)}{3 \\cdot 3^n (n+1) n!} = \\frac{(n+1)^n}{3 \\cdot 3^n n!} ', penaltyXpPercentage: 15 },
      { step: 3, title: 'Cociente simplificado', contentLatex: '\\frac{a_{n+1}}{a_n} = \\frac{(n+1)^n}{3 \\cdot 3^n n!} \\cdot \\frac{3^n n!}{n^n} = \\frac{1}{3} \\left(\\frac{n+1}{n}\\right)^n', penaltyXpPercentage: 25 },
      { step: 4, title: 'Reconocer límite notable del número e', contentLatex: '\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n = e', penaltyXpPercentage: 35 },
      { step: 5, title: 'Evaluar L y concluir', contentLatex: 'L = \\frac{e}{3} \\approx \\frac{2.718}{3} < 1 \\implies \\text{La serie es CONVERGENTE}', penaltyXpPercentage: 50 }
    ],
    associatedFormulaIds: ['F_DALEMBERT', 'F_NUMERO_E'],
    source: {
      document: 'Guia-TP-2025.pdf',
      unitNumber: 9,
      topicName: 'Criterios de Convergencia',
      practicalWorkNumber: 9,
      exerciseNumber: '6.c',
      pageReference: 18
    },
    explanation: {
      whatYouDid: 'Simplificaste factoriales y potencias n y utilizaste la definición del número e para evaluar el límite de D\'Alembert.',
      whereIsMistake: 'En la simplificación de (n+1)! = (n+1)·n! o en comparar e con 3.',
      whyIsIncorrect: 'Por el Criterio del Cociente de D\'Alembert, un límite estrictamente menor a 1 (L < 1) garantiza convergencia absoluta.',
      whatToDetectNextTime: 'Cada vez que veas (n+1)^n / n^n, agrúpalo como (1 + 1/n)^n que tiende directamente a e.',
      correctResolutionLatex: 'L = \\lim_{n\\to\\infty}\\frac{1}{3}\\left(1 + \\frac{1}{n}\\right)^n = \\frac{e}{3} < 1 \\implies \\text{Converge}',
      examFreeTip: 'Este ejercicio integra contenidos de las Unidades 1 (número e) y 10 (series numéricas), muy frecuente en finales libres.'
    }
  }
];
