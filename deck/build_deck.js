const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.defineLayout({ name: "W", width: 13.333, height: 7.5 });
p.layout = "W";

const DARK = "0B3D3A", TEAL = "12715E", AMBER = "F2A541", INK = "1A2B29",
      MUTED = "5C6B68", TINT = "EEF4F2", WHITE = "FFFFFF", LINE = "D7E2DF";
const HF = "Cambria", BF = "Calibri";
const W = 13.333;

function pageNum(s, n) {
  s.addText(`${n}`, { x: 12.5, y: 7.0, w: 0.6, h: 0.3, fontFace: BF, fontSize: 10, color: MUTED, align: "right" });
}
function kicker(s, t, color) {
  s.addText(t.toUpperCase(), { x: 0.7, y: 0.62, w: 11, h: 0.3, fontFace: BF, fontSize: 12, color: color || AMBER, charSpacing: 2, bold: true });
}

/* 1 — Title */
let s = p.addSlide();
s.background = { color: DARK };
s.addShape(p.ShapeType.ellipse, { x: 10.6, y: -1.6, w: 4.6, h: 4.6, fill: { color: TEAL } });
s.addShape(p.ShapeType.ellipse, { x: 11.9, y: 4.7, w: 3.2, h: 3.2, fill: { color: AMBER } });
s.addText("KAJOTA SETTLE", { x: 0.8, y: 2.25, w: 10.5, h: 1.1, fontFace: HF, fontSize: 54, bold: true, color: WHITE });
s.addText("Agentic case management that turns an informal co-sell handshake\ninto a governed, exception-aware settlement.", { x: 0.82, y: 3.5, w: 9.8, h: 1.0, fontFace: BF, fontSize: 20, color: "CFE0DB", lineSpacingMultiple: 1.1 });
s.addText("UiPath AgentHack 2026   ·   Track 1: Maestro Case", { x: 0.82, y: 4.7, w: 9, h: 0.4, fontFace: BF, fontSize: 14, color: AMBER, bold: true });
s.addText("African micro-commerce  ·  Built with Claude Code", { x: 0.82, y: 6.7, w: 9, h: 0.4, fontFace: BF, fontSize: 12, color: "9FB8B2" });

/* 2 — Problem */
s = p.addSlide(); s.background = { color: WHITE };
kicker(s, "The problem", TEAL);
s.addText("Deals close on a photo and a promise.", { x: 0.7, y: 0.95, w: 11.9, h: 0.8, fontFace: HF, fontSize: 34, bold: true, color: INK });
s.addText([
  { text: "Across African markets, wholesale co-sell deals between merchants are agreed informally — no shared record, no verification, no FX clarity.", options: { bullet: { code: "2022", indent: 18 }, paraSpaceAfter: 12 } },
  { text: "The process is dynamic and exception-heavy: missing documents, unverified counterparties, multi-currency settlement, disputes and defaults.", options: { bullet: { code: "2022", indent: 18 }, paraSpaceAfter: 12 } },
  { text: "It is exactly the shape case management exists for — yet it runs on WhatsApp and trust.", options: { bullet: { code: "2022", indent: 18 } } },
], { x: 0.72, y: 2.0, w: 7.0, h: 3.4, fontFace: BF, fontSize: 16.5, color: "33403D", lineSpacingMultiple: 1.12 });

const stats = [["Photo + promise", "the entire system of record"], ["4+ currencies", "NGN · GHS · KES · USD corridors"], ["Exception-first", "the unhappy path is the norm"]];
let sy = 1.95;
stats.forEach(([big, sub]) => {
  s.addShape(p.ShapeType.roundRect, { x: 8.15, y: sy, w: 4.45, h: 1.45, rectRadius: 0.1, fill: { color: TINT }, line: { color: LINE, width: 1 } });
  s.addText(big, { x: 8.35, y: sy + 0.16, w: 4.05, h: 0.55, fontFace: HF, fontSize: 22, bold: true, color: TEAL });
  s.addText(sub, { x: 8.35, y: sy + 0.78, w: 4.05, h: 0.5, fontFace: BF, fontSize: 13, color: MUTED });
  sy += 1.62;
});
pageNum(s, 2);

/* 3 — Solution: 5-stage case */
s = p.addSlide(); s.background = { color: WHITE };
kicker(s, "The solution", TEAL);
s.addText("One deal, run as a Maestro Case", { x: 0.7, y: 0.95, w: 11.9, h: 0.7, fontFace: HF, fontSize: 34, bold: true, color: INK });
s.addText("Five stages with handoffs between AI agents, automated integrations, and people — humans kept in the loop exactly where judgment matters.", { x: 0.72, y: 1.75, w: 11.8, h: 0.6, fontFace: BF, fontSize: 16, color: MUTED });

const stages = [
  ["1", "Intake", "Agent extracts deal terms from a photo + notes"],
  ["2", "Verify", "Merchant lookup + agent risk / KYC decision"],
  ["3", "Price", "Agent computes settlement with cross-currency FX"],
  ["4", "Settle", "Agent picks the rail; idempotent execution"],
  ["5", "Fulfill", "Delivery confirmed, case closed & reconciled"],
];
const cw = 2.28, gap = 0.18, x0 = 0.72, yC = 2.75;
stages.forEach(([n, t, d], i) => {
  const x = x0 + i * (cw + gap);
  s.addShape(p.ShapeType.roundRect, { x, y: yC, w: cw, h: 2.6, rectRadius: 0.1, fill: { color: i % 2 ? TINT : "F6FAF8" }, line: { color: LINE, width: 1 } });
  s.addShape(p.ShapeType.ellipse, { x: x + 0.9, y: yC + 0.28, w: 0.48, h: 0.48, fill: { color: i === 3 ? AMBER : TEAL } });
  s.addText(n, { x: x + 0.9, y: yC + 0.28, w: 0.48, h: 0.48, align: "center", valign: "middle", fontFace: HF, fontSize: 20, bold: true, color: WHITE });
  s.addText(t, { x: x + 0.1, y: yC + 0.92, w: cw - 0.2, h: 0.4, align: "center", fontFace: HF, fontSize: 19, bold: true, color: INK });
  s.addText(d, { x: x + 0.18, y: yC + 1.4, w: cw - 0.36, h: 1.0, align: "center", fontFace: BF, fontSize: 12.5, color: "44524F", lineSpacingMultiple: 1.05 });
  if (i < 4) s.addText("›", { x: x + cw - 0.06, y: yC + 0.95, w: 0.3, h: 0.5, align: "center", fontFace: BF, fontSize: 24, bold: true, color: AMBER });
});
s.addText("Each stage has an exception path (low confidence · high risk · out-of-band price · settlement failure · dispute) that routes to a human task.", { x: 0.72, y: 5.6, w: 11.8, h: 0.5, fontFace: BF, fontSize: 13.5, italic: true, color: MUTED });
pageNum(s, 3);

/* 4 — How it works: components */
s = p.addSlide(); s.background = { color: WHITE };
kicker(s, "How it works", TEAL);
s.addText("UiPath orchestrates agents, people, and systems", { x: 0.7, y: 0.95, w: 11.9, h: 0.7, fontFace: HF, fontSize: 32, bold: true, color: INK });
const comps = [
  ["M", "Maestro Case", "The orchestration & governance layer — stages, transitions, SLAs, full audit trail."],
  ["A", "Agent Builder", "4 agents (Intake · Risk · Pricing · Settlement), each returning strict JSON the case branches on."],
  ["H", "Action Center", "Human-in-the-loop tasks for the four exception paths — judgment where it counts."],
  ["W", "API Workflows", "Merchant lookup, FX, settlement, delivery — no RPA robot needed, runs fully on cloud."],
];
const gx = [0.72, 6.85], gyv = [2.0, 4.0], cw2 = 5.75, ch2 = 1.78;
comps.forEach((c, i) => {
  const x = gx[i % 2], y = gyv[Math.floor(i / 2)];
  s.addShape(p.ShapeType.roundRect, { x, y, w: cw2, h: ch2, rectRadius: 0.08, fill: { color: TINT }, line: { color: LINE, width: 1 } });
  s.addShape(p.ShapeType.ellipse, { x: x + 0.3, y: y + 0.34, w: 1.0, h: 1.0, fill: { color: TEAL } });
  s.addText(c[0], { x: x + 0.3, y: y + 0.34, w: 1.0, h: 1.0, align: "center", valign: "middle", fontFace: HF, fontSize: 30, bold: true, color: WHITE });
  s.addText(c[1], { x: x + 1.55, y: y + 0.3, w: cw2 - 1.75, h: 0.5, fontFace: HF, fontSize: 20, bold: true, color: INK });
  s.addText(c[2], { x: x + 1.55, y: y + 0.82, w: cw2 - 1.8, h: 0.85, fontFace: BF, fontSize: 13.5, color: "44524F", lineSpacingMultiple: 1.05 });
});
pageNum(s, 4);

/* 5 — Cross-platform settlement */
s = p.addSlide(); s.background = { color: DARK };
kicker(s, "Cross-platform integration", AMBER);
s.addText("UiPath, orchestrating a Web3 settlement rail", { x: 0.7, y: 0.98, w: 11.9, h: 0.7, fontFace: HF, fontSize: 32, bold: true, color: WHITE });
s.addText("At the Settle stage, the Settlement Orchestration Agent chooses the rail and an API workflow executes it idempotently.", { x: 0.72, y: 1.78, w: 11.6, h: 0.6, fontFace: BF, fontSize: 16, color: "CFE0DB" });
const rails = [
  ["Fiat payout", "Default rail — bank / mobile-money payout via API workflow, with retry + human escalation on failure."],
  ["On-chain mesh escrow", "For higher-trust or escrow-preferred deals, settle to Kajota's mesh escrow contract on Ethereum / Mantle Sepolia."],
];
rails.forEach((r, i) => {
  const x = 0.72 + i * 6.1;
  s.addShape(p.ShapeType.roundRect, { x, y: 2.75, w: 5.7, h: 2.9, rectRadius: 0.1, fill: { color: "0F4D49" }, line: { color: TEAL, width: 1.5 } });
  s.addShape(p.ShapeType.ellipse, { x: x + 0.35, y: 3.1, w: 0.5, h: 0.5, fill: { color: i ? AMBER : "00A896" } });
  s.addText(r[0], { x: x + 1.05, y: 3.05, w: 4.4, h: 0.6, fontFace: HF, fontSize: 21, bold: true, color: WHITE });
  s.addText(r[1], { x: x + 0.4, y: 3.85, w: 5.0, h: 1.6, fontFace: BF, fontSize: 15, color: "CFE0DB", lineSpacingMultiple: 1.12 });
});
s.addText("Same case, pluggable rails — UiPath stays the orchestration & governance layer over either.", { x: 0.72, y: 5.95, w: 11.6, h: 0.5, fontFace: BF, fontSize: 14, italic: true, color: AMBER });
pageNum(s, 5);

/* 6 — Why it wins */
s = p.addSlide(); s.background = { color: WHITE };
kicker(s, "Why it scores", TEAL);
s.addText("Built for the rubric", { x: 0.7, y: 0.95, w: 11.9, h: 0.7, fontFace: HF, fontSize: 34, bold: true, color: INK });
const rows = [
  ["Business impact", "A real, large, underserved market — settlement for informal micro-commerce."],
  ["Platform usage", "Maestro Case + Agent Builder + Action Center + API Workflows, end to end."],
  ["Technical execution", "Data-dependent routing, exception handling, idempotent settlement, HITL."],
  ["Completeness", "Full case lifecycle — including every unhappy path."],
  ["Creativity", "Agentic settlement for the informal economy; on-chain rail as a pluggable option."],
];
let ry = 1.95;
rows.forEach(([h, d]) => {
  s.addShape(p.ShapeType.ellipse, { x: 0.75, y: ry + 0.05, w: 0.34, h: 0.34, fill: { color: AMBER } });
  s.addText(h, { x: 1.3, y: ry - 0.05, w: 3.5, h: 0.5, fontFace: HF, fontSize: 17, bold: true, color: TEAL });
  s.addText(d, { x: 4.9, y: ry - 0.05, w: 7.7, h: 0.6, fontFace: BF, fontSize: 14.5, color: "33403D" });
  ry += 0.82;
});
s.addShape(p.ShapeType.roundRect, { x: 0.72, y: 6.15, w: 11.9, h: 0.78, rectRadius: 0.08, fill: { color: DARK } });
s.addText("+ Bonus: authored with Claude Code as the coding agent — design, prompts, workflow specs & docs.", { x: 0.95, y: 6.15, w: 11.5, h: 0.78, valign: "middle", fontFace: BF, fontSize: 14.5, bold: true, color: WHITE });
pageNum(s, 6);

/* 7 — Close */
s = p.addSlide(); s.background = { color: DARK };
s.addShape(p.ShapeType.ellipse, { x: -1.4, y: 5.0, w: 3.6, h: 3.6, fill: { color: TEAL } });
s.addShape(p.ShapeType.ellipse, { x: 11.7, y: -1.3, w: 3.2, h: 3.2, fill: { color: AMBER } });
s.addText("Snap a deal. Settle it — governed.", { x: 0.8, y: 2.5, w: 11.5, h: 1.0, fontFace: HF, fontSize: 42, bold: true, color: WHITE });
s.addText("Extracted · risk-scored · priced · settled · reconciled — agents and humans, orchestrated by UiPath.", { x: 0.82, y: 3.7, w: 11.0, h: 0.7, fontFace: BF, fontSize: 18, color: "CFE0DB" });
s.addText("github.com/KaJota-inc/kajota-agenthack", { x: 0.82, y: 4.7, w: 11, h: 0.4, fontFace: BF, fontSize: 15, bold: true, color: AMBER });
s.addText("Kajota Settle  ·  UiPath AgentHack 2026  ·  Track 1: Maestro Case  ·  Built with Claude Code", { x: 0.82, y: 6.8, w: 12, h: 0.4, fontFace: BF, fontSize: 12, color: "9FB8B2" });

p.writeFile({ fileName: require("path").join(__dirname, "kajota-settle-deck.pptx") }).then(f => console.log("WROTE", f));
