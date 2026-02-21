---
layout: single
title: "Sequence Completion via Harmonic-Mean IRLS"
permalink: /tools/sequence-irls-writeup/
author_profile: false
classes: wide
---

## Algorithm HM-IRLS for Low-Rank Hankel Sequence Completion

**Require**: Partially observed sequence $$\bar{d} \in \mathbb{R}^n \cup \{\mathrm{NaN}\}^n$$, rank estimate $$r$$, tolerance $$\varepsilon$$, maximum iterations $$K_{\max}$$

**Ensure**: Completed sequence $$\bar{x} \in \mathbb{R}^n$$

1. Define $$\Omega = \{i : d_i \neq \mathrm{NaN}\}$$ and sampling matrix $$\mathbf{P}_\Omega \in \mathbb{R}^{|\Omega| \times n}$$
2. Initialize $$\bar{x}^{(0)}$$ by replacing missing entries with zero
3. Compute SVD $$\mathcal{H}(\bar{x}^{(0)}) = \mathbf{U}^{(0)} \mathbf{\Sigma}^{(0)} (\mathbf{V}^{(0)})^\top$$
4. Set $$\epsilon^{(0)} = \sigma_1^{(0)}$$, $$\mathbf{W}^{(0)} = \epsilon^{(0)} \mathbf{I}_n$$
5. **For** $$k = 1$$ to $$K_{\max}$$ **do**:
   1. Update
      $$
      \bar{x}^{(k)} = \mathbf{W}^{(k-1)^{-1}} \mathbf{P}_\Omega^\top \left( \mathbf{P}_\Omega \mathbf{W}^{(k-1)^{-1}} \mathbf{P}_\Omega^\top \right)^{-1} \bar{y}
      $$
   2. Compute SVD $$\mathcal{H}(\bar{x}^{(k)}) = \mathbf{U}^{(k)} \mathbf{\Sigma}^{(k)} (\mathbf{V}^{(k)})^\top$$
   3. Update smoothing parameter
      $$
      \epsilon^{(k)} = \min\!\left(\epsilon^{(k-1)}, \sigma_{r+1}^{(k)}\right)
      $$
   4. Construct weight matrix $$\mathbf{W}^{(k)}$$ from harmonic singular-value weights
   5. Compute relative change 
      $$
      \delta^{(k)} = \frac{\|\bar{x}^{(k)} - \bar{x}^{(k-1)}\|_2}{\|\bar{x}^{(k-1)}\|_2}
      $$
   6. **If** $$\delta^{(k)} < \varepsilon$$ **then**
      1. **break**
6. **Return** $$\bar{x}^{(k)}$$

---

This algorithm completes a partially observed sequence by enforcing that its associated Hankel matrix has the lowest possible rank. Given a sequence $$\bar{x} \in \mathbb{R}^n$$, the Hankel lifting operator

$$
\mathcal{H} : \mathbb{R}^n \to \mathbb{R}^{d_1 \times d_2}
$$

produces a structured matrix with constant anti-diagonals. A fundamental result in linear systems theory states that a sequence admits a linear recurrence relation of order $$K$$,

$$
a_n = \sum_{k=1}^{K} r_k a_{n-k},
$$

if and only if its Hankel matrix has rank $$K$$. Thus, recovering a low-rank Hankel matrix corresponds exactly to recovering a linear recursive sequence.

The completion problem is therefore formulated as the structured rank minimization problem

$$
\min_{\bar{x} \in \mathbb{R}^n} \operatorname{rank}(\mathcal{H}(\bar{x})) \quad \text{s.t.} \quad \mathbf{P}_\Omega \bar{x} = \bar{y},
$$

where $$\mathbf{P}_\Omega$$ extracts the observed entries.

Since rank minimization is nonconvex and combinatorial, the algorithm applies an Iteratively Reweighted Least Squares (IRLS) scheme. At each iteration, a quadratic surrogate objective

$$
\min_{\bar{x}} \; \bar{x}^\top \mathbf{W}^{-1} \bar{x} \quad \text{s.t.} \quad \mathbf{P}_\Omega \bar{x} = \bar{y}
$$

is solved, where the weight matrix $$\mathbf{W}$$ is constructed from harmonic means of the singular values of the current Hankel matrix estimate. The smoothing parameter $$\epsilon^{(k)}$$ prevents instability and progressively decreases to promote low-rank structure.

Through successive reweighting, the method increasingly penalizes smaller singular values, driving the Hankel matrix toward minimal rank while preserving agreement with observed data. Convergence is declared once the relative change in the sequence estimate falls below the prescribed tolerance.
