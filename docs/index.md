---
layout: home-custom
title: "ethan nguyen!"
permalink: /
author_profile: true
classes: wide
header:
  overlay_image: /assets/images/unsplash-image-1.jpg
  overlay_filter: rgba(255, 0, 0, 0.5)
  caption: "Photo of Wolf Pit @ Linville Gorge"
  caption_sub: "iPhone 14 Pro Max 77mm f2.8, 25/10/2025 @ 35° 48' 47.27\" N, 81° 54' 15.80\" W"
  actions:
    - label: "CV"
      url: "https://docs.google.com/document/d/1Yg-dObFKN_EfkT3dJJqFO5eTYOaExlIg_x6iFjj0Zwg/edit"
    - label: "Project Highlights"
      url: "#projects"
    - label: "Github"
      url: "https://github.com/ThatE10"
    - label: "Blog"
      url: "/blog"
    - label: "Meet with me"
      url: "/calendar"
hero_text: |
  I build safe AI, by understanding the shape of intelligence and the stability of representations.
---

# Projects

#### [[NeurIPS 2025] Quadratic Reweighted Rank Regularizer for Effective Low-Rank Training](https://arxiv.org/pdf/2511.04485)
Official implementation of a novel rank regularization technique that improves low-rank matrix training through quadratic reweighting. The method is structured around constrained optimization objectives, achieving efficient convergence on large-scale problems. Deployed and maintained on GitHub. <a href="https://github.com/ThatE10/q3r" class="github-widget-light" target="_blank"><i class="fab fa-github"></i> Code</a>

#### [AISB Project: Extracting Model Weights via Taylor Unswift Inversion](https://github.com/ThatE10/Extracting-Model-Weights)
This repository provides the official implementation of an attack that inverts the Taylor Unswift weight obfuscation method, successfully reconstructing the original W_{d_2} matrix in Transformer MLPs with near-perfect accuracy using linear inversion via the Moore–Penrose pseudoinverse. Demonstrates vulnerabilities in contemporary weight protection schemes. <a href="https://github.com/ThatE10/Extracting-Model-Weights" class="github-widget-light" target="_blank"><i class="fab fa-github"></i> Code</a>

#### [Judge Using Safety-Steered Alternatives (JUSSA): Aiding LLM-Judges with Honest Alternatives Using Steering Vectors](https://arxiv.org/pdf/2505.17760)
A novel framework that employs steering vectors to enhance LLM judges' evaluation capabilities by generating more honest alternatives for contrastive evaluation. Rather than improving model behavior directly, JUSSA applies steering vectors during inference to create targeted comparisons that reveal subtle dishonest patterns such as sycophancy and manipulation. The method leverages model internals to identify where dishonest representations diverge from honest ones, enabling layer-wise interventions. Originally submitted to EMNLP and developed as an AI PLans hackathon project. <a href="https://github.com/watermeleon/judge_with_steered_response" class="github-widget-light" target="_blank"><i class="fab fa-github"></i> Code</a>

#### [[Demo]Low Rank Linear Sequence Completion](/tools/sequence-completion/)
Completes any linear recurrence sequences. The incomplete linear sequence is structured into a low rank [Hankel matrix](https://en.wikipedia.org/wiki/Hankel_matrix), and completed using the constrained majorization of the [logdet](https://www.researchgate.net/figure/The-log-det-function-and-a-convergence-of-the-iteration-variable-Xi_fig1_2198668) upon [Kümmerle's](https://proceedings.mlr.press/v139/kummerle21a/kummerle21a-supp.pdf) past work. Deployed on GCP using CloudRun<a href="https://github.com/ThatE10/Sequence-Finder-OEIS" class="github-widget-light" target="_blank"><i class="fab fa-github"></i> Code</a>

#### [Bird Species Identification via Audio Classification](https://github.com/ThatE10/Intro-to-ML-Final)
A CNN and LSTM-based audio classifier for automated bird species identification using signal processing techniques. The model processes raw audio spectrograms to extract discriminative features, enabling accurate species classification across diverse acoustic environments. <a href="https://github.com/ThatE10/Intro-to-ML-Final" class="github-widget-light" target="_blank"><i class="fab fa-github"></i> Code</a>

#### [🌱 Fertilizer Platform: Connecting Sustainability Projects with Experts](https://github.com/yalama01/hackuncp)
A full-stack web application connecting sustainability-focused community projects with relevant professionals and stakeholders. The backend uses FastAPI with AI-powered logic to generate project summaries, identify relevant contacts, rate their relevance, and draft personalized outreach emails. The frontend provides a React-based interface with Material UI where project organizers submit ideas, connect with domain experts, and manage profiles. Developed as a HackUNCP project. <a href="https://github.com/yalama01/hackuncp" class="github-widget-light" target="_blank"><i class="fab fa-github"></i> Code</a>

#### [Mail Processor: Email Identification and Spam Detection](https://github.com/ThatE10/mailprocessor)
A comprehensive system for processing large-scale email archives to extract unique senders and identify spam. The system extracts email data via IMAP and POP protocols, provides a web UI for visualizing sender statistics and spam metrics, and employs microsoft/deberta-v3-base for accurate spam classification. Designed to help maintain clean digital footprints and support secure password management practices. Built using Claude CLI. <a href="https://github.com/ThatE10/mailprocessor" class="github-widget-light" target="_blank"><i class="fab fa-github"></i> Code</a>

#### Apollo: Autonomous Meal Delivery Solution
Leading a team of 6 to develop an experimental autonomous delivery robot for meal distribution across the UNC Charlotte campus. In collaboration with Charlotte AI Research and the Department of Computer Science, the project leverages ROS2 and TensorFlow to process continuous sensor streams and translate real-time data into navigation and delivery actions. Designed and implemented a unified Docker-based development environment that enables seamless team integration and collaborative workflows. <a href="#" class="github-widget-light" target="_blank"><i class="fab fa-github"></i> Code</a>

### Erdős Number
My Erdős number is **4**

<p style="font-size: 14px; color: #666;">Ethan Nguyen → Kümmerle, Christian → Maggioni, Mauro → Chui, Charles Kam-tai → Erdős, Paul</p>
<p style="font-size: 13px;"><a href="https://mathscinet.ams.org/mathscinet/freetools/collab-dist?source=1299826&target=189017" target="_blank">View on MathSciNet</a></p>

#### [Tools & Utilities](/tools/)
An assortment of useful tools that run entirely in your browser. No files are uploaded to any server.

## About Me

I'm an undergraduate mathematics and computer science double student at the University of North Carolina Charlotte with 3.5 years research experience in non-convex optimization advised under [Christian Kümmerle](https://ckuemmerle.com/home/). I am currently looking for mentorship to help refine my research taste and execution. I used to lead Charlotte AI Research, a student organization that creates an environment for student growth and exploration.

My work spans across:
- Mechanistic Interpretablity on Large Language models
- Mechanistic Transfer
- AI Safety
- Scalable optimization methods
- Community-centered AI education (Hobby)


## Charlotte AI Research

I am now the current advisory board chair. If you have any questions about how to engage please feel free to reach out to me or airesearch@charlotte.edu

<div style="display: flex; gap: 20px;">
  <div>
    <h4>Discord</h4>
    <iframe src="https://discord.com/widget?id=639164083819511828&theme=dark" width="350" height="350" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
  </div>
  <div>
    <h4>Instagram</h4>
    <iframe src="https://www.instagram.com/uncc.cair/embed" width="350" height="350" frameborder="0" scrolling="no" allowtransparency="true"></iframe>
  </div>
</div>

---

## Contact Me

<div class="email-wrapper">
  <img src="/assets/images/email.png" alt="email address" class="email-image">
  <form class="contact-form" action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST">
    <textarea name="message" placeholder="Your message..." required></textarea>
    <input type="email" name="email" placeholder="your@email.com" required>
    <button type="submit">Send</button>
  </form>
</div>
