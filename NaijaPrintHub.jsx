import { useState, useEffect, useRef } from "react";

const WHATSAPP_NUMBER = "2348000000000";

function wa(msg) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`
    }}>
      {children}
    </div>
  );
}

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Rebranding", href: "#rebranding" },
  { label: "Catalog", href: "#catalog" },
  { label: "Track Order", href: "#track" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(8,8,20,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(212,175,55,0.15)" : "none",
      transition: "all 0.4s ease",
      padding: "0 2rem"
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg, #D4AF37, #F5E27C)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: 14, color: "#080814"
          }}>N</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#F5F0E8", letterSpacing: "0.02em" }}>
            NaijaPrint<span style={{ color: "#D4AF37" }}>Hub</span>
          </span>
        </a>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} style={{
              textDecoration: "none", color: "rgba(245,240,232,0.75)",
              fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
              transition: "color 0.2s"
            }}
              onMouseEnter={e => e.target.style.color = "#D4AF37"}
              onMouseLeave={e => e.target.style.color = "rgba(245,240,232,0.75)"}
            >{l.label}</a>
          ))}
          <a href={wa("Hello! I'd like to get a quote from NaijaPrint Hub.")} target="_blank" rel="noreferrer" style={{
            background: "linear-gradient(135deg, #D4AF37, #B8962E)",
            color: "#080814", padding: "10px 22px", borderRadius: 6,
            fontFamily: "'DM Sans', sans-serif", fontSize: 13,
            fontWeight: 700, textDecoration: "none", letterSpacing: "0.06em",
            textTransform: "uppercase", whiteSpace: "nowrap"
          }}>Get Quote</a>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "none", border: "none",
          color: "#D4AF37", fontSize: 24, cursor: "pointer"
        }} className="mobile-menu-btn" aria-label="Toggle menu">☰</button>
      </div>

      {menuOpen && (
        <div style={{
          background: "rgba(8,8,20,0.98)", padding: "1.5rem 2rem",
          display: "flex", flexDirection: "column", gap: 20,
          borderTop: "1px solid rgba(212,175,55,0.15)"
        }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
              textDecoration: "none", color: "rgba(245,240,232,0.85)",
              fontSize: 15, fontFamily: "'DM Sans', sans-serif"
            }}>{l.label}</a>
          ))}
          <a href={wa("Hello! I'd like to get a quote from NaijaPrint Hub.")} target="_blank" rel="noreferrer" style={{
            background: "linear-gradient(135deg, #D4AF37, #B8962E)",
            color: "#080814", padding: "12px 20px", borderRadius: 6,
            fontWeight: 700, textDecoration: "none", textAlign: "center"
          }}>Get a Quote on WhatsApp</a>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section id="hero" style={{
      minHeight: "100vh", position: "relative", display: "flex",
      alignItems: "center", overflow: "hidden",
      background: "linear-gradient(160deg, #080814 0%, #0D0D2B 50%, #080814 100%)"
    }}>
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.07,
        backgroundImage: `linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)`,
        backgroundSize: "60px 60px"
      }} />

      {/* Radial gold glow */}
      <div style={{
        position: "absolute", top: "30%", left: "55%",
        width: 700, height: 700,
        background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)",
        transform: "translate(-50%,-50%)"
      }} />

      {/* Diagonal accent line */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: "45%", height: "100%",
        background: "linear-gradient(135deg, transparent 0%, rgba(212,175,55,0.04) 100%)",
        borderLeft: "1px solid rgba(212,175,55,0.1)"
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", width: "100%", paddingTop: 100 }}>
        <div style={{ maxWidth: 800 }}>
          <div style={{
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(-20px)",
            transition: "all 0.8s ease 0.2s",
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)",
            padding: "8px 18px", borderRadius: 40, marginBottom: 32
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#D4AF37" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#D4AF37", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Est. 2018 · Lekki Phase 1, Lagos
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            lineHeight: 1.08, color: "#F5F0E8", margin: "0 0 12px",
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.9s ease 0.4s"
          }}>
            Lagos' Premier<br />
            <span style={{
              backgroundImage: "linear-gradient(90deg, #D4AF37, #F5E27C, #D4AF37)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>Print & Rebranding</span><br />
            Agency
          </h1>

          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "rgba(245,240,232,0.65)", lineHeight: 1.7, maxWidth: 560,
            margin: "24px 0 44px",
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.9s ease 0.6s"
          }}>
            From luxury brand identities to high-volume school textbooks — we are the elite bridge between your vision and world-class industrial printing.
          </p>

          <div style={{
            display: "flex", gap: 16, flexWrap: "wrap",
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.9s ease 0.8s"
          }}>
            <a href={wa("Hello NaijaPrint Hub! I'd like to start a new project with you. Please guide me.")} target="_blank" rel="noreferrer"
              style={{
                background: "linear-gradient(135deg, #D4AF37 0%, #B8962E 100%)",
                color: "#080814", padding: "16px 36px", borderRadius: 6,
                fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700,
                textDecoration: "none", letterSpacing: "0.04em", display: "inline-block"
              }}>
              Start Your Project
            </a>
            <a href="#catalog" style={{
              background: "transparent", color: "#F5F0E8",
              padding: "16px 36px", borderRadius: 6, border: "1px solid rgba(245,240,232,0.25)",
              fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500,
              textDecoration: "none", letterSpacing: "0.04em", display: "inline-block"
            }}>
              View Catalog
            </a>
          </div>

          {/* Stats row */}
          <div style={{
            display: "flex", gap: "clamp(24px, 4vw, 60px)", marginTop: 72, flexWrap: "wrap",
            opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1s"
          }}>
            {[["500+", "Projects Delivered"], ["200+", "Happy Clients"], ["6+", "Years of Excellence"], ["48hr", "Express Turnaround"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: "#D4AF37", fontWeight: 700 }}>{n}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(245,240,232,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative print element */}
      <div style={{
        position: "absolute", right: "5%", bottom: "10%",
        width: "clamp(200px, 30vw, 380px)", height: "clamp(200px, 30vw, 380px)",
        border: "1px solid rgba(212,175,55,0.15)", borderRadius: "50%",
        opacity: loaded ? 1 : 0, transition: "opacity 1.2s ease 0.5s",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <div style={{
          width: "75%", height: "75%", border: "1px solid rgba(212,175,55,0.1)",
          borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ textAlign: "center", opacity: 0.4 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 60px)", color: "#D4AF37" }}>⬡</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#D4AF37", letterSpacing: "0.15em", textTransform: "uppercase" }}>Print Excellence</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        opacity: loaded ? 0.5 : 0, transition: "opacity 1s ease 1.5s"
      }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#D4AF37", letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</div>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #D4AF37, transparent)" }} />
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { icon: "◈", title: "Brand Identity Design", desc: "Logo suites, brand books, and visual systems crafted for Lagos market leaders." },
    { icon: "◉", title: "Luxury Print Production", desc: "Premium offset and digital printing with superior finishes — foil, emboss, soft-touch lamination." },
    { icon: "◎", title: "School Book Publishing", desc: "Complete academic textbook printing: typesetting, binding, and mass distribution-ready volumes." },
    { icon: "◆", title: "Corporate Stationery", desc: "Executive letterheads, business cards, envelopes — every touchpoint refined to perfection." },
    { icon: "◇", title: "Marketing Collateral", desc: "Brochures, flyers, banners, and roll-ups that command attention at every Lagos event." },
    { icon: "◐", title: "Packaging Design", desc: "Product packaging that sells — from concept through print-ready artwork and production." },
  ];

  return (
    <section id="services" style={{
      background: "#0A0A1E", padding: "120px 2rem",
      borderTop: "1px solid rgba(212,175,55,0.1)"
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#D4AF37",
              letterSpacing: "0.2em", textTransform: "uppercase"
            }}>What We Do</span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)",
              color: "#F5F0E8", marginTop: 16, marginBottom: 16
            }}>Full-Spectrum Print Solutions</h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", color: "rgba(245,240,232,0.55)",
              maxWidth: 520, margin: "0 auto", lineHeight: 1.7, fontSize: 16
            }}>From concept to completion, we manage every detail of your print and brand journey.</p>
          </div>
        </FadeUp>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 2
        }}>
          {services.map((s, i) => (
            <FadeUp key={s.title} delay={i * 0.08}>
              <div style={{
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(212,175,55,0.08)",
                padding: "40px 36px", position: "relative", overflow: "hidden",
                cursor: "default",
                transition: "background 0.3s, border-color 0.3s"
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(212,175,55,0.05)";
                  e.currentTarget.style.borderColor = "rgba(212,175,55,0.25)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  e.currentTarget.style.borderColor = "rgba(212,175,55,0.08)";
                }}
              >
                <div style={{
                  position: "absolute", top: 0, left: 0,
                  width: 3, height: "100%",
                  background: "linear-gradient(to bottom, #D4AF37, transparent)"
                }} />
                <div style={{ fontSize: 28, color: "#D4AF37", marginBottom: 20 }}>{s.icon}</div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif", fontSize: 20,
                  color: "#F5F0E8", marginBottom: 12
                }}>{s.title}</h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                  color: "rgba(245,240,232,0.55)", lineHeight: 1.7
                }}>{s.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Rebranding() {
  const steps = [
    { num: "01", title: "Brand Audit", desc: "We dissect your current identity — strengths, weaknesses, market positioning." },
    { num: "02", title: "Strategy Workshop", desc: "Collaborative session to define your brand personality, values, and target audience." },
    { num: "03", title: "Visual Identity", desc: "Logo system, typography, color palette, and brand guidelines built for longevity." },
    { num: "04", title: "Print Rollout", desc: "Every touchpoint printed to perfection — stationery, signage, packaging, and more." },
  ];

  return (
    <section id="rebranding" style={{
      background: "#080814", padding: "120px 2rem", position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "50%", height: "100%",
        background: "radial-gradient(ellipse at top right, rgba(212,175,55,0.07) 0%, transparent 70%)"
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 6vw, 100px)", alignItems: "center" }}>
          <FadeUp>
            <div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#D4AF37", letterSpacing: "0.2em", textTransform: "uppercase" }}>Premium Service</span>
              <h2 style={{
                fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "#F5F0E8", margin: "16px 0 24px", lineHeight: 1.15
              }}>Total Identity<br /><span style={{ color: "#D4AF37" }}>Overhaul</span></h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", color: "rgba(245,240,232,0.6)",
                lineHeight: 1.8, fontSize: 15, marginBottom: 32
              }}>
                Your brand is speaking — the question is, what is it saying? Our Total Identity Overhaul transforms dated, inconsistent brands into powerful, cohesive identities that command respect across Lagos and beyond.
              </p>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, color: "#D4AF37" }}>97%</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Client Satisfaction</div>
                </div>
                <div style={{ width: 1, background: "rgba(212,175,55,0.15)" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, color: "#D4AF37" }}>14</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Day Average</div>
                </div>
              </div>
              <a href={wa("Hello! I'm interested in NaijaPrint Hub's Total Identity Overhaul / Rebranding package. Please tell me more.")} target="_blank" rel="noreferrer"
                style={{
                  display: "inline-block", marginTop: 40,
                  background: "linear-gradient(135deg, #D4AF37, #B8962E)",
                  color: "#080814", padding: "14px 32px", borderRadius: 6,
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700,
                  textDecoration: "none", letterSpacing: "0.04em"
                }}>
                Rebrand My Business
              </a>
            </div>
          </FadeUp>

          <div>
            {steps.map((s, i) => (
              <FadeUp key={s.num} delay={i * 0.1}>
                <div style={{
                  display: "flex", gap: 24, alignItems: "flex-start",
                  padding: "28px 0",
                  borderBottom: i < steps.length - 1 ? "1px solid rgba(212,175,55,0.1)" : "none"
                }}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif", fontSize: 48, color: "rgba(212,175,55,0.2)",
                    lineHeight: 1, minWidth: 56, fontWeight: 700
                  }}>{s.num}</div>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#F5F0E8", marginBottom: 8 }}>{s.title}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(245,240,232,0.55)", lineHeight: 1.7 }}>{s.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #rebranding .rebrand-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

const PRODUCTS = [
  {
    category: "School Books",
    items: [
      { name: "Textbooks & Workbooks", desc: "JSS, SSS, Primary — full typesetting & binding", tag: "High Volume" },
      { name: "Exercise Books", desc: "Ruled, squared, blank — custom covers available", tag: "Bestseller" },
      { name: "Academic Planners", desc: "School-branded diaries and planners", tag: "Custom" },
    ],
    icon: "📚",
    color: "rgba(212,175,55,0.08)"
  },
  {
    category: "Corporate Stationery",
    items: [
      { name: "Business Cards", desc: "Silk, matte, foil, embossed — multiple finishes", tag: "Premium" },
      { name: "Letterheads & Envelopes", desc: "Full suite, security features available", tag: "Executive" },
      { name: "Notepads & Folders", desc: "Branded corporate gifts and conference materials", tag: "Custom" },
    ],
    icon: "🏢",
    color: "rgba(212,175,55,0.05)"
  },
  {
    category: "Marketing Materials",
    items: [
      { name: "Brochures & Flyers", desc: "A4, A5, DL — full color, multiple folds", tag: "Popular" },
      { name: "Banners & Roll-ups", desc: "PVC, fabric, pop-up stands for events", tag: "Express" },
      { name: "Branded Merchandise", desc: "Pens, mugs, T-shirts, bags with your logo", tag: "Promo" },
    ],
    icon: "📣",
    color: "rgba(212,175,55,0.03)"
  },
];

function Catalog() {
  const [active, setActive] = useState(0);

  return (
    <section id="catalog" style={{
      background: "#0D0D2B", padding: "120px 2rem",
      borderTop: "1px solid rgba(212,175,55,0.08)"
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#D4AF37", letterSpacing: "0.2em", textTransform: "uppercase" }}>Product Catalog</span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)",
              color: "#F5F0E8", marginTop: 16, marginBottom: 16
            }}>Everything You Need, Printed Perfectly</h2>
          </div>
        </FadeUp>

        {/* Category tabs */}
        <FadeUp delay={0.1}>
          <div style={{ display: "flex", gap: 0, marginBottom: 48, flexWrap: "wrap", borderBottom: "1px solid rgba(212,175,55,0.12)" }}>
            {PRODUCTS.map((p, i) => (
              <button key={p.category} onClick={() => setActive(i)} style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "16px 32px",
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
                color: active === i ? "#D4AF37" : "rgba(245,240,232,0.5)",
                borderBottom: active === i ? "2px solid #D4AF37" : "2px solid transparent",
                transition: "all 0.2s", letterSpacing: "0.02em"
              }}>{p.icon} {p.category}</button>
            ))}
          </div>
        </FadeUp>

        {PRODUCTS[active].items.map((item, i) => (
          <FadeUp key={item.name} delay={i * 0.08}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "28px 32px", marginBottom: 2,
              background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(212,175,55,0.03)",
              border: "1px solid rgba(212,175,55,0.08)",
              borderRadius: 4, gap: 20, flexWrap: "wrap"
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#F5F0E8", margin: 0 }}>{item.name}</h3>
                  <span style={{
                    background: "rgba(212,175,55,0.15)", color: "#D4AF37",
                    padding: "3px 10px", borderRadius: 20, fontSize: 10,
                    fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase"
                  }}>{item.tag}</span>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(245,240,232,0.5)", margin: 0 }}>{item.desc}</p>
              </div>
              <a href={wa(`Hello NaijaPrint Hub! I'm interested in ordering: ${item.name}. Please send me pricing and details.`)} target="_blank" rel="noreferrer"
                style={{
                  background: "transparent", border: "1px solid rgba(212,175,55,0.35)",
                  color: "#D4AF37", padding: "10px 24px", borderRadius: 4,
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
                  textDecoration: "none", whiteSpace: "nowrap", letterSpacing: "0.04em",
                  transition: "all 0.2s"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#D4AF37";
                  e.currentTarget.style.color = "#080814";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#D4AF37";
                }}
              >
                Get a Quote →
              </a>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function TrackOrder() {
  const [orderId, setOrderId] = useState("");

  const handleTrack = () => {
    if (!orderId.trim()) return;
    const url = wa(`Hello NaijaPrint Hub! I would like a status update on my order. My Order/Tracking ID is: ${orderId.trim()}. Please confirm the current status. Thank you.`);
    window.open(url, "_blank");
  };

  return (
    <section id="track" style={{
      background: "#080814", padding: "100px 2rem",
      borderTop: "1px solid rgba(212,175,55,0.08)",
      borderBottom: "1px solid rgba(212,175,55,0.08)"
    }}>
      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
        <FadeUp>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#D4AF37", letterSpacing: "0.2em", textTransform: "uppercase" }}>Order Management</span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            color: "#F5F0E8", margin: "16px 0 12px"
          }}>Track Your Order</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(245,240,232,0.5)", lineHeight: 1.7, marginBottom: 48, fontSize: 15 }}>
            Enter your unique Order ID below. We'll connect you directly with our team on WhatsApp for a real-time status update.
          </p>

          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(212,175,55,0.2)",
            borderRadius: 12, padding: "40px 48px"
          }}>
            <div style={{
              display: "flex", gap: 0, borderRadius: 6, overflow: "hidden",
              border: "1px solid rgba(212,175,55,0.25)"
            }}>
              <input
                type="text"
                value={orderId}
                onChange={e => setOrderId(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleTrack()}
                placeholder="e.g. NPH-2024-0042"
                style={{
                  flex: 1, background: "rgba(255,255,255,0.04)",
                  border: "none", outline: "none",
                  color: "#F5F0E8", padding: "16px 20px",
                  fontFamily: "'DM Sans', sans-serif", fontSize: 15,
                  letterSpacing: "0.05em"
                }}
              />
              <button onClick={handleTrack} style={{
                background: "linear-gradient(135deg, #D4AF37, #B8962E)",
                border: "none", color: "#080814",
                padding: "16px 28px", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700,
                letterSpacing: "0.06em", whiteSpace: "nowrap"
              }}>
                Track →
              </button>
            </div>

            <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
              {[["📦", "Production", "In progress"], ["🚚", "Dispatch", "Out for delivery"], ["✅", "Delivered", "Completed"]].map(([ic, l, s]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{ic}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(245,240,232,0.7)", fontWeight: 600 }}>{l}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(245,240,232,0.35)" }}>{s}</div>
                </div>
              ))}
            </div>

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(245,240,232,0.3)", marginTop: 28, lineHeight: 1.6 }}>
              Your Order ID was sent via WhatsApp or email when you placed your order. Can't find it? Chat us directly.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  {
    quote: "NaijaPrint Hub delivered 2,000 textbooks for our school in 10 days. The quality was outstanding — our parents and teachers were genuinely impressed. They are simply the best in Lagos.",
    name: "Mrs. Adaeze Okonkwo",
    title: "Director, Greenfield Academy, Lekki",
    initials: "AO"
  },
  {
    quote: "Our rebranding exceeded every expectation. From the brand strategy session to the final stationery printing, the NaijaPrint Hub team was professional, creative, and always on time.",
    name: "Mr. Emeka Nwosu",
    title: "CEO, Nwosu & Associates Ltd",
    initials: "EN"
  },
  {
    quote: "I've used three print agencies in Lagos before settling with NaijaPrint Hub. The difference is night and day — premium quality, transparent pricing, and they actually keep to deadlines.",
    name: "Miss Titilayo Adeyemi",
    title: "Marketing Director, AfriGlow FMCG",
    initials: "TA"
  },
  {
    quote: "The roll-up banners and brochures they made for our product launch were stunning. Multiple guests asked for our designer's contact — I proudly referred them to NaijaPrint Hub.",
    name: "Dr. Chidi Obiora",
    title: "Founder, MediLab Diagnostics",
    initials: "CO"
  },
];

function Testimonials() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[current];

  return (
    <section id="testimonials" style={{
      background: "#0A0A1E", padding: "120px 2rem"
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#D4AF37", letterSpacing: "0.2em", textTransform: "uppercase" }}>Client Stories</span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)",
              color: "#F5F0E8", marginTop: 16
            }}>Trusted By Lagos' Best</h2>
          </div>
        </FadeUp>

        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(212,175,55,0.15)",
            borderRadius: 12, padding: "clamp(32px, 5vw, 64px)",
            position: "relative", transition: "all 0.4s ease"
          }}>
            <div style={{
              position: "absolute", top: 32, left: 40,
              fontFamily: "'Playfair Display', serif", fontSize: 80,
              color: "rgba(212,175,55,0.15)", lineHeight: 1
            }}>"</div>

            <p style={{
              fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.05rem, 2vw, 1.35rem)",
              color: "rgba(245,240,232,0.85)", lineHeight: 1.75, marginBottom: 40,
              position: "relative", zIndex: 1, fontStyle: "italic"
            }}>{t.quote}</p>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                width: 52, height: 52, borderRadius: "50%",
                background: "linear-gradient(135deg, #D4AF37, #B8962E)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "#080814"
              }}>{t.initials}</div>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: "#F5F0E8" }}>{t.name}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(245,240,232,0.45)" }}>{t.title}</div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 32 }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{
                width: i === current ? 24 : 8, height: 8, borderRadius: 4,
                background: i === current ? "#D4AF37" : "rgba(212,175,55,0.25)",
                border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0
              }} />
            ))}
          </div>

          {/* Arrow controls */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20 }}>
            <button onClick={() => setCurrent(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "transparent", border: "1px solid rgba(212,175,55,0.25)",
              color: "#D4AF37", cursor: "pointer", fontSize: 16, fontWeight: 700
            }}>←</button>
            <button onClick={() => setCurrent(c => (c + 1) % TESTIMONIALS.length)} style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "transparent", border: "1px solid rgba(212,175,55,0.25)",
              color: "#D4AF37", cursor: "pointer", fontSize: 16, fontWeight: 700
            }}>→</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{
      background: "#080814", padding: "100px 2rem 0",
      borderTop: "1px solid rgba(212,175,55,0.1)"
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 6vw, 100px)", paddingBottom: 80 }}>
          <FadeUp>
            <div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#D4AF37", letterSpacing: "0.2em", textTransform: "uppercase" }}>Get In Touch</span>
              <h2 style={{
                fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "#F5F0E8", margin: "16px 0 24px", lineHeight: 1.2
              }}>Let's Print<br /><span style={{ color: "#D4AF37" }}>Something Great</span></h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(245,240,232,0.55)", lineHeight: 1.8, fontSize: 15, marginBottom: 40 }}>
                Ready to elevate your brand or fulfill a large print order? Reach out via WhatsApp for the fastest response. Our team is available Monday – Saturday, 8am – 6pm WAT.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  ["📍", "Location", "12B Admiralty Way, Lekki Phase 1, Lagos, Nigeria"],
                  ["📞", "Phone", "+234 800 000 0000"],
                  ["✉️", "Email", "hello@naijaprintHub.com"],
                  ["🕐", "Hours", "Mon – Sat: 8:00 AM – 6:00 PM WAT"],
                ].map(([ic, l, v]) => (
                  <div key={l} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 18, minWidth: 24 }}>{ic}</span>
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#D4AF37", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{l}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(245,240,232,0.7)" }}>{v}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div style={{
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(212,175,55,0.15)",
              borderRadius: 12, padding: 40, display: "flex", flexDirection: "column", gap: 16
            }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#F5F0E8", marginBottom: 8 }}>
                Quick Contact via WhatsApp
              </h3>
              {[
                ["📚 School Books Order", "Hello NaijaPrint Hub! I'd like to place a bulk school books order. Please advise on pricing and timelines."],
                ["🏢 Corporate Stationery", "Hello! I need corporate stationery printed for my company. Please share your catalog and pricing."],
                ["◈ Rebranding Project", "Hi NaijaPrint Hub! I'm interested in your Total Identity Overhaul / Rebranding package. Let's talk!"],
                ["📣 Marketing Materials", "Hello! I need marketing materials printed — brochures, banners, and flyers. Please send me a quote."],
                ["💬 General Inquiry", "Hello NaijaPrint Hub! I have a general inquiry. Please assist me."],
              ].map(([label, msg]) => (
                <a key={label} href={wa(msg)} target="_blank" rel="noreferrer" style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.12)",
                  padding: "16px 20px", borderRadius: 8, textDecoration: "none",
                  transition: "all 0.2s"
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(212,175,55,0.12)";
                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.35)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(212,175,55,0.05)";
                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.12)";
                  }}
                >
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#F5F0E8" }}>{label}</span>
                  <span style={{ color: "#D4AF37", fontSize: 16 }}>→</span>
                </a>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Footer bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(212,175,55,0.1)",
          padding: "32px 0",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "linear-gradient(135deg, #D4AF37, #F5E27C)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: 11, color: "#080814"
            }}>N</div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: "rgba(245,240,232,0.7)" }}>
              NaijaPrint<span style={{ color: "#D4AF37" }}>Hub</span>
            </span>
          </div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(245,240,232,0.3)" }}>
            © {new Date().getFullYear()} NaijaPrintHub. Lagos' Premier Print & Rebranding Agency.
          </span>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy", "Terms", "Sitemap"].map(l => (
              <span key={l} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(245,240,232,0.3)", cursor: "pointer" }}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 999 }}>
      {open && (
        <div style={{
          position: "absolute", bottom: 72, right: 0,
          background: "#0D0D2B", border: "1px solid rgba(212,175,55,0.25)",
          borderRadius: 12, padding: 20, width: 260,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
        }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center" }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "linear-gradient(135deg, #D4AF37, #B8962E)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: 16, color: "#080814"
            }}>N</div>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#F5F0E8" }}>NaijaPrint Hub</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#25D366" }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(245,240,232,0.5)" }}>Online now</span>
              </div>
            </div>
          </div>
          <div style={{
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.1)",
            borderRadius: 8, padding: 14, marginBottom: 14
          }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(245,240,232,0.75)", margin: 0, lineHeight: 1.6 }}>
              👋 Hello! Ready to bring your print vision to life? Chat with us on WhatsApp — fastest response guaranteed.
            </p>
          </div>
          <a href={wa("Hello NaijaPrint Hub! I'd like to discuss a project.")} target="_blank" rel="noreferrer" style={{
            display: "block", textAlign: "center",
            background: "#25D366", color: "#fff",
            padding: "12px", borderRadius: 8,
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700,
            textDecoration: "none"
          }}>
            💬 Start Chat
          </a>
        </div>
      )}
      <button onClick={() => setOpen(!open)} style={{
        width: 60, height: 60, borderRadius: "50%",
        background: "linear-gradient(135deg, #25D366, #128C7E)",
        border: "3px solid rgba(37,211,102,0.3)",
        cursor: "pointer", fontSize: 26, display: "flex",
        alignItems: "center", justifyContent: "center",
        boxShadow: "0 8px 32px rgba(37,211,102,0.4)"
      }} aria-label="Chat on WhatsApp">
        💬
      </button>
    </div>
  );
}

export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #080814; }
        ::selection { background: rgba(212,175,55,0.3); color: #F5F0E8; }
        input::placeholder { color: rgba(245,240,232,0.3); }
        @media (max-width: 768px) {
          #rebranding > div > div,
          #contact > div > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Navbar />
      <Hero />
      <Services />
      <Rebranding />
      <Catalog />
      <TrackOrder />
      <Testimonials />
      <Contact />
      <WhatsAppWidget />
    </>
  );
}
