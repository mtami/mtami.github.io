import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const publications = [
  {
    title: "Transformer-based approach to pathology diagnosis using audio spectrogram",
    venue: "Information, 15(5), 2024",
    authors: "Tami M., Masri S., Hasasneh A., Tadj C.",
  },
  {
    title: "Using multimodal large language models (MLLMs) for automated detection of traffic safety-critical events",
    venue: "Vehicles, 6(3), 2024",
    authors: "Abu Tami M., Ashqar H.I., Elhenawy M., et al.",
  },
  {
    title: "HazardNet: A Small-Scale Vision Language Model for Real-Time Traffic Safety Detection at Edge Devices",
    venue: "arXiv preprint, 2025",
    authors: "Tami M., Elhenawy M., Ashqar H.I.",
  },
  {
    title: "Automated question generation for science tests in Arabic language using NLP techniques",
    venue: "Springer ISBCT, 2024",
    authors: "Tami M., Ashqar H.I., Elhenawy M.",
  },
  {
    title: "Vision-Language Models for Autonomous Driving: CLIP-Based Dynamic Scene Understanding",
    venue: "Electronics, 14(7), 2025",
    authors: "Elhenawy M., Ashqar H.I., et al.",
  },
];

const PublicationsSection = () => (
  <section id="publications" className="section-padding">
    <div className="max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-mono text-sm tracking-widest uppercase text-primary mb-16"
      >
        Selected Publications
      </motion.h2>

      <div className="space-y-8">
        {publications.map((pub, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group p-6 rounded-xl border border-border hover:border-primary/30 transition-all duration-300 hover:glow"
          >
            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
              {pub.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-1">{pub.authors}</p>
            <p className="text-sm text-primary/70 font-mono">{pub.venue}</p>
          </motion.div>
        ))}
      </div>

      <motion.a
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        href="https://scholar.google.com/mtami"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-10 text-sm font-mono text-primary hover:underline"
      >
        View all on Google Scholar <ExternalLink size={14} />
      </motion.a>
    </div>
  </section>
);

export default PublicationsSection;
