import {
  FaPython, FaAws, FaGitAlt, FaJava, FaDatabase,
  FaCode, FaBrain, FaServer, FaGithub, FaLinkedin,
  FaInstagram, FaEnvelope, FaLaptopCode, FaGraduationCap, FaChartLine,
} from 'react-icons/fa';
import {
  SiJavascript, SiMysql, SiPostgresql, SiMongodb,
  SiFastapi, SiNextdotjs, SiNodedotjs, SiTableau,
  SiPlotly, SiScikitlearn, SiPandas, SiNumpy,
  SiTensorflow, SiOpencv, SiFirebase,
  SiStreamlit, SiChartdotjs,
} from 'react-icons/si';
import { TbChartBar } from 'react-icons/tb';

export const ICON_MAP = {
  FaPython, FaAws, FaGitAlt, FaJava, FaDatabase,
  FaCode, FaBrain, FaServer, FaGithub, FaLinkedin,
  FaInstagram, FaEnvelope, FaLaptopCode, FaGraduationCap, FaChartLine,
  SiJavascript, SiMysql, SiPostgresql, SiMongodb,
  SiFastapi, SiNextdotjs, SiNodedotjs, SiTableau,
  SiPlotly, SiScikitlearn, SiPandas, SiNumpy,
  SiTensorflow, SiOpencv, SiFirebase,
  TbChartBar,
};

export const getIcon = (name) => ICON_MAP[name] ?? FaCode;

/* Human-readable stack names (as written in project data) → icons */
export const STACK_ICONS = {
  'Python': FaPython,
  'SQL': FaDatabase,
  'MySQL': SiMysql,
  'PostgreSQL': SiPostgresql,
  'MongoDB': SiMongodb,
  'FastAPI': SiFastapi,
  'JavaScript': SiJavascript,
  'Next.js': SiNextdotjs,
  'Node.js': SiNodedotjs,
  'Chart.js': SiChartdotjs,
  'Scikit-Learn': SiScikitlearn,
  'Pandas': SiPandas,
  'NumPy': SiNumpy,
  'Dash': SiPlotly,
  'Streamlit': SiStreamlit,
  'OpenCV': SiOpencv,
  'YOLOv8': FaBrain,
  'DeepFace': FaBrain,
  'SHAP': FaChartLine,
  'LIME': FaChartLine,
  'Excel': TbChartBar,
  'AWS': FaAws,
  'Firebase': SiFirebase,
  'TensorFlow': SiTensorflow,
  'Tableau': SiTableau,
};

export const getStackIcon = (name) => STACK_ICONS[name] ?? FaCode;
