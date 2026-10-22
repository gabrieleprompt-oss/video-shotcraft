# PHP — les vaches et les workers

Composition Remotion verticale de 13,3 secondes, 1080 × 1920, 30 i/s (399 images). Recréation du découpage et de l'ambiance de la référence fournie, en remplaçant les éléphants par la planche de vaches fournie par l'utilisateur.

## Visuels et provenance

- `public/cows-original.png` est le PNG original extrait du ZIP fourni. Les trois personnages sont séparés avec des polygones de découpe dans `src/Cow.tsx`, sans nouvelle génération d'image.
- Le cœur, les fenêtres de documentation PHP, les alertes, les connexions, les postes de travail et les cartes HTTP sont dessinés en SVG/HTML/CSS dans le projet.
- Les animations sont calculées avec `useCurrentFrame()` et `interpolate()`. Aucun service de génération vidéo ou image n'est utilisé.
- IBM Plex Mono est inclus sous licence OFL, avec sa licence dans `public/fonts/`.
- La vidéo finale est silencieuse. L'interface Instagram et le son de l'enregistrement de référence ne sont pas repris.

## Découpage

| Temps | Composition |
|---|---|
| 0–1,6 s | Gros plan sur la vache et le cœur, puis recul de caméra. |
| 1,6–3,7 s | Apparition de la mosaïque PHP, étourdissement et basculement du personnage. |
| 3,7–6 s | Pose assise, alertes d'erreur et rétablissement. |
| 6–10 s | Repositionnement de la vache principale et apparition des connexions puis des trois ouvrières. |
| 10–13,3 s | Files de requêtes HTTP qui montent vers les postes de traitement. |

Les poses fixes sont animées en composition 2,5D : il ne s'agit pas d'un modèle 3D articulé. La pose assise fournie adapte le passage de l'incident. Les fichiers de la référence ne sont pas utilisés comme plans de la vidéo finale.

## Exécuter et modifier

```sh
npm ci
npm run studio
npm run typecheck
npm run render
```

Sur Linux, `npm run render` utilise `/usr/bin/chromium`. Sur un autre système, laisser Remotion gérer son navigateur :

```sh
npx remotion render src/index.ts CowWorkers out/cow-workers.mp4
```

`src/Film.tsx` contient le timing et les mouvements de caméra ; `src/Cow.tsx` les poses et leurs découpes ; `src/Workers.tsx` les machines et les files ; `src/Backdrop.tsx` les arrière-plans ; `src/Heart.tsx` l'illustration du cœur. Le format est enregistré dans `src/Root.tsx`.
