# Andrew Dryfoos Portfolio

A modern, accessible portfolio website built with Next.js 15, featuring interactive components and a focus on user experience.

## Features

### 🎯 Core Features
- Responsive design optimized for all devices
- Interactive navigation with smooth scrolling
- Dark theme with modern aesthetics
- SEO optimized with metadata configuration
- Interactive sidebar with social links and accessibility options

### 💡 Interactive Elements
- Secret terminal with custom commands
- Accessibility controls including:
  - Font size adjustment
  - High contrast mode
  - Dyslexic font support
- Email interaction options:
  - Direct email client opening
  - Gmail integration
  - Quick copy to clipboard

### 📱 Sections
- Hero section
- About Me
- Projects showcase
- Experience history
- Technical skills grid
- Contact information

## 🛠 Tech Stack

### Core Technologies
- **Next.js 15.0.3** - React framework with App Router
- **React 19 RC** - JavaScript library for user interfaces
- **TypeScript** - Type-safe development
- **Tailwind CSS 3.4** - Utility-first styling
- **Framer Motion 10** - Smooth animations

### 🧩 UI Components & Styling
- **Radix UI** - Headless UI components
  - Dialog
  - Dropdown Menu
  - Navigation Menu
  - Popover
  - Separator
  - Slot
  - Toast
- **Lucide React** - Icon components
- **GSAP** - Advanced animations
- **Class Variance Authority** - Component variants
- **Tailwind Merge** - Utility class merging
- **Tailwind Animate** - Animation utilities

### ⚡ Functionality
- **EmailJS** - Email integration
- **React Hot Toast** - Toast notifications
- **Sharp** - Image optimization
- **Vercel Analytics & Speed Insights** - Performance monitoring

## 📁 Project Structure
```
├── app/
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   ├── globals.css       # Global styles
│   ├── fonts.ts          # Font configurations
│   └── metadata.ts       # SEO configuration
├── components/
│   ├── layout/          
│   │   ├── navbar.tsx    # Navigation
│   │   ├── footer.tsx    # Footer
│   │   └── socialSidebar.tsx # Social links & accessibility
│   ├── sections/         # Page sections
│   └── ui/              # Reusable UI components
├── data/                # Static data
└── public/              # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ (recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/drewfoos/portfolio.git
cd portfolio
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Required environment variables:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

4. Run development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

```bash
npm run dev        # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

## ♿ Accessibility

The portfolio prioritizes accessibility with:
- Dynamic font sizing
- High contrast mode
- Screen reader support
- Keyboard navigation
- ARIA labels
- Semantic HTML structure

## 📈 Performance

Optimized for speed and performance through:
- Next.js App Router
- Image optimization with Sharp
- Analytics integration
- Speed monitoring
- Responsive design

## 📫 Contact

- Email: dryfoosa@gmail.com
- LinkedIn: [andrew-dryfoos](https://www.linkedin.com/in/andrew-dryfoos/)
- GitHub: [@drewfoos](https://github.com/drewfoos)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).