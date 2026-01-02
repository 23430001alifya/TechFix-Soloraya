import { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, MessageSquare, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { teknisiList } from './teknisiData';

interface ChatProps {
  teknisiId: string | null;
  onNavigate: (page: any) => void;
}

const initialMessages: { [key: string]: any[] } = {
  '1': [
    { id: 1, sender: 'teknisi', text: 'Halo! Ada yang bisa saya bantu?', time: '09:00' },
    { id: 2, sender: 'user', text: 'Halo Pak, laptop saya lemot', time: '09:15' },
    { id: 3, sender: 'teknisi', text: 'Baik, saya akan bantu perbaiki', time: '09:20' },
  ],
  '2': [
    { id: 1, sender: 'teknisi', text: 'Selamat siang!', time: '14:00' },
  ],
  '3': [
    { id: 1, sender: 'user', text: 'HP saya rusak, bisa diperbaiki?', time: '10:00' },
    { id: 2, sender: 'teknisi', text: 'Bisa, apa kerusakannya?', time: '10:02' },
  ],
};

export function Chat({ teknisiId, onNavigate }: ChatProps) {
  const [selectedTeknisiId, setSelectedTeknisiId] = useState<string | null>(teknisiId);
  const [messages, setMessages] = useState<any>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedTeknisiId]);

  const selectedTeknisi = teknisiList.find((t) => t.id === selectedTeknisiId);
  const currentMessages = selectedTeknisiId ? messages[selectedTeknisiId] || [] : [];

  const filteredTeknisi = teknisiList.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !selectedTeknisiId) return;

    const newMessage = {
      id: currentMessages.length + 1,
      sender: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages({
      ...messages,
      [selectedTeknisiId]: [...currentMessages, newMessage],
    });

    setInputMessage('');

    // Auto reply after 2 seconds
    setTimeout(() => {
      const replyMessage = {
        id: currentMessages.length + 2,
        sender: 'teknisi',
        text: 'Baik, saya akan segera membantu Anda.',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev: any) => ({
        ...prev,
        [selectedTeknisiId]: [...prev[selectedTeknisiId], replyMessage],
      }));
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSelectTeknisi = (teknisiId: string) => {
    setSelectedTeknisiId(teknisiId);
    if (!messages[teknisiId]) {
      const teknisi = teknisiList.find(t => t.id === teknisiId);
      setMessages({
        ...messages,
        [teknisiId]: [
          {
            id: 1,
            sender: 'teknisi',
            text: `Halo! Saya ${teknisi?.name}. Terima kasih sudah menghubungi saya. Ada yang bisa saya bantu?`,
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          },
        ],
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="mb-2">Chat & Konsultasi</h2>
        <p className="text-gray-600">Pilih teknisi dan mulai berkonsultasi</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Teknisi List */}
        <div className="md:col-span-1">
          <Card className="h-[calc(100vh-280px)]">
            <CardContent className="p-0">
              <div className="p-4 border-b bg-gray-50">
                <h4 className="mb-3">Pilih Teknisi</h4>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Cari teknisi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-9"
                  />
                </div>
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 400px)' }}>
                {filteredTeknisi.map((teknisi) => (
                  <button
                    key={teknisi.id}
                    onClick={() => handleSelectTeknisi(teknisi.id)}
                    className={`w-full p-4 flex items-center gap-3 hover:bg-purple-50 transition-colors border-b ${
                      selectedTeknisiId === teknisi.id ? 'bg-purple-50 border-l-4 border-l-purple-600' : ''
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={teknisi.photo}
                        alt={teknisi.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="text-sm font-medium truncate">{teknisi.name}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{teknisi.location}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {teknisi.specialties.slice(0, 2).map((spec, idx) => (
                          <Badge key={idx} variant="secondary" className="text-[10px] px-1 py-0">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="md:col-span-2">
          <Card className="h-[calc(100vh-280px)] flex flex-col">
            {selectedTeknisiId ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b bg-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedTeknisiId(null)}
                      className="md:hidden p-1 hover:bg-gray-100 rounded"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="relative">
                      <img
                        src={selectedTeknisi?.photo}
                        alt={selectedTeknisi?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    </div>
                    <div>
                      <h4>{selectedTeknisi?.name}</h4>
                      <p className="text-sm text-gray-500">Online • {selectedTeknisi?.location}</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {currentMessages.map((message: any) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                          message.sender === 'user'
                            ? 'bg-purple-600 text-white rounded-br-sm'
                            : 'bg-white text-gray-900 shadow-sm rounded-bl-sm'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-purple-200' : 'text-gray-400'
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Ketik pesan..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="bg-purple-600 hover:bg-purple-700"
                      size="sm"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="mb-2">Pilih Teknisi</h3>
                  <p className="text-gray-500 text-sm">Pilih teknisi dari daftar untuk memulai chat</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}