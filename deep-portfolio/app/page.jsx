"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Float, Html, Sparkles, Text } from "@react-three/drei"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import emailjs from "@emailjs/browser"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Code,
  Database,
  Brain,
  Zap,
  Award,
  User,
  ChevronDown,
  Menu,
  X,
  Rocket,
  Globe,
  Cpu,
  Terminal,
  BarChart3,
  TrendingUp,
  PieChart,
  Activity,
} from "lucide-react"
// Removed: import { useActionState } from "react"
// import { sendContactEmail } from "./actions.js" // Import the new server action

// Matrix Rain Effect
function MatrixRain() {
  const count = 200
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50
    positions[i * 3 + 1] = Math.random() * 50 - 25
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50

    // Green matrix colors
    colors[i * 3] = 0.1
    colors[i * 3 + 1] = Math.random() * 0.8 + 0.2
    colors[i * 3 + 2] = 0.1
  }

  const pointsRef = useRef(null)

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] -= 0.1
        if (positions[i * 3 + 1] < -25) {
          positions[i * 3 + 1] = 25
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.8} />
    </points>
  )
}

// Floating Code Blocks
function FloatingCodeBlocks() {
  const codeSnippets = ["function()", "if(true)", "for(i=0)", "class{}", "import", "export", "const", "async"]

  return (
    <group>
      {codeSnippets.map((code, index) => (
        <Float key={index} speed={1 + index * 0.2} rotationIntensity={0.3} floatIntensity={0.5}>
          <Text
            position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 20]}
            fontSize={0.5}
            color="#00ff41"
            font="/fonts/GeistMono_Regular.json"
          >
            {code}
          </Text>
        </Float>
      ))}
    </group>
  )
}

// 3D Computer/Laptop Model
function Computer3D() {
  const meshRef = useRef(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
      <group ref={meshRef}>
        {/* Laptop Base */}
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[3, 0.2, 2]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Laptop Screen */}
        <mesh position={[0, 0.5, -0.9]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[2.8, 1.8, 0.1]} />
          <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Screen Content */}
        <mesh position={[0, 0.5, -0.85]} rotation={[-0.2, 0, 0]}>
          <planeGeometry args={[2.6, 1.6]} />
          <meshBasicMaterial color="#00ff41" transparent opacity={0.8} />
        </mesh>

        {/* Keyboard */}
        <mesh position={[0, -0.35, 0.3]}>
          <boxGeometry args={[2.5, 0.05, 1.2]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
      </group>
    </Float>
  )
}

// 3D Project Showcase
function Project3DShowcase() {
  const projects = [
    {
      title: "Customer Analytics Dashboard",
      description: "Real-time customer behavior analysis using ML algorithms",
      tech: ["Python", "Pandas", "Plotly", "Streamlit"],
      position: [-6, 3, 0],
      color: "#ff6b6b",
      icon: BarChart3,
    },
    {
      title: "Predictive Sales Model",
      description: "Machine learning model for sales forecasting and trend analysis",
      tech: ["Python", "Scikit-learn", "TensorFlow"],
      position: [6, 3, 0],
      color: "#4ecdc4",
      icon: TrendingUp,
    },
    {
      title: "E-Commerce Web Platform",
      description: "Full-stack e-commerce solution with payment integration",
      tech: ["React", "Node.js", "MongoDB"],
      position: [-6, -3, 0],
      color: "#45b7d1",
      icon: Globe,
    },
    {
      title: "Data Visualization Tool",
      description: "Interactive dashboard for complex data visualization",
      tech: ["D3.js", "React", "Python", "Flask"],
      position: [6, -3, 0],
      color: "#f9ca24",
      icon: PieChart,
    },
    {
      title: "AI Recommendation System",
      description: "Personalized recommendation engine using collaborative filtering",
      tech: ["Python", "TensorFlow", "Pandas"],
      position: [0, 0, -4],
      color: "#6c5ce7",
      icon: Brain,
    },
  ]

  const groupRef = useRef(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {projects.map((project, index) => (
        <Float key={project.title} speed={1.5 + index * 0.2} rotationIntensity={0.1} floatIntensity={0.2}>
          <group position={project.position}>
            {/* Project Container */}
            <mesh>
              <boxGeometry args={[3, 4, 0.2]} />
              <meshStandardMaterial
                color={project.color}
                metalness={0.6}
                roughness={0.3}
                emissive={project.color}
                emissiveIntensity={0.1}
              />
            </mesh>

            {/* Project Info */}
            <Html distanceFactor={10} position={[0, 0, 0.2]}>
              <div className="w-64 p-6 bg-black/90 backdrop-blur-sm rounded-lg border border-green-500/30">
                <div className="flex items-center mb-3">
                  <project.icon className="w-6 h-6 text-green-400 mr-2" />
                  <h3 className="font-bold text-lg text-white">{project.title}</h3>
                </div>
                <p className="text-sm text-gray-300 mb-4">{project.description}</p>
                <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View Project
                </Button>
              </div>
            </Html>
          </group>
        </Float>
      ))}
    </group>
  )
}

// Navigation Component (removed theme functionality)
function Navigation({ activeSection, setActiveSection, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const navItems = [
    { id: "home", label: "Home", icon: Terminal },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: Cpu },
    { id: "experience", label: "Experience", icon: Award },
    { id: "contact", label: "Contact", icon: Mail },
  ]

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-green-500/20"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="text-2xl font-bold font-mono"
        >
          <span className="text-green-400">{"<"}</span>
          <span className="text-white">Deep_Menpara</span>
          <span className="text-green-400">{"/>"}</span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium font-mono transition-all duration-300 ${
                activeSection === item.id
                  ? "bg-green-500/20 text-green-400 shadow-lg shadow-green-500/25"
                  : "text-gray-400 hover:text-green-400 hover:bg-green-500/10"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </motion.button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full bg-green-500/10 backdrop-blur-sm border border-green-500/20"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-green-400" />
              ) : (
                <Menu className="h-5 w-5 text-green-400" />
              )}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-xl border-t border-green-500/20"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-3 w-full text-left px-4 py-3 rounded-lg text-sm font-medium font-mono transition-all ${
                    activeSection === item.id
                      ? "bg-green-500/20 text-green-400"
                      : "text-gray-400 hover:text-green-400 hover:bg-green-500/10"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// Enhanced Hero Section
function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -200])

  return (
    <section id="home" className="min-h-screen relative overflow-hidden bg-black">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={0.8} color="#00ff41" />
            <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} color="#00ff41" />

            <MatrixRain />
            <FloatingCodeBlocks />

            <group position={[8, 0, -5]}>
              <Computer3D />
            </group>

            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Overlay */}
      <motion.div style={{ y }} className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <Badge
                  variant="secondary"
                  className="mb-6 bg-green-500/20 text-green-300 border-green-500/30 font-mono"
                >
                  <Terminal className="w-3 h-3 mr-1" />
                  print("Hello, Data World!")
                </Badge>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-4"
              >
                <h1 className="text-4xl md:text-7xl font-bold leading-tight font-mono">
                  <span className="block text-green-400">{">_"}Deep Menpara</span>
                  <span className="block text-2xl md:text-4xl mt-4 text-gray-300">Data Analyst Enthusiast</span>
                </h1>

                <div className="text-lg font-mono text-green-300 space-y-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1, duration: 2 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    <span className="text-gray-400">const</span> <span className="text-blue-400">expertise</span> = [
                    <span className="text-yellow-300">"Data Science"</span>,
                    <span className="text-yellow-300">"AI/ML"</span>,
                    <span className="text-yellow-300">"Analytics"</span>
                    ];
                  </motion.div>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl text-gray-300 max-w-2xl leading-relaxed"
              >
                4th year Information Technology student learned Data Analytics, Machine Learning, and Web Development.
                Transforming raw data into actionable insights and building intelligent solutions.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a href="/daa-1.pdf" download>
                    <Button
                      size="lg"
                      className="group bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 font-mono"
                    >
                      <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                      Download Resume
                    </Button>
                  </a>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-black/50 backdrop-blur-sm border-green-500/30 hover:bg-green-500/10 text-green-400 font-mono"
                    onClick={() => {
                      const element = document.getElementById("projects")
                      if (element) element.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Projects
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex justify-center space-x-6"
              >
                {[
                  { icon: Github, href: "https://github.com/Deep7133", color: "hover:text-gray-400" },
                  {
                    icon: Linkedin,
                    href: "https://www.linkedin.com/in/deep-menpara-628617326/",
                    color: "hover:text-blue-400",
                  },
                  { icon: Mail, href: "mailto:deepmenpara9@gmail.com", color: "hover:text-green-400" },
                ].map((social, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.2, y: -5 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`rounded-full bg-black/50 backdrop-blur-sm border border-green-500/20 ${social.color} transition-colors`}
                      asChild
                    >
                      <a href={social.href} target="_blank" rel="noopener noreferrer">
                        <social.icon className="w-5 h-5" />
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Terminal Window */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="hidden lg:block"
            >
              <div className="bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-lg overflow-hidden">
                <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm font-mono ml-4">terminal</span>
                </div>
                <div className="p-6 font-mono text-sm space-y-2">
                  <div className="text-green-400">$ whoami</div>
                  <div className="text-white">Deep Menpara - IT Student</div>
                  <div className="text-green-400">$ cat academic_info.txt</div>
                  <div className="text-blue-400">CGPA: 7.6/10.0 | Year: 4th | Major: Information Technology</div>
                  <div className="text-green-400">$ ls specializations/</div>
                  <div className="text-yellow-300">data-science/ web-development/ analytics/ ai-ml/</div>
                  <div className="text-green-400">$ python -c "print('Building the future with data')"</div>
                  <div className="text-gray-300">Building the future with data</div>
                  <div className="text-green-400">$ npm run analyze-data</div>
                  <div className="text-yellow-300">Analyzing... ████████████ 100%</div>
                  <div className="text-green-400 animate-pulse">█</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <ChevronDown className="w-6 h-6 text-green-400" />
      </motion.div>
    </section>
  )
}

// Enhanced Skills Section with Static Grid Layout
function SkillsSection() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: ["Python", "JavaScript"],
      color: "from-green-400 to-blue-400",
      description: "Core programming languages for development",
    },
    {
      title: "Data Science & Analytics",
      icon: BarChart3,
      skills: ["Pandas", "NumPy", "Matplotlib"],
      color: "from-blue-400 to-purple-400",
      description: "Data manipulation and statistical analysis",
    },
    {
      title: "Web Development",
      icon: Globe,
      skills: ["React", "Node.js", "Express.js", "HTML/CSS"],
      color: "from-purple-400 to-pink-400",
      description: "Modern web applications and interfaces",
    },
    {
      title: "Database & Backend",
      icon: Database,
      skills: ["SQL", "MongoDB", "MySQL"],
      color: "from-pink-400 to-red-400",
      description: "Data storage and backend services",
    },
    {
      title: "Data Visualization & Tools",
      icon: PieChart,
      skills: ["Power BI"],
      color: "from-red-400 to-orange-400",
      description: "Creating insights through visualization",
    },
  ]

  return (
    <section id="skills" className="py-20 relative bg-black">
      {/* Static Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-blue-500/20 to-purple-500/20" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #00ff41 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #0066ff 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 bg-green-500/20 text-green-300 border-green-500/30 font-mono">
            <Activity className="w-3 h-3 mr-1" />
            Technical Skills
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-mono">
            <span className="text-green-400">{"<"}</span>
            <span className="text-white">Skills</span>
            <span className="text-green-400">{" />"}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive skill set in Data Science, Machine Learning, and Modern Web Development
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <Card className="h-full bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm border-green-500/20 group-hover:border-green-500/40 transition-all duration-300 overflow-hidden">
                <CardHeader className="relative">
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                    <div className={`w-full h-full rounded-full bg-gradient-to-r ${category.color}`} />
                  </div>
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <category.icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-mono text-green-400 group-hover:text-green-300 transition-colors">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-sm">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: skillIndex * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ x: 5 }}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-green-500/5 to-blue-500/5 border border-green-500/10 hover:border-green-500/30 transition-all duration-300 group/skill"
                      >
                        <div
                          className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color} group-hover/skill:scale-125 transition-transform duration-300`}
                        />
                        <span className="text-gray-300 font-mono text-sm group-hover/skill:text-white transition-colors duration-300">
                          {skill}
                        </span>
                        <div className="ml-auto opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color} animate-pulse`} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: "Programming Languages", count: "5+", icon: Code },
              // { label: "ML Frameworks", count: "8+", icon: Brain },
              { label: "Web Technologies", count: "10+", icon: Globe },
              { label: "Data Tools", count: "10+", icon: BarChart3 },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-gradient-to-br from-black/60 to-gray-900/60 backdrop-blur-sm rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300"
              >
                <stat.icon className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-green-400 mb-1 font-mono">{stat.count}</div>
                <div className="text-sm text-gray-400 font-mono">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Enhanced Projects Section
function ProjectsSection() {
  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 18], fov: 60 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00ff41" />
            <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} color="#00ff41" />

            <Project3DShowcase />

            <Environment preset="night" />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.1} />
          </Suspense>
        </Canvas>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30 font-mono">
            <Rocket className="w-3 h-3 mr-1" />
            Data Science Projects
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-mono">
            <span className="text-blue-400">{"<"}</span>
            <span className="text-white">Projects</span>
            <span className="text-blue-400">{" />"}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Data-driven projects showcasing expertise in analytics, machine learning, and web development
          </p>
        </motion.div>

        {/* Project Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {[
            { label: "Data Projects", value: "12+", icon: BarChart3 },
            { label: "ML Models", value: "8+", icon: Brain },
            { label: "Web Apps", value: "6+", icon: Globe },
            { label: "Datasets Analyzed", value: "50+", icon: Database },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-black/60 backdrop-blur-sm rounded-lg border border-green-500/20 hover:border-green-500/40 transition-all"
            >
              <stat.icon className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-green-400 mb-1 font-mono">{stat.value}</div>
              <div className="text-sm text-gray-400 font-mono">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-300 mb-8 font-mono">
              Interact with the 3D showcase above to explore my data science projects
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 font-mono"
              asChild
            >
              <a href="https://github.com/Deep7133" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                View All on GitHub
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
// Updated About Section
function AboutSection() {
  return (
    <section id="about" className="py-20 relative overflow-hidden bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30 font-mono">
            <User className="w-3 h-3 mr-1" />
            About Me
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-mono">
            <span className="text-blue-400">{"<"}</span>
            <span className="text-white">Deep Menpara</span>
            <span className="text-blue-400">{" />"}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="bg-black/40 backdrop-blur-sm border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-mono text-green-400">
                  <Brain className="w-6 h-6 mr-3 text-green-400" />
                  Academic Journey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  4th year IT student with a CGPA of 7.6/10.0, aspiring to specialize in Data Science and Machine
                  Learning. Passionate about extracting insights from complex datasets and building intelligent systems
                  that solve real-world problems.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-sm border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-mono text-yellow-400">
                  <Zap className="w-6 h-6 mr-3 text-yellow-400" />
                  Technical Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  Proficient in Python, machine learning algorithms, data visualization, and modern web technologies.
                  Experienced in transforming raw data into actionable business insights through statistical analysis
                  and predictive modeling.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "CGPA", value: "7.6/10.0" },
                { label: "Year", value: "4th Year" },
                { label: "Projects", value: "5+" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 bg-black/40 backdrop-blur-sm rounded-lg border border-green-500/20"
                >
                  <div className="text-2xl font-bold text-green-400 mb-1 font-mono">{stat.value}</div>
                  <div className="text-sm text-gray-400 font-mono">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-green-400 font-mono">Current Focus Areas</h3>
              <div className="space-y-4">
                {[
                  { icon: BarChart3, title: "Data Analytics", desc: "Statistical analysis and data interpretation" },
                  { icon: TrendingUp, title: "Data Science", desc: "End-to-end data science workflows" },
                  { icon: Brain, title: "Machine Learning", desc: "Predictive modeling and AI algorithms" },
                  { icon: Globe, title: "Web Development", desc: "Full-stack web applications" },
                ].map((focus, index) => (
                  <motion.div
                    key={focus.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <focus.icon className="w-5 h-5 text-green-400 mt-1" />
                    <div>
                      <h4 className="font-medium text-white font-mono">{focus.title}</h4>
                      <p className="text-sm text-gray-400">{focus.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Updated Experience Section
function ExperienceSection() {
  const experiences = [
    {
      title: "Data Analytics Trainee",
      company: "MedTourEasy (Remote)",
      period: "Jan 2025 – Feb 2025",
      description:
        "Completed 4-week data analytics program under expert mentorship."+
        "Worked on a comparative study analyzing death age difference by handedness."+
        " Performed data cleaning, statistical analysis, and presented findings. Appreciated for diligence, punctuality, and curiosity.",
    },
    {
      title: "Drone Technology: Fundamentals and Applications",
      company: "S.V. National Institute of Technology (SVNIT), Surat",
      period: "15–19 July 2024",
      description:
        "Learned drone design and types (fixed-wing, multi-rotor, hybrid). Explored drone applications in agriculture, surveillance, disaster relief, and logistics. Understood future scope of drones through hands-on demos and expert sessions.",
    },
  ];

  return (
    <section id="experience" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 bg-orange-500/20 text-orange-300 border-orange-500/30 font-mono">
            <Award className="w-3 h-3 mr-1" />
            Professional Journey
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-mono">
            <span className="text-orange-400">{"<"}</span>
            <span className="text-white">Experience</span>
            <span className="text-orange-400">{" />"}</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative mb-12 last:mb-0"
            >
              {/* Timeline Line */}
              {index < experiences.length - 1 && (
                <div className="absolute left-1/2 top-24 w-px h-24 bg-gradient-to-b from-green-500 to-blue-500 transform -translate-x-1/2" />
              )}

              {/* Timeline Dot */}
              <div className="absolute left-1/2 top-6 w-4 h-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full transform -translate-x-1/2 z-10" />

              <motion.div whileHover={{ scale: 1.02 }} className={`${index % 2 === 0 ? "pr-1/2" : "pl-1/2 ml-auto"}`}>
                <Card className="bg-black/40 backdrop-blur-sm border-green-500/20 hover:border-green-500/40 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-green-500/20 text-green-300 font-mono">
                        {exp.period}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-mono text-green-400">{exp.title}</CardTitle>
                    <CardDescription className="text-lg font-medium text-blue-400 font-mono">
                      {exp.company}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{exp.description}</p>
                    {/* <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="text-xs bg-green-500/10 text-green-300 border-green-500/30 font-mono"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div> */}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section (keeping existing but with updated info)
function ContactSection() {
  const formRef = useRef() // Ref for the form element
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState(null) // null, 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    // These IDs come from your EmailJS account
    const serviceId = "service_3y6auwd"
    const templateId = "template_z3vwrog"
    const publicKey = "Q5uD5O4HRR0wDiAMa"

    if (!serviceId || !templateId || !publicKey) {
      setErrorMessage("EmailJS environment variables are not set up correctly.")
      setStatus("error")
      return
    }

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      setStatus("success")
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      }) // Clear form
    } catch (error) {
      console.error("EmailJS Error:", error)
      setStatus("error")
      setErrorMessage(error.text || "Failed to send message. Please try again later.")
    }
  }

  useEffect(() => {
    if (status === "success") {
      alert("Message sent successfully!")
    } else if (status === "error") {
      alert(`Failed to send message: ${errorMessage}`)
    }
  }, [status, errorMessage])

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ff41" />
            <Sparkles count={100} scale={[20, 20, 20]} size={2} speed={0.3} color="#00ff41" />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 bg-pink-500/20 text-pink-300 border-pink-500/30 font-mono">
            <Mail className="w-3 h-3 mr-1" />
            Get In Touch
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-mono">
            <span className="text-pink-400">{"<"}</span>
            <span className="text-white">Contact</span>
            <span className="text-pink-400">{" />"}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Let's connect and discuss opportunities in data science, machine learning, internships, or collaboration on
            exciting projects.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card className="bg-black/60 backdrop-blur-sm border-green-500/20">
              <CardHeader>
                <CardTitle className="text-2xl font-mono text-green-400">Contact Information</CardTitle>
                <CardDescription>Let's connect and build something amazing together</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "deepmenpara9@gmail.com", color: "text-blue-400" },
                  { icon: Phone, label: "Phone", value: "+91 8160502805", color: "text-green-400" },
                  { icon: MapPin, label: "Location", value: "Gujarat, India", color: "text-red-400" },
                ].map((contact, index) => (
                  <motion.div
                    key={contact.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4"
                  >
                    <div
                      className={`w-12 h-12 rounded-full bg-black/50 flex items-center justify-center ${contact.color}`}
                    >
                      <contact.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-white font-mono">{contact.label}</div>
                      <div className="text-gray-400 font-mono">{contact.value}</div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Github, href: "https://github.com/Deep7133", color: "hover:text-gray-400" },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/deep-menpara-628617326/",
                  color: "hover:text-blue-400",
                },
                { icon: Mail, href: "mailto:deepmenpara9@gmail.com", color: "hover:text-green-400" },
              ].map((social, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className={`w-full bg-black/50 backdrop-blur-sm border-green-500/20 ${social.color} transition-colors`}
                    asChild
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                      <social.icon className="w-5 h-5" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-black/60 backdrop-blur-sm border-green-500/20">
              <CardHeader>
                <CardTitle className="text-2xl font-mono text-green-400">Send a Message</CardTitle>
                <CardDescription>I'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium text-gray-300 font-mono">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName" // Important: name attribute matches EmailJS template variable
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black/50 border border-green-500/20 rounded-lg focus:border-green-500 focus:outline-none transition-colors text-white font-mono"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium text-gray-300 font-mono">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName" // Important: name attribute matches EmailJS template variable
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black/50 border border-green-500/20 rounded-lg focus:border-green-500 focus:outline-none transition-colors text-white font-mono"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300 font-mono">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email" // Important: name attribute matches EmailJS template variable
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/50 border border-green-500/20 rounded-lg focus:border-green-500 focus:outline-none transition-colors text-white font-mono"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-300 font-mono">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject" // Important: name attribute matches EmailJS template variable
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/50 border border-green-500/20 rounded-lg focus:border-green-500 focus:outline-none transition-colors text-white font-mono"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-300 font-mono">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message" // Important: name attribute matches EmailJS template variable
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/50 border border-green-500/20 rounded-lg focus:border-green-500 focus:outline-none transition-colors resize-none text-white font-mono"
                      required
                    />
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white py-3 font-mono"
                    >
                      {status === "loading" ? "Sending..." : "Send Message"}
                      <Mail className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                  {status === "success" && (
                    <p className="text-green-400 text-center mt-4">Message sent successfully!</p>
                  )}
                  {status === "error" && <p className="text-red-400 text-center mt-4">Error: {errorMessage}</p>}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-12 border-t border-green-500/20 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center m d:text-left mb-6 md:mb-0"
          >
            <div className="text-2xl font-bold font-mono mb-2">
              <span className="text-green-400">{"<"}</span>
              <span className="text-white">Deep_Menpara</span>
              <span className="text-green-400">{"/>"}</span>
            </div>
            <div className="text-sm text-gray-400 font-mono">
              © 2025 All rights reserved. Built with passion for data Analytics & web-development.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex space-x-4"
          >
            {[
              { icon: Github, href: "https://github.com/Deep7133" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/deep-menpara-628617326/" },
              { icon: Mail, href: "mailto:deepmenpara9@gmail.com" },
            ].map((social, index) => (
              <motion.div key={index} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-black/50 backdrop-blur-sm border border-green-500/20 hover:bg-green-500/10 transition-colors"
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="w-4 h-4 text-green-400" />
                  </a>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

// Main Portfolio Component
export default function Portfolio3D() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "experience", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
