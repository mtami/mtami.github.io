import { motion } from "framer-motion";
import { Mail, Github, Linkedin, GraduationCap } from "lucide-react";

const ContactSection = () => (
  <section id="contact" className="section-padding">
    <div className="max-w-5xl mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-mono text-sm tracking-widest uppercase text-primary mb-8"
      >
        Get In Touch
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-6"
      >
        Let's collaborate.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-muted-foreground text-lg mb-12 max-w-lg mx-auto"
      >
        Open to research collaborations, consulting, and doctoral opportunities
        in AI for Software Engineering.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex justify-center gap-6"
      >
        {[
          { icon: Mail, href: "mailto:mabutame@gmail.com", label: "Email" },
          { icon: Github, href: "https://github.com/mtami", label: "GitHub" },
          { icon: Linkedin, href: "https://linkedin.com/in/mtami", label: "LinkedIn" },
          { icon: GraduationCap, href: "https://scholar.google.com/mtami", label: "Scholar" },
        ].map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 hover:glow"
            aria-label={label}
          >
            <Icon size={22} />
          </a>
        ))}
      </motion.div>

      <div className="mt-24 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground font-mono">
          © {new Date().getFullYear()} Mohammad Abu Tami
        </p>
      </div>
    </div>
  </section>
);

export default ContactSection;
