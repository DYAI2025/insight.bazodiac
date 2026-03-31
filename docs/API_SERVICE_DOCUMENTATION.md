# FuFirE — Fusion Firmament Engine: Vollständige API- & Fusions-Mathematik-Dokumentation

> Erstellt am 2026-03-28 durch Codebase-Analyse. Quellsprache: Python 3.10+ / FastAPI.

---

## 1. Service-Überblick

**FuFirE** (Fusion Firmament Engine) ist ein deterministischer, astronomisch präziser Berechnungsservice, der drei Astrologie-Systeme vereint:

| System | Beschreibung |
|--------|-------------|
| **BaZi (四柱命理)** | Vier Pfeiler des Schicksals — Jahr/Monat/Tag/Stunde basierend auf Sonnentermin-Grenzen (Swiss Ephemeris) |
| **Westliche Astrologie** | Planetenpositionen, Häuser, Aspekte, Aszendent/MC |
| **Wu-Xing-Fusion (五行)** | Vereinigung beider Systeme über Fünf-Elemente-Vektormathematik |

### Authentifizierung

`/v1/*`-Endpunkte erfordern einen API-Key via `X-API-Key`-Header. Keys sind tier-basiert:

| Prefix | Tier | Req/Tag | Req/Min |
|--------|------|---------|---------|
| `ff_free_` | free | 100 | 5 |
| `ff_starter_` | starter | 1.000 | 20 |
| `ff_pro_` | pro | 10.000 | 100 |
| `ff_enterprise_` | enterprise | ∞ | ∞ |

### Standard-Response-Headers

Jede Antwort enthält: `X-Request-ID` (UUID), `X-API-Version`, `X-Response-Time-ms`.  
v1-Endpunkte zusätzlich: `X-RateLimit-Limit`, `X-RateLimit-Remaining`.

### Fehler-Envelope (konsistent für alle Fehler)

```json
{
  "error": "validation_error",
  "message": "Request validation failed",
  "detail": {},
  "status": 422,
  "path": "/v1/calculate/bazi",
  "timestamp": "2026-03-17T00:00:00Z",
  "request_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

---

## 2. Vollständige Endpunkt-Referenz

### 2.1 Info-Endpunkte (öffentlich, kein API-Key)

| Endpunkt | Methode | Beschreibung |
|----------|---------|-------------|
| `/` und `/v1/` | GET | Root — Service-Name + Version |
| `/health` und `/v1/health` | GET | Liveness-Check mit Ephemeris-Dependency-Status |
| `/ready` und `/v1/ready` | GET | Readiness-Check für Load-Balancer (503 wenn degraded) |
| `/build` und `/v1/build` | GET | Build-Metadata (Version, optional Fly.io/Railway Deployment-IDs) |
| `/api` und `/v1/api` | GET | Sonnenzeichen-Lookup (Legacy, Deutsch) |
| `/info/wuxing-mapping` | GET | Kanonische Planet→Wu-Xing-Zuordnung |

#### GET `/api` — Request
```
?datum=1990-06-15&zeit=14:30&tz=Europe/Berlin&lon=13.405&lat=52.52
```

#### GET `/api` — Response
```json
{
  "sonne": "Zwillinge",
  "input": {"datum": "1990-06-15", "zeit": "14:30", "ort": null, "tz": "Europe/Berlin", "lat": 52.52, "lon": 13.405}
}
```

---

### 2.2 POST `/calculate/bazi` — Vier-Pfeiler-Berechnung

#### Request
```json
{
  "date": "1990-06-15T14:30:00",
  "tz": "Europe/Berlin",
  "lon": 13.405,
  "lat": 52.52,
  "standard": "CIVIL",
  "boundary": "midnight",
  "ambiguousTime": "earlier",
  "nonexistentTime": "error",
  "birth_time_known": true
}
```

| Feld | Typ | Default | Beschreibung |
|------|-----|---------|-------------|
| `date` | string | **required** | ISO 8601 Lokaldatum+Zeit |
| `tz` | string | `Europe/Berlin` | IANA Timezone |
| `lon` / `lat` | float | Berlin | Geographische Koordinaten |
| `standard` | `CIVIL` \| `LMT` | `CIVIL` | Zeitstandard |
| `boundary` | `midnight` \| `zi` | `midnight` | Tagesgrenzen-Konvention |
| `ambiguousTime` | `earlier` \| `later` | `earlier` | DST Herbst-Rücksprung |
| `nonexistentTime` | `error` \| `shift_forward` | `error` | DST Frühling-Lücke |
| `birth_time_known` | bool | `true` | Markiert Stundenpfeiler als provisorisch wenn `false` |

#### Response
```json
{
  "input": { "..." },
  "pillars": {
    "year":  {"stamm": "Geng", "zweig": "Wu",  "tier": "Pferd",  "element": "Metall"},
    "month": {"stamm": "Ren",  "zweig": "Wu",  "tier": "Pferd",  "element": "Wasser"},
    "day":   {"stamm": "Geng", "zweig": "Wu",  "tier": "Pferd",  "element": "Metall"},
    "hour":  {"stamm": "Ren",  "zweig": "Wu",  "tier": "Pferd",  "element": "Wasser"}
  },
  "chinese": {
    "year": {"stem": "Geng", "branch": "Wu", "animal": "Pferd"},
    "month_master": "Ren",
    "day_master": "Geng",
    "hour_master": "Ren"
  },
  "dates": {
    "birth_local": "1990-06-15T14:30:00+02:00",
    "birth_utc": "1990-06-15T12:30:00+00:00",
    "lichun_local": "1990-02-04T03:14:00+01:00"
  },
  "transition": {
    "solar_year": 1990,
    "is_before_lichun": false,
    "lichun_year_start": "1990-02-04T03:14:00+01:00",
    "lichun_next": "1991-02-04T09:08:00+01:00"
  },
  "solar_terms_count": 24,
  "provenance": {
    "engine_version": "1.0.0-rc1",
    "parameter_set_id": "...",
    "ruleset_id": "...",
    "ephemeris_id": "swisseph",
    "tzdb_version_id": "...",
    "house_system": "placidus",
    "zodiac_mode": "tropical",
    "computation_timestamp": "..."
  },
  "precision": {"birth_time_known": true, "provisional_fields": []},
  "derivation_trace": {
    "year":  {"lichun_crossing_utc": "...", "is_before_lichun": false, "solar_longitude_lichun": 315.0},
    "month": {"jieqi_crossing_utc": "...", "solar_longitude_deg": 75.0, "month_branch_index": 5},
    "day":   {"julian_day_number": 2448085, "sexagenary_index": 14, "day_offset_used": 49},
    "hour":  {"local_hour": 14, "branch_index": 7, "true_solar_time_used": false}
  }
}
```

---

### 2.3 POST `/calculate/western` — Westliche Astrologie

#### Request
```json
{
  "date": "1990-06-15T14:30:00",
  "tz": "Europe/Berlin",
  "lon": 13.405,
  "lat": 52.52,
  "birth_time_known": true,
  "zodiac_mode": "tropical"
}
```

| Feld | Beschreibung |
|------|-------------|
| `zodiac_mode` | `tropical`, `sidereal_lahiri`, `sidereal_fagan_bradley`, `sidereal_raman` |

#### Response
```json
{
  "jd_ut": 2448085.0208,
  "house_system": "placidus",
  "bodies": {
    "Sun":     {"longitude": 84.2, "latitude": 0.0, "speed": 0.96, "distance": 1.015, "zodiac_sign": 2, "degree_in_sign": 24.2, "is_retrograde": false},
    "Moon":    {"longitude": 211.4, "...": "..."},
    "Mercury": {"...": "..."},
    "Venus": {}, "Mars": {}, "Jupiter": {}, "Saturn": {},
    "Uranus": {}, "Neptune": {}, "Pluto": {},
    "Chiron": {}, "Lilith": {}, "NorthNode": {}, "TrueNorthNode": {}
  },
  "houses": {"1": 245.3, "2": 268.1, "...": "..."},
  "angles": {"Ascendant": 245.3, "MC": 172.8, "ARMC": 172.8, "Vertex": 72.4},
  "aspects": [
    {"planet1": "Sun", "planet2": "Mars", "type": "conjunction", "angle": 3.2, "orb": 3.2, "exact_angle": 0.0}
  ],
  "house_quality": {"flag": "exact", "system": "placidus", "requested": "placidus", "reason": null},
  "provenance": {"...": "..."},
  "precision": {"birth_time_known": true, "provisional_fields": []}
}
```

**14 Himmelskörper:** Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto, Chiron, Lilith (Mean Apogee), NorthNode (Mean), TrueNorthNode.

---

### 2.4 POST `/calculate/fusion` — Wu-Xing + Western Harmony

#### Request
```json
{
  "date": "1990-06-15T14:30:00",
  "tz": "Europe/Berlin",
  "lon": 13.405,
  "lat": 52.52,
  "birth_time_known": true,
  "bazi_pillars": null
}
```

`bazi_pillars` kann optional mitgegeben werden (sonst auto-berechnet).

#### Response
```json
{
  "input": {"date": "...", "tz": "...", "lon": 13.405, "lat": 52.52},
  "wu_xing_vectors": {
    "western_planets": {"Holz": 0.534, "Feuer": 0.612, "Erde": 0.267, "Metall": 0.356, "Wasser": 0.378},
    "bazi_pillars":    {"Holz": 0.312, "Feuer": 0.445, "Erde": 0.534, "Metall": 0.489, "Wasser": 0.423}
  },
  "harmony_index": {
    "harmony_index": 0.8234,
    "interpretation": "Starke Resonanz - Westliche und östliche Matrix stehen in perfekter Harmonie",
    "method": "dot_product",
    "western_vector": {"Holz": 0.534, "...": "..."},
    "bazi_vector": {"Holz": 0.312, "...": "..."}
  },
  "calibration": {
    "h_raw": 0.8234,
    "h_calibrated": 0.1554,
    "h_baseline": 0.791,
    "h_sigma": 0.127,
    "sigma_above": 0.255,
    "quality": "ok",
    "interpretation_band": "Unterdurchschnittliche Kongruenz",
    "n_west": 14,
    "n_bazi_contributions": 18
  },
  "elemental_comparison": {
    "Holz":   {"western": 0.534, "bazi": 0.312, "difference": 0.222},
    "Feuer":  {"western": 0.612, "bazi": 0.445, "difference": 0.167},
    "Erde":   {"western": 0.267, "bazi": 0.534, "difference": -0.267},
    "Metall": {"western": 0.356, "bazi": 0.489, "difference": -0.133},
    "Wasser": {"western": 0.378, "bazi": 0.423, "difference": -0.045}
  },
  "cosmic_state": 0.8234,
  "fusion_interpretation": "Harmonie-Index: 82.34%\n...",
  "contribution_ledger": {
    "western": [
      {"planet": "Sun", "element": "Feuer", "weight": 1.0, "is_retrograde": false, "rationale": "Classical rulership", "category": "traditional"},
      {"planet": "Mercury", "element": "Erde", "weight": 1.0, "is_retrograde": false, "rationale": "Dual element — Erde (day chart)", "category": "traditional", "chart_type_quality": "exact"}
    ],
    "bazi": [
      {"pillar": "year", "source": "stem", "stem_name": "Geng", "element": "Metall", "weight": 1.0, "category": "traditional"},
      {"pillar": "year", "source": "hidden_main", "branch_name": "Wu", "element": "Feuer", "weight": 1.0, "category": "traditional"},
      {"pillar": "year", "source": "hidden_middle", "branch_name": "Wu", "element": "Erde", "weight": 0.5, "category": "traditional"}
    ],
    "chart_type_quality": "exact"
  },
  "house_quality": {"flag": "exact", "system": "placidus"},
  "provenance": {"...": "..."},
  "precision": {"birth_time_known": true, "provisional_fields": []}
}
```

---

### 2.5 POST `/calculate/wuxing` — Wu-Xing-Vektor aus Planeten

#### Response
```json
{
  "input": {"...": "..."},
  "wu_xing_vector": {"Holz": 0.534, "Feuer": 0.612, "Erde": 0.267, "Metall": 0.356, "Wasser": 0.378},
  "dominant_element": "Feuer",
  "equation_of_time": -3.42,
  "true_solar_time": 14.213,
  "contribution_ledger": {"western": ["..."]},
  "provenance": {"...": "..."}
}
```

---

### 2.6 POST `/calculate/tst` — True Solar Time

#### Response
```json
{
  "input": {"date": "...", "tz": "...", "lon": 13.405},
  "civil_time_hours": 14.5,
  "longitude_correction_hours": 0.8937,
  "equation_of_time_hours": -0.057,
  "true_solar_time_hours": 15.3367,
  "true_solar_time_formatted": "15:20",
  "provenance": {"...": "..."}
}
```

---

### 2.7 Transit-Endpunkte

| Endpunkt | Methode | Beschreibung |
|----------|---------|-------------|
| `/transit/now` | GET | Aktuelle Planetenpositionen (optional `?datetime=...`) |
| `/transit/state` | POST | Personalisierter Transit-State aus 12-Sektor Soulprint+Quiz |
| `/transit/timeline` | GET | Multi-Tages-Vorhersage (`?days=7`, max 30) |
| `/transit/narrative` | POST | Template-basierte Narration aus Transit-State |

#### POST `/transit/state` — Request
```json
{
  "soulprint_sectors": [0.1, 0.2, 0.3, ...],  // 12 Werte [0,1]
  "quiz_sectors": [0.15, 0.25, 0.35, ...]       // 12 Werte [0,1]
}
```

#### POST `/transit/narrative` — Response
```json
{
  "headline": "Feuer-Impuls im 5. Sektor",
  "body": "...",
  "advice": "...",
  "pushworthy": true,
  "push_text": "..."
}
```

---

### 2.8 Experience-Endpunkte (App-Integration)

| Endpunkt | Methode | Beschreibung |
|----------|---------|-------------|
| `/experience/bootstrap` | POST | Vollständiger Profil-Bootstrap aus Geburtsdaten |
| `/experience/signature-delta` | POST | Inkrementelles Signatur-Update durch Quiz-Antwort |
| `/experience/daily` | POST | Tageshoroskop (Western + Eastern + Fusion) |

#### POST `/experience/bootstrap` — Request
```json
{
  "birth": {
    "date": "1990-06-15",
    "time": "14:30:00",
    "tz": "Europe/Berlin",
    "lat": 52.52,
    "lon": 13.405,
    "place_label": "Berlin"
  },
  "locale": "de-DE"
}
```

#### Bootstrap — Response
```json
{
  "profile": {
    "sun_sign": "Zwillinge",
    "moon_sign": "Skorpion",
    "ascendant_sign": "Schuetze",
    "day_master": "Geng",
    "harmony_index": 0.4521
  },
  "soulprint_sectors": [0.12, 0.08, 0.15, ...],  // 12 Werte
  "signature_blueprint": {
    "seed": "abc123...",
    "visual": {
      "symmetry": 0.72, "curvature": 0.45, "angularity": 0.38,
      "density": 0.61, "contrast": 0.53, "orbit_count": 4
    },
    "elements": {"Holz": 0.23, "Feuer": 0.31, "Erde": 0.18, "Metall": 0.15, "Wasser": 0.13}
  },
  "meta": {"engine_version": "1.0.0-rc1", "generated_at": "2026-03-28T12:00:00Z"}
}
```

---

### 2.9 POST `/chart` — Kombinierter Chart (intern)

Liefert alles in einem Call: Western-Positionen + BaZi-Pfeiler + Zeitskalen + Wu-Xing. Enthält optional BAFE-Validierung (`include_validation: true`).

---

### 2.10 POST `/api/webhooks/chart` — ElevenLabs Voice Agent

Webhook für ElevenLabs-Agents. Akzeptiert `birthDate`, `birthTime`, `birthPlace`, führt Geocoding durch und liefert einen kompakten Chart mit `western`, `eastern`, `fusion` und `summary`-Sektionen auf Deutsch.

---

### 2.11 POST `/validate` — BAFE Contract Validator

JSON Schema Draft-07 Validierung gegen `spec/schemas/ValidateRequest.schema.json`.

---

## 3. Die Fusions-Mathematik — Vollständige Beschreibung

### 3.1 Konzept: Zwei Weltsysteme in einem Vektorraum

Die Grundidee von FuFirE ist elegant: Sowohl westliche Planeten als auch chinesische BaZi-Pfeiler lassen sich als **Fünf-Elemente-Vektoren** in ℝ⁵ abbilden. Der Wu-Xing-Zyklus (Holz → Feuer → Erde → Metall → Wasser) wird zur gemeinsamen Sprache.

Die mathematische Frage lautet: **Wie ähnlich sind die Element-Verteilungen der westlichen und östlichen Chart?**

### 3.2 Schritt 1: Westliche Planeten → Wu-Xing-Vektor

Jeder der 14 Himmelskörper wird einem der fünf Elemente zugeordnet:

| Planet | Element | Begründung |
|--------|---------|------------|
| Sonne | Feuer | Vitalität, Lebenskraft |
| Mond | Wasser | Emotionen, Intuition |
| Merkur | **Erde (Tag) / Metall (Nacht)** | Dual — einziger Planet mit Tag/Nacht-Umschaltung |
| Venus | Metall | Schönheit, Wert, Form |
| Mars | Feuer | Aktion, Energie |
| Jupiter | Holz | Wachstum, Expansion |
| Saturn | Erde | Struktur, Grenzen |
| Uranus | Holz | Innovation, plötzlicher Wandel |
| Neptun | Wasser | Träume, Spiritualität |
| Pluto | Feuer | Transformation, Macht |
| Chiron | Wasser | Heilung |
| Lilith | Wasser | Instinkte |
| NorthNode | Holz | Zukunftsrichtung |

**Tag/Nacht-Erkennung (Sect):**  
Ein Nacht-Chart liegt vor, wenn die Sonne zwischen Deszendent (ASC + 180°) und Aszendent liegt. Ohne Aszendent wird immer Tag-Chart angenommen. Merkur wechselt dann von Erde auf Metall.

**Retrograd-Gewichtung:**  
Rückläufige Planeten erhalten den Faktor **1.3×** statt 1.0× — sie tragen stärker zur Elementarverteilung bei (verstärkte Energie).

**Ergebnis:** Ein roher Vektor `v_west = (holz, feuer, erde, metall, wasser)` mit den summierten Gewichten.

### 3.3 Schritt 2: BaZi-Pfeiler → Wu-Xing-Vektor

Jeder der vier Pfeiler (Jahr, Monat, Tag, Stunde) hat einen **Himmelsstamm** und einen **Erdzweig**:

**Himmelsstämme → Elemente (Gewicht 1.0):**

| Stämme | Element |
|--------|---------|
| Jia, Yi | Holz |
| Bing, Ding | Feuer |
| Wu, Ji | Erde |
| Geng, Xin | Metall |
| Ren, Gui | Wasser |

**Erdzweige → Verborgene Stämme (藏干) mit Qi-Gewichten:**

Jeder Erdzweig enthält 1–3 verborgene Stämme mit abgestuften Gewichten:

| Typ | Gewicht | Bedeutung |
|-----|---------|-----------|
| Haupt-Qi (主气) | 1.0 | Dominante Energie |
| Mittel-Qi (中气) | 0.5 | Sekundäre Energie |
| Rest-Qi (余气) | 0.3 | Restenergie |

Beispiele:
- **Zi (子):** Wasser 1.0 — reines Wasserelement
- **Chou (丑):** Erde 1.0 + Wasser 0.5 + Metall 0.3 — gemischt
- **Yin (寅):** Holz 1.0 + Feuer 0.5 + Erde 0.3

Pro Pfeiler summieren sich: 1 Stamm (1.0) + 1–3 verborgene Stämme (1.0/0.5/0.3).
Ein typischer Chart hat **ca. 4 Stämme + 8–12 verborgene Stämme = 12–16 Beiträge**.

**Ergebnis:** Ein roher Vektor `v_bazi = (holz, feuer, erde, metall, wasser)`.

### 3.4 Schritt 3: L2-Normalisierung

Beide Rohvektoren werden auf die **Einheitskugel** projiziert (L2-Norm):

```
v̂ = v / ‖v‖₂     wobei ‖v‖₂ = √(v₁² + v₂² + v₃² + v₄² + v₅²)
```

Das eliminiert absolute Größenunterschiede (westliche Charts haben typischerweise mehr Beiträge als BaZi) und macht die **Richtung** des Vektors vergleichbar.

> **Wichtig:** Die normalisierten Werte sind **keine additiven Prozentanteile**. Sie sind L2-Koordinaten auf der Einheitskugel in ℝ⁵. FuFirE zeigt sie als „Indexpunkte" (×100) an, nicht als Prozentwerte.

### 3.5 Schritt 4: Harmony Index (H_raw)

Der rohe Harmony Index ist das **Skalarprodukt der normierten Vektoren** — geometrisch der Cosinus des Winkels zwischen ihnen:

```
H_raw = v̂_west · v̂_bazi = Σᵢ (v̂_west_i × v̂_bazi_i)     für i ∈ {Holz, Feuer, Erde, Metall, Wasser}
```

- H_raw = 1.0 → Perfekt identische Elementarverteilung
- H_raw = 0.0 → Orthogonal (maximal verschiedene Richtungen)
- H_raw < 0   → wird auf 0 geclampt (`max(0, dot)`)

**Das Problem mit H_raw:** Da alle Vektorkomponenten ≥ 0 sind (positiver Orthant von ℝ⁵), liegt H_raw empirisch **immer in [0.50, 1.00]**. Zwei vollständig zufällige Charts ergeben bereits H ≈ 0.72–0.79. Die intuitiven Schwellenwerte (0.2 = schwach, 0.8 = stark) sind damit praktisch unerreichbar.

### 3.6 Schritt 5: H-Kalibrierung (Kontrastverhältnis zur Baseline)

Die Kalibrierung beantwortet die Frage: **Wie viel strukturierter ist die Übereinstimmung als bei zufälligen Charts gleicher Dichte?**

#### Baseline-Tabelle (empirisch, 5.000 Simulationen je Konfiguration):

Die Baseline hängt von der **Inputdichte** ab:

| West-Planeten | BaZi-Beiträge | H_baseline (μ) | σ |
|---------------|---------------|-----------------|---|
| 1–3 (sparse) | beliebig | 0.547 | 0.231 |
| 4–8 (medium) | 1–8 (sparse) | 0.664 | 0.191 |
| 4–8 (medium) | 9–16 (medium) | 0.718 | 0.161 |
| 9+ (dense) | 9–16 (medium) | 0.791 | 0.127 |
| 9+ (dense) | 17+ (dense) | 0.791 | 0.127 |

#### Kontrastnormierung:

```
H_calibrated = max(0, (H_raw − H_baseline) / (1.0 − H_baseline))
```

Und der z-Score:
```
σ_above = (H_raw − H_baseline) / σ
```

#### Qualitätsflag:

| Flag | Bedingung |
|------|-----------|
| `ok` | ≥ 3 Planeten und ≥ 8 Qi-Beiträge |
| `sparse` | < 3 Planeten oder < 8 Beiträge |
| `degenerate` | Nullvektor (keine Daten) |

#### Interpretationsbänder (basierend auf H_calibrated):

| H_calibrated | Band |
|--------------|------|
| ≥ 0.80 | Starke Kongruenz |
| ≥ 0.55 | Überdurchschnittliche Kongruenz |
| ≥ 0.30 | Durchschnittliche Kongruenz |
| ≥ 0.10 | Unterdurchschnittliche Kongruenz |
| < 0.10 | Keine messbare Kongruenz über Baseline |

### 3.7 Schritt 6: Elementar-Vergleich

Für jedes der fünf Elemente wird die Differenz berechnet:

```
difference_i = v̂_west_i − v̂_bazi_i
```

Positiv = West dominiert, Negativ = BaZi dominiert.

### 3.8 Schritt 7: Cosmic State

Der Cosmic State ist ein einzelner Skalar, der die **gewichtete Überlappung** der normierten Vektoren misst:

```
cosmic_state = Σᵢ (v̂_west_i × v̂_bazi_i)
```

Identisch mit H_raw — dient als kompakter numerischer Fingerabdruck des Gesamtzustands.

### 3.9 Schritt 8: Zonenklassifikation (Logik B)

Jede der fünf Elementar-Achsen wird in genau eine **Zone** klassifiziert (exklusiv, hierarchisch):

| Zone | Priorität | Bedingung |
|------|-----------|-----------|
| **TENSION** | 1 (höchste) | \|Δᵢ\| > 0.15 |
| **STRENGTH** | 2 | west > 0.20 AND bazi > 0.20 AND \|Δᵢ\| ≤ 0.15 |
| **DEVELOPMENT** | 3 | west < 0.15 AND bazi < 0.15 |
| **NEUTRAL** | 4 | Keines der obigen |

**Beweis der Disjunktheit:**
- TENSION vs STRENGTH: STRENGTH verlangt |Δ| ≤ 0.15, TENSION verlangt |Δ| > 0.15 → disjunkt
- STRENGTH vs DEVELOPMENT: STRENGTH verlangt beide > 0.20, DEVELOPMENT verlangt beide < 0.15 → unmöglich gleichzeitig
- TENSION vs DEVELOPMENT: Wenn beide < 0.15, dann |Δ| < 0.15, also keine TENSION

Zu jeder TENSION- und DEVELOPMENT-Achse werden **Leitfragen** generiert (inkl. Sheng-Zyklus-Fragen basierend auf Vorgänger/Nachfolger im Erzeugungszyklus).

### 3.10 True Solar Time (TST) und Equation of Time (EoT)

FuFirE berechnet die wahre Sonnenzeit, die in der traditionellen BaZi-Astrologie die Grundlage für den Stundenpfeiler bildet.

**Equation of Time** (NOAA-Formel):

```
γ = 2π(N − 1) / 365

EoT = 229.18 × (0.000075 + 0.001868·cos(γ) − 0.032077·sin(γ) − 0.014615·cos(2γ) − 0.040849·sin(2γ))
```

Ergebnis in Minuten (Range: −14.2 bis +16.4 min). Die EoT korrigiert die Diskrepanz zwischen mittlerer und wahrer Sonnenzeit, verursacht durch Erdbahnexzentrizität und Achsenneigung.

**True Solar Time:**

```
TST = Zivilzeit − TZ-Offset + (Längengrad/15) + EoT/60      [in Stunden]
```

---

## 4. Datenfluss-Zusammenfassung

```
Geburtsdaten (Datum, Zeit, Ort, TZ)
         │
    ┌────┴────┐
    ▼         ▼
  BaZi      Western Chart
  compute_bazi()    compute_western_chart()
    │         │
    │         ├── 14 Himmelskörper (lon, lat, speed, retrograde)
    │         ├── 12 Häuser (Placidus / Fallback)
    │         └── Aspekte
    │         │
    ▼         ▼
  4 Pfeiler     Bodies + Ascendant
  (Stamm+Zweig)     │
    │              │
    ▼              ▼
  calculate_wuxing_from_bazi()    calculate_wuxing_vector_from_planets()
  → v_bazi ∈ ℝ⁵                → v_west ∈ ℝ⁵
    │              │
    └──────┬───────┘
           ▼
    L2-Normalisierung → v̂_bazi, v̂_west
           │
    ┌──────┼──────┐
    ▼      ▼      ▼
  H_raw  Elemental  Zones
  (dot)  Comparison  (classify_zones)
    │
    ▼
  calibrate_harmony()
  → H_calibrated, σ_above, quality
    │
    ▼
  Fusion Response
  (harmony, calibration, comparison, cosmic_state, interpretation, ledger)
```

---

## 5. Design-Entscheidungen

| Entscheidung | Begründung |
|-------------|------------|
| **Positive-Orthant-Vektoren** | Alle Gewichte ≥ 0 → H_raw immer ≥ 0.5. Lösung: Kalibrierung gegen Baseline. |
| **Retrograd ×1.3** | Retrograde Planeten wirken verstärkt in ihrer Elementarqualität (traditionelle Deutung). |
| **Merkur-Dualität** | Einziger Planet mit Sect-Abhängigkeit (Erde am Tag, Metall bei Nacht) — folgt Hellenistischer Tradition. |
| **Verborgene Stämme mit Qi-Gewichten** | Haupt-Qi 1.0 / Mittel-Qi 0.5 / Rest-Qi 0.3 folgt der klassischen 藏干-Lehre. |
| **L2-Norm statt L1** | Richtungsvergleich statt Gewichtsvergleich — eliminiert das Problem unterschiedlicher Beitragsanzahlen. |
| **Empirische Baseline-Kalibrierung** | 5.000 Simulationen je Dichtekonfiguration → realistische Schwellenwerte statt willkürlicher Cutoffs. |
| **Contribution Ledger** | Vollständige Nachvollziehbarkeit: Jeder einzelne Beitrag (Planet oder Pfeiler) wird mit Gewicht, Element und Begründung dokumentiert. |
