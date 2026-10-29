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

// ── Navigation & Footer types ────────────────────────────────────────────────
export interface NavItemData {
  id: number; label: string; path: string; isHighlight: boolean;
  isVisible: boolean; displayOrder: number; parentId: number | null;
  children: NavItemData[];
}

export interface FooterConfigData {
  id: number; companyDescription: string; ctaLabel: string; ctaUrl: string;
  copyrightText: string; privacyPolicyUrl: string; termsUrl: string;
  cookiePolicyUrl: string; updatedAt: string;
}

export interface FooterLinkData {
  id: number; footerColumnId: number; label: string; url: string;
  isExternal: boolean; isVisible: boolean; displayOrder: number;
}

export interface FooterColumnData {
  id: number; heading: string; displayOrder: number; isVisible: boolean;
  links: FooterLinkData[]; updatedAt: string;
}

export interface PublicFooterData {
  config: FooterConfigData;
  columns: FooterColumnData[];
  settings: SiteSettings;
}

export interface PublicNavData {
  items: NavItemData[];
  ctaLabel: string;
  ctaUrl: string;
}

export const navigationApi = {
  getPublic: () => api.get<ApiResponse<PublicNavData>>('/navigation'),
  getAll: () => api.get<ApiResponse<NavItemData[]>>('/navigation/admin/all'),
  create: (data: Omit<NavItemData, 'id' | 'children'>) =>
    api.post<ApiResponse<NavItemData>>('/navigation', data),
  update: (id: number, data: Omit<NavItemData, 'id' | 'children'>) =>
    api.put<ApiResponse<NavItemData>>(`/navigation/${id}`, data),
  delete: (id: number) => api.delete(`/navigation/${id}`),
};

export const footerApi = {
  getPublic: () => api.get<ApiResponse<PublicFooterData>>('/footer'),
  getConfig: () => api.get<ApiResponse<FooterConfigData>>('/footer/config'),
  updateConfig: (data: FooterConfigData) => api.put<ApiResponse<FooterConfigData>>('/footer/config', data),
  getColumns: () => api.get<ApiResponse<FooterColumnData[]>>('/footer/columns'),
  createColumn: (data: Omit<FooterColumnData, 'id' | 'links' | 'updatedAt'>) =>
    api.post<ApiResponse<FooterColumnData>>('/footer/columns', data),
  updateColumn: (id: number, data: Omit<FooterColumnData, 'id' | 'links' | 'updatedAt'>) =>
    api.put<ApiResponse<FooterColumnData>>(`/footer/columns/${id}`, data),
  deleteColumn: (id: number) => api.delete(`/footer/columns/${id}`),
  createLink: (data: Omit<FooterLinkData, 'id'>) =>
    api.post<ApiResponse<FooterLinkData>>('/footer/links', data),
  updateLink: (id: number, data: Omit<FooterLinkData, 'id'>) =>
    api.put<ApiResponse<FooterLinkData>>(`/footer/links/${id}`, data),
  deleteLink: (id: number) => api.delete(`/footer/links/${id}`),
};

// ── Patient Gallery ──────────────────────────────────────────────────────────
export interface GalleryImage {
  id: number; patientGalleryId: number; url: string; altText: string; caption: string; displayOrder: number;
}
export interface GalleryEntry {
  id: number; patientName: string; treatmentName: string; title: string; description: string;
  location: string; status: string; displayOrder: number; consentGiven: boolean;
  createdAt: string; updatedAt: string; images: GalleryImage[];
}
export type GalleryUpsertRequest = Omit<GalleryEntry, 'id' | 'createdAt' | 'updatedAt' | 'images'>;

export const galleryApi = {
  getPublished: () => api.get<ApiResponse<GalleryEntry[]>>('/gallery'),
  getById: (id: number) => api.get<ApiResponse<GalleryEntry>>(`/gallery/${id}`),
  getAll: () => api.get<ApiResponse<GalleryEntry[]>>('/gallery/admin/all'),
  create: (data: GalleryUpsertRequest) => api.post<ApiResponse<GalleryEntry>>('/gallery', data),
  update: (id: number, data: GalleryUpsertRequest) => api.put<ApiResponse<GalleryEntry>>(`/gallery/${id}`, data),
  delete: (id: number) => api.delete(`/gallery/${id}`),
  uploadImages: (id: number, files: File[]) => {
    const form = new FormData();
    files.forEach(f => form.append('files', f));
    return api.post<ApiResponse<GalleryImage[]>>(`/gallery/${id}/images/upload`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  addImageByUrl: (id: number, data: { url: string; altText: string; caption: string; displayOrder: number }) =>
    api.post<ApiResponse<GalleryImage>>(`/gallery/${id}/images`, { patientGalleryId: id, ...data }),
  updateImage: (imgId: number, data: { patientGalleryId: number; url: string; altText: string; caption: string; displayOrder: number }) =>
    api.put<ApiResponse<GalleryImage>>(`/gallery/images/${imgId}`, data),
  deleteImage: (imgId: number) => api.delete(`/gallery/images/${imgId}`),
};

// ── Patient Stories ──────────────────────────────────────────────────────────
export interface StoryPhoto {
  id: number; patientStoryId: number; url: string; altText: string; caption: string; displayOrder: number;
}
export interface PatientStory {
  id: number; patientName: string; treatment: string; hospital: string; title: string;
  description: string; thumbnailUrl: string; videoUrl: string; videoTitle: string;
  videoProvider: string; isFeatured: boolean; status: string; displayOrder: number;
  consentGiven: boolean; publishedAt: string; createdAt: string; updatedAt: string;
  photos: StoryPhoto[];
}
export type StoryUpsertRequest = Omit<PatientStory, 'id' | 'createdAt' | 'updatedAt' | 'photos'>;

export const storiesApi = {
  getPublished: () => api.get<ApiResponse<PatientStory[]>>('/stories'),
  getFeatured: () => api.get<ApiResponse<PatientStory[]>>('/stories/featured'),
  getById: (id: number) => api.get<ApiResponse<PatientStory>>(`/stories/${id}`),
  getAll: () => api.get<ApiResponse<PatientStory[]>>('/stories/admin/all'),
  create: (data: StoryUpsertRequest) => api.post<ApiResponse<PatientStory>>('/stories', data),
  update: (id: number, data: StoryUpsertRequest) => api.put<ApiResponse<PatientStory>>(`/stories/${id}`, data),
  delete: (id: number) => api.delete(`/stories/${id}`),
  uploadVideo: (id: number, file: File) => {
    const form = new FormData(); form.append('file', file);
    return api.post<ApiResponse<string>>(`/stories/${id}/video/upload`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  uploadThumbnail: (id: number, file: File) => {
    const form = new FormData(); form.append('file', file);
    return api.post<ApiResponse<string>>(`/stories/${id}/thumbnail/upload`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  uploadPhotos: (id: number, files: File[]) => {
    const form = new FormData();
    files.forEach(f => form.append('files', f));
    return api.post<ApiResponse<StoryPhoto[]>>(`/stories/${id}/photos/upload`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  addPhotoByUrl: (id: number, data: { url: string; altText: string; caption: string; displayOrder: number }) =>
    api.post<ApiResponse<StoryPhoto>>(`/stories/${id}/photos`, { patientStoryId: id, ...data }),
  updatePhoto: (photoId: number, data: { patientStoryId: number; url: string; altText: string; caption: string; displayOrder: number }) =>
    api.put<ApiResponse<StoryPhoto>>(`/stories/photos/${photoId}`, data),
  deletePhoto: (photoId: number) => api.delete(`/stories/photos/${photoId}`),
};
