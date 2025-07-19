# Modern Academic Portfolio

A modern, responsive academic portfolio built with React, Vite, and Tailwind CSS. This portfolio showcases research, publications, experience, and achievements in a clean, professional design.

## ✨ Features

- **Modern Design**: Clean, professional layout with gradient backgrounds and smooth animations
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Fixed Navigation**: Direct link access to all pages and proper browser back/forward functionality
- **Interactive Elements**: Hover effects, smooth transitions, and modern UI components
- **Accessibility**: Proper focus states, semantic HTML, and keyboard navigation
- **Performance**: Optimized with Vite for fast loading and development

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   ├── Sidebar.jsx     # Profile sidebar
│   ├── InfoSection.jsx # Content sections
│   └── TextFormatter.jsx # Text formatting utility
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Publications.jsx # Research publications
│   ├── Experience.jsx  # Professional experience
│   ├── Projects.jsx    # Research projects
│   ├── Awards.jsx      # Awards and achievements
│   ├── TeachingAndServices.jsx # Teaching experience
│   └── CV.jsx          # Curriculum vitae
├── database/           # JSON data files
│   ├── about-me.json
│   ├── publications.json
│   ├── experience.json
│   ├── projects.json
│   ├── awards.json
│   ├── teaching.json
│   └── sidebar.json
└── utils/              # Utility functions
```

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#667eea to #764ba2)
- **Secondary**: Purple accents
- **Background**: Light gray gradient
- **Text**: Dark gray for readability

### Typography
- **Primary Font**: Inter (modern, clean)
- **Secondary Font**: Cormorant Garamond (elegant serif)

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Navigation**: Sticky header with active states
- **Timeline**: Visual timeline for experience

## 🔧 Customization

### Adding New Content

1. **Publications**: Edit `src/database/publications.json`
2. **Experience**: Edit `src/database/experience.json`
3. **Projects**: Edit `src/database/projects.json`
4. **Awards**: Edit `src/database/awards.json`
5. **Profile**: Edit `src/database/sidebar.json`

### Styling

The project uses Tailwind CSS for styling. Custom styles can be added in:
- `src/index.css` for global styles
- `tailwind.config.js` for theme customization

### Images

Place images in the `public/` directory and reference them in your JSON files.

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Deploy to GitHub Pages

```bash
npm run deploy
# or
yarn deploy
```

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **React Markdown**: Markdown rendering
- **GitHub Pages**: Hosting platform

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

For questions or support, please open an issue on GitHub.
