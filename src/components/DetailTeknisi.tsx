import { Star, MapPin, Award, Clock, CheckCircle, MessageCircle, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { teknisiList } from './teknisiData';
import { teknisiDetailData } from './teknisiDetailData';

interface DetailTeknisiProps {
  teknisiId: string | null;
  onNavigate: (page: any, teknisiId?: string) => void;
}

export function DetailTeknisi({ teknisiId, onNavigate }: DetailTeknisiProps) {
  const teknisi = teknisiId ? teknisiDetailData[teknisiId] || teknisiList.find((t) => t.id === teknisiId) : null;

  if (!teknisi) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-gray-500">Teknisi tidak ditemukan</p>
        <div className="text-center mt-4">
          <Button onClick={() => onNavigate('teknisi')}>Kembali ke Daftar Teknisi</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => onNavigate('teknisi')} className="mb-4">
        ← Kembali
      </Button>

      {/* Header Card */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <img
              src={teknisi.photo}
              alt={teknisi.name}
              className="w-32 h-32 rounded-2xl object-cover flex-shrink-0"
            />

            {/* Main Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2>{teknisi.name}</h2>
                    {teknisi.verified && (
                      <Badge className="bg-purple-100 text-purple-700">
                        <Award className="w-4 h-4 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 mb-3">
                    <MapPin className="w-5 h-5" />
                    <span>{teknisi.location}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{teknisi.rating}</span>
                      <span className="text-gray-500">({teknisi.reviews} ulasan)</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="w-5 h-5" />
                      <span>{teknisi.completedJobs} service selesai</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-5 h-5" />
                      <span>Respon {teknisi.responseTime}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 md:w-48">
                  <Button
                    onClick={() => onNavigate('pemesanan', teknisi.id)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Pesan Sekarang
                  </Button>
                  <Button variant="outline" onClick={() => onNavigate('chat', teknisi.id)}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Konsultasi
                  </Button>
                </div>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-2">
                {teknisi.specialties.map((specialty: string, idx: number) => (
                  <Badge key={idx} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Profil</TabsTrigger>
          <TabsTrigger value="services">Layanan</TabsTrigger>
          <TabsTrigger value="reviews">Ulasan</TabsTrigger>
          <TabsTrigger value="schedule">Jadwal</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-4">Tentang Teknisi</h3>
              <p className="text-gray-600 mb-6">{teknisi.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Pengalaman</p>
                  <p className="font-semibold">{teknisi.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Waktu Respon</p>
                  <p className="font-semibold">{teknisi.responseTime}</p>
                </div>
              </div>

              <h4 className="mb-4">Keahlian</h4>
              <div className="space-y-4">
                {teknisi.skills.map((skill: any, idx: number) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services">
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-4">Daftar Layanan</h3>
              <div className="space-y-4">
                {teknisi.services.map((service: any, idx: number) => (
                  <div key={idx} className="p-4 border rounded-lg hover:bg-gray-50">
                    <h4 className="mb-1">{service.name}</h4>
                    <p className="text-sm text-gray-500">Estimasi durasi: {service.duration}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button onClick={() => onNavigate('pemesanan', teknisi.id)} className="w-full bg-purple-600 hover:bg-purple-700">
                  Pilih Layanan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <h3>Ulasan Pelanggan</h3>
                <div className="text-center">
                  <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl">{teknisi.rating}</span>
                  </div>
                  <p className="text-sm text-gray-500">{teknisi.reviews} ulasan</p>
                </div>
              </div>

              <div className="space-y-4">
                {teknisi.recentReviews.map((review: any) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">{review.user}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule">
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-4">Jadwal Ketersediaan</h3>
              <div className="space-y-3">
                {Object.entries(teknisi.availability).map(([day, time]) => (
                  <div key={day} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="capitalize">{day}</span>
                    <span className={time === 'Libur' ? 'text-red-500' : 'text-green-600'}>
                      {time}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-800">
                  💡 Tip: Teknisi ini biasanya merespon dalam {teknisi.responseTime}. Pesan sekarang untuk mendapatkan jadwal terbaik!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}