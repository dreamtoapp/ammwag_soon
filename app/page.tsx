"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Mail, Star, Sparkles, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Set target date (5 days from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 5);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email || phone) {
      setIsSubscribed(true);
      setEmail('');
      setPhone('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-500 to-green-700 relative overflow-hidden" dir="rtl">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 w-full px-4 py-8 min-h-screen flex flex-col items-center justify-center text-center">

        {/* Hero Banner Image */}
        <div className="mb-8 md:mb-12 animate-fade-in w-full">
          <div className="relative w-full">
            <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl h-[80vh] md:h-screen">
              <Image
                src="/images/bg1.avif"
                alt="Hero Banner"
                fill
                className="object-fill object-top"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-900/40 to-green-600/40"></div>

              {/* Overlay Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center mb-4 mx-auto border border-white/30">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    شيء مذهل قادم
                  </h3>
                  <p className="text-white/90 text-lg mb-6">
                    تجربة جديدة ومبتكرة
                  </p>

                  {/* Countdown Timer */}
                  <div className="animate-fade-in-delayed">
                    <div className="flex items-center justify-center mb-4">
                      <Clock className="w-5 h-5 text-yellow-400 ml-2" />
                      <h2 className="text-lg font-semibold text-white">العد التنازلي للإطلاق</h2>
                    </div>
                    <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
                      {[
                        { value: timeLeft.days, label: 'يوم', key: 'days' },
                        { value: timeLeft.hours, label: 'ساعة', key: 'hours' },
                        { value: timeLeft.minutes, label: 'دقيقة', key: 'minutes' },
                        { value: timeLeft.seconds, label: 'ثانية', key: 'seconds' }
                      ].map((item, index) => (
                        <div
                          key={item.key}
                          className="bg-white/10 backdrop-blur-lg rounded-xl p-3 border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="text-2xl font-bold text-white mb-1 font-mono">
                            {item.value.toString().padStart(2, '0')}
                          </div>
                          <div className="text-green-100 text-xs font-medium">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-400/30 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-pink-400/30 rounded-full animate-bounce"></div>
            </div>

            {/* Floating Elements around the banner */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-float opacity-80"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-float opacity-80" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 -left-6 w-4 h-4 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full animate-bounce opacity-60"></div>
          </div>
        </div>

        {/* Main Heading */}
        <div className="mb-12 animate-slide-up">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
            قريباً
          </h1>
          <p className="text-xl md:text-2xl text-green-100 mb-4 max-w-2xl mx-auto leading-relaxed">
            نحن نعمل على شيء مذهل وسيكون جاهزاً قريباً
          </p>
          <p className="text-lg text-green-200 max-w-xl mx-auto">
            كن أول من يعرف عند إطلاق منصتنا الجديدة
          </p>
        </div>



        {/* Mobile Ordering Section */}
        <div className="mb-12 w-full max-w-4xl mx-auto animate-slide-up-delayed">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl relative overflow-hidden">
            {/* Floating Phone Mockup */}
            <div className="absolute -top-8 -right-8 w-32 h-64 bg-gradient-to-b from-green-400 to-green-600 rounded-3xl shadow-2xl transform rotate-12 opacity-80 animate-float">
              <div className="w-24 h-40 bg-black rounded-2xl mx-auto mt-4 relative">
                <div className="w-16 h-8 bg-green-500 rounded-lg mx-auto mt-2 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">📱</span>
                </div>
                <div className="w-12 h-12 bg-green-400 rounded-full mx-auto mt-3 flex items-center justify-center">
                  <span className="text-white text-lg">💬</span>
                </div>
              </div>
            </div>

            {/* WhatsApp Icon */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <span className="text-white text-2xl">📱</span>
            </div>

            <div className="text-center relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-xl">🚀</span>
                </div>
                <h3 className="text-2xl font-bold text-white">اطلب من جوالك</h3>
              </div>

              <p className="text-green-100 mb-8 text-lg leading-relaxed">
                نحن نقبل طلباتكم عبر الهاتف المحمول أو واتساب
                <br />
                <span className="text-yellow-300 font-semibold">سهل وسريع وآمن</span>
              </p>

              {/* Contact Methods */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">📞</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">اتصل بنا</h4>
                  <p className="text-green-100 text-sm mb-3">اطلب عبر الهاتف</p>
                  <div className="space-y-2">
                    <div className="bg-white/20 rounded-lg p-3 text-white font-mono text-lg">0500861005</div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">💬</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">واتساب</h4>
                  <p className="text-green-100 text-sm mb-3">اطلب عبر الرسائل</p>
                  <a
                    href="https://wa.me/966500861005?text=مرحبا، أريد طلب مياه من أمواج"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 rounded-lg p-3 text-white font-semibold transition-all duration-300 hover:scale-105 cursor-pointer block text-center"
                  >
                    <span className="text-xl mr-2">📱</span>
                    ابدأ المحادثة
                  </a>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: '⚡', text: 'سريع', desc: 'طلب فوري' },
                  { icon: '🔒', text: 'آمن', desc: 'دفع آمن' },
                  { icon: '🚚', text: 'توصيل', desc: 'مجاني' }
                ].map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <div className="text-white font-semibold text-sm">{feature.text}</div>
                    <div className="text-green-200 text-xs">{feature.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>




      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }
        
        .animate-fade-in-delayed {
          animation: fade-in 1s ease-out 0.3s both;
        }
        
        .animate-slide-up-delayed {
          animation: slide-up 1s ease-out 0.6s both;
        }
        
        .animate-fade-in-slow {
          animation: fade-in 1.5s ease-out 0.9s both;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(12deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}