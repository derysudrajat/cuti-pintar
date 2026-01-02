import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, Coffee, Info, Star, Filter, Search, HelpCircle, ArrowUpDown, Palmtree, ChevronRight, Settings, Briefcase, Frown, Smile, MessageSquareQuote, ToggleLeft, ToggleRight, CalendarPlus, Download, List } from 'lucide-react';

// --- DATA LIBUR NASIONAL & CUTI BERSAMA (UPDATED SKB 3 MENTERI & BI PREDICTION) ---
const HOLIDAYS_DATA = {
  2025: [
    { date: '2025-01-01', name: 'Tahun Baru 2025 Masehi', type: 'national' },
    { date: '2025-01-27', name: 'Isra Mikraj Nabi Muhammad SAW', type: 'national' },
    { date: '2025-01-28', name: 'Cuti Bersama Imlek', type: 'joint' },
    { date: '2025-01-29', name: 'Tahun Baru Imlek 2576 Kongzili', type: 'national' },
    { date: '2025-03-28', name: 'Cuti Bersama Nyepi', type: 'joint' },
    { date: '2025-03-29', name: 'Hari Suci Nyepi (Tahun Baru Saka 1947)', type: 'national' },
    { date: '2025-03-31', name: 'Idul Fitri 1446 Hijriah', type: 'national' },
    { date: '2025-04-01', name: 'Idul Fitri 1446 Hijriah', type: 'national' },
    { date: '2025-04-02', name: 'Cuti Bersama Idul Fitri', type: 'joint' },
    { date: '2025-04-03', name: 'Cuti Bersama Idul Fitri', type: 'joint' },
    { date: '2025-04-04', name: 'Cuti Bersama Idul Fitri', type: 'joint' },
    { date: '2025-04-07', name: 'Cuti Bersama Idul Fitri', type: 'joint' },
    { date: '2025-04-18', name: 'Wafat Yesus Kristus', type: 'national' },
    { date: '2025-04-20', name: 'Kebangkitan Yesus Kristus (Paskah)', type: 'national' },
    { date: '2025-05-01', name: 'Hari Buruh Internasional', type: 'national' },
    { date: '2025-05-12', name: 'Hari Raya Waisak 2569 BE', type: 'national' },
    { date: '2025-05-13', name: 'Cuti Bersama Waisak', type: 'joint' },
    { date: '2025-05-29', name: 'Kenaikan Yesus Kristus', type: 'national' },
    { date: '2025-05-30', name: 'Cuti Bersama Kenaikan Yesus Kristus', type: 'joint' },
    { date: '2025-06-01', name: 'Hari Lahir Pancasila', type: 'national' },
    { date: '2025-06-06', name: 'Idul Adha 1446 Hijriah', type: 'national' },
    { date: '2025-06-09', name: 'Cuti Bersama Idul Adha', type: 'joint' },
    { date: '2025-06-27', name: 'Tahun Baru Islam 1447 Hijriah', type: 'national' },
    { date: '2025-08-17', name: 'Hari Kemerdekaan RI', type: 'national' },
    { date: '2025-09-05', name: 'Maulid Nabi Muhammad SAW', type: 'national' },
    { date: '2025-12-25', name: 'Hari Raya Natal', type: 'national' },
    { date: '2025-12-26', name: 'Cuti Bersama Hari Raya Natal', type: 'joint' },
  ],
  2026: [
    { date: '2026-01-01', name: 'Tahun Baru 2026 Masehi', type: 'national' },
    { date: '2026-01-02', name: 'Cuti Bersama Tahun Baru (Prediksi)', type: 'joint' },
    { date: '2026-02-16', name: 'Isra Mikraj (Prediksi)', type: 'national' },
    { date: '2026-02-17', name: 'Tahun Baru Imlek 2577 Kongzili', type: 'national' },
    { date: '2026-03-19', name: 'Hari Suci Nyepi', type: 'national' },
    { date: '2026-03-20', name: 'Idul Fitri 1447 H (Hari 1) & Cuti Nyepi', type: 'national' },
    { date: '2026-03-21', name: 'Idul Fitri 1447 H (Hari 2)', type: 'national' },
    { date: '2026-03-23', name: 'Cuti Bersama Idul Fitri', type: 'joint' },
    { date: '2026-03-24', name: 'Cuti Bersama Idul Fitri', type: 'joint' },
    { date: '2026-03-25', name: 'Cuti Bersama Idul Fitri', type: 'joint' },
    { date: '2026-03-26', name: 'Cuti Bersama Idul Fitri', type: 'joint' },
    { date: '2026-04-03', name: 'Wafat Yesus Kristus', type: 'national' },
    { date: '2026-05-01', name: 'Hari Buruh Internasional', type: 'national' },
    { date: '2026-05-14', name: 'Kenaikan Yesus Kristus', type: 'national' },
    { date: '2026-05-15', name: 'Cuti Bersama Kenaikan (Prediksi)', type: 'joint' },
    { date: '2026-05-27', name: 'Idul Adha 1447 Hijriah', type: 'national' },
    { date: '2026-05-28', name: 'Cuti Bersama Idul Adha (Prediksi)', type: 'joint' },
    { date: '2026-06-01', name: 'Hari Lahir Pancasila', type: 'national' },
    { date: '2026-06-16', name: 'Tahun Baru Islam 1448 H', type: 'national' },
    { date: '2026-08-17', name: 'Hari Kemerdekaan RI', type: 'national' },
    { date: '2026-08-25', name: 'Maulid Nabi Muhammad SAW', type: 'national' },
    { date: '2026-12-25', name: 'Hari Raya Natal', type: 'national' },
    { date: '2026-12-26', name: 'Cuti Bersama Natal (Prediksi)', type: 'joint' },
  ]
};

// --- UTILS ---
const formatDateYMD = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}${m}${d}`;
};

// HELPER BARU: Memastikan string tanggal 'YYYY-MM-DD' dibaca sebagai waktu lokal
const getSafeDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
};

// UPDATED: Menambahkan nama hari (weekday) ke dalam formatter
const getDayName = (date) => new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(date);
const formatDateShort = (date) => new Intl.DateTimeFormat('id-ID', { weekday: 'short', day: 'numeric', month: 'short' }).format(date);
const formatDateFull = (dateStr) => new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(getSafeDate(dateStr));
const formatDateMonthOnly = (dateStr) => new Intl.DateTimeFormat('id-ID', { weekday: 'short', day: 'numeric', month: 'short' }).format(getSafeDate(dateStr));

const addToGoogleCalendar = (combo) => {
    const startDate = formatDateYMD(combo.startDate);
    const endDateObj = new Date(combo.endDate);
    endDateObj.setDate(endDateObj.getDate() + 1);
    const endDate = formatDateYMD(endDateObj);
    
    const title = encodeURIComponent("Cuti Healing ✨");
    const details = encodeURIComponent(`Alasan: ${combo.reason}\n\nRekomendasi dari CutiPintar. \nTotal Libur: ${combo.days.length} Hari.`);
    
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}`, '_blank');
};

const downloadICS = (combo) => {
    const startDate = formatDateYMD(combo.startDate);
    const endDateObj = new Date(combo.endDate);
    endDateObj.setDate(endDateObj.getDate() + 1);
    const endDate = formatDateYMD(endDateObj);

    const title = "Cuti Healing ✨";
    const description = `Alasan: ${combo.reason}. Rekomendasi dari CutiPintar.`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART;VALUE=DATE:${startDate}`,
      `DTEND;VALUE=DATE:${endDate}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `cutipintar-${startDate}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// --- COPYWRITING ---
const getWittyReason = (monthIndex, type, totalDays) => {
    const reasons = [
        "Kerja terus, kaya kagak, tipes iya.",
        "Self reward, kan udah kerja bagai kuda.",
        "Cuti aja, kantor gak bakal rubuh kok ditinggal bentar.",
        "Healing tipis-tipis biar gak gila.",
        "Rehat sejenak dari drama grup WhatsApp kantor.",
        "Mumpung bos lagi dinas luar kota.",
        "Jatah cuti masih banyak, sayang kalau hangus.",
        "Menghindari burnout (alasan medis, valid no debat).",
        "Pura-pura sakit pinggang, padahal mau staycation."
    ];

    const specificReasons = {
        0: "Tahun baru, semangat baru (bohong, butuh libur lagi).",
        1: "Bulan penuh cinta, butuh waktu buat 'me time' atau 'we time'.",
        2: "Maret greget, mari kita reset otak dulu.",
        3: "Persiapan mental sebelum Q2 dimulai.",
        4: "Mei-ngkisah kasih di sekolah (eh, liburan maksudnya).",
        5: "Pertengahan tahun, evaluasi hidup sambil ngopi di pantai.",
        6: "Juli santai, biar gak tegang kayak kabel listrik.",
        7: "Agustus-an, merdeka dari deadline sejenak.",
        8: "Ceria September, jangan kasih kendor liburannya.",
        9: "Oktober, saatnya pura-pura sibuk liburan.",
        10: "November rain, enak buat molor di kasur seharian.",
        11: "Desember ceria, ngabisin sisa cuti dengan gaya."
    };

    if (type === 'manual_weekend') {
        const weekendReasons = [
            "Gak ada tanggal merah? Bikin sendiri lah bos!",
            "Weekend Warrior: Liburan jalur mandiri.",
            "Hindari keramaian tanggal merah, liburan sekarang aja.",
            "Cuti di hari biasa = Healing maksimal sepi pengunjung.",
            "Mumpung tiket pesawat murah (bukan high season)."
        ];
        return weekendReasons[Math.floor(Math.random() * weekendReasons.length)];
    }
    
    if (totalDays > 8) {
        return "Fix ini libur panjang banget! Awas lupa password PC kantor.";
    }

    return specificReasons[monthIndex] || reasons[Math.floor(Math.random() * reasons.length)];
};

// --- HELPER FUNCTIONS ---
const getMonthName = (date) => new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(date);
const getMonthNameByIndex = (index) => {
    const date = new Date(2025, index, 1);
    return new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(date);
};

const isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

const getHoliday = (dateStr, year) => {
  return HOLIDAYS_DATA[year]?.find(h => h.date === dateStr);
};

// --- COMPONENTS ---
const Badge = ({ children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20",
    green: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20",
    purple: "bg-purple-50 text-purple-700 ring-1 ring-purple-600/20",
    orange: "bg-orange-50 text-orange-700 ring-1 ring-orange-600/20",
    gray: "bg-gray-50 text-gray-700 ring-1 ring-gray-600/20",
    rose: "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20",
    indigo: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/20",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase ${colors[color] || colors.gray}`}>
      {children}
    </span>
  );
};

const Timeline = ({ days }) => {
  return (
    <div className="flex items-center gap-1.5 mt-4 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
      {days.map((day, idx) => {
        let bgColor = "bg-white border-gray-100 text-gray-400"; // Work
        let label = "K";
        let glow = "";
        
        if (day.type === 'holiday') {
          bgColor = "bg-rose-50 border-rose-100 text-rose-500";
          label = "L"; // Libur Nasional
        } else if (day.type === 'joint_leave') {
           bgColor = "bg-purple-50 border-purple-100 text-purple-500";
           label = "B"; // Cuti Bersama
        } else if (day.type === 'weekend') {
          bgColor = "bg-amber-50 border-amber-100 text-amber-500";
          label = "W";
        } else if (day.type === 'leave') {
          bgColor = "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-200";
          label = "C";
          glow = "ring-2 ring-emerald-100 ring-offset-1";
        }

        // FORMAT HARI (ex: Sen, Sel)
        const dayName = new Intl.DateTimeFormat('id-ID', { weekday: 'short' }).format(day.dateObj);

        return (
          <div key={idx} className="flex flex-col items-center gap-1 min-w-[30px] group">
             {/* NAMA HARI DITAMBAHKAN DI SINI */}
             <span className="text-[9px] font-medium text-slate-400 uppercase tracking-tight">
               {dayName}
             </span>

             <span className={`text-[10px] font-medium font-mono ${day.type === 'leave' ? 'text-emerald-600 font-bold' : 'text-gray-400'}`}>
               {day.dateObj.getDate()}
             </span>
             <div 
              title={`${formatDateShort(day.dateObj)} - ${day.note || (day.type === 'leave' ? 'Cuti (Approved)' : 'Kerja')}`}
              className={`w-7 h-9 rounded-lg flex items-center justify-center text-xs font-bold border transition-all duration-200 group-hover:-translate-y-0.5 ${bgColor} ${glow}`}
             >
               {label}
             </div>
          </div>
        )
      })}
    </div>
  )
}

const RecommendationCard = ({ combo }) => {
  const totalDays = combo.days.length;
  const leaveDays = combo.leaveCount;
  const efficiency = (totalDays / (leaveDays || 1)).toFixed(1);

  let category = "Long Weekend";
  let categoryColor = "blue";
  
  if (totalDays >= 9) {
    category = "Healing Sultan";
    categoryColor = "purple";
  } else if (totalDays >= 5) {
    category = "Super Healing";
    categoryColor = "green";
  } else if (leaveDays === 0) {
    category = "Rezeki Anak Soleh";
    categoryColor = "indigo";
  } else if (combo.type === 'manual_weekend') {
    category = "Weekend Warrior";
    categoryColor = "rose";
  } else {
    category = "Napas Dikit";
  }

  return (
    <div className="group bg-white rounded-2xl border border-gray-100/50 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-bl-full -z-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex justify-between items-start mb-5 relative">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className="font-bold text-gray-800 text-xl tracking-tight">
              {formatDateShort(combo.startDate)} <span className='text-gray-300 px-1'>—</span> {formatDateShort(combo.endDate)}
            </h3>
            {efficiency > 3 && <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />}
          </div>
          <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">{getMonthName(combo.startDate)} {combo.startDate.getFullYear()}</p>
        </div>
        <Badge color={categoryColor}>{category}</Badge>
      </div>

      {/* Copywriting Alasan */}
      <div className="mb-5 bg-slate-50/80 border border-slate-100 rounded-lg p-3 flex gap-3">
         <div className="mt-0.5 text-emerald-500">
            <MessageSquareQuote size={18} />
         </div>
         <p className="text-sm text-slate-600 italic font-medium">"{combo.reason}"</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-slate-50 rounded-xl p-3 flex flex-col items-center justify-center border border-slate-100 group-hover:border-slate-200 transition-colors">
          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-0.5">Durasi Kabur</p>
          <p className="font-bold text-slate-700 text-xl leading-none">{totalDays}<span className="text-xs font-normal text-slate-400 ml-0.5">hr</span></p>
        </div>
        <div className="bg-emerald-50/50 rounded-xl p-3 flex flex-col items-center justify-center border border-emerald-100 group-hover:border-emerald-200 transition-colors">
          <p className="text-emerald-600/70 text-[10px] uppercase font-bold tracking-wider mb-0.5">Burn Cuti</p>
          <p className="font-bold text-emerald-600 text-xl leading-none">{leaveDays}<span className="text-xs font-normal text-emerald-500 ml-0.5">hr</span></p>
        </div>
        <div className="bg-blue-50/50 rounded-xl p-3 flex flex-col items-center justify-center border border-blue-100 group-hover:border-blue-200 transition-colors">
          <p className="text-blue-600/70 text-[10px] uppercase font-bold tracking-wider mb-0.5">ROI Healing</p>
          <p className="font-bold text-blue-600 text-xl leading-none">{efficiency}x</p>
        </div>
      </div>

      <div className="flex items-start gap-2 mb-2 bg-gray-50/80 p-3 rounded-lg border border-gray-100 text-xs text-gray-600">
         <Info size={14} className="mt-0.5 text-gray-400 shrink-0" />
         <span>
           <span className="font-semibold text-gray-700">Taktik:</span> {combo.type === 'manual_weekend' ? 'Ciptakan long weekend sendiri!' : 'Manfaatkan Cuti Bersama/Libur &'} ajukan cuti tanggal <span className="font-mono font-medium text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-100">{combo.days.filter(d => d.type === 'leave').map(d => formatDateShort(d.dateObj)).join(', ')}</span>
         </span>
      </div>

      <Timeline days={combo.days} />
      
      {/* Calendar Actions */}
      <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap gap-2 justify-end">
          <button 
            onClick={() => addToGoogleCalendar(combo)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs font-semibold transition-colors border border-blue-100"
          >
            <CalendarPlus size={14} />
            Google Cal
          </button>
          <button 
            onClick={() => downloadICS(combo)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold transition-colors border border-gray-200"
          >
            <Download size={14} />
            Apple/Outlook (.ics)
          </button>
      </div>

      {combo.holidaysInvolved.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {combo.holidaysInvolved.map((h, i) => {
             // CONDITIONAL STYLING: Check if it's 'joint_leave' (Cuti Bersama) or 'holiday' (Nasional)
             const isJoint = h.type === 'joint_leave';
             return (
                <span key={i} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-medium ${isJoint ? 'bg-purple-50 border-purple-100 text-purple-600' : 'bg-rose-50 border-rose-100 text-rose-600'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isJoint ? 'bg-purple-400' : 'bg-rose-400'}`}></span>
                {/* SHOWING DATE HERE */}
                {h.name} <span className={`${isJoint ? 'text-purple-400' : 'text-rose-400'} font-normal ml-0.5`}>({formatDateMonthOnly(h.date)})</span>
                </span>
             );
          })}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [year, setYear] = useState(2026); // Default 2026 based on context
  const [leaveQuota, setLeaveQuota] = useState(12);
  const [startMonth, setStartMonth] = useState(0); // Jan
  const [endMonth, setEndMonth] = useState(11); // Dec
  const [maxLeavePerTrip, setMaxLeavePerTrip] = useState(2);
  const [includeJointLeave, setIncludeJointLeave] = useState(true); 
  const [recommendations, setRecommendations] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [sortBy, setSortBy] = useState('efficiency');

  // --- MEMOIZED HOLIDAY LIST ---
  const holidayList = useMemo(() => {
    const data = HOLIDAYS_DATA[year] || [];
    return data.filter(h => {
        // Optional: Filter by selected range if desired, or show all for context
        // Showing only selected range for now to match user focus
        const d = getSafeDate(h.date); // Use safe date
        const m = d.getMonth();
        return m >= startMonth && m <= endMonth;
    });
  }, [year, startMonth, endMonth]);

  // --- ENGINE LOGIC ---
  const calculateRecommendations = () => {
    setIsSearching(true);
    setTimeout(() => {
        let results = [];
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31);
        
        let current = new Date(startDate);
        const yearMap = [];

        while (current <= endDate) {
        // FIX: Use local components instead of toISOString() to avoid timezone shift
        const y = current.getFullYear();
        const m = String(current.getMonth() + 1).padStart(2, '0');
        const d = String(current.getDate()).padStart(2, '0');
        const dateStr = `${y}-${m}-${d}`;
        
        const holidayData = getHoliday(dateStr, year);
        const weekend = isWeekend(current);
        
        // Determine day type
        let type = 'work';
        let note = null;

        if (holidayData) {
            // LOGIC BARU: Cek Toggle Cuti Bersama
            if (holidayData.type === 'joint' && !includeJointLeave) {
                // Jika Cuti Bersama OFF, anggap hari kerja (atau weekend jika sabtu/minggu)
                if (weekend) {
                    type = 'weekend';
                } else {
                    type = 'work';
                }
            } else {
                type = holidayData.type === 'joint' ? 'joint_leave' : 'holiday';
                note = holidayData.name;
            }
        } else if (weekend) {
            type = 'weekend';
        }

        yearMap.push({
            dateObj: new Date(current),
            dateStr: dateStr,
            type: type, // 'work', 'holiday', 'joint_leave', 'weekend'
            note: note,
            isHoliday: type === 'holiday',
            isJointLeave: type === 'joint_leave',
            holidayName: note
        });
        current.setDate(current.getDate() + 1);
        }

        const islands = [];
        let tempIsland = [];
        
        // ISLAND DETECTION
        yearMap.forEach((day, idx) => {
        if (day.type !== 'work') {
            tempIsland.push(idx);
        } else {
            if (tempIsland.length > 0) {
            islands.push(tempIsland);
            tempIsland = [];
            }
        }
        });
        if (tempIsland.length > 0) islands.push(tempIsland);

        // 1. STANDARD SCAN (Bridging Gaps)
        for (let i = 0; i < islands.length; i++) {
            let currentComboIndices = [...islands[i]];
            let usedLeave = 0;
            
            for (let j = i + 1; j < islands.length; j++) {
                const prevIslandEnd = currentComboIndices[currentComboIndices.length - 1];
                const nextIslandStart = islands[j][0];
                const gap = nextIslandStart - prevIslandEnd - 1;

                if (gap > 0 && (usedLeave + gap) <= maxLeavePerTrip) {
                if ((usedLeave + gap) > leaveQuota) break; 

                for (let k = prevIslandEnd + 1; k < nextIslandStart; k++) {
                    currentComboIndices.push(k);
                }
                currentComboIndices = [...currentComboIndices, ...islands[j]];
                usedLeave += gap;
                } else {
                break; 
                }
            }

            if (usedLeave > 0 || currentComboIndices.length >= 3) {
                const days = currentComboIndices.sort((a,b) => a-b).map(idx => {
                    const d = yearMap[idx];
                    if (d.type === 'work') {
                    return { ...d, type: 'leave' };
                    }
                    return d;
                });

                const startDate = days[0].dateObj;
                const endDate = days[days.length-1].dateObj;
                
                // Collect holidays with dates for the pills
                // IMPORTANT: INCLUDE TYPE 'type'
                const holidaysInvolved = days
                    .filter(d => d.isHoliday || d.isJointLeave)
                    .map(d => ({ name: d.holidayName, date: d.dateStr, type: d.type })); // Add type here!
                
                const uniqueHolidaysInvolved = [];
                const seenDates = new Set();
                holidaysInvolved.forEach(h => {
                    if(!seenDates.has(h.date)) {
                        seenDates.add(h.date);
                        uniqueHolidaysInvolved.push(h);
                    }
                });

                results.push({
                    id: `${startDate.getTime()}-${endDate.getTime()}`,
                    startDate,
                    endDate,
                    days,
                    leaveCount: usedLeave,
                    holidaysInvolved: uniqueHolidaysInvolved,
                    type: 'standard',
                    reason: getWittyReason(startDate.getMonth(), 'standard', days.length)
                });
            }
        }

        // 2. WEEKEND WARRIOR SCAN
        for (let m = 0; m < 12; m++) {
            if (m < startMonth || m > endMonth) continue;
            if (maxLeavePerTrip < 1 || leaveQuota < 1) continue;

            const workFridays = yearMap.filter(d => 
                d.dateObj.getMonth() === m && 
                d.dateObj.getDay() === 5 && 
                d.type === 'work'
            );

            if (workFridays.length > 0) {
                 const midIndex = Math.floor(workFridays.length / 2);
                 const candidates = [
                    workFridays[midIndex],
                    ...workFridays.filter((_, i) => i !== midIndex)
                 ];

                 let selectedFriday = null;

                 for (let friday of candidates) {
                     const fridayTime = friday.dateObj.getTime();
                     const isOverlapping = results.some(res => {
                         const startDiff = Math.abs(res.startDate.getTime() - fridayTime);
                         const endDiff = Math.abs(res.endDate.getTime() - fridayTime);
                         return startDiff < 3 * 24 * 60 * 60 * 1000 || endDiff < 3 * 24 * 60 * 60 * 1000;
                     });

                     if (!isOverlapping) {
                         selectedFriday = friday;
                         break;
                     }
                 }
                 
                 if (selectedFriday) {
                    const targetFridayIdx = yearMap.indexOf(selectedFriday);
                    let weekendComboIndices = [targetFridayIdx]; // Fri
                    let usedLeave = 1;

                    if (targetFridayIdx + 1 < yearMap.length) weekendComboIndices.push(targetFridayIdx + 1);
                    if (targetFridayIdx + 2 < yearMap.length) weekendComboIndices.push(targetFridayIdx + 2);

                    if (maxLeavePerTrip >= 2 && targetFridayIdx + 3 < yearMap.length && yearMap[targetFridayIdx+3].type === 'work') {
                        if (usedLeave + 1 <= leaveQuota) {
                            weekendComboIndices.push(targetFridayIdx + 3);
                            usedLeave += 1;
                        }
                    }

                    const days = weekendComboIndices.map(idx => {
                        const d = yearMap[idx];
                        if (d.type === 'work') return { ...d, type: 'leave' };
                        return d;
                    });

                    const startDate = days[0].dateObj;
                    const endDate = days[days.length-1].dateObj;

                    results.push({
                        id: `manual-${startDate.getTime()}`,
                        startDate,
                        endDate,
                        days,
                        leaveCount: usedLeave,
                        holidaysInvolved: [],
                        type: 'manual_weekend',
                        reason: getWittyReason(m, 'manual_weekend', days.length)
                    });
                 }
            }
        }

        const uniqueResults = [];
        const seenStarts = new Set();
        
        results.sort((a, b) => {
            if (a.type !== b.type) return a.type === 'standard' ? -1 : 1;
            return b.days.length - a.days.length;
        });

        results.forEach(res => {
            const key = res.startDate.getTime();
            if (!seenStarts.has(key)) {
                seenStarts.add(key);
                uniqueResults.push(res);
            }
        });
        
        const finalResults = uniqueResults.filter(r => {
             const m = r.startDate.getMonth();
             return m >= startMonth && m <= endMonth;
        });

        setRecommendations(finalResults);
        setIsSearching(false);
    }, 400); 
  };

  useEffect(() => {
    calculateRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- SORTING LOGIC ---
  const sortedRecommendations = useMemo(() => {
    let sorted = [...recommendations];
    switch (sortBy) {
        case 'totalDays':
            return sorted.sort((a, b) => b.days.length - a.days.length);
        case 'leaveCount':
            return sorted.sort((a, b) => a.leaveCount - b.leaveCount);
        case 'efficiency':
            return sorted.sort((a, b) => {
                const effA = a.days.length / (a.leaveCount || 1);
                const effB = b.days.length / (b.leaveCount || 1);
                if (effB === effA) {
                    return b.days.length - a.days.length;
                }
                return effB - effA;
            });
        case 'date':
        default:
            return sorted.sort((a, b) => a.startDate - b.startDate);
    }
  }, [recommendations, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Modern Header with Glassmorphism */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-xl text-white shadow-lg shadow-emerald-500/20">
              <Palmtree size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">CutiPintar</h1>
              <p className="text-slate-400 text-xs font-medium tracking-wide">Manifestasi Liburan Biar Waras</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* MAIN LAYOUT: Grid 12 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* SIDEBAR (Left): Config & Legend */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
                
                {/* Configuration Card */}
                <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-gray-100 p-6">
                    <div className="flex items-center gap-2 mb-6 text-slate-800 font-bold text-sm tracking-wide border-b border-gray-50 pb-3">
                        <Settings size={16} className="text-emerald-500" />
                        <h2 className="uppercase">Setup Strategi Kabur</h2>
                    </div>
                    
                    <div className="space-y-5">
                        <div className="group">
                            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-emerald-600 transition-colors">Tahun Fiskal</label>
                            <div className="relative">
                                <select 
                                value={year} 
                                onChange={(e) => setYear(parseInt(e.target.value))}
                                className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all appearance-none cursor-pointer text-slate-700"
                                >
                                <option value={2026}>2026 (Semoga Lebih Baik)</option>
                                <option value={2025}>2025 (Cek Retroaktif)</option>
                                </select>
                                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none rotate-90" />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-emerald-600 transition-colors">Rentang Waktu Cabut</label>
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <select 
                                        value={startMonth} 
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value);
                                            setStartMonth(val);
                                            if (val > endMonth) setEndMonth(val);
                                        }}
                                        className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all appearance-none cursor-pointer text-slate-700"
                                    >
                                        {Array.from({length: 12}).map((_, i) => (
                                            <option key={i} value={i}>{getMonthNameByIndex(i)}</option>
                                        ))}
                                    </select>
                                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none rotate-90" />
                                </div>
                                <span className="text-slate-400 font-bold">-</span>
                                <div className="relative flex-1">
                                    <select 
                                        value={endMonth} 
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value);
                                            if (val < startMonth) setStartMonth(val);
                                            setEndMonth(val);
                                        }}
                                        className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all appearance-none cursor-pointer text-slate-700"
                                    >
                                        {Array.from({length: 12}).map((_, i) => (
                                            <option key={i} value={i}>{getMonthNameByIndex(i)}</option>
                                        ))}
                                    </select>
                                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none rotate-90" />
                                </div>
                            </div>
                        </div>

                        {/* NEW TOGGLE CUTI BERSAMA */}
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer group" onClick={() => setIncludeJointLeave(!includeJointLeave)}>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 cursor-pointer">Kantor Libur Cuti Bersama?</label>
                                <p className="text-[10px] text-slate-400">Kalau 'Enggak', dianggap hari kerja biasa.</p>
                            </div>
                            <div className={`relative w-10 h-6 transition-colors rounded-full ${includeJointLeave ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                                <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${includeJointLeave ? 'translate-x-4' : 'translate-x-0'}`} />
                            </div>
                        </div>


                        <div className="group">
                            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-emerald-600 transition-colors">Sisa Nyawa (Jatah Cuti)</label>
                            <input 
                                type="number" 
                                min="0" max="30"
                                value={leaveQuota} 
                                onChange={(e) => setLeaveQuota(Math.max(0, parseInt(e.target.value) || 0))}
                                className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-slate-700 placeholder:text-slate-300"
                                placeholder="12"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-emerald-600 transition-colors">Berani Ajuin Berapa Hari?</label>
                            <div className="relative">
                                <select 
                                value={maxLeavePerTrip} 
                                onChange={(e) => setMaxLeavePerTrip(parseInt(e.target.value))}
                                className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all appearance-none cursor-pointer text-slate-700"
                                >
                                <option value={1}>1 Hari (Harpitnas Hunter)</option>
                                <option value={2}>2 Hari (Healing Tipis)</option>
                                <option value={3}>3 Hari (Short Escape)</option>
                                <option value={4}>4 Hari (Liburan Proper)</option>
                                <option value={5}>5 Hari (Block Leave / Kabur)</option>
                                <option value={100}>Unlimited (Mode Resign)</option>
                                </select>
                                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none rotate-90" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-2">
                        <button 
                            onClick={calculateRecommendations}
                            disabled={isSearching}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.98] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/30 disabled:opacity-70 disabled:active:scale-100 disabled:shadow-none"
                        >
                            {isSearching ? (
                                <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                </span>
                            ) : (
                                <>
                                    <Search size={18} strokeWidth={2.5} />
                                    Cari Celah Liburan 🚀
                                </>
                            )}
                        </button>
                    </div>
                </div>
                
                {/* NEW: Holiday List Card */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-hidden flex flex-col max-h-[400px]">
                    <div className="flex items-center gap-2 mb-4 text-slate-800 font-bold text-sm tracking-wide border-b border-gray-50 pb-3 flex-shrink-0">
                        <List size={16} className="text-emerald-500" />
                        <h3 className="uppercase">Daftar Libur ({getMonthNameByIndex(startMonth)} - {getMonthNameByIndex(endMonth)})</h3>
                    </div>
                    
                    <div className="overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300">
                        {holidayList.length === 0 ? (
                            <div className="text-center py-8 text-slate-400 text-xs">
                                Tidak ada hari libur di rentang bulan ini.
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {holidayList.map((h, idx) => (
                                    <div key={idx} className="flex gap-3 items-start group">
                                        <div className={`flex flex-col items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 border ${h.type === 'joint' ? 'bg-purple-50 border-purple-100 text-purple-600' : 'bg-rose-50 border-rose-100 text-rose-600'}`}>
                                            <span className="text-xs font-bold">{getSafeDate(h.date).getDate()}</span>
                                            <span className="text-[9px] uppercase font-medium">{new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(getSafeDate(h.date))}</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <p className="text-xs font-medium text-slate-700 leading-tight group-hover:text-emerald-600 transition-colors">{h.name}</p>
                                                <span className="text-[10px] text-slate-400 shrink-0 ml-2">{getDayName(getSafeDate(h.date))}</span>
                                            </div>
                                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full inline-block mt-1 ${h.type === 'joint' ? 'bg-purple-100 text-purple-700' : 'bg-rose-100 text-rose-700'}`}>
                                                {h.type === 'joint' ? 'Cuti Bersama' : 'Nasional'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Legend Card */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4 text-slate-800 font-bold text-sm tracking-wide">
                        <HelpCircle size={16} className="text-emerald-500" />
                        <h3 className="uppercase">Kamus Simbol</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {/* Legend Items */}
                        <div className="flex items-center gap-3 p-2 rounded-lg bg-rose-50/50">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold bg-rose-50 text-rose-500 border border-rose-100 text-xs shadow-sm">L</div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-700">Libur</span>
                                <span className="text-[9px] text-slate-500">Nasional</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded-lg bg-purple-50/50">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold bg-purple-50 text-purple-500 border border-purple-100 text-xs shadow-sm">B</div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-700">Cuti</span>
                                <span className="text-[9px] text-slate-500">Bersama</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded-lg bg-emerald-50/50">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold bg-emerald-500 text-white shadow-lg shadow-emerald-200 text-xs">C</div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-700">Cuti</span>
                                <span className="text-[9px] text-slate-500">Pribadi</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded-lg bg-amber-50/50">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold bg-amber-50 text-amber-500 border border-amber-100 text-xs shadow-sm">W</div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-700">Weekend</span>
                            </div>
                        </div>
                    </div>

                     <div className="mt-6 pt-4 border-t border-slate-100 text-[10px] text-slate-400 text-center">
                         <p>© {new Date().getFullYear()} CutiPintar</p>
                         <p>Dibuat saat lagi burnout 🤯</p>
                    </div>
                </div>

            </div>

            {/* MAIN CONTENT (Right): Results */}
            <div className="lg:col-span-8 space-y-6">
                 {/* Results Header with Sorting */}
                <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4 mb-2 bg-white/50 p-4 rounded-xl border border-gray-100 backdrop-blur-sm">
                    <div className="flex items-baseline gap-3">
                        <h2 className="text-lg font-bold text-slate-800 tracking-tight">Menu Healing Terbaik</h2>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">{recommendations.length} Opsi</span>
                    </div>
                    
                    {recommendations.length > 0 && (
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                <ArrowUpDown size={10} /> Sortir
                            </span>
                            <select 
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-white border border-gray-200 text-sm font-semibold text-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                            >
                                <option value="efficiency">Paling Cuan (ROI Tinggi)</option>
                                <option value="totalDays">Paling Lama (Auto Refresh)</option>
                                <option value="leaveCount">Hemat Cuti (Pelit Mode)</option>
                                <option value="date">Paling Dekat (Butuh ASAP)</option>
                            </select>
                        </div>
                    )}
                </div>

                 {/* List */}
                {sortedRecommendations.length === 0 ? (
                    <div className="text-center py-24 bg-white/50 rounded-3xl border border-dashed border-slate-300/60 backdrop-blur-sm">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Frown className="h-10 w-10 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-700 mb-1">Zonk, Gak Nemu Celah!</h3>
                        <p className="text-slate-500 max-w-xs mx-auto mb-6">HR strict banget kayaknya, atau filternya kekecilan. Coba naikin jatah cuti atau ganti tahun.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {sortedRecommendations.map((combo) => (
                            <RecommendationCard key={combo.id} combo={combo} />
                        ))}
                    </div>
                )}
            </div>

        </div>
      </div>
    </div>
  );
}