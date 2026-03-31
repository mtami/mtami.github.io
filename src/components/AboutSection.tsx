import { motion } from "framer-motion";

const interests = [
  "Artificial Intelligence", "Natural Language Processing", "Multimodal Learning",
  "LLMs", "Generative AI", "Intelligent Tutoring Systems", "Traffic Safety", "Edge AI"
];

const AboutSection = () => (
  <section id="about" className="section-padding">
    <div className="max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-mono text-sm tracking-widest uppercase text-primary mb-12"
      >
        About
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-light leading-relaxed text-foreground/90 mb-12"
      >
        Experienced AI researcher and software engineer with a strong record of applied and academic
        contributions. Over a decade of experience leading AI product development, integrating LLMs
        and Generative AI into scalable platforms, and mentoring engineering teams.
      </motion.p>

      <div className="grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6">Education</h3>
          <div className="space-y-4">
            <div className="border-l-2 border-primary pl-4">
              <p className="font-semibold">M.Sc. Data Science & Business Analytics</p>
              <p className="text-muted-foreground text-sm">Arab American University · GPA 4.0/4.0 · 2023–2025</p>
            </div>
            <div className="border-l-2 border-border pl-4">
              <p className="font-semibold">B.Sc. Computer Engineering</p>
              <p className="text-muted-foreground text-sm">An-Najah National University · 2010–2015</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6">Research Interests</h3>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <span
                key={interest}
                className="px-3 py-1.5 text-sm rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-300"
              >
                {interest}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
