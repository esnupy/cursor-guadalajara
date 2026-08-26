# Script: Del skillhell al skillhalla

15 minutos de charla. 5 de preguntas. 11 slides.

No leas la slide. La gente ya la está leyendo. Tú cuentas lo que no cabe en dos líneas.

Si vas tarde, recorta el mapa (slide 5) y no alargues el árbol (slide 8). El cierre es la 9 y la 10. No las cortes.

No menciones el naranja de Cursor. Si alguien pregunta en el Q&A, ahí sí.

---

## 1. Título · 0:00–0:20

**En pantalla:** Del skillhell al skillhalla. Cursor Meetup Guadalajara. 27 de agosto de 2026.

**Di:**

Buenas. Soy Juan. Esto dura quince minutos y el chiste del título es el único de la charla.

Vivimos en skillhell: hay demasiadas skills. Skillhalla no es instalar más. Es una skill que deja de adivinar.

---

## 2. Skillhell · 0:20–1:20

**En pantalla:** Hay demasiadas skills. / La más viral no tiene que encajar en tu flujo.

**Di:**

Todo el mundo está publicando skills. Unas están bien. Otras existen porque se volvieron virales.

Matt Pocock, Superpowers, las de Anthropic o OpenAI: por algo están ahí. No hace falta desconfiar de entrada. El problema es otro.

Una skill famosa la escribió alguien para su flujo. El tuyo puede ser otro. Si la copias ciega, estás pidiendo que el modelo trabaje como esa persona, no como tú.

Esta charla es para gente curiosa. Si quieres, al final te puedes ir a las más populares y ya. El valor está en saber cómo se ve una buena, para poder reescribirla.

---

## 3. Asunciones · 1:20–2:40

**En pantalla:** Si hay un hueco, el modelo lo rellena. / No con lo que querías.

**Di:**

Los agentes son probabilísticos. La misma pregunta, dos respuestas distintas.

En inglés se dice assumptions. En español: al modelo le gusta asumir. Si en el prompt o en la skill queda un hueco, no se detiene a preguntar. Rellena. A veces con algo decente. A veces con slop.

En frontend se nota mucho: un easing distinto cada vez, un botón naranja que no pediste, una animación que no iba. No es que el modelo sea tonto. Es que tú no cerraste el hueco.

---

## 4. Qué hace una skill · 2:40–3:40

**En pantalla:** Una skill no pide el mismo resultado. / Pide el mismo proceso.

**Di:**

Una skill no sirve para que el output salga idéntico. Cada pantalla es distinta. Cada diálogo es distinto. Eso está bien.

Sirve para que el razonamiento sea el mismo. El mismo árbol. Las mismas preguntas. Tú pones el criterio. El modelo camina por ahí.

Si te llevas una sola frase de esta charla, que sea esa.

---

## 5. Mapa · 3:40–5:10

**En pantalla:** Trigger, Structure, Steering, Pruning. Una línea bajo cada uno.

**Di esto y no más. Reloj: noventa segundos.**

Antes del árbol, un radar. Cuatro pruebas de si una skill vale la pena. Sirven para escribir una y para evaluar una que bajaste.

Trigger: ¿la invoca el usuario o el modelo? Si todo lo dispara el modelo, hinchas el contexto. Y el modelo no siempre elige la skill correcta en el momento correcto.

Structure: en el SKILL.md va el proceso. Lo demás, referencias. Cada palabra es un token.

Steering: una palabra precisa vale más que un párrafo. Idempotencia, skeuomorphism, brutalismo. El agente entiende mejor si compactas significado.

Pruning: si está larga y el resultado sería el mismo sin la mitad, recorta.

Esto viene de Matt Pocock. No lo voy a desarrollar. El mapa está ahí para que sepan qué mirar. El resto de la charla es una sola de esas piezas, llevada al extremo.

---

## 6. Tesis · 5:10–6:10

**En pantalla:** Skillhalla es un árbol de decisión. / El modelo camina el mismo camino.

**Di:**

Skillhalla, para mí, es un árbol.

Emil Kowalski lo usa en casi todas sus skills de design engineering. A mí me cambió el frontend. No porque el modelo se vuelva más listo. Porque le dejas menos espacio para asumir.

Sí o no. Esta curva o la otra. Este componente o el otro. El hueco se cierra.

---

## 7. Easing, el problema · 6:10–7:00

**En pantalla:** Sin skill, cada diálogo sale con una curva distinta. / Nunca sabes cuál.

**Di:**

Easing. Un diálogo que entra. Sin skill, a veces ease-out, a veces un bounce, a veces linear porque el modelo tenía ganas.

A veces queda bien. Nunca sabes si mañana va a repetir el criterio. Ese es el skillhell aplicado a una línea de CSS.

---

## 8. El árbol · 7:00–10:00

**En pantalla:** el ASCII del árbol. A la derecha, el hueco del GIF si aún no lo pegaste.

**Di, una sola pasada, señalando el árbol:**

Con el árbol, cada vez camina lo mismo.

¿El elemento entra o sale del viewport? Sí: ease-out. La cosa está llegando o se está yendo. Ease-out se siente natural.

No: ¿se mueve o cambia de forma en pantalla? Sí: ease-in-out. Empieza y termina en el mismo sitio, necesita los dos extremos suaves.

No: ¿es un hover? Sí: ease. Un cambio chico, sin drama.

No: ¿es movimiento constante? Sí: linear. Un loader, un marquee. Cualquier curva ahí se siente borracha.

Si nada de eso: por defecto, ease-out.

No expliques cada rama dos veces. Si el GIF ya está, déjalo correr en silencio mientras apuntas. Si no está, el ASCII basta.

**Si te sobran treinta segundos:** un buen árbol también puede llevar un ejemplo bueno y uno malo. El modelo es muy bueno repitiendo patrones. No lo conviertas en otra slide.

---

## 9. El razonamiento ya es tuyo · 10:00–11:20

**En pantalla:** El resultado sigue siendo distinto. / El razonamiento ya es tuyo.

**Di:**

El easing va a seguir siendo distinto. Debe serlo. Un modal no es un tooltip.

Lo que ya no cambia es el criterio. El gusto es tuyo. El modelo no improvisó una curva porque le sonó.

Eso es una skill de UI que sirve. No un párrafo que dice “hazlo con buen gusto”.

---

## 10. CTA · 11:20–15:00

**En pantalla:** Esta semana. / Una cosa que Cursor te asume mal. / Escríbele el árbol.

**Di:**

Esta semana, no instalen diez skills. Tomen una sola cosa que Cursor les asume mal. Un easing, un spacing, un copy, un componente que siempre sale al revés.

Escríbanle el árbol. Sí, no, sí, no, por defecto. Péguenlo en un SKILL.md. Úsenlo dos días. Si algo se repite y molesta, cámbienlo. Una skill no se escribe una vez.

**Oral, sin slide de recursos:** si quieren el mapa de las cuatro pruebas más desarrollado, el video de Matt Pocock está en YouTube. Busquen writing great skills. Superpowers y las skills para escribir skills también existen. Pueden ignorarme e irse ahí. Está bien. El punto era no copiarlas ciegas.

Si llegas a los quince con margen, cállate. No abras otro ejemplo.

---

## 11. Preguntas · 15:00–20:00

**En pantalla:** Preguntas. Foto, nombre, Design engineer, redes. Esta slide se queda.

**Di:**

Eso es todo. Preguntas. Estoy en esas redes si después quieren seguir.

Deja la slide. No vuelvas al título.

### Si se hace silencio

Pregúntales tú: ¿qué es lo que Cursor les asume mal esta semana?

### Si preguntan por skills populares

Por algo son populares. Úsenlas de referencia. Quédense con lo que encaja. El mapa de la slide 5 es para eso, no para tirarlas.

### Si preguntan cómo se escribe el SKILL.md

Trigger en el frontmatter. Proceso corto. Referencias afuera. Árbol cuando hay una decisión que el modelo hoy está adivinando.

### Si preguntan por color, naranja, brand de Cursor

Ahí sí. En Cursor el naranja es acento, no relleno de botón. El mismo patrón: un árbol de sí y no, no “usa el naranja con gusto”.

### Si preguntan si esto solo sirve en frontend

No. Easing es el ejemplo porque diseño interfaces. El truco es el árbol, no el CSS.

---

## Ensayo

Hazlo en voz alta con el timer. Objetivo: terminar la 10 entre 14:00 y 15:00.

| Punto               | Reloj |
| ------------------- | ----- |
| Saliste del título  | 0:20  |
| Cerraste asunciones | 2:40  |
| Saliste del mapa    | 5:10  |
| Empezaste el árbol  | 7:00  |
| Cerraste el ejemplo | 11:20 |
| CTA y silencio      | 15:00 |

Si en el primer ensayo pasas de 16 minutos, recorta la 2 y la 5. No recortes la 8 ni la 9.
