import React, { useState, useEffect } from 'react';
import { 
  Github, Linkedin, Mail, ExternalLink, Code, Database, 
  Smartphone, Globe, Terminal, Layers, Moon, Sun, 
  TrendingUp, Shield, Cpu, ArrowRight, Zap, Briefcase
} from 'lucide-react';

// --- DATA SECTION ---

// into 'projects.json' and use: import PROJECTS_DATA from './projects.json';

const PROJECTS_DATA = [
  {
    "id": 1,
    "title": "AI Underwriting Assistant",
    "category": "insurance",
    "subCategory": "ml",
    "description": "Automated risk assessment tool using Random Forest to predict insurance claim probability based on demographics.",
    "tech": ["Python", "Scikit-Learn", "FastAPI"],
    "links": {
      "github": "https://github.com/your-username/ai-underwriting",
      "colab": "https://colab.research.google.com/drive/your-notebook-id",
      "demo": "https://your-demo-link.com"
    }
  },
  {
    "id": 2,
    "title": "Algorithmic Trading Bot",
    "category": "finance",
    "subCategory": "software",
    "description": "High-frequency trading bot implementing moving average crossover strategies and backtesting engine.",
    "tech": ["Python", "Pandas", "Docker"],
    "links": {
      "github": "https://github.com/your-username/algo-trading-bot",
      "demo": null
    }
  },
  {
    "id": 3,
    "title": "NeoBank Dashboard",
    "category": "web",
    "subCategory": "finance",
    "description": "Responsive banking dashboard for visualizing spending habits, managing virtual cards, and P2P transfers.",
    "image": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000",
    "tech": ["React", "Tailwind", "Node.js"],
    "links": {
      "github": "https://github.com/your-username/neobank-dashboard",
      "demo": "https://neobank-demo.vercel.app"
    }
  },
  {
    "id": 4,
    "title": "Customer Churn Predictor",
    "category": "ml",
    "subCategory": "datascience",
    "description": "EDA and predictive modeling to identify at-risk customers in the telecom sector with visualization.",
    "tech": ["Jupyter", "XGBoost", "Matplotlib"],
    "links": {
      "github": "https://github.com/your-username/churn-predictor",
      "colab": "https://colab.research.google.com/drive/your-notebook-id",
      "demo": null
    }
  },
  {
    "id": 5,
    "title": "Pocket Insure App",
    "category": "app",
    "subCategory": "insurance",
    "description": "Micro-insurance mobile application allowing users to insure items instantly using computer vision.",
    "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    "tech": ["React Native", "Firebase", "TF Lite"],
    "links": {
      "github": "https://github.com/your-username/pocket-insure",
      "demo": "https://play.google.com/store/apps/details?id=com.example.pocketinsure"
    }
  },
  {
    "id": 6,
    "title": "Fraud Detection Engine",
    "category": "finance",
    "subCategory": "ml",
    "description": "Real-time transaction monitoring system detecting anomalies using unsupervised learning.",
    "tech": ["Spark", "Kafka", "Python"],
    "links": {
      "github": "https://github.com/your-username/fraud-detection",
      "colab": "https://colab.research.google.com/drive/your-notebook-id",
      "demo": null
    }
  }
];

const PERSONAL_INFO = {
  name: "Alex Developer",
  role: "Full Stack Engineer & Data Scientist",
  typewriterLines: [
    "Building intelligent financial solutions.",
    "Bridging the gap between ML and App Dev.",
    "Specializing in InsurTech & Algo Trading.",
    "Open to solving complex problems."
  ],
  socials: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    email: "mailto:hello@example.com"
  }
};

const CATEGORIES = [
  { id: 'all', label: 'All Projects', icon: Layers },
  { id: 'ml', label: 'Machine Learning', icon: Cpu },
  { id: 'finance', label: 'Finance', icon: TrendingUp },
  { id: 'insurance', label: 'Insurance', icon: Shield },
  { id: 'web', label: 'Web Dev', icon: Globe },
  { id: 'app', label: 'App Dev', icon: Smartphone },
];

// --- COMPONENTS ---

const Typewriter = ({ lines }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % lines.length;
      const fullText = lines[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 100);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, lines]);

  return (
    <span className="border-r-2 border-blue-500 pr-1 animate-pulse">
      {text}
    </span>
  );
};

const StatCard = ({ label, value, icon: Icon, delay }) => (
  <div 
    className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4 animate-in slide-in-from-bottom-4 duration-700 fill-mode-both"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
      <Icon size={24} />
    </div>
    <div>
      <div className="text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
      <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{label}</div>
    </div>
  </div>
);

const ProjectCard = ({ project }) => (
  <div className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-200 dark:border-slate-700 h-full flex flex-col overflow-hidden animate-in fade-in zoom-in duration-500">
    {/* Gradient Glow on Hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    {/* Optional Screenshot Image */}
    {project.image && (
      <div className="relative z-10 h-48 w-full overflow-hidden border-b border-slate-100 dark:border-slate-700 bg-slate-100 dark:bg-slate-700">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    )}
    
    <div className="relative z-10 flex flex-col flex-grow p-6">
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full 
          ${project.category === 'finance' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300' : 
            project.category === 'insurance' ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300' : 
            'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300'}`}>
          {project.category}
        </span>
        <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-full text-slate-500 dark:text-slate-300">
           {project.subCategory === 'ml' && <Cpu size={18} />}
           {project.subCategory === 'datascience' && <Database size={18} />}
           {project.subCategory === 'web' && <Globe size={18} />}
           {project.subCategory === 'app' && <Smartphone size={18} />}
           {project.subCategory === 'software' && <Terminal size={18} />}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {project.title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed flex-grow">
        {project.description}
      </p>

      <div className="mt-auto pt-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t, i) => (
            <span key={i} className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 px-2 py-1 rounded border border-slate-100 dark:border-slate-600">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex gap-3">
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors" title="View Code">
                <Github size={18} />
              </a>
            )}
            {project.links.demo && (
              <a href={project.links.demo} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors" title="Live Demo">
                <ExternalLink size={18} />
              </a>
            )}
          </div>

          {project.links.colab && (
            <a 
              href={project.links.colab} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:hover:bg-orange-900/30 px-3 py-1.5 rounded-full transition-colors"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Colaboratory_SVG_Logo.svg" alt="Colab" className="w-4 h-4" />
              <span>Colab</span>
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [viewState, setViewState] = useState('landing'); // 'landing', 'transitioning', 'dashboard'
  const [activeCategory, setActiveCategory] = useState('all');

  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleEnterDashboard = () => {
    setViewState('transitioning');
    
    // Display the "Thinking of hiring me?" message for 2.2 seconds before showing dashboard
    setTimeout(() => {
      setViewState('dashboard');
    }, 2200);
  };

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
  };

  const filteredProjects = activeCategory === 'all' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === activeCategory || p.subCategory === activeCategory);

  // Stats Logic
  const totalProjects = PROJECTS_DATA.length;
  const totalCategories = CATEGORIES.length - 1; // Subtract 'All'
  const technologiesKnown = "20+";

  // --- Landing Screen ---
  if (viewState === 'landing') {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 relative
        ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}
      `}>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:scale-110 transition-transform"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="max-w-2xl px-6 text-center animate-in fade-in zoom-in duration-700">
          <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-4xl font-bold text-white mb-8 shadow-lg shadow-blue-500/30">
            AD
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Hi, I'm {PERSONAL_INFO.name}
          </h1>
          <div className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 h-20 mb-8 font-light flex items-center justify-center">
            <Typewriter lines={PERSONAL_INFO.typewriterLines} />
          </div>
          
          <button 
            onClick={handleEnterDashboard}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-slate-900 dark:bg-blue-600 font-lg rounded-full hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
          >
            Explore Portfolio
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </button>
        </div>
      </div>
    );
  }

  // --- Transition Screen ---
  if (viewState === 'transitioning') {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500
        ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}
      `}>
        <div className="animate-in fade-in zoom-in duration-500 text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-6 leading-tight">
            "Thinking of hiring me?"
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 animate-pulse font-medium">
            I hope I'll convince you.
          </p>
        </div>
      </div>
    );
  }

  // --- Dashboard Screen ---
  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans selection:bg-blue-200 dark:selection:bg-blue-900
      ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}
    `}>
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight flex items-center gap-2 cursor-pointer" onClick={() => setViewState('landing')}>
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            {PERSONAL_INFO.name}
          </span>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-4 pr-4 border-r border-slate-200 dark:border-slate-700">
              <a href={PERSONAL_INFO.socials.github} className="hover:text-blue-600 transition-colors"><Github size={20} /></a>
              <a href={PERSONAL_INFO.socials.linkedin} className="hover:text-blue-600 transition-colors"><Linkedin size={20} /></a>
              <a href={PERSONAL_INFO.socials.email} className="hover:text-blue-600 transition-colors"><Mail size={20} /></a>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[calc(100vh-64px)]">
        
        {/* Intro & Stats */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold mb-8 animate-in slide-in-from-bottom-2 duration-700">
            My <span className="text-blue-600 dark:text-blue-400">Dashboard</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatCard label="Total Projects" value={totalProjects} icon={Briefcase} delay={100} />
            <StatCard label="Domains" value={totalCategories} icon={Layers} delay={200} />
            <StatCard label="Technologies" value={technologiesKnown} icon={Zap} delay={300} />
          </div>

          <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400 animate-in slide-in-from-bottom-6 duration-700 delay-300">
            A centralized showcase of my work across Machine Learning, Financial Tech, and Application Development.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 overflow-x-auto pb-2 animate-in slide-in-from-bottom-8 duration-700 delay-500">
          <div className="flex gap-2 w-max">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                    ${isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105' 
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500'
                    }`}
                >
                  <Icon size={16} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="relative min-h-[400px]">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20 animate-in fade-in duration-300">
              <div className="inline-flex p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                <Layers size={32} className="text-slate-400" />
              </div>
              <p className="text-slate-500">No projects found in this category.</p>
            </div>
          )}
        </div>

      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} {PERSONAL_INFO.name}. Open for opportunities in FinTech & Insurance.</p>
        </div>
      </footer>

    </div>
  );
};

export default App;