# Claude monte ma vidéo — Reel 60 secondes

Reel vertical français de 60 secondes, 1080 × 1920, 30 i/s. Direction graphite/violet, fenêtres en perspective, transitions liées aux actions, voix française, sous-titres et sound design synchronisé.

## Nature des images

Les interfaces sont des reconstitutions graphiques. La mention « DÉMONSTRATION VISUELLE » est intégrée à la vidéo. Le matériau avant/après est une scène architecturale originale, dessinée et animée en SVG dans `src/Corridor.tsx`. Il ne s'agit pas d'une captation de Claude Code en cours d'exécution ni d'un rush filmé fourni par un client.

Les étapes et la narration suivent le brief fourni dans `BRIEF.md`. Les scènes illustrent le workflow demandé, avec une interface de terminal pour Claude Code et une interface de montage pour la démonstration HyperFrames.

## Contenu

- Onze scènes indépendantes et une composition principale de 1 800 images.
- Narration française locale Kokoro, voix `ff_siwis`, onze fichiers MP3 inclus.
- Sound design original procédural, sans piste musicale : clics, whooshes, impacts, connexions, frappes et validations. Cues dans `public/audio/sfx-events.json`.
- Sous-titres JSON dans `src/captions.json`, regroupés en phrases courtes.
- Manrope et IBM Plex Mono inclus avec leurs licences OFL.
- Aucun service de génération vidéo utilisé ; les visuels sont rendus avec Remotion.

## Démarrer

```sh
npm ci
npm run studio
npm run typecheck
npm run render
npm run master
```

La commande Linux utilise `/usr/bin/chromium`. Pour laisser Remotion télécharger son navigateur sur un autre système :

```sh
npx remotion render src/index.ts ClaudeEditReel out/claude-edit-reel.mp4
```

Les médias audio sont déjà fournis. Aucune clé API n'est nécessaire pour monter ou rendre ce projet.
La commande `master` assemble directement les onze voix et le sound design à leurs timestamps, normalise le mix à −16 LUFS avec une crête cible de −1 dBTP, encode l'audio AAC 48 kHz et prépare le MP4 H.264 pour la lecture progressive.

## Modifier

- `src/scenes/` : les onze séquences du brief.
- `src/Design.tsx` et `src/UI.tsx` : couleurs, fenêtres, typographie, caméra et composants.
- `src/Root.tsx` : timing, voix et composition finale.
- `src/Narration.tsx` et `src/captions.json` : affichage des phrases.
- `scripts/generate-sfx.py` : régénération déterministe du sound design, avec NumPy/SciPy.
- `scripts/render-thumbnails.cjs` : les miniatures du matériau de démonstration.
- `scripts/stills.cjs` : photogrammes de contrôle.

La régénération optionnelle de la voix nécessite `kokoro-onnx`, `onnxruntime`, `numpy`, `soundfile`, FFmpeg, le modèle Kokoro ONNX et ses voix. Le script est dans `public/audio/generate-voice.py` ; `KOKORO_MODEL_DIR` permet de définir le répertoire du modèle. Projet amont : https://github.com/thewh1teagle/kokoro-onnx
