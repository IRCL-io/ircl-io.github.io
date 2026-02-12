#!/usr/bin/env python3
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "Generate_Robot_Combat_Card_Deck.py"

if not SCRIPT.exists():
    raise SystemExit(f"Missing generator script: {SCRIPT}")

cmd = [sys.executable, str(SCRIPT)] + sys.argv[1:]
raise SystemExit(subprocess.call(cmd))
