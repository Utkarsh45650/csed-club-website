import { motion } from 'framer-motion';
import { Rocket, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';

export default function ComingSoonPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(108,99,255,0.15)_0%,transparent_70%)] rounded-full mix-blend-screen pointer-events-none blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.1)_0%,transparent_70%)] rounded-full mix-blend-screen pointer-events-none blur-3xl" />

      <Container className="relative z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
          className="w-24 h-24 mb-8 bg-gradient-to-br from-[#6C63FF] to-[#00D4FF] rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(0,212,255,0.3)]"
        >
          <Rocket size={48} className="text-white" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6"
        >
          Coming <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#00FFC8]">Soon</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-400 max-w-2xl mb-12"
        >
          We're working hard to bring you this feature. Check back later for updates on membership applications and new opportunities!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button variant="secondary" onClick={() => navigate(-1)} className="flex items-center gap-2">
            <ArrowLeft size={18} />
            Go Back
          </Button>
        </motion.div>
      </Container>
    </div>
  );
}
