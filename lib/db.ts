"use client";
import Dexie, { type Table } from "dexie";

export interface ApplicationRow {
  id?: number;
  caseSlug: string;
  caseTitle: string;
  name: string;
  birth: string;
  phone: string;
  email: string;
  address: string;
  victimType: string;
  damageDate: string;
  damageAmount: string;
  damageDesc: string;
  evidenceFiles: string;
  agreePrivacy: boolean;
  agreeThirdParty: boolean;
  agreeDelegation: boolean;
  agreeMarketing: boolean;
  signature: string;
  paymentMethod: string;
  paymentRef: string;
  applyDate: string;
  status: "접수완료" | "검토중" | "소제기완료";
}

class ClassActionDB extends Dexie {
  applications!: Table<ApplicationRow>;

  constructor() {
    super("ClassActionDB");
    this.version(1).stores({
      applications:
        "++id, caseSlug, name, phone, email, applyDate, status",
    });
  }
}

export const db = new ClassActionDB();

export async function saveApplication(row: Omit<ApplicationRow, "id">) {
  return db.applications.add(row);
}

export async function getAllApplications() {
  return db.applications.orderBy("applyDate").reverse().toArray();
}

export async function updateStatus(
  id: number,
  status: ApplicationRow["status"]
) {
  return db.applications.update(id, { status });
}
