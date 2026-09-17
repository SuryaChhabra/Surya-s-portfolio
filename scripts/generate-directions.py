import colorsys

def s(c):
    c=c/255
    return c/12.92 if c<=0.03928 else ((c+0.055)/1.055)**2.4
def lum(h):
    h=h.lstrip('#'); r,g,b=(int(h[i:i+2],16) for i in (0,2,4))
    return 0.2126*s(r)+0.7152*s(g)+0.0722*s(b)
def ratio(a,b):
    la,lb=lum(a),lum(b); hi,lo=max(la,lb),min(la,lb)
    return (hi+0.05)/(lo+0.05)

def adjust(hexs, bgs, target=4.6):
    """Walk lightness until the colour clears `target` against every bg."""
    h=hexs.lstrip('#'); r,g,b=(int(h[i:i+2],16)/255 for i in (0,2,4))
    hh,ll,ss=colorsys.rgb_to_hls(r,g,b)
    dark_bg = lum(bgs[0]) < 0.2
    for i in range(0,700):
        # on dark backgrounds brighten, on light backgrounds darken
        l = ll + (i/700)*(1-ll) if dark_bg else ll*(1-i/700)
        rr,gg,bb=colorsys.hls_to_rgb(hh,min(1,max(0,l)),ss)
        cand='#%02x%02x%02x'%(round(rr*255),round(gg*255),round(bb*255))
        if min(ratio(cand,bg) for bg in bgs)>=target:
            return cand
    return hexs

HUES=["red","orange","amber","green","cyan","blue","violet","pink"]

PRISM_SPECTRUM=dict(zip(HUES,["#ff4d3d","#ff8a2b","#f5b301","#34c77b","#22d3ee","#3b82f6","#7c5cff","#ff4d8d"]))
NEON_SPECTRUM=dict(zip(HUES,["#ff4d6d","#ff9f45","#ffe14d","#b6ff3d","#3df0ff","#4d9fff","#b06bff","#ff4dc4"]))
BLOOM_SPECTRUM=dict(zip(HUES,["#cf6f5c","#cb8a52","#bd964b","#6f9a70","#5f9aa6","#6b87b5","#8f7fae","#bb7590"]))

DIRECTIONS = {
 "press": dict(
   label="Press",
   light=dict(paper="#faf7f1",paper2="#f2ede4",ink="#16120c",inksoft="#4a4238",inkfaint="#8c8274",line="#d8d0c2",card="#fffdf8"),
   dark=dict(paper="#121110",paper2="#1a1815",ink="#f4efe6",inksoft="#c0b8a9",inkfaint="#8c8274",line="#2e2a24",card="#191713"),
   mono_accent=("#b3261e","#ff7a6b"),
   shape=dict(radius_card="4px",radius_pill="4px",shadow="none",shadow_dark="none",grain="0.62",grain_dark="0.3",tracking="-0.02em"),
   type=dict(display="var(--ff-editorial)",body="var(--ff-editorial)"),
   scene=False,
 ),
 "neon": dict(
   label="Neon",
   light=dict(paper="#07090c",paper2="#0b0f14",ink="#e8f6ff",inksoft="#9fb4c4",inkfaint="#64798a",line="#17222d",card="#0c1218"),
   dark=None,
   spectrum=NEON_SPECTRUM,
   shape=dict(radius_card="3px",radius_pill="3px",
              shadow="0 0 0 1px rgba(61,240,255,0.16), 0 0 34px -12px rgba(61,240,255,0.5)",
              grain="0.18",tracking="-0.04em"),
   type=dict(display="var(--ff-grotesk)",body="var(--ff-grotesk)"),
   scene=True,
 ),
 "bloom": dict(
   label="Bloom",
   light=dict(paper="#f2f1e9",paper2="#e9e8dd",ink="#23271f",inksoft="#52584a",inkfaint="#878d7a",line="#dbdacd",card="#fbfaf4"),
   dark=dict(paper="#14170f",paper2="#1a1e15",ink="#eef0e6",inksoft="#b6bcaa",inkfaint="#838a77",line="#2a2f24",card="#1c2017"),
   spectrum=BLOOM_SPECTRUM,
   shape=dict(radius_card="2.5rem",radius_pill="9999px",
              shadow="0 2px 4px rgba(35,39,31,0.04), 0 26px 54px -24px rgba(35,39,31,0.28)",
              shadow_dark="0 2px 4px rgba(0,0,0,0.4), 0 26px 54px -24px rgba(0,0,0,0.7)",
              grain="0.38",grain_dark="0.22",tracking="-0.028em"),
   type=dict(display="var(--ff-display)",body="var(--ff-body)"),
   scene=True,
 ),
 "mono": dict(
   label="Mono",
   light=dict(paper="#ffffff",paper2="#f0f0ef",ink="#000000",inksoft="#3d3d3d",inkfaint="#737373",line="#d6d6d4",card="#ffffff"),
   dark=dict(paper="#0a0a0a",paper2="#151515",ink="#ffffff",inksoft="#b0b0b0",inkfaint="#7d7d7d",line="#272727",card="#101010"),
   mono_accent=("#e8112d","#ff5a6a"),
   shape=dict(radius_card="0px",radius_pill="0px",shadow="none",shadow_dark="none",grain="0.14",grain_dark="0.1",tracking="-0.045em"),
   type=dict(display="var(--ff-body)",body="var(--ff-body)"),
   scene=False,
 ),
}

def palette_block(pal, spectrum, mono_accent, shape, typ, dark):
    bgs=[pal["paper"],pal["paper2"],pal["card"]]
    out=[]
    out.append(f'  --paper: {pal["paper"]};')
    out.append(f'  --paper-2: {pal["paper2"]};')
    out.append(f'  --ink: {pal["ink"]};')
    out.append(f'  --ink-soft: {pal["inksoft"]};')
    out.append(f'  --ink-faint: {pal["inkfaint"]};')
    out.append(f'  --line: {pal["line"]};')
    out.append(f'  --card: {pal["card"]};')
    if mono_accent:
        vivid = mono_accent[1] if dark else mono_accent[0]
        ink = adjust(vivid, bgs)
        for h in HUES:
            out.append(f'  --sp-{h}: {vivid};')
        for h in HUES:
            out.append(f'  --sp-{h}-ink: {ink};')
    else:
        for h in HUES:
            out.append(f'  --sp-{h}: {spectrum[h]};')
        for h in HUES:
            out.append(f'  --sp-{h}-ink: {adjust(spectrum[h], bgs)};')
    out.append(f'  --radius-card: {shape["radius_card"]};')
    out.append(f'  --radius-pill: {shape["radius_pill"]};')
    sh = shape.get("shadow_dark" if dark else "shadow", shape["shadow"])
    out.append(f'  --shadow: {sh};')
    gr = shape.get("grain_dark" if dark else "grain", shape["grain"])
    out.append(f'  --grain-opacity: {gr};')
    out.append(f'  --display-tracking: {shape["tracking"]};')
    out.append(f'  --type-display: {typ["display"]};')
    out.append(f'  --type-body: {typ["body"]};')
    return "\n".join(out)

css=["""/* ===========================================================================
   Design directions.

   GENERATED — see scripts/generate-directions.py. Each direction retargets the
   same token set, so no component knows which one is active. The -ink values
   are derived, not picked: the generator walks each hue's lightness until it
   clears 4.5:1 against that direction's own paper, paper-2 and card, in both
   themes. Monochrome directions (Press, Mono) collapse all eight spectrum
   slots onto one accent, which turns the rainbow rules into solid accent rules.
   =========================================================================== */
"""]

for key,d in DIRECTIONS.items():
    css.append(f'/* ---- {d["label"]} ---- */')
    css.append(f':root[data-direction="{key}"] {{')
    css.append(palette_block(d["light"], d.get("spectrum"), d.get("mono_accent"), d["shape"], d["type"], dark=(d["dark"] is None)))
    css.append('}\n')
    if d["dark"]:
        block = palette_block(d["dark"], d.get("spectrum"), d.get("mono_accent"), d["shape"], d["type"], dark=True)
        css.append(f':root[data-direction="{key}"][data-theme="dark"] {{')
        css.append(block)
        css.append('}\n')
        css.append('@media (prefers-color-scheme: dark) {')
        css.append(f'  :root[data-direction="{key}"]:not([data-theme="light"]) {{')
        css.append("\n".join("  "+l for l in block.split("\n")))
        css.append('  }')
        css.append('}\n')

open("src/app/directions.css","w").write("\n".join(css))
print("wrote src/app/directions.css")

# report derived inks
for key,d in DIRECTIONS.items():
    pal=d["light"]; bgs=[pal["paper"],pal["paper2"],pal["card"]]
    if d.get("mono_accent"):
        v=d["mono_accent"][0]; print(f'{key:6s} mono accent {v} -> ink {adjust(v,bgs)} ({min(ratio(adjust(v,bgs),b) for b in bgs):.2f})')
    else:
        sp=d["spectrum"]
        worst=min((min(ratio(adjust(c,bgs),b) for b in bgs), n) for n,c in sp.items())
        print(f'{key:6s} spectrum worst ink contrast {worst[0]:.2f} ({worst[1]})')
