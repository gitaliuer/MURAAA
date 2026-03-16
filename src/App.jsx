import { useState, useEffect } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import About from './pages/About'
import SettingsModal from './components/SettingsModal'

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKeys, setApiKeys] = useState({ voicer: '' });

  // Load API keys from localStorage on mount
  useEffect(() => {
    const savedKeys = localStorage.getItem('muraApiKeys');
    if (savedKeys) {
      try {
        setApiKeys(JSON.parse(savedKeys));
      } catch (e) {
        console.error("Error parsing keys", e);
      }
    } else {
        // If no keys saved, pop settings immediately
        setIsSettingsOpen(true);
    }
  }, []);

  // Save API keys to localStorage when they change
  useEffect(() => {
    localStorage.setItem('muraApiKeys', JSON.stringify(apiKeys));
  }, [apiKeys]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home apiKeys={apiKeys} onOpenSettings={() => setIsSettingsOpen(true)} />;
      case 'gallery':
        return <Gallery />;
      case 'about':
        return <About />;
      default:
        return <Home apiKeys={apiKeys} onOpenSettings={() => setIsSettingsOpen(true)} />;
    }
  }

  return (
    <div className="relative min-h-screen bg-dark-900 text-white selection:bg-neon-purple/30 selection:text-white font-sans overflow-x-hidden flex flex-col">
      {/* Abstract Background Elements */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-neon-purple rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none"></div>
      <div className="fixed top-1/3 right-1/4 w-[30rem] h-[30rem] bg-neon-blue rounded-full mix-blend-screen filter blur-[200px] opacity-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-1/3 w-80 h-80 bg-neon-pink rounded-full mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            onOpenSettings={() => setIsSettingsOpen(true)} 
        />

        <main className="flex-1 flex flex-col items-center w-full relative z-10">
          {renderPage()}
        </main>
      </div>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        apiKeys={apiKeys}
        setApiKeys={setApiKeys}
      />
    </div>
  )
}

export default App
