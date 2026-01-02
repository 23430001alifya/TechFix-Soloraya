import { useState } from 'react';
import { Clock, CheckCircle, Wrench, Package, Star, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { getTeknisiIdByName } from './teknisiData';

interface StatusServiceProps {
  onNavigate: (page: any, teknisiId?: string) => void;
  orders: any[];
}

const ongoingServices = [
  {
    id: '1',
    orderId: 'TFS-2025-001',
    teknisi: 'Budi Santoso',
    service: 'Perbaikan Laptop Asus VivoBook',
    status: 'repair',
    orderDate: '1 Des 2025',
    estimatedCompletion: '3 Des 2025',
    currentStep: 2,
    steps: [
      { name: 'Pesanan Diterima', status: 'completed', date: '1 Des, 09:00' },
      { name: 'Diagnosa', status: 'completed', date: '1 Des, 10:30', note: 'RAM rusak perlu diganti' },
      { name: 'Dalam Perbaikan', status: 'current', date: '2 Des, 14:00', note: 'Menunggu spare part' },
      { name: 'Selesai', status: 'pending', date: '-' },
    ],
    price: 'Rp 350.000',
  },
  {
    id: '2',
    orderId: 'TFS-2025-002',
    teknisi: 'Dewi Lestari',
    service: 'Service HP Samsung A52',
    status: 'diagnosis',
    orderDate: '2 Des 2025',
    estimatedCompletion: '4 Des 2025',
    currentStep: 1,
    steps: [
      { name: 'Pesanan Diterima', status: 'completed', date: '2 Des, 15:00' },
      { name: 'Diagnosa', status: 'current', date: '3 Des, 09:00', note: 'Sedang diperiksa' },
      { name: 'Dalam Perbaikan', status: 'pending', date: '-' },
      { name: 'Selesai', status: 'pending', date: '-' },
    ],
    price: 'Menunggu diagnosa',
  },
];

const completedServices = [
  {
    id: '3',
    orderId: 'TFS-2025-003',
    teknisi: 'Ahmad Hidayat',
    service: 'Install Jaringan WiFi',
    completedDate: '28 Nov 2025',
    price: 'Rp 500.000',
    rating: 5,
    hasReview: true,
  },
  {
    id: '4',
    orderId: 'TFS-2024-156',
    teknisi: 'Budi Santoso',
    service: 'Install Windows + Office',
    completedDate: '15 Nov 2025',
    price: 'Rp 150.000',
    rating: 5,
    hasReview: true,
  },
  {
    id: '5',
    orderId: 'TFS-2024-145',
    teknisi: 'Eko Prasetyo',
    service: 'Service Printer Canon',
    completedDate: '5 Nov 2025',
    price: 'Rp 200.000',
    rating: 4,
    hasReview: true,
  },
];

export function StatusService({ onNavigate, orders }: StatusServiceProps) {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // Combine orders from props with static demo orders
  const allOngoingServices = [...orders, ...ongoingServices];

  const handleContactTeknisi = (teknisiName: string) => {
    const teknisiId = getTeknisiIdByName(teknisiName);
    if (teknisiId) {
      onNavigate('chat', teknisiId);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'waiting':
        return <Clock className="w-5 h-5" />;
      case 'diagnosis':
        return <Clock className="w-5 h-5" />;
      case 'repair':
        return <Wrench className="w-5 h-5" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'waiting':
        return <Badge className="bg-orange-100 text-orange-700">Menunggu Konfirmasi</Badge>;
      case 'diagnosis':
        return <Badge className="bg-yellow-100 text-yellow-700">Diagnosa</Badge>;
      case 'repair':
        return <Badge className="bg-blue-100 text-blue-700">Dalam Perbaikan</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-700">Selesai</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="mb-2">Status Service</h2>
        <p className="text-gray-600">Pantau perkembangan service Anda secara real-time</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="ongoing">
            Sedang Berjalan ({allOngoingServices.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Riwayat ({completedServices.length})
          </TabsTrigger>
        </TabsList>

        {/* Ongoing Services */}
        <TabsContent value="ongoing" className="space-y-6">
          {allOngoingServices.length === 0 ? (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-4">Tidak ada service yang sedang berjalan</p>
                <Button onClick={() => onNavigate('teknisi')} className="bg-purple-600 hover:bg-purple-700">
                  Cari Teknisi
                </Button>
              </CardContent>
            </Card>
          ) : (
            allOngoingServices.map((service) => (
              <Card key={service.id} className="overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm opacity-90">Order ID: {service.orderId}</span>
                    {getStatusBadge(service.status)}
                  </div>
                  <h4 className="text-white mb-1">{service.service}</h4>
                  <p className="text-sm text-purple-100">Teknisi: {service.teknisi}</p>
                </div>

                <CardContent className="pt-6">
                  {/* Timeline */}
                  <div className="mb-6">
                    <div className="space-y-4">
                      {service.steps.map((step, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                step.status === 'completed'
                                  ? 'bg-green-100 text-green-600'
                                  : step.status === 'current'
                                  ? 'bg-purple-100 text-purple-600'
                                  : 'bg-gray-100 text-gray-400'
                              }`}
                            >
                              {step.status === 'completed' ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : step.status === 'current' ? (
                                <Clock className="w-5 h-5 animate-pulse" />
                              ) : (
                                <div className="w-3 h-3 bg-gray-300 rounded-full" />
                              )}
                            </div>
                            {idx < service.steps.length - 1 && (
                              <div
                                className={`w-0.5 h-12 mt-1 ${
                                  step.status === 'completed' ? 'bg-green-300' : 'bg-gray-200'
                                }`}
                              />
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <h5
                              className={
                                step.status === 'pending' ? 'text-gray-400' : ''
                              }
                            >
                              {step.name}
                            </h5>
                            <p className="text-sm text-gray-500">{step.date}</p>
                            {step.note && (
                              <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-2 rounded">
                                {step.note}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-500">Tanggal Pesan</p>
                      <p>{service.orderDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Estimasi Selesai</p>
                      <p>{service.estimatedCompletion}</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleContactTeknisi(service.teknisi)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Hubungi Teknisi
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Completed Services */}
        <TabsContent value="completed" className="space-y-4">
          {completedServices.length === 0 ? (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">Belum ada riwayat service</p>
              </CardContent>
            </Card>
          ) : (
            completedServices.map((service) => (
              <Card key={service.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4>{service.service}</h4>
                        <Badge className="bg-green-100 text-green-700">Selesai</Badge>
                      </div>
                      <p className="text-gray-600 mb-2">Teknisi: {service.teknisi}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Order ID: {service.orderId}</span>
                        <span>•</span>
                        <span>{service.completedDate}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < service.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      {service.hasReview && (
                        <span className="text-sm text-gray-500">Sudah direview</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}