import { useState } from 'react';
import { Star, MapPin, Award, Filter, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { teknisiList } from './teknisiData';

interface DaftarTeknisiProps {
  onNavigate: (page: any, teknisiId?: string) => void;
}

const locations = ['Solo', 'Karanganyar', 'Sukoharjo', 'Klaten', 'Sragen', 'Boyolali', 'Wonogiri'];

export function DaftarTeknisi({ onNavigate }: DaftarTeknisiProps) {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');

  const filteredTeknisi = teknisiList
    .filter((teknisi) => {
      if (selectedLocation && teknisi.location !== selectedLocation) return false;
      if (minRating && teknisi.rating < minRating) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          teknisi.name.toLowerCase().includes(query) ||
          teknisi.specialties.some((s) => s.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      if (sortBy === 'experience') return parseInt(b.experience) - parseInt(a.experience);
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="mb-2">Daftar Teknisi</h2>
        <p className="text-gray-600">Temukan teknisi profesional di wilayah Soloraya</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Cari nama teknisi atau keahlian..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="md:w-auto"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
            <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
            <div>
              <label className="text-sm text-gray-700 block mb-2">Lokasi</label>
              <select
                className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white"
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

            <div>
              <label className="text-sm text-gray-700 block mb-2">Rating Minimum</label>
              <select
                className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white"
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
              >
                <option value={0}>Semua Rating</option>
                <option value={4.5}>4.5+ ⭐</option>
                <option value={4.7}>4.7+ ⭐</option>
                <option value={4.9}>4.9+ ⭐</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-700 block mb-2">Urutkan</label>
              <select
                className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Rating Tertinggi</option>
                <option value="reviews">Terbanyak Ulasan</option>
                <option value="experience">Paling Berpengalaman</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Menampilkan {filteredTeknisi.length} teknisi
        </p>
      </div>

      {/* Teknisi List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTeknisi.map((teknisi) => (
          <Card key={teknisi.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                {/* Avatar */}
                <img
                  src={teknisi.photo}
                  alt={teknisi.name}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="truncate">{teknisi.name}</h4>
                        {teknisi.verified && (
                          <Badge className="bg-purple-100 text-purple-700">
                            <Award className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{teknisi.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{teknisi.rating}</span>
                    </div>
                    <span className="text-gray-400 text-sm">({teknisi.reviews} ulasan)</span>
                    <span className="text-gray-400 text-sm">• {teknisi.completedJobs} service</span>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {teknisi.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                    <div>
                      <span className="text-gray-500">Pengalaman:</span> {teknisi.experience}
                    </div>
                    <div>
                      <span className="text-gray-500">Respon:</span> {teknisi.responseTime}
                    </div>
                  </div>

                  {/* Action */}
                  <Button
                    onClick={() => onNavigate('detail-teknisi', teknisi.id)}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    Lihat Detail
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTeknisi.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Tidak ada teknisi yang sesuai dengan filter Anda</p>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedLocation('');
              setMinRating(0);
              setSearchQuery('');
            }}
            className="mt-4"
          >
            Reset Filter
          </Button>
        </div>
      )}
    </div>
  );
}