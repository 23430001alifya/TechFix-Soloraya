import { Search, MessageCircle, Phone, Mail, HelpCircle, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { useState } from 'react';

interface BantuanProps {
  onNavigate: (page: any) => void;
}

const faqCategories = [
  {
    id: 'umum',
    name: 'Pertanyaan Umum',
    faqs: [
      {
        question: 'Apa itu TechFix Soloraya?',
        answer:
          'TechFix Soloraya adalah platform yang menghubungkan Anda dengan teknisi profesional di wilayah Soloraya untuk berbagai kebutuhan perbaikan teknologi seperti laptop, PC, HP, printer, dan perangkat elektronik lainnya.',
      },
      {
        question: 'Wilayah mana saja yang dilayani?',
        answer:
          'Kami melayani wilayah Soloraya meliputi Solo (Surakarta), Karanganyar, Sukoharjo, Klaten, Sragen, Boyolali, dan Wonogiri. Untuk area spesifik, silakan cek pada filter lokasi di halaman Daftar Teknisi.',
      },
      {
        question: 'Apakah TechFix memungut biaya untuk menggunakan platform?',
        answer:
          'Tidak, TechFix Soloraya gratis untuk digunakan. Anda hanya membayar biaya service langsung kepada teknisi sesuai kesepakatan.',
      },
    ],
  },
  {
    id: 'pemesanan',
    name: 'Pemesanan & Service',
    faqs: [
      {
        question: 'Bagaimana cara memesan service?',
        answer:
          'Pilih teknisi dari halaman Daftar Teknisi, klik "Lihat Detail", lalu klik "Pesan Sekarang". Isi detail kerusakan, pilih tipe service (datang ke rumah atau antar ke toko), dan konfirmasi pesanan Anda.',
      },
      {
        question: 'Berapa lama waktu yang dibutuhkan untuk service?',
        answer:
          'Waktu service bervariasi tergantung jenis kerusakan dan ketersediaan spare part. Teknisi akan memberikan estimasi waktu setelah melakukan diagnosa. Umumnya, service ringan seperti install software memakan waktu 1-2 jam, sedangkan perbaikan hardware bisa 1-3 hari.',
      },
      {
        question: 'Apakah saya bisa membatalkan pesanan?',
        answer:
          'Ya, Anda bisa membatalkan pesanan sebelum teknisi memulai pekerjaan. Silakan hubungi teknisi yang bersangkutan melalui WhatsApp atau hubungi customer service kami.',
      },
      {
        question: 'Apa perbedaan service "Datang ke Rumah" dan "Antar ke Toko"?',
        answer:
          'Service "Datang ke Rumah" artinya teknisi akan datang ke lokasi Anda untuk melakukan perbaikan. Service "Antar ke Toko" berarti Anda mengantarkan perangkat ke workshop/toko teknisi. Service datang ke rumah biasanya dikenakan biaya transportasi tambahan.',
      },
    ],
  },
  {
    id: 'pembayaran',
    name: 'Pembayaran',
    faqs: [
      {
        question: 'Bagaimana cara pembayaran?',
        answer:
          'Pembayaran dilakukan langsung kepada teknisi setelah pekerjaan selesai. Metode pembayaran yang tersedia umumnya adalah tunai, transfer bank, atau e-wallet (tergantung teknisi).',
      },
      {
        question: 'Apakah harga yang tertera sudah final?',
        answer:
          'Harga yang tertera di profil teknisi adalah estimasi rentang harga. Harga final akan ditentukan setelah teknisi melakukan diagnosa dan mengetahui tingkat kerusakan serta spare part yang dibutuhkan.',
      },
      {
        question: 'Apakah ada garansi untuk perbaikan?',
        answer:
          'Ya, sebagian besar teknisi memberikan garansi untuk pekerjaan mereka. Lama garansi bervariasi tergantung jenis perbaikan, biasanya 7-30 hari. Pastikan untuk menanyakan detail garansi kepada teknisi sebelum memulai service.',
      },
    ],
  },
  {
    id: 'teknisi',
    name: 'Tentang Teknisi',
    faqs: [
      {
        question: 'Bagaimana cara memilih teknisi yang tepat?',
        answer:
          'Anda bisa memilih teknisi berdasarkan rating, jumlah ulasan, keahlian, lokasi, dan harga. Baca ulasan dari pelanggan sebelumnya untuk mengetahui kualitas layanan teknisi tersebut.',
      },
      {
        question: 'Apa itu teknisi "Verified"?',
        answer:
          'Teknisi dengan badge "Verified" adalah teknisi yang telah melalui proses verifikasi identitas dan keahlian oleh TechFix Soloraya. Mereka telah membuktikan pengalaman dan kompetensi mereka.',
      },
      {
        question: 'Bagaimana jika saya tidak puas dengan service teknisi?',
        answer:
          'Jika Anda tidak puas dengan layanan, silakan hubungi customer service kami dengan menyertakan detail pesanan. Kami akan membantu menyelesaikan masalah Anda dan memastikan Anda mendapatkan solusi yang memuaskan.',
      },
    ],
  },
];

export function Bantuan({ onNavigate }: BantuanProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('umum');

  const filteredFaqs = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.faqs.length > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h2 className="mb-2">Pusat Bantuan</h2>
        <p className="text-gray-600">
          Temukan jawaban untuk pertanyaan Anda atau hubungi tim kami
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Cari pertanyaan..."
            className="pl-12 h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="mb-2">Live Chat</h4>
            <p className="text-gray-600 text-sm mb-4">
              Chat dengan tim support kami
            </p>
            <Button variant="outline" className="w-full">
              Mulai Chat
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="mb-2">WhatsApp</h4>
            <p className="text-gray-600 text-sm mb-4">
              +62 812-3456-7890
            </p>
            <Button variant="outline" className="w-full">
              Hubungi Kami
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="mb-2">Email</h4>
            <p className="text-gray-600 text-sm mb-4">
              info@techfixsoloraya.id
            </p>
            <Button variant="outline" className="w-full">
              Kirim Email
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div>
        <h3 className="mb-6">Pertanyaan yang Sering Diajukan</h3>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {faqCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className={
                selectedCategory === category.id
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : ''
              }
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* FAQ List */}
        {searchQuery ? (
          // Show filtered results from all categories
          <div className="space-y-6">
            {filteredFaqs.length === 0 ? (
              <Card>
                <CardContent className="pt-12 pb-12 text-center">
                  <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Tidak ada hasil untuk "{searchQuery}"</p>
                  <Button
                    variant="outline"
                    onClick={() => setSearchQuery('')}
                    className="mt-4"
                  >
                    Reset Pencarian
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredFaqs.map((category) => (
                <div key={category.id}>
                  <h4 className="mb-4">{category.name}</h4>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.faqs.map((faq, idx) => (
                      <AccordionItem
                        key={idx}
                        value={`${category.id}-${idx}`}
                        className="border rounded-lg px-4"
                      >
                        <AccordionTrigger className="hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))
            )}
          </div>
        ) : (
          // Show selected category
          <Accordion type="single" collapsible className="space-y-2">
            {faqCategories
              .find((cat) => cat.id === selectedCategory)
              ?.faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="border rounded-lg px-4"
                >
                  <AccordionTrigger className="hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        )}
      </div>

      {/* Still Need Help */}
      <Card className="mt-12 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <CardContent className="pt-8 pb-8 text-center">
          <h3 className="text-white mb-2">Masih Butuh Bantuan?</h3>
          <p className="text-purple-100 mb-6">
            Tim customer service kami siap membantu Anda 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat dengan Kami
            </Button>
            <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
              <Phone className="w-4 h-4 mr-2" />
              Hubungi via WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}