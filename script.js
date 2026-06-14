document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. FAQ ACCORDION TOGGLES
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other FAQs
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-content').style.maxHeight = null;
        }
      });
      
      // Toggle current FAQ
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });


  // ==========================================
  // 2. BRANDING PREVIEW ENGINE
  // ==========================================
  const brandNameInput = document.getElementById('brandNameInput');
  const pdfBrandName = document.getElementById('pdfBrandName');
  const termsInput = document.getElementById('termsInput');
  const pdfTermsText = document.getElementById('pdfTermsText');

  // Text inputs
  if (brandNameInput && pdfBrandName) {
    brandNameInput.addEventListener('input', (e) => {
      pdfBrandName.textContent = e.target.value.trim() || 'Your Studio';
    });
  }

  if (termsInput && pdfTermsText) {
    termsInput.addEventListener('input', (e) => {
      pdfTermsText.textContent = e.target.value || 'Enter terms here...';
    });
  }


  // ==========================================
  // 3. INTERACTIVE PRICING CALCULATOR
  // ==========================================
  const billingCycleToggle = document.getElementById('billingCycleToggle');
  const totalPriceDisplay = document.getElementById('totalPriceDisplay');
  const savingsContainer = document.getElementById('savingsContainer');
  const savingsAmount = document.getElementById('savingsAmount');
  
  const BASE_PRICE_MONTHLY = 499; // ₹ per month
  const BASE_PRICE_ANNUAL_TOTAL = 4999; // ₹ flat per year

  function formatIndianNumber(num) {
    return num.toLocaleString('en-IN');
  }

  function calculatePricing() {
    const isAnnual = billingCycleToggle.checked; // checked means Annual, unchecked means Monthly
    
    // Determine active rates and total cost
    const totalCost = isAnnual ? BASE_PRICE_ANNUAL_TOTAL : BASE_PRICE_MONTHLY;
    const ratePerMonth = isAnnual ? Math.round(BASE_PRICE_ANNUAL_TOTAL / 12) : BASE_PRICE_MONTHLY;
    
    // Update display values
    totalPriceDisplay.textContent = formatIndianNumber(totalCost);
    
    // Dynamically adjust text tags to clear up month/yearly billing confusion
    const pricePeriod = document.querySelector('.price-period');
    const priceCalcNote = document.querySelector('.price-calc-note');
    
    if (isAnnual) {
      if (pricePeriod) pricePeriod.textContent = '/ year';
      if (priceCalcNote) {
        priceCalcNote.innerHTML = `(Equivalent to ₹${formatIndianNumber(ratePerMonth)} / month, billed annually)`;
      }
      
      const monthlyTotal = BASE_PRICE_MONTHLY;
      const annualTotalEquivalent = totalCost;
      const totalSavingsYearly = (monthlyTotal * 12) - annualTotalEquivalent;
      
      savingsAmount.textContent = '₹' + formatIndianNumber(totalSavingsYearly);
      savingsContainer.classList.remove('hidden');
    } else {
      if (pricePeriod) pricePeriod.textContent = '/ month';
      if (priceCalcNote) {
        priceCalcNote.innerHTML = `(Billed monthly)`;
      }
      savingsContainer.classList.add('hidden');
    }
  }

  // Add listeners
  if (billingCycleToggle) {
    billingCycleToggle.addEventListener('change', calculatePricing);
    
    // Initial run
    calculatePricing();
  }


  // ==========================================
  // 4. SIGNUP CAPTURE & NOTIFICATIONS
  // ==========================================
  const heroSignup = document.getElementById('heroSignup');
  const heroEmail = document.getElementById('heroEmail');
  
  heroSignup.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailVal = heroEmail.value.trim();
    
    if (emailVal) {
      // Create transient sleek toast
      const toast = document.createElement('div');
      toast.className = 'toast-alert';
      toast.innerHTML = `
        <div class="toast-content">
          <span class="toast-icon">✨</span>
          <div class="toast-text-group">
            <span class="toast-title">Registration Requested!</span>
            <span class="toast-msg">Redirecting to setup portal for ${emailVal}...</span>
          </div>
        </div>
      `;
      
      // Inject inline toast styles temporarily
      const styles = document.createElement('style');
      styles.innerHTML = `
        .toast-alert {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: #1e293b;
          border: 1px solid rgba(16, 185, 129, 0.4);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
          color: #fff;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          z-index: 10000;
          font-family: 'Plus Jakarta Sans', sans-serif;
          animation: slideUp 0.3s ease-out forwards;
        }
        .toast-content { display: flex; align-items: center; gap: 0.75rem; }
        .toast-icon { font-size: 1.25rem; }
        .toast-text-group { display: flex; flex-direction: column; }
        .toast-title { font-weight: 700; font-size: 0.825rem; color: #10b981; }
        .toast-msg { font-size: 0.75rem; color: #cbd5e1; margin-top: 0.125rem; }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `;
      
      document.body.appendChild(styles);
      document.body.appendChild(toast);
      
      // Clear inputs
      heroEmail.value = '';
      
      // Redirect after brief delay
      setTimeout(() => {
        window.location.href = `https://crm.withspaceio.in/login?tab=register&email=${encodeURIComponent(emailVal)}`;
      }, 2000);
    }
  });

});
