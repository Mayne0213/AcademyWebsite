"use client";

import Image from "next/image";
import { ReactNode, useState, useEffect } from "react";
import studentInformationBackground from "@/public/main/student/studentInformationBackground.jpg";
import {
  Smile,
  Settings,
  User,
  Smartphone,
  Hash,
  LampDesk,
  Menu,
  Brush,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/shared/ui/dropdownMenu"

import { useParams } from "next/navigation";

export default function Dummy() {
  return <div>준비 중인 페이지입니다.</div>;
}
