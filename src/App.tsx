import { useState } from 'react';
import { Home, Users, ShoppingCart, ClipboardList, User, HelpCircle, Menu, X, MessageCircle } from 'lucide-react';
import { Beranda } from './components/Beranda';
import { DaftarTeknisi } from './components/DaftarTeknisi';
import { DetailTeknisi } from './components/DetailTeknisi';
import { Pemesanan } from './components/Pemesanan';
import { StatusService } from './components/StatusService';
import { AkunSaya } from './components/AkunSaya';
import { Bantuan } from './components/Bantuan';
import { Chat } from './components/Chat';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Logo, LogoText } from './components/Logo';

type Page = 'beranda' | 'teknisi' | 'detail-teknisi' | 'pemesanan' | 'status' | 'akun' | 'bantuan' | 'chat';
type AuthPage = 'login' | 'register';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPage, setAuthPage] = useState<AuthPage>('login');
  const [currentPage, setCurrentPage] = useState<Page>('beranda');
  const [selectedTeknisiId, setSelectedTeknisiId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);

  // Authentication handlers
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
  };

  const handleSwitchToRegister = () => {
    setAuthPage('register');
  };

  const handleSwitchToLogin = () => {
    setAuthPage('login');
  };

  const handleAddOrder = (orderData: any) => {
    const newOrder = {
      id: String(orders.length + 1),
      orderId: `TFS-2025-${String(orders.length + 100).padStart(3, '0')}`,
      teknisi: orderData.teknisi,
      service: `${orderData.service} - ${orderData.deviceBrand} ${orderData.deviceModel}`,
      status: 'waiting',
      orderDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      estimatedCompletion: '-',
      currentStep: 0,
      steps: [
        { 
          name: 'Pesanan Diterima', 
          status: 'current', 
          date: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          note: 'Menunggu konfirmasi teknisi'
        },
        { name: 'Diagnosa', status: 'pending', date: '-' },
        { name: 'Dalam Perbaikan', status: 'pending', date: '-' },
        { name: 'Selesai', status: 'pending', date: '-' },
      ],
      price: 'Menunggu diagnosa',
      deviceBrand: orderData.deviceBrand,
      deviceModel: orderData.deviceModel,
      issueDescription: orderData.issueDescription,
      serviceType: orderData.serviceType,
      address: orderData.address,
      phone: orderData.phone,
      preferredDate: orderData.preferredDate,
      preferredTime: orderData.preferredTime,
    };
    setOrders([newOrder, ...orders]);
  };

  // If not authenticated, show login or register page
  if (!isAuthenticated) {
    if (authPage === 'register') {
      return <Register onRegister={handleRegister} onSwitchToLogin={handleSwitchToLogin} />;
    }
    return <Login onLogin={handleLogin} onSwitchToRegister={handleSwitchToRegister} />;
  }

  const menuItems = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'teknisi', label: 'Daftar Teknisi', icon: Users },
    { id: 'pemesanan', label: 'Pemesanan', icon: ShoppingCart },
    { id: 'status', label: 'Status Service', icon: ClipboardList },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'akun', label: 'Akun Saya', icon: User },
    { id: 'bantuan', label: 'Bantuan & FAQ', icon: HelpCircle },
  ];

  const handleNavigate = (page: Page, teknisiId?: string) => {
    setCurrentPage(page);
    if (teknisiId) setSelectedTeknisiId(teknisiId);
    setSidebarOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'beranda':
        return <Beranda onNavigate={handleNavigate} />;
      case 'teknisi':
        return <DaftarTeknisi onNavigate={handleNavigate} />;
      case 'detail-teknisi':
        return <DetailTeknisi teknisiId={selectedTeknisiId} onNavigate={handleNavigate} />;
      case 'pemesanan':
        return <Pemesanan teknisiId={selectedTeknisiId} onNavigate={handleNavigate} onAddOrder={handleAddOrder} />;
      case 'status':
        return <StatusService onNavigate={handleNavigate} orders={orders} />;
      case 'chat':
        return <Chat teknisiId={selectedTeknisiId} onNavigate={handleNavigate} />;
      case 'akun':
        return <AkunSaya onNavigate={handleNavigate} />;
      case 'bantuan':
        return <Bantuan onNavigate={handleNavigate} />;
      default:
        return <Beranda onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r shadow-sm z-40">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b">
          <Logo size="medium" />
          <LogoText />
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id as Page)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-purple-100 text-purple-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t p-4">
          <div className="text-xs text-gray-500 text-center">
            © 2025 TechFix Soloraya
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-6 border-b">
          <div className="flex items-center gap-3">
            <Logo size="medium" />
            <LogoText />
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id as Page)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-purple-100 text-purple-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t p-4">
          <div className="text-xs text-gray-500 text-center">
            © 2025 TechFix Soloraya
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <Logo size="small" />
              <div>
                <h1 className="text-purple-600 text-sm leading-tight">TechFix</h1>
              </div>
            </div>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </header>

        {/* Main Content */}
        <main className="min-h-screen">{renderPage()}</main>

        {/* Footer */}
        <footer className="bg-white border-t mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-purple-600 mb-2">TechFix Soloraya</h3>
                <p className="text-gray-600 text-sm">
                  Layanan perbaikan teknologi terpercaya di wilayah Soloraya
                </p>
              </div>
              <div>
                <h4 className="mb-2">Wilayah Layanan</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>Solo</li>
                  <li>Karanganyar</li>
                  <li>Sukoharjo</li>
                  <li>Klaten</li>
                  <li>Sragen</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2">Kontak</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>Email: info@techfixsoloraya.id</li>
                  <li>WhatsApp: +62 812-3456-7890</li>
                  <li>Jam Operasional: 08:00 - 20:00 WIB</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center text-gray-500 text-sm">
              © 2025 TechFix Soloraya. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}