// Client-supplied glossy 3D icon set. Each import is one hand-cropped icon
// from the 5 master sheets in "Beacon Plumbing/" (Plumbing, Commercial,
// HVAC, Electrical, Trust), isolated via alpha-channel blob detection so
// there's no leftover label text baked into the crop.
//
// Lives in its own module (rather than inside Icon3D.astro) so both the
// Astro component and server-side helpers that need a resolved URL (e.g.
// src/lib/formServiceIcons.ts, for icons inside the React ContactForm
// island) share one source of truth instead of duplicating 35 imports.

import plumbing from '../assets/icons/3d/plumbing.png';
import emergencyPlumbing from '../assets/icons/3d/emergency-plumbing.png';
import pipeRepair from '../assets/icons/3d/pipe-repair.png';
import waterLines from '../assets/icons/3d/water-lines.png';
import faucet from '../assets/icons/3d/faucet.png';
import toilet from '../assets/icons/3d/toilet.png';
import drainCleaning from '../assets/icons/3d/drain-cleaning.png';
import sewer from '../assets/icons/3d/sewer.png';
import hydroJetting from '../assets/icons/3d/hydro-jetting.png';
import sewerCamera from '../assets/icons/3d/sewer-camera.png';
import commercialPlumbing from '../assets/icons/3d/commercial-plumbing.png';
import urinal from '../assets/icons/3d/urinal.png';
import greaseTrap from '../assets/icons/3d/grease-trap.png';
import drinkingFountain from '../assets/icons/3d/drinking-fountain.png';
import commercialDrain from '../assets/icons/3d/commercial-drain.png';
import hvac from '../assets/icons/3d/hvac.png';
import furnace from '../assets/icons/3d/furnace.png';
import airConditioning from '../assets/icons/3d/air-conditioning.png';
import heatPump from '../assets/icons/3d/heat-pump.png';
import miniSplit from '../assets/icons/3d/mini-split.png';
import boiler from '../assets/icons/3d/boiler.png';
import electrical from '../assets/icons/3d/electrical.png';
import electricalPanel from '../assets/icons/3d/electrical-panel.png';
import homeRewiring from '../assets/icons/3d/home-rewiring.png';
import outletCircuit from '../assets/icons/3d/outlet-circuit.png';
import lightFixture from '../assets/icons/3d/light-fixture.png';
import evCharger from '../assets/icons/3d/ev-charger.png';
import generator from '../assets/icons/3d/generator.png';
import licensedInsured from '../assets/icons/3d/licensed-insured.png';
import ninetyMinuteResponse from '../assets/icons/3d/90-minute-response.png';
import twentyFourSeven from '../assets/icons/3d/24-7-emergency.png';
import sameDayService from '../assets/icons/3d/same-day-service.png';
import oneYearGuarantee from '../assets/icons/3d/1-year-guarantee.png';
import noTripCharges from '../assets/icons/3d/no-trip-charges.png';
import upfrontPricing from '../assets/icons/3d/upfront-pricing.png';

export const icons = {
  plumbing,
  'emergency-plumbing': emergencyPlumbing,
  'pipe-repair': pipeRepair,
  'water-lines': waterLines,
  faucet,
  toilet,
  'drain-cleaning': drainCleaning,
  sewer,
  'hydro-jetting': hydroJetting,
  'sewer-camera': sewerCamera,
  'commercial-plumbing': commercialPlumbing,
  urinal,
  'grease-trap': greaseTrap,
  'drinking-fountain': drinkingFountain,
  'commercial-drain': commercialDrain,
  hvac,
  furnace,
  'air-conditioning': airConditioning,
  'heat-pump': heatPump,
  'mini-split': miniSplit,
  boiler,
  electrical,
  'electrical-panel': electricalPanel,
  'home-rewiring': homeRewiring,
  'outlet-circuit': outletCircuit,
  'light-fixture': lightFixture,
  'ev-charger': evCharger,
  generator,
  'licensed-insured': licensedInsured,
  '90-minute-response': ninetyMinuteResponse,
  '24-7-emergency': twentyFourSeven,
  'same-day-service': sameDayService,
  '1-year-guarantee': oneYearGuarantee,
  'no-trip-charges': noTripCharges,
  'upfront-pricing': upfrontPricing,
} as const;

export type IconName = keyof typeof icons;
