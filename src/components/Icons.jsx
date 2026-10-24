/** Minimal inline icon set (stroke follows currentColor, 24px grid). */
const base = (size = 20) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
})

export const IconSearch = ({ size }) => (
  <svg {...base(size)}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.6-3.6" />
  </svg>
)

export const IconCart = ({ size }) => (
  <svg {...base(size)}>
    <path d="M3 4h2l2.4 11.2A2 2 0 0 0 9.36 17h8.1a2 2 0 0 0 1.95-1.55L21 8H6" />
    <circle cx="10" cy="20" r="1.3" />
    <circle cx="18" cy="20" r="1.3" />
  </svg>
)

export const IconUser = ({ size }) => (
  <svg {...base(size)}>
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5 20a7 7 0 0 1 14 0" />
  </svg>
)

export const IconHeart = ({ size, filled }) => (
  <svg {...base(size)} fill={filled ? 'currentColor' : 'none'}>
    <path d="M12 20s-7-4.4-7-9.4A4.1 4.1 0 0 1 12 7.8a4.1 4.1 0 0 1 7 2.8c0 5-7 9.4-7 9.4z" />
  </svg>
)

export const IconMenu = ({ size }) => (
  <svg {...base(size)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const IconClose = ({ size }) => (
  <svg {...base(size)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

export const IconChevronDown = ({ size }) => (
  <svg {...base(size)}>
    <path d="M6 9l6 6 6-6" />
  </svg>
)

/* In RTL, "forward" points left. */
export const IconArrowForward = ({ size }) => (
  <svg {...base(size)}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
)

export const IconChevronStart = ({ size }) => (
  <svg {...base(size)}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
)

export const IconChevronEnd = ({ size }) => (
  <svg {...base(size)}>
    <path d="M9 6l6 6-6 6" />
  </svg>
)

export const IconPhone = ({ size }) => (
  <svg {...base(size)}>
    <path d="M6 3h3l1.6 4-2 1.4a12 12 0 0 0 5 5l1.4-2 4 1.6V17a2 2 0 0 1-2.2 2A15 15 0 0 1 4 6.2 2 2 0 0 1 6 4z" />
  </svg>
)

export const IconShield = ({ size }) => (
  <svg {...base(size)}>
    <path d="M12 3l7 3v5.5c0 4.4-3 7.9-7 9.5-4-1.6-7-5.1-7-9.5V6z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)

export const IconTruck = ({ size }) => (
  <svg {...base(size)}>
    <path d="M3 6h10v10H3zM13 9h4l3 3v4h-7z" />
    <circle cx="7" cy="18.5" r="1.4" />
    <circle cx="17" cy="18.5" r="1.4" />
  </svg>
)

export const IconHeadset = ({ size }) => (
  <svg {...base(size)}>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <path d="M4 14h2.5v5H5.5A1.5 1.5 0 0 1 4 17.5zM20 14h-2.5v5h1A1.5 1.5 0 0 0 20 17.5z" />
    <path d="M17.5 19v.5a2 2 0 0 1-2 2H13" />
  </svg>
)

export const IconLayers = ({ size }) => (
  <svg {...base(size)}>
    <path d="M12 3l8 4.5-8 4.5-8-4.5z" />
    <path d="M4 12.5l8 4.5 8-4.5" />
    <path d="M4 16.5l8 4.5 8-4.5" />
  </svg>
)

export const IconSliders = ({ size }) => (
  <svg {...base(size)}>
    <path d="M5 7h14M5 12h14M5 17h14" />
    <circle cx="9" cy="7" r="2" />
    <circle cx="15" cy="12" r="2" />
    <circle cx="9" cy="17" r="2" />
  </svg>
)

export const IconPlus = ({ size }) => (
  <svg {...base(size)}>
    <path d="M12 6v12M6 12h12" />
  </svg>
)

export const IconMinus = ({ size }) => (
  <svg {...base(size)}>
    <path d="M6 12h12" />
  </svg>
)

export const IconTrash = ({ size }) => (
  <svg {...base(size)}>
    <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
    <path d="M10 11v6M14 11v6" />
  </svg>
)

export const IconZoom = ({ size }) => (
  <svg {...base(size)}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.6-3.6M11 8.5v5M8.5 11h5" />
  </svg>
)

export const IconMail = ({ size }) => (
  <svg {...base(size)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 7l8.5 6 8.5-6" />
  </svg>
)

export const IconPin = ({ size }) => (
  <svg {...base(size)}>
    <path d="M12 21s6-5.3 6-10a6 6 0 1 0-12 0c0 4.7 6 10 6 10z" />
    <circle cx="12" cy="11" r="2.4" />
  </svg>
)

export const IconClock = ({ size }) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
)

export const IconInfo = ({ size }) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5M12 8h.01" />
  </svg>
)

export const IconAlert = ({ size }) => (
  <svg {...base(size)}>
    <path d="M12 4l8.5 15h-17z" />
    <path d="M12 10v4M12 17h.01" />
  </svg>
)

export const IconCheck = ({ size }) => (
  <svg {...base(size)}>
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
)

export const IconPackage = ({ size }) => (
  <svg {...base(size)}>
    <path d="M12 3l8 4.2v9.6L12 21l-8-4.2V7.2z" />
    <path d="M4 7.2l8 4.2 8-4.2M12 11.4V21" />
  </svg>
)

export const IconWrench = ({ size }) => (
  <svg {...base(size)}>
    <path d="M15.5 4a4.5 4.5 0 0 0-4.2 6.1L4 17.4V20h2.6l7.3-7.3A4.5 4.5 0 0 0 20 8.5L17.5 11l-2.5-2.5z" />
  </svg>
)

export const IconBook = ({ size }) => (
  <svg {...base(size)}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
    <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5A2.5 2.5 0 0 1 4 20.5z" />
  </svg>
)

export const IconSnow = ({ size }) => (
  <svg {...base(size)}>
    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
  </svg>
)
