import { Navigate, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  LayoutDashboard, Stethoscope, Building2, Users, Globe, MessageSquare,
  HelpCircle, Star, Settings, Image, Home, LogOut, Menu, X, ChevronRight,
  Navigation, Layout
} from 'lucide-react';
import './AdminLayout.css';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Home Page', path: '/admin/homepage', icon: Home },
  { label: 'Treatments', path: '/admin/treatments', icon: Stethoscope },
  { label: 'Hospitals', path: '/admin/hospitals', icon: Building2 },
  { label: 'Doctors', path: '/admin/doctors', icon: Users },
  { label: 'Destinations', path: '/admin/destinations', icon: Globe },
  { label: 'Testimonials', path: '/admin/testimonials', icon: Star },
  { label: 'FAQs', path: '/admin/faqs', icon: HelpCircle },
  { label: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare },
  { label: 'Navigation', path: '/admin/navigation', icon: Navigation },
  { label: 'Footer', path: '/admin/footer', icon: Layout },
  { label: 'Media', path: '/admin/media', icon: Image },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
];

export function AdminGuard() {
  const { user } = useAdminAuth();
  if (!user) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}

export default function AdminLayout() {
  const { user, logout } = useAdminAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar--open' : ''}`}>
        <div className="admin-sidebar__header">
          <div className="admin-logo">
            <span className="admin-logo__gem">M</span>
            <div>
              <span className="admin-logo__name">Medgem</span>
              <span className="admin-logo__sub">Admin Panel</span>
            </div>
          </div>
          <button className="admin-sidebar__close" onClick={() => setSidebarOpen(false)}><X size={18} /></button>
        </div>
        <nav className="admin-nav">
          {navItems.map(({ label, path, icon: Icon }) => (
            <Link key={path} to={path}
              className={`admin-nav__item ${location.pathname === path ? 'admin-nav__item--active' : ''}`}
              onClick={() => setSidebarOpen(false)}>
              <Icon size={18} />
              <span>{label}</span>
              {location.pathname === path && <ChevronRight size={14} className="admin-nav__arrow" />}
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar__footer">
          <div className="admin-user">
            <div className="admin-user__avatar">{user?.fullName?.[0] ?? 'A'}</div>
            <div className="admin-user__info">
              <span className="admin-user__name">{user?.fullName}</span>
              <span className="admin-user__role">{user?.role}</span>
            </div>
          </div>
          <button className="admin-logout" onClick={logout}><LogOut size={16} /> Logout</button>
        </div>
      </aside>
      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}
      <div className="admin-main">
        <header className="admin-topbar">
          <button className="admin-hamburger" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
          <span className="admin-topbar__title">
            {navItems.find(n => n.path === location.pathname)?.label ?? 'Admin'}
          </span>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
