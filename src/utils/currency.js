export const formatCurrency = (amount, currency = 'INR') => {
  if (!amount && amount !== 0) return '';
  
  if (currency === 'INR') {
    // Indian number formatting with commas
    return `₹${amount.toLocaleString('en-IN')}`;
  }
  return `$${amount.toLocaleString('en-US')}`;
};

export const formatSalary = (amount, currency = 'INR', period = 'annual') => {
  if (!amount && amount !== 0) return '';
  
  const formatted = formatCurrency(amount, currency);
  
  if (currency === 'INR') {
    // Convert to LPA (Lakhs Per Annum) if amount is large
    if (amount >= 100000) {
      const lpa = (amount / 100000).toFixed(1);
      return `${formatted} (${lpa} LPA)`;
    }
  }
  
  return `${formatted}${period === 'annual' ? '/year' : period === 'monthly' ? '/month' : ''}`;
};

export const parseSalaryInput = (input) => {
  if (!input) return 0;
  
  // Remove currency symbols and commas
  const cleaned = input.toString().replace(/[₹$,]/g, '');
  
  // Handle LPA format (e.g., "5 LPA" or "5.5 LPA")
  if (cleaned.toLowerCase().includes('lpa')) {
    const lpaValue = parseFloat(cleaned.replace(/[^0-9.]/g, ''));
    return lpaValue * 100000; // Convert LPA to actual amount
  }
  
  return parseFloat(cleaned) || 0;
};

export const currencyOptions = [
  { value: 'INR', label: '₹ INR (Indian Rupee)' },
  { value: 'USD', label: '$ USD (US Dollar)' }
];