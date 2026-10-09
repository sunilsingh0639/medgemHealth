export interface Testimonial {
  id: number;
  name: string;
  country: string;
  treatment: string;
  avatar: string;
  text: string;
  rating: number;
  note: string;
}

export const testimonials: Testimonial[] = [
  { id: 1, name: 'James Okonkwo', country: 'Nigeria', treatment: 'Cardiac Surgery', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', text: 'The assistance I received in coordinating my cardiac procedure was exceptional. Every step was handled professionally and I felt supported throughout my entire journey.', rating: 5, note: '(Illustrative demo testimonial)' },
  { id: 2, name: 'Amira Hassan', country: 'Egypt', treatment: 'IVF Treatment', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80', text: 'Finding the right fertility specialist felt overwhelming until I connected with Medgem. The team helped me navigate my options and I felt genuinely cared for.', rating: 5, note: '(Illustrative demo testimonial)' },
  { id: 3, name: 'Robert Chen', country: 'Canada', treatment: 'Knee Replacement', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', text: 'The coordination of my knee replacement in India was seamless. The hospital was world-class and the support before and after my procedure was outstanding.', rating: 5, note: '(Illustrative demo testimonial)' },
  { id: 4, name: 'Fatou Diallo', country: 'Senegal', treatment: 'Cancer Treatment', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80', text: 'Medgem helped me access specialist oncology care that was not available locally. The team was compassionate and guided me through a very difficult time.', rating: 5, note: '(Illustrative demo testimonial)' },
  { id: 5, name: 'Mohammed Al-Farsi', country: 'Oman', treatment: 'Neurosurgery', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80', text: 'The second opinion service helped me make a more informed decision about my treatment. I am grateful for the professional and caring support I received.', rating: 5, note: '(Illustrative demo testimonial)' },
  { id: 6, name: 'Elena Petrova', country: 'Russia', treatment: 'Cosmetic Surgery', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80', text: 'From the initial consultation to my recovery, the entire experience was handled with professionalism and warmth. I would highly recommend Medgem to anyone.', rating: 5, note: '(Illustrative demo testimonial)' },
];
