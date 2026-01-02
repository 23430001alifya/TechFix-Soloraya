import { Search, MapPin, Star, Clock, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useState } from 'react';
import { teknisiList } from './teknisiData';

interface BerandaProps {
  onNavigate: (page: any, teknisiId?: string) => void;
}

const locations = ['Solo', 'Karanganyar', 'Sukoharjo', 'Klaten', 'Sragen', 'Boyolali', 'Wonogiri'];

const promos = [
  {
    id: '1',
    title: 'Diskon 20% Service Laptop',
    description: 'Berlaku untuk semua jenis perbaikan laptop',
    validUntil: '31 Des 2025',
    discount: '20%',
    image: 'https://images.unsplash.com/photo-1671726203399-f8e364d7c6e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjByZXBhaXIlMjBkaXNjb3VudHxlbnwxfHx8fDE3NjY0NzczODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '2',
    title: 'Gratis Diagnosa',
    description: 'Diagnosa gratis untuk pelanggan baru',
    validUntil: '15 Des 2025',
    discount: 'GRATIS',
    image: 'https://images.unsplash.com/photo-1748348713828-12035b2d0a57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGRpYWdub3N0aWNzfGVufDF8fHx8MTc2NjQ3NzM4OXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    title: 'Promo Install Ulang',
    description: 'Install ulang Windows + Software hanya 100rb',
    validUntil: '31 Des 2025',
    discount: '50%',
    image: 'https://images.unsplash.com/photo-1735964366700-9eedefcf0065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMHJlcGFpciUyMHRvb2xzfGVufDF8fHx8MTc2NjQ3NzI0MXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const riwayat = [
  {
    id: '1',
    teknisi: 'Budi Santoso',
    service: 'Perbaikan Laptop',
    tanggal: '25 Nov 2025',
    status: 'Selesai',
    rating: 5,
  },
  {
    id: '2',
    teknisi: 'Ahmad Hidayat',
    service: 'Install Jaringan',
    tanggal: '15 Nov 2025',
    status: 'Selesai',
    rating: 4,
  },
  {
    id: '3',
    teknisi: 'Dewi Lestari',
    service: 'Service HP',
    tanggal: '5 Nov 2025',
    status: 'Selesai',
    rating: 5,
  },
];

export function Beranda({ onNavigate }: BerandaProps) {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onNavigate('teknisi');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl overflow-hidden mb-8 relative">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1632910121591-29e2484c0259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3VwcG9ydCUyMHRlYW18ZW58MXx8fHwxNzY2NDc3Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Tech support team"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative p-8 md:p-12 text-white">
          <div className="max-w-3xl">
            <h2 className="mb-4">Temukan Teknisi Terpercaya di Wilayah Soloraya</h2>
            <p className="mb-8 text-purple-100">
              Solusi cepat dan profesional untuk semua kebutuhan perbaikan teknologi Anda
            </p>

            {/* Search Section */}
            <div className="bg-white rounded-xl p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-5">
                  <label className="text-gray-700 text-sm block mb-2">Cari Layanan</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="Laptop, HP, Printer, Jaringan..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="md:col-span-5">
                  <label className="text-gray-700 text-sm block mb-2">Pilih Lokasi</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      className="w-full h-10 pl-10 pr-4 rounded-md border border-gray-300 bg-white text-gray-900"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      <option value="">Semua Lokasi</option>
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="md:col-span-2 flex items-end">
                  <Button onClick={handleSearch} className="w-full bg-purple-600 hover:bg-purple-700">
                    Cari
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Teknisi Terdaftar</p>
                <p className="text-2xl">150+</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Service Selesai</p>
                <p className="text-2xl">5,000+</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Rating Rata-rata</p>
                <p className="text-2xl">4.8/5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Promo Section */}
      <div className="mb-8">
        <h3 className="mb-4">Promo Layanan</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promos.map((promo) => (
            <Card key={promo.id} className="overflow-hidden border-2 border-purple-100 hover:border-purple-300 transition-colors hover:shadow-lg cursor-pointer">
              <div className="relative h-40 overflow-hidden">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent flex flex-col justify-end p-4">
                  <Badge className="bg-white text-purple-600 mb-2 w-fit">{promo.discount}</Badge>
                  <h4 className="text-white">{promo.title}</h4>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-gray-600 mb-4">{promo.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Berlaku sampai {promo.validUntil}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Riwayat Service */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3>Riwayat Service Anda</h3>
          <Button variant="ghost" onClick={() => onNavigate('status')}>
            Lihat Semua
          </Button>
        </div>

        <div className="space-y-4">
          {riwayat.map((item) => {
            const teknisi = teknisiList.find(t => t.name === item.teknisi);
            return (
              <Card key={item.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <img
                          src={teknisi?.photo}
                          alt={item.teknisi}
                          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <h4 className="mb-1">{item.teknisi}</h4>
                          <p className="text-gray-600 mb-2">{item.service}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{item.tanggal}</span>
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Users({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
}