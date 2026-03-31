import { motion } from "framer-motion";

const experiences = [
  {
    role: "Senior Lead Software Engineer / Architect",
    company: "Asal Technologies",
    location: "Rawabi, Palestine",
    period: "Oct 2022 – Present",
    highlights: [
      "Spearheaded Eflex, an AI-powered e-learning platform using generative AI for real-time feedback",
      "Migrated legacy monolith to microservices, improving scalability and deployment speed",
      "Integrated NLP and LLMs via HuggingFace into feedback pipelines",
      "Architected cloud-native apps using AWS ECS, Lambda, and RDS",
      "Mentored junior developers in software design and AI integration",
    ],
  },
  {
    role: "Senior Data Engineer",
    company: "AUI (US-based)",
    location: "Remote",
    period: "Jan 2022 – Sep 2022",
    highlights: [
      "Managed real-time ML infrastructure with 15+ production models",
      "Improved ETL/ELT efficiency by 40% through strategic data model redesign",
      "Led deployment of 15+ ML models using AWS SageMaker",
      "Built log-based monitoring reducing anomaly and data drift rates to near zero",
    ],
  },
  {
    role: "Backend Engineer",
    company: "Harri (US-based)",
    location: "Remote",
    period: "Jun 2015 – Dec 2021",
    highlights: [
      "Developed scalable REST APIs supporting high-traffic HR platforms",
      "Implemented Redis caching achieving 80% performance increase",
      "Designed SQL/NoSQL solutions for real-time and batch data patterns",
      "Supported transition to AWS Lambda, ECS, and Docker containerization",
    ],
  },
  {
    role: "Lecturer (Part-Time)",
    company: "Arab American University",
    location: "Palestine",
    period: "2025 – Present",
    highlights: [
      "Teaching Big Data Analytics course for undergraduate students",
      "Mentoring students on research projects involving AI, ML, and data engineering",
    ],
  },
];

const ExperienceSection = () => (
  <section id="experience" className="section-padding bg-card/50">
    <div className="max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-mono text-sm tracking-widest uppercase text-primary mb-16"
      >
        Experience
      </motion.h2>

      <div className="space-y-16">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="grid md:grid-cols-[240px_1fr] gap-6 md:gap-12"
          >
            <div>
              <p className="font-mono text-sm text-primary">{exp.period}</p>
              <p className="text-sm text-muted-foreground mt-1">{exp.location}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">{exp.role}</h3>
              <p className="text-muted-foreground mb-4">{exp.company}</p>
              <ul className="space-y-2">
                {exp.highlights.map((h, j) => (
                  <li key={j} className="text-sm text-foreground/75 flex gap-3">
                    <span className="text-primary mt-1.5 shrink-0">▸</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ExperienceSection;
