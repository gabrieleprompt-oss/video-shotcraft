"""Generate the brief's exact narration with the free, local Kokoro ff_siwis voice.

Dependencies and model weights live in /tmp, not in the deliverable. Rebuild:
PYTHONPATH=/tmp/reel-kokoro-deps python public/audio/generate-voice.py
"""
from pathlib import Path
import json
import os
import re
import subprocess
import numpy as np
import soundfile as sf
import onnxruntime as ort
from kokoro_onnx import Kokoro

HERE = Path(__file__).resolve().parent
BRIEF = HERE.parent.parent / "BRIEF.md"
STARTS = [0, 5, 10, 15, 20, 27, 33, 39, 45, 50, 55]
ENDS = [5, 10, 15, 20, 27, 33, 39, 45, 50, 55, 60]
TEXTS = re.findall(r'\*\*VOIX :\*\* « (.+?) »', BRIEF.read_text())
assert len(TEXTS) == 11

# Limit CPU threads so narration generation can coexist with the render worker.
options = ort.SessionOptions()
options.intra_op_num_threads = 3
options.inter_op_num_threads = 1
model_dir = Path(os.environ.get('KOKORO_MODEL_DIR', '/tmp/reel-kokoro-models'))
session = ort.InferenceSession(str(model_dir / 'kokoro-v1.0.onnx'), sess_options=options, providers=['CPUExecutionProvider'])
kokoro = Kokoro.from_session(session, str(model_dir / 'voices-v1.0.bin'))

manifest = []
for idx, (text, start, end) in enumerate(zip(TEXTS, STARTS, ENDS), 1):
    text = text.replace('’', "'")
    target = end - start - 0.36
    source = HERE / f'voice-{idx:02d}-source.wav'
    samples, sr = kokoro.create(text, voice='ff_siwis', speed=1.10, lang='fr-fr')
    # Trim the boundary silence only; preserve punctuation and breathing pauses.
    audible = np.flatnonzero(np.abs(samples) > 0.002)
    if audible.size:
        samples = samples[max(0, audible[0]-int(sr*0.04)):min(len(samples), audible[-1]+int(sr*0.14))]
    duration = len(samples) / sr
    factor = max(1.0, duration / target)
    if factor > 1.2:
        speed = min(1.35, 1.10 * factor / 1.18)
        samples, sr = kokoro.create(text, voice='ff_siwis', speed=speed, lang='fr-fr')
        audible = np.flatnonzero(np.abs(samples) > 0.002)
        if audible.size:
            samples = samples[max(0, audible[0]-int(sr*0.04)):min(len(samples), audible[-1]+int(sr*0.14))]
        duration = len(samples) / sr
        factor = max(1.0, duration / target)
    if factor > 1.205:
        raise RuntimeError(f'Scene {idx} requires excessive atempo={factor:.3f}')
    sf.write(source, samples, sr)
    output = HERE / f'voice-{idx:02d}.mp3'
    filters = f'atempo={factor:.6f},loudnorm=I=-16:LRA=7:TP=-1.5,afade=t=in:st=0:d=0.012'
    subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(source),'-af',filters,'-ar','48000','-b:a','192k',str(output)],check=True)
    actual = float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',str(output)]))
    assert actual < end - start - 0.3, (idx, actual)
    manifest.append({'file': f'audio/{output.name}', 'start': start + 0.06, 'duration': round(actual, 3), 'text': text})
    print(json.dumps(manifest[-1], ensure_ascii=False), flush=True)
    (HERE/'voice-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+'\n')
    source.unlink()

print('Done: 11 natural French voice clips, all inside scene windows.', flush=True)
