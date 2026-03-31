import { motion } from "framer-motion";
import { Github, Linkedin, Mail, GraduationCap } from "lucide-react";

const socials = [
  { icon: Mail, href: "mailto:mabutame@gmail.com", label: "Email" },
  { icon: Github, href: "https://github.com/mtami", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/mtami", label: "LinkedIn" },
  { icon: GraduationCap, href: "https://scholar.google.com/mtami", label: "Scholar" },
];

const HeroSection = () => (
  <section className="min-h-screen flex items-center section-padding relative overflow-hidden">
    {/* Background grid */}
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
      backgroundSize: '60px 60px'
    }} />

    <div className="max-w-5xl mx-auto w-full relative z-10">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-mono text-sm tracking-widest uppercase text-primary mb-6"
      >
        Senior AI Engineer & Researcher
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8"
      >
        Mohammad
        <br />
        <span className="text-gradient">Abu Tami</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed mb-12"
      >
        Building intelligent systems at the intersection of AI and Software Engineering.
        Published researcher in multimodal learning, NLP, and edge AI.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex gap-4"
      >
        {socials.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 hover:glow"
            aria-label={label}
          >
            <Icon size={20} />
          </a>
        ))}
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
