# Motion

```
Transition type (translate, fade, most UI motion)?
└── Always → gentle ease-out spring:
    cubic-bezier(0.25, 1, 0.5, 1)
    (--ease-out-spring when defined)

Honor prefers-reduced-motion: cut motion to opacity/instant, never remove
meaning that only existed in the animation.
```
