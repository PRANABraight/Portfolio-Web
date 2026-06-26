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
