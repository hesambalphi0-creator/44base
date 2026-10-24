/**
 * Site-level configuration.
 *
 * Anything the business must confirm (contact details, social accounts, payment
 * gateway, legal policies) is intentionally EMPTY here rather than invented.
 * Components render a "needs configuration" state when a value is missing.
 */

export const site = {
  latinName: 'HI SARMA',
  name: 'های سرما',
  tagline: 'تجهیزات برودتی و HVAC-R',
  description:
    'تأمین انواع گاز مبرد، کمپرسور یخچال و فریزر، روغن کمپرسور و تجهیزات سردخانه با تمرکز بر اصالت کالا و انتخاب تخصصی.',

  /** Fill these in from the business — nothing is guessed. */
  contact: {
    phone: '',
    mobile: '',
    email: '',
    address: '',
    hours: '',
  },

  /** Legal / policy pages are only linked when the business supplies them. */
  policies: {
    privacy: '',
    terms: '',
    shipping: '',
  },

  social: [],

  /**
   * Online payment is NOT enabled: no gateway credentials are configured for
   * this project. Orders are recorded as "requested" and settled by phone.
   * Flip to true only after a real gateway is wired up and tested.
   */
  paymentEnabled: false,
}

/** True while the catalogue still contains clearly-labelled sample records. */
export const DEMO_DATA = true
