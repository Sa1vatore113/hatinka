import React, { useState, useEffect } from 'react';
import { Phone, Clock, MapPin, ChevronDown, UtensilsCrossed, ExternalLink, X, Utensils, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
    const [activeCategory, setActiveCategory] = useState('hot');
    const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
    const [isCallModalOpen, setIsCallModalOpen] = useState(false);

    // Данные меню на основе ваших фото
    const menuData = {
        snacks: {
            title: "Холодні закуски",
            items: [
                { name: "Оселедець з цибулею" },
                { name: "М'ясна нарізка" },
                { name: "Сало з часником" },
                { name: "Млинці з ікрою" },
                { name: "Оливки, Маслини" }
            ]
        },
        salads: {
            title: "Салати",
            items: [
                { name: "Салат із свіжих овочів" },
                { name: "Салат з капусти та огірків" },
                { name: "Салат 'Олів'є'" }
            ]
        },
        first: {
            title: "Перші страви",
            items: [
                { name: "Солянка" },
                { name: "Борщ зі сметаною" }
            ]
        },
        hot: {
            title: "Гарячі страви",
            items: [
                { name: "Пельмені домашні (свинина/курка)" },
                { name: "Пельмені по-царськи" },
                { name: "Плов" },
                { name: "Картопля смажена" },
                { name: "Куряча відбивна з грибами" },
                { name: "Млинці з м'ясом" },
                { name: "Яйця з салом" },
                { name: "Вареники" }
            ]
        }
    };

    const drinks = [
        { name: "Хріновуха", icon: "🥃", desc: "Класична домашня" },
        { name: "Лимончело", icon: "🍋", desc: "Свіжа та цитрусова" },
        { name: "Вишнівка", icon: "🍒", desc: "Солодка та ароматна" },
        { name: "Перцовка", icon: "🌶️", desc: "З гострим характером" }
    ];

    const scrollToSection = (id, category = null) => {
        if (category) setActiveCategory(category);
        const element = document.getElementById(id);
        if (element) {
            const offset = 90;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: elementPosition, behavior: "smooth" });
        }
        setIsMenuDropdownOpen(false);
    };

    // Отрисовка вашего логотипа (точная копия присланного файла)
    const LogoIcon = ({ className }) => (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="5" />
            {/* Вилка */}
            <path d="M36 32V42M41 32V42M46 32V42" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M36 42C36 48 46 48 46 42" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M41 46V72" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            {/* Ложка */}
            <ellipse cx="64" cy="40" rx="8" ry="11" stroke="currentColor" strokeWidth="4" />
            <path d="M64 51V72" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
    );

    return (
        <div className="min-h-screen bg-[#3d3730] text-white selection:bg-white selection:text-[#3d3730] overflow-x-hidden font-rounded">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&family=Pacifico&display=swap');
        .font-rounded { font-family: 'Comfortaa', cursive; }
        .font-hand { font-family: 'Pacifico', cursive; }
        html { scroll-behavior: smooth; }
      `}</style>

            {/* Хедер */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#3d3730]/90 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-4 flex justify-between items-center shadow-lg">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <LogoIcon className="w-10 h-10 text-white transition-transform duration-500 group-hover:rotate-[360deg]" />
                    <span className="text-base md:text-xl font-bold tracking-tight uppercase leading-tight">Смачна хатинка</span>
                </motion.div>

                <nav className="flex items-center gap-3 md:gap-10">
                    <div className="relative">
                        <button
                            onClick={() => setIsMenuDropdownOpen(!isMenuDropdownOpen)}
                            className="flex items-center gap-1 font-bold hover:text-white/70 transition-colors py-2 text-xs md:text-sm uppercase tracking-widest"
                        >
                            Меню <ChevronDown size={14} className={`transition-transform duration-300 ${isMenuDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isMenuDropdownOpen && (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="fixed inset-0 z-[-1]" onClick={() => setIsMenuDropdownOpen(false)}
                                    ></motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                        className="absolute top-full right-0 mt-4 w-60 bg-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.4)] overflow-hidden border border-white/10"
                                    >
                                        {Object.keys(menuData).map((key) => (
                                            <button
                                                key={key}
                                                onClick={() => scrollToSection('menu', key)}
                                                className="w-full text-left px-6 py-4 text-[#3d3730] font-bold hover:bg-[#fcf8f4] transition-colors border-b border-gray-100 last:border-0 text-sm"
                                            >
                                                {menuData[key].title}
                                            </button>
                                        ))}
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={() => scrollToSection('contacts')}
                        className="font-bold hover:text-white/70 transition-colors text-xs md:text-sm uppercase tracking-widest"
                    >
                        Контакти
                    </button>

                    <button
                        onClick={() => setIsCallModalOpen(true)}
                        className="bg-white text-[#3d3730] w-10 h-10 md:w-auto md:px-6 md:h-11 rounded-full text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all active:scale-90 shadow-xl"
                    >
                        <Phone size={16} /> <span className="hidden md:inline uppercase tracking-widest">Зв'язок</span>
                    </button>
                </nav>
            </header>

            {/* Модалка Звонка */}
            <AnimatePresence>
                {isCallModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsCallModalOpen(false)}
                        ></motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 30 }}
                            className="relative bg-[#3d3730] border border-white/20 w-full max-w-sm rounded-[3rem] p-10 shadow-2xl"
                        >
                            <button onClick={() => setIsCallModalOpen(false)} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
                                <X size={28} />
                            </button>
                            <h3 className="text-3xl font-bold mb-10 text-center uppercase tracking-tighter">Дзвоніть нам</h3>
                            <div className="space-y-6">
                                {[
                                    { name: "Олександр", tel: "0935163908" },
                                    { name: "Ірина", tel: "0957135702" }
                                ].map((p, i) => (
                                    <motion.a
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        key={i} href={`tel:${p.tel}`}
                                        className="flex flex-col items-center bg-white/5 hover:bg-white/10 p-6 rounded-[2rem] transition-all border border-white/5 group"
                                    >
                                        <span className="text-white/50 text-xs mb-1 uppercase tracking-widest">{p.name}</span>
                                        <span className="text-2xl font-bold group-hover:text-white">{p.tel.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4')}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section className="relative pt-56 pb-40 px-6 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative mb-14"
                >
                    <LogoIcon className="w-48 h-48 md:w-64 md:h-64 text-white drop-shadow-[0_15px_40px_rgba(255,255,255,0.15)]" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-6xl md:text-[9rem] font-bold mb-6 tracking-tighter uppercase leading-[0.85]"
                >
                    Смачна хатинка
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 1 }}
                    className="text-2xl md:text-4xl text-white/90 font-hand mb-16"
                >
                    Кафе з домашньою кухнею
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex items-center gap-4 bg-white/5 border border-white/10 px-10 py-5 rounded-full shadow-2xl backdrop-blur-sm hover:border-white/30 transition-colors"
                >
                    <Clock size={24} className="text-white/40" />
                    <span className="text-xl md:text-2xl font-bold">Щодня: <span className="text-white/60">08:00 — 20:00</span></span>
                </motion.div>

                <motion.button
                    animate={{ y: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    onClick={() => scrollToSection('menu')}
                    className="mt-24 opacity-20 hover:opacity-100 transition-opacity cursor-pointer"
                >
                    <ChevronDown size={70} strokeWidth={1} />
                </motion.button>
            </section>

            {/* Блок с картинками из вашего макета */}
            <section className="py-20 px-6 max-w-6xl mx-auto overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800", title: "Свіжі салати" },
                        { img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800", title: "Гарячі перші страви" },
                        { img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800", title: "Домашні пельмені" }
                    ].map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="h-80 rounded-[3rem] overflow-hidden border border-white/10 relative group shadow-2xl"
                        >
                            <img src={card.img} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-10">
                                <p className="text-xl font-bold uppercase tracking-widest">{card.title}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Меню */}
            <section id="menu" className="py-32 px-6 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center mb-24"
                >
                    <h2 className="text-5xl md:text-8xl font-bold border-b-8 border-white/5 inline-block pb-6 uppercase tracking-tighter">Наше меню</h2>
                </motion.div>

                {/* Категории */}
                <div className="flex flex-wrap justify-center gap-4 mb-20 sticky top-24 z-30 bg-[#3d3730]/60 backdrop-blur-md p-4 rounded-full border border-white/5 shadow-2xl">
                    {Object.keys(menuData).map((key) => (
                        <button
                            key={key}
                            onClick={() => setActiveCategory(key)}
                            className={`px-6 py-4 rounded-full transition-all font-bold text-xs md:text-sm uppercase tracking-widest border-2 ${activeCategory === key
                                    ? "bg-white text-[#3d3730] border-white scale-105 shadow-xl"
                                    : "bg-transparent text-white border-white/10 hover:border-white/40"
                                }`}
                        >
                            {menuData[key].title}
                        </button>
                    ))}
                </div>

                {/* Список блюд */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white/5 p-10 md:p-20 rounded-[4rem] border border-white/5 shadow-3xl relative"
                    >
                        <div className="absolute -top-10 -right-10 opacity-5 rotate-12">
                            <Utensils size={200} />
                        </div>

                        <h3 className="text-4xl font-bold mb-16 font-hand text-center text-white/80">{menuData[activeCategory].title}</h3>
                        <div className="grid gap-10">
                            {menuData[activeCategory].items.map((item, index) => (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    key={index}
                                    className="flex justify-between items-baseline group"
                                >
                                    <span className="text-xl md:text-2xl group-hover:text-white transition-colors duration-300 tracking-tight leading-tight">{item.name}</span>
                                    <div className="flex-grow mx-6 border-b border-white/5 mb-2 opacity-30 group-hover:opacity-100 transition-opacity"></div>
                                    <span className="font-bold text-white/20 text-xs uppercase tracking-widest group-hover:text-white/60">Ціна</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </section>

            {/* Настойки */}
            <section className="py-40 bg-black/40 border-y border-white/5">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-5xl md:text-7xl font-bold mb-24 text-center font-hand text-white/90">Напої власного виробництва</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {drinks.map((drink, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -20, scale: 1.05 }}
                                className="bg-[#3d3730] border border-white/5 rounded-[3rem] p-12 text-center shadow-2xl group transition-all hover:bg-white hover:text-[#3d3730]"
                            >
                                <div className="w-32 h-32 rounded-full border-4 border-white/5 mb-10 flex items-center justify-center bg-black/20 mx-auto text-6xl shadow-inner group-hover:border-[#3d3730]/10">
                                    {drink.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter">{drink.name}</h3>
                                <p className="opacity-40 group-hover:opacity-70 leading-relaxed text-xs uppercase tracking-[0.2em]">{drink.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Контакты */}
            <section id="contacts" className="py-40 px-6 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/5 border border-white/10 rounded-[5rem] p-12 md:p-24 relative shadow-3xl overflow-hidden"
                >
                    <div className="relative z-10 grid lg:grid-cols-2 gap-24">
                        <div className="flex flex-col justify-center">
                            <h2 className="text-5xl md:text-8xl font-bold mb-14 uppercase tracking-tighter leading-none">Чекаємо<br />на Вас!</h2>
                            <div className="space-y-12">
                                <div className="flex items-start gap-8 group">
                                    <div className="bg-white text-[#3d3730] p-6 rounded-[2rem] shadow-2xl shrink-0 transition-transform group-hover:rotate-12">
                                        <MapPin size={36} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-3xl leading-tight mb-2">пр. Перемоги 75</p>
                                        <p className="text-white/40 text-lg font-bold uppercase tracking-widest text-sm">торець будинку, біля 1-го під'їзду</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-8 group">
                                    <div className="bg-white text-[#3d3730] p-6 rounded-[2rem] shadow-2xl shrink-0 transition-transform group-hover:-rotate-12">
                                        <UtensilsCrossed size={36} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-3xl leading-tight mb-2">Коло 20 трамвая</p>
                                        <p className="text-white/40 text-lg font-bold uppercase tracking-widest text-sm">тролейбуси: 2, 40, 58</p>
                                    </div>
                                </div>
                                <div className="pt-10 border-t border-white/5">
                                    <button
                                        onClick={() => setIsCallModalOpen(true)}
                                        className="flex items-center gap-6 group hover:text-white/70 transition-colors"
                                    >
                                        <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#3d3730] transition-all shadow-xl">
                                            <Phone size={28} />
                                        </div>
                                        <span className="text-3xl font-bold uppercase tracking-tighter border-b-4 border-white/10 group-hover:border-white transition-all">Подзвонити</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="relative aspect-square lg:h-[500px] rounded-[4rem] bg-black/60 border border-white/5 flex flex-col items-center justify-center text-center p-16 shadow-inner group overflow-hidden"
                        >
                            <Heart className="absolute top-10 right-10 text-white/5 group-hover:text-white/20 group-hover:scale-150 transition-all duration-700" size={100} />
                            <p className="italic text-white/30 mb-12 text-xl max-w-xs leading-relaxed">Подивіться на карті, як найзручніше до нас дістатися</p>
                            <a
                                href="https://www.google.com/maps/search/пр.+Перемоги+75"
                                target="_blank" rel="noopener noreferrer"
                                className="w-full bg-white text-[#3d3730] py-7 rounded-[2rem] font-bold text-xl flex items-center justify-center gap-4 hover:bg-gray-200 transition-all active:scale-95 shadow-2xl uppercase tracking-[0.3em]"
                            >
                                Maps <ExternalLink size={24} />
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Футер */}
            <footer className="py-32 border-t border-white/5 text-center">
                <motion.div
                    whileInView={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 mx-auto mb-10 opacity-20"
                >
                    <LogoIcon className="w-full h-full text-white" />
                </motion.div>
                <p className="text-white/40 text-xs uppercase tracking-[0.6em] mb-4">Смачна хатинка — з любов'ю до Вас</p>
                <div className="flex justify-center gap-2 text-white/10 text-[10px] uppercase tracking-widest">
                    <span>© 2024</span>
                    <span>•</span>
                    <span>Домашня кухня</span>
                    <span>•</span>
                    <span>Всі права захищені</span>
                </div>
            </footer>
        </div>
    );
};

export default App;
