import { useState } from 'react';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Logo, LogoText } from './Logo';

interface LoginProps {
  onLogin: () => void;
  onSwitchToRegister: () => void;
}

export function Login({ onLogin, onSwitchToRegister }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Email dan password harus diisi');
      return;
    }

    setIsLoading(true);
    
    // Simulasi proses login
    setTimeout(() => {
      setIsLoading(false);
      // Demo: terima kredensial apapun
      onLogin();
    }, 1000);
  };

  const handleDemoLogin = () => {
    setEmail('demo@techfix.id');
    setPassword('demo123');
    setTimeout(() => {
      onLogin();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Image & Branding */}
          <div className="hidden md:block">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Logo size="large" />
                <LogoText />
              </div>
              
              <img
                src="https://images.unsplash.com/photo-1756801370266-f589801cedc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHJlcGFpciUyMHNlcnZpY2V8ZW58MXx8fHwxNzY2NDc3MjQwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Computer repair service"
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              
              <h3 className="text-purple-600 mb-2">Selamat Datang di TechFix</h3>
              <p className="text-gray-600 mb-6">
                Platform layanan perbaikan teknologi terpercaya untuk wilayah Soloraya. 
                Hubungkan dengan teknisi profesional dalam hitungan menit.
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-purple-600 mb-1">12+</div>
                  <div className="text-xs text-gray-600">Teknisi Ahli</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-purple-600 mb-1">5</div>
                  <div className="text-xs text-gray-600">Wilayah</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-purple-600 mb-1">24/7</div>
                  <div className="text-xs text-gray-600">Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div>
            {/* Mobile Logo */}
            <div className="text-center mb-6 md:hidden">
              <div className="inline-flex items-center gap-3 mb-2">
                <Logo size="large" />
                <LogoText />
              </div>
              <p className="text-gray-600 text-sm">
                Masuk ke akun Anda untuk mengakses layanan perbaikan teknologi terpercaya
              </p>
            </div>

            {/* Login Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="mb-6 text-gray-900">Masuk</h2>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="nama@email.com"
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-12"
                      placeholder="Masukkan password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    Lupa password?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-200"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Memproses...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      <span>Masuk</span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Atau</span>
                </div>
              </div>

              {/* Demo Login Button */}
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full border-2 border-purple-200 text-purple-600 py-3 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Login dengan Akun Demo
              </button>

              {/* Register Link */}
              <p className="mt-6 text-center text-sm text-gray-600">
                Belum punya akun?{' '}
                <button 
                  onClick={onSwitchToRegister}
                  className="text-purple-600 hover:text-purple-700 transition-colors"
                >
                  Daftar sekarang
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-500">
          © 2025 TechFix Soloraya. All rights reserved.
        </p>
      </div>
    </div>
  );
}