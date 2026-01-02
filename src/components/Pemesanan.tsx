import { useState, useEffect } from 'react';
import { Calendar, MapPin, Home, Store, AlertCircle, CheckCircle, ChevronDown, Star, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { teknisiList } from './teknisiData';

interface PemesananProps {
  teknisiId: string | null;
  onNavigate: (page: any) => void;
  onAddOrder: (orderData: any) => void;
}

export function Pemesanan({ teknisiId, onNavigate, onAddOrder }: PemesananProps) {
  const [step, setStep] = useState(1);
  const [showTeknisiList, setShowTeknisiList] = useState(false);
  const [selectedTeknisiId, setSelectedTeknisiId] = useState(teknisiId || '1');
  
  // Update selectedTeknisiId when teknisiId prop changes
  useEffect(() => {
    if (teknisiId) {
      setSelectedTeknisiId(teknisiId);
    }
  }, [teknisiId]);
  
  const selectedTeknisi = teknisiList.find(t => t.id === selectedTeknisiId);
  
  const [formData, setFormData] = useState({
    teknisi: selectedTeknisi?.name || 'Budi Santoso',
    service: '',
    deviceBrand: '',
    deviceModel: '',
    issueDescription: '',
    serviceType: '',
    address: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
  });

  // Update formData when selectedTeknisi changes
  useEffect(() => {
    if (selectedTeknisi) {
      setFormData(prev => ({ ...prev, teknisi: selectedTeknisi.name }));
    }
  }, [selectedTeknisi]);
  
  const [orderCompleted, setOrderCompleted] = useState(false);

  const services = [
    'Service Laptop',
    'Install Windows',
    'Upgrade RAM/SSD',
    'Cleaning Laptop',
    'Ganti LCD/Keyboard',
    'Perbaikan Hardware Lainnya',
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    onAddOrder(formData);
    setOrderCompleted(true);
  };

  if (orderCompleted) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center">
          <CardContent className="pt-12 pb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="mb-4">Pesanan Berhasil Dibuat!</h2>
            <p className="text-gray-600 mb-6">
              Pesanan Anda telah diterima. Teknisi akan segera menghubungi Anda untuk konfirmasi.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h4 className="mb-4">Detail Pesanan</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Teknisi:</span>
                  <span>{formData.teknisi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Layanan:</span>
                  <span>{formData.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tipe Service:</span>
                  <span>{formData.serviceType === 'home' ? 'Datang ke Rumah' : 'Antar ke Toko'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tanggal:</span>
                  <span>{formData.preferredDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Waktu:</span>
                  <span>{formData.preferredTime}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button onClick={() => onNavigate('status')} className="flex-1 bg-purple-600 hover:bg-purple-700">
                Lihat Status Pesanan
              </Button>
              <Button onClick={() => onNavigate('beranda')} variant="outline" className="flex-1">
                Kembali ke Beranda
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="mb-2">Buat Pesanan Service</h2>
        <p className="text-gray-600">Isi detail kerusakan dan pilih tipe service yang Anda inginkan</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= s ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 ${step > s ? 'bg-purple-600' : 'bg-gray-200'}`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm">
          <span className={step >= 1 ? 'text-purple-600' : 'text-gray-500'}>Detail Kerusakan</span>
          <span className={step >= 2 ? 'text-purple-600' : 'text-gray-500'}>Tipe Service</span>
          <span className={step >= 3 ? 'text-purple-600' : 'text-gray-500'}>Konfirmasi</span>
        </div>
      </div>

      {/* Step 1: Detail Kerusakan */}
      {step === 1 && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-6">Detail Kerusakan</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">Pilih Teknisi</label>
                <button
                  type="button"
                  onClick={() => setShowTeknisiList(!showTeknisiList)}
                  className="w-full h-10 px-3 rounded-md border border-gray-300 flex items-center justify-between bg-white hover:border-purple-400 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {selectedTeknisi && (
                      <>
                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs">
                          {selectedTeknisi.avatar}
                        </div>
                        <span>{selectedTeknisi.name}</span>
                        <Badge className="bg-yellow-100 text-yellow-700 text-xs">
                          <Star className="w-3 h-3 mr-1 fill-yellow-500 text-yellow-500" />
                          {selectedTeknisi.rating}
                        </Badge>
                      </>
                    )}
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                
                {showTeknisiList && (
                  <div className="mt-2 border border-gray-200 rounded-lg bg-white shadow-lg max-h-96 overflow-y-auto">
                    {teknisiList.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          setSelectedTeknisiId(t.id);
                          handleInputChange('teknisi', t.name);
                          setShowTeknisiList(false);
                        }}
                        className={`w-full p-4 flex items-center gap-3 hover:bg-purple-50 transition-colors border-b last:border-b-0 ${
                          selectedTeknisiId === t.id ? 'bg-purple-50' : ''
                        }`}
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                          {t.avatar}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{t.name}</span>
                            {t.verified && (
                              <Check className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-3 h-3" />
                            <span>{t.location}</span>
                            <span>•</span>
                            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                            <span>{t.rating}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {t.specialties.slice(0, 3).map((spec, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {selectedTeknisiId === t.id && (
                          <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm mb-2">Pilih Layanan *</label>
                <select
                  className="w-full h-10 px-3 rounded-md border border-gray-300"
                  value={formData.service}
                  onChange={(e) => handleInputChange('service', e.target.value)}
                >
                  <option value="">Pilih layanan...</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Merk Perangkat *</label>
                  <Input
                    placeholder="Contoh: Asus, Lenovo, HP"
                    value={formData.deviceBrand}
                    onChange={(e) => handleInputChange('deviceBrand', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Model/Tipe Perangkat</label>
                  <Input
                    placeholder="Contoh: VivoBook X441, ThinkPad T480"
                    value={formData.deviceModel}
                    onChange={(e) => handleInputChange('deviceModel', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Deskripsi Masalah *</label>
                <Textarea
                  placeholder="Jelaskan masalah yang Anda alami dengan detail..."
                  rows={6}
                  value={formData.issueDescription}
                  onChange={(e) => handleInputChange('issueDescription', e.target.value)}
                />
              </div>

              <div className="bg-purple-50 p-4 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-purple-800">
                  <p className="mb-1">Tips untuk deskripsi yang baik:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Jelaskan kapan masalah mulai terjadi</li>
                    <li>Sebutkan pesan error jika ada</li>
                    <li>Jelaskan apa yang sudah Anda coba untuk memperbaikinya</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button onClick={() => onNavigate('teknisi')} variant="outline">
                Batal
              </Button>
              <Button
                onClick={handleNext}
                disabled={!formData.service || !formData.deviceBrand || !formData.issueDescription}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Lanjut
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Tipe Service */}
      {step === 2 && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-6">Pilih Tipe Service</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => handleInputChange('serviceType', 'home')}
                className={`p-6 border-2 rounded-lg text-left transition-all ${
                  formData.serviceType === 'home'
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4>Datang ke Rumah</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Teknisi akan datang ke lokasi Anda untuk melakukan perbaikan
                </p>
                {formData.serviceType === 'home' && (
                  <Badge className="mt-3 bg-purple-600">Terpilih</Badge>
                )}
              </button>

              <button
                onClick={() => handleInputChange('serviceType', 'store')}
                className={`p-6 border-2 rounded-lg text-left transition-all ${
                  formData.serviceType === 'store'
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Store className="w-6 h-6 text-green-600" />
                  </div>
                  <h4>Antar ke Toko</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Anda mengantarkan perangkat ke toko/workshop teknisi
                </p>
                {formData.serviceType === 'store' && (
                  <Badge className="mt-3 bg-purple-600">Terpilih</Badge>
                )}
              </button>
            </div>

            {formData.serviceType === 'home' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Alamat Lengkap *</label>
                  <Textarea
                    placeholder="Masukkan alamat lengkap Anda..."
                    rows={3}
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="space-y-4 mt-6">
              <div>
                <label className="block text-sm mb-2">Nomor WhatsApp/Telepon *</label>
                <Input
                  placeholder="Contoh: 081234567890"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Tanggal Pilihan *</label>
                  <Input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Waktu Pilihan *</label>
                  <select
                    className="w-full h-10 px-3 rounded-md border border-gray-300"
                    value={formData.preferredTime}
                    onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                  >
                    <option value="">Pilih waktu...</option>
                    <option value="08:00 - 10:00">08:00 - 10:00</option>
                    <option value="10:00 - 12:00">10:00 - 12:00</option>
                    <option value="12:00 - 14:00">12:00 - 14:00</option>
                    <option value="14:00 - 16:00">14:00 - 16:00</option>
                    <option value="16:00 - 18:00">16:00 - 18:00</option>
                    <option value="18:00 - 20:00">18:00 - 20:00</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-4 mt-6">
              <Button onClick={handleBack} variant="outline">
                Kembali
              </Button>
              <Button
                onClick={handleNext}
                disabled={
                  !formData.serviceType ||
                  !formData.phone ||
                  !formData.preferredDate ||
                  !formData.preferredTime ||
                  (formData.serviceType === 'home' && !formData.address)
                }
                className="bg-purple-600 hover:bg-purple-700"
              >
                Lanjut
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Konfirmasi */}
      {step === 3 && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-6">Konfirmasi Pesanan</h3>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="mb-4">Detail Pesanan</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Teknisi</span>
                    <span>{formData.teknisi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Layanan</span>
                    <span>{formData.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Perangkat</span>
                    <span>
                      {formData.deviceBrand} {formData.deviceModel}
                    </span>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-gray-600 mb-1">Deskripsi Masalah:</p>
                    <p>{formData.issueDescription}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="mb-4">Info Service</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tipe Service</span>
                    <span>{formData.serviceType === 'home' ? 'Datang ke Rumah' : 'Antar ke Toko'}</span>
                  </div>
                  {formData.serviceType === 'home' && (
                    <div className="pt-3 border-t">
                      <p className="text-gray-600 mb-1">Alamat:</p>
                      <p>{formData.address}</p>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 border-t">
                    <span className="text-gray-600">Nomor Kontak</span>
                    <span>{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tanggal</span>
                    <span>{formData.preferredDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Waktu</span>
                    <span>{formData.preferredTime}</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-purple-800">
                  <p>
                    Teknisi akan menghubungi Anda untuk konfirmasi jadwal dan estimasi biaya.
                    Pastikan nomor yang Anda masukkan aktif dan dapat dihubungi.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-4 mt-6">
              <Button onClick={handleBack} variant="outline">
                Kembali
              </Button>
              <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700">
                Konfirmasi & Pesan
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}