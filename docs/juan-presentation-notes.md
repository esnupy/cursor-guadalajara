# Cursor Meetup Talk - 27/07/2026: Del skillhell al skillhalla

## Personal notes for the presentation

Bueno, la premisa de esta presentación es que en esta era de la inteligencia artificial, ahora tenemos un nuevo
problema, el cual es la sobresaturación de skills allá afuera. Ahorita todo el mundo está creando sus skills, y pues
entre tanto ruido, entre tanta basura, ahorita ya es difícil identificar las buenas skills, básicamente. Ya que, pues
hay gente que simplemente quiere, no sé, la popularidad, la viralidad de sacar skills a diestra y siniestra, que no
necesariamente significa que sean malas skills. Pero desde que salió este concepto En todo esto de inteligencia
artificial Ya creo que ya ha llegado un punto de madurez En la cual ya podemos dictar como las buenas prácticas Al
momento de tanto como crear o Buscar skills, porque pues estas técnicas O estos consejos nos sirven para las dos cosas
Tanto por si queremos nosotros escribir nuestras propias skills Tanto como si queremos buscar unas skills que valen la
pena Y más bien el enfoque a esto es pues La gente curiosa, porque bien Alguien puede prescindir de esta charla De lo
que vamos a ver el día de hoy Y simplemente irte directamente por las skills más populares en el momento Las cuales, no
sé, al menos en mi círculo En mi burbuja social Veo que están siendo muy populares Las de Matt Pocock, las de
Superpowers Y pues es que también que sacan Las empresas gigantes Como Antropic, OpenAI Entonces, digo, por algo son
populares Obviamente estas sirven, no necesitas como Probarlas tanto Como para saber que si van a servir A lo mejor no
encajan tu estilo No encajan tu estilo al programar Al construir proyectos Y a lo mejor hay unas que si está el high por
los cielos y están sobrevaloradas y nada más porque ves ahí que todo el mundo está publicando que usan esos skills a lo
mejor y no son la gran cosa pero lo que sí crees que esta Shadda incluso les puede servir para tomar de referencia esos
skills muy famosos y que a lo mejor te gustaron algunas partes y algunas no entonces que tú las puedas adecuar a tu
propio flujo de trabajo porque pues muchas de estos skills las hace una persona pensando en su propio flujo de trabajo y
pues a veces ese flujo de trabajo no encaje con nuestro flujo de trabajo entonces todos estos consejos nos van a servir
para identificar y poder incluso nosotros meterle mano y nosotros modificar y agarrar las mejores partes de lo que m nos
ha gustado y pues nada de eso se trata y b la base de esta presentaci vendr siendo lo que viene a continuaci las notas
que tom a continuaci la de how to tell if a skill is cute que básicamente la mayoría vienen del video de youtube de Matt
Pocock que puse como referencia y que son básicamente cuatro consejos o cuatro checklists las cuales una buena skill
debe o debería decidir según su caso de uso y pues nada, este es como el contenido principal donde está todo el valor de
esta presentación Lo que también tengo que agregar Y que no se me olvide Ya que como yo soy frontend Design engineer
Pues estoy más enfocado a frontend Algo que me ha ayudado muchísimo En automatizar Bueno, no automatizar Pero a sacarle
más produce A la inteligencia artificial Y que no me haga O no me genere tanto Slop en mis interfaces Son los árboles de
decisión Que esto Creo que no lo menciono como tal Matt Pocock en su video Ni tampoco Lo tomé nota en esa sección Pero
Emil Kowalski El cual es también un design engineer Que sigo muy de cerca Y me gusta mucho su trabajo Y consumo sus
cursos Lo tiene Pues en todas sus skills Que ha sacado Que son árboles de decisión Y esto ayuda mucho, digo, a mí me ha
ayudado mucho en el desarrollo Frontend Ya que es muy fácil de dar las decisiones de cuándo sí y cuándo no Usar cierta
dirección, usar ciertos componentes, usar ciertas animaciones Y así le dejas menos espacio al modelo para no asumir
cosas Porque también esto, yo creo que a lo mejor es muy obvio Pero lo escuché en una plática a la que fui hace poco en
Wildline En la que, pues sí, o sea, algo tan simple como Pues saber que la inteligencia artificial le gusta asumir mucho
las cosas Lo que venía haciendo en inglés, assumptions Que pues como tal creo que no hay como una descripción Digo, no
hay una traducción directa De la palabra assumptions Pero pues creo que la forma correcta en español sería como A los
modelos les gusta asumir cosas Si en tu prompt hay huecos Los cuales no quedaron claros A la inteligencia artificial le
gusta asumir cosas Y llenar esos huecos con cosas random Entonces los árboles de decisión también nos ayudan a minimizar
Un poco esas asunciones Bueno, no sé si es la palabra correcta Más bien, ayuda a minimizar a que los modelos Asuman
cosas que nosotros no pedimos o nos faltó pedir Más adelante voy a Conseguir esta info de los árboles de decisiones y
para incluirla también en la presentación También olvidé mencionar que, en conjunto, la gente podría simplemente ignorar
todo lo que diga en esta charla y usar las “skills” más populares, o bien, la audiencia podría recurrir directamente a
esas “skills” para crear otras “skills” que en realidad son bastante buenas y que incluso aplican todos los principios
que vamos a ver en esta charla. Entonces, nada cuesta simplemente ignorarme e ir directamente a crear “skills” con esa
“skill”, válgame la redundancia, o usar las “skills” más populares. Pero lo que quiero fomentar no es limitarse a
confiar ciegamente en las herramientas. Si ya tenemos la facilidad de romper la barrera de conocimiento de habilidad que
antes solo tenían los programadores, ahora esa barrera se ha roto y gente incluso más creativa tiene acceso a construir
aplicaciones desde cero sin conocimientos técnicos previos. Lo mínimo que podríamos hacer es entender cómo están hechas
las buenas “skills”, cómo se escriben. La verdad, eso puede marcar una diferencia en nuestro trabajo, en nuestras
carreras y en nuestros productos. Así que, aunque pudiéramos pasar directamente a usar estas “skills” para escribir
buenas “skills”, creo que tiene mucho valor conocer la teoría.

## How to tell if a skill is good?

The good skill checklist:

1. Trigger
   - Decide if your skill is user-invoked or model-invoked, by setting this explicitly in the SKILL.md file first block
     (metadata)
   ```md
   ---
   name: my-skill
   description: Use when the user wants to perfom "x" action . . .
   disable-model-invocation: true
   ---
   ```
   - if you use a lot of _model-invoked_ skills, you will eventually bloat your context
   - We need to find balance between user-invoked and model-invoked skills, to keep less context usage but to also not
     always think of which skill to use everytime.
   - We need to have in mind that it is not that safe to rely on purely model-invoked skills, because there’s always
     some unpredictability with the model capabilities that not always chooses the correct skill in the correct moment
   - check the skill `mattpocock/skills/domain-modeling` for an example on how to route those references
   - hide that branching reference material behind context pointers
2. Structure
   - The step-by-step procedure
   - References: supporting information
   - Structure skills into these two things
   - keep skills small, every word is a saved token
   - if a skill can be used for many isolated purposes, let’s decide what information we can branch, e. g. take it off
     the main SKILL.md file and put it as a reference in another file
3. Steering
   - _“The agent doesn’t do what I want”_
   - Understand terminology, so we can pack a lot of meaning into short words. Saves tokens and agents can have a
     better understanding of the output we want
   - ejemplos: idempotencia, skeumorphism, brutalism
4. Pruning
   - First red flag is huge skills
   - This is basically remove all those noise that isn’t that relevant for the skill to have, and the result would be
     basically the same

`mattpocock/skills/writing-great-skills`

Al final de todo esto, me gustaría también recalcar la importancia de estar refinando nuestras habilidades que vayamos
creando para nuestro flujo de trabajo, ya que no es trabajo de una sola vez. Si de verdad quieres avanzar, ser mejor
cada día, es como cualquier habilidad: hay que estar refinándola y cambiando cosas Y cada vez que tengamos problemas,
algo que no nos guste, se está repitiendo algún patrón que es muy molesto y nos está imposibilitando nuestro flujo de
trabajo. Hay que cambiar cosas, modificar y agregar lo que falta. Esto es algo que se tiene que ir refinando poco a
poco, con el tiempo, a medida que uno vaya usando sus propias skills

## What a skill is actually for

Agents are probabilistic. If you ask the same question twice, you’ll get two different answers. You can prevent that to
some degree through skills by forcing the same  _process_ when coming up with the answer.

Take easing. Without a skill, the agent might pick a different easing curve for a dialog animation every time. Sometimes
it could be good, but you just never really know. With a skill that describes the decision process in detail, it walks
the same decision tree every single time:

```md
## Easing Decision Flowchart

Is the element entering or exiting the viewport? ├── Yes → ease-out └── No ├── Is it moving/morphing on screen? │ └──
Yes → ease-in-out └── Is it a hover change? ├── Yes → ease └── Is it constant motion? ├── Yes → linear └── Default →
ease-out
```

This was the example of a decision tree

You essentially narrow the array of possible answers the agent has to choose from. The animations it produces will still
differ, they should, every context is different. But the  _reasoning_ is now yours, and it’s the same every time this
skill is used. That’s what a good UI skill does. It gives you predictable behavior based on your taste.

- Dentro de esto, quiero recalcar que también es una buena práctica, tanto para la definición de la skill como para
  incluirla en árboles de decisión, dependiendo del caso, poner ejemplos malos y buenos, refiriéndome a la tarea que
  estás definiendo o a la instrucción que estás definiendo. Cada vez que se pueda poner un ejemplo de una buena
  implementación versus una mala implementación, es lo ideal, ya que los agentes pueden obtener mejores resultados si
  les presentas ejemplos, tanto de lo que deberían hacer como de lo que no deberían hacer. Son muy buenos repitiendo
  estos patrones y así podemos lograr con más exactitud lo que queremos que haga, sin necesidad de estar pidiéndole
  cambios.
- La tecnología es asombrosa.

```md
Is this a primary button, large CTA, or large filled surface? ├── Yes → use neutrals (`primary` / `secondary` /
foreground on background)
│ Never fill with brand orange. Neutrals keep the accent rare enough │ to stay sharp when it does appear. └── No ├── Is
this a content / section / card link (not chrome)? │ └── Yes → always `.link` + arrow icon per links.md. │ Applies in
paragraphs, cards, recaps, featured panels, etc. │ Does NOT apply to header, footer, nav, or chrome links — │ those stay
neutrals (`foreground` / `muted-foreground`). ├── Does one item need to stand out from siblings (e.g. “Recommended”)? │
└── Yes → brand orange (`cursor-accent`) on a small label/mark only └── Default → neutrals. Prefer secondary text color
over a second size when distinguishing hierarchy.
```

- No pude encontrar mejor ejemplo para relatar lo que dije anteriormente, como con este ejemplo de una “skill” que
  estuve experimentando, tomando como referencia los brand guidelines de Cursor, lo cual me pareció muy interesante, ya
  que ellos tienen una regla particular que al menos no había visto yo o no veo muy común en otros design systems
  referente al uso del color naranja. Porque en su sitio, en su branding, ellos tienden a usar colores neutros tanto
  para el light y dark mode y tienen su accent color, un tono de naranja brillante, casi fosforescente. El cual, por
  inercia o a lo mejor en lo que comúnmente se hace en el diseño de interfaces, es un color fuertemente utilizado, ya
  sea para call to actions, botones primarios, cualquier link o cosa que tenga que resaltar. En cambio, Cursor prefiere
  seguir usando los colores neutros siempre que se pueda, y el color naranja tiene que tener un propósito real; no puede
  usarse deliberadamente.

- Y es aquí donde también entra el ejemplo de buenas y malas implementaciones. En este caso, como lo que acabo de
  mencionar, si vas a tener un button primario, no uses el accent color. En cambio, si tienes que mostrar algún texto o
  algún elemento que tenga que resaltar, es decir, que tenga mucho peso tanto en la narrativa como en la acción a
  ejecutar, es ahí cuando entra el color naranja.

- Entonces, yo escribí este árbol de decisión tratando de darle estos ejemplos de buenas implementaciones y malas
  implementaciones lo mejor que pude, en base a lo que entendí de los Cursor brand guidelines. Llegamos a esta
  conclusión, que es como un diagrama de flujo con un diamante condicional: si es sí, se va para un lado; si es no, se
  va para el otro.

- Así empezamos a leer y recorrer este árbol de decisión. El primer requerimiento que encontramos es si el elemento es
  un botón primario o tiene un CTA largo; en ese caso, usamos colores primarios. Si no es un botón primario, pasamos a
  la segunda cláusula, que es acerca del contenido: si el elemento está dentro de una sección o es el link de una card,
  entonces sí usamos el accent color. En caso de que no lo sea, pasamos a otros requerimientos. Si el texto o el
  elemento necesita sobresalir del resto debido a su contenido, sí se escoge naranja; si no, el default siempre será
  color neutral.

## References

https://www.youtube.com/watch?v=UNzCG3lw6O0
