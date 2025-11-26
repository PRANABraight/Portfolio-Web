
import { FaPython, FaAws, FaGitAlt, FaJava, FaDatabase } from "react-icons/fa";
import { SiJavascript, SiMysql, SiPostgresql, SiMongodb, SiFastapi, SiNextdotjs, SiNodedotjs, SiTableau, SiPlotly, SiScikitlearn, SiPandas, SiNumpy, SiTensorflow, SiOpencv, SiFirebase } from "react-icons/si";
import { TbChartBar } from "react-icons/tb";

// Asset imports
import clinicalImage from "../assets/clinical.jpg";
import karnatakaImage from "../assets/karnataka.png";
import attendanceImage from "../assets/attendance.jpg";
import creditImage from "../assets/credit.jpg";
import falconImage from "../assets/falcon.jpg";

export const heroData = {
  name: "Pranab Rai",
  tagline: "Data Engineer | Data Science & Analytics",
  traits: [
    "📊 Data & Platform Engineer",
    "🤖 Machine Learning Engineer",
    "📈 Statistical Analysis Expert",
    "🔍 Data Mining & Insights",
    "🧮 Predictive Modeling Pro",
  ],
};

export const aboutData = {
  code: [
    "class Myself:",
    "    \"\"\"Building scalable data platforms and actionable insights.\"\"\"",
    "    ",
    "    def __init__(self):",
    "        self.name = 'Pranab Rai'",
    // "        self.role = 'Data & Platform Engineer'",
    "        self.location = 'Bengaluru, India'",
    "        self.education = 'MCA, Christ University'",
    // "        self.experience = 'Govt of Karnataka Beneficiary Platform'",
    // "        self.skills = ['Full Stack Data Science', 'Cloud Engineering', 'Analytics']",
    "        self.tools = ['Python', 'SQL', 'JavaScript', 'AWS']",
    "    ",
    "    def build_solutions(self):",
    "        # Architecting secure, scalable data systems",
    "        return self.deploy_impactful_solutions()",
  ],
};

export const skillsData = [
  // Programming Languages
  { icon: FaPython, name: "Python", color: "#3776AB" },
  { icon: FaDatabase, name: "SQL", color: "#4479A1" },
  { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
  { icon: FaJava, name: "Java", color: "#007396" },
  
  // Database & Cloud
  { icon: SiMysql, name: "MySQL", color: "#4479A1" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#336791" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
  { icon: FaAws, name: "AWS", color: "#FF9900" },
  { icon: SiFirebase, name: "Firebase", color: "#FFCA28" },
  
  // Data Analysis & ML
  { icon: SiPandas, name: "Pandas", color: "#150458" },
  { icon: SiNumpy, name: "NumPy", color: "#013243" },
  { icon: TbChartBar, name: "Matplotlib", color: "#11557C" },
  { icon: TbChartBar, name: "Seaborn", color: "#3776AB" },
  { icon: SiScikitlearn, name: "Scikit-learn", color: "#F7931E" },
  { icon: SiTensorflow, name: "TensorFlow", color: "#FF6F00" },
  { icon: SiOpencv, name: "OpenCV", color: "#5C3EE8" },
  
  // Visualization & Tools
  { icon: SiTableau, name: "Tableau", color: "#E97627" },
  { icon: SiPlotly, name: "Plotly", color: "#3F4F75" },
  { icon: FaGitAlt, name: "Git", color: "#F05032" },
];

export const projectsData = {
  completed: [
    {
      title: "Credit Risk Analytics Platform",
      image: creditImage,
      description: "End-to-end credit risk analytics platform processing 22,903 transactions, achieving a 75.9% on-time payment rate through advanced SQL-based risk stratification.",
      features: [
        "RESTful API with 6 operational endpoints (FastAPI)",
        "Interactive dashboard with 4 dynamic visualizations",
        "Advanced SQL queries (CTEs, Window Functions)",
        "Reduced manual reporting time by 80%",
      ],
      stack: ["Python", "MySQL", "FastAPI", "JavaScript", "Chart.js"],
      github: "https://github.com/PRANABraight/Credit-Risk-Analytics-Portfolio-Management-System",
      // deployment: "https://credit-risk-analytics.vercel.app",
    },
    {
      title: "SpaceX Falcon 9 Landing Prediction",
      image: falconImage,
      description: "ML pipeline predicting rocket landing outcomes with 83.33% accuracy using Logistic Regression, SVM, Decision Tree, and KNN models.",
      features: [
        "Interactive Dash dashboard for launch records",
        "Extensive EDA with SQL and Python",
        "Model optimization via GridSearchCV",
        "Dynamic filtering by launch site & payload",
      ],
      stack: ["Python", "SQL", "Scikit-Learn", "Dash", "Pandas"],
      github: "https://github.com/PRANABraight/falcon-x",
      // deployment: "https://spacex-falcon9-prediction.vercel.app",
    },
    {
      title: "Clinical Decision Support System",
      image: clinicalImage,
      description: "Interactive system using Stroke Data and 22M+ drug interactions to visualize patient risk factors and outcomes.",
      features: [
        "Predictive models (RF, XGBoost) with 93% accuracy",
        "SHAP and LIME for model interpretability",
        "Automated ETL pipeline & NLP-driven analysis",
        "Identifies adverse drug interactions",
      ],
      stack: ["Python", "Streamlit", "Scikit-Learn", "SHAP", "LIME"],
      github: "https://github.com/PRANABraight/healthcare",
      deployment: "https://clinical-decision-support-system-ada.streamlit.app/",
    },
    {
      title: "Student Attendance Monitoring System",
      image: attendanceImage,
      description: "Real-time attendance monitoring and emotion tracking system using computer vision to automatically detect, recognize, and track students in a classroom.",
      features: [
        "Automated attendance logging with DeepFace",
        "Tracks 7 core emotional states for engagement analysis",
        "Fine-tuned YOLOv8 on custom dataset of 20 students",
        "Real-time results stored in MySQL database",
      ],
      stack: ["Python", "OpenCV", "YOLOv8", "DeepFace", "MySQL"],
      github: "https://github.com/Chloy02/Attendance-monitoring-using-Computer-Vision",
      // deployment: "https://student-attendance-system.vercel.app",
    },
  ],
  ongoing: [
    {
      title: "Govt of Karnataka Beneficiary Platform",
      image: karnatakaImage,
      description: "Data-driven admin dashboard tracking 5+ key operational KPIs from 300+ submissions across 8 districts.",
      features: [
        "Bilingual frontend (English/Kannada) with Next.js",
        "Automated CSV/Excel export for officials",
        "Data pipelines for survey validation",
        "Improved visibility into district-level performance",
      ],
      stack: ["Python", "Next.js", "Node.js", "MongoDB", "Excel"],
      // github: "https://github.com/PRANABraight/karnataka-beneficiary-platform",
      deployment: "https://formulytic.vercel.app/",
    },
  ],
};