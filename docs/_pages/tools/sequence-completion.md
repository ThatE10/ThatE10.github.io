---
layout: single
title: ""
permalink: /tools/sequence-completion/
author_profile: true
classes: wide
---

<!-- Manim.js and related includes -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
<script src="{{ site.baseurl }}/assets/manimjs/src/globals.js"></script>
<script src="{{ site.baseurl }}/assets/manimjs/src/proto.js"></script>
<script src="{{ site.baseurl }}/assets/manimjs/src/math.js"></script>
<script src="{{ site.baseurl }}/assets/manimjs/src/timer.js"></script>
<script src="{{ site.baseurl }}/assets/manimjs/src/graphics.js"></script>
<script src="{{ site.baseurl }}/assets/manimjs/src/utils.js"></script>
<script src="{{ site.baseurl }}/assets/manimjs/src/text.js"></script>

<!-- React, Babel, ChartJS -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>

<!-- MathJax for LaTeX in HTML -->
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

<style>
/* Reset and Base */
#sequence-app-root {
  font-family: 'Inter', -apple-system, sans-serif;
  color: #1f2937;
  width: 100%;
  margin: 0;
}

/* Main Layout */
.app-container {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
}

/* Stage Sidebar + Card Container */
.stage-row {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.stage-indicator {
  display: none;
}

/* The Card Structure */
.stage-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 0;
  overflow: hidden;
  box-shadow: none;
}

/* White Interactive/Animation Area */
.canvas-area {
  background-color: #FFFFFF;
  padding: 24px;
  min-height: 380px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.canvas-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.canvas-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.primary-btn {
  background-color: white;
  color: #111827;
  border: 1px solid #d1d5db;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.primary-btn:hover:not(:disabled) {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

.primary-btn:disabled {
  background-color: #f3f4f6;
  color: #9ca3af;
  cursor: not-allowed;
}

.secondary-btn {
  background-color: transparent;
  color: #4b5563;
  border: 1px solid transparent;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.secondary-btn:hover {
  background-color: #f3f4f6;
}

/* Gray Formal/Mathematical Area */
.desc-area {
  background-color: #F3F4F6;
  border-top: 1px solid #e5e7eb;
  padding: 10px;
  height: 120px;
  overflow-y: auto;
  font-size: 0.9rem;
}

/* Scrollbar Styling for Area */
.desc-area::-webkit-scrollbar {
  width: 8px;
}
.desc-area::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.05);
  border-radius: 4px;
}
.desc-area::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.2);
  border-radius: 4px;
}

.latex-content {
  font-family: 'Georgia', serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #2c3e50;
  text-align: center;
}

.p5-canvas-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}

.sequence-input-row {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.seq-box {
  width: 100%;
  max-width: 400px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0 10px;
  font-family: monospace;
  font-size: 1.1rem;
  background: white;
}
.seq-box:focus {
  outline: none;
  border-color: #3498db;
}

.chart-wrapper {
  background: white;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  height: 220px;
  margin-top: 4px;
}
</style>

<div id="sequence-app-root">
    <div style="font-family: sans-serif; padding: 2rem; color: #555;">
        <h3>Loading Application...</h3>
        <p>If this message persists, please check your network connection, disable restrictive ad-blockers, and ensure JavaScript is operating properly.</p>
    </div>
</div>

<script type="text/babel">
{% raw %}
const { useState, useEffect, useRef } = React;

// Advanced Animation nodes
class AnimNode {
    constructor(text, x, y) {
        this.text = text; this.x = x; this.y = y;
        this.tx = x; this.ty = y; this.alpha = 255;
        this.talpha = 255;
        this.scale = 1; this.tscale = 1;
        this.vcolor = [51, 51, 51]; // text color
    }
    move(x, y) { this.tx = x; this.ty = y; }
    fade(a) { this.talpha = a; }
    color(c) { this.vcolor = c; }
    update() {
        this.x += (this.tx - this.x) * 0.12;
        this.y += (this.ty - this.y) * 0.12;
        this.alpha += (this.talpha - this.alpha) * 0.1;
        this.scale += (this.tscale - this.scale) * 0.1;
    }
    show(s) {
        if(this.alpha < 5) return;
        s.push();
        s.translate(this.x, this.y);
        s.scale(this.scale);
        s.fill(this.vcolor[0], this.vcolor[1], this.vcolor[2], this.alpha);
        s.noStroke();
        
        let pieces = this.text.split('\n');
        for (let idx = 0; idx < pieces.length; idx++) {
            let p = pieces[idx];
            let y_off = idx * 20;
            
            if (p === "S̄" || p === "S̄ =" || p === "S̄x =" || p === "S̄x") {
                s.textSize(20);
                s.text("S", -12, y_off);
                s.stroke(this.vcolor[0], this.vcolor[1], this.vcolor[2], this.alpha);
                s.strokeWeight(2);
                s.line(-18, y_off-14, -6, y_off-14); // overline
                s.noStroke();
                let off = 0;
                if(p.includes("x")) {
                    s.textSize(12);
                    s.text("x", 0, y_off+6);
                    off += 12;
                }
                if(p.includes("=")) {
                    s.textSize(20);
                    s.text("=", 12 + off, y_off);
                }
            } else if (p.startsWith("min_H")) {
                let off_y = 6;
                s.textSize(18);
                s.text("min", -40, y_off - 8 - off_y);
                s.textSize(12);
                s.text("H", -40, y_off + 8 - off_y);
                
                s.textSize(18);
                s.text("||H||", 0, y_off - off_y);
                s.textSize(12);
                s.text("2", 18, y_off - 10 - off_y);
                s.text("W", 18, y_off + 8 - off_y);

                s.textSize(18);
                s.text("subject to H|_Ω =", -18, y_off + 25 - off_y);
                s.text("S", 72, y_off + 25 - off_y);
                s.stroke(this.vcolor[0], this.vcolor[1], this.vcolor[2], this.alpha);
                s.strokeWeight(1.5);
                s.line(66, y_off+11 - off_y, 78, y_off+11 - off_y);
                s.noStroke();
            } else if (p === "W_update") {
                s.textSize(14);
                s.text("W", -40, y_off);
                s.textSize(10);
                s.text("ij", -30, y_off+6);
                s.textSize(14);
                s.text("= (H", -10, y_off);
                s.textSize(10);
                s.text("ij", 5, y_off+6);
                s.textSize(10);
                s.text("2", 5, y_off-6);
                s.textSize(14);
                s.text("+ ε)", 20, y_off);
                s.textSize(10);
                s.text("-1/2", 35, y_off-6);
            } else if (p.startsWith("H_x") || p.startsWith("H =")) {
                s.textSize(20);
                s.text("H", -10, y_off);
                if (p.includes("x")) {
                    s.textSize(12);
                    s.text("x", 2, y_off+6);
                }
                if (p.includes("=")) {
                    s.textSize(20);
                    s.text("=", 16, y_off);
                }
            } else if (p.match(/^x\d+$/)) {
                s.textSize(16);
                s.text("x", -5, y_off);
                s.textSize(11);
                s.text(p.substring(1), 5, y_off+6);
            } else {
                s.textSize(18);
                if (idx > 0 && pieces.length > 1) s.textSize(13); // smaller sub text 
                if (p !== "") s.text(p, 0, y_off);
            }
        }
        s.pop();
    }
}

class BigBracket {
    constructor(x, y, h, isLeft) {
        this.x = x; this.y = y; this.tx = x; this.ty = y; 
        this.h = h; this.isLeft = isLeft;
        this.alpha = 255; this.talpha = 255;
    }
    move(x,y) { this.tx = x; this.ty = y; }
    fade(a) { this.talpha = a; }
    update() {
        this.x += (this.tx - this.x) * 0.12;
        this.y += (this.ty - this.y) * 0.12;
        this.alpha += (this.talpha - this.alpha) * 0.1;
    }
    show(s) {
        if(this.alpha < 5) return;
        s.push();
        s.stroke(51, this.alpha);
        s.strokeWeight(2);
        s.noFill();
        const d = this.isLeft ? 1 : -1;
        const bw = 6;
        s.beginShape();
        s.vertex(this.x + d*bw, this.y - this.h/2);
        s.vertex(this.x, this.y - this.h/2);
        s.vertex(this.x, this.y + this.h/2);
        s.vertex(this.x + d*bw, this.y + this.h/2);
        s.endShape();
        s.pop();
    }
}

class Orchestrator {
    constructor() {
        this.nodes = []; this.labels = []; this.hx = []; this.omega = []; this.wmat = [];
        this.brackets = [];
        this.currentStage = 0;
    }
    initStage1(seq, w) {
        if (w) this.w = w;
        this.currentStage = 1;
        const seqWidth = seq.length * 40;
        this.globalScale = Math.min(1.0, this.w / (seqWidth + 250));
        let cx = (this.w / this.globalScale) / 2;
        let startX = cx - seqWidth / 2 + 20;

        this.nodes = seq.map((val, i) => new AnimNode(isNaN(val) ? "?" : val.toString(), startX + i*40, 50));
        this.labels.push(new AnimNode("S̄ =", startX - 50, 50));
        this.brackets.push(new BigBracket(startX - 20, 50, 30, true));
        this.brackets.push(new BigBracket(startX + (seq.length-1)*40 + 20, 50, 30, false));
    }
    stage2(seq) {
        this.currentStage = 2;
        const seqWidth = seq.length * 40;
        let cx = (this.w / this.globalScale) / 2;
        let startX = cx - seqWidth / 2 + 20;
        
        this.labels.push(new AnimNode("S̄x =", startX - 55, 120));
        this.brackets.push(new BigBracket(startX - 20, 120, 30, true));
        this.brackets.push(new BigBracket(startX + (seq.length-1)*40 + 20, 120, 30, false));
        let xvar = 0;
        this.missingNodes = []; // track {node, varId} for reliable updates
        this.nodes.forEach((n, i) => {
            n.fade(80); 
            let isMissing = isNaN(seq[i]);
            let nn = new AnimNode(isMissing ? `x${xvar}` : seq[i].toString(), n.x, n.y);
            nn.move(n.x, 120);
            if(isMissing) {
                nn.color([220, 80, 80]);
                nn.varId = xvar; // persistent ID on the node itself
                this.missingNodes.push({ node: nn, varId: xvar });
                xvar++;
            }
            this.nodes.push(nn);
        });
    }
    stage3(seq) {
        this.currentStage = 3;
        const n = seq.length; 
        this.r = Math.floor((n + 1) / 2); 
        this.c = n - this.r + 1;
        const r = this.r; const c = this.c;
        
        let cx = (this.w / this.globalScale) / 2;
        let h_width = (c - 1) * 45;
        let h_height = (r - 1) * 35;
        let hx_start_x = cx - h_width / 2 + 20; 
        let hx_start_y = 210; 
        
        let requiredW = h_width + 250;
        let newScale = Math.min(this.globalScale, this.w / requiredW);
        this.globalScale = newScale;
        cx = (this.w / this.globalScale) / 2;
        hx_start_x = cx - h_width / 2 + 20; 

        let bracketCenterY = hx_start_y + h_height/2;
        let bracketHeight = Math.max(40, r * 35);

        this.labels.push(new AnimNode("H =", hx_start_x - 55, bracketCenterY));
        
        let startX = cx - (seq.length * 40)/2 + 20;

        for(let i=0; i<r; i++){
          for(let j=0; j<c; j++){
            let sid = i + j;
            let srcNode = this.nodes.find(no => no.ty === 120 && no.tx === startX + sid*40);
            if(srcNode) {
                let hn = new AnimNode(srcNode.text, srcNode.x, srcNode.y);
                hn.move(hx_start_x + j*45, hx_start_y + i*35);
                if(srcNode.varId !== undefined) {
                    hn.varId = srcNode.varId; // tag with varId for reliable updates
                    hn.color([220, 80, 80]);
                }
                this.hx.push(hn);
            }
          }
        }
        
        this.brackets.push(new BigBracket(hx_start_x - 22, bracketCenterY, bracketHeight, true));
        this.brackets.push(new BigBracket(hx_start_x + (c-1)*45 + 22, bracketCenterY, bracketHeight, false));
    }
    stage4() {
        this.currentStage = 4;
        const r = this.r; const c = this.c;
        const h_width = (c - 1) * 45;
        const w_width = (c - 1) * 45;
        const h_height = (r - 1) * 35;
        const blockWidth = w_width + 160 + h_width;
        
        // Rescale if needed to accommodate W + H side by side
        let requiredW = blockWidth + 240;
        let newScale = Math.min(this.globalScale, this.w / requiredW);
        this.globalScale = newScale;
        
        // Save H brackets before we push W brackets
        const bracketHeight = Math.max(40, r * 35);
        const hBracketsR = this.brackets.filter(b => b.h === bracketHeight && !b.isLeft);
        const hBracketsL = this.brackets.filter(b => b.h === bracketHeight && b.isLeft);
        
        const cx = (this.w / this.globalScale) / 2;
        const w_start_x = cx - blockWidth/2 + 20;
        const w_start_y = 270;
        const bracketCenterY = w_start_y + h_height / 2;
        const hx_start_x = w_start_x + w_width + 160;

        // === Objective appears in upper center, fading in ===
        let msg = new AnimNode("min_H", cx + 20, 200);
        msg.scale = 2.0;
        msg.alpha = 0; msg.talpha = 255;
        this.labels.push(msg);

        // === W matrix appears (fades in from its target position) ===
        let wEqLbl = new AnimNode("W =", w_start_x - 55, bracketCenterY);
        wEqLbl.alpha = 0; wEqLbl.talpha = 255;
        this.labels.push(wEqLbl);
        for(let i = 0; i < r; i++) {
            for(let j = 0; j < c; j++) {
                let val = (i === j) ? "1" : "0";
                let wn = new AnimNode(val, w_start_x + j*45, w_start_y + i*35);
                wn.alpha = 0; wn.talpha = 255;
                wn.color([80, 80, 220]);
                this.wmat.push(wn);
            }
        }
        const wBL = new BigBracket(w_start_x - 22, bracketCenterY, bracketHeight, true);
        const wBR = new BigBracket(w_start_x + w_width + 22, bracketCenterY, bracketHeight, false);
        wBL.fade(0); wBL.talpha = 255;
        wBR.fade(0); wBR.talpha = 255;
        this.brackets.push(wBL);
        this.brackets.push(wBR);
        
        let wformLbl = new AnimNode("W_update", w_start_x + w_width/2, w_start_y + h_height + 45);
        wformLbl.alpha = 0; wformLbl.talpha = 255;
        this.labels.push(wformLbl);

        // === H slides from its current spot to the right final position ===
        let col = 0; let row = 0;
        this.hx.forEach((hn) => {
            hn.move(hx_start_x + col*45, w_start_y + row*35);
            col++; if(col >= c) { col = 0; row++; }
        });
        this.labels.find(l => l.text === "H =").move(hx_start_x - 55, bracketCenterY);
        hBracketsR.forEach(b => b.move(hx_start_x + (c-1)*45 + 22, bracketCenterY));
        hBracketsL.forEach(b => b.move(hx_start_x - 22, bracketCenterY));
    }
    stage6Update(x_arr, w_grid) {
       this.currentStage = 6;
       // Use the persistent missingNodes map built in stage2 — IDs never get lost
       if (this.missingNodes && x_arr) {
           this.missingNodes.forEach(({ node, varId }) => {
               if (x_arr[varId] !== undefined) {
                   let val = Number(x_arr[varId]).toFixed(2);
                   node.text = val;
                   node.color([60, 160, 60]); // turn green as values populate
               }
           });
       }
       // Update hx nodes using their stored varId tag
       if (x_arr) {
           this.hx.forEach(hn => {
               if (hn.varId !== undefined && x_arr[hn.varId] !== undefined) {
                   hn.text = Number(x_arr[hn.varId]).toFixed(2);
                   hn.color([60, 160, 60]);
               }
           });
       }
       if (w_grid && w_grid.length >= this.r) {
           let idx = 0;
           for(let i=0; i<this.r; i++) {
               let row_data = w_grid[i];
               if(!row_data) continue;
               for(let j=0; j<this.c; j++) {
                   if (this.wmat[idx] && row_data[j] !== undefined) {
                       this.wmat[idx].text = Number(row_data[j]).toFixed(2);
                   }
                   idx++;
               }
           }
       } else if (w_grid && w_grid.length > 0) {
           this.wmat.forEach((w, i) => {
               try {
                  let flat = w_grid.flat();
                  if(flat[i] !== undefined) w.text = Number(flat[i]).toFixed(2);
               } catch(e) {}
           });
       }
    }
    stage7() {
        this.currentStage = 7;
        let cx = (this.w / this.globalScale) / 2;
        this.hx.forEach(n => n.fade(0));
        this.wmat.forEach(n => n.fade(0));
        this.labels.forEach(n => n.fade(0));
        this.brackets.forEach(n => n.fade(0));
        
        // nodes = [original S̄ row (first half), S_x row (second half)]
        let half = this.nodes.length / 2;
        let sBarNodes = this.nodes.slice(0, half);  // original S̄ — fade out
        let sxNodes = this.nodes.slice(half);         // S_x with recovered values — show
        
        sBarNodes.forEach(n => n.fade(0));
        
        let seqWidth = sxNodes.length * 60;
        let startX = cx - seqWidth / 2 + 30;
        
        // Spawn \bar{S_x} = label fading in
        let fn = new AnimNode("S̄x =", startX - 75, 220);
        fn.scale = 1.6;
        fn.alpha = 0; fn.fade(255);
        this.labels.push(fn);
        
        sxNodes.forEach((n, i) => {
            n.tscale = 1.6;
            n.move(startX + i*60, 220);
            n.fade(255);
        });
    }
    reset() {
        this.currentStage = 0;
        this.nodes = []; this.labels = []; this.hx = []; this.omega = []; this.wmat = [];
        this.brackets = [];
        this.missingNodes = [];
    }
    update() {
        if(this.currentStage > 0) {
            [...this.nodes, ...this.labels, ...this.hx, ...this.omega, ...this.wmat, ...this.brackets].forEach(n => n.update());
        }
    }
    show(s) {
        s.push();
        s.scale(this.globalScale || 1);
        s.textAlign(s.CENTER, s.CENTER);
        s.textSize(18);
        if(this.currentStage === 0) {
            s.fill(51); s.noStroke();
            s.text("Enter an incomplete recursive sequence", (this.w / this.globalScale) / 2, 100);
        } else if(this.currentStage === -1) {
            // Error state
            let cx = (this.w / this.globalScale) / 2;
            s.noStroke();
            // Red icon circle
            s.fill(220, 60, 60, 40);
            s.ellipse(cx, 130, 64, 64);
            s.fill(220, 60, 60);
            s.textSize(28); s.text("✕", cx, 130);
            // Error title
            s.textSize(17); s.fill(180, 30, 30);
            s.text(this.errorTitle || "Connection Error", cx, 175);
            // Error detail
            s.textSize(13); s.fill(100, 40, 40);
            s.text(this.errorDetail || "Could not reach the IRLS server at " + this.errorUrl, cx, 200);
            s.fill(130, 100, 100); s.textSize(12);
            s.text("Make sure the API server is running, then press Retry.", cx, 222);
        } else {
            [...this.nodes, ...this.labels, ...this.hx, ...this.omega, ...this.wmat, ...this.brackets].forEach(n => n.show(s));
        }
        s.pop();
    }
    stageError(title, detail, url) {
        this.currentStage = -1;
        this.errorTitle = title;
        this.errorDetail = detail;
        this.errorUrl = url || '';
    }

const SequenceCompletionUI = () => {
  const [stage, setStage] = useState(0); 
  const [sequence, setSequence] = useState([1, 1, 2, NaN, NaN, 8, 13]);
  const [inputText, setInputText] = useState("1, 1, 2, ?, ?, 8, 13");
  const [showDescription, setShowDescription] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [targetRank, setTargetRank] = useState(2);
  const [maxIters, setMaxIters] = useState(200);
  const [predictions, setPredictions] = useState({});
  const [sigmaHistory, setSigmaHistory] = useState([]);
  const [wMatrix, setWMatrix] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const p5ContainerRef = useRef(null);
  const p5Instance = useRef(null);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const orchestratorRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Cancel any in-flight request on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  const API_URL = 'http://127.0.0.1:8080/predict/stream';

  // MathJax Typesetting trigger
  useEffect(() => {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise().catch((err) => console.error(err));
    }
  }, [stage, sequence, showDescription]);

  // p5 effect hook that runs ONLY ONCE
  useEffect(() => {
    if (!p5ContainerRef.current) return;
    if (p5Instance.current) return;
    
    // Assign orchestrator
    orchestratorRef.current = new Orchestrator();

    const sketch = (s) => {
      s.setup = () => {
        let cw = p5ContainerRef.current ? p5ContainerRef.current.clientWidth : 800;
        const canvas = s.createCanvas(cw, 400);
        canvas.parent(p5ContainerRef.current);
        s.frameRate(30);
        s.textFont('serif');
      };

      s.windowResized = () => {
        if(p5ContainerRef.current) {
           s.resizeCanvas(p5ContainerRef.current.clientWidth, 400);
        }
      };

      s.draw = () => {
        s.background(255);
        if(orchestratorRef.current) {
           orchestratorRef.current.update();
           orchestratorRef.current.show(s);
        }
      };
    };

    p5Instance.current = new p5(sketch, p5ContainerRef.current);

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
        p5Instance.current = null;
      }
    };
  }, []); 
  
  // Chart Integration
  useEffect(() => {
    if (stage < 2 || !chartRef.current || sigmaHistory.length === 0) return;
    
    // Destroy existing chart on every update to prevent React/Chart.js animation collision
    if (chartInstanceRef.current && typeof chartInstanceRef.current.destroy === 'function') {
        chartInstanceRef.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    
    // Create datasets for each iter: index vs singular value
    const length = sigmaHistory.length;
    let initialSigmas = [0,0,0];
    if (length > 0) initialSigmas = sigmaHistory[0].sigma || [0,0,0];
    const labels = initialSigmas.map((_, i) => (i + 1).toString());

    const datasets = sigmaHistory.map((h, i) => {
        const sigmas = h.sigma || [0, 0, 0];
        const isLatest = i === length - 1;
        // Fade out older lines; the latest has alpha 1.0, oldest has alpha 0.1
        const alpha = Math.max(0.1, (i + 1) / length);
        return {
          label: isLatest ? `Latest (Iteration ${h.iteration})` : `Iter ${h.iteration}`,
          data: sigmas,
          borderColor: `rgba(76, 81, 191, ${alpha})`,
          backgroundColor: `rgba(76, 81, 191, ${alpha})`,
          borderWidth: isLatest ? 3 : 1,
          tension: 0.1,
          pointRadius: isLatest ? 4 : 0,
        };
    });

    chartInstanceRef.current = new window.Chart(ctx, {
      type: 'line',
      data: { 
        labels: labels,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false, // Critical: Disable internal Chart.js animations to prevent React lifecycle race conditions
        plugins: {
          legend: {
            labels: {
              filter: function(item) {
                return item.text.includes('Latest');
              }
            }
          }
        },
        scales: {
          x: { title: { display: true, text: 'Index (i)' } },
          y: { type: 'linear', title: { display: true, text: 'Singular Value (σ_i)' } }
        }
      }
    });

  }, [sigmaHistory, stage]);
  
  const handleReset = () => {
    // Abort any in-flight request immediately
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setStage(0);
    setIsProcessing(false);
    setErrorMessage(null);
    setSigmaHistory([]);
    setWMatrix(null);
    setPredictions({});
    if(orchestratorRef.current) {
        let cw = p5ContainerRef.current ? p5ContainerRef.current.clientWidth : 800;
        orchestratorRef.current.reset(cw);
    }
    if (chartInstanceRef.current && typeof chartInstanceRef.current.destroy === 'function') {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
    }
  };

  const showError = (title, detail) => {
    setErrorMessage({ title, detail });
    setIsProcessing(false);
    if (orchestratorRef.current) orchestratorRef.current.stageError(title, detail, API_URL);
  };

  const runOptimization = async () => {
      // Cancel any previous in-flight request
      if (abortControllerRef.current) abortControllerRef.current.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setStage(6);
      setIsProcessing(true);
      const payload = {
        sequence: sequence.map(val => isNaN(val) ? null : val),
        settings: { tolerance: 1e-8, rank: parseInt(targetRank), max_iters: parseInt(maxIters), mean_type: 'harmonic' } 
      };

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal
        });

        if (!response.ok) {
          showError('Server Error', `Server responded with status ${response.status}: ${response.statusText}`);
          return;
        }
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let receivedAny = false;

        while (true) {
          if (controller.signal.aborted) break;
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          
          for (const line of lines) {
            if (controller.signal.aborted) break;
            if (line.startsWith('data: ')) {
              let parsed;
              try {
                parsed = JSON.parse(line.substring(6));
              } catch (e) {
                showError('Malformed Response', `Could not parse server packet: ${line.substring(6, 60)}...`);
                return;
              }
              receivedAny = true;
              if (parsed.type === 'prediction_update') {
                const data = parsed.data;
                if (!Array.isArray(data.sigma) || !Array.isArray(data.elements_updated)) {
                  showError('Malformed Response', 'Server packet missing expected fields (sigma / elements_updated).');
                  return;
                }
                setSigmaHistory(prev => [...prev, { iteration: data.iteration, sigma: data.sigma }]);
                if (data.w_matrix) setWMatrix(data.w_matrix);
                if(orchestratorRef.current) orchestratorRef.current.stage6Update(data.elements_updated, data.w_matrix);
                await new Promise(r => setTimeout(r, 600));
              } else if (parsed.type === 'completion') {
                  setStage(7);
                  if(orchestratorRef.current) orchestratorRef.current.stage7();
              }
            }
          }
        }
        if (!receivedAny && !controller.signal.aborted) {
          showError('Empty Response', 'Server connected but returned no data. Check sequence / rank settings.');
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted.');
        } else if (err.name === 'TypeError' || err.message.includes('fetch')) {
          showError('Cannot Connect to Server', `Failed to reach ${API_URL} — is the API running?`);
        } else {
          showError('Unexpected Error', err.message || 'An unknown error occurred.');
        }
      } finally {
        setIsProcessing(false);
      }
  };

  const handleNextStage = async () => {
     if (stage === 1) {
         setStage(2);
         if(orchestratorRef.current) orchestratorRef.current.stage2(sequence);
     } else if (stage === 2) {
         setStage(3);
         if(orchestratorRef.current) orchestratorRef.current.stage3(sequence);
     } else if (stage === 3) {
         setStage(4);
         if(orchestratorRef.current) orchestratorRef.current.stage4();
     } else if (stage === 4) {
         runOptimization();
     }
  };

  const processSequence = () => {
     let seqStr = inputText.replace(/[\[\]]/g, '').split(',').map(x => x.trim().toLowerCase());
     let seq = seqStr.map(v => {
         if (v === '?' || v === 'nan' || v === '') return NaN;
         return parseFloat(v);
     });
     setSequence(seq);
     setStage(1);
     setPredictions({});
     setSigmaHistory([]);
     setWMatrix(null);
     
     if (orchestratorRef.current) {
         let cw = p5ContainerRef.current ? p5ContainerRef.current.clientWidth : 800;
         orchestratorRef.current.reset(cw);
         orchestratorRef.current.initStage1(seq, cw);
     }
  };

  let stageLabel = "Setup";
  if (stage === 1) stageLabel = "Vector Parsing";
  if (stage === 2) stageLabel = "S_x Variables";
  if (stage === 3) stageLabel = "Hankel Generation";
  if (stage === 4) stageLabel = "Objective & W Initialization";
  if (stage === 5) stageLabel = "API Processing & Reweighting";
  if (stage === 6) stageLabel = "API Processing & Reweighting";
  if (stage === 7) stageLabel = "Optimization Completed!";

  return (
    <div className="app-container">
       <div className="stage-row">
          <div className="stage-indicator">
             Stage {stage}:<br/>
             {stageLabel}
          </div>
          
          <div className="stage-card">

              {/* Math Tooltip Area - top */}
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', background:'#f3f4f6', borderBottom:'1px solid #e5e7eb', padding:'8px 14px'}}>
                 <h1 style={{margin:0, fontSize:'1.1rem', fontWeight:600, color:'#374151', fontFamily:'Inter, sans-serif'}}>Sequence IRLS Completion</h1>
                 <button onClick={() => setShowDescription(!showDescription)} style={{background:'none', border:'none', color:'#9ca3af', cursor:'pointer', fontSize:'0.75rem', padding:'2px 6px'}}>{showDescription ? 'hide tooltip ✕' : 'show tooltip'}</button>
              </div>
              {showDescription && (
              <div className="desc-area" style={{position:'relative'}}>
                {stage === 0 && (
                   <div className="latex-content" style={{fontSize: '0.85rem'}}>
                      <p>Enter a partially observed sequence. We find a sequence admitting a low-order linear recurrence by solving:</p>
                      <p dangerouslySetInnerHTML={{__html: "$$ \\min_{\\bar{x} \\in \\mathbb{R}^n} \\operatorname{rank}(\\mathcal{H}(\\bar{x})) \\quad \\text{subject to} \\quad \\mathcal{H}(\\bar{x})|_\\Omega = \\bar{y} $$"}} />
                   </div>
                )}
                {stage === 1 && (
                   <div className="latex-content" style={{fontSize: '0.85rem'}}>
                      <p>IRLS maps the sequence into a Hankel Matrix <span dangerouslySetInnerHTML={{__html: "\\( \\mathcal{H}(\\bar{x}) \\)"}} /> with constant anti-diagonals.</p>
                      <p dangerouslySetInnerHTML={{__html: "$$ \\mathcal{H}(\\bar{x}) = \\begin{bmatrix} x_1 & x_2 & \\cdots \\\\ x_2 & x_3 & \\\\ \\vdots & & \\ddots \\end{bmatrix} $$"}} />
                   </div>
                )}
                {stage >= 2 && (
                   <div className="latex-content" style={{fontSize: '0.85rem'}}>
                      <p>At iteration <span dangerouslySetInnerHTML={{__html: "\\( k \\)"}} />, solve using weight matrix <span dangerouslySetInnerHTML={{__html: "\\( \\mathbf{W} \\)"}} /> from singular values <span dangerouslySetInnerHTML={{__html: "\\( \\sigma_i \\)"}} />:</p>
                      <p dangerouslySetInnerHTML={{__html: "$$ \\min_{\\bar{x}} \\; \\bar{x}^\\top \\mathbf{W}^{-1} \\bar{x} $$"}} />
                   </div>
                )}
             </div>
             )}

             {/* Main Canvas Section */}
             <div className="canvas-area">

                {/* Controls: centered below input at stage 0, top-right during animation */}
                {stage === 0 ? (
                  <div style={{position:'absolute', top:'240px', left:'50%', transform:'translateX(-50%)', zIndex:11, display:'flex', flexDirection:'column', alignItems:'center', gap:'8px'}}>
                     <div style={{display:'flex', gap:'8px', alignItems:'center'}}>
                        <button className="primary-btn" onClick={processSequence}>Run Algorithm</button>
                        <button onClick={() => setShowSettings(!showSettings)} style={{background:'none', border:'1px solid #d1d5db', borderRadius:'6px', padding:'6px 8px', cursor:'pointer', fontSize:'1rem', lineHeight:1, color:'#6b7280'}} title="Settings">⚙</button>
                        {showSettings && (
                            <div style={{display:'flex', gap:'8px', alignItems:'center', background:'#f9fafb', padding:'4px 10px', borderRadius:'6px', border:'1px solid #e5e7eb', fontSize:'0.8rem'}}>
                                <label style={{display:'flex', gap:'4px', color:'#4b5563', alignItems:'center', margin:0}}>
                                    R:
                                    <input type="number" style={{width:'36px', padding:'2px 4px', border:'1px solid #ccc', borderRadius:'4px', fontSize:'0.8rem'}} value={targetRank} onChange={e => setTargetRank(e.target.value)} min="1"/>
                                </label>
                                <label style={{display:'flex', gap:'4px', color:'#4b5563', alignItems:'center', margin:0}}>
                                    Iters:
                                    <input type="number" style={{width:'44px', padding:'2px 4px', border:'1px solid #ccc', borderRadius:'4px', fontSize:'0.8rem'}} value={maxIters} onChange={e => setMaxIters(e.target.value)} min="10" step="10"/>
                                </label>
                            </div>
                        )}
                     </div>
                     <div style={{display:'flex', gap:'6px', fontSize:'0.75rem'}}>
                        <button onClick={() => { setInputText("2, 1, ?, 4, ?, 11, ?, ?"); setTargetRank(2); }} style={{background:'none', border:'1px solid #d1d5db', borderRadius:'4px', padding:'3px 8px', cursor:'pointer', color:'#6b7280', fontSize:'0.75rem'}}>Lucas</button>
                        <button onClick={() => { setInputText("0, 1, 2, ?, 12, ?, 70, ?"); setTargetRank(2); }} style={{background:'none', border:'1px solid #d1d5db', borderRadius:'4px', padding:'3px 8px', cursor:'pointer', color:'#6b7280', fontSize:'0.75rem'}}>Pell</button>
                        <button onClick={() => { setInputText("0, 1, ?, 2, ?, 7, 13, ?, ?, 81"); setTargetRank(3); }} style={{background:'none', border:'1px solid #d1d5db', borderRadius:'4px', padding:'3px 8px', cursor:'pointer', color:'#6b7280', fontSize:'0.75rem'}}>Tribonacci</button>
                     </div>
                  </div>
                ) : (
                  <div style={{position:'absolute', top:'8px', right:'12px', zIndex:11, display:'flex', gap:'6px', alignItems:'center'}}>
                      {errorMessage ? (
                        <>
                          <button className="primary-btn" style={{padding:'5px 12px', fontSize:'0.85rem', background:'#dc3545', borderColor:'#dc3545'}} onClick={() => { setErrorMessage(null); runOptimization(); }}>Retry</button>
                          <button className="secondary-btn" style={{padding:'5px 10px', fontSize:'0.85rem'}} onClick={handleReset}>Reset</button>
                        </>
                      ) : (
                        <>
                          {stage > 0 && stage < 6 && (
                              <button className="primary-btn" style={{padding:'5px 12px', fontSize:'0.85rem'}} onClick={handleNextStage}>Next</button>
                          )}
                          <button className="secondary-btn" style={{padding:'5px 10px', fontSize:'0.85rem'}} onClick={handleReset}>Reset</button>
                        </>
                      )}
                  </div>
                )}
                
                {stage === 0 && (
                   <div style={{position: 'absolute', top: '160px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, width: '100%', display: 'flex', justifyContent: 'center'}}>
                      <div className="sequence-input-row" style={{justifyContent: 'center', margin: '0', background: 'rgba(255,255,255,0.8)', padding: '10px 20px', borderRadius: '8px', flexWrap: 'nowrap'}}>
                         <span style={{fontFamily: 'serif', fontSize: '1.2rem', fontWeight: 'bold', paddingRight: '8px', whiteSpace: 'nowrap'}} dangerouslySetInnerHTML={{__html: "$$ \\bar{S} = [$$"}} />
                         <input 
                            type="text" 
                            className="seq-box" 
                            style={{maxWidth: '300px'}}
                            value={inputText} 
                            onChange={(e) => setInputText(e.target.value)} 
                            placeholder="1, 1, 2, ?, ?, 8, 13"
                         />
                         <span style={{fontFamily: 'serif', fontSize: '1.2rem', fontWeight: 'bold', paddingLeft: '8px', whiteSpace: 'nowrap'}} dangerouslySetInnerHTML={{__html: "$$ ] $$"}} />
                      </div>
                   </div>
                )}

                <div className="p5-canvas-container" ref={p5ContainerRef}></div>
                
                {stage >= 2 && (
                   <div className="chart-wrapper">
                      <canvas ref={chartRef}></canvas>
                   </div>
                )}
             </div>
          </div>
       </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('sequence-app-root'));
root.render(<SequenceCompletionUI />);
{% endraw %}
</script>