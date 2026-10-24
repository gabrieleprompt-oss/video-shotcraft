#!/usr/bin/env python3
"""Render the original, quiet UI sound design for CLAUDE MONTE MA VIDÉO.

No samples, music, network, or external synthesizer are used. All generators
are deliberately band-limited and have click-free envelopes. Run this script
from any directory; it writes public/audio/sfx.wav and sfx-events.json.
"""

from __future__ import annotations

import argparse
import json
import math
from pathlib import Path

import numpy as np
from scipy.signal import butter, sosfilt
from scipy.io import wavfile


RATE = 48_000
LENGTH = 60.0
SEED = 24102026
ROOT = Path(__file__).resolve().parents[1]


def db(value: float) -> float:
    return 10.0 ** (value / 20.0)


def smooth_envelope(n: int, attack: float, release: float) -> np.ndarray:
    """Half-cosine ends, with exactly zero-valued endpoints."""
    env = np.ones(n)
    a = min(max(2, int(RATE * attack)), n // 2)
    r = min(max(2, int(RATE * release)), n - a)
    env[:a] = np.sin(np.linspace(0, np.pi / 2, a)) ** 2
    env[-r:] = np.cos(np.linspace(0, np.pi / 2, r)) ** 2
    return env


def filtered_noise(n: int, rng: np.random.Generator, low: float, high: float) -> np.ndarray:
    noise = rng.normal(size=n)
    sos = butter(3, [low, high], btype="bandpass", fs=RATE, output="sos")
    return sosfilt(sos, noise)


def chirp(t: np.ndarray, start: float, end: float) -> np.ndarray:
    frequency = start + (end - start) * t / max(t[-1], 1 / RATE)
    return np.sin(2 * np.pi * np.cumsum(frequency) / RATE)


def synth(kind: str, duration: float, rng: np.random.Generator, variant: float = 0.0) -> np.ndarray:
    n = int(round(duration * RATE))
    t = np.arange(n) / RATE
    v = 1 + variant * 0.08

    if kind in {"click", "tap", "snap", "tick", "beep"}:
        if kind == "click":
            sound = filtered_noise(n, rng, 340, 1700) * np.exp(-t / .007)
            sound += .28 * np.sin(2 * np.pi * 410 * v * t) * np.exp(-t / .011)
        elif kind == "tap":
            sound = filtered_noise(n, rng, 300, 1450) * np.exp(-t / .0045)
            sound += .4 * np.sin(2 * np.pi * 550 * v * t) * np.exp(-t / .008)
            # A tiny, rounded key return, never a sharp high-frequency click.
            delayed = np.maximum(t - .009, 0)
            sound += .08 * np.sin(2 * np.pi * 740 * v * delayed) * np.exp(-delayed / .006) * (t >= .009)
        elif kind == "snap":
            sound = .85 * chirp(t, 650 * v, 240 * v) * np.exp(-t / .016)
            sound += filtered_noise(n, rng, 450, 2000) * .32 * np.exp(-t / .008)
        elif kind == "tick":
            sound = (np.sin(2 * np.pi * 780 * v * t) + .18 * np.sin(2 * np.pi * 1170 * v * t)) * np.exp(-t / .016)
        else:
            sound = (np.sin(2 * np.pi * 720 * v * t) + .1 * np.sin(2 * np.pi * 1080 * v * t)) * np.exp(-t / .055)
        sound *= smooth_envelope(n, .0018, min(duration * .3, .014))

    elif kind == "pop":
        sound = chirp(t, 530 * v, 150 * v) * np.exp(-t / .026)
        sound += .25 * filtered_noise(n, rng, 220, 1200) * np.exp(-t / .014)
        sound *= smooth_envelope(n, .0035, .045)

    elif kind in {"whoosh", "reverse", "slide", "sweep"}:
        noise = filtered_noise(n, rng, 110 if kind != "slide" else 250, 1900)
        # A slow moving spectral layer lends motion without aggressive treble.
        tone = chirp(t, 170 if kind != "reverse" else 720, 760 if kind != "reverse" else 150)
        center = .67 if kind == "reverse" else .44
        width = duration * .21
        body = np.exp(-.5 * ((t - duration * center) / width) ** 2)
        sound = (.9 * noise + .085 * tone) * body
        if kind == "slide":
            sound += .065 * (np.sin(2 * np.pi * 620 * t) + .25 * np.sin(2 * np.pi * 930 * t)) * body
        if kind == "sweep":
            sound += .12 * chirp(t, 190, 970) * body
        sound *= smooth_envelope(n, .035, .055)

    elif kind in {"impact", "punch", "end"}:
        base = 104 if kind == "punch" else 87
        frequency = 44 + (base - 44) * np.exp(-t / .055)
        sound = np.sin(2 * np.pi * np.cumsum(frequency) / RATE) * np.exp(-t / .09)
        sound += .21 * np.sin(2 * np.pi * 126 * t) * np.exp(-t / .026)
        sound += .11 * filtered_noise(n, rng, 85, 650) * np.exp(-t / .025)
        if kind == "end":
            sound += .08 * np.sin(2 * np.pi * 220 * t) * np.exp(-t / .075)
        sound *= smooth_envelope(n, .004, .08)

    elif kind in {"chime", "ping", "pulse"}:
        sound = np.zeros(n)
        notes = [(0, 540 * v, 1), (.025, 810 * v, .33), (.045, 1080 * v, .13)]
        if kind == "pulse":
            notes = [(0, 290 * v, 1), (.02, 435 * v, .22)]
        elif kind == "ping":
            notes = [(0, 660 * v, 1), (.012, 990 * v, .22)]
        for delay, freq, gain in notes:
            dt = np.maximum(t - delay, 0)
            entry = np.sin(np.minimum(dt / .006, 1) * np.pi / 2) ** 2
            sound += gain * np.sin(2 * np.pi * freq * dt) * np.exp(-dt / .085) * entry * (t >= delay)
        sound *= smooth_envelope(n, .003, .06)

    elif kind == "spring":
        frequency = 240 + 95 * np.exp(-t / .09) * np.cos(2 * np.pi * 9 * t)
        sound = np.sin(2 * np.pi * np.cumsum(frequency) / RATE) * np.exp(-t / .08)
        sound *= smooth_envelope(n, .004, .055)

    elif kind == "hum":
        # The sole sustained sound lives only under the six-second analysis UI.
        sound = .8 * np.sin(2 * np.pi * 78 * t) + .22 * np.sin(2 * np.pi * 117 * t)
        sound += .09 * filtered_noise(n, rng, 100, 450)
        sound *= .78 + .12 * np.sin(2 * np.pi * .65 * t)
        sound *= smooth_envelope(n, .45, .6)

    elif kind == "stop":
        frequency = 225 * np.exp(-t / .035) + 38
        sound = np.sin(2 * np.pi * np.cumsum(frequency) / RATE) * np.exp(-t / .037)
        sound += .04 * filtered_noise(n, rng, 130, 900) * np.exp(-t / .02)
        sound *= smooth_envelope(n, .003, .025)
    else:
        raise ValueError(kind)

    # Remove DC, then reapply a short envelope so this cannot create edge steps.
    sound -= np.mean(sound)
    sound *= smooth_envelope(n, .0007, .003)
    peak = np.max(np.abs(sound))
    return sound / peak if peak else sound


DURATIONS = {
    "click": .040, "tap": .032, "snap": .075, "tick": .055,
    "beep": .11, "pop": .13, "whoosh": .40, "reverse": .35,
    "slide": .42, "sweep": .50, "impact": .30, "punch": .23,
    "end": .44, "chime": .36, "ping": .25, "pulse": .20,
    "spring": .24, "hum": 6.0, "stop": .13,
}
GAINS = {
    "click": -27, "tap": -32, "snap": -26, "tick": -31,
    "beep": -32, "pop": -27, "whoosh": -29, "reverse": -30,
    "slide": -31, "sweep": -30, "impact": -16, "punch": -22,
    "end": -15.5, "chime": -27, "ping": -29, "pulse": -32,
    "spring": -32, "hum": -42, "stop": -27,
}


def make_cues() -> list[dict]:
    cues: list[dict] = []

    def cue(at: float, label: str, *components: tuple) -> None:
        """Each component is (kind, offset, pan[, gain[, duration[, end_pan]]])."""
        items = []
        for part in components:
            kind, offset, pan = part[:3]
            items.append({
                "kind": kind,
                "at": round(at + offset, 5),
                "gain_dbfs": part[3] if len(part) > 3 else GAINS[kind],
                "duration": part[4] if len(part) > 4 else DURATIONS[kind],
                "pan_start": pan,
                "pan_end": part[5] if len(part) > 5 else pan,
            })
        cues.append({"time": at, "label": label, "components": items})

    # HOOK — 00:00–00:05
    cue(0, "RAW reveal / digital impact", ("impact", 0, 0))
    cue(.5, "RAW FOOTAGE badge", ("pop", 0, -.12), ("beep", .035, -.12))
    cue(1.2, "Grab comparison handle", ("click", 0, .35), ("whoosh", .04, .35, -30, .58, -.25))
    cue(2.0, "RAW to edited transformation", ("sweep", 0, -.15, -29, .50, .15), ("snap", .41, .08, -25))
    cue(3.2, "EDITED WITH CLAUDE connection", ("snap", 0, .18), ("pulse", .08, .18, -29))
    cue(4.3, "Zoom into result", ("impact", 0, 0, -18), ("reverse", .02, .18, -29, .48, 0))

    # REVEAL — 00:05–00:10
    cue(5, "Software windows appear", ("pop", 0, -.32), ("pop", .10, 0, -29), ("pop", .20, .32, -30))
    cue(5.8, "CapCut cross", ("tick", 0, -.28, -28))
    cue(6.8, "Premiere cross", ("tick", 0, .27, -28), ("whoosh", .02, .27, -33, .19, 0))
    cue(7.6, "Timeline tracks detach and collapse", ("click", 0, -.2, -29), ("click", .12, .05, -31), ("click", .23, .2, -32), ("reverse", .24, .2, -30, .50, 0))
    cue(8.8, "0 MANUAL EDITS elastic title", ("impact", 0, 0, -18), ("spring", .05, 0, -31))
    cue(9.6, "Title locks into badge", ("snap", 0, .30, -25))

    # CLAUDE CODE — 00:10–00:15
    cue(10, "Claude Code glass slide", ("slide", 0, -.36, -29, .48, -.08))
    cue(10.8, "Terminal focus", ("click", 0, -.12), ("ping", .035, -.12, -30))
    cue(11.5, "Install command typing", *[("tap", x, -.12 + .03 * math.sin(i), -32 - (i % 3), .032) for i, x in enumerate([0, .055, .102, .159, .223, .278, .334, .401, .456, .529, .61, .674, .74, .813, .885, .96])])
    cue(12.8, "EDIT KIT connects", ("whoosh", 0, -.2, -30, .30, 0), ("snap", .25, 0, -25))
    cue(13.8, "HYPERFRAMES traces connection", ("sweep", 0, .32, -33, .28, .02), ("chime", .22, .14, -29))
    cue(14.6, "System confirms", ("ping", 0, 0, -28))

    # IMPORT — 00:15–00:20
    cue(15, "Video file appears", ("pop", 0, 0, -27))
    cue(15.7, "Grab and lift file", ("click", 0, -.15), ("whoosh", .02, -.15, -33, .23, -.1))
    cue(16.5, "Drag file to Claude", ("whoosh", 0, -.32, -29, .58, .22))
    cue(17.5, "Magnetic import drop", ("snap", 0, .16, -24), ("pop", .025, .14, -32))
    cue(18.2, "Data transfer progress", ("pulse", 0, -.14, -34), ("pulse", .18, -.03, -35), ("pulse", .36, .08, -35), ("pulse", .54, .17, -34))
    cue(19.1, "FILE READY", ("chime", 0, .1, -27))

    # PROMPT — 00:20–00:27
    cue(20, "Dive into prompt field", ("whoosh", 0, .08, -29, .43, 0))
    cue(20.5, "Instruction typing", *[("tap", x, -.08 + .04 * math.sin(i), -33 - (i % 3)) for i, x in enumerate([0, .058, .111, .17, .214, .278, .331, .394, .457, .516, .574, .641, .713, .78])])
    cue(21.5, "COUPE LES SILENCES card", ("pop", 0, -.18, -26))
    cue(22.5, "Three silence cuts", ("click", 0, -.22, -26), ("click", .18, 0, -27), ("click", .37, .22, -28))
    cue(23.5, "Reject poor clips", ("snap", 0, -.18, -29), ("reverse", .04, -.18, -30, .34, .24))
    cue(24.7, "Assemble three best clips", ("snap", 0, -.25, -26), ("snap", .22, 0, -27), ("snap", .46, .25, -28))
    cue(26, "RUN button / activation", ("click", 0, .1, -25), ("impact", .03, 0, -18), ("reverse", .07, .15, -31, .46, 0))

    # PROCESSING — 00:27–00:33
    cue(27, "ANALYZING FOOTAGE processing hum", ("hum", 0, 0, -42, 6.0))
    cue(27.8, "Scan markers", ("tick", 0, -.28, -33), ("tick", .19, -.1, -34), ("tick", .39, .08, -34), ("tick", .62, .25, -35))
    cue(28.8, "Rejected clips dissolve", ("reverse", 0, -.21, -34, .22, -.05), ("reverse", .17, .22, -35, .22, .04))
    cue(29.7, "Retained clips magnetic assembly", ("snap", 0, -.24, -28), ("snap", .17, -.06, -29), ("snap", .34, .12, -29), ("snap", .49, .24, -31))
    cue(30.7, "Waveform morphs to full timeline", ("sweep", 0, -.22, -29, .64, .22))
    cue(31.8, "ROUGH CUT COMPLETE", ("chime", 0, .06, -26))
    cue(32.5, "Follow playhead transition", ("whoosh", 0, -.38, -28, .43, .32))

    # ANIMATIONS — 00:33–00:39
    cue(33, "Preview subtitles word by word", ("click", 0, -.15, -32), ("tick", .18, -.06, -34), ("click", .39, .02, -34), ("tick", .64, .11, -35))
    cue(34.2, "Purple keyword elastic highlight", ("spring", 0, .08, -31), ("tick", .025, .08, -33))
    cue(35, "Camera zoom to 110 percent", ("punch", 0, 0, -22), ("whoosh", 0, 0, -34, .18, .04))
    cue(35.9, "Three motion cards align", ("pop", 0, -.27, -29), ("pop", .13, 0, -30), ("pop", .26, .27, -31), ("snap", .43, 0, -28))
    cue(37, "Audio waveform unfolds", ("sweep", 0, -.3, -31, .60, .28))
    cue(38, "Final layers assemble", ("snap", 0, -.18, -30), ("snap", .11, .18, -31), ("impact", .22, 0, -20))

    # RESULT — 00:39–00:45. Preview micro-actions are intentionally restrained.
    cue(39, "PREVIEW click and fullscreen", ("click", 0, .1, -27), ("whoosh", .025, .1, -28, .48, 0))
    cue(39.7, "Rendered preview / caption reveal", ("pop", 0, -.1, -29))
    cue(40.25, "Rendered preview / keyword emphasis", ("tick", 0, .1, -31))
    cue(40.9, "Rendered preview / subject punch-in", ("punch", 0, 0, -25))
    cue(41.6, "Rendered preview / graphic connection", ("snap", 0, -.18, -29), ("pulse", .045, -.12, -34))
    cue(42.35, "Rendered preview / caption exchange", ("whoosh", 0, -.2, -34, .22, .15), ("pop", .15, .15, -32))
    cue(43.0, "Rendered preview / layout lock", ("snap", 0, .1, -29))
    cue(43.5, "Fullscreen reduces to card", ("reverse", 0, .08, -29, .34, .2), ("snap", .29, .2, -27))
    cue(44.3, "GENERATED status", ("tick", 0, .22, -28))

    # MODIFY BY PROMPT — 00:45–00:50
    cue(45, "Freeze selected animation", ("stop", 0, -.08, -27))
    cue(45.8, "Select animation card", ("click", 0, -.18, -27))
    cue(46.5, "MAKE IT CLEANER bubble", ("pop", 0, .14, -27))
    cue(47.3, "Send instruction packet", ("click", 0, .2, -27), ("whoosh", .025, .2, -31, .35, -.2))
    cue(48.2, "Break and rebuild cleaner layout", ("reverse", 0, -.15, -32, .20, .1), ("tick", .03, -.12, -33), ("snap", .23, -.15, -29), ("snap", .37, .02, -28), ("snap", .53, .17, -29))
    cue(49.2, "UPDATED status", ("chime", 0, .16, -28))

    # VERSIONING — 00:50–00:55
    cue(50, "VERSION 01 slides away", ("whoosh", 0, .1, -30, .38, -.34))
    cue(50.8, "VERSION 02 rises", ("whoosh", 0, -.1, -31, .30, .1), ("snap", .23, .1, -26))
    cue(51.7, "Before after slider drag", ("slide", 0, -.34, -32, .75, .34), ("tick", .12, -.2, -35), ("tick", .34, 0, -35), ("tick", .56, .2, -35))
    cue(53, "EXPORT click progress and MP4", ("click", 0, .18, -26), ("pulse", .18, .03, -33), ("pulse", .40, .03, -34), ("pop", .63, 0, -26), ("ping", .67, 0, -32))
    cue(54.3, "Export file fills screen", ("whoosh", 0, .12, -31, .24, 0), ("impact", .14, 0, -18))

    # CTA — 00:55–01:00
    cue(55, "Best final excerpt cinematic reveal", ("whoosh", 0, -.15, -29, .45, .06), ("pulse", .24, .03, -31))
    cue(55.8, "Instagram comment card arrives", ("slide", 0, -.05, -33, .26, 0), ("pop", .19, 0, -27))
    cue(56.6, "Focus comment field", ("click", 0, -.1, -27), ("tick", .035, -.1, -33))
    cue(57, "Type CLAUDE", *[("tap", i * .105, -.10 + i * .025, -29 - (i % 3)) for i in range(6)])
    cue(58, "PUBLIER click and send", ("click", 0, .18, -25), ("whoosh", .05, .18, -29, .49, -.22), ("ping", .44, -.17, -31))
    cue(59, "Comment resolves / clean end impact", ("end", 0, 0, -15.5), ("snap", .025, .03, -29))
    return cues


def render(destination: Path) -> None:
    destination.mkdir(parents=True, exist_ok=True)
    cues = make_cues()
    audio = np.zeros((int(RATE * LENGTH), 2), dtype=np.float64)
    component_count = 0
    for cue in cues:
        for component in cue["components"]:
            rng = np.random.default_rng(SEED + 104729 * component_count)
            variation = rng.uniform(-1, 1)
            mono = synth(component["kind"], component["duration"], rng, variation)
            mono *= db(component["gain_dbfs"])
            # Constant-power pan, gently limited to +/-0.38 by the cue sheet.
            pan = np.linspace(component["pan_start"], component["pan_end"], len(mono))
            angle = (pan + 1) * np.pi / 4
            stereo = np.stack((mono * np.cos(angle), mono * np.sin(angle)), axis=1)
            # Compensate centre attenuation: the quoted cue gain is the actual
            # per-channel peak at centre, and approximately the same off-centre.
            stereo *= math.sqrt(2)
            start = int(round(component["at"] * RATE))
            count = min(len(stereo), len(audio) - start)
            if start < 0 or count <= 0:
                raise ValueError(f"Cue is outside the composition: {component}")
            audio[start:start + count] += stereo[:count]
            component_count += 1

    # A transparent gain trim preserves dynamics; no pumping limiter or clipping.
    raw_peak = np.max(np.abs(audio))
    ceiling = db(-15)
    master_gain = min(1.0, ceiling / raw_peak)
    audio *= master_gain
    # End in a real silence and avoid TPDF hiss throughout the silent gaps.
    audio[-int(.25 * RATE):] *= np.linspace(1, 0, int(.25 * RATE))[:, None]
    pcm = np.round(np.clip(audio, -1, 1) * 32767).astype(np.int16)
    wavfile.write(destination / "sfx.wav", RATE, pcm)
    peak_db = 20 * np.log10(np.max(np.abs(audio)))
    rms_db = 20 * np.log10(np.sqrt(np.mean(audio ** 2)))
    manifest = {
        "title": "CLAUDE MONTE MA VIDÉO — original procedural sound design",
        "generator": "scripts/generate-sfx.py",
        "seed": SEED,
        "sample_rate": RATE,
        "channels": 2,
        "duration": LENGTH,
        "format": "PCM signed 16-bit WAV",
        "peak_dbfs": round(float(peak_db), 3),
        "rms_dbfs": round(float(rms_db), 3),
        "master_gain_db": round(float(20 * np.log10(master_gain)), 3),
        "cue_count": len(cues),
        "component_count": component_count,
        "notes": "All sounds generated locally. No sampled assets or music. Subtle processing hum only at 27–33s. Pan: -1 left, +1 right. Cue gains precede final master trim.",
        "cues": cues,
    }
    (destination / "sfx-events.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Rendered {len(cues)} cues / {component_count} components, {LENGTH:.0f}s stereo at {RATE} Hz")
    print(f"Peak {peak_db:.2f} dBFS, RMS {rms_db:.2f} dBFS, master trim {manifest['master_gain_db']:.2f} dB")
    print(destination / "sfx.wav")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output-dir", type=Path, default=ROOT / "public" / "audio")
    args = parser.parse_args()
    render(args.output_dir)
