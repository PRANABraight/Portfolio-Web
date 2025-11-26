#!/bin/bash
# Script to integrate ProjectModal into ProjectsSection.jsx

# Step 1: Copy the backup to the main file
cp src/components/sections/ProjectsSection.jsx.backup src/components/sections/ProjectsSection.jsx

# Step 2: Add the import on line 8
sed -i '8a import ProjectModal from '"'"'../common/ProjectModal'"'"';' src/components/sections/ProjectsSection.jsx

# Step 3: Add state variables after line 195
sed -i '195a\  const [selectedProject, setSelectedProject] = useState(null);\n  const [isModalOpen, setIsModalOpen] = useState(false);' src/components/sections/ProjectsSection.jsx

# Step 4: Add modal handlers after line 212
sed -i '212a\  const openModal = (project) => {\n    setSelectedProject(project);\n    setIsModalOpen(true);\n    document.body.style.overflow = '"'"'hidden'"'"';\n  };\n\n  const closeModal = () => {\n    setIsModalOpen(false);\n    setTimeout(() => setSelectedProject(null), 300);\n    document.body.style.overflow = '"'"'unset'"'"';\n  };' src/components/sections/ProjectsSection.jsx

# Step 5: Add onClick to ProjectCard (line 255)
sed -i '255a\              onClick={() => openModal(project)}\n              style={{ cursor: '"'"'pointer'"'"' }}' src/components/sections/ProjectsSection.jsx

# Step 6: Add stopPropagation to IconButtons
sed -i 's/aria-label="View on GitHub">/aria-label="View on GitHub"\n                      onClick={(e) => e.stopPropagation()}/g' src/components/sections/ProjectsSection.jsx
sed -i 's/aria-label="View Live Demo">/aria-label="View Live Demo"\n                      onClick={(e) => e.stopPropagation()}/g' src/components/sections/ProjectsSection.jsx

# Step 7: Add ProjectModal component before closing tag (line 283)
sed -i '283i\      <ProjectModal \n        project={selectedProject} \n        isOpen={isModalOpen} \n        onClose={closeModal} \n      />' src/components/sections/ProjectsSection.jsx

echo "Integration complete!"
