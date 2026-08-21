# Convocatoria de charlas

La página pública `/charlas` vive en producción y debe existir también en este repo para que el equipo pueda trabajarla.

## Flujo

1. Una persona abre `/charlas` y copia el prompt.
2. Lo pega en Cursor Agent. El agente lee `/charlas.md` (y opcionalmente `/charlas/SKILL.md`).
3. El agente entrevista en español y, solo tras confirmación, hace `POST /api/charlas`.
4. El API valida el contrato (`source = cursor-gdl-charla-v1`) y guarda la postulación.

## Destino de las postulaciones

- Por defecto se guardan en Neon (`charla_submissions`). `DATABASE_URL` ya se usa para admin.
- Opcional: `CHARLAS_WEBHOOK_URL` (+ `CHARLAS_WEBHOOK_TOKEN`) reenvía el JSON validado.

No hay formulario web. Los agentes no deben postear a webhooks de Google ni a otra URL.
