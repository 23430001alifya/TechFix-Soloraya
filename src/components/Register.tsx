import { useState } from 'react';
import { Eye, EyeOff, UserPlus, MapPin, Phone, Mail, User } from 'lucide-react';
import { Logo, LogoText } from './Logo';

interface RegisterProps {
  onRegister: () => void;
  onSwitchToLogin: () => void;
}

export function Register({ onRegister, onSwitchToLogin }: RegisterProps) {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    alamat: '',
    kota: 'Solo',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const cities = ['Solo', 'Karanganyar', 'Sukoharjo', 'Klaten', 'Sragen'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validasi
    if (!formData.nama || !formData.email || !formData.telepon || !formData.alamat || !formData.password) {
      setError('Semua field harus diisi');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Format email tidak valid');
      return;
    }

    setIsLoading(true);

    // Simulasi proses registrasi
    setTimeout(() => {
      setIsLoading(false);
      onRegister();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Image & Info */}
          <div className="hidden md:block">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-3 mb-4">
                <Logo size="large" />
                <LogoText />
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1746005718004-1f992c399428?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobmljaWFuJTIwcmVwYWlyJTIwc21hcnRwaG9uZXxlbnwxfHx8fDE3NjY0NzcyNDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Technician repairing device"
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
              <h3 className="text-purple-600 mb-2">Bergabunglah dengan TechFix</h3>
              <p className="text-gray-600 text-sm mb-4">
                Akses layanan perbaikan teknologi terpercaya di wilayah Soloraya
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-900">12+ Teknisi Profesional</div>
                    <div className="text-xs text-gray-500">Ahli di bidangnya</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-900">5 Wilayah Layanan</div>
                    <div className="text-xs text-gray-500">Solo, Karanganyar, Sukoharjo, Klaten, Sragen</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-900">Support 24/7</div>
                    <div className="text-xs text-gray-500">Siap membantu kapan saja</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Register Form */}
          <div>
            {/* Mobile Logo */}
            <div className="text-center mb-6 md:hidden">
              <div className="inline-flex items-center gap-3 mb-2">
                <Logo size="large" />
                <LogoText />
              </div>
              <p className="text-gray-600 text-sm">
                Daftar untuk mengakses layanan perbaikan teknologi terpercaya
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
              <h2 className="mb-6 text-gray-900">Daftar Akun Baru</h2>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nama Lengkap */}
                <div>
                  <label htmlFor="nama" className="block text-sm text-gray-700 mb-1">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="nama"
                      name="nama"
                      type="text"
                      value={formData.nama}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                      placeholder="Nama lengkap Anda"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                      placeholder="nama@email.com"
                    />
                  </div>
                </div>

                {/* Telepon & Kota */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="telepon" className="block text-sm text-gray-700 mb-1">
                      No. Telepon
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="telepon"
                        name="telepon"
                        type="tel"
                        value={formData.telepon}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                        placeholder="08123456789"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="kota" className="block text-sm text-gray-700 mb-1">
                      Kota
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        id="kota"
                        name="kota"
                        value={formData.kota}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm appearance-none bg-white"
                      >
                        {cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Alamat */}
                <div>
                  <label htmlFor="alamat" className="block text-sm text-gray-700 mb-1">
                    Alamat Lengkap
                  </label>
                  <input
                    id="alamat"
                    name="alamat"
                    type="text"
                    value={formData.alamat}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                    placeholder="Jl. Contoh No. 123"
                  />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-12 text-sm"
                      placeholder="Minimal 6 karakter"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm text-gray-700 mb-1">
                    Konfirmasi Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-12 text-sm"
                      placeholder="Ulangi password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-0.5"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 text-xs text-gray-600">
                    Saya setuju dengan{' '}
                    <button type="button" className="text-purple-600 hover:text-purple-700">
                      Syarat & Ketentuan
                    </button>{' '}
                    dan{' '}
                    <button type="button" className="text-purple-600 hover:text-purple-700">
                      Kebijakan Privasi
                    </button>
                  </label>
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 text-white py-2.5 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-200"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Mendaftar...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      <span>Daftar Sekarang</span>
                    </>
                  )}
                </button>
              </form>

              {/* Login Link */}
              <p className="mt-6 text-center text-sm text-gray-600">
                Sudah punya akun?{' '}
                <button
                  onClick={onSwitchToLogin}
                  className="text-purple-600 hover:text-purple-700 transition-colors"
                >
                  Masuk di sini
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-500">
          © 2025 TechFix Soloraya. All rights reserved.
        </p>
      </div>
    </div>
  );
}
