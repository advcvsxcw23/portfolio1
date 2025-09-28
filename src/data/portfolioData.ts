export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'ai-cv' | 'web-dev' | 'other';
  skills: string[];
  image: string;
  liveDemo?: string;
  github?: string;
  featured?: boolean;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  icon: string;
  link?: string;
}

export interface Research {
  id: string;
  title: string;
  abstract: string;
  year: string;
  conference: string;
  link?: string;
}

export const projects: Project[] = [
  {
    id: 'face-recognition',
    title: 'Face Recognition System',
    description: 'Developed a real-time face detection and recognition system using Python, OpenCV, and the face_recognition library. CS50x Final Project demonstrating practical application of computer vision.',
    category: 'ai-cv',
    skills: ['Python', 'OpenCV', 'face_recognition', 'Computer Vision'],
    image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: 'https://github.com/AlBaraa-1/cs50x-2024-projects/tree/main/Final%20Project',
    featured: true
  },
  {
    id: 'ai-text-summarizer',
    title: 'AI Text Summarizer',
    description: 'Engineered a Python command-line tool for text and PDF summarization, leveraging advanced Hugging Face AI models. CS50p Final Project showcasing NLP capabilities.',
    category: 'ai-cv',
    skills: ['Python', 'Hugging Face', 'NLP', 'PDF Processing'],
    image: '/assets/images/ai-text-summarizer.png',
    github: 'https://github.com/AlBaraa-1',
    featured: true
  },
  {
    id: 'athkar-website',
    title: 'Athkar Website',
    description: 'Developed a responsive Islamic Athkar application using HTML, CSS, and JavaScript. Features a clean interface for accessing Islamic daily remembrances.',
    category: 'web-dev',
    skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    image: '/assets/images/athkar-website.png',
    github: 'https://github.com/AlBaraa-1/athkar_applacation',
    liveDemo: 'https://albaraa-1.github.io/athkar_applacation/'
  },
  {
    id: 'color-detection',
    title: 'Color Detection with OpenCV',
    description: 'A real-time color detection system using OpenCV and Python, featuring webcam integration, HSV color space processing, and dynamic mask creation. The system can detect specific colors (yellow by default) in video streams, draw bounding boxes around detected regions, and display both original and masked views simultaneously.',
    category: 'ai-cv',
    skills: ['Python', 'OpenCV', 'NumPy', 'Computer Vision', 'Real-time Processing', 'HSV Color Space'],
    image: '/assets/images/color-detection.png',
    github: 'https://github.com/AlBaraa-1/Computer-vision/tree/main/color_detection',
    featured: true
  }
];

export const certifications: Certification[] = [
  {
    id: 'cs50x',
    title: 'CS50x: Introduction to Computer Science',
    issuer: 'Harvard University',
    date: '2024',
    description: 'Comprehensive introduction to computer science and programming',
    icon: '🎓',
    link: 'https://drive.google.com/file/d/1Zt7eW_svaZ7Z-8kulvW4DFfonvnhtioF/view?usp=sharing'
  },
  {
    id: 'cs50p',
    title: 'CS50P: Introduction to Programming with Python',
    issuer: 'Harvard University',
    date: '2024',
    description: 'Advanced Python programming concepts and applications',
    icon: '🐍',
    link: 'https://drive.google.com/file/d/1xibJ02x-gbo93fApiQqpZKWukALjh-Oh/view?usp=sharing'
  },
  {
    id: 'samsung-ai',
    title: 'Samsung Innovation Campus AI Course',
    issuer: 'Samsung',
    date: 'In Progress',
    description: 'Artificial Intelligence and Machine Learning fundamentals (Currently Pursuing)',
    icon: '🤖',
    link: 'https://samsung.com/certificates/albara'
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision Specialization',
    issuer: 'Coursera',
    date: '2023',
    description: 'Advanced computer vision techniques and applications',
    icon: '👁️',
    link: 'https://coursera.org/certificates/albara'
  }
];

export const research: Research[] = [
  {
    id: 'snams2025-ai-edu',
    title: 'The Impact of Artificial Intelligence in Education on Student Learning Outcomes and Teaching Methods',
    abstract: 'This research explores the transformative effects of AI integration in educational settings, analyzing its influence on both student learning outcomes and teaching methodologies. Published in IEEE Proceedings and indexed by Scopus and DBLP, this study contributes significant insights to the field of AI in Education, providing evidence-based recommendations for effective AI implementation in educational environments.',
    year: '2025',
    conference: 'SNAMS 2025 - 12th International Conference on Social Networks Analysis, Management and Security',
    link: 'https://drive.google.com/file/d/1jShKJypgcEJrit4GVvDwrJ8SStJJpRhP/view?usp=sharing'
  }
];