import { User, MapPin, Phone, Mail, Star, LogOut, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useState } from 'react';

interface AkunSayaProps {
  onNavigate: (page: any) => void;
}

export function AkunSaya({ onNavigate }: AkunSayaProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Andi Setiawan',
    email: 'andi.setiawan@email.com',
    phone: '081234567890',
    address: 'Jl. Slamet Riyadi No. 123, Laweyan, Solo',
    memberSince: 'Jan 2024',
    totalOrders: 12,
    averageRating: 4.8,
    photo: 'https://images.unsplash.com/photo-1650913406617-bd9b0ab07d07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB1c2VyJTIwYXZhdGFyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNjczNDMwODN8MA&ixlib=rb-4.1.0&q=80&w=400',
  });

  const reviews = [
    {
      id: '1',
      teknisi: 'Budi Santoso',
      service: 'Perbaikan Laptop',
      rating: 5,
      date: '28 Nov 2025',
      comment: 'Sangat profesional dan cepat! Laptop saya yang lemot jadi kencang lagi.',
    },
    {
      id: '2',
      teknisi: 'Ahmad Hidayat',
      service: 'Install Jaringan WiFi',
      rating: 5,
      date: '15 Nov 2025',
      comment: 'Pelayanan memuaskan, harga terjangkau. Teknisinya ramah.',
    },
    {
      id: '3',
      teknisi: 'Eko Prasetyo',
      service: 'Service Printer',
      rating: 4,
      date: '5 Nov 2025',
      comment: 'Bagus, tapi agak lama menunggu spare part.',
    },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleLogout = () => {
    // Logout logic here
    onNavigate('beranda');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="mb-2">Akun Saya</h2>
        <p className="text-gray-600">Kelola profil dan informasi akun Anda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <img
                  src={userData.photo}
                  alt={userData.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-purple-100"
                />
                <h3 className="mb-1">{userData.name}</h3>
                <p className="text-gray-500 text-sm">Member sejak {userData.memberSince}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm text-gray-600">Total Pesanan</span>
                  <span className="text-purple-600">{userData.totalOrders}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm text-gray-600">Rating Rata-rata</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-yellow-600">{userData.averageRating}</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Keluar
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <h3>Informasi Pribadi</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? 'Batal' : 'Edit'}
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Nama Lengkap</label>
                  {isEditing ? (
                    <Input
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    />
                  ) : (
                    <p>{userData.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Email</label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <p>{userData.email}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Nomor Telepon</label>
                  {isEditing ? (
                    <Input
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <p>{userData.phone}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Alamat</label>
                  {isEditing ? (
                    <Input
                      value={userData.address}
                      onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                      <p>{userData.address}</p>
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
                      Simpan Perubahan
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Batal
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Reviews Given */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <h3>Ulasan Saya</h3>
                <Badge variant="secondary">{reviews.length} ulasan</Badge>
              </div>

              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h5 className="mb-1">{review.teknisi}</h5>
                        <p className="text-sm text-gray-600">{review.service}</p>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Saved Addresses */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <h3>Alamat Tersimpan</h3>
                <Button variant="outline" size="sm">
                  Tambah Alamat
                </Button>
              </div>

              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-purple-600" />
                      <h5>Rumah</h5>
                    </div>
                    <Badge className="bg-purple-100 text-purple-700">Utama</Badge>
                  </div>
                  <p className="text-gray-600 ml-7">{userData.address}</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <h5>Kantor</h5>
                    </div>
                  </div>
                  <p className="text-gray-600 ml-7">
                    Jl. Jenderal Sudirman No. 45, Jebres, Solo
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}