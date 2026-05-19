"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

import { BRAND } from "./config";
import img1 from "../images/img-1.jpg";
import img2 from "../images/img-2.jpg";
import img3 from "../images/img-3.jpg";
import img4 from "../images/img-4.jpg";
import img5 from "../images/img-5.jpg";

const getImgSrc = (url, index) => {
  if (!url) return img1;
  if (url.includes("photo-1605497746444-ac9dbd39f408")) return img1;
  if (url.includes("photo-1595959183075-c1d09e37f100")) return img2;
  if (url.includes("photo-1620331311520-246422fd82f9")) return img3;
  if (url.includes("photo-1601412436009-d964bd02edbc")) return img4;
  if (url.includes("photo-1636207543865-adc3c4070dc6")) return img5;
  if (url.includes("photo-1582095133179-bfd08e2fc6b3")) return img1;
  return url;
};

function HairArtSvg({ type, className }) {
  switch (type) {
    case "box-braids":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="goldGradHero" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbdc79" />
              <stop offset="50%" stopColor="#f39485" />
              <stop offset="100%" stopColor="#ea5c7a" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill="#2c121e" />
          <path d="M 50 0 C 50 30, 20 50, 0 50" stroke="url(#goldGradHero)" strokeWidth="1.5" />
          <path d="M 50 0 C 50 35, 80 50, 100 50" stroke="url(#goldGradHero)" strokeWidth="1.5" />
          <path d="M 50 0 L 50 100" stroke="url(#goldGradHero)" strokeWidth="2.5" />
          <path d="M 50 20 L 20 35" stroke="url(#goldGradHero)" strokeWidth="1" opacity="0.5" />
          <path d="M 50 20 L 80 35" stroke="url(#goldGradHero)" strokeWidth="1" opacity="0.5" />
          <path d="M 50 40 L 10 60" stroke="url(#goldGradHero)" strokeWidth="1" opacity="0.5" />
          <path d="M 50 40 L 90 60" stroke="url(#goldGradHero)" strokeWidth="1" opacity="0.5" />
          <path d="M 50 20 Q 40 40, 20 70 T 30 100" stroke="url(#goldGradHero)" strokeWidth="3" strokeLinecap="round" />
          <path d="M 50 40 Q 60 60, 80 80 T 70 100" stroke="url(#goldGradHero)" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 50 60 Q 45 80, 50 100" stroke="url(#goldGradHero)" strokeWidth="4" strokeLinecap="round" />
          <path d="M 75 25 L 77 20 L 75 15 L 73 20 Z" fill="#fbdc79" />
          <path d="M 25 25 L 27 20 L 25 15 L 23 20 Z" fill="#fbdc79" />
        </svg>
      );
    case "bio-stylist":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="stylistGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ea5c7a" />
              <stop offset="100%" stopColor="#5a233c" />
            </linearGradient>
            <linearGradient id="goldGradBio" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbdc79" />
              <stop offset="100%" stopColor="#f39485" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill="#fae6ec" />
          <path d="M15,45 C15,30 35,20 50,20 C65,20 85,30 85,45 C85,60 75,70 70,80 C68,85 70,100 50,100 C30,100 32,85 30,80 C25,70 15,60 15,45 Z" fill="url(#stylistGrad)" />
          <path d="M 50 20 Q 45 50, 30 80" stroke="url(#goldGradBio)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 50 20 Q 50 50, 50 85" stroke="url(#goldGradBio)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 50 20 Q 55 50, 70 80" stroke="url(#goldGradBio)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 10 65 Q 25 60, 35 62" stroke="#fbdc79" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
          <path d="M 90 65 Q 75 60, 65 62" stroke="#fbdc79" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
          <path d="M 50 10 L 52 5 L 50 0 L 48 5 Z" fill="#fbdc79" />
          <path d="M 80 20 L 81.5 16 L 80 12 L 78.5 16 Z" fill="#fbdc79" />
          <path d="M 20 20 L 21.5 16 L 20 12 L 18.5 16 Z" fill="#fbdc79" />
        </svg>
      );
    case "bio-salon":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="goldAccentSalon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbdc79" />
              <stop offset="50%" stopColor="#f39485" />
              <stop offset="100%" stopColor="#ea5c7a" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill="#2c121e" />
          <path d="M25,35 L48,35 L48,50 L25,50 Z" fill="url(#goldAccentSalon)" />
          <path d="M38,50 L38,72 C38,75 35,77 35,80 L48,80 C48,77 45,75 45,72 L45,50 Z" fill="url(#goldAccentSalon)" />
          <path d="M25,37 L18,37 L18,48 L25,48 Z" fill="#5a233c" />
          <path d="M48,39 L52,41 L52,44 L48,46 Z" fill="#5a233c" />
          <g transform="translate(10, -5) rotate(25 50 50)">
            <path d="M 50 15 L 50 70" stroke="url(#goldAccentSalon)" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="50" cy="76" r="6" stroke="url(#goldAccentSalon)" strokeWidth="2.5" />
          </g>
          <g transform="translate(-10, -5) rotate(-25 50 50)">
            <path d="M 50 15 L 50 70" stroke="url(#goldAccentSalon)" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="50" cy="76" r="6" stroke="url(#goldAccentSalon)" strokeWidth="2.5" />
          </g>
          <path d="M 15 25 L 85 25" stroke="url(#goldAccentSalon)" strokeWidth="3" />
          <path d="M 20 25 L 20 12 M 30 25 L 30 12 M 40 25 L 40 12 M 50 25 L 50 12 M 60 25 L 60 12 M 70 25 L 70 12 M 80 25 L 80 12" stroke="url(#goldAccentSalon)" strokeWidth="2" />
        </svg>
      );
    case "gallery-cornrows":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cornrowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fae6ec" />
              <stop offset="50%" stopColor="#fbdc79" />
              <stop offset="100%" stopColor="#ea5c7a" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill="#2c121e" />
          <path d="M15,0 Q25,30 20,70 T10,100" stroke="url(#cornrowGrad)" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M30,0 Q40,30 35,70 T25,100" stroke="url(#cornrowGrad)" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M48,0 Q52,30 50,70 T45,100" stroke="url(#cornrowGrad)" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M65,0 Q60,30 65,70 T75,100" stroke="url(#cornrowGrad)" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M85,0 Q75,30 80,70 T90,100" stroke="url(#cornrowGrad)" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M22,0 Q32,30 27,70 T17,100" stroke="#5a233c" strokeWidth="1" opacity="0.25" />
          <path d="M39,0 Q46,30 42,70 T35,100" stroke="#5a233c" strokeWidth="1" opacity="0.25" />
          <path d="M56,0 Q56,30 57,70 T60,100" stroke="#5a233c" strokeWidth="1" opacity="0.25" />
          <path d="M72,0 Q67,30 72,70 T82,100" stroke="#5a233c" strokeWidth="1" opacity="0.25" />
          <circle cx="50" cy="50" r="3" fill="#fbdc79" stroke="#ea5c7a" strokeWidth="1" />
          <circle cx="35" cy="30" r="2.5" fill="#fbdc79" stroke="#ea5c7a" strokeWidth="1" />
          <circle cx="65" cy="70" r="2.5" fill="#fbdc79" stroke="#ea5c7a" strokeWidth="1" />
        </svg>
      );
    case "gallery-locs":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="locsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fae6ec" />
              <stop offset="50%" stopColor="#f39485" />
              <stop offset="100%" stopColor="#ea5c7a" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill="#2c121e" />
          <path d="M 20 0 Q 15 30, 25 60 T 35 100" stroke="url(#locsGrad)" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M 38 0 Q 42 30, 38 60 T 48 100" stroke="url(#locsGrad)" strokeWidth="6.5" strokeLinecap="round" />
          <path d="M 58 0 Q 54 30, 58 60 T 52 100" stroke="url(#locsGrad)" strokeWidth="6.5" strokeLinecap="round" />
          <path d="M 78 0 Q 82 30, 72 60 T 78 100" stroke="url(#locsGrad)" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M17,15 L22,18 M16,30 L21,33 M19,45 L24,48" stroke="#5a233c" strokeWidth="1.5" />
          <path d="M38,20 L43,23 M39,40 L44,43 M38,60 L43,63" stroke="#5a233c" strokeWidth="1.5" />
          <path d="M57,15 L52,18 M58,35 L53,38 M57,55 L52,58" stroke="#5a233c" strokeWidth="1.5" />
          <rect x="18" y="25" width="6" height="3" rx="1.5" fill="#fbdc79" stroke="#ea5c7a" strokeWidth="0.5" />
          <rect x="74" y="35" width="6" height="3" rx="1.5" fill="#fbdc79" stroke="#ea5c7a" strokeWidth="0.5" />
          <rect x="39" y="50" width="7" height="3" rx="1.5" fill="#fbdc79" stroke="#ea5c7a" strokeWidth="0.5" />
        </svg>
      );
    case "gallery-twists":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="twistsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbdc79" />
              <stop offset="60%" stopColor="#ea5c7a" />
              <stop offset="100%" stopColor="#5a233c" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill="#fae6ec" />
          <g stroke="url(#twistsGrad)" strokeWidth="7" strokeLinecap="round">
            <path d="M30,0 C25,20 35,40 30,60 C25,80 35,90 30,100" />
            <path d="M70,0 C65,20 75,40 70,60 C65,80 75,90 70,100" />
            <path d="M50,0 C55,20 45,40 50,60 C55,80 45,90 50,100" strokeWidth="8" />
          </g>
          <g stroke="#ffffff" strokeWidth="1" opacity="0.3" strokeLinecap="round">
            <path d="M30,5 Q32,15 28,25 Q32,35 28,45 Q32,55 28,65 Q32,75 28,85" />
            <path d="M70,5 Q72,15 68,25 Q72,35 68,45 Q72,55 68,65 Q72,75 68,85" />
            <path d="M50,5 Q48,15 52,25 Q48,35 52,45 Q48,55 52,65 Q48,75 52,85" />
          </g>
        </svg>
      );
    case "gallery-lace":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="laceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fae6ec" />
              <stop offset="40%" stopColor="#ea5c7a" />
              <stop offset="100%" stopColor="#2c121e" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill="#fae6ec" />
          <path d="M 0 35 C 20 30, 40 38, 50 35 C 60 32, 80 40, 100 35 L 100 100 L 0 100 Z" fill="url(#laceGrad)" />
          <path d="M 20 32 Q 22 15 15,0" stroke="#fbdc79" strokeWidth="2.5" opacity="0.8" />
          <path d="M 40 35 Q 43 18 35,0" stroke="#fbdc79" strokeWidth="2.5" opacity="0.8" />
          <path d="M 60 34 Q 63 15 60,0" stroke="#fbdc79" strokeWidth="2.5" opacity="0.8" />
          <path d="M 80 36 Q 78 18 85,0" stroke="#fbdc79" strokeWidth="2.5" opacity="0.8" />
          <path d="M 0 35 Q 50 35 100 35" stroke="#fbdc79" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
          <circle cx="50" cy="20" r="1.5" fill="#fbdc79" />
          <circle cx="25" cy="10" r="2" fill="#fbdc79" />
          <circle cx="75" cy="15" r="1" fill="#fbdc79" />
        </svg>
      );
    case "gallery-geometric":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="geomGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbdc79" />
              <stop offset="100%" stopColor="#ea5c7a" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill="#2c121e" />
          <rect x="15" y="15" width="20" height="20" rx="4" stroke="url(#geomGrad)" strokeWidth="1.5" />
          <rect x="40" y="15" width="20" height="20" rx="4" stroke="url(#geomGrad)" strokeWidth="1.5" />
          <rect x="65" y="15" width="20" height="20" rx="4" stroke="url(#geomGrad)" strokeWidth="1.5" />
          <rect x="15" y="40" width="20" height="20" rx="4" stroke="url(#geomGrad)" strokeWidth="1.5" />
          <rect x="40" y="40" width="20" height="20" rx="4" stroke="url(#geomGrad)" strokeWidth="1.5" />
          <rect x="65" y="40" width="20" height="20" rx="4" stroke="url(#geomGrad)" strokeWidth="1.5" />
          <circle cx="25" cy="25" r="3" fill="url(#geomGrad)" />
          <circle cx="50" cy="25" r="3" fill="url(#geomGrad)" />
          <circle cx="75" cy="25" r="3" fill="url(#geomGrad)" />
          <circle cx="25" cy="45" r="3" fill="url(#geomGrad)" />
          <circle cx="50" cy="45" r="3" fill="url(#geomGrad)" />
          <circle cx="75" cy="45" r="3" fill="url(#geomGrad)" />
          <path d="M25,25 Q15,50 30,85 T25,100" stroke="url(#geomGrad)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M50,25 Q60,50 45,85 T50,100" stroke="url(#geomGrad)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M75,25 Q85,50 70,85 T75,100" stroke="url(#geomGrad)" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "gallery-goddess":
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="godGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ea5c7a" />
              <stop offset="50%" stopColor="#f39485" />
              <stop offset="100%" stopColor="#fbdc79" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill="#2c121e" />
          <path d="M 50 15 C 30 15 15 25 15 50 C 15 65 30 75 50 75 C 70 75 85 65 85 50 C 85 25 70 15 50 15 Z" fill="url(#godGrad)" opacity="0.85" />
          <circle cx="50" cy="45" r="18" fill="#5a233c" />
          <path d="M 50 25 Q 50 65 50 75" stroke="#fbdc79" strokeWidth="2" />
          <polygon points="50,10 54,20 46,20" fill="#fbdc79" />
          <polygon points="35,14 41,22 34,24" fill="#fbdc79" />
          <polygon points="65,14 59,22 66,24" fill="#fbdc79" />
          <path d="M 50 5 C 50 5 55 12 50 18" stroke="#fbdc79" strokeWidth="1.5" />
          <path d="M 20 60 Q 25 80 40,98" stroke="url(#godGrad)" strokeWidth="3" strokeLinecap="round" />
          <path d="M 80 60 Q 75 80 60,98" stroke="url(#godGrad)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function HomeClient({ initialServices, initialGallery }) {
  // Dynamic Services & Lookbook State (persisted via localStorage and populated by server-side rendered props)
  const [services, setServices] = useState(initialServices || BRAND.services);
  const [gallery, setGallery] = useState(initialGallery || BRAND.gallery);

  // Synchronize state with any server props changes
  useEffect(() => {
    if (initialServices && initialServices.length > 0) {
      setServices(initialServices);
    } else {
      const savedServices = localStorage.getItem("rose_plaits_services");
      if (savedServices) {
        try {
          setServices(JSON.parse(savedServices));
        } catch (e) {
          console.error("Error parsing services:", e);
        }
      }
    }

    if (initialGallery && initialGallery.length > 0) {
      setGallery(initialGallery);
    } else {
      const savedGallery = localStorage.getItem("rose_plaits_gallery");
      if (savedGallery) {
        try {
          setGallery(JSON.parse(savedGallery));
        } catch (e) {
          console.error("Error parsing gallery:", e);
        }
      }
    }
  }, [initialServices, initialGallery]);

  // Booking Form State
  const [name, setName] = useState("");
  const [serviceType, setServiceType] = useState("in-studio"); // "in-studio" or "mobile"
  const [streetAddress, setStreetAddress] = useState("");
  const [location, setLocation] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [customStyle, setCustomStyle] = useState("");

  // UI State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [pulseBooking, setPulseBooking] = useState(false);

  // Refs for smooth navigation
  const bookingFormRef = useRef(null);
  const servicesRef = useRef(null);
  const galleryRef = useRef(null);
  const reviewsRef = useRef(null);
  const faqRef = useRef(null);

  // Auto-format dates to a friendly string
  const getFriendlyDate = (dateStr) => {
    if (!dateStr) return "";
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date(dateStr).toLocaleDateString("en-US", options);
  };

  // Compile the text message that will be sent via WhatsApp
  const compileWhatsAppText = () => {
    const serviceName = selectedService.trim() || "Not selected";

    const friendlyDate = getFriendlyDate(date) || "Not chosen yet";
    const chosenTime = time || "Not chosen yet";
    const clientName = name.trim() || "Valued Client";
    const chosenLocation = location || "Not selected";

    const chosenSetting = serviceType === "mobile"
      ? "🚗 Mobile Home Service (To my house)"
      : "🏠 In-Studio Salon (Brantford)";

    const addressLine = serviceType === "mobile" && streetAddress.trim()
      ? `\n🏠 Home Address: ${streetAddress.trim()}`
      : "";

    const customNotes = notes.trim() ? `\n📝 Color/Length & Notes: ${notes.trim()}` : "";

    return `Hello Rose Plaits Studio! 🌸\n\nI would like to book a professional hair styling session. Here are my details:\n\n✨ Name: ${clientName}\n📍 Location: ${chosenLocation}\n💆 Setting: ${chosenSetting}${addressLine}\n💇 Service: ${serviceName}\n📅 Preferred Date: ${friendlyDate}\n⏰ Preferred Time: ${chosenTime}${customNotes}\n\nLooking forward to confirming my appointment slot! 🌹`;
  };

  // Handle WhatsApp Redirection
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!name || !location || !selectedService || !date || !time || (serviceType === "mobile" && !streetAddress)) {
      alert("Please fill in all core fields: Name, Location, Address (for mobile), Hairstyle, Date, and Time.");
      return;
    }

    setIsSuccessPopupOpen(true);

    setTimeout(() => {
      const text = compileWhatsAppText();
      const encodedText = encodeURIComponent(text);
      const cleanPhone = BRAND.whatsappNumber.replace(/[+\s-]/g, "");
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;

      window.open(whatsappUrl, "_blank");
      setIsSuccessPopupOpen(false);
    }, 1800);
  };

  // Handle Quick Booking from Service Cards
  const handleQuickBook = (serviceName) => {
    setSelectedService(serviceName);
    setPulseBooking(true);

    bookingFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

    setTimeout(() => {
      setPulseBooking(false);
    }, 2000);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="app-container">

      {/* 🔮 Background mesh decorative shapes matching flyer's pink-yellow gradients */}
      <div className="bg-mesh-glow"></div>



      {/* 🎨 Paint Splatters replicating flyer backgrounds */}
      <div className="splatter splatter-1 pointer-events-none"></div>
      <div className="splatter splatter-2 pointer-events-none"></div>
      <div className="splatter splatter-3 pointer-events-none"></div>

      {/* ==========================================
          HEADER & GLASS NAVIGATION
      ========================================== */}
      <header className="header-nav">
        <nav className="nav-container">

          {/* Brand Logo - EXACT REPLICATION OF FLYER */}
          <a href="#" className="nav-logo">
            <span className="logo-script-main">Rose</span>
            <div className="logo-bold-group">
              <span className="logo-bold-main">PLAITS STUDIO</span>
              <div className="logo-underline-main"></div>
            </div>
          </a>

          {/* Navigation Links (Desktop) */}
          <div className="nav-links">
            <button onClick={() => servicesRef.current?.scrollIntoView({ behavior: "smooth" })} className="nav-link">Our Services</button>
            <button onClick={() => galleryRef.current?.scrollIntoView({ behavior: "smooth" })} className="nav-link">Lookbook</button>
            <button onClick={() => reviewsRef.current?.scrollIntoView({ behavior: "smooth" })} className="nav-link">Reviews</button>
            <button onClick={() => faqRef.current?.scrollIntoView({ behavior: "smooth" })} className="nav-link">FAQs</button>
          </div>

          {/* Nav CTA */}
          <div className="nav-cta">
            <a
              href={`tel:${BRAND.whatsappNumber}`}
              className="nav-phone-link"
            >
              📞 +1-226-552-1822
            </a>
            <button
              onClick={() => bookingFormRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary-flyer nav-cta-btn"
            >
              Book Now
            </button>
          </div>

          {/* Hamburger (Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <svg className="menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-menu-drawer">
            <button
              onClick={() => { setMobileMenuOpen(false); servicesRef.current?.scrollIntoView({ behavior: "smooth" }); }}
              className="mobile-drawer-link"
            >
              Our Hair Services
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); galleryRef.current?.scrollIntoView({ behavior: "smooth" }); }}
              className="mobile-drawer-link"
            >
              Finished Masterpieces
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); reviewsRef.current?.scrollIntoView({ behavior: "smooth" }); }}
              className="mobile-drawer-link"
            >
              Client Reviews
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); faqRef.current?.scrollIntoView({ behavior: "smooth" }); }}
              className="mobile-drawer-link"
            >
              FAQs
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); bookingFormRef.current?.scrollIntoView({ behavior: "smooth" }); }}
              className="btn-primary-flyer mobile-drawer-cta"
            >
              Book Now!
            </button>
          </div>
        )}
      </header>

      {/* ==========================================
          🌹 HERO SECTION (EDITORIAL DUAL FLYER ELEMENTS)
      ========================================== */}
      <section className="hero-section">

        {/* Left Column: Premium Pitch & Branding */}
        <div className="hero-content">

          <div className="hero-badge-container">
            <span className="hero-badge-dot animate-ping"></span>
            <span className="hero-badge-text">
              Brantford's Premium Hair Studio
            </span>
          </div>

          <h1 className="hero-title">
            <span className="hero-script-lead">Welcome to</span><br />
            <span className="text-gradient-purple">Rose Plaits Studio</span>
          </h1>

          <p className="hero-subtitle">
            Specializing in high-end Locs, neat Braids, precision Cornrows, and flawless Wig installations. Enjoy a protective, pain-free, and luxurious braiding experience custom-tailored for your crown.
          </p>

          {/* Quick trust metrics */}
          <div className="hero-metrics">
            <div className="hero-metric-item">
              <p className="hero-metric-num">Brantford</p>
              <p className="hero-metric-label">Location</p>
            </div>
            <div className="hero-metric-item hero-metric-border">
              <p className="hero-metric-num">100%</p>
              <p className="hero-metric-label">Protective Care</p>
            </div>
            <div className="hero-metric-item">
              <p className="hero-metric-num">5.0 ★</p>
              <p className="hero-metric-label">Review Rating</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="hero-ctas">
            <button
              onClick={() => bookingFormRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary-flyer hero-btn-main"
            >
              <svg className="cta-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Appointment
            </button>
            <button
              onClick={() => servicesRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="btn-secondary-flyer hero-btn-sub"
            >
              Explore Services
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Duo Image Frames mirroring Flyer */}
        <div className="hero-visual">

          {/* Left Circular Frame (Braids closeup work) */}
          <div className="flyer-circle-frame circle-left-braids float-slow">
            <div className="double-ring"></div>
            <Image
              src={img1}
              alt="Pristine circular parting hair work styled by Rose"
              className="circle-frame-img"
              placeholder="blur"
            />
          </div>

          {/* Right Circular Frame (Silhouette of natural curls) */}
          <div className="flyer-circle-frame circle-right-silhouette float-reverse">
            <div className="double-ring-berry"></div>
            <div className="silhouette-wrapper">
              <svg viewBox="0 0 100 120" fill="none" className="hair-silhouette-svg">
                {/* Voluminous Curly Silhouette from Flyer */}
                <path d="M50,15 C32,15 15,22 15,45 C15,55 22,60 20,70 C18,75 12,78 12,85 C12,95 25,98 32,98 C35,102 38,115 48,115 C58,115 62,102 65,98 C72,98 88,95 88,85 C88,78 82,75 80,70 C78,60 85,55 85,45 C85,22 68,15 50,15 Z" fill="#000" />
                {/* Neck & shoulder silhouette */}
                <path d="M40,95 Q50,118 60,95 L62,118 H38 Z" fill="#000" />
              </svg>
            </div>
          </div>

          {/* 🌟 Iconic Gold-to-Rose Starburst Badge from the flyer's bottom left */}
          <div className="flyer-starburst-badge spin-slow">
            <div className="starburst-inner">
              <p className="starburst-txt-small">Rose Plaits</p>
              <p className="starburst-txt-big">100%</p>
              <p className="starburst-txt-medium">Neat Care</p>
            </div>
          </div>

        </div>

      </section>

      {/* ==========================================
          💅 MEET THE CRAFTSWOMAN
      ========================================== */}
      <section className="stylist-section">
        <div className="stylist-container">

          {/* Left: Stylist Portrait Grid matching the flyers warm curves */}
          <div className="stylist-grid">
            <div className="stylist-col">
              <div className="flyer-circle-frame circle-bio">
                <div className="double-ring"></div>
                <Image
                  src={img2}
                  alt="Neat curls work"
                  className="circle-frame-img"
                  placeholder="blur"
                />
              </div>
              <div className="stylist-card-stat stat-gold">
                <p className="stat-num">6+</p>
                <p className="stat-label">Years of Artistry</p>
              </div>
            </div>
            <div className="stylist-col stylist-col-offset">
              <div className="stylist-card-stat stat-rose">
                <p className="stat-num">500+</p>
                <p className="stat-label">Happy Crowns Styled</p>
              </div>
              <div className="flyer-circle-frame circle-bio">
                <div className="double-ring-berry"></div>
                <Image
                  src={img3}
                  alt="Sleek cornrows and twists"
                  className="circle-frame-img"
                  placeholder="blur"
                />
              </div>
            </div>
          </div>

          {/* Right: Craftsmanship Pitch */}
          <div className="stylist-content">
            <div className="badge">
              <span>Meet the Artist</span>
            </div>

            <h2 className="stylist-title">
              Precision Scalp Parting & Edge-Protecting Hair Art
            </h2>

            <p className="stylist-description">
              Welcome to <strong className="text-berry font-bold">Rose Plaits Studio</strong>! I believe that every hair appointment should be a refreshing, luxurious, and pain-free experience. I specialize in crafting flawless parting lines, healthy protective locks, and flat feed-in cornrows that sleep comfortably from day one. Your natural hair health is always my absolute priority.
            </p>

            {/* Core Values with Flyer styling */}
            <div className="stylist-features">
              <div className="stylist-feature-item">
                <span className="check-icon-wrapper">✓</span>
                <div className="feature-texts">
                  <h4 className="feature-title">Locs & Braids Perfection</h4>
                  <p className="feature-desc">Perfect geometric sectioning and secure braids without tension on sensitive hair edges.</p>
                </div>
              </div>

              <div className="stylist-feature-item">
                <span className="check-icon-wrapper">✓</span>
                <div className="feature-texts">
                  <h4 className="feature-title">Flat Lay Cornrows & Twists</h4>
                  <p className="feature-desc">Clean, creative feed-in patterns styled flat against the scalp for elegant duration.</p>
                </div>
              </div>

              <div className="stylist-feature-item">
                <span className="check-icon-wrapper">✓</span>
                <div className="feature-texts">
                  <h4 className="feature-title">Wig Installations & Loc Fixing</h4>
                  <p className="feature-desc">Professional HD lace melting, plucking, and dreadloc interlocking crochet restoration.</p>
                </div>
              </div>
            </div>

            <div className="stylist-cta">
              <button
                onClick={() => bookingFormRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary-flyer"
              >
                Book Your Session
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          💈 SERVICES CATALOG (EXACTLY MATCHING FLYER)
      ========================================== */}
      <section ref={servicesRef} className="services-section">

        <div className="services-header">
          <div className="badge">
            <span>Our Service</span>
          </div>
          <h2 className="services-section-title">
            Signature Hairstyles
          </h2>
          <p className="services-section-subtitle">
            All appointments include premium hair extensions, scalp hydration oils, and a clean professional finishing mousse. Click a service to instantly load the booking console!
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card glass-panel group"
            >
              {/* Top border glowing berry highlight line */}
              <div className="card-hover-glow"></div>

              <div className="service-card-body">

                {/* Card Title & Cost badge */}
                <h3 className="service-card-title">
                  {service.name}
                </h3>

                <div className="service-badges">
                  <span className="service-badge-primary">
                    Est: {service.price}
                  </span>
                  <span className="service-badge-muted">
                    ⏱ {service.duration}
                  </span>
                </div>

                <p className="service-card-desc">
                  {service.description}
                </p>

                {/* Service Bullet Checklist with pink circles */}
                <ul className="service-features-list">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="service-feature-item">
                      <span className="check-icon-wrapper-mini">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="service-card-action">
                <button
                  onClick={() => handleQuickBook(service.name)}
                  className="btn-secondary-flyer service-card-btn"
                >
                  Select & Book Now
                </button>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* ==========================================
          📅 INTERACTIVE BOOKING TERMINAL
      ========================================== */}
      <section
        ref={bookingFormRef}
        className="booking-section"
      >
        <div className="booking-container">

          <div className="booking-header">
            <div className="badge">
              <span>Booking Terminal</span>
            </div>
            <h2 className="booking-title">
              Secure Your Braid Session
            </h2>
            <p className="booking-subtitle">
              Draft your custom hair session parameters below. Your scheduling details compile instantly into a neat details sheet to text directly to Rose.
            </p>
          </div>

          {/* Form & Live Preview Card Container */}
          <div className={`booking-card glass-panel ${pulseBooking ? "booking-card-pulsing" : ""}`}>

            <form onSubmit={handleBookingSubmit} className="booking-layout">

              {/* Form Input Side */}
              <div className="booking-form-col">
                <h3 className="booking-form-title">
                  Booking Details
                </h3>

                {/* Name field */}
                <div className="form-input-container">
                  <label htmlFor="client-name" className="form-label">Full Name *</label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    placeholder="e.g. Sarah Johnson"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                  />
                </div>

                {/* Service setting selector (In-Studio / Mobile Home service) */}
                <div className="form-input-container">
                  <label className="form-label">Service Setting *</label>
                  <div style={{ display: "flex", gap: "1rem", marginTop: "0.25rem" }}>
                    <button
                      type="button"
                      onClick={() => {
                        setServiceType("in-studio");
                        setLocation("Brantford"); // Salon is located in Brantford
                      }}
                      className="form-input"
                      style={{
                        flex: 1,
                        background: serviceType === "in-studio" ? "var(--berry-gradient)" : "rgba(255, 255, 255, 0.7)",
                        color: serviceType === "in-studio" ? "#ffffff" : "var(--berry-dark)",
                        borderColor: serviceType === "in-studio" ? "var(--primary)" : "rgba(234, 92, 122, 0.15)",
                        fontWeight: "600",
                        fontSize: "10px",
                        cursor: "pointer",
                        borderRadius: "12px",
                        padding: "2px 2px",
                        transition: "all 0.3s ease",
                        boxShadow: serviceType === "in-studio" ? "0 4px 15px rgba(234, 92, 122, 0.15)" : "none"
                      }}
                    >
                      Salon
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setServiceType("mobile");
                        setLocation(""); // Reset location so they choose their mobile city
                      }}
                      className="form-input"
                      style={{
                        flex: 1,
                        background: serviceType === "mobile" ? "var(--berry-gradient)" : "rgba(255, 255, 255, 0.7)",
                        color: serviceType === "mobile" ? "#ffffff" : "var(--berry-dark)",
                        borderColor: serviceType === "mobile" ? "var(--primary)" : "rgba(234, 92, 122, 0.15)",
                        fontWeight: "600",
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        borderRadius: "12px",
                        padding: "0.45rem 1.15rem",
                        transition: "all 0.3s ease",
                        boxShadow: serviceType === "mobile" ? "0 4px 15px rgba(234, 92, 122, 0.15)" : "none"
                      }}
                    >
                      Home Service
                    </button>
                  </div>
                </div>

                {/* Conditional Street Address field (displayed only for Mobile Service) */}
                {serviceType === "mobile" && (
                  <div className="form-input-container" style={{ animation: "fadeInUp 0.4s ease" }}>
                    <label htmlFor="street-address-input" className="form-label">Your Home Address *</label>
                    <input
                      id="street-address-input"
                      type="text"
                      required
                      placeholder="e.g. 123 Main Street, Apt 4"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      className="form-input"
                    />
                  </div>
                )}

                {/* Location select dropdown (displayed only for Mobile Service) */}
                {serviceType === "mobile" && (
                  <div className="form-input-container" style={{ animation: "fadeInUp 0.4s ease" }}>
                    <label htmlFor="location-select" className="form-label">Your Location / City *</label>
                    <select
                      id="location-select"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="form-input"
                    >
                      <option value="" disabled>-- Select Location --</option>
                      <option value="Brantford">Brantford</option>
                      <option value="Paris">Paris</option>
                      <option value="Kitchener">Kitchener</option>
                      <option value="Northyork">Northyork</option>
                      <option value="Hamilton">Hamilton</option>
                      <option value="Cambridge">Cambridge</option>
                      <option value="Mississauga">Mississauga</option>
                      <option value="Burlington">Burlington</option>
                    </select>
                  </div>
                )}

                {/* Service Text Input */}
                <div className="form-input-container">
                  <label htmlFor="service-input" className="form-label">Hairstyle Service *</label>
                  <input
                    id="service-input"
                    type="text"
                    required
                    placeholder="e.g. Goddess Knotless Braids, Butterfly Locs, Custom Twists..."
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="form-input"
                  />
                  {/* Quick Catalog Suggestions Buttons */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <p className="field-hint" style={{ width: "100%", marginBottom: "0.15rem" }}>Or select quick suggestion from our catalog:</p>
                    {services.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedService(s.name)}
                        className="btn-suggestion-url"
                        style={{
                          fontSize: "0.75rem",
                          padding: "0.3rem 0.65rem",
                          borderRadius: "8px",
                          border: "1.2px solid rgba(234, 92, 122, 0.25)",
                          background: selectedService === s.name ? "var(--berry-gradient)" : "rgba(255, 255, 255, 0.65)",
                          color: selectedService === s.name ? "#ffffff" : "var(--berry-dark)",
                          cursor: "pointer",
                          fontWeight: "500",
                          transition: "all 0.2s ease"
                        }}
                      >
                        + {s.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date & Time layout */}
                <div className="booking-form-grid">
                  <div className="form-input-container">
                    <label htmlFor="booking-date" className="form-label">Date *</label>
                    <input
                      id="booking-date"
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-input-container">
                    <label htmlFor="booking-time" className="form-label">Time Slot *</label>
                    <select
                      id="booking-time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="form-input"
                    >
                      <option value="" disabled>-- Slot --</option>
                      <option value="9:00 AM">9:00 AM (Morning)</option>
                      <option value="11:30 AM">11:30 AM (Midday)</option>
                      <option value="2:00 PM">2:00 PM (Afternoon)</option>
                      <option value="4:30 PM">4:30 PM (Late Session)</option>
                    </select>
                  </div>
                </div>

                {/* Additional Requests */}
                <div className="form-input-container">
                  <label htmlFor="custom-notes" className="form-label">Color, Length & Requests</label>
                  <textarea
                    id="custom-notes"
                    rows={3}
                    placeholder="e.g. Waist length, mixed color 1B/27, regular parts. Hair washed and detangled."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="form-input form-textarea"
                  />
                </div>

                <div className="booking-submit-group" style={{ marginTop: "2rem" }}>
                  <button
                    type="submit"
                    className="btn-primary-flyer booking-submit-btn"
                  >
                    {/* Inline WhatsApp SVG */}
                    <svg className="whatsapp-submit-icon" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.449 5.49 0 9.951-4.437 9.954-9.878.001-2.636-1.02-5.118-2.879-6.973C16.485 1.897 14.008.876 11.996.876c-5.5 0-9.96 4.439-9.964 9.882-.002 1.96.52 3.875 1.513 5.582L2.52 21.43l5.127-1.346-.999-.93zm11.667-6.84c-.313-.156-1.854-.915-2.141-1.018-.287-.104-.497-.156-.707.156-.21.312-.811 1.018-.994 1.226-.183.208-.365.234-.678.078-.313-.156-1.32-.486-2.514-1.549-.93-.83-1.558-1.855-1.741-2.167-.183-.312-.02-.482.137-.638.141-.14.313-.365.47-.547.156-.182.208-.312.313-.52.104-.208.052-.39-.026-.546-.078-.156-.707-1.7-.968-2.327-.255-.612-.513-.53-.707-.54-.183-.01-.393-.01-.603-.01s-.551.078-.84.39c-.287.313-1.096 1.07-1.096 2.607s1.12 3.023 1.277 3.23c.156.208 2.203 3.364 5.336 4.719.745.322 1.327.515 1.782.659.749.237 1.432.204 1.971.124.602-.09 1.854-.758 2.115-1.458.262-.699.262-1.299.183-1.428-.078-.129-.287-.207-.601-.363z" />
                    </svg>
                    Book Via Whatsapp
                  </button>

                </div>
              </div>


            </form>

          </div>

        </div>

        {/* ==========================================
            SUCCESS MODAL / POPUP SIMULATION
        ========================================== */}
        {isSuccessPopupOpen && (
          <div className="booking-success-overlay">
            <div className="booking-success-card glass-panel">
              <div className="success-icon-wrapper">
                <svg className="success-check-icon animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="success-texts">
                <h3 className="success-title">Message Ready!</h3>
                <p className="success-desc">
                  We are now launching WhatsApp to secure your slot with Rose. Click allow if prompted.
                </p>
              </div>
              <div className="success-portal-indicator">
                <span className="success-portal-dot animate-ping"></span>
                <span className="success-portal-text">Connecting to WA Secure Portal</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ==========================================
          🖼 CLIENT GALLERY & LOOKBOOK (CIRCULAR DESIGNS)
      ========================================== */}
      <section ref={galleryRef} className="gallery-section">

        <div className="gallery-header">
          <div className="gallery-header-info">
            <div className="badge">
              <span>Finished Masterpieces</span>
            </div>
            <h2 className="gallery-title">
              Our Lookbook Portfolio
            </h2>
            <p className="gallery-subtitle">
              Pure craftsmanship. Un-retouched closeup photographs of clients styled beautifully at Rose Plaits Studio.
            </p>
          </div>
          <button
            onClick={() => bookingFormRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="btn-secondary-flyer gallery-header-cta"
          >
            Claim Your Slot!
          </button>
        </div>

        {/* Circular Grid representing flyer circles */}
        <div className="gallery-grid">
          {gallery.map((img, idx) => (
            <div
              key={idx}
              className="gallery-item group"
            >
              <div className="gallery-item-fallback">
                Braiding Work
              </div>

              <div className="flyer-circle-frame circle-gallery">
                {idx % 2 === 0 ? <div className="double-ring"></div> : <div className="double-ring-berry"></div>}
                <Image
                  src={getImgSrc(img.url, idx)}
                  alt={`${img.title} styled by Rose`}
                  className="circle-frame-img"
                  width={400}
                  height={400}
                  {...(typeof getImgSrc(img.url, idx) === "object" ? { placeholder: "blur" } : {})}
                />
              </div>

              {/* Hover text label */}
              <div className="gallery-overlay">
                <div className="gallery-overlay-content">
                  <p className="gallery-overlay-tag">Studio Session</p>
                  <p className="gallery-overlay-title">{img.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ==========================================
          ⭐ CLIENT TESTIMONIALS
      ========================================== */}
      <section ref={reviewsRef} className="reviews-section">
        <div className="reviews-container">

          <div className="reviews-header">
            <div className="badge">
              <span>Client Voices</span>
            </div>
            <h2 className="reviews-title">
              Praised by Queens
            </h2>
            <p className="reviews-subtitle">
              Read why hundreds of clients refuse to let anyone else touch their parting or locks.
            </p>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="reviews-grid">

            <div className="review-card glass-panel hover-card-rose">
              <div className="review-body">
                <div className="review-stars">
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i} className="star-icon">★</span>
                  ))}
                </div>
                <p className="review-quote">
                  "Rose is literally a genius. I got my cornrows done and slept comfortably on night one! Zero edge tension. The parting is so incredibly clean, it matches the flyer work perfectly. Absolute best in Brantford!"
                </p>
              </div>
              <div className="review-client">
                <div className="client-avatar avatar-gold">
                  AS
                </div>
                <div className="client-info">
                  <h4 className="client-name">Amanda S.</h4>
                  <p className="client-style">Cornrows & Twists Client</p>
                </div>
              </div>
            </div>

            <div className="review-card glass-panel hover-card-gold">
              <div className="review-body">
                <div className="review-stars">
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i} className="star-icon">★</span>
                  ))}
                </div>
                <p className="review-quote">
                  "The booking was so fast and neat! I chose Locs, completed the inputs, and submitted. Rose immediately confirmed on WhatsApp, helped me figure out colors, and set up my slot. Highly recommend this seamless system!"
                </p>
              </div>
              <div className="review-client">
                <div className="client-avatar avatar-rose">
                  KO
                </div>
                <div className="client-info">
                  <h4 className="client-name">Kemi O.</h4>
                  <p className="client-style">Locs and Braids Client</p>
                </div>
              </div>
            </div>

            <div className="review-card glass-panel hover-card-rose">
              <div className="review-body">
                <div className="review-stars">
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i} className="star-icon">★</span>
                  ))}
                </div>
                <p className="review-quote">
                  "I got my dreadlocs crochet-repaired and retightened here. Meticulous work, clean parts, cozy space. My locks look brand new! Rose's attention to scalp health is amazing."
                </p>
              </div>
              <div className="review-client">
                <div className="client-avatar avatar-gold">
                  TJ
                </div>
                <div className="client-info">
                  <h4 className="client-name">Tiffany J.</h4>
                  <p className="client-style">Dreadlocs Client</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          ❓ FREQUENTLY ASKED QUESTIONS
      ========================================== */}
      <section ref={faqRef} className="faq-section">

        <div className="faq-header">
          <div className="badge">
            <span>Client FAQs</span>
          </div>
          <h2 className="faq-title">
            Common Inquiries
          </h2>
          <p className="faq-subtitle">
            Got questions before checking in? We have compiled responses to our clients' most regular questions.
          </p>
        </div>

        {/* FAQ Accordion list */}
        <div className="faq-list">
          {BRAND.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="faq-item glass-panel"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="faq-trigger"
              >
                <span className="faq-question">
                  {faq.question}
                </span>
                <span className={`faq-chevron-wrapper ${activeFaq === idx ? "faq-chevron-rotated" : ""}`}>
                  <svg className="faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              <div
                className={`faq-answer-container ${activeFaq === idx ? "faq-answer-expanded" : "faq-answer-collapsed"}`}
              >
                <div className="faq-answer">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ==========================================
          🌹 LUXURIOUS FOOTER (FLYER COMPLIANT)
      ========================================== */}
      <footer className="footer-section">
        <div className="footer-grid">

          {/* Logo & Hours */}
          <div className="footer-column footer-about">
            <h3 className="footer-logo">
              <span className="logo-script-main">Rose</span>
              <div className="logo-bold-group-footer">
                <span className="logo-bold-footer">PLAITS STUDIO</span>
                <div className="logo-underline-main"></div>
              </div>
            </h3>
            <p className="footer-about-text">
              Exquisite and protective hair design. Locs, braids, twists, and wig melt installations crafted with edge care.
            </p>
            <div className="footer-hours-group">
              <p className="footer-hours-title">🕒 Hours:</p>
              <p className="footer-hours-desc">{BRAND.hours}</p>
            </div>
          </div>

          {/* Location & Instagram */}
          <div className="footer-column footer-social">
            <h4 className="footer-col-title">Location & Contact</h4>
            <div className="footer-social-links">
              <p className="footer-social-item">
                <span className="social-icon">📍</span> {BRAND.location}
              </p>
              <p className="footer-social-item">
                <span className="social-icon">📞</span>
                <a href={`tel:${BRAND.whatsappNumber}`} className="footer-phone-link">
                  {BRAND.whatsappNumber}
                </a>
              </p>
              <p className="footer-social-item">
                <span className="social-icon">📸</span>
                <a
                  href={`https://instagram.com/${BRAND.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-instagram-link"
                >
                  @{BRAND.instagram}
                </a>
              </p>
            </div>
          </div>

          {/* CTA & Copyright */}
          <div className="footer-column footer-actions">
            <button
              onClick={() => bookingFormRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary-flyer footer-cta-btn"
            >
              Book Hair Session Now!
            </button>
            <div className="footer-copyright">
              <p>© {new Date().getFullYear()} {BRAND.name}. All Rights Reserved.</p>
              <p className="footer-credit">
                Handcrafted protective styling in Brantford.
                <a href="/admin" style={{ opacity: 0.5, marginLeft: "0.5rem", textDecoration: "underline" }} className="hover:opacity-100 transition-opacity">
                  Admin Portal
                </a>
              </p>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
