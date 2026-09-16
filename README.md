# Entrenador para Examen Libre de Cálculo Diferencial e Integral
### Licenciatura en Sistemas de Información · FaCENA - UNNE

Aplicación web educativa interactiva y adaptativa para la preparación del **Examen Libre** de **Cálculo Diferencial e Integral** en la Facultad de Ciencias Exactas y Naturales y Agrimensura (FaCENA) de la Universidad Nacional del Nordeste (UNNE).

---

## Características Principales

- **Orientado al Examen Libre**: Basado estrictamente en el programa oficial de cátedra y las Guías de Trabajos Prácticos (TP 1 al TP 9).
- **Cobertura Curricular Completa (Unidades 1 a 10)**:
  - U1: Funciones, Límites y Continuidad
  - U2: Derivadas y Diferenciales (1V)
  - U3: Aplicaciones de la Derivada (1V)
  - U4: Integral Indefinida y Métodos de Integración
  - U5: Integral Definida y Aplicaciones
  - U6: Funciones de Varias Variables
  - U7: Cálculo Diferencial Multivariable
  - U8: Integrales Múltiples y Dependientes de Parámetros
  - U9: Ecuaciones Diferenciales Ordinarias (EDO)
  - U10: Sucesiones y Series Numéricas
- **Banco de 41 Ejercicios Auténticos**: Cada ejercicio cuenta con 4 opciones con retroalimentación específica ante errores, 5 pistas progresivas y explicación de cátedra completa (diagnóstico, fallo conceptual, regla mnemotécnica y resolución matemática paso a paso).
- **Fórmulas y Teoremas**: Repaso espaciado de las fórmulas y teoremas canónicos evaluados por el tribunal.
- **Práctica Guiada y Minijuegos**:
  - *Elegir Método*: Selección estratégica del procedimiento adecuado.
  - *Encontrar el Error (Detective)*: Detección de falacias analíticas comunes en exámenes.
  - *Ordenar Pasos*: Reconstrucción de algoritmos canónicos.
  - *Asociar Fórmulas (Formula Rush)*: Identificación ágil de identidades.
  - *Tablero de Examen*: Preguntas estilo trivia técnica clasificadas por dificultad.
- **Simulador de Examen Libre**: Generador de exámenes completos de 10 preguntas representativas con temporizador y cálculo de calificación sobre 10.
- **Sin Dependencias de Servidor**: 100% estático, funciona en el navegador con persistencia en `localStorage`.

---

## Stack Tecnológico

- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite](https://vite.dev/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Renderizado Matemático**: [KaTeX](https://katex.org/)
- **Efectos y Audio**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) y Web Audio API sintetizada.

---

## Instalación y Uso Local

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd unne-cdi-trainer
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar servidor de desarrollo:
```bash
npm run dev
```

4. Compilar para producción:
```bash
npm run build
```

Los archivos finales de distribución se generarán en la carpeta `dist/`.

---

## Despliegue Gratuito

El proyecto está optimizado para desplegarse con un solo clic en plataformas estáticas como:
- **Vercel**: Conectar el repositorio de GitHub; detecta la configuración de Vite automáticamente.
- **Cloudflare Pages**: Conectar el repositorio, seleccionar preset `Vite` (`npm run build`, output `dist`).
