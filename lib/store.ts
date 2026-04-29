"use client";
import { create } from "zustand";

export interface Step1Data {
  name: string;
  birth: string;
  phone: string;
  email: string;
  address: string;
  addressDetail: string;
}

export interface Step2Data {
  victimType: string;
  damageDate: string;
  damageAmount: string;
  damageDesc: string;
  evidenceFiles: string[];
}

export interface Step3Data {
  agreePrivacy: boolean;
  agreeThirdParty: boolean;
  agreeDelegation: boolean;
  agreeMarketing: boolean;
  agreeCost: boolean;
  signature: string;
}

export interface Step4Data {
  paymentMethod: string;
  paymentRef: string;
}

export interface ApplicationData {
  caseSlug: string;
  step1: Partial<Step1Data>;
  step2: Partial<Step2Data>;
  step3: Partial<Step3Data>;
  step4: Partial<Step4Data>;
  currentStep: number;
}

interface ApplicationStore {
  data: ApplicationData;
  setStep1: (d: Partial<Step1Data>) => void;
  setStep2: (d: Partial<Step2Data>) => void;
  setStep3: (d: Partial<Step3Data>) => void;
  setStep4: (d: Partial<Step4Data>) => void;
  setCaseSlug: (slug: string) => void;
  setCurrentStep: (step: number) => void;
  reset: () => void;
}

const initial: ApplicationData = {
  caseSlug: "",
  step1: {},
  step2: {},
  step3: {},
  step4: {},
  currentStep: 1,
};

export const useApplicationStore = create<ApplicationStore>((set) => ({
  data: initial,
  setStep1: (d) =>
    set((s) => ({ data: { ...s.data, step1: { ...s.data.step1, ...d } } })),
  setStep2: (d) =>
    set((s) => ({ data: { ...s.data, step2: { ...s.data.step2, ...d } } })),
  setStep3: (d) =>
    set((s) => ({ data: { ...s.data, step3: { ...s.data.step3, ...d } } })),
  setStep4: (d) =>
    set((s) => ({ data: { ...s.data, step4: { ...s.data.step4, ...d } } })),
  setCaseSlug: (slug) =>
    set((s) => ({ data: { ...s.data, caseSlug: slug } })),
  setCurrentStep: (step) =>
    set((s) => ({ data: { ...s.data, currentStep: step } })),
  reset: () => set({ data: initial }),
}));
