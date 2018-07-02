export const SideNavbarData = [
  {
    name: 'ড্যাশবোর্ড',
    icon: 'fa-home',
    url: '/dashboard',
    authority: '',
    secondMeu: []
  },
  {
    name: 'ডাটা মাইগ্রেশন',
    icon: 'fa-home',
    url: '/dashboard/migration',
    authority: '',
    secondMeu: []
  },
  {
    name: 'রোগী',
    icon: 'fa-users',
    url: '',
    authority: '',
    secondMeu: [
      {
        name: 'নতুন',
        icon: 'fa-plus',
        url: '/dashboard/patients/new',
        authority: 'ADMIN'
      },
      {
        name: 'তালিকা',
        icon: 'fa-list',
        url: '/dashboard/patients',
        authority: 'ADMIN'
      }
    ]
  },
  {
    name: 'সেশন',
    icon: 'fa-calendar-plus-o',
    url: '',
    authority: '',
    secondMeu: [
      {
        name: 'নতুন সেশন যোগ করুন',
        icon: 'fa-plus',
        url: '/dashboard/sessions/new',
        authority: 'ADMIN'
      },
      {
        name: 'সেশন তালিকা',
        icon: 'fa-list',
        url: '/dashboard/sessions',
        authority: 'ADMIN'
      },
      {
        name: 'রোগীর সেশন',
        icon: 'fa-male',
        url: '/dashboard/sessions/by-patient',
        authority: 'ADMIN'
      }
    ]
  },
  {
    name: 'হিসাবরক্ষণ',
    icon: 'fa-money',
    url: '',
    authority: '',
    secondMeu: [
      {
        name: 'সেশন ফি সংগ্রহ',
        icon: 'fa-credit-card',
        url: '/dashboard/accounting/collect-fee',
        authority: 'ADMIN'
      },
      {
        name: 'নগদান বই',
        icon: 'fa-money',
        url: '/dashboard/accounting/cashbook',
        authority: 'ADMIN'
      },
      {
        name: 'আয় যোগ করুন',
        icon: 'fa-plus-square-o',
        url: '/dashboard/accounting/income',
        authority: 'ADMIN'
      },
      {
        name: 'ব্যয় যোগ করুন',
        icon: 'fa-minus-square-o ',
        url: '/dashboard/accounting/expense',
        authority: 'ADMIN'
      }
    ]
  }
];
