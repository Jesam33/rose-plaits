"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BRAND } from "../config";
import img1 from "../../images/img-1.jpg";
import img2 from "../../images/img-2.jpg";
import img3 from "../../images/img-3.jpg";
import img4 from "../../images/img-4.jpg";
import img5 from "../../images/img-5.jpg";

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

export default function AdminPortal() {
  // Passcode gate state
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);

  // Dynamic state loaded from server API /api/data
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Navigation tab
  const [activeTab, setActiveTab] = useState("services");

  // Form State: Add/Edit Service
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceDuration, setServiceDuration] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [serviceFeatures, setServiceFeatures] = useState("");
  const [editingServiceId, setEditingServiceId] = useState(null);

  // Form State: Add Lookbook Image
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryUrl, setGalleryUrl] = useState("");

  // Notification Banner
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });

  // Custom Confirmation Modal State
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleteTargetIndex, setDeleteTargetIndex] = useState(null);
  const [deleteTargetName, setDeleteTargetName] = useState("");
  const [deleteTargetType, setDeleteTargetType] = useState(null); // 'service', 'gallery', 'reset'

  // Fetch initial data from server database on mount
  useEffect(() => {
    // Check local storage auth
    const savedAuth = sessionStorage.getItem("rose_plaits_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }

    const loadData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/data");
        const data = await res.json();
        
        if (data.services && data.gallery) {
          setServices(data.services);
          setGallery(data.gallery);
        } else {
          setServices(BRAND.services);
          setGallery(BRAND.gallery);
        }
      } catch (err) {
        console.error("Error loading server database:", err);
        // Fallback to local storage
        const savedServices = localStorage.getItem("rose_plaits_services");
        if (savedServices) {
          try { setServices(JSON.parse(savedServices)); } catch(e) { setServices(BRAND.services); }
        } else {
          setServices(BRAND.services);
        }

        const savedGallery = localStorage.getItem("rose_plaits_gallery");
        if (savedGallery) {
          try { setGallery(JSON.parse(savedGallery)); } catch(e) { setGallery(BRAND.gallery); }
        } else {
          setGallery(BRAND.gallery);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Show notification utility
  const triggerNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "success" });
    }, 3000);
  };

  // Passcode handler
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (passcode === "roseplaits2026") {
      setIsAuthenticated(true);
      setAuthError(false);
      sessionStorage.setItem("rose_plaits_admin_auth", "true");
      triggerNotification("Access granted. Welcome to the Admin Portal.");
    } else {
      setAuthError(true);
      setPasscode("");
    }
  };

  // Log out
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("rose_plaits_admin_auth");
  };

  // Save changes to server database and localStorage
  const syncWithServer = async (updatedServices, updatedGallery) => {
    try {
      const res = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ services: updatedServices, gallery: updatedGallery })
      });
      const result = await res.json();
      if (!result.success) {
        throw new Error(result.error || "Server response unsuccessful");
      }
      return true;
    } catch (e) {
      console.error("Failed to sync database with server:", e);
      triggerNotification("Changes saved locally, but server sync failed.", "error");
      return false;
    }
  };

  // Add or Update Service
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    if (!serviceName || !servicePrice || !serviceDuration || !serviceDesc) {
      triggerNotification("Please fill out all required service fields.", "error");
      return;
    }

    const featureArray = serviceFeatures
      ? serviceFeatures.split(",").map(item => item.trim()).filter(Boolean)
      : ["Premium hair extensions included", "Scalp hydration oil", "Clean partings"];

    let updatedServices;
    if (editingServiceId) {
      // Edit mode
      updatedServices = services.map(s => {
        if (s.id === editingServiceId) {
          return {
            ...s,
            name: serviceName,
            price: servicePrice,
            duration: serviceDuration,
            description: serviceDesc,
            features: featureArray
          };
        }
        return s;
      });
      setServices(updatedServices);
      localStorage.setItem("rose_plaits_services", JSON.stringify(updatedServices));
      
      const success = await syncWithServer(updatedServices, gallery);
      if (success) {
        triggerNotification("Hairstyle service updated successfully.");
      }
      setEditingServiceId(null);
    } else {
      // Add mode
      const newId = serviceName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      // Prevent duplicates
      if (services.some(s => s.id === newId)) {
        triggerNotification("A hairstyle with this name already exists.", "error");
        return;
      }
      const newService = {
        id: newId || `service-${Date.now()}`,
        name: serviceName,
        price: servicePrice,
        duration: serviceDuration,
        description: serviceDesc,
        features: featureArray
      };
      
      updatedServices = [...services, newService];
      setServices(updatedServices);
      localStorage.setItem("rose_plaits_services", JSON.stringify(updatedServices));
      
      const success = await syncWithServer(updatedServices, gallery);
      if (success) {
        triggerNotification("New hairstyle service added successfully.");
      }
    }

    // Reset Form
    setServiceName("");
    setServicePrice("");
    setServiceDuration("");
    setServiceDesc("");
    setServiceFeatures("");
  };

  // Edit Service triggers form load
  const loadServiceForEdit = (service) => {
    setEditingServiceId(service.id);
    setServiceName(service.name);
    setServicePrice(service.price);
    setServiceDuration(service.duration);
    setServiceDesc(service.description);
    setServiceFeatures(service.features.join(", "));
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cancel edit
  const cancelServiceEdit = () => {
    setEditingServiceId(null);
    setServiceName("");
    setServicePrice("");
    setServiceDuration("");
    setServiceDesc("");
    setServiceFeatures("");
  };

  // Add Lookbook Image
  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    if (!galleryTitle || !galleryUrl) {
      triggerNotification("Please fill in both the lookbook title and image URL.", "error");
      return;
    }

    const newItem = {
      title: galleryTitle,
      url: galleryUrl
    };

    const updatedGallery = [...gallery, newItem];
    setGallery(updatedGallery);
    localStorage.setItem("rose_plaits_gallery", JSON.stringify(updatedGallery));

    const success = await syncWithServer(services, updatedGallery);
    if (success) {
      triggerNotification("Lookbook hairstyle photo added successfully.");
    }

    setGalleryTitle("");
    setGalleryUrl("");
  };

  // Trigger custom delete modal
  const triggerDeleteConfirm = (idOrIndex, name, type) => {
    setDeleteTargetId(type === "service" ? idOrIndex : null);
    setDeleteTargetIndex(type === "gallery" ? idOrIndex : null);
    setDeleteTargetName(name);
    setDeleteTargetType(type);
  };

  // Cancel custom delete
  const cancelDeleteConfirm = () => {
    setDeleteTargetId(null);
    setDeleteTargetIndex(null);
    setDeleteTargetName("");
    setDeleteTargetType(null);
  };

  // Execute actual confirmed delete/reset action
  const executeConfirmedAction = async () => {
    if (deleteTargetType === "service") {
      const updatedServices = services.filter(s => s.id !== deleteTargetId);
      setServices(updatedServices);
      localStorage.setItem("rose_plaits_services", JSON.stringify(updatedServices));
      
      const success = await syncWithServer(updatedServices, gallery);
      if (success) {
        triggerNotification("Service deleted successfully.", "success");
      }
    } else if (deleteTargetType === "gallery") {
      const updatedGallery = gallery.filter((_, idx) => idx !== deleteTargetIndex);
      setGallery(updatedGallery);
      localStorage.setItem("rose_plaits_gallery", JSON.stringify(updatedGallery));

      const success = await syncWithServer(services, updatedGallery);
      if (success) {
        triggerNotification("Photo removed from Lookbook.");
      }
    } else if (deleteTargetType === "reset") {
      setServices(BRAND.services);
      setGallery(BRAND.gallery);
      localStorage.setItem("rose_plaits_services", JSON.stringify(BRAND.services));
      localStorage.setItem("rose_plaits_gallery", JSON.stringify(BRAND.gallery));
      
      const success = await syncWithServer(BRAND.services, BRAND.gallery);
      if (success) {
        triggerNotification("Reset to original flyer defaults completed successfully.");
      }
    }
    cancelDeleteConfirm();
  };

  // Render Passcode Gate if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="admin-gate-page">
        <div className="bg-mesh-glow"></div>
        <div className="splatter splatter-1 pointer-events-none"></div>
        <div className="splatter splatter-2 pointer-events-none"></div>

        <div className="gate-container glass-panel">
          <div className="logo-script-main text-center" style={{ fontSize: "3.5rem" }}>Rose</div>
          <div className="logo-bold-main text-center" style={{ fontSize: "1.2rem", letterSpacing: "4px", color: "var(--accent)" }}>ADMIN PORTAL</div>
          <div className="gate-divider"></div>

          <p className="gate-caption">
            Please enter your private passcode to edit catalog hair models, prices, and finished masters gallery.
          </p>

          <form onSubmit={handleAuthSubmit} className="gate-form">
            <div className="form-input-container">
              <label className="form-label" style={{ color: "var(--accent)" }}>Rose's Passcode</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className={`form-input gate-input ${authError ? "gate-input-error" : ""}`}
                style={{ textAlign: "center", fontSize: "1.5rem", letterSpacing: "8px" }}
              />
              {authError && (
                <p className="gate-error-msg">Incorrect passcode. Try again.</p>
              )}
            </div>

            <button type="submit" className="btn-primary-flyer w-full gate-btn" style={{ marginTop: "1rem" }}>
              Unlock Dashboard
            </button>
          </form>

          <a href="/" className="gate-back-link">
            Back to Landing Page
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-portal-dashboard">
      <div className="bg-mesh-glow"></div>
      
      {/* Dynamic Notifications */}
      {notification.show && (
        <div className={`admin-notification-toast toast-${notification.type}`}>
          <span className="toast-text">{notification.message}</span>
        </div>
      )}

      {/* 🌟 Premium Custom Confirmation Modal */}
      {deleteTargetType && (
        <div className="custom-confirm-modal-overlay">
          <div className="custom-confirm-modal-card glass-panel">
            <h3 className="modal-confirm-title">Confirm Action</h3>
            <div className="modal-confirm-divider"></div>
            <p className="modal-confirm-desc">
              Are you sure you want to {deleteTargetType === "reset" ? "reset" : "remove"}{" "}
              <strong className="text-berry" style={{ fontWeight: "700" }}>"{deleteTargetName}"</strong>?
              <br />
              <span style={{ fontSize: "0.8rem", color: "#ef4444", marginTop: "0.5rem", display: "inline-block" }}>
                This will update the live website immediately. This action cannot be undone.
              </span>
            </p>
            <div className="modal-confirm-actions">
              <button onClick={executeConfirmedAction} className="btn-confirm-proceed">
                Yes, Proceed
              </button>
              <button onClick={cancelDeleteConfirm} className="btn-confirm-cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Admin Container */}
      <div className="admin-layout-wrapper">
        
        {/* Left Side Header / Control Panel */}
        <aside className="admin-sidebar glass-panel">
          <div className="sidebar-brand">
            <span className="logo-script-main">Rose</span>
            <div className="logo-bold-main" style={{ color: "var(--accent)", fontSize: "0.9rem" }}>PLAITS STUDIO ADMIN</div>
          </div>
          
          <div className="sidebar-divider"></div>

          <div className="sidebar-tabs">
            <button 
              onClick={() => setActiveTab("services")} 
              className={`sidebar-tab-btn ${activeTab === "services" ? "tab-active" : ""}`}
            >
              Manage Hair Services
            </button>
            <button 
              onClick={() => setActiveTab("gallery")} 
              className={`sidebar-tab-btn ${activeTab === "gallery" ? "tab-active" : ""}`}
            >
              Manage Finished Lookbook
            </button>
          </div>

          <div className="sidebar-footer">
            <a href="/" target="_blank" className="btn-secondary-flyer w-full text-center sidebar-view-btn" style={{ padding: "0.75rem" }}>
              View Live Website
            </a>
            
            <button 
              onClick={() => triggerDeleteConfirm(null, "all services and images to original defaults", "reset")} 
              className="btn-reset-defaults w-full" 
              style={{ marginTop: "0.75rem" }}
            >
              Reset to Flyer Defaults
            </button>

            <button onClick={handleLogout} className="btn-logout w-full" style={{ marginTop: "1.5rem" }}>
              Secure Log Out
            </button>
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="admin-workspace">
          
          {isLoading ? (
            <div className="glass-panel" style={{ padding: "3rem", textPosition: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className="logo-bold-main" style={{ color: "var(--primary)" }}>Loading server database...</div>
            </div>
          ) : activeTab === "services" ? (
            <div className="workspace-tab-content">
              
              {/* Form Section */}
              <section className="glass-panel admin-form-card">
                <h2 className="admin-section-title">
                  {editingServiceId ? "Edit Hairstyle Service" : "Add Premium Hair Service"}
                </h2>
                <p className="admin-section-subtitle">
                  Configure price points, appointment lengths, and specific protective features for Rose's catalog.
                </p>

                <form onSubmit={handleServiceSubmit} className="admin-grid-form">
                  <div className="form-input-container">
                    <label className="form-label">Hairstyle Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Goddess Knotless Braids"
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="admin-form-row">
                    <div className="form-input-container">
                      <label className="form-label">Price Range *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. $130 - $200"
                        value={servicePrice}
                        onChange={(e) => setServicePrice(e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-input-container">
                      <label className="form-label">Duration Length *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. 4 - 5.5 hrs"
                        value={serviceDuration}
                        onChange={(e) => setServiceDuration(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-input-container">
                    <label className="form-label">Description Description *</label>
                    <textarea 
                      rows={3} 
                      required
                      placeholder="Deep descriptions detailing the protective styling method, lace type, parting quality, etc."
                      value={serviceDesc}
                      onChange={(e) => setServiceDesc(e.target.value)}
                      className="form-input form-textarea"
                    />
                  </div>

                  <div className="form-input-container">
                    <label className="form-label">Key Features / Perks (Comma separated) *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Premium extensions included, Painless attachment, Nourishing edge finish"
                      value={serviceFeatures}
                      onChange={(e) => setServiceFeatures(e.target.value)}
                      className="form-input"
                    />
                    <p className="field-hint">Perks display beautifully as checkmarks in your landing page service cards.</p>
                  </div>

                  <div className="admin-form-actions">
                    <button type="submit" className="btn-primary-flyer">
                      {editingServiceId ? "Apply Changes" : "Create Service Card"}
                    </button>
                    {editingServiceId && (
                      <button type="button" onClick={cancelServiceEdit} className="btn-cancel-edit">
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>
              </section>

              {/* List Section */}
              <section className="admin-catalog-list">
                <h3 className="admin-list-title">Existing Catalog ({services.length} Services)</h3>
                
                <div className="admin-cards-grid">
                  {services.map(service => (
                    <div key={service.id} className="admin-catalog-item glass-panel">
                      <div className="catalog-item-header">
                        <h4 className="catalog-item-name">{service.name}</h4>
                        <span className="catalog-item-price">{service.price}</span>
                      </div>
                      <p className="catalog-item-duration">Duration: {service.duration}</p>
                      <p className="catalog-item-desc">{service.description}</p>
                      
                      <div className="catalog-item-perks">
                        {service.features.map((feature, i) => (
                          <span key={i} className="perk-tag">{feature}</span>
                        ))}
                      </div>

                      <div className="catalog-item-actions">
                        <button 
                          onClick={() => loadServiceForEdit(service)} 
                          className="btn-item-edit"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => triggerDeleteConfirm(service.id, service.name, "service")} 
                          className="btn-item-delete"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          ) : (
            <div className="workspace-tab-content">
              
              {/* Form Section */}
              <section className="glass-panel admin-form-card">
                <h2 className="admin-section-title">Add Finished Hair Masterpiece</h2>
                <p className="admin-section-subtitle">
                  Upload absolute closeup photos of your clients to showcase your sharp parting and pristine braids.
                </p>

                <form onSubmit={handleGallerySubmit} className="admin-grid-form">
                  <div className="form-input-container">
                    <label className="form-label">Style / Model Title *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Butterfly Boho Locs"
                      value={galleryTitle}
                      onChange={(e) => setGalleryTitle(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-input-container">
                    <label className="form-label">Image URL *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Paste image URL (e.g. Unsplash URL or hosted link)"
                      value={galleryUrl}
                      onChange={(e) => setGalleryUrl(e.target.value)}
                      className="form-input"
                    />
                    <div className="quick-suggestions" style={{ marginTop: "0.5rem" }}>
                      <p className="field-hint" style={{ marginBottom: "0.25rem" }}>Quick premium styling suggestions from Unsplash:</p>
                      <button 
                        type="button" 
                        onClick={() => setGalleryUrl("https://images.unsplash.com/photo-1605497746444-ac9dbd39f408?q=80&w=800&auto=format&fit=crop")}
                        className="btn-suggestion-url"
                      >
                        Model 1 (Cornrows)
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setGalleryUrl("https://images.unsplash.com/photo-1595959183075-c1d09e37f100?q=80&w=800&auto=format&fit=crop")}
                        className="btn-suggestion-url"
                      >
                        Model 2 (Locs)
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setGalleryUrl("https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=800&auto=format&fit=crop")}
                        className="btn-suggestion-url"
                      >
                        Model 3 (Twists)
                      </button>
                    </div>
                  </div>

                  <div className="admin-form-actions">
                    <button type="submit" className="btn-primary-flyer">
                      Add to Lookbook
                    </button>
                  </div>
                </form>
              </section>

              {/* Lookbook Grid Section */}
              <section className="admin-catalog-list">
                <h3 className="admin-list-title">Existing Finished Masterpieces ({gallery.length} Photos)</h3>
                
                <div className="admin-gallery-preview-grid">
                  {gallery.map((img, idx) => (
                    <div key={idx} className="admin-gallery-item glass-panel">
                      <div className="gallery-item-image-wrapper">
                        <Image 
                          src={getImgSrc(img.url, idx)} 
                          alt={img.title} 
                          className="gallery-item-thumbnail" 
                          width={200}
                          height={200}
                          {...(typeof getImgSrc(img.url, idx) === "object" ? { placeholder: "blur" } : {})}
                        />
                      </div>
                      <div className="gallery-item-body">
                        <h4 className="gallery-item-title">{img.title}</h4>
                        <button 
                          onClick={() => triggerDeleteConfirm(idx, img.title, "gallery")} 
                          className="btn-item-delete w-full"
                          style={{ marginTop: "0.5rem" }}
                        >
                          Remove Photo
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          )}

        </main>

      </div>
      
      {/* Scope styles specifically for the custom premium modal overlay */}
      <style jsx global>{`
        .custom-confirm-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(41, 21, 27, 0.65);
          backdrop-filter: blur(8px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
          animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .custom-confirm-modal-card {
          width: 90%;
          max-width: 28rem;
          padding: 2.5rem 2rem;
          border-radius: 1.5rem;
          border: 1px solid rgba(234, 92, 122, 0.25);
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 20px 50px rgba(41, 21, 27, 0.25);
          text-align: center;
          animation: cardScaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .modal-confirm-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--berry-dark);
          margin-bottom: 0.5rem;
        }

        .modal-confirm-divider {
          width: 2.5rem;
          height: 2px;
          background: var(--berry-gradient);
          margin: 1rem auto;
          border-radius: 1px;
        }

        .modal-confirm-desc {
          font-size: 0.95rem;
          color: var(--fg-muted);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .modal-confirm-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .btn-confirm-proceed {
          flex: 1;
          background: #ef4444;
          color: #ffffff;
          border: none;
          padding: 0.85rem 1.5rem;
          border-radius: 0.75rem;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
        }

        .btn-confirm-proceed:hover {
          background: #dc2626;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(239, 68, 68, 0.3);
        }

        .btn-confirm-proceed:active {
          transform: translateY(0);
        }

        .btn-confirm-cancel {
          flex: 1;
          background: transparent;
          border: 1.5px solid var(--border-color);
          color: var(--fg-muted);
          padding: 0.85rem 1.5rem;
          border-radius: 0.75rem;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-confirm-cancel:hover {
          background: rgba(0, 0, 0, 0.05);
          color: var(--berry-dark);
          border-color: var(--fg-muted);
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes cardScaleIn {
          from { 
            transform: scale(0.9);
            opacity: 0;
          }
          to { 
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
