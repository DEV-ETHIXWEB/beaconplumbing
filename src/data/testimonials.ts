// Real, named customer reviews sourced from the legacy site's Trustindex
// (Google-sourced) widget cache — verbatim text, not paraphrased or invented.
// See Phase 0 audit for source: reviews/index.html.
//
// Star ratings are omitted from aggregate copy per client decision (legacy
// site had 3 mutually conflicting rating claims) — each review below was
// individually 5-star on the source widget, which is fine to state per-review
// since it's not an aggregate/summary claim.

export interface Testimonial {
  name: string;
  quote: string;
  rating: 5;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Kendra Frey',
    quote:
      'Sham and Rod did a fantastic job replacing fried bathroom fans and wiring from a power surge. Super professional, informative and friendly!',
    rating: 5,
  },
  {
    name: 'Vince Smith',
    quote:
      'Super fast and great job! Jesus removed the gas line to our stove (switching to induction) and patched it up like new. Would definitely use them again.',
    rating: 5,
  },
  {
    name: 'Anita Penuelas',
    quote:
      'Jesus and Alfredo just completed a job for us replacing our kitchen faucet which has leaked for years. They were very professional, fast and personable. The new fixtures look great. We would hire them again any time.',
    rating: 5,
  },
  {
    name: 'Steven Yingling',
    quote:
      'These guys were great! Sham and Rod came out same day and got the power back on! Fixed it no problem. Thank you both!',
    rating: 5,
  },
  {
    name: 'Shelby Tate',
    quote: 'Excellent job done by Brom and Dee. Very professional men. Highly recommend. Will call again in the future!',
    rating: 5,
  },
  {
    name: 'Mabel Lee',
    quote: 'Arrived fast and quick diagnose. Fixed the problem in one hour. Definitely recommended.',
    rating: 5,
  },
];
