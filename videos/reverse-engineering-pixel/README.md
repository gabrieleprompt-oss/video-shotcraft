# Reverse engineering — pixel lab

Tutoriel français de 15 secondes, 1080 × 1920, 30 i/s, réalisé entièrement en motion design avec Remotion. Vidéo silencieuse, conformément au format par défaut du projet. Aucune interface réelle ni enregistrement d'écran : l'exemple de compteur et ses DevTools sont des maquettes pédagogiques animées.

## Script et déroulé

| Temps | Texte principal | Action à l'écran |
|---|---|---|
| 0–2,5 s | Reverse engineering. Pars du résultat. | Une fenêtre rétro et un compteur à zéro entrent dans le cadre. |
| 2,5–5,8 s | Observe. Un clic. Le compteur change. | Le curseur clique ; le compteur passe de 0 à 1. |
| 5,8–10,6 s | Inspecte. Retrouve la logique du clic. | Le JavaScript se révèle, la ligne `n += 1` est surlignée, puis la mise à jour de l'affichage est montrée. |
| 10,6–15 s | Recrée. Même action. Même comportement. | Le curseur teste un original et une réimplémentation ; les deux comptent 1. |

Le résultat reconstitué reproduit le comportement, sans prétendre retrouver le code source d'origine. Le code illustré gère l'événement de clic, incrémente la variable et actualise l'affichage.

Dans l'extrait affiché, `button` et `display` désignent les éléments DOM déjà sélectionnés. Exemple complet équivalent :

```js
const button = document.querySelector('button');
const display = document.querySelector('output');
let n = 0;
button.onclick = () => {
  n += 1;
  display.textContent = n;
};
```

## Direction artistique

- Navy `#10162A`, crème `#F9F1D8`, vert acide `#CEFF70`, lavande `#B5A2FF`.
- Pixelify Sans pour les titres et chiffres ; IBM Plex Mono pour le code et les annotations. Polices incluses, sous licence OFL.
- Curseur et icônes SVG dessinés sur une grille entière ; fenêtres carrées avec ombre décalée ; transitions par bandes pixel.
- Animations pilotées uniquement par les images Remotion. 450 images exactement.

## Utilisation

```sh
npm ci
npm run studio
npm run typecheck
npm run render
```

La commande de rendu Linux utilise `/usr/bin/chromium`. Sur un autre système :

```sh
npx remotion render src/index.ts ReverseEngineering out/reverse-engineering-pixel-15s.mp4
```

Chaque scène a sa propre composition dans le dossier « Scenes » du Studio. Les couleurs, les composants de fenêtres et les polices se modifient dans `src/design.tsx` ; les gestes et les textes dans `src/scenes/`.
