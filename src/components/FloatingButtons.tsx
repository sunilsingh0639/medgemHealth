import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, MessageCircle } from 'lucide-react';
import './FloatingButtons.css';

export default function FloatingButtons() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="floating-btns">
      <AnimatePresence>
        {show && (
          <motion.button className="fab fab--top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} whileHover={{ scale: 1.1 }} aria-label="Back to top">
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
      <motion.a href="https://wa.me/10000000000" className="fab fab--whatsapp" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} aria-label="WhatsApp contact">
        <MessageCircle size={22} />
      </motion.a>
    </div>
  );
}
