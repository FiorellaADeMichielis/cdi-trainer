import { UnitId } from '../types/domain';

export interface TopicMetadata {
  id: string;
  unitId: UnitId;
  title: string;
  shortDescription: string;
  examWeightPercentage: number;
  unneKeyPoints: string[];
}

export interface UnitMetadata {
  id: UnitId;
  number: number;
  title: string;
  subtitle: string;
  examWeightPercentage: number;
  topics: TopicMetadata[];
  theoreticalPages: string;
  tpReference: string;
}

export const CURRICULA_UNITS: UnitMetadata[] = [
  {
    id: 'U1',
    number: 1,
    title: 'Funciones, Límites y Continuidad',
    subtitle: 'Funciones de una variable real, entornos y cálculo de indeterminaciones',
    examWeightPercentage: 10,
    theoreticalPages: 'Páginas 4 a 37',
    tpReference: 'Trabajo Práctico Nº 1',
    topics: [
      {
        id: 'U1_T1',
        unitId: 'U1',
        title: 'Números Reales, Intervalos y Entornos',
        shortDescription: 'Desigualdades con módulo, cotas, extremos, supremo, ínfimo y entornos reducidos.',
        examWeightPercentage: 2,
        unneKeyPoints: [
          'Resolución analítica de inecuaciones con valor absoluto |x - a| < ε.',
          'Identificación de cotas superiores, cotas inferiores, supremo e ínfimo.',
          'Representación de intervalos abiertos, cerrados y entornos reducidos E*(a, ε).'
        ]
      },
      {
        id: 'U1_T2',
        unitId: 'U1',
        title: 'Funciones Reales y Funciones a Trozos',
        shortDescription: 'Dominio, imagen, simetría par/impar, composición y funciones por partes.',
        examWeightPercentage: 3,
        unneKeyPoints: [
          'Determinación de dominios naturales excluyendo polos y radicandos negativos.',
          'Condición de función par f(-x)=f(x) y función impar f(-x)=-f(x).',
          'Composición de funciones (f ∘ g)(x) y análisis de sus dominios.'
        ]
      },
      {
        id: 'U1_T3',
        unitId: 'U1',
        title: 'Límites, Límites Laterales e Indeterminaciones',
        shortDescription: 'Definición ε-δ, límites laterales, indeterminaciones 0/0, ∞/∞, 1^∞ y límite fundamental (sen x)/x = 1.',
        examWeightPercentage: 3,
        unneKeyPoints: [
          'Existencia del límite si y sólo si los límites laterales coinciden (l₁ = l₂ = L).',
          'Salvar indeterminaciones 0/0 mediante factorización (Ruffini) y conjugados.',
          'Límite notable trigonométrico lim(x→0) (sen x)/x = 1 y exponencial con base e.'
        ]
      },
      {
        id: 'U1_T4',
        unitId: 'U1',
        title: 'Continuidad y Clasificación de Discontinuidades',
        shortDescription: 'Las 3 condiciones de continuidad, discontinuidad evitable y esencial (de salto o infinito).',
        examWeightPercentage: 2,
        unneKeyPoints: [
          'Verificación de las 3 condiciones: ∃ f(a), ∃ lim f(x) = L y L = f(a).',
          'Discontinuidad evitable: existe el límite pero no coincide con f(a) o f(a) no existe.',
          'Discontinuidad esencial: no existe el límite (límites laterales distintos o infinitos).'
        ]
      }
    ]
  },
  {
    id: 'U2',
    number: 2,
    title: 'Derivada de una Función de una Variable',
    subtitle: 'Cociente incremental, reglas operativas, derivación en cadena, implícita y diferenciales',
    examWeightPercentage: 15,
    theoreticalPages: 'Páginas 38 a 47',
    tpReference: 'Trabajo Práctico Nº 2 (Ej. 1 al 5)',
    topics: [
      {
        id: 'U2_T1',
        unitId: 'U2',
        title: 'Definición de Derivada e Interpretación Geométrica',
        shortDescription: 'Límite del cociente incremental Δy/Δx, recta secante y recta tangente.',
        examWeightPercentage: 4,
        unneKeyPoints: [
          'Derivada por definición: f\'(x) = lim(Δx→0) [f(x+Δx) - f(x)] / Δx.',
          'La derivada en x₀ es la pendiente de la recta tangente m = tg α = f\'(x₀).',
          'Ecuación de la recta tangente y normal en un punto de abscisa dada.'
        ]
      },
      {
        id: 'U2_T2',
        unitId: 'U2',
        title: 'Reglas de Derivación y Regla de la Cadena',
        shortDescription: 'Derivadas de suma, producto, cociente, potencias, exponenciales, logaritmos y trigonométricas.',
        examWeightPercentage: 5,
        unneKeyPoints: [
          'Regla del producto: (u·v)\' = u\'v + uv\'; regla del cociente: (u/v)\' = (u\'v - uv\') / v².',
          'Regla de la cadena: d/dx [f(g(x))] = f\'(g(x)) · g\'(x).',
          'Derivadas de funciones trigonométricas inversas (arcsen x, arccos x, arctg x).'
        ]
      },
      {
        id: 'U2_T3',
        unitId: 'U2',
        title: 'Derivación Logarítmica y Derivadas Sucesivas',
        shortDescription: 'Derivación de funciones potenciales-exponenciales u(x)^v(x) y derivadas de orden superior.',
        examWeightPercentage: 3,
        unneKeyPoints: [
          'Aplicar ln a ambos miembros antes de derivar para expresiones tipo f(x) = u^v.',
          'Cálculo recursivo de derivadas sucesivas f\'\'(x), f\'\'\'(x), ..., f^(n)(x).'
        ]
      },
      {
        id: 'U2_T4',
        unitId: 'U2',
        title: 'Diferenciales, Cálculo Aproximado y Errores',
        shortDescription: 'Definición dy = f\'(x)dx, relación Δy - dy, error absoluto y porcentual.',
        examWeightPercentage: 3,
        unneKeyPoints: [
          'Diferencial es el incremento sobre la recta tangente: dy = f\'(x) Δx.',
          'Fórmula de aproximación lineal: f(x + Δx) ≈ f(x) + f\'(x) Δx.',
          'Estimación de errores: error absoluto = |Δy - dy|; error relativo = |Δy - dy|/|Δy|.'
        ]
      }
    ]
  },
  {
    id: 'U3',
    number: 3,
    title: 'Aplicaciones de la Derivada',
    subtitle: 'Estudio de funciones, extremos, concavidad, teoremas de Rolle/Lagrange/Cauchy y L\'Hôpital',
    examWeightPercentage: 15,
    theoreticalPages: 'Páginas 48 a 55',
    tpReference: 'Trabajo Práctico Nº 2 (Ej. 6 al 12)',
    topics: [
      {
        id: 'U3_T1',
        unitId: 'U3',
        title: 'Criterios para Extremos y Puntos de Inflexión',
        shortDescription: 'Monotonía (signo de f\'), extremos relativos (f\'=0, f\'\'≠0), concavidad y puntos de inflexión.',
        examWeightPercentage: 5,
        unneKeyPoints: [
          'Condición necesaria de extremo relativo: f\'(x₀) = 0 o no derivable.',
          'Criterio de la 2ª derivada: f\'\'(x₀) < 0 ⇒ Máximo relativo; f\'\'(x₀) > 0 ⇒ Mínimo relativo.',
          'Puntos de inflexión: f\'\'(x₀) = 0 y f\'\'\'(x₀) ≠ 0 (cambio de curvatura).'
        ]
      },
      {
        id: 'U3_T2',
        unitId: 'U3',
        title: 'Problemas de Optimización y Aplicaciones Prácticas',
        shortDescription: 'Maximización y minimización de funciones sujetas a condiciones (producción, eficiencia laboral).',
        examWeightPercentage: 3,
        unneKeyPoints: [
          'Planteo de la función objetivo y la variable de enlace.',
          'Problema clásico UNNE: tasa máxima de ensamblaje en función del tiempo transcurrido N(t).',
          'Determinación de dos números de producto máximo con suma fija.'
        ]
      },
      {
        id: 'U3_T3',
        unitId: 'U3',
        title: 'Teoremas de Rolle, Lagrange y Cauchy',
        shortDescription: 'Condiciones de continuidad y derivabilidad, interpretación geométrica del valor medio.',
        examWeightPercentage: 4,
        unneKeyPoints: [
          'Teorema de Rolle: f continua en [a,b], derivable en (a,b) y f(a)=f(b) ⇒ ∃ ξ: f\'(ξ) = 0.',
          'Teorema de Lagrange (Valor Medio): f(b) - f(a) = (b - a) f\'(ξ). La tangente es paralela a la secante.',
          'Teorema de Cauchy: cociente de incrementos igual al cociente de derivadas tomadas en ξ.'
        ]
      },
      {
        id: 'U3_T4',
        unitId: 'U3',
        title: 'Regla de L\'Hôpital y Polinomio de Taylor',
        shortDescription: 'Resolución de indeterminaciones 0/0, ∞/∞, 0·∞, ∞-∞, 1^∞ y aproximación polinómica de Taylor/Maclaurin.',
        examWeightPercentage: 3,
        unneKeyPoints: [
          'Aplicación de L\'Hôpital: lim f(x)/g(x) = lim f\'(x)/g\'(x) para 0/0 y ∞/∞.',
          'Conversión de productos 0·∞ a cocientes y logaritmización para indeterminaciones potenciales.',
          'Fórmula de Taylor: f(x) = ∑ [f^(k)(c)/k!] (x-c)^k + Rn.'
        ]
      }
    ]
  },
  {
    id: 'U4',
    number: 4,
    title: 'Integrales Indefinidas',
    subtitle: 'La primitiva, antiderivada, métodos de integración y funciones racionales',
    examWeightPercentage: 10,
    theoreticalPages: 'Páginas 56 a 64',
    tpReference: 'Trabajo Práctico Nº 3',
    topics: [
      {
        id: 'U4_T1',
        unitId: 'U4',
        title: 'Primitiva, Teorema Fundamental e Integrales Inmediatas',
        shortDescription: 'Definición ∫ f(x)dx = F(x) + C, propiedades de linealidad y tabla inmediata.',
        examWeightPercentage: 2,
        unneKeyPoints: [
          'Todas las primitivas de una misma función difieren únicamente en una constante C.',
          'Propiedades: ∫ [f(x) ± g(x)]dx = ∫ f(x)dx ± ∫ g(x)dx; ∫ k·f(x)dx = k ∫ f(x)dx.',
          'Determinación de curvas primitivas f(x) que pasan por un punto dado (x₀, y₀).'
        ]
      },
      {
        id: 'U4_T2',
        unitId: 'U4',
        title: 'Método de Sustitución e Integración por Partes',
        shortDescription: 'Cambio de variable t = φ(x) y fórmula ∫ u dv = u v - ∫ v du.',
        examWeightPercentage: 5,
        unneKeyPoints: [
          'Sustitución cuando en el integrando aparece la derivada de un término interno: ∫ [φ\'(x)/φ(x)]dx = ln|φ(x)| + C.',
          'Integración por partes: deducción a partir de la diferencial del producto d(uv).',
          'Selección estratégica de u y dv (polinomio por exponencial/trigonométrica).'
        ]
      },
      {
        id: 'U4_T3',
        unitId: 'U4',
        title: 'Integración de Fracciones Racionales y Funciones Especiales',
        shortDescription: 'Descomposición en fracciones simples tipos I, II, III (raíces complejas) y potencias trigonométricas.',
        examWeightPercentage: 3,
        unneKeyPoints: [
          'Tipo I: A/(x-a) ⇒ A ln|x-a|; Tipo II: A/(x-a)^k.',
          'Tipo III: (Ax+B)/(x² + px + q) con raíces complejas mediante completamiento de cuadrados y arctg.',
          'Integrales trigonométricas con potencias pares e impares de sen x y cos x.'
        ]
      }
    ]
  },
  {
    id: 'U5',
    number: 5,
    title: 'Integrales Definidas y Aplicaciones',
    subtitle: 'Sumas de Riemann, Barrow, cálculo de áreas, volúmenes de revolución, longitud e integrales impropias',
    examWeightPercentage: 15,
    theoreticalPages: 'Páginas 65 a 77',
    tpReference: 'Trabajo Práctico Nº 4',
    topics: [
      {
        id: 'U5_T1',
        unitId: 'U5',
        title: 'Definición de Riemann, Propiedades y Regla de Barrow',
        shortDescription: 'Partición, sumas por defecto/exceso, Teorema del Valor Medio Integral y Regla de Barrow.',
        examWeightPercentage: 4,
        unneKeyPoints: [
          'Integral definida como límite de sumas de Riemann S = lim ∑ Δx_i f(x_i).',
          'Teorema del Valor Medio Integral: ∫_a^b f(x)dx = f(ξ)(b - a).',
          'Derivada de la función integral: d/dx [∫_a^x f(t)dt] = f(x).',
          'Regla de Barrow: ∫_a^b f(x)dx = F(b) - F(a).'
        ]
      },
      {
        id: 'U5_T2',
        unitId: 'U5',
        title: 'Cálculo de Áreas Planas entre Curvas',
        shortDescription: 'Área entre una función y el eje de abscisas, y área encerrada entre dos o tres curvas.',
        examWeightPercentage: 4,
        unneKeyPoints: [
          'Determinación analítica de puntos de intersección entre f(x) y g(x).',
          'Planteo de integrales A = ∫_a^b [f(x) - g(x)]dx respetando la función techo y piso.',
          'Subdivisión de áreas cuando hay inversión de funciones en el intervalo.'
        ]
      },
      {
        id: 'U5_T3',
        unitId: 'U5',
        title: 'Volumen de Sólidos de Revolución y Longitud de Arco',
        shortDescription: 'Rotación alrededor del eje x (discos) y eje y, longitud de arco s y diferencial de arco ds.',
        examWeightPercentage: 4,
        unneKeyPoints: [
          'Volumen por rotación alrededor de x: V = π ∫_a^b [f(x)]² dx.',
          'Rotación de región entre dos curvas: V = π ∫_a^b ([f(x)]² - [g(x)]²) dx.',
          'Longitud de curva: L = ∫_a^b √(1 + [f\'(x)]²) dx; diferencial de arco ds² = dx² + dy².'
        ]
      },
      {
        id: 'U5_T4',
        unitId: 'U5',
        title: 'Integrales Impropias y Aplicaciones a Computación',
        shortDescription: 'Límites infinitos (1ª especie), integrandos no acotados (2ª especie) y problemas de velocidad de compiladores.',
        examWeightPercentage: 3,
        unneKeyPoints: [
          'Integral impropia con límite infinito: lim(t→∞) ∫_a^t f(x)dx (convergente si el límite existe y es finito).',
          'Discontinuidad interior en integrales impropias de 2ª especie.',
          'Problema UNNE de compilador C++ a Assembler V(t) = 10t(2-t²)^(1/3) líneas/s.'
        ]
      }
    ]
  },
  {
    id: 'U6',
    number: 6,
    title: 'Funciones de Varias Variables',
    subtitle: 'Geometría analítica en R³, curvas y superficies de nivel, límites dobles e iterados',
    examWeightPercentage: 10,
    theoreticalPages: 'Páginas 78 a 85',
    tpReference: 'Trabajo Práctico Nº 5',
    topics: [
      {
        id: 'U6_T1',
        unitId: 'U6',
        title: 'Dominio y Superficies Notables en R³',
        shortDescription: 'Planos, esferas, elipsoides, paraboloides e hiperboloides de 1 y 2 hojas.',
        examWeightPercentage: 3,
        unneKeyPoints: [
          'Determinación analítica y gráfica del dominio D ⊂ R².',
          'Ecuación segmentaria del plano x/A + y/B + z/C = 1.',
          'Ecuaciones canónicas de cuádricas: x²/a² + y²/b² + z²/c² = 1 (elipsoide), z = x² - y² (paraboloide hiperbólico).'
        ]
      },
      {
        id: 'U6_T2',
        unitId: 'U6',
        title: 'Curvas y Superficies de Nivel',
        shortDescription: 'Proyecciones de intersecciones con planos z=k sobre el plano xy y superficies U(x,y,z)=c.',
        examWeightPercentage: 3,
        unneKeyPoints: [
          'Curvas de nivel: cortes f(x,y) = k proyectados en el plano xy (ej: círculos concéntricos para paraboloides).',
          'Superficies de nivel en R⁴: fijar una constante U = c en funciones de 3 variables independientes.'
        ]
      },
      {
        id: 'U6_T3',
        unitId: 'U6',
        title: 'Límites Dobles, Iterados y Continuidad Multivariable',
        shortDescription: 'Límite simultáneo en R², límites sucesivos L₁ y L₂, caminos y continuidad en un punto.',
        examWeightPercentage: 4,
        unneKeyPoints: [
          'Definición de límite doble lim((x,y)→(x₀,y₀)) f(x,y) = L.',
          'Cálculo de límites iterados L₁ = lim_y(lim_x f) y L₂ = lim_x(lim_y f).',
          'Si L₁ ≠ L₂, el límite doble no existe. Si L₁ = L₂, NO garantiza existencia (requiere trayectorias).'
        ]
      }
    ]
  },
  {
    id: 'U7',
    number: 7,
    title: 'Derivada de Funciones de Varias Variables',
    subtitle: 'Derivadas parciales, Teorema de Schwarz, diferencial total, derivación implícita y Hessiano',
    examWeightPercentage: 15,
    theoreticalPages: 'Páginas 86 a 91',
    tpReference: 'Trabajo Práctico Nº 6',
    topics: [
      {
        id: 'U7_T1',
        unitId: 'U7',
        title: 'Derivadas Parciales e Interpretación Geométrica',
        shortDescription: 'Derivada parcial como pendiente de la traza tangente manteniendo la otra variable constante.',
        examWeightPercentage: 4,
        unneKeyPoints: [
          'Definición: ∂z/∂x = lim(Δx→0) [f(x+Δx, y) - f(x,y)] / Δx.',
          'Interpretación geométrica: pendiente de la recta tangente a la curva intersección de z=f(x,y) con plano y=cte.',
          'Teorema de Schwarz: si las derivadas parciales de 2º orden son continuas, f\'\'_xy = f\'\'_yx.'
        ]
      },
      {
        id: 'U7_T2',
        unitId: 'U7',
        title: 'Diferenciabilidad, Diferencial Total y Regla de la Cadena',
        shortDescription: 'Condición de diferenciabilidad, dz = z\'x dx + z\'y dy, y derivación con variables intermedias.',
        examWeightPercentage: 4,
        unneKeyPoints: [
          'Diferencial total: dz = (∂z/∂x)dx + (∂z/∂y)dy.',
          'Regla de la cadena multivariable: dz/dt = (∂z/∂x)(dx/dt) + (∂z/∂y)(dy/dt).',
          'Derivada de funciones implícitas F(x,y)=0 ⇒ dy/dx = - (∂F/∂x) / (∂F/∂y).'
        ]
      },
      {
        id: 'U7_T3',
        unitId: 'U7',
        title: 'Extremos Relativos en Dos Variables y Criterio del Hessiano',
        shortDescription: 'Puntos críticos (fx=0, fy=0), determinante del Hessiano H, puntos de ensilladura y optimización.',
        examWeightPercentage: 7,
        unneKeyPoints: [
          'Búsqueda de puntos críticos resolviendo el sistema ∂z/∂x = 0 y ∂z/∂y = 0.',
          'Matriz Hessiana H = z_xx · z_yy - (z_xy)².',
          'Si H > 0 y z_xx > 0 ⇒ Mínimo relativo; si H > 0 y z_xx < 0 ⇒ Máximo relativo.',
          'Si H < 0 ⇒ Punto de Ensilladura (Silla); si H = 0 ⇒ Caso dudoso.',
          'Optimización aplicada UNNE: maximización de beneficio agrícola B(x,y) o volumen de cono/latas.'
        ]
      }
    ]
  },
  {
    id: 'U8',
    number: 8,
    title: 'Integrales Múltiples',
    subtitle: 'Integrales dobles e iteradas, regiones regulares, integrales triples y cambio a polares',
    examWeightPercentage: 10,
    theoreticalPages: 'Páginas 92 a 98',
    tpReference: 'Trabajo Práctico Nº 7',
    topics: [
      {
        id: 'U8_T1',
        unitId: 'U8',
        title: 'Integral Doble e Integrales Iteradas',
        shortDescription: 'Suma doble de Riemann sobre recintos planos D, cálculo iterado y Fubini.',
        examWeightPercentage: 4,
        unneKeyPoints: [
          'Integral doble como volumen del cuerpo cilíndrico bajo la superficie z = f(x,y) sobre el recinto D.',
          'Cálculo mediante integrales iteradas: ∬_D f(x,y)dxdy = ∫_a^b [∫_{φ₁(x)}^{φ₂(x)} f(x,y)dy] dx.',
          'Propiedades de linealidad y aditividad respecto al recinto de integración D = D₁ ∪ D₂.'
        ]
      },
      {
        id: 'U8_T2',
        unitId: 'U8',
        title: 'Cálculo de Áreas y Volúmenes en Recintos Planos',
        shortDescription: 'Área mediante ∬_D 1 dxdy e inversión del orden de integración dydx ↔ dxdy.',
        examWeightPercentage: 4,
        unneKeyPoints: [
          'El área del dominio plano D se calcula como Área = ∬_D dx dy.',
          'Inversión del orden de integración determinando analíticamente los nuevos límites.',
          'Problema práctico UNNE: central de procesamiento de datos limitada por 1-x y 3-x².'
        ]
      },
      {
        id: 'U8_T3',
        unitId: 'U8',
        title: 'Integrales Triples y Teorema de Cambio de Variables',
        shortDescription: 'Integrales en R³, determinante Jacobiano y coordenadas polares.',
        examWeightPercentage: 2,
        unneKeyPoints: [
          'Integral triple ∭_V f(x,y,z) dx dy dz sobre recintos regulares tridimensionales.',
          'Cambio de variables: ∬_A f(x,y)dxdy = ∬_B f(g(u,v)) |det J| dudv.',
          'Cambio a coordenadas polares x = r cos θ, y = r sen θ con Jacobiano |det J| = r.'
        ]
      }
    ]
  },
  {
    id: 'U9',
    number: 9,
    title: 'Ecuaciones Diferenciales Ordinarias (EDO)',
    subtitle: 'Variables separables, homogéneas, lineales de 1º orden y ecuaciones diferenciales exactas',
    examWeightPercentage: 10,
    theoreticalPages: 'Páginas 99 a 104',
    tpReference: 'Trabajo Práctico Nº 8',
    topics: [
      {
        id: 'U9_T1',
        unitId: 'U9',
        title: 'Definición, Solución General, Particular y Variables Separables',
        shortDescription: 'Orden, grado, familia de curvas y problemas de valor inicial (PVI).',
        examWeightPercentage: 3,
        unneKeyPoints: [
          'Orden: orden de la derivada mayor; Grado: exponente de la derivada de mayor orden.',
          'Separación de variables: f(x)dx + g(y)dy = 0 ⇒ ∫ f(x)dx + ∫ g(y)dy = C.',
          'Problema de Valor Inicial (PVI): determinación de la constante C a partir de y(x₀) = y₀.'
        ]
      },
      {
        id: 'U9_T2',
        unitId: 'U9',
        title: 'Ecuaciones Homogéneas y Ecuaciones Lineales de 1º Orden',
        shortDescription: 'Sustitución y = u·x para funciones homogéneas de grado 0, y resolución de y\' + P(x)y = Q(x).',
        examWeightPercentage: 4,
        unneKeyPoints: [
          'Homogéneas: dy/dx = f(y/x); se sustituye y = u·x, dy = u dx + x du transformándola en separable.',
          'Lineal de 1º orden y\' + P(x)y = Q(x) resuelta con factor integrante e^(∫Pdx) o método de Lagrange.',
          'Fórmula de solución: y = e^(-∫Pdx) [∫ Q(x) e^(∫Pdx) dx + C].'
        ]
      },
      {
        id: 'U9_T3',
        unitId: 'U9',
        title: 'Ecuaciones Diferenciales Exactas y Simetría de Schwarz',
        shortDescription: 'Condición de simetría ∂P/∂y = ∂Q/∂x, cálculo de la función potencial U(x,y)=C y factor k.',
        examWeightPercentage: 3,
        unneKeyPoints: [
          'Condición de simetría: P(x,y)dx + Q(x,y)dy = 0 es exacta ⇔ ∂P/∂y = ∂Q/∂x.',
          'Cálculo de U(x,y): U(x,y) = ∫ P(x,y)dx + φ(y), determinando φ\'(y) = Q(x,y) - ∂/∂y[∫ P dx].',
          'Determinación de un parámetro k para que una ecuación diferencial sea exacta.'
        ]
      }
    ]
  },
  {
    id: 'U10',
    number: 10,
    title: 'Sucesiones y Series Numéricas',
    subtitle: 'Convergencia de sucesiones, sumas parciales, series geométricas, armónicas, D\'Alembert y Cauchy',
    examWeightPercentage: 10,
    theoreticalPages: 'Páginas 105 a 107',
    tpReference: 'Trabajo Práctico Nº 9',
    topics: [
      {
        id: 'U10_T1',
        unitId: 'U10',
        title: 'Sucesiones Numéricas y Monotonía',
        shortDescription: 'Término general a_n, sucesiones acotadas, convergencia, divergencia y oscilación.',
        examWeightPercentage: 3,
        unneKeyPoints: [
          'Sucesión acotada si tiene cota superior e inferior.',
          'Toda sucesión monótona y acotada es convergente.',
          'Sucesiones oscilantes (ej: (-1)^n o 2n(-1)^n) carecen de límite finito o infinito.'
        ]
      },
      {
        id: 'U10_T2',
        unitId: 'U10',
        title: 'Series Numéricas, Serie Geométrica y Armónica',
        shortDescription: 'Condición necesaria lim a_n = 0, suma geométrica S = a/(1-q) y divergencia armónica.',
        examWeightPercentage: 4,
        unneKeyPoints: [
          'Condición necesaria de convergencia: si ∑ a_n converge ⇒ lim(n→∞) a_n = 0 (el recíproco es falso).',
          'Serie geométrica ∑ a·q^n converge a a/(1-q) si |q| < 1; diverge si |q| ≥ 1.',
          'Serie armónica ∑ 1/n es divergente (demostración por agrupamiento de términos 1/2 + 2(1/4) + 4(1/8)...).',
          'Serie armónica alternada ∑ (-1)^(n+1)/n converge a ln 2.'
        ]
      },
      {
        id: 'U10_T3',
        unitId: 'U10',
        title: 'Criterios de Convergencia para Series de Términos Positivos',
        shortDescription: 'Criterio de comparación directa, criterio de D\'Alembert (cociente) y criterio de Cauchy (raíz).',
        examWeightPercentage: 3,
        unneKeyPoints: [
          'Criterio de comparación: si 0 ≤ u_n ≤ v_n y ∑ v_n converge ⇒ ∑ u_n converge.',
          'Criterio de D\'Alembert: L = lim(n→∞) [a_{n+1} / a_n]. L < 1 converge, L > 1 diverge, L = 1 no decide.',
          'Criterio de Cauchy: L = lim(n→∞) ⁿ√(u_n). L < 1 converge, L > 1 diverge, L = 1 no decide.'
        ]
      }
    ]
  }
];
