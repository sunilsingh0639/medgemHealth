import api from './client';

export interface Treatment {
  id: number; title: string; slug: string; category: string; description: string;
  image: string; icon: string; duration: string; destinations: string; tags: string;
  status: string; displayOrder: number; seoTitle: string; seoDescription: string;
  createdAt: string; updatedAt: string;
}

export interface Hospital {
  id: number; name: string; slug: string; city: string; country: string;
  image: string; specialties: string; accreditation: string; description: string;
  beds: number; established: number; rating: number; status: string; displayOrder: number;
  seoTitle: string; seoDescription: string; createdAt: string; updatedAt: string;
}

export interface Destination {
  id: number; country: string; city: string; slug: string; tagline: string;
  description: string; image: string; treatments: string; hospitals: number;
  specialists: number; flag: string; highlights: string; status: string;
  displayOrder: number; seoTitle: string; seoDescription: string;
  createdAt: string; updatedAt: string;
}

export interface Doctor {
  id: number; name: string; slug: string; specialty: string; hospital: string;
  country: string; experience: string; languages: string; image: string;
  education: string; about: string; tags: string; status: string; displayOrder: number;
  seoTitle: string; seoDescription: string; createdAt: string; updatedAt: string;
}

export interface Testimonial {
  id: number; name: string; country: string; treatment: string; avatar: string;
  text: string; rating: number; note: string; status: string; displayOrder: number;
  createdAt: string; updatedAt: string;
}

export interface Faq {
  id: number; question: string; answer: string; category: string;
  status: string; displayOrder: number; createdAt: string; updatedAt: string;
}

export interface Enquiry {
  id: number; name: string; email: string; phoneCode: string; phone: string;
  treatment: string; destination: string; message: string; type: string;
  status: string; internalNotes: string; country: string; description: string;
  diagnosis: string; createdAt: string; updatedAt: string;
}

export interface HomePageContent {
  id: number; heroHeading: string; heroSubheading: string; heroBadgeText: string;
  heroVideoUrl: string; heroPosterUrl: string; heroCtaPrimaryLabel: string;
  heroCtaPrimaryUrl: string; heroCtaSecondaryLabel: string; heroCtaSecondaryUrl: string;
  statPatients: number; statPartners: number; statCountries: number; statSpecialties: number;
  whyHeading: string; whySubheading: string; secondOpinionHeading: string;
  secondOpinionSubheading: string; secondOpinionImage: string;
  contactBannerHeading: string; contactBannerSubheading: string; updatedAt: string;
}

export interface SiteSettings {
  id: number; companyName: string; logoUrl: string; address: string;
  contactEmail: string; contactPhone: string; whatsAppNumber: string;
  facebookUrl: string; twitterUrl: string; instagramUrl: string;
  linkedInUrl: string; youtubeUrl: string; copyrightText: string;
  defaultSeoTitle: string; defaultSeoDescription: string; updatedAt: string;
}

export interface DashboardData {
  totalTreatments: number; publishedTreatments: number; totalHospitals: number;
  totalDoctors: number; totalDestinations: number; totalEnquiries: number;
  newEnquiries: number; recentEnquiries: Enquiry[];
}

export interface PagedResult<T> { items: T[]; total: number; page: number; pageSize: number; }
export interface ApiResponse<T> { success: boolean; message: string; data: T; }

const parseJson = <T>(str: string): T => { try { return JSON.parse(str); } catch { return [] as unknown as T; } };

export const treatmentsApi = {
  getPublished: (category?: string, search?: string) =>
    api.get<ApiResponse<Treatment[]>>('/treatments', { params: { category, search } }),
  getBySlug: (slug: string) => api.get<ApiResponse<Treatment>>(`/treatments/${slug}`),
  getAll: (page = 1, pageSize = 20) =>
    api.get<ApiResponse<PagedResult<Treatment>>>('/treatments/admin/all', { params: { page, pageSize } }),
  create: (data: Omit<Treatment, 'id' | 'createdAt' | 'updatedAt'>) =>
    api.post<ApiResponse<Treatment>>('/treatments', data),
  update: (id: number, data: Omit<Treatment, 'id' | 'createdAt' | 'updatedAt'>) =>
    api.put<ApiResponse<Treatment>>(`/treatments/${id}`, data),
  delete: (id: number) => api.delete(`/treatments/${id}`),
};

export const hospitalsApi = {
  getPublished: (country?: string, search?: string, limit?: number) =>
    api.get<ApiResponse<Hospital[]>>('/hospitals', { params: { country, search, limit } }),
  getBySlug: (slug: string) => api.get<ApiResponse<Hospital>>(`/hospitals/${slug}`),
  getAll: (page = 1, pageSize = 20) =>
    api.get<ApiResponse<PagedResult<Hospital>>>('/hospitals/admin/all', { params: { page, pageSize } }),
  create: (data: Omit<Hospital, 'id' | 'createdAt' | 'updatedAt'>) =>
    api.post<ApiResponse<Hospital>>('/hospitals', data),
  update: (id: number, data: Omit<Hospital, 'id' | 'createdAt' | 'updatedAt'>) =>
    api.put<ApiResponse<Hospital>>(`/hospitals/${id}`, data),
  delete: (id: number) => api.delete(`/hospitals/${id}`),
};

export const destinationsApi = {
  getPublished: () => api.get<ApiResponse<Destination[]>>('/destinations'),
  getBySlug: (slug: string) => api.get<ApiResponse<Destination>>(`/destinations/${slug}`),
  getAll: (page = 1, pageSize = 20) =>
    api.get<ApiResponse<PagedResult<Destination>>>('/destinations/admin/all', { params: { page, pageSize } }),
  create: (data: Omit<Destination, 'id' | 'createdAt' | 'updatedAt'>) =>
    api.post<ApiResponse<Destination>>('/destinations', data),
  update: (id: number, data: Omit<Destination, 'id' | 'createdAt' | 'updatedAt'>) =>
    api.put<ApiResponse<Destination>>(`/destinations/${id}`, data),
  delete: (id: number) => api.delete(`/destinations/${id}`),
};

export const doctorsApi = {
  getPublished: (specialty?: string, country?: string, search?: string, limit?: number) =>
    api.get<ApiResponse<Doctor[]>>('/doctors', { params: { specialty, country, search, limit } }),
  getBySlug: (slug: string) => api.get<ApiResponse<Doctor>>(`/doctors/${slug}`),
  getAll: (page = 1, pageSize = 20) =>
    api.get<ApiResponse<PagedResult<Doctor>>>('/doctors/admin/all', { params: { page, pageSize } }),
  create: (data: Omit<Doctor, 'id' | 'createdAt' | 'updatedAt'>) =>
    api.post<ApiResponse<Doctor>>('/doctors', data),
  update: (id: number, data: Omit<Doctor, 'id' | 'createdAt' | 'updatedAt'>) =>
    api.put<ApiResponse<Doctor>>(`/doctors/${id}`, data),
  delete: (id: number) => api.delete(`/doctors/${id}`),
};

export const testimonialsApi = {
  getPublished: () => api.get<ApiResponse<Testimonial[]>>('/testimonials'),
  getAll: () => api.get<ApiResponse<Testimonial[]>>('/testimonials/admin/all'),
  create: (data: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>) =>
    api.post<ApiResponse<Testimonial>>('/testimonials', data),
  update: (id: number, data: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>) =>
    api.put<ApiResponse<Testimonial>>(`/testimonials/${id}`, data),
  delete: (id: number) => api.delete(`/testimonials/${id}`),
};

export const faqsApi = {
  getPublished: () => api.get<ApiResponse<Faq[]>>('/faqs'),
  getAll: () => api.get<ApiResponse<Faq[]>>('/faqs/admin/all'),
  create: (data: Omit<Faq, 'id' | 'createdAt' | 'updatedAt'>) =>
    api.post<ApiResponse<Faq>>('/faqs', data),
  update: (id: number, data: Omit<Faq, 'id' | 'createdAt' | 'updatedAt'>) =>
    api.put<ApiResponse<Faq>>(`/faqs/${id}`, data),
  delete: (id: number) => api.delete(`/faqs/${id}`),
};

export const enquiriesApi = {
  submitContact: (data: object) => api.post<ApiResponse<null>>('/enquiries/contact', data),
  submitConsultation: (data: object) => api.post<ApiResponse<null>>('/enquiries/consultation', data),
  submitSecondOpinion: (data: object) => api.post<ApiResponse<null>>('/enquiries/second-opinion', data),
  getAll: (params?: object) => api.get<ApiResponse<PagedResult<Enquiry>>>('/enquiries', { params }),
  getById: (id: number) => api.get<ApiResponse<Enquiry>>(`/enquiries/${id}`),
  update: (id: number, data: { status: string; internalNotes: string }) =>
    api.put<ApiResponse<Enquiry>>(`/enquiries/${id}`, data),
};

export const contentApi = {
  getHomePage: () => api.get<ApiResponse<HomePageContent>>('/homepage'),
  updateHomePage: (data: HomePageContent) => api.put<ApiResponse<HomePageContent>>('/homepage', data),
  getSettings: () => api.get<ApiResponse<SiteSettings>>('/settings'),
  updateSettings: (data: SiteSettings) => api.put<ApiResponse<SiteSettings>>('/settings', data),
  getDashboard: () => api.get<ApiResponse<DashboardData>>('/dashboard'),
};

export const authApi = {
  login: (email: string, password: string) =>
    api.post<ApiResponse<{ token: string; email: string; fullName: string; role: string }>>('/auth/login', { email, password }),
};

export const mediaApi = {
  getAll: () => api.get<ApiResponse<{ id: number; fileName: string; originalName: string; url: string; altText: string; caption: string; mimeType: string; fileSize: number; createdAt: string }[]>>('/media'),
  upload: (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return api.post('/media/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  delete: (id: number) => api.delete(`/media/${id}`),
};

export { parseJson };
