// PORTFOLIO DATABASE
// ----------------------------------------------------
// HOW TO UPDATE YOUR PORTFOLIO:
// 1. IMAGE: Copy your image files into the 'assets/image/' folder.
// 2. PATH: Update the 'image' paths below to match your file name (e.g., 'assets/image/my-project.jpg').
// 3. TEXT: Change the text inside the quotes "" for titles and descriptions.
// ----------------------------------------------------

window.portfolioData = [
  {
    id: 1,
    // Part 1: Grid/Desktop View
    desktop: {
      title: "solar-volt",
      image: "assets/image/home-01.png", // Thumbnail image
      category: "Web Development"
    },
    // Part 2: Popup/Full View
    popup: {
      title: "solar-volt", // Can be more detailed if needed
      description: "Solar-volt is a responsive web application designed to provide users with real-time information about solar energy solutions. The design focuses on clean aesthetics and user-friendly navigation, making it easy for visitors to explore solar energy options and learn about the benefits of renewable energy.",
      fullImage: "assets/image/fullpage-01.png", // Full scrolling image
      link: "https://solar-volt.netlify.app/"
    }
  },
  {
    id: 2,
    desktop: {
      title: "Toue",
      image: "assets/image/home-02.png",
      category: "Web Design"
    },
    popup: {
      title: "Toue",
      description: "Toue is a travel website design project that focuses on providing users with an immersive and visually appealing experience. The design features stunning imagery, intuitive navigation, and clear calls to action to encourage users to explore travel destinations and book their next adventure.",
      fullImage: "assets/image/fullpage-02.png",
      link: "https://tour-v01.netlify.app/"
    }
  },
  {
    id: 3,
    desktop: {
      title: "Neon-Eclipse-Band",
      image: "assets/image/home-03.png",
      category: "Web Design"
    },
    popup: {
      title: "Neon-Eclipse-Band",
      description: "Neon-Eclipse-Band is a marketing landing page designed to promote a music band. The design features vibrant colors, dynamic typography, and engaging visuals to capture the essence of the band's style and attract fans. The layout includes sections for music samples, tour dates, and merchandise, making it easy for visitors to connect with the band and stay updated on their latest news.",
      fullImage: "assets/image/fullpage-03.png",
      link: "https://neon-eclipse-band.netlify.app/"
    }
  },
  {
    id: 4,
    desktop: {
      title: "Smart-Hotel",
      image: "assets/image/home-04.png",
      category: "Web Design"
    },
    popup: {
      title: "Smart-Hotel",
      description: "Smart-Hotel is a web design project focused on creating a modern and user-friendly interface for a hotel booking platform. The design emphasizes simplicity and functionality, with a clean layout and intuitive navigation.",
      fullImage: "assets/image/fullpage-04.png",
      link: "https://smart-hotel01.netlify.app/"
    }
  },
  {
    id: 5,
    desktop: {
      title: "VoldMaster",
      image: "assets/image/home-05.png",
      category: "Personal Website Design"
    },
    popup: {
      title: "VoldMaster",
      description: "VoldMaster is a personal website design project that showcases the individual's portfolio, skills, and contact information. The design features a minimalist aesthetic with a focus on typography and clean lines, creating a professional and approachable online presence.",
      fullImage: "assets/image/fullpage-05.png",
      link: "https://electrician-01.netlify.app/"
    }
  },
  {
    id: 6,
    desktop: {
      title: "Hospitality Website",
      image: "assets/image/home-06.png",
      category: "Medical Shop Website Design"
    },
    popup: {
      title: "Hospitality Website",
      description: "This project is a medical shop website design that focuses on providing users with an easy and efficient way to browse and purchase medical products online. The design features a clean and organized layout, with clear product categories and a user-friendly shopping cart system. The website also includes informative product descriptions and customer reviews to help users make informed purchasing decisions.",
      fullImage: "assets/image/fullpage-06.png",
      link: "https://hospital-01.netlify.app/"
    }
  },
  {
    id: 7,
    desktop: {
      title: "WebVishion",
      image: "assets/image/home-07.png",
      category: "WebVision Landing Design"
    },
    popup: {
      title: "WebVishion",
      description: "WebVishion is a landing page design project that focuses on creating a visually striking and engaging experience for visitors. The design features bold typography, vibrant colors, and dynamic visuals to capture the attention of users and encourage them to explore the website further. The layout includes sections for showcasing products or services, customer testimonials, and clear calls to action to drive conversions.",
      fullImage: "assets/image/fullpage-07.png",
      link: "https://webvision05-akram.netlify.app/"
    }
  }
];
