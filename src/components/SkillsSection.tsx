import { motion } from "framer-motion";

const skillGroups = [
  {
    title: "Programming & Scripting",
    skills: ["Python", "PyTorch", "PHP", "SQL", "Bash"],
  },
  {
    title: "Data Engineering",
    skills: ["Apache Spark", "Kafka", "Snowflake", "ETL/ELT Pipelines", "Metabase", "AWS QuickSight"],
  },
  {
    title: "Web & Architecture",
    skills: ["FastAPI", "Django", "Laravel", "Node.js", "Microservices", "REST APIs", "Serverless"],
  },
  {
    title: "AI & Infrastructure",
    skills: ["LLM Integration", "HuggingFace", "ML Pipelines", "Vector DBs", "SageMaker", "Edge AI"],
  },
  {
    title: "DevOps & Cloud",
    skills: ["AWS (ECS, Lambda, RDS, S3)", "Docker", "Kubernetes", "GitHub Actions", "Jenkins", "CI/CD"],
  },
];

const getAnimationDelay = (groupIndex: number, skillIndex: number) => {
  return ((groupIndex * 0.3) + (skillIndex * 0.15)) % 2;
};

const getAnimationDuration = (index: number) => {
  return 2.5 + (index % 3) * 0.5;
};

const SkillsSection = () => (
  <section id="skills" className="section-padding bg-card/50">
    <div className="max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-mono text-sm tracking-widest uppercase text-primary mb-16"
      >
        Technical Skills
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {skillGroups.map((group, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill, skillIdx) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-sm rounded-md bg-secondary text-secondary-foreground cursor-default transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:-translate-y-1 animate-float"
                  style={{
                    animationDelay: `${getAnimationDelay(i, skillIdx)}s`,
                    animationDuration: `${getAnimationDuration(skillIdx)}s`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
